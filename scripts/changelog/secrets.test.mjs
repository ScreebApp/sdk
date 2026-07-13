import { test } from "node:test";
import assert from "node:assert/strict";

import { scanForSecrets, assertNoSecrets } from "./secrets.mjs";

test("clean changelog prose has no findings", () => {
  const clean =
    "### 🐛 Bug fixes\n\n- Fixed the password reset email not sending. The API key field now validates input.";
  assert.deepEqual(scanForSecrets(clean), []);
});

test("detects high-confidence credential formats", () => {
  const cases = [
    ["AWS access key", "leaked AKIAIOSFODNN7EXAMPLE in config"],
    ["GitHub token", "token ghp_0123456789abcdefghijklmnopqrstuvwxyzAB"],
    ["Google API key", "key AIzaSyA1234567890abcdefghijklmnopqrstuvw"],
    // Split so this fake fixture isn't a contiguous literal that trips
    // GitHub's own push-protection secret scanner — same runtime value.
    ["Slack token", "xoxb-" + "1234567890-abcdefghijklmnop"],
    ["Stripe key", "sk_live_0123456789abcdefghij"],
    ["private key", "-----BEGIN RSA PRIVATE KEY-----"],
    ["JWT", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.abc-DEF_123"],
    ["bearer token", "Authorization: Bearer abcdef0123456789ABCDEF0123"],
    ["URL credentials", "postgres://admin:s3cr3tpw@db.internal/screeb"],
  ];
  for (const [label, text] of cases) {
    assert.ok(scanForSecrets(text).length > 0, `should flag ${label}`);
  }
});

test("detects secret-looking assignments but not plain prose", () => {
  assert.ok(scanForSecrets('api_key = "abc123def456ghi789"').length > 0);
  assert.deepEqual(scanForSecrets("Improved the API key onboarding flow."), []);
});

test("findings never leak the raw secret value", () => {
  const findings = scanForSecrets("ghp_0123456789abcdefghijklmnopqrstuvwxyzAB");
  for (const f of findings) {
    assert.ok(f.type, "has a type");
    assert.doesNotMatch(
      JSON.stringify(f),
      /0123456789abcdefghijklmnopqrstuvwxyz/,
      "must not contain the full secret",
    );
  }
});

test("supports an extra denylist of internal terms (case-insensitive)", () => {
  assert.equal(scanForSecrets("uses Project Bluebird internally", []).length, 0);
  const findings = scanForSecrets("uses Project Bluebird internally", ["bluebird"]);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].type, "denylisted term");
});

test("assertNoSecrets throws with types but not values", () => {
  assert.throws(
    () => assertNoSecrets("ghp_0123456789abcdefghijklmnopqrstuvwxyzAB"),
    (err) => {
      assert.match(err.message, /GitHub token/);
      assert.doesNotMatch(err.message, /0123456789abcdefghij/);
      return true;
    },
  );
});

test("assertNoSecrets is a no-op for clean text", () => {
  assert.doesNotThrow(() => assertNoSecrets("### 🚀 New features\n\n- Dark mode"));
});
