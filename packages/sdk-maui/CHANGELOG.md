# Changelog

## v4.4.3 — 2026-09-28

### 🚀 New features

- Added `Screeb.setAnonymousId()` to adopt the anonymous id your CDP already uses (e.g. Amplitude device id, Segment/RudderStack anonymous id). Call it right after `initSdk`; the respondent stays anonymous, or is switched to an existing one tied to that id if it isn't already identified (Android).
- Added `Screeb.setAnonymousId(anonymousId:)` to link the current respondent to the anonymous id your CDP already uses (e.g. Amplitude device id, Segment or RudderStack anonymous id). The respondent stays anonymous, and if that id already belongs to an existing respondent, Screeb switches to it (unless the current one is already identified). Call it right after `initSdk` (iOS).

### 🐛 Bug fixes

- Fixed a race where picking a file attachment could occasionally fail or drop the picked file, caused by cache cleanup running concurrently with the copy of a newly picked file (Android).
- Session replay no longer gets stuck recording a stale screen after a burst of capture failures (e.g. under heavy GPU load); it now backs off and retries instead of disabling itself for the rest of the session, and recovers any changes made while capture was paused (Android).
- SDK error reports are no longer sent over the network before the SDK is initialized (when consent may not yet be collected), and no longer include command arguments, message contents, or opened links that could carry personal data (Android).
- SDK error reports are no longer sent over the network before `initSdk` runs, since the host app may not have collected consent yet, they now stay local until then. Error messages also no longer include command arguments or other data that could carry visitor identities or properties (iOS).

### ⚡ Improvements

- Session replay adapts more smoothly under sustained memory pressure: pressure now eases gradually rather than staying elevated (and capture quality/cadence reduced) until the next app resume (Android).
- Slightly smoother session replay capture rate under normal conditions (Android).

### 📱 Native SDK versions

- 🤖 Android SDK version 4.4.0: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.3.0: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)

## v4.4.2 — 2026-09-25

### 🐛 Bug fixes

- Screenshot answers no longer capture the iOS screen-sharing "Stop Sharing" overlay — the SDK now waits for that system sheet to be dismissed before grabbing the frame (iOS).
- Session replay recovers on its own if an update is ever lost in transit: a changing screen now gets a fresh keyframe at least every 30 seconds instead of staying wrong for the rest of the session (iOS).
- Session replay no longer misses the last change made right as a screen settles (iOS).
- A brief memory warning no longer keeps session replay (quality, resolution, capture rate) throttled for the rest of the time the app is in the foreground — the throttling now eases back automatically a few seconds after the warning stops recurring (iOS).

### ⚡ Improvements

- Session replay capture does less work for hidden looping animations, duplicate change regions, and paused capture passes, lowering CPU and battery impact with no change in replay fidelity (iOS).

### 📱 Native SDK versions

- 🤖 Android SDK version 4.3.1: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.2.1: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)

## v4.4.1 — 2026-09-16

### 🐛 Bug fixes

- Session replay recovers automatically from frames lost due to internal capture limits or delivery hiccups, instead of leaving the replay stuck until an unrelated event forced a resync (Android).

### ⚡ Improvements

- Reduced main-thread work during session replay capture on static screens, accessibility scans, and hidden views, lowering CPU overhead for apps with session replay enabled (Android).

### 📱 Native SDK versions

- 🤖 Android SDK version 4.3.1: [Release Notes](https://developers.screeb.app/sdk-android/changelog)
- 🍎 iOS SDK version 4.2.0: [Release Notes](https://developers.screeb.app/sdk-ios/changelog)

## v4.2.0 — 2026-08-24

### 🚀 New features
- Exit-intent surveys now work in native apps: leaving a tracked screen can trigger a survey, as on web. Requires screen tracking (`TrackScreen`) instrumentation.
- New "inactivity" targeting rule: trigger a survey after the visitor has stopped interacting with the app for a configured time.

## v4.1.0 — 2026-08-20

### 🐛 Bug fixes
- Fixed session replay backgrounding and screen-rotation race conditions that could disrupt recordings on Android and iOS.

### ⚡ Improvements
- Session replay now adapts to ProMotion display refresh rates, roughly halving replay CPU usage on supported iOS devices.
- Recordings now start from the first mirrored frame instead of a blank lead-in.
- Android surface content such as video, maps, and GPU-rendered views is now covered by session replay masking and anonymization.

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
