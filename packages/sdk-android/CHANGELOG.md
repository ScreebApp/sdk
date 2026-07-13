# CHANGELOGS

## Version 4.0.2 [2026-07-08]

**Improvements 🚀**

- More robust session replay, even under heavy memory pressure.
- Lower CPU and memory usage while recording.
- In-app surveys and messages stay reliably in the foreground.

## Version 3.2.0 [2026-04-17]

**Improvements 🚀**

- Better in-app survey/message display across more OEM devices.
- Improved keyboard behavior so content stays readable when typing.
- More robust error handling to avoid showing technical error pages.

## Version 3.1.1 [2026-02-10]

**Improvements 🚀**

- Added `sessionReplay{start|stop}` commands.

## Version 3.1.0 [2026-02-09]

**Improvements 🚀**

- Added `getIdentity` command.
- Added Callback result to debug and debugTargeting commands.
- Added file picker support for In-App Messages.
- Improved Session Replay for complex apps.

## Version 3.0.0 [2026-01-12]

**Improvements 🚀**

- Session Replay in Beta.
- Added disableMirror to InitOptions to force disable In-App Messages mirroring and Session Replay.
- Ensure webview is not in the accessible tree when it is hidden.

## Version 2.2.10 [2025-12-18]

**Improvements 🚀**

- Remove usage of device identifier.

## Version 2.2.9 [2025-11-18]

**Improvements 🚀**

- Fixed Closing In-App Messages builder reopening it.

## Version 2.2.8 [2025-11-12]

**Improvements 🚀**

- Force requests insets on start.

## Version 2.2.7 [2025-11-05]

**Improvements 🚀**

- Enforce a non-zero size.

## Version 2.2.6 [2025-11-05]

**Improvements 🚀**

- Added debugs.

## Version 2.2.4→2.2.5 [2025-11-03]

**Improvements 🚀**

- Improved React Native and Flutter initOptions compatibility.
- Removed `useTopMostWindow`.

## Version 2.2.3 [2025-11-03]

**Improvements 🚀**

- Added debug logs.

## Version 2.2.2 [2025-10-31]

**Improvements 🚀**

- Added `useTopMostWindow` initOptions for advanced usage.
- Added public `attachToWindow` for advanced usage.

## Version 2.2.1 [2025-10-31]

**Improvements 🚀**

- Enforce Screeb to be displayed over sibling views.

## Version 2.2.0 [2025-10-23]

**Improvements 🚀**

- Added startMessage, closeMessage commands.
- Added optional distribution_id param to startSurvey.
- Added optional surveyId param to closeSurvey.

## Version 2.1.17 [2025-10-15]

**Improvements 🚀**

- Support In-App Messages.

## Version 2.1.16 [2025-10-15]

**Improvements 🚀**

- Removed deprecated "isFullscreenMode" InitOptions.
- Removed deprecated "automaticScreenDetection" InitOptions.

## Version 2.1.15 [2025-07-09]

**Improvements 🚀**

- Camera and Microphone is now optionals.

## Version 2.1.14 [2025-06-19]

**Improvements 🚀**

- Updated core version.

## Version 2.1.13 [2025-04-09]

**Improvements 🚀**

- Fixed types.

## Version 2.1.12 [2025-02-24]

**Improvements 🚀**

- Fixed "SDK is not ready".

## Version 2.1.11 [2025-02-03]

**Improvements 🚀**

- Thread safety fixes.

## Version 2.1.10 [2025-01-31]

**Improvements 🚀**

- Ensure commands execution orders.

## Version 2.1.9 [2024-12-19]

**Improvements 🚀**

- Reduce memory usage caused by logging.

## Version 2.1.8 [2024-10-02]

**Improvements 🚀**

- Add language parameter

## Version 2.1.7 [2024-09-19]

**Improvements 🚀**

- Threads improvement.

## Version 2.1.6 [2024-09-19]

**Improvements 🚀**

