import { test } from "node:test";
import assert from "node:assert/strict";

import { prependSection, buildHeader } from "./sync.mjs";
import { resolvePackageByDir } from "./packages.mjs";

const pkg = resolvePackageByDir("sdk-kmp");
const header = buildHeader(pkg);

test("buildHeader names the package", () => {
  assert.match(header, /^# Changelog\n\n/);
  assert.match(header, /Screeb Kotlin Multiplatform SDK/);
  assert.match(header, /`sdk-kmp`/);
});

test("prependSection inserts a new section right after the header on a fresh file", () => {
  const out = prependSection("", "## v4.0.2 — 2026-06-30\n\n- new\n", header);
  assert.ok(out.startsWith(header));
  assert.match(out, /v4\.0\.2/);
});

test("prependSection inserts newer versions above older ones", () => {
  const existing = `${header}## v4.0.1 — 2026-06-29\n\n- old\n`;
  const out = prependSection(existing, "## v4.0.2 — 2026-06-30\n\n- new\n", header);
  assert.ok(out.startsWith(header));
  assert.ok(out.indexOf("v4.0.2") < out.indexOf("v4.0.1"));
});

test("prependSection is idempotent for an already-present version", () => {
  const existing = `${header}## v4.0.2 — 2026-06-30\n\n- new\n`;
  const out = prependSection(existing, "## v4.0.2 — 2026-06-30\n\n- DUP\n", header);
  assert.equal(out, existing);
  assert.doesNotMatch(out, /DUP/);
});

test("prependSection inserts above legacy content that predates the '## v' convention", () => {
  const legacy = "# CHANGELOGS\n\n## Version 4.0.2 - Jul 8, 2026\n\n- old style entry\n";
  const out = prependSection(legacy, "## v4.0.3 — 2026-07-10\n\n- new\n", header);
  assert.ok(out.indexOf("v4.0.3") < out.indexOf("Version 4.0.2"));
  assert.match(out, /old style entry/, "legacy content is preserved");
});

test("prependSection keeps landing new entries at the top across repeated legacy runs", () => {
  const legacy = "# Changelog\n\n## 0.1.0 (initial release)\n- Android + iOS support\n";
  const afterFirst = prependSection(legacy, "## v0.2.0 — 2026-07-01\n\n- first\n", header);
  const afterSecond = prependSection(afterFirst, "## v0.3.0 — 2026-07-10\n\n- second\n", header);
  assert.ok(afterSecond.indexOf("v0.3.0") < afterSecond.indexOf("v0.2.0"));
  assert.ok(afterSecond.indexOf("v0.2.0") < afterSecond.indexOf("0.1.0 (initial release)"));
});
