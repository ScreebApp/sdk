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

## Usage

Basic usage:

```dart
import 'package:plugin_screeb/plugin_screeb.dart';

// Initialize Screeb SDK
PluginScreeb.initSdk("<channel-id>");

// Optional: identify visitor
PluginScreeb.setIdentity("<user-id>", properties: {
  "firstname": "<user-firstname>",
  "lastname": "<user-lastname>",
  "plan": "<user-plan>",
  "age": 42,
  "authenticated": true,
});
```

For a working example, see our [Screeb Flutter SDK example app](https://github.com/ScreebApp/sdk/tree/master/examples/example-flutter).

For further information, see [our developer documentation](https://developers.screeb.app/sdk-flutter/install).

## Changelog

[See here.](https://www.notion.so/screeb/Flutter-SDK-af72e1f601ac4785aa81bd13a61858c7)

## Support

For any issues, please contact our support team at support@screeb.app.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
