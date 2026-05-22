# Screeb.Maui

.NET MAUI SDK for [Screeb](https://screeb.app) — Continuous Product Discovery.

## Installation

```sh
dotnet add package Screeb.Maui
```

## Usage

```csharp
// In MauiProgram.cs or App.xaml.cs
await Screeb.InitSdk(
    channelId: "<YOUR_CHANNEL_ID>",
    userId: "user-123",
    properties: new Dictionary<string, object> { ["plan"] = "premium" }
);
```

## Development Setup

### iOS XCFramework

The iOS SDK is distributed as a binary XCFramework. Before building for iOS:

1. Download the latest release from https://github.com/ScreebApp/sdk-ios-public/releases
2. Extract `Screeb.xcframework` to `packages/sdk-maui/native/ios/Screeb.xcframework/`

The XCFramework is excluded from git (binary, large file).

See [full documentation](https://developers.screeb.app/sdk-maui/install).
