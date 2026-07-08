<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-kmp/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">Screeb KMP SDK</h1>
<p align="center">
  Screeb's mobile SDK for Kotlin Multiplatform (Android &amp; iOS).

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://search.maven.org/artifact/app.screeb.sdk.kmp/screeb-kmp" alt="Maven Central">
    <img src="https://img.shields.io/maven-central/v/app.screeb.sdk.kmp/screeb-kmp.svg?label=Maven%20Central" alt="Maven Central">
  </a>
  <a href="https://cocoapods.org/pods/Screeb" alt="CocoaPods">
    <img src="https://img.shields.io/cocoapods/v/Screeb.svg?style=flat" alt="Cocoapods">
  </a>
  <a href="https://search.maven.org/search?q=g:%22app.screeb.sdk%22%20AND%20a:%22survey%22" alt="Native Android SDK">
    <img src="https://img.shields.io/maven-central/v/app.screeb.sdk/survey.svg?label=Native%20Android" alt="Native Android SDK">
  </a>
  <a href="https://screeb.app/terms">
    <img src="https://img.shields.io/badge/license-Proprietary-purple.svg" alt="License: Proprietary">
  </a>
</p>

Kotlin Multiplatform SDK for the [Screeb](https://screeb.app) survey & messaging platform.

Supports **Android** and **iOS** targets. Wraps the native [Android](https://github.com/ScreebApp/sdk-android) and iOS SDKs behind a single idiomatic Kotlin suspend-fun API.

## Installation

Add to your `build.gradle.kts`:

```kotlin
commonMain.dependencies {
    implementation("app.screeb.sdk.kmp:screeb-kmp:0.1.0")
}
```

> **Building from source:** Android uses `SCREEB_ANDROID_SDK_VERSION` and iOS uses `SCREEB_IOS_SDK_VERSION`, so both native SDKs can move independently. Screeb contributors can set `SCREEB_USE_LOCAL_SDK=true` to build against sibling `../sdk-android` and `../sdk-ios` checkouts without publishing native releases.

## Package Size

Current package size snapshot. Native SDK sizes are listed separately to help estimate app impact:

- KMP Maven artifacts: 143.9 KB, 7 files
- native Android SDK AAR: 110.3 KB
- native iOS app size impact: about 450 KB

## Battery usage

Screeb is optimized to minimize battery impact. Most features are event-driven, and session replay adapts automatically to app activity and device conditions.

When session replay is enabled, the SDK reduces work while idle and under Low Power Mode, Battery Saver, thermal pressure, or memory pressure. It prioritizes reducing image quality, resolution, and changed-region processing before lowering active capture cadence.

## Usage

```kotlin
import app.screeb.sdk.kmp.Screeb
import app.screeb.sdk.kmp.ScreebInitOptions
import app.screeb.sdk.kmp.ScreebHooks

// Initialize (call once, e.g. in App.kt LaunchedEffect)
Screeb.initSdk(
    channelId = "YOUR_CHANNEL_ID",
    userId = "user_123",
    properties = mapOf("plan" to "pro"),
    initOptions = ScreebInitOptions(isDebugMode = false),
)

// Track events
Screeb.trackEvent("button_tapped", mapOf("source" to "home"))
Screeb.trackScreen("HomeScreen")

// Identity
Screeb.setIdentity("user_456", mapOf("email" to "user@example.com"))
Screeb.setProperties(mapOf("language" to "fr"))
Screeb.resetIdentity()

// Groups
Screeb.assignGroup(groupName = "beta_testers")
Screeb.unassignGroup(groupName = "beta_testers")

// Surveys & Messages
Screeb.startSurvey("survey-id")
Screeb.closeSurvey()
Screeb.startMessage("message-id")
Screeb.closeMessage()

// Session replay
Screeb.sessionReplayStart()
Screeb.sessionReplayStop()

// Privacy helpers for native Android View and iOS UIView
view.screebMaskText()
view.screebNoCapture()
view.screebId("checkout_button")

// Debug
val debugInfo = Screeb.debug()
val targeting = Screeb.debugTargeting()

// Hooks
Screeb.startSurvey(
    surveyId = "survey-id",
    hooks = ScreebHooks(
        version = "1.0.0",
        callbacks = mapOf(
            "onSurveyShowed" to { payload -> println("Survey shown: $payload") },
            "onSurveyCompleted" to { payload -> println("Survey completed: $payload") },
        )
    )
)
```

## API Reference

| Method | Description |
|---|---|
| `initSdk(channelId, userId?, properties?, hooks?, initOptions?, language?)` | Initialize the SDK |
| `closeSdk()` | Tear down SDK and clear hook registry |
| `setIdentity(userId, properties?)` | Identify the current user |
| `setProperties(properties?)` | Update visitor properties |
| `resetIdentity()` | Reset to anonymous visitor |
| `getIdentity()` | Fetch current identity as `Map<String, Any>` |
| `assignGroup(groupType?, groupName, properties?)` | Assign visitor to a group |
| `unassignGroup(groupType?, groupName, properties?)` | Remove visitor from a group |
| `trackEvent(name, properties?)` | Track a custom event |
| `trackScreen(name, properties?)` | Track a screen view |
| `startSurvey(surveyId, ...)` | Programmatically start a survey |
| `closeSurvey(surveyId?)` | Close currently open survey |
| `startMessage(messageId, ...)` | Programmatically start a message |
| `closeMessage(messageId?)` | Close currently open message |
| `sessionReplayStart()` | Start session replay recording |
| `sessionReplayStop()` | Stop session replay recording |
| `debug()` | Fetch SDK debug info as JSON string |
| `debugTargeting()` | Fetch targeting debug info as JSON string |

All methods return `Boolean?` (or the appropriate type), and `null` on unexpected error. Wrap calls in `runCatching {}` for robust error handling.

## Requirements

- Kotlin 2.1.0+
- Android minSdk 21
- iOS 14+

## Documentation

- Install guide: [developers.screeb.app/sdk-kmp/install](https://developers.screeb.app/sdk-kmp/install)
- API reference: [developers.screeb.app/sdk-kmp/reference](https://developers.screeb.app/sdk-kmp/reference)

## Support

For any issues, please contact our support team at support@screeb.app.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same license terms that the project is provided under.

## License

Proprietary — see [Screeb Terms of Service](https://screeb.app/terms).
