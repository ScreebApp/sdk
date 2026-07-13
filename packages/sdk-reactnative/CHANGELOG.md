# CHANGELOGS

## Version 4.0.2 [2026-07-08]

**Improvements 🚀**

- More robust session replay, even under heavy memory pressure.
- Lower CPU and memory usage while recording.
- In-app surveys and messages stay reliably in the foreground.

**Native SDK Versions 📱**

- 🤖 Android SDK version 4.0.2: Release Notes
- 🍎 iOS SDK version 4.0.2: Release Notes

## Version 3.1.0 [2026-02-12]

**Improvements 🚀**

- Added sessionReplay{start|stop} commands.
- Added GetIdentity command.
- Return debug/debug targeting results in the command result instead of logs.
- Added file picker support for In-App Messages.
- Improved Session Replay for complex apps. (Android)
- Fixed unassignGroup that was calling assignGroup (iOS)

**Native SDK Versions 📱**

- 🤖 Android SDK version 3.1.1: Release Notes
- 🍎 iOS SDK version 3.1.1: Release Notes

## Version 3.0.0 [2026-01-13]

**Improvements 🚀**

- Session Replay in Beta.
- Added disableMirror to InitOptions to force disable IAM mirroring and Session Replay.
- Ensure webview is not in the accessible tree when it is hidden.

**Native SDK Versions 📱**

- 🤖 Android SDK version 3.0.0: Release Notes
- 🍎 iOS SDK version 3.0.2: Release Notes

## Version 2.2.1 [2025-11-20]

**Improvements 🚀**

- Fixed Closing IAM builder reopening it.
- Enforce a non-zero size. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.2.9: Release Notes
- 🍎 iOS SDK version 2.2.2: Release Notes

## Version 2.2.0 [2025-11-06]

**Breaking changes ⚠️**

- The `initSdk` method now requires a single `channelId` parameter instead of separate `androidChannelId` and `iosChannelId`.
- Make sure to update your calls to `initSdk` accordingly.

**Improvements 🚀**

- Now using new React Native architecture.
- Enforce a non-zero size. (Android)
- Added startMessage, closeMessage commands.
- Added optional distribution_id param to startSurvey.
- Added optional surveyId param to closeSurvey.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.2.7: Release Notes
- 🍎 iOS SDK version 2.2.0: Release Notes

## Version 2.1.18 [2025-10-16]

**Improvements 🚀**

- Support In-App Messages.
- Bump min iOS version to 12.0.
- Enforce Screeb to be displayed over sibling views. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.17: Release Notes
- 🍎 iOS SDK version 2.1.14: Release Notes

## Version 2.1.17 [2025-10-08]

**Improvements 🚀**

- Ensure sequential messages consume. (iOS)
- Updated core version. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.14: Release Notes
- 🍎 iOS SDK version 2.1.13: Release Notes

## Version 2.1.11→2.1.16 [2025-04-17]

**Improvements 🚀**

- Fixed Android type.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.13: Release Notes
- 🍎 iOS SDK version 2.1.11: Release Notes

## Version 2.1.10 [2025-02-24]

**Improvements 🚀**

- Fixed "SDK is not ready".
- Thread safety fixes.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.12: Release Notes
- 🍎 iOS SDK version 2.1.11: Release Notes

## Version 2.1.9 [2025-01-31]

**Improvements 🚀**

- Ensure commands execution orders.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.10: Release Notes
- 🍎 iOS SDK version 2.1.10: Release Notes

## Version 2.1.8 [2024-12-19]

**Improvements 🚀**

- Reduce memory usage caused by logging.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.9: Release Notes
- 🍎 iOS SDK version 2.1.9: Release Notes

## Version 2.1.7 [2024-12-09]

**Improvements 🚀**

- Fixed case where content is untouchable.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.8: Release Notes
- 🍎 iOS SDK version 2.1.8: Release Notes

## Version 2.1.6 [2024-10-02]

**Improvements 🚀**

- Add language parameter

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.8: Release Notes
- 🍎 iOS SDK version 2.1.7: Release Notes

## Version 2.1.5 [2024-08-21]

**Improvements 🚀**