- Some proguards improvements.

## Version 2.1.5 [2024-09-13]

**Improvements 🚀**

- Recover Sceeb webview when the rendered crash.

## Version 2.1.4 [2024-09-12]

**Improvements 🚀**

- Increase Screeb provider priority

## Version 2.1.3 [2024-08-07]

**Improvements 🚀**

- Improve views stacking compatibility.

## Version 2.1.2 [2024-07-30]

**Improvements 🚀**

- Allow nullable hooks result.

## Version 2.1.1 [2024-07-30]

**Improvements 🚀**

- Prepare support of new hooks in secondary SDK.

## Version 2.1.0 [2024-07-29]

**Improvements 🚀**

- Support new `onSurveyDisplayAllowed` and `onMessageDisplayAllowed` hooks.
- Improved surveys hit boxes.
- Prepare support for in-app messages.
- Prepare support for session recording.
- Fixed destroy animation.

## Version 2.0.38 [2024-06-12]

**Improvements 🚀**

- Fixed activity resume.

## Version 2.0.37 [2024-05-29]

**Improvements 🚀**

- Fixed unwanted insets.

## Version 2.0.36 [2024-05-27]

**Improvements 🚀**

- Improved security.

## Version 2.0.35 [2024-04-05]

**Improvements 🚀**

- Improved handling of activities switching.

## Version 2.0.33 [2024-04-04]

**Improvements 🚀**

- Fixed a possible crash when receiving events.

## Version 2.0.32 [2024-04-03]

**Improvements 🚀**

- Multi-platform support
- Don't waive webview when not visible.

## Version 2.0.31 [2024-02-05]

**Improvements 🚀**

- Handle a rare case where a survey is not properly closed.

## Version 2.0.30 [2024-02-02]

**Improvements 🚀**

- Switched from `play core` libs to `play review` libs.
- Improved commands encoding.

## Version 2.0.29 [2024-02-01]

**Improvements 🚀**

- Fixed a possible crash on old devices.

## Version 2.0.28 [2024-01-09]

**Improvements 🚀**

- Improved context tracking.
- Improved multi-process support.

## Version 2.0.27 [2023-12-18]

**Improvements 🚀**

- Avoid overriding input soft mode on start.

## Version 2.0.26 [2023-12-11]

**Improvements 🚀**

- Improve errors reporting.
- Warn about debug mode enabled.

## Version 2.0.25 [2023-11-21]

**Improvements 🚀**

- Improve compatibility with other webviews.

## Version 2.0.23→2.0.24 [2023-10-27]

**Improvements 🚀**

- Fixed an exception and lifecycle when calling closeSdk.

## Version 2.0.20→2.0.22 [2023-10-24]

**Improvements 🚀**

- Fixed a possible crash during init of SDK.

## Version 2.0.19 [2023-09-12]

**Improvements 🚀**

- Added new init option "isDebugMode"

## Version 2.0.18 [2023-09-11]

**Improvements 🚀**

- Added commands queue to execute these commands when SDK is loaded.
- Log more possible errors.

## Version 2.0.16→2.0.17 [2023-09-07]

**Improvements 🚀**

- Fixed keyboard overlap for older Android versions.

## Version 2.0.15 [2023-09-07]

**Improvements 🚀**

- Downgrade AGP from 7.4.2 to 7.1.3 for legacy support.

## Version 2.0.14 [2023-09-06]

**Improvements 🚀**

- Upgrade Kotlin version from 1.5.21 to 1.6.0 for legacy support.

## Version 2.0.13 [2023-09-04]

**Improvements 🚀**

- Downgrade Kotlin version from 1.8.22 to 1.5.21 for legacy support.

## Version 2.0.12 [2023-09-01]

**Improvements 🚀**

- Fix a case where the survey was not displayed.

## Version 2.0.11 [2023-09-01]

**Improvements 🚀**

- Force keyboard to not overlap the survey.

