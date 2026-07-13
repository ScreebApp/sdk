# CHANGELOGS

## Version 4.0.2 [2026-07-08]

**Improvements 🚀**

- More robust session replay, even under heavy memory pressure.
- Lower CPU and memory usage while recording.
- In-app surveys and messages stay reliably in the foreground.

## Version 3.1.1 [2026-02-10]

**Improvements 🚀**

- Added `sessionReplay{start|stop}` commands.

## Version 3.1.0 [2026-02-09]

**Improvements 🚀**

- Added `getIdentity` command.
- Added Callback result to debug and debugTargeting commands.

## Version 3.0.3 [2026-02-06]

**Improvements 🚀**

- Added file picker for In-App messages video.

## Version 3.0.2 [2026-01-13]

**Improvements 🚀**

- Hotfixes.

## Version 3.0.1 [2026-01-12]

**Improvements 🚀**

- Ensure webview is not in the accessible tree when it is hidden.

## Version 3.0.0 [2026-01-12]

**Improvements 🚀**

- Session Replay in Beta.
- Added disableMirror to InitOptions to force disable In-App messages mirroring and Session Replay.

## Version 2.2.4 [2025-12-04]

**Improvements 🚀**

- Fixed SDK methods Objective-C type.

## Version 2.2.2 [2025-11-18]

**Improvements 🚀**

- AnyEncodable is now unneeded and should be removed.
- SDK methods are now Objective-C compatible.
- Fixed Closing In-App messages builder reopening it.

## Version 2.2.1 [2025-10-23]

**Improvements 🚀**

- Thread safety fixes.

## Version 2.2.0 [2025-10-23]

**Improvements 🚀**

- Added startMessage, closeMessage commands.
- Added optional surveyId param to closeSurvey.

## Version 2.1.14 [2025-10-16]

**Improvements 🚀**

- Support In-App Messages.
- Removed deprecated "automaticScreenDetection" InitOptions.
- Bump min iOS version to 12.0.

## Version 2.1.13 [2025-06-18]

**Improvements 🚀**

- Ensure sequential messages consume.

## Version 2.1.12 [2025-06-04]

**Improvements 🚀**

- Auto-recover on network change.
- Fixed hitboxes on keyboard visibility changes.
- Threads improvements.
- Added "distributionId" param to startSurvey.

## Version 2.1.11 [2025-02-03]

**Improvements 🚀**

- Thread safety fixes.

## Version 2.1.10 [2025-01-31]

**Improvements 🚀**

- Ensure commands execution orders.

## Version 2.1.9 [2024-12-19]

**Improvements 🚀**

- Reduce memory usage caused by logging.

## Version 2.1.8 [2024-12-09]

**Improvements 🚀**

- Fixed case where content is untouchable.

## Version 2.1.7 [2024-10-02]

**Improvements 🚀**

- Add language parameter

## Version 2.1.6 [2024-07-30]

**Improvements 🚀**

- Fixed double encoding.

## Version 2.1.5 [2024-07-30]

**Improvements 🚀**

- Prepare support of new hooks in secondary SDK.

## Version 2.1.4 [2024-07-29]

**Improvements 🚀**

- Fixed hook result encoding.

## Version 2.1.3 [2024-07-29]

**Improvements 🚀**

- Support new `onSurveyDisplayAllowed` and `onMessageDisplayAllowed` hooks.

## Version 2.1.2 [2024-07-22]

**Improvements 🚀**

- Fixed destroy animation.
- Improved key window handling.

## Version 2.1.1 [2024-06-12]

**Improvements 🚀**

- Fixed error and message printing.
- Improved key window handling.

## Version 2.1.0 [2024-05-28]

**Improvements 🚀**

- Improved surveys hit boxes.
- Prepare support for in-app messages.
- Prepare support for session recording.

## Version 2.0.13 [2024-04-11]

**Improvements 🚀**

- Fixed possible non-interactive surveys

## Version 2.0.12 [2024-04-10]

**Improvements 🚀**

- Allow lazy init SDK without any context
- Better handling of window switching #2
- Fixed threads warnings

## Version 2.0.11 [2024-04-05]

**Improvements 🚀**

- Multi-platform support
- Better handling of window switching

## Version 2.0.10 [2024-02-05]

**Improvements 🚀**

- Improved commands encoding.
- Handle a rare case where a survey is not properly closed.

## Version 2.0.9 [2024-01-09]

**Improvements 🚀**

- Improved context tracking.

## Version 2.0.8 [2024-01-03]

**Improvements 🚀**

- Fixed Close/Init SDK lifecycle.

## Version 2.0.7 [2023-12-11]

**Improvements 🚀**

- Properly handle SSL errors.

## Version 2.0.4→2.0.6 [2023-12-11]

**Improvements 🚀**

- Improve errors reporting.
- Warn about debug mode enabled.

## Version 2.0.3 [2023-09-08]

**Improvements 🚀**

- Allow to init SDK without context that'll default to the app one.
- Remove false translatesAutoresizingMaskIntoConstraints.

## Version 2.0.1→2.0.2 [2023-09-08]

**Improvements 🚀**

- Added closeSurvey command.
- Fixed surveys not showing in some cases.
- Fixed surveys on screen rotation.

## Version 2.0.0 [2023-08-02]

**Improvements 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- All SDK dependencies have been removed, and the minimum iOS version has been reduced from 12.4 to 11.0.

**Improvements (PS: Same as rc.1, rc.2, and rc.3 but with a new feature called hooks) 🚀**

- The SDK has been rewritten from scratch to provide greater stability, instant updates of Screeb features, and be even lighter.
- All SDK dependencies have been removed, and the minimum iOS version has been reduced from 12.4 to 11.0.

## Version 1.13.2 [2023-06-07]

**Improvements 🚀**

- New "Range rating" type of questions

## Version 1.13.1 [2023-05-17]

**Improvements 🚀**

- Fixed Version Targeting

## Version 1.13.0 [2023-04-28]

**Improvements 🚀**

- `startSurvey` command now accepts the `ignoreSurveyStatus` argument (default: true)
- Better log management
- Fixed multiple "End survey" buttons

## Version 1.12.4 [2023-04-21]

**Improvements 🚀**

- Added Swift Package Manager support
- Fixed a bug on buttons having no emoji.
- Retry request on network failure

## Version 1.12.2→1.12.3 [2023-03-10]

**Improvements 🚀**

- Fixed Validation event and group name
- Fixed Disable Automatic screen detection

## Version 1.12.1 [2023-02-24]

**Improvements 🚀**

- Build SDK with Xcode 13.2.1 and Swift 5.5.2 (1300.0.47.5) to fix compilation issue and support swift version 5.5.2+

## Version 1.12.0 [2023-02-09]

**Improvements 🚀**

- Added debug and debugTargeting commands
- Added resetIdentity command
- Added closeSdk command
- Fixed survey closing on reduced mod

## Version 1.11.0 [2023-01-25]

**Improvements 🚀**

- Response expiration

## Version 1.10.5 [2023-01-24]

**Improvements 🚀**

- Fixed validation issues in visitor properties

## Version 1.10.4 [2022-10-29]

**Improvements 🚀**

- Make targeting more reliable in order to **not** trigger survey in a corner-case

## Version 1.10.3 [2022-10-18]

**Improvements 🚀**

- Replace numeric emojis by custom SVG
- Fixed Survey superposition on the app