- Allow async callbacks for `onSurveyDisplayAllowed` and `onMessageDisplayAllowed` hooks.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.2: Release Notes
- 🍎 iOS SDK version 2.1.6: Release Notes

## Version 2.1.1→2.1.4 [2024-07-30]

**Improvements 🚀**

- Support new `onSurveyDisplayAllowed` and `onMessageDisplayAllowed` hooks.
- Fixed destroy animation.
- Improved surveys hit boxes. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.1.2: Release Notes
- 🍎 iOS SDK version 2.1.6: Release Notes

## Version 2.1.0 [2024-06-18]

**Improvements 🚀**

- Improved security
- Improved handling of activities switching. (Android)
- Fixed unwanted insets. (Android)
- Improved surveys hitboxes. (iOS)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.38: Release Notes
- 🍎 iOS SDK version 2.1.1: Release Notes

## Version 2.0.23 [2024-04-05]

**Improvements 🚀**

- Multi-platform support.
- Better handling of window switching. (iOS)
- Improved handling of activities switching. (Android)
- Fixed a possible crash when receiving events. (Android)
- Don't waive webview when not visible. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.35: Release Notes
- 🍎 iOS SDK version 2.0.11: Release Notes

## Version 2.0.22 [2024-02-05]

**Improvements 🚀**

- Handle a rare case where a survey is not properly closed.
- Improved commands encoding.
- Switched from `play core` libs to `play review` libs. (Android)
- Fixed a possible crash on old devices. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.31: Release Notes
- 🍎 iOS SDK version 2.0.10: Release Notes

## Version 2.0.21 [2024-01-11]

**Improvements 🚀**

- Fixed iOS properties Bool/Int incorrect values.

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.28: Release Notes
- 🍎 iOS SDK version 2.0.9: Release Notes

## Version 2.0.20 [2024-01-09]

**Improvements 🚀**

- Improved context tracking.
- Improved multi-process support. (Android)

**Native SDK Versions 📱**

- 🤖 Android SDK version 2.0.28: Release Notes
- 🍎 iOS SDK version 2.0.9: Release Notes

## Version 2.0.19 [2024-01-03]

**Improvements 🚀**

- Fixed Close/Init SDK lifecycle. (iOS)

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.27: Release Notes
- 🍎 iOS SDK version 2.0.8: Release Notes

## Version 2.0.18 [2023-12-18]

**Improvements 🚀**

- Avoid overriding input soft mode on start. (Android)

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.27: Release Notes
- 🍎 iOS SDK version 2.0.7: Release Notes

## Version 2.0.17 [2023-12-11]

**Improvements 🚀**

- Improve errors reporting.
- Properly handle SSL errors. (iOS)

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.26: Release Notes
- 🍎 iOS SDK version 2.0.7: Release Notes

## Version 2.0.12→2.0.16 [2023-12-08]

**Improvements 🚀**

- Improve iOS errors reporting.
- Added closeSurvey command.
- Added new param "initOptions" with "isDebugMode" (**iOS only**)
    - ‼️ Should never be used on prod as surveys view will be forced to be on top of the app

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.25: Release Notes
- 🍎 iOS SDK version 2.0.4: Release Notes

## Version 2.0.11 [2023-12-06]

**Improvements 🚀**

- Let iOS properly detect view controller.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.25: Release Notes
- 🍎 iOS SDK version 2.0.3: Release Notes

## Version 2.0.10 [2023-12-05]

**Improvements 🚀**

- Fixed iOS thread.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.25: Release Notes
- 🍎 iOS SDK version 2.0.3: Release Notes

## Version 2.0.9 [2023-12-01]

**Improvements 🚀**

- Fixed iOS compilation.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.25: Release Notes
- 🍎 iOS SDK version 2.0.3: Release Notes

## Version 2.0.8 [2023-11-30]

**Improvements 🚀**

- Improve compatibility with other webviews.
- Remove few superfluous threads handling.

**Breaking changes 🔨**

- Remove the need to call `setAppContext` in onCreate.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.25: Release Notes
- 🍎 iOS SDK version 2.0.3: Release Notes

## Version 2.0.7 [2023-10-27]

**Improvements 🚀**

- Fixed an exception and lifecycle when calling closeSdk.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.24: Release Notes
- 🍎 iOS SDK version 2.0.3: Release Notes

