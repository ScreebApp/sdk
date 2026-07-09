// Single source of truth mapping each publishable package in this monorepo
// to its git tag convention. Used by scripts/changelog/{generate,sync,
// resolve-package}.mjs to resolve which package a tag/release belongs to.
//
// The tag prefixes here must be kept in sync by hand with the `if:` gate in
// .github/workflows/changelog-publish.yml and the `tags:` list in
// .github/workflows/changelog-draft.yml — the same trade-off screeb's own
// tag-changelog-publish.yml already accepts for its single package.

const RAW_PACKAGES = [
  { dir: "sdk-browser", displayName: "Screeb Browser SDK", tagPrefix: "@screeb/sdk-browser@" },
  { dir: "sdk-angular", displayName: "Screeb Angular SDK", tagPrefix: "@screeb/sdk-angular@" },
  { dir: "sdk-react", displayName: "Screeb React SDK", tagPrefix: "@screeb/sdk-react@" },
  { dir: "sdk-vue", displayName: "Screeb Vue SDK", tagPrefix: "@screeb/sdk-vue@" },
  { dir: "sdk-svelte", displayName: "Screeb Svelte SDK", tagPrefix: "@screeb/sdk-svelte@" },
  { dir: "sdk-reactnative", displayName: "Screeb React Native SDK", tagPrefix: "@screeb/react-native@" },
  { dir: "sdk-flutter", displayName: "Screeb Flutter SDK", tagPrefix: "sdk-flutter/v" },
  { dir: "sdk-kmp", displayName: "Screeb Kotlin Multiplatform SDK", tagPrefix: "sdk-kmp/v" },
  { dir: "sdk-maui", displayName: "Screeb .NET MAUI SDK", tagPrefix: "sdk-maui/v" },
];

export const PACKAGES = RAW_PACKAGES.map((pkg) => ({
  ...pkg,
  tagGlob: `${pkg.tagPrefix}*`,
}));

export function resolvePackageByTag(tag) {
  const pkg = PACKAGES.find((p) => tag.startsWith(p.tagPrefix));
  if (!pkg) throw new Error(`no package matches tag "${tag}"`);
  return pkg;
}

export function resolvePackageByDir(dir) {
  const pkg = PACKAGES.find((p) => p.dir === dir);
  if (!pkg) throw new Error(`unknown package dir "${dir}"`);
  return pkg;
}

export function versionFromTag(tag, pkg = resolvePackageByTag(tag)) {
  return tag.slice(pkg.tagPrefix.length);
}
