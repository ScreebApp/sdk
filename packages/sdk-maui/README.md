<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-maui/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">Screeb.Maui</h1>
<p align="center">
  Screeb's mobile SDK for .NET MAUI (Android &amp; iOS).

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.nuget.org/packages/Screeb.Maui" alt="version">
    <img alt="NuGet" src="https://img.shields.io/nuget/v/Screeb.Maui">
  </a>
  <a href="https://cocoapods.org/pods/Screeb" alt="CocoaPods">
    <img src="https://img.shields.io/cocoapods/v/Screeb.svg?style=flat" alt="Cocoapods">
  </a>
  <a href="https://search.maven.org/search?q=g:%22app.screeb.sdk%22%20AND%20a:%22survey%22" alt="Maven Central">
    <img src="https://img.shields.io/maven-central/v/app.screeb.sdk/survey.svg?label=Maven%20Central" alt="Maven Central">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-purple.svg" alt="License: MIT">
  </a>
</p>

.NET MAUI SDK for [Screeb](https://screeb.app) — Continuous Product Discovery.

Supports **Android** (API 24+) and **iOS** (14.0+).

## Installation

```sh
dotnet add package Screeb.Maui
```

## Package Size

Current package size snapshot. Native SDK sizes are listed separately to help estimate app impact:

- Android Release DLL: 44.0 KB
- iOS Release DLL: 38.0 KB
- native Android SDK AAR: 110.3 KB
- native iOS app size impact: about 450 KB

## Battery usage

Screeb is optimized to minimize battery impact. Most features are event-driven, and session replay adapts automatically to app activity and device conditions.

When session replay is enabled, the SDK reduces work while idle and under Low Power Mode, Battery Saver, thermal pressure, or memory pressure. It prioritizes reducing image quality, resolution, and changed-region processing before lowering active capture cadence.

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

The NuGet package includes the native iOS framework required by the SDK.

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
            initOptions: new ScreebInitOptions { IsDebugMode = true }
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

### Local native SDKs

Screeb contributors can build this package against local native SDK checkouts:

```sh
SCREEB_USE_LOCAL_SDK=true dotnet build ScreebMaui.csproj -f net9.0-android
SCREEB_USE_LOCAL_SDK=true dotnet build ScreebMaui.csproj -f net9.0-ios
```

By default this uses sibling `../sdk-android` and `../sdk-ios` repositories. Override with `SCREEB_ANDROID_SDK_PATH` or `SCREEB_IOS_SDK_PATH` when needed.

## Documentation

- Install guide: [developers.screeb.app/sdk-maui/install](https://developers.screeb.app/sdk-maui/install)
- API reference: [developers.screeb.app/sdk-maui/reference](https://developers.screeb.app/sdk-maui/reference)

## Support

For any issues, please contact our support team at support@screeb.com.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
