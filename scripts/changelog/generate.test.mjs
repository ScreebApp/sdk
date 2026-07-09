import { test } from "node:test";
import assert from "node:assert/strict";

import {
  parseArgs,
  shouldExcludeDiffFile,
  capDiff,
  parseCommits,
  buildPrompt,
  formatChangelogSection,
  sanitizeNotes,
  generate,
} from "./generate.mjs";

test("parseArgs reads --tag and --format with defaults", () => {
  assert.deepEqual(parseArgs(["--tag", "sdk-kmp/v4.0.2"]), {
    tag: "sdk-kmp/v4.0.2",
    format: "release",
  });
  assert.deepEqual(
    parseArgs(["--tag", "@screeb/sdk-browser@1.0.0", "--format", "changelog"]),
    { tag: "@screeb/sdk-browser@1.0.0", format: "changelog" },
  );
});

test("parseArgs accepts --format=value and --tag=value forms", () => {
  assert.equal(parseArgs(["--format=changelog"]).format, "changelog");
  assert.equal(parseArgs(["--tag=sdk-maui/v1.0.0"]).tag, "sdk-maui/v1.0.0");
});

test("parseArgs rejects unknown format", () => {
  assert.throws(() => parseArgs(["--format", "html"]), /format/);
});

test("parseArgs reads an optional --date", () => {
  assert.equal(parseArgs(["--date", "2026-06-30"]).date, "2026-06-30");
  assert.equal(parseArgs(["--date=2026-06-30"]).date, "2026-06-30");
  assert.equal(parseArgs([]).date, undefined);
});

test("sanitizeNotes strips preamble before the first section heading", () => {
  const raw =
    "I'll check for relevant skills first.\n\n**Using the Skill tool.**\n\n### 🐛 Bug fixes\n\n- Fixed X";
  assert.equal(sanitizeNotes(raw), "### 🐛 Bug fixes\n\n- Fixed X");
});

test("sanitizeNotes leaves clean output untouched", () => {
  const clean = "### 🚀 New features\n\n- Y";
  assert.equal(sanitizeNotes(clean), clean);
});

test("sanitizeNotes preserves a bare no-changes line", () => {
  const raw = "Here is the changelog:\n\n_No user-visible changes in this release._";
  assert.equal(sanitizeNotes(raw), "_No user-visible changes in this release._");
});

test("shouldExcludeDiffFile drops lockfiles, dist, build, snapshots and binaries", () => {
  for (const p of [
    "packages/sdk-browser/package-lock.json",
    "packages/sdk-browser/dist/index.js",
    "packages/sdk-kmp/build/outputs/foo.aar",
    "packages/sdk-react/src/foo.test.ts.snap",
    "packages/sdk-vue/assets/logo.png",
    "packages/sdk-vue/fonts/Inter.woff2",
  ]) {
    assert.equal(shouldExcludeDiffFile(p), true, p);
  }
});

test("shouldExcludeDiffFile drops secret-bearing files", () => {
  for (const p of [
    "packages/sdk-maui/.env",
    "packages/sdk-maui/.env.production",
    "packages/sdk-kmp/server.pem",
    "packages/sdk-kmp/certs/private.key",
    "packages/sdk-kmp/config/secrets.json",
  ]) {
    assert.equal(shouldExcludeDiffFile(p), true, p);
  }
});

test("shouldExcludeDiffFile keeps real source files", () => {
  for (const p of [
    "packages/sdk-browser/src/index.ts",
    "packages/sdk-kmp/src/commonMain/kotlin/Screeb.kt",
  ]) {
    assert.equal(shouldExcludeDiffFile(p), false, p);
  }
});

test("capDiff truncates diffs longer than the limit and marks the cut", () => {
  const big = Array.from({ length: 500 }, (_, i) => `+line ${i}`).join("\n");
  const capped = capDiff(big, 400);
  const lines = capped.split("\n");
  assert.ok(lines.length <= 401);
  assert.match(capped, /truncated/i);
});

test("capDiff leaves short diffs untouched", () => {
  const small = "+a\n+b\n+c";
  assert.equal(capDiff(small, 400), small);
});

test("parseCommits parses the unit/record separated git log stream", () => {
  const raw =
    "abc123\x1ffeat(sdk-kmp): add dark mode (#42)\x1fLong body here\x1e" +
    "def456\x1ffix(sdk-kmp): clamp z-index\x1f\x1e";
  const commits = parseCommits(raw);
  assert.equal(commits.length, 2);
  assert.deepEqual(commits[0], {
    hash: "abc123",
    subject: "feat(sdk-kmp): add dark mode (#42)",
    body: "Long body here",
    pr: 42,
  });
  assert.equal(commits[1].pr, null);
  assert.equal(commits[1].body, "");
});