## Version 2.0.10 [2023-08-31]

**Improvements 🚀**

- Improve insets handling.

## Version 2.0.9 [2023-08-24]

**Improvements 🚀**

- Improve thread safety.

## Version 2.0.8 [2023-08-23]

**Improvements 🚀**

- Unobfuscate InitOption param.

## Version 2.0.7 [2023-08-22]

**Improvements 🚀**

- Avoid the keyboard overlapping the survey.

## Version 2.0.5→2.0.6 [2023-08-21]

**Improvements 🚀**

- Allow seamless integration with Flutter/React-native.

## Version 2.0.3 [2023-08-18]

**Improvements 🚀**

- Fixed surveys not showing in some cases.

## Version 2.0.2 [2023-08-16]

**Improvements 🚀**

- Improve compatibility with other webviews packages.

## Version 2.0.1 [2023-08-04]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Reduced dependencies from 23 to 5 and the size from ~1MB to ~27KB.
- Minimum Android SDK has been reduced from 21 to 19.
- New feature called hooks

**Improvements 🚀 (Same as 2.0.0 but improves compatibility with Flutter/React-native)**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Reduced dependencies from 23 to 8 and the size from ~1MB to ~36KB.

## Version 2.0.0-rc.2 [2023-07-31]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Reduced dependencies from 23 to 5 and the size from ~1MB to ~27KB.
- Minimum Android SDK has been reduced from 21 to 19.
- Improved Flutter/React native compatibility.

## Version 2.0.0-rc.1 [2023-07-05]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Reduced dependencies from 23 to 8 and the size from ~1MB to ~36KB.

## Version 1.13.6→1.13.7 [2023-06-12]

**Improvements 🚀**

- Fixed exception in internal coroutine.

## Version 1.13.5 [2023-06-07]

**Improvements 🚀**

- New "Range rating" type of questions.

## Version 1.13.4 [2023-05-24]

**Improvements 🚀**

- Fixed crash when the host can't be resolved.

## Version 1.13.3 [2023-05-18]

**Improvements 🚀**

- Improve logger.
- Fixed moshi IllegalArgumentException.
- Fixed App Version Targeting.

## Version 1.13.1→1.13.2 [2023-05-11]

**Improvements 🚀**

- Fix multiple "End survey" buttons.

## Version 1.13.0 [2023-04-13]

**Improvements 🚀**

- Fix a bug on buttons having no emoji.

## Version 1.12.3 [2023-03-31]

**Improvements 🚀**

- Upgrade vanniktech/Emoji dependency.
    - Relative to issue: https://github.com/ScreebApp/sdk-android-public/issues/3

## Version 1.12.2 [2023-03-29]

**Improvements 🚀**

- Better log management.

## Version 1.12.1 [2023-03-10]

**Improvements 🚀**

- Validation event and group name.
- Disable Automatic screen detection.

## Version 1.12.0 [2023-02-09]

**Improvements 🚀**

- Added debug and debugTargeting commands.
- Added resetIdentity command.
- Added closeSdk command.

## Version 1.11.1 [2023-01-25]

**Improvements 🚀**

- Remove AppGlideModule override.
    - → https://bumptech.github.io/glide/doc/configuration.html#avoid-appglidemodule-in-libraries

## Version 1.11.0 [2023-01-25]

**Improvements 🚀**

- Added Response expiration.

## Version 1.10.10 [2023-01-24]

**Improvements 🚀**

- Fixed validation issues in visitor properties.

## Version 1.10.9 [2022-12-22]

**Improvements 🚀**

- Dependencies update.

## Version 1.10.7→1.10.8 [2022-12-07]

**Improvements 🚀**

- Fixed crash on unexpected question/answer flow.
- Fixed unexpected behavior on response closing.

## Version 1.10.5→1.10.6 [2022-10-29]

**Improvements 🚀**

- Replace numeric emojis by custom SVG.
- Fixed Survey superposition on the app.
