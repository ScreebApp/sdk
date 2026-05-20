# example-android

Minimal Android example showing Screeb SDK integration.

> The Android SDK is closed source. See [developers.screeb.app](https://developers.screeb.app) for the full documentation.

## Requirements

- Android 5.0+ (API 21+)
- Android Studio Hedgehog+

## Setup

Add in your `settings.gradle`:

```gradle
dependencyResolutionManagement {
    repositories {
        maven { url "https://raw.githubusercontent.com/ScreebApp/sdk-android/master" }
    }
}
```

Add in your `app/build.gradle`:

```gradle
dependencies {
    implementation "app.screeb.sdk:screeb-sdk-android:<version>"
}
```

## Usage
