# CHANGELOGS

## Version 4.0.2 [2026-07-08]

**Improvements 🚀**

- More robust session replay, even under heavy memory pressure.
- Lower CPU and memory usage while recording.
- In-app surveys and messages stay reliably in the foreground.

**Native SDK Versions 📱**

- 🤖 Android SDK version 4.0.2: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 4.0.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 3.1.0 [2026-02-10]

**Improvements 🚀**

- Added sessionReplay{start|stop} commands.
- Added GetIdentity command.
- Return debug/debug targeting results in the command result instead of logs.
- Added file picker support for In-App Messages.
- Improved Session Replay for complex apps. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 3.1.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 3.1.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 3.0.0 [2026-01-13]

**Improvements 🚀**

- Session Replay in Beta.
- Added disableMirror to InitOptions to force disable IAM mirroring and Session Replay.
- Ensure webview is not in the accessible tree when it is hidden.

**Native SDK Versions 📱**

- 🤖 Android SDK version 3.0.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 3.0.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.2.3 [2025-11-25]

**Breaking changes ⚠️**

- SDK is now using optional named params instead of positional params.

**Improvements 🚀**

- Fixed build + init Options handling. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.2.9: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.2.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.2.2 [2025-11-18]

**Improvements 🚀**

- Fixed Closing IAM builder reopening it.
- Enforce a non-zero size. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.2.9: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.2.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.2.1 [2025-11-03]

**Improvements 🚀**

- Fixed Android Build.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.2.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.2.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.2.0 [2025-10-23]

**Breaking changes ⚠️**

- The `initSdk` method now requires a single `channelId` parameter instead of separate `androidChannelId` and `iosChannelId`.
- Make sure to update your calls to `initSdk` accordingly.

**Improvements 🚀**

- Thread safety fixes. (iOS)
- Added startMessage, closeMessage commands.
- Added optional distribution_id param to startSurvey.
- Added optional surveyId param to closeSurvey.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.2.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.2.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.11 [2025-10-16]

**Improvements 🚀**

- Support In-App Messages.
- Bump min iOS version to 12.0.
- Enforce Screeb to be displayed over sibling views. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.17: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.14: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.10 [2025-06-30]

**Improvements 🚀**

- Fixed types. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.14: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.13: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.9 [2025-06-19]

**Improvements 🚀**

- Ensure sequential messages consume. (iOS)
- Updated core version. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.14: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.13: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.8 [2025-06-04]

**Improvements 🚀**

- Auto-recover on network change.
- Fixed hitboxes on keyboard visibility changes.
- Threads improvements.
- Added "distributionId" param to startSurvey.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.12: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.12: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.6 [2025-02-24]

**Improvements 🚀**

- Fixed BuildConfig issue. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.12: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.11: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.6 [2025-02-24]

**Improvements 🚀**

- Fixed "SDK is not ready".
- Thread safety fixes.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.12: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.11: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.5 [2025-01-31]

**Improvements 🚀**

- Ensure commands execution orders.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.10: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.10: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.4 [2024-12-19]

**Improvements 🚀**

- Reduce memory usage caused by logging.
- Fixed case where content is untouchable. (iOS)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.9: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.9: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.3 [2024-10-02]

**Improvements 🚀**

- Add language parameter

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.8: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.7: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.2 [2024-07-30]

**Improvements 🚀**

- Fixed hooks thread safety. (iOS)
- Support new `onSurveyDisplayAllowed` and `onMessageDisplayAllowed` hooks.
- Fixed destroy animation.
- Improved surveys hit boxes. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.2: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.6: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.1.0→2.1.1 [2024-06-18]

**Improvements 🚀**

- Improved security
- Improved handling of activities switching. (Android)
- Fixed unwanted insets. (Android)
- Improved surveys hitboxes. (iOS)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.38: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.1.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.21 [2024-04-05]

**Improvements 🚀**

- Multi-platform support.
- Better handling of window switching. (iOS)
- Improved handling of activities switching. (Android)
- Fixed a possible crash when receiving events. (Android)
- Don't waive webview when not visible. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.35: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.11: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.20 [2024-02-05]

