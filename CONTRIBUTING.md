# Contributing

Thanks for contributing to the Screeb SDKs!

## Setup

```bash
git clone https://github.com/ScreebApp/sdk.git
cd sdk
npm install
```

## Repository structure

| Path | Contents |
|---|---|
| `packages/sdk-browser` | `@screeb/sdk-browser` — vanilla JS/TS |
| `packages/sdk-angular` | `@screeb/sdk-angular` — Angular wrapper |
| `packages/sdk-react` | `@screeb/sdk-react` — React wrapper |
| `packages/sdk-reactnative` | `@screeb/react-native` — React Native |
| `packages/sdk-flutter` | `plugin_screeb` — Flutter plugin |
| `examples/` | Demo apps (not published) |

## Build

```bash
npm run build              # all JS/TS packages
cd packages/sdk-flutter && flutter pub get && flutter build  # Flutter
```

## Testing

```bash
npm test                   # JS/TS packages
cd packages/sdk-flutter && flutter test  # Flutter
```

## Mobile examples against the local native SDKs

The mobile examples build against the published native SDKs by default, which is all external
contributors need. The native Android and iOS SDK sources are private: Screeb team members can
test unreleased changes by checking out the Screeb monorepo next to this repository
(`../screeb/sdk-android`, `../screeb/sdk-ios`) and setting `SCREEB_USE_LOCAL_SDK=true`.

| Variable | Default | Purpose |
|---|---|---|
| `SCREEB_USE_LOCAL_SDK` | unset | `true` builds against the local native SDKs |
| `SCREEB_ANDROID_SDK_PATH` | `../screeb/sdk-android` | Android SDK checkout |
| `SCREEB_IOS_SDK_PATH` | `../screeb/sdk-ios` | iOS SDK checkout |

Defaults are relative to the repository root. From a git worktree, or with checkouts elsewhere,
export absolute paths:

```bash
export SCREEB_USE_LOCAL_SDK=true
export SCREEB_ANDROID_SDK_PATH=/path/to/screeb/sdk-android
export SCREEB_IOS_SDK_PATH=/path/to/screeb/sdk-ios
```

Then, with those variables set:

| Example | Android | iOS simulator |
|---|---|---|
| `example-android` | `./gradlew :app:installDebug` | - |
| `example-ios` | - | `./use-sdk.sh`, then build in Xcode (`./use-sdk.sh` again without the variable to switch back) |
| `example-kmp` | `./gradlew :androidApp:installDebug` | `xcodebuild -project iosApp/iosApp.xcodeproj -scheme iosApp -destination 'platform=iOS Simulator,name=iPhone 17'` |
| `example-reactnative` | `npm run android` | `npm run ios` |
| `example-expo` | `npm run android` | `npm run ios` |
| `example-flutter` | `flutter run` | `node ../../scripts/build-local-ios-xcframework.mjs --output ../../packages/sdk-flutter/ios/plugin_screeb/Screeb.xcframework`, then `flutter run` |

Android builds publish or include `sdk-android` themselves; iOS builds compile `sdk-ios` from
source. Xcode opened from Finder or the Dock does not see shell variables, so run these
commands from the shell where they are exported.

The React Native `Podfile.lock` must not reference the local `sdk-ios` path: run
`pod install` in `examples/example-reactnative/ios` without `SCREEB_USE_LOCAL_SDK` before
committing it.

## Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(sdk-browser): add X`
- `fix(sdk-react): resolve Y`
- `chore: update dependencies`

## Releasing

Each package is released independently. Releases are triggered by pushing a git tag:

```bash
# JS packages — use Lerna
npm run version

# Flutter
# 1. Bump version in packages/sdk-flutter/pubspec.yaml
git tag sdk-flutter/vX.Y.Z && git push --tags

# MAUI (NuGet)
git tag sdk-maui/v0.1.0 && git push --tags
```
