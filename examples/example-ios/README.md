# example-ios

Complete native iOS integration sample for the Screeb SDK — one button per
public API (identity, groups, events, screens, surveys, messages, session
replay, debug), mirroring [`example-android`](../example-android).

> The iOS SDK is closed source. Full documentation:
> [developers.screeb.app/sdk-ios/install](https://developers.screeb.app/sdk-ios/install)

## Requirements

- Xcode 15+
- iOS 14.0+ (the SDK itself supports iOS 12.0+)

## Run

Open `ScreebExample.xcodeproj` and hit Run — the Screeb package resolves
automatically via Swift Package Manager
([`ScreebApp/sdk-ios-public`](https://github.com/ScreebApp/sdk-ios-public)).

The app initializes the SDK on launch (`AppDelegate.swift`) against a public
demo channel, then exposes every public API from `ViewController.swift`.
Replace `AppDelegate.screebChannelId` with your own channel id (Screeb
workspace → Settings → Channels) to see your own surveys and replays.

## CocoaPods alternative

```ruby
pod "Screeb", "~> 3.2"
```

## Integration in your app

Everything you need is in two places:

- [`AppDelegate.swift`](ScreebExample/AppDelegate.swift) — `Screeb.initSdk(...)`
  at launch, with optional identity, visitor properties and language.
- [`ViewController.swift`](ScreebExample/ViewController.swift) — every public
  call with realistic arguments: `setIdentity`, `visitorProperty`,
  `assignGroup`/`unassignGroup`, `trackEvent`/`trackScreen`, `startSurvey`,
  `startMessage`, `sessionReplayStart`/`Stop`, `debug`/`debugTargeting`,
  `closeSdk`, plus deep-link handling in `SceneDelegate.swift`.
