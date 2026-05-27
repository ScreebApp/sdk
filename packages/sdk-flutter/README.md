<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-flutter/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">plugin_screeb</h1>
<p align="center">
  Screeb's mobile sdk for Flutter (Android &amp; iOS).

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://pub.dev/packages/plugin_screeb" alt="version">
    <img src="https://img.shields.io/pub/v/plugin_screeb" alt="Pub: plugin_screeb">
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


## Installation

Add `plugin_screeb` to your `pubspec.yaml`:

```yaml
dependencies:
  plugin_screeb: ^x.x.x
```

Then run:

```bash
flutter pub get
```

Requires Flutter 3.19+.

## Package Size

Current package size snapshot. Native SDK sizes are listed separately to help estimate app impact:

- Flutter package source estimate: 80.3 KB
- native Android SDK AAR: 110.3 KB
- native iOS app size impact: about 450 KB

## Battery usage

Screeb is optimized to minimize battery impact. Most features are event-driven, and session replay adapts automatically to app activity and device conditions.

When session replay is enabled, the SDK reduces work while idle and under Low Power Mode, Battery Saver, thermal pressure, or memory pressure. It prioritizes reducing image quality, resolution, and changed-region processing before lowering active capture cadence.

## Usage

Basic usage:

```dart
import 'package:plugin_screeb/plugin_screeb.dart';

// Initialize Screeb SDK
PluginScreeb.initSdk("<channel-id>");

// Optional: identify visitor
PluginScreeb.setIdentity("<user-id>", {
  "firstname": "<user-firstname>",
  "lastname": "<user-lastname>",
  "plan": "<user-plan>",
  "age": 42,
  "authenticated": true,
});

// Optional: protect sensitive UI in Session Replay
ScreebMaskText(child: TextField(...));
ScreebNoCapture(child: SensitiveWidget());
ScreebId("checkout_button", child: ElevatedButton(...));
```

For a working example, see our [Screeb Flutter SDK example app](https://github.com/ScreebApp/sdk/tree/master/examples/example-flutter).

## Documentation

- Install guide: [developers.screeb.app/sdk-flutter/install](https://developers.screeb.app/sdk-flutter/install)
- API reference: [developers.screeb.app/sdk-flutter/reference](https://developers.screeb.app/sdk-flutter/reference)

## Changelog

[See here.](https://www.notion.so/screeb/Flutter-SDK-af72e1f601ac4785aa81bd13a61858c7)

## Support

For any issues, please contact our support team at support@screeb.com.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
