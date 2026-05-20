# example-android

Minimal Android example showing Screeb SDK integration.

> The Android SDK is closed source. See [developers.screeb.app/sdk-android/install](https://developers.screeb.app/sdk-android/install) for the full documentation.

## Requirements

- Android SDK 19+ (Android 4.4+)

## Setup

`build.gradle` (project level):

```gradle
allprojects {
    repositories {
        mavenCentral()
    }
}
```

`app/build.gradle`:

```gradle
dependencies {
    implementation 'app.screeb.sdk:survey:x.x.x'
}
```

## Permissions

`AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!-- Audio/Video feature (optional) -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

## Deep links (In-App Message editor)

Add to your main Activity in `AndroidManifest.xml`:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="screeb-<channel-id>" />
</intent-filter>
```

## Usage
