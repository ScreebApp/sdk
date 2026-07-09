import { test } from "node:test";
import assert from "node:assert/strict";

import {
  PACKAGES,
  resolvePackageByTag,
  resolvePackageByDir,
  versionFromTag,
} from "./packages.mjs";

test("PACKAGES lists exactly the 9 publishable packages", () => {
  const dirs = PACKAGES.map((p) => p.dir).sort();
  assert.deepEqual(dirs, [
    "sdk-angular",
    "sdk-browser",
    "sdk-flutter",
    "sdk-kmp",
    "sdk-maui",
    "sdk-react",
    "sdk-reactnative",
    "sdk-svelte",
    "sdk-vue",
  ]);
});

test("resolvePackageByTag matches npm-style and path-style tags", () => {
  assert.equal(resolvePackageByTag("@screeb/sdk-browser@1.2.3").dir, "sdk-browser");
  assert.equal(resolvePackageByTag("@screeb/react-native@4.0.2").dir, "sdk-reactnative");
  assert.equal(resolvePackageByTag("sdk-kmp/v4.0.2").dir, "sdk-kmp");
  assert.equal(resolvePackageByTag("sdk-flutter/v4.0.2").dir, "sdk-flutter");
  assert.equal(resolvePackageByTag("sdk-maui/v0.1.0").dir, "sdk-maui");
});

test("resolvePackageByTag throws for an unknown tag", () => {
  assert.throws(() => resolvePackageByTag("v1.0.0"), /no package matches/);
});

test("resolvePackageByDir matches by directory name", () => {
  assert.equal(resolvePackageByDir("sdk-maui").tagPrefix, "sdk-maui/v");
});

test("resolvePackageByDir throws for an unknown dir", () => {
  assert.throws(() => resolvePackageByDir("nope"), /unknown package dir/);
});

test("versionFromTag strips the package's tag prefix", () => {
  assert.equal(versionFromTag("@screeb/sdk-vue@0.3.1"), "0.3.1");
  assert.equal(versionFromTag("sdk-flutter/v4.0.2"), "4.0.2");
});

test("each package's tagGlob is its tagPrefix plus a wildcard", () => {
  for (const p of PACKAGES) {
    assert.equal(p.tagGlob, `${p.tagPrefix}*`);
  }
});