**Improvements 🚀**

- Handle a rare case where a survey is not properly closed.
- Improved commands encoding.
- Switched from `play core` libs to `play review` libs. (Android)
- Fixed a possible crash on old devices. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.31: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.10: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.19 [2024-01-11]

**Improvements 🚀**

- Fixed iOS properties Bool/Int incorrect values.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.28: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.9: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.18 [2024-01-09]

**Improvements 🚀**

- Improved context tracking.
- Improved multi-process support. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.28: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.9: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.17 [2024-01-03]

**Improvements 🚀**

- Fixed Close/Init SDK lifecycle. (iOS)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.27: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.8: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.16 [2023-12-18]

**Improvements 🚀**

- Added closeSurvey command.
- Avoid overriding input soft mode on start. (Android)
- Improve compatibility with other webviews (Android)
- Properly handle SSL errors. (iOS)
- Improve errors reporting.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.27: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.7: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.14→2.0.15 [2023-10-27]

**Improvements 🚀**

- Fixed an exception and lifecycle when calling closeSdk.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.24: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.13 [2023-10-25]

**Improvements 🚀**

- Fixed a possible crash during the initialization of the SDK.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.24: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.12 [2023-09-01]

**Improvements 🚀**

- Fixed a case where the survey was not displayed.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.12: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.11 [2023-09-01]

**Improvements 🚀**

- Forced the keyboard to not overlap the survey.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.11: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.10 [2023-08-31]

**Improvements 🚀**

- Improved insets handling

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.10: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.9 [2023-08-24]

**Improvements 🚀**

- Improved thread safety

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.9: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.8 [2023-08-22]

**Improvements 🚀**

- Avoided the keyboard overlapping the survey

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.7: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.7 [2023-08-21]

**Improvements 🚀**

- Added InitProvider to allow setting up the plugin without overriding the Application class.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.6: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.6 [2023-08-21]

**Improvements 🚀**

- Reduced iOS minimum version to 11.0.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.4: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.5 [2023-08-18]

**Improvements 🚀**

- Caught possible exceptions when parsing messages.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.4: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.4 [2023-08-18]

**Improvements 🚀**

- Fixed surveys not showing in some cases.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.3: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.3 [2023-08-16]

**Improvements 🚀**

- Improved compatibility with other webviews plugins.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.2: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.1 and 2.0.2 [2023-08-07]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and to be even lighter.
- Improved Android Flutter compatibility.
- Introduced Hooks.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 2.0.0 [2023-08-04]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Improved Android Flutter compatibility.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 1.0.0-rc.2 [2023-07-31]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Improved Android Flutter compatibility.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.0-rc.2: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0-rc.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 1.0.0-rc.1 [2023-07-05]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.0-rc.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 2.0.0-rc.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.7 [2023-07-12]

**Improvements 🚀**

- Resolved an unhandled exception in Android's internal coroutine.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.13.7: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.13.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.6 [2023-06-07]

**Improvements 🚀**

- Added a new "Range rating" type of questions.
- Fixed a crash that occurred when the host couldn't be resolved.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.13.5: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.13.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.5 [2023-05-17]

**Improvements 🚀**

- Enhanced the logger.
- Fixed a Moshi IllegalArgumentException.
- Improved Version Targeting.
- Updated Gradle version.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.13.3: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.13.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.4 [2023-04-28]

**Improvements 🚀**

- The "startSurvey" command now accepts the "ignoreSurveyStatus" argument (default: true).
- Fixed multiple "End survey" buttons.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.13.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.13.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.3 [2023-03-31]

**Improvements 🚀**

- Updated dependencies, including vanniktech/Emoji.
- Improved log management.
- Enhanced error handling.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.12.3: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.12.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.2 [2023-03-10]

**Improvements 🚀**

- Added validation for event and group names.
- Implemented automatic screen detection.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.12.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.12.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.1 [2023-02-24]

**Improvements 🚀**

- Resolved some build issues with iOS.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.12.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.12.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.2.0 [2023-02-10]

**Improvements 🚀**