## Version 2.0.6 [2023-10-25]

**Improvements 🚀**

- Fixed a possible crash during the initialization of the SDK.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.22: Release Notes
- 🍎 iOS SDK version 2.0.3: Release Notes

## Version 2.0.5 [2023-09-01]

**Improvements 🚀**

- Fixed a case where survey was not displayed.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.12: Release Notes
- 🍎 iOS SDK version 2.0.0: Release Notes

## Version 2.0.4 [2023-09-01]

**Improvements 🚀**

- Force keyboard to not overlap survey.
- Improve insets handling.
- Improve thread safety.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.11: Release Notes
- 🍎 iOS SDK version 2.0.0: Release Notes

## Version 2.0.3 [2023-08-22]

**Improvements 🚀**

- Avoid keyboard to overlap survey.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.7: Release Notes
- 🍎 iOS SDK version 2.0.0: Release Notes

## Version 2.0.2 [2023-08-18]

**Improvements 🚀**

- Fixed surveys not showing in some cases.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.3: Release Notes
- 🍎 iOS SDK version 2.0.0: Release Notes

## Version 2.0.1 [2023-08-16]

**Improvements 🚀**

- Improved compatibility with other webviews plugins.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.2: Release Notes
- 🍎 iOS SDK version 2.0.0: Release Notes

## Version 2.0.0 [2023-08-04]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Improved Android React native compatibility.
- New feature called hooks.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.1: Release Notes
- 🍎 iOS SDK version 2.0.0: Release Notes

## Version 1.0.0-rc.2 [2023-07-31]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- Improved Android React native compatibility.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.0-rc.2: Release Notes
- 🍎 iOS SDK version 2.0.0-rc.3: Release Notes

## Version 1.0.0-rc.1 [2023-07-05]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.

**Native SDK version 📱**

- 🤖 Android SDK version 2.0.0-rc.1: Release Notes
- 🍎 iOS SDK version 2.0.0-rc.3: Release Notes

## Version 0.8.21 [2023-06-12]

**Improvement 🚀**

- Fixed unhandled exception in Android internal coroutine.

**Native SDK version 📱**

- 🤖 Android SDK version 1.13.7: Release Notes
- 🍎 iOS SDK version 1.13.2: Release Notes

## Version 0.8.20 [2023-06-07]

**Improvement 🚀**

- Added new "Range rating" type of questions.
- Fixed crash when host can't be resolved.

**Native SDK version 📱**

- 🤖 Android SDK version 1.13.5: Release Notes
- 🍎 iOS SDK version 1.13.2: Release Notes

## Version 0.8.19 [2023-05-11]

**Improvement 🚀**

- Updated gradle to 7.6 and update dependencies.
- Types declaration.

## Version 0.8.16 [2023-04-28]

**Improvement 🚀**

- `startSurvey` command now accepts the `ignoreSurveyStatus` argument (default: true).
- Fixed multiple "End survey" buttons.

## Version 0.8.15 [2023-03-31]

**Improvement 🚀**

- Dependency update: vanniktech/Emoji.
- Better log management.
- Improved error handling.

## Version 0.8.14 [2023-03-10]

**Improvement 🚀**

- Fixed Validation event and group name
- Fixed Disable Automatic screen detection

## Version 0.8.13 [2022-02-24]

**Improvement 🚀**

- Added debug and debugTargeting commands.
- Added resetIdentity command.
- Added closeSdk command.
- Fix survey closing on reduced mod.
- Build IOS SDK with xcode 13.2.1 and Swift 5.5.2 (1300.0.47.5) to fix compilation issue and support swift version 5.5.2+.
- Update example by upgrading react/react native version and gradle version.

## Version 0.8.12 [2022-12-22]

**Improvement 🚀**

- Fix crash on unexpected question/answer flow
- Fix unexpected behavior on response closing
- Dependencies update (Android)

## Version 0.8.11 [2022-10-29]

**Improvement 🚀**

- Make targeting more reliable in order to **not** trigger survey in corner-case.

## Version 0.8.9 [2022-10-18]

**Improvement 🚀**

- Replace numeric emojis by custom svg
- Survey superposition on the app.
