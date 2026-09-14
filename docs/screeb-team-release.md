# Screeb team release workflow

Internal notes for updating wrapper versions and testing local native SDK changes before publishing.

## Version source of truth

Native and wrapper versions live in `sdk-versions.json`.

```bash
npm run versions:sync
npm run versions:check
```

Edit `sdk-versions.json`, then run `versions:sync` to update generated version references. Android and iOS native SDK versions are independent: use `native.android` for Maven Central and `native.ios` for CocoaPods/SPM.

## Local native SDK testing

The native SDKs live in the screeb monorepo. Keep it next to this repository for
the default local flow:

```text
Screeb/
  sdk/
  screeb/
    sdk-android/
    sdk-ios/
```

Override with `SCREEB_MONOREPO_PATH`, or per platform with
`SCREEB_ANDROID_SDK_PATH` / `SCREEB_IOS_SDK_PATH`.

Then build the wrapper or example with:

```bash
SCREEB_USE_LOCAL_SDK=true <normal build command>
```

Optional overrides:

```bash
SCREEB_MONOREPO_PATH=/absolute/path/to/screeb
SCREEB_ANDROID_SDK_PATH=/absolute/path/to/sdk-android
SCREEB_IOS_SDK_PATH=/absolute/path/to/sdk-ios
```

No native SDK release is required for this flow.

## Useful local commands

```bash
# Android native example
SCREEB_USE_LOCAL_SDK=true ./gradlew :app:assembleDebug --no-daemon \
  -p examples/example-android

# React Native Android
cd examples/example-reactnative/android
SCREEB_USE_LOCAL_SDK=true ./gradlew :app:assembleDebug --no-daemon

# Flutter Android
cd examples/example-flutter/android
SCREEB_USE_LOCAL_SDK=true ./gradlew :app:assembleDebug --no-daemon

# Expo Android
cd examples/example-expo
SCREEB_USE_LOCAL_SDK=true npx expo prebuild --platform android --clean --no-install
cd android
SCREEB_USE_LOCAL_SDK=true ./gradlew :app:assembleDebug --no-daemon

# KMP
SCREEB_USE_LOCAL_SDK=true ./gradlew build --no-daemon \
  -p packages/sdk-kmp

# MAUI package
SCREEB_USE_LOCAL_SDK=true dotnet build packages/sdk-maui/ScreebMaui.csproj \
  -f net9.0-android
SCREEB_USE_LOCAL_SDK=true dotnet build packages/sdk-maui/ScreebMaui.csproj \
  -f net9.0-ios
```

## How the local switch works

Android:

- Android and KMP Gradle builds use a local Gradle composite for `../sdk-android`.
- Flutter, React Native and Expo automatically publish `../sdk-android` to Maven local during native project configuration. This keeps their normal Maven dependency path while avoiding a manual release.
- MAUI builds the local Android AAR from `../sdk-android` and binds that AAR directly.

iOS:

- Flutter, React Native and Expo use the local `../sdk-ios` pod when `SCREEB_USE_LOCAL_SDK=true`.
- KMP and MAUI build a temporary `Screeb.xcframework` from `../sdk-ios` through `scripts/build-local-ios-xcframework.mjs`.
- Flutter's SwiftPM manifest (`packages/sdk-flutter/ios/plugin_screeb/Package.swift`) honors the same `SCREEB_USE_LOCAL_SDK=true` switch, but a manifest can't invoke `xcodebuild` itself — build the xcframework once first, into the plugin package itself:

  ```bash
  node scripts/build-local-ios-xcframework.mjs \
    --output packages/sdk-flutter/ios/plugin_screeb/Screeb.xcframework
  ```

  Unlike KMP/MAUI, this output path is not optional: Flutter resolves a plugin's `Package.swift` through a per-build symlink (`ios/Flutter/ephemeral/Packages/.packages/<plugin>-<version>`), and relative paths in the manifest resolve against that symlink's own location, not the plugin's real path in this monorepo — so the `binaryTarget` path can't use `..` to reach outside the package. The manifest reads the xcframework from a fixed in-package path, no env var override.

  SwiftPM also caches manifest evaluation by file content, not by environment — toggling `SCREEB_USE_LOCAL_SDK` without changing the manifest itself may need `flutter clean` before it's picked up.
- Generated local artifacts stay under ignored build folders.

## SDK size report

To build wrapper artifacts and inspect local sizes:

```bash
npm run size:sdks
```

This is informational only. Use `npm run size:sdks -- --no-build` to read existing local artifacts without rebuilding.

Current iOS native release reference:

- full `Screeb.xcframework`: 1.36 MB
- iOS app embed impact: about 449.4 KB, because release apps embed only the device slice; the simulator slice is build-time only

## Public documentation references

Public API reference pages live in the docs repository:

```text
../screeb/docs/public/docs/<sdk>/reference.md
```

Regenerate them from the SDK source files after any public API, hook payload, wrapper, or documentation-link change:

```bash
npm run docs:reference:update
npm run docs:reference:check
npm run docs:reference:coverage
```

The generator is `scripts/update-public-docs-reference.mjs`. Keep extraction source-driven when possible; only edit the SDK-specific descriptions, groups, links, or known capability rules in that script.

Before publishing docs, validate the public docs app:

```bash
cd ../screeb/docs/public
pnpm typecheck
pnpm build
```

## Release validation

Run the release matrix before publishing native SDKs or wrappers:

```bash
npm run verify:release
```

To inspect the matrix without running it:

```bash
npm run verify:release -- --list
```

To run one area only:

```bash
npm run verify:release -- --scope=android
npm run verify:release -- --scope=flutter,react-native
```

The matrix uses `SCREEB_USE_LOCAL_SDK=true` by default and expects the screeb monorepo next to this repository, with the native SDKs under `screeb/sdk-android` and `screeb/sdk-ios`.

The MAUI gate binds the Android AAR from the local Maven repository, so publish it first:

```bash
cd ../screeb/sdk-android && ./gradlew :sdk:publishReleasePublicationToMavenLocal
```
Set `SCREEB_IOS_TEST_DESTINATION` to override the simulator used by the iOS SDK test step.

## Release checklist

1. Release the native SDKs from the monorepo: `../screeb/sdk-ios/release.sh <version>` and/or `../screeb/sdk-android/release.sh <version>`.
2. Edit `sdk-versions.json`.
3. Run `npm run versions:sync`.
4. Run `npm run versions:check`.
5. Run `npm run verify:release`.
6. Run `npm run size:sdks`.
7. Release the public wrappers with the updated native dependency versions.
