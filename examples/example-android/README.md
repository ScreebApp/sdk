# Screeb Android Example

Complete native Android example for the Screeb Android SDK.

Full documentation: [developers.screeb.app/sdk-android/install](https://developers.screeb.app/sdk-android/install)

## What This Example Covers

- SDK initialization with visitor properties
- Deep link handling for the Screeb editor
- Identity and visitor property updates
- Event and screen tracking
- Programmatic survey/message start
- Session replay start/stop
- SDK debug command
- Optional camera/microphone permissions for media questions

## Requirements

- Android Studio
- Android SDK 35
- JDK 17

## Run

From this directory:

```bash
./gradlew :app:installDebug
```

To verify the SDK consumer ProGuard rules in a minified app build:

```bash
./gradlew :app:assembleRelease
```

## Deep Links

The manifest registers:

```xml
<data android:scheme="screeb-${screebChannelId}" />
```

The example uses the same demo channel ID in the manifest and in `Screeb.initSdk`.

## Files

- [settings.gradle](settings.gradle): plugin and repository configuration
- [app/build.gradle](app/build.gradle): app module and Screeb dependency
- [AndroidManifest.xml](app/src/main/AndroidManifest.xml): permissions and deep links
- [MainActivity.kt](app/src/main/kotlin/app/screeb/example/MainActivity.kt): complete SDK usage sample