- Added "debug" and "debugTargeting" commands.
- Introduced the "resetIdentity" command.
- Included "closeSdk" functionality.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.12.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.12.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.1.3 [2022-12-22]

**Improvements 🚀**

- Fixed crashes occurring during unexpected question/answer flows.
- Resolved unexpected behavior when closing responses.
- Updated dependencies for Android.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.10.9: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.10.4: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.1.2 [2022-12-22]

**Improvements 🚀**

- Made targeting more reliable to avoid triggering surveys in corner cases.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.10.6: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.10.4: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.1.1 [2022-10-18]

**Improvements 🚀**

- Replaced number emojis with custom emojis.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.10.5: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.10.3: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.1.0 [2022-10-14]

**Improvements 🚀**

- Implemented the "startSurvey" feature.
- Implemented (un)assignGroup features.
- (Un)assignGroup now permits null properties.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.10.4: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.10.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)
- Special thanks to @jeff-odopass for his assistance. 😊

## Version 0.0.18 [2022-08-03]

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.9.2: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.8.2: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.17 [2022-06-29]

**Improvements 🚀**

- Fixed tablet multiple choices appearance.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.9.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.8.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.16 [2022-06-28]

**Improvements 🚀**

- Added assignGroup command.
- Added session targeting support.
- Fixed translation for Card close text.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.9.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.8.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.15 [2022-06-20]

**Improvements 🚀**

- Fixed cut icons in Cards format.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.8.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.14 [2022-06-17]

**Improvements 🚀**

- Chat mode design improved.
- Card mode design improved.
- startSurvey command added.
- Quota management improved.
- Session targeting added.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.8.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.13 [2022-06-02]

**Improvements 🚀**

- Fixed NPS wrong values issue.
- Fixed message widget border issue.
- Fixed non-ASCII keyboard issue.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.6.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.12 [2022-05-23]

**Improvements 🚀**

- Fixed NPS wrong values issue.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.1: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.5.1: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.11 [2022-04-15]

**Improvements 🚀**

- Fixed compilation bug due to old Moshi version.
- Cards format now ready to use.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.5.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.10 [2022-03-16]

**Improvements 🚀**

- Optional properties can be omitted, ex: setIdentity("user_id")

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.5.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.9 [2022-03-07]

**Improvements 🚀**

- Performance improvements.
- Threads related crashes fixed.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.4.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.8 [2022-03-04]

**Improvements 🚀**

- Fixed screen targeting issue.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.3.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.7 [2022-03-04]

**Improvements 🚀**

- Fixed null property issue.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.7.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.2.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.6 [2022-02-25]

**Improvements 🚀**

- Adedd Appstore rating/review.
- Fixed network issue when device is not connected.
- Message widget format fixed (line breaks).
- Accurate quota management.
- Fixed display latencies.
- Added top mask gradient.
- Question answered format improved (text inlined).
- Fixed first message cut issue.
- Fixed keyboard masking input fields.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.6.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.2.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.5 [2022-02-10]

**Improvements 🚀**

- Fixed README documentation.

## Version 0.0.4 [2022-02-10]

**Improvements 🚀**

- Renamed tracking methods and setProperties.
- Many bugs fixed.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.4.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 1.1.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.3 [2022-01-25]

**Improvements 🚀**

- Added english translations.
- Improved survey triggering speed.
- Fixed bugs.

**Native SDK Versions 📱**

- 🤖 Android SDK version 1.3.0: [Release Notes](https://www.notion.so/screeb/Android-SDK-4e588a60a5b94e40bfb44595c9defe60)
- 🍎 iOS SDK version 0.9.0: [Release Notes](https://www.notion.so/screeb/iOS-SDK-4ad6756875a14f2eb60711b86150a29d)

## Version 0.0.2 [2022-01-04]

**Improvements 🚀**

- Support SDK initialization as part of the plugin
- Manage platform-specific SDKs versions internally

## Version 0.0.1 [2021-12-17]

**Improvements 🚀**

- Initial version
- Support Android/iOS Screeb SDKs
- Public API for commands: setIdentity, sendTrakingEvent, sendTrackingScreen, visitorProperty
