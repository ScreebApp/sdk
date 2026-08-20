# Changelog

## Version 4.1.0 [2026-08-20]

**Improvements ⚡**

- Session replay adapts to 120 Hz (ProMotion) displays: capture work runs in the frame's idle time and is paced to the display, roughly halving replay CPU on those devices while keeping the app fluid (iOS).
- Replays no longer open on a blank lead-in: recording starts with the first mirrored frame.

**Bug fixes 🐛**

- Video, map and GPU surfaces now obey masking and anonymized replay (Android).
- A masked field hidden under a newer screen no longer leaves a gray block on the replay (iOS & Android).
- Backgrounding or rotating the device mid-recording no longer freezes the capture or shows stale content (iOS & Android).

**Native SDK Versions 📱**

- 🤖 Android SDK version 4.1.0: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.1.0: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)

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

## 0.1.0 (initial release)
- Android + iOS support
- 18 methods: InitSdk, SetIdentity, SetProperties, AssignGroup, UnassignGroup, TrackEvent, TrackScreen, StartSurvey, StartMessage, CloseSdk, CloseSurvey, CloseMessage, SessionReplayStart, SessionReplayStop, ResetIdentity, GetIdentity, Debug, DebugTargeting
