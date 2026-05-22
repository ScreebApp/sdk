# example-maui

Example .NET MAUI app demonstrating the Screeb SDK.

## Run

```bash
# Android (API 24+)
dotnet build -t:Run -f net9.0-android

# iOS (macOS only, iOS 14+)
dotnet build -t:Run -f net9.0-ios
```

The channel ID is configured in `App.xaml.cs`.

## Notes

- Android requires `Platforms/Android/MainApplication.cs` (already included) to bootstrap the MAUI runtime.
- iOS requires the `Screeb.xcframework` binary in `packages/sdk-maui/native/ios/` (see SDK README for setup).
