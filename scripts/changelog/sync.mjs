#!/usr/bin/env node
// Publish-side sync: takes a finalized release body for one of this repo's
// publishable packages and keeps that package's packages/<dir>/CHANGELOG.md
// in sync. Used by .github/workflows/changelog-publish.yml after a release
// is published (so it reads the human-reviewed release notes), but the file
// I/O is also a usable CLI:
//
//   echo "$BODY" | node sync.mjs --package sdk-kmp --version 4.0.2 --date 2026-06-30
//
// Ported from screeb/tag/scripts/changelog/sync.mjs, generalized to take a
// package dir instead of being hardcoded to one package. Also fixes an edge
// case in the original prepend algorithm: it anchored solely on finding a
// pre-existing `## v...` heading and otherwise appended at the very bottom
// of the file — silently wrong for packages/sdk-flutter and
// packages/sdk-maui's existing CHANGELOG.md, which predate this convention
// (see prependSection below).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { formatChangelogSection } from "./generate.mjs";
import { assertNoSecrets } from "./secrets.mjs";
import { resolvePackageByDir } from "./packages.mjs";

// Paths relative to this script (scripts/changelog/).
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");

export function changelogPath(dir) {
  return resolve(root, "packages", dir, "CHANGELOG.md");
}

export function buildHeader(pkg) {
  return `# Changelog\n\nAll notable changes to ${pkg.displayName} (\`${pkg.dir}\`).\n\n`;
}

// Inserts `section` into `base`, newest-first. Preferred anchor: right
// before the first existing `## v...` entry (this module's own
// convention). If there isn't one yet — a brand-new file (just seeded with
// `header`) or a legacy file that predates this convention — fall back to
// right after our own header if present, or otherwise right after the
// file's leading blank-line-delimited title block, so new entries always
// land above pre-existing content instead of being appended at the bottom.
export function prependSection(existing, section, header) {
  let base = existing && existing.trim() ? existing : header;
  if (!base.startsWith("# ")) base = header + base;

  const versionMatch = section.match(/^## v\S+/m);
  const heading = versionMatch ? versionMatch[0] : null;
  // Already present -> no-op (keep the original, header-normalized).
  if (heading && base.includes(`${heading} `)) return base;

  let insertAt = base.search(/^## v/m);
  if (insertAt === -1) {
    if (base.startsWith(header)) {
      insertAt = header.length;
    } else {
      const blankIdx = base.indexOf("\n\n");
      insertAt = blankIdx === -1 ? base.length : blankIdx + 2;
    }
  }

  const head = base.slice(0, insertAt);
  const tail = base.slice(insertAt);
  return `${head.replace(/\s*$/, "\n\n")}${section.trim()}\n\n${tail}`;
}

function parseArgs(argv) {
  const out = { pkgDir: undefined, version: undefined, date: undefined };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--package") out.pkgDir = argv[++i];
    else if (a.startsWith("--package=")) out.pkgDir = a.slice("--package=".length);
    else if (a === "--version") out.version = argv[++i];
    else if (a.startsWith("--version=")) out.version = a.slice("--version=".length);
    else if (a === "--date") out.date = argv[++i];
    else if (a.startsWith("--date=")) out.date = a.slice("--date=".length);
  }
  if (!out.pkgDir) throw new Error("--package is required");
  if (!out.version) throw new Error("--version is required");
  if (!out.date) out.date = new Date().toISOString().slice(0, 10);
  return out;
}

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const { pkgDir, version, date } = parseArgs(process.argv.slice(2));
    const pkg = resolvePackageByDir(pkgDir);
    const body = readStdin().trim();
    if (!body) throw new Error("empty release body on stdin");

    // Non-bypassable gate: refuse to write/commit anything sensitive. This
    // runs on the FINAL, human-reviewed release body, so it also catches
    // manual edits made during review.
    assertNoSecrets(body);

    const path = changelogPath(pkg.dir);
    const existing = existsSync(path) ? readFileSync(path, "utf8") : "";
    const header = buildHeader(pkg);
    const section = formatChangelogSection({ version, date, body });
    const updated = prependSection(existing, section, header);

    writeFileSync(path, updated);
    process.stdout.write(`updated packages/${pkg.dir}/CHANGELOG.md for v${version}\n`);
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}
