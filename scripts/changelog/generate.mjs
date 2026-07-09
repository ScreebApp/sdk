#!/usr/bin/env node
// Generates customer-facing release notes for one of this repo's publishable
// SDK packages from the commits in a version range. Commit messages are
// often terse, so we also feed the actual code diffs to Claude and let it
// describe the user-visible change.
//
// Usage:
//   node generate.mjs --tag sdk-kmp/v4.1.0 [--format release|changelog]
//
// --format release   -> body only (for the GitHub release description)
// --format changelog -> body prefixed with a `## vX.Y.Z — YYYY-MM-DD` heading
//
// AI backend: the Claude Code CLI in headless mode (`claude -p`) — no API
// key, works in CI for anyone signed in to Claude Code.
//
// Ported from screeb/tag/scripts/changelog/generate.mjs, generalized to
// resolve the target package from the tag (via packages.mjs) instead of
// being hardcoded to a single package.

import { spawnSync } from "node:child_process";

import { assertNoSecrets } from "./secrets.mjs";
import { resolvePackageByTag, versionFromTag } from "./packages.mjs";

// Field/record separators for the git log stream (unit + record separator).
const US = "\x1f";
const RS = "\x1e";
const MAX_DIFF_LINES = 400;

const CLAUDE_BIN = process.env.CLAUDE_CLI || "claude";
const CLAUDE_MODEL =
  process.env.ANTHROPIC_MODEL || process.env.CLAUDE_MODEL || "sonnet";
const CLAUDE_TIMEOUT = Number(process.env.CLAUDE_TIMEOUT || "300") * 1000;

export function parseArgs(argv) {
  const out = { tag: undefined, format: "release", date: undefined };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--tag") out.tag = argv[++i];
    else if (arg.startsWith("--tag=")) out.tag = arg.slice("--tag=".length);
    else if (arg === "--format") out.format = argv[++i];
    else if (arg.startsWith("--format=")) out.format = arg.slice("--format=".length);
    else if (arg === "--date") out.date = argv[++i];
    else if (arg.startsWith("--date=")) out.date = arg.slice("--date=".length);
  }
  if (out.format !== "release" && out.format !== "changelog") {
    throw new Error(`unknown --format "${out.format}" (use release|changelog)`);
  }
  if (out.date === undefined) delete out.date;
  return out;
}

