# Screeb.Maui

.NET MAUI SDK for [Screeb](https://screeb.app) — Continuous Product Discovery.

Supports **Android** (API 24+) and **iOS** (14.0+).

## Installation

```sh
dotnet add package Screeb.Maui
```

## Android Setup

Add a `MainApplication.cs` under `Platforms/Android/` — this is required to bootstrap the MAUI runtime:

```csharp
using Android.App;
using Android.Runtime;

namespace YourApp;

[Application]
public class MainApplication : MauiApplication
{
    public MainApplication(IntPtr handle, JniHandleOwnership ownership)
        : base(handle, ownership) { }

    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
```

In your `.csproj`, set Android minimum SDK to 24:

```xml
<SupportedOSPlatformVersion Condition="$(TargetFramework.Contains('-android'))">24.0</SupportedOSPlatformVersion>
```

## iOS Setup

Add a `AppDelegate.cs` under `Platforms/iOS/` if not already present:

```csharp
using Foundation;

namespace YourApp;

[Register("AppDelegate")]
public class AppDelegate : MauiUIApplicationDelegate
{
    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
```

The iOS SDK requires the `Screeb.xcframework` binary — see [Development Setup](#development-setup) below.

## Usage

Call `InitSdk` in `App.xaml.cs` `OnStart`:

```csharp
using static Screeb.Maui.Screeb;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        MainPage = new MainPage();
    }

    protected override async void OnStart()
    {
        base.OnStart();
        await InitSdk(
            channelId: "<YOUR_CHANNEL_ID>",
            userId: "user-123",
            properties: new Dictionary<string, object> { ["plan"] = "premium" },
            initOptions: new ScreebInitOptions { IsDebugMode = false }
        );
    }
}
```

### ScreebInitOptions

| Property | Type | Default | Description |
|---|---|---|---|
| `IsDebugMode` | `bool` | `false` | Enable verbose SDK logging |
| `DisableMirror` | `bool` | `false` | Disable mirror/session replay |

### ScreebHooks

React to survey lifecycle events:

```csharp
var hooks = new ScreebHooks
{
    Version = "1.0.0",
    Callbacks = new Dictionary<string, Func<string, Task<object?>>>
    {
        ["onSurveyShowed"] = async payload => { Console.WriteLine(payload); return null; },
        ["onSurveyCompleted"] = async payload => { Console.WriteLine(payload); return null; }
    }
};
await InitSdk(channelId: "<YOUR_CHANNEL_ID>", hooks: hooks);
```

## API

| Method | Description |
|---|---|
| `InitSdk(channelId, ...)` | Initialize the SDK |
| `CloseSdk()` | Stop the SDK |
| `SetIdentity(userId, properties)` | Identify the current user |
| `SetProperties(properties)` | Update user properties |
| `ResetIdentity()` | Reset user identity (e.g. on logout) |
| `GetIdentity()` | Get current visitor identity |
| `AssignGroup(type, name, properties)` | Add user to a group |
| `UnassignGroup(type, name, properties)` | Remove user from a group |
| `TrackEvent(name, properties)` | Track a custom event |
| `TrackScreen(name, properties)` | Track a screen navigation |
| `StartSurvey(surveyId, ...)` | Start a survey programmatically |
| `CloseSurvey(surveyId)` | Close the current survey |
| `StartMessage(messageId, ...)` | Start a message programmatically |
| `CloseMessage(messageId)` | Close the current message |
| `SessionReplayStart()` | Start session replay recording |
| `SessionReplayStop()` | Stop session replay recording |
| `Debug()` | Get SDK debug info |
| `DebugTargeting()` | Get targeting debug info |

## Development Setup

### iOS XCFramework

The iOS SDK is distributed as a binary XCFramework (gitignored). Before building for iOS:

1. Download the latest release from https://github.com/ScreebApp/sdk-ios-public/releases
2. Extract `Screeb.xcframework` to `packages/sdk-maui/native/ios/Screeb.xcframework/`

See [full documentation](https://developers.screeb.app/sdk-maui/install).