test("parseCommits ignores blank trailing records", () => {
  const raw = "abc123\x1ffix: x\x1f\x1e\n";
  assert.equal(parseCommits(raw).length, 1);
});

test("buildPrompt embeds version, display name, commit subjects and diffs, and asks for grouped markdown", () => {
  const prompt = buildPrompt({
    version: "4.0.2",
    displayName: "Screeb Kotlin Multiplatform SDK",
    commits: [
      { hash: "abc", subject: "feat(sdk-kmp): add X", body: "", pr: 7, diff: "+code" },
    ],
  });
  assert.match(prompt, /4\.0\.2/);
  assert.match(prompt, /Screeb Kotlin Multiplatform SDK/);
  assert.match(prompt, /feat\(sdk-kmp\): add X/);
  assert.match(prompt, /\+code/);
  assert.match(prompt, /New features/i);
  assert.match(prompt, /Bug fixes/i);
});

test("buildPrompt forbids meta-commentary and defines the empty-release output", () => {
  const prompt = buildPrompt({ version: "0.1.0", displayName: "Screeb Vue SDK", commits: [] });
  assert.match(prompt, /do not ask|no questions|no commentary|never add/i);
  assert.match(prompt, /_No user-visible changes in this release\._/);
});

test("formatChangelogSection prepends a version + date heading", () => {
  const out = formatChangelogSection({
    version: "4.0.2",
    date: "2026-06-30",
    body: "### 🚀 New features\n- Dark mode",
  });
  assert.match(out, /^## v4\.0\.2 — 2026-06-30\n/);
  assert.match(out, /Dark mode/);
});

test("generate resolves the package + range, scopes git to that package's path, and runs claude", async () => {
  const calls = [];
  const fakeGit = (args) => {
    calls.push(args);
    if (args[0] === "describe") return "sdk-kmp/v4.0.1";
    if (args[0] === "log")
      return "abc123\x1ffeat(sdk-kmp): add dark mode (#42)\x1f\x1e";
    if (args[0] === "show") return "diff --git a/x b/x\n+code";
    throw new Error(`unexpected git ${args.join(" ")}`);
  };
  let receivedPrompt = null;
  const fakeClaude = (prompt) => {
    receivedPrompt = prompt;
    return "### 🚀 New features\n- Dark mode";
  };

  const out = await generate({
    tag: "sdk-kmp/v4.0.2",
    format: "release",
    git: fakeGit,
    claude: fakeClaude,
  });

  const logCall = calls.find((c) => c[0] === "log");
  assert.ok(logCall.includes("packages/sdk-kmp/"), "git log must be scoped to the package path");
  assert.match(receivedPrompt, /feat\(sdk-kmp\): add dark mode/);
  assert.match(receivedPrompt, /\+code/);
  assert.match(receivedPrompt, /Screeb Kotlin Multiplatform SDK/);
  assert.equal(out, "### 🚀 New features\n- Dark mode");
});

test("generate refuses to return notes that contain a secret", async () => {
  const fakeGit = (args) => {
    if (args[0] === "describe") return "@screeb/sdk-browser@1.0.0";
    if (args[0] === "log") return "abc\x1ffix(sdk-browser): y\x1f\x1e";
    if (args[0] === "show") return "+z";
    throw new Error("nope");
  };
  await assert.rejects(
    generate({
      tag: "@screeb/sdk-browser@1.0.1",
      format: "release",
      git: fakeGit,
      claude: () => "### 🐛 Bug fixes\n- token ghp_0123456789abcdefghijklmnopqrstuvwxyzAB",
    }),
    /potential secret/i,
  );
});

test("generate adds a version heading when format is changelog", async () => {
  const fakeGit = (args) => {
    if (args[0] === "describe") return "sdk-maui/v0.1.0";
    if (args[0] === "log") return "abc\x1ffix(sdk-maui): y\x1f\x1e";
    if (args[0] === "show") return "+z";
    throw new Error("nope");
  };
  const out = await generate({
    tag: "sdk-maui/v0.1.1",
    format: "changelog",
    date: "2026-06-30",
    git: fakeGit,
    claude: () => "### 🐛 Bug fixes\n- y",
  });
  assert.match(out, /^## v0\.1\.1 — 2026-06-30/);
});

test("generate throws for a tag that matches no known package", async () => {
  await assert.rejects(
    generate({ tag: "v1.0.0", format: "release" }),
    /no package matches/,
  );
});
