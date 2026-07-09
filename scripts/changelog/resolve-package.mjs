#!/usr/bin/env node
// CLI helper for GitHub Actions: resolves the package dir + version for a
// tag and prints `KEY=value` lines suitable for appending to $GITHUB_ENV.
//
// Usage: node resolve-package.mjs --tag sdk-kmp/v4.0.2
//   -> PACKAGE_DIR=sdk-kmp
//      VERSION=4.0.2

import { resolvePackageByTag, versionFromTag } from "./packages.mjs";

const tagArgIdx = process.argv.indexOf("--tag");
const tag = tagArgIdx === -1 ? undefined : process.argv[tagArgIdx + 1];
if (!tag) {
  console.error("resolve-package.mjs: --tag is required");
  process.exit(1);
}

try {
  const pkg = resolvePackageByTag(tag);
  const version = versionFromTag(tag, pkg);
  process.stdout.write(`PACKAGE_DIR=${pkg.dir}\nVERSION=${version}\n`);
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
