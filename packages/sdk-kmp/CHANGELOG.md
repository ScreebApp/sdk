# CHANGELOGS

## Version 4.0.4 [2026-08-13]

**Bug fixes 🐛**

- Respondents can attach a picture to an answer again on iOS: the attach button opened nothing, and the photo library could end up behind the survey (iOS).
- An audio answer no longer asks for the camera, and refusing one permission no longer takes the whole answer down (Android).
- Recording works on the first attempt instead of failing until the respondent tried again (Android).

**Native SDK Versions 📱**

- 🤖 Android SDK version 4.0.4: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.0.4: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)

## Version 4.0.3 [2026-08-07]

**Bug fixes 🐛**

- Fixed rare crashes in the host app while session replay was recording.
- Fixed Screeb links whose token contained special characters being cut off.
- Anonymized session replay no longer leaves text readable on low-resolution captures (Android).

**Native SDK Versions 📱**

- 🤖 Android SDK version 4.0.3: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.0.3: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)

## Version 4.0.2 [2026-07-08]

**Improvements 🚀**

- More robust session replay, even under heavy memory pressure.
- Lower CPU and memory usage while recording.
- In-app surveys and messages stay reliably in the foreground.

**Native SDK Versions 📱**

- 🤖 Android SDK version 4.0.2: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.0.2: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)
