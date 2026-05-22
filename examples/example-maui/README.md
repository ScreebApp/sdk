# example-maui

Example .NET MAUI app demonstrating the Screeb SDK.

## Run

```bash
# Android
dotnet build -t:Run -f net8.0-android

# iOS (macOS only)
dotnet build -t:Run -f net8.0-ios
```

Replace `<YOUR_CHANNEL_ID>` in `MauiProgram.cs` with your Screeb channel ID.
