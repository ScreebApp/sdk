# example-ios

Minimal iOS example showing Screeb SDK integration.

> The iOS SDK is closed source. See [developers.screeb.app/sdk-ios/install](https://developers.screeb.app/sdk-ios/install) for the full documentation.

## Requirements

- iOS 11.0+
- Xcode 13.2.1+
- Swift 5.5.2+

## Setup

### CocoaPods

```ruby
pod "Screeb", "x.x.x"
```

### Swift Package Manager

Add the Screeb package via Xcode → File → Add Packages (URL provided by Screeb support).

## Permissions

If you use the Audio/Video feature, add to `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to the camera.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to the microphone.</string>
```

## Deep links (In-App Message editor)

Add to `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>screeb-<channel-id></string>
    </array>
  </dict>
</array>
```

## Usage
