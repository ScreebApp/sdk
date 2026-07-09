// Deterministic secret/sensitive-data gate for generated changelog text.
//
// The changelog is derived from code diffs and published publicly, so we
// never trust the model's output blindly: scanForSecrets() flags
// high-confidence credential formats, and assertNoSecrets() hard-fails the
// pipeline if any are present. Findings report the match TYPE and a masked
// hint only — never the raw value — so CI logs stay clean.
//
// Ported verbatim from screeb/tag/scripts/changelog/secrets.mjs — this
// module is generic text-scanning with no package-specific behavior.

const SECRET_PATTERNS = [
  { type: "AWS access key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { type: "GitHub token", regex: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g },
  { type: "Google API key", regex: /\bAIza[0-9A-Za-z_-]{30,}\b/g },
  { type: "Slack token", regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { type: "Stripe key", regex: /\b[rs]k_live_[A-Za-z0-9]{16,}\b/g },
  { type: "private key", regex: /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/g },
  {
    type: "JWT",
    regex: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g,
  },
  { type: "bearer token", regex: /\bBearer\s+[A-Za-z0-9._-]{20,}\b/g },
  { type: "URL credentials", regex: /\b[a-z][a-z0-9+.-]*:\/\/[^\s/@:]+:[^\s/@]+@/gi },
  {
    type: "secret assignment",
    regex:
      /\b(?:passwd|password|secret|api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|private[_-]?key)\b\s*[:=]\s*['"]?[A-Za-z0-9._\-/+]{8,}/gi,
  },
  {
    type: "private IP",
    regex:
      /\b(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/g,
  },
];

function mask(value) {
  const s = String(value);
  if (s.length <= 4) return "****";
  return `${s.slice(0, 4)}…(${s.length} chars, masked)`;
}

export function denylistFromEnv(env = process.env) {
  return (env.CHANGELOG_SECRET_DENYLIST || "")
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function scanForSecrets(text, extraDenylist = []) {
  const findings = [];
  const input = text || "";

  for (const { type, regex } of SECRET_PATTERNS) {
    for (const m of input.matchAll(regex)) {
      findings.push({ type, hint: mask(m[0]) });
    }
  }
  for (const term of extraDenylist) {
    if (!term) continue;
    const re = new RegExp(escapeRegExp(term), "i");
    if (re.test(input)) findings.push({ type: "denylisted term", hint: mask(term) });
  }
  return findings;
}

export function assertNoSecrets(text, extraDenylist = denylistFromEnv()) {
  const findings = scanForSecrets(text, extraDenylist);
  if (findings.length === 0) return;
  const summary = findings.map((f) => `  - ${f.type} (${f.hint})`).join("\n");
  throw new Error(
    `Refusing to publish changelog: ${findings.length} potential secret(s) detected:\n${summary}\n` +
      "Rewrite the affected notes by hand, or extend CHANGELOG_SECRET_DENYLIST if this is a false positive.",
  );
}