// Drop any leading chatter the model emits before the actual changelog
// content (a stray "Here is..." line, a leaked skill/tool preamble, etc.).
// We anchor on the first recognized section heading or the standard
// no-changes line.
export function sanitizeNotes(raw) {
  const text = (raw || "").trim();
  const m = text.match(/^### |^_No user-visible changes in this release\._/m);
  if (m && m.index > 0) return text.slice(m.index).trim();
  return text;
}

export function shouldExcludeDiffFile(path) {
  return (
    /(^|\/)dist\//.test(path) ||
    /(^|\/)build\//.test(path) ||
    /\.lock$/.test(path) ||
    /(^|\/)pnpm-lock\.yaml$/.test(path) ||
    /(^|\/)package-lock\.json$/.test(path) ||
    /\.snap$/.test(path) ||
    /\.(png|jpe?g|gif|svg|ico|woff2?|ttf|eot|mp4|webp)$/.test(path) ||
    /(^|\/)\.env(\.|$)/.test(path) ||
    /\.(pem|key|p12|pfx|crt|cert)$/.test(path) ||
    /(^|\/)secrets/.test(path)
  );
}

export function capDiff(diff, maxLines = MAX_DIFF_LINES) {
  const lines = diff.split("\n");
  if (lines.length <= maxLines) return diff;
  const dropped = lines.length - maxLines;
  return (
    lines.slice(0, maxLines).join("\n") +
    `\n… (diff truncated, ${dropped} more lines)`
  );
}

export function parseCommits(raw) {
  return raw
    .split(RS)
    .map((record) => record.replace(/^\n+/, ""))
    .filter((record) => record.trim() !== "")
    .map((record) => {
      const [hash = "", subject = "", body = ""] = record.split(US);
      const prMatch = subject.match(/\(#(\d+)\)/);
      return {
        hash: hash.trim(),
        subject: subject.trim(),
        body: body.trim(),
        pr: prMatch ? Number(prMatch[1]) : null,
      };
    });
}

export function buildPrompt({ version, displayName, commits }) {
  const commitBlocks = commits
    .map((c) => {
      const parts = [`### Commit ${c.hash} — ${c.subject}`];
      if (c.body) parts.push(c.body);
      if (c.diff) parts.push("```diff\n" + c.diff + "\n```");
      return parts.join("\n");
    })
    .join("\n\n");

  return `You are writing the public changelog entry for version ${version} of ${displayName}, part of the Screeb SDK family (survey and in-app message widgets).

Audience: developers integrating the SDK. Describe the user-visible benefit of each change, not the internal implementation.

Everything you need is in this prompt. Do not try to read files, run git, or use any tool — base your answer solely on the commit messages and diffs provided below.

Rules:
- Output GitHub-flavored Markdown ONLY. No preamble, no closing remarks, no surrounding code fences.
- You are generating a file, not chatting. NEVER add commentary, explanations of your reasoning, or questions to the reader, and never offer alternatives or ask which option is preferred.
- Group changes under these level-3 headings, in this order, omitting any section that would be empty:
  ### 🚀 New features
  ### 🐛 Bug fixes
  ### ⚡ Improvements
  ### ⚠️ Breaking changes
- One concise bullet per user-visible change. Merge related commits into a single bullet.
- OMIT internal-only noise: version-bump commits, dependency bumps, refactors, test/CI/build changes, and anything with no observable effect for integrators.
- If, after omitting noise, there are NO user-visible changes, output EXACTLY this single line and nothing else: _No user-visible changes in this release._
- When a commit message is vague, read the diff to work out what actually changed.
- Keep it short and friendly. No commit hashes. Keep PR references like (#1987) only if they help.
- SECURITY: never copy literal values out of the diffs. No tokens, keys, passwords, credentials, connection strings, internal hostnames/URLs, IP addresses, environment-variable names, or source file paths. Describe behaviour only.

Commits in this release (message, optional body, and code diff):

${commitBlocks}`;
}

export function formatChangelogSection({ version, date, body }) {
  return `## v${version} — ${date}\n\n${body.trim()}\n`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// Default git runner: returns trimmed stdout, throws on non-zero exit.
function runGit(args) {
  const res = spawnSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) {
    // `git describe` fails (exit 128, e.g. "No tags can describe ..." or
    // "Not a valid object name" for a first-ever commit) when the package
    // has no prior tag reachable from this one. That's an expected "first
    // release" case, not an error — resolve it to no previous tag so
    // generate()'s `prev ? \`${prev}..${tag}\` : tag` fallback kicks in and
    // the full history up to `tag` is used. Any other git subcommand
    // failing (log, show, ...) is a real error and still throws.
    if (args[0] === "describe") return "";
    throw new Error(`git ${args.join(" ")} failed: ${res.stderr || res.stdout}`);
  }
  return res.stdout.replace(/\n$/, "");
}

// Default Claude runner: pipes the prompt to `claude -p`.
function runClaude(prompt) {
  const res = spawnSync(
    CLAUDE_BIN,
    ["-p", "--model", CLAUDE_MODEL, "--output-format", "text", "--tools", ""],
    { input: prompt, encoding: "utf8", timeout: CLAUDE_TIMEOUT, maxBuffer: 16 * 1024 * 1024 },
  );
  if (res.status !== 0) {
    throw new Error(`claude failed: ${res.stderr || res.stdout || res.error}`);
  }
  return res.stdout.trim();
}

function excludePathspecs(dir) {
  const base = `packages/${dir}`;
  return [
    `:(exclude)${base}/**/dist/**`,
    `:(exclude)${base}/**/build/**`,
    `:(exclude)${base}/**/*.lock`,
    `:(exclude)${base}/**/pnpm-lock.yaml`,
    `:(exclude)${base}/**/package-lock.json`,
    `:(exclude)${base}/**/*.snap`,
    `:(exclude)${base}/**/*.png`,
    `:(exclude)${base}/**/*.jpg`,
    `:(exclude)${base}/**/*.svg`,
    `:(exclude)${base}/**/*.woff`,
    `:(exclude)${base}/**/*.woff2`,
    `:(exclude)${base}/**/.env`,
    `:(exclude)${base}/**/.env.*`,
    `:(exclude)${base}/**/*.pem`,
    `:(exclude)${base}/**/*.key`,
    `:(exclude)${base}/**/*.p12`,
    `:(exclude)${base}/**/*.pfx`,
    `:(exclude)${base}/**/*.crt`,
    `:(exclude)${base}/**/*.cert`,
    `:(exclude)${base}/**/secrets*`,
  ];
}

export async function generate({
  tag,
  format = "release",
  date,
  git = runGit,
  claude = runClaude,
}) {
  const pkg = resolvePackageByTag(tag);
  const version = versionFromTag(tag, pkg);
  const pkgPath = `packages/${pkg.dir}/`;

  // Previous tag of the *same package* reachable from this one.
  const prev = git([
    "describe",
    "--tags",
    "--abbrev=0",
    "--match",
    pkg.tagGlob,
    `${tag}^`,
  ]);

  const range = prev ? `${prev}..${tag}` : tag;
  const rawLog = git([
    "log",
    range,
    "--no-merges",
    `--format=%H${US}%s${US}%b${RS}`,
    "--",
    pkgPath,
  ]);

  const commits = parseCommits(rawLog);
  for (const commit of commits) {
    const diff = git([
      "show",
      commit.hash,
      "--format=",
      "--unified=3",
      "--",
      pkgPath,
      ...excludePathspecs(pkg.dir),
    ]);
    commit.diff = capDiff(diff);
  }

  const body = sanitizeNotes(
    claude(buildPrompt({ version, displayName: pkg.displayName, commits })),
  );
  // Hard gate: never let credentials/sensitive literals reach the changelog.
  assertNoSecrets(body);

  if (format === "changelog") {
    return formatChangelogSection({ version, date: date || todayIso(), body });
  }
  return body;
}

// CLI entrypoint.
if (import.meta.url === `file://${process.argv[1]}`) {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.tag) {
    console.error("generate.mjs: --tag is required (e.g. --tag sdk-kmp/v4.1.0)");
    process.exit(1);
  }
  generate(opts)
    .then((out) => process.stdout.write(out + "\n"))
    .catch((err) => {
      console.error(err.message || err);
      process.exit(1);
    });
}
