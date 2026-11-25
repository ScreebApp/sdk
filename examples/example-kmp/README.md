# Screeb Kotlin Multiplatform example

Compose Multiplatform app used to exercise the `screeb-kmp` SDK in
[`packages/sdk-kmp`](../../packages/sdk-kmp), included as a composite build.

> Documentation: [packages/sdk-kmp/README.md](../../packages/sdk-kmp/README.md)

- `composeApp`: shared UI ([`App.kt`](composeApp/src/commonMain/kotlin/app/screeb/example/kmp/App.kt))
- `androidApp`: Android entry point
- `iosApp`: iOS entry point (Xcode project)

## Run

```bash
./gradlew :androidApp:installDebug
xcodebuild -project iosApp/iosApp.xcodeproj -scheme iosApp -destination 'platform=iOS Simulator,name=iPhone 17'
```

The iOS app embeds `packages/sdk-kmp/native/ios/Screeb.xcframework`: download it from the
[sdk-ios-public releases](https://github.com/ScreebApp/sdk-ios-public/releases), or build
against the local native SDKs instead (see
[CONTRIBUTING.md](../../CONTRIBUTING.md#mobile-examples-against-the-local-native-sdks)).
