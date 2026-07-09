import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const script = resolve(here, "resolve-package.mjs");

test("prints PACKAGE_DIR and VERSION for a known tag", () => {
  const res = spawnSync("node", [script, "--tag", "sdk-kmp/v4.0.2"], { encoding: "utf8" });
  assert.equal(res.status, 0);
  assert.equal(res.stdout, "PACKAGE_DIR=sdk-kmp\nVERSION=4.0.2\n");
});

test("resolves npm-style tags too", () => {
  const res = spawnSync("node", [script, "--tag", "@screeb/sdk-browser@1.2.3"], { encoding: "utf8" });
  assert.equal(res.status, 0);
  assert.equal(res.stdout, "PACKAGE_DIR=sdk-browser\nVERSION=1.2.3\n");
});

test("exits non-zero for an unknown tag", () => {
  const res = spawnSync("node", [script, "--tag", "v1.0.0"], { encoding: "utf8" });
  assert.notEqual(res.status, 0);
  assert.match(res.stderr, /no package matches/);
});

test("exits non-zero when --tag is missing", () => {
  const res = spawnSync("node", [script], { encoding: "utf8" });
  assert.notEqual(res.status, 0);
});
