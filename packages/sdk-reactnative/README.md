<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-reactnative/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/react-native</h1>
<p align="center">
  Screeb's mobile sdk for React Native (Android &amp; iOS).

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@screeb/react-native" alt="version">
    <img alt="npm screeb/react-native" src="https://img.shields.io/npm/v/@screeb/react-native">
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
<img alt="downloads" src="https://badgen.net/npm/dw/@screeb/react-native" />
</p>


## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
npm install @screeb/react-native --save

# For Yarn, use the command below.
yarn add @screeb/react-native
```

For iOS, also run:

```bash
cd ios && pod install
```

## Package Size

Current package size snapshot. Native SDK sizes are listed separately to help estimate app impact:

- npm tarball: 18.0 KB
- unpacked package: 75.0 KB
- native Android SDK AAR: 110.3 KB
- native iOS app size impact: about 450 KB

## Battery usage

Screeb is optimized to minimize battery impact. Most features are event-driven, and session replay adapts automatically to app activity and device conditions.

When session replay is enabled, the SDK reduces work while idle and under Low Power Mode, Battery Saver, thermal pressure, or memory pressure. It prioritizes reducing image quality, resolution, and changed-region processing before lowering active capture cadence.

## Usage

Basic usage:

```ts
import { Screeb } from '@screeb/react-native';

// Initialize Screeb SDK
Screeb.initSdk("<channel-id>");

// Optional: identify visitor
Screeb.setIdentity("<user-id>", {
  firstname: "<user-firstname>",
  lastname: "<user-lastname>",
  plan: "<user-plan>",
  age: 42,
  authenticated: true,
});
```

Session Replay privacy helpers:

```tsx
import { ScreebId, ScreebMaskText, ScreebNoCapture } from '@screeb/react-native';

<ScreebMaskText>
  <TextInput />
</ScreebMaskText>

<ScreebNoCapture>
  <SensitiveView />
</ScreebNoCapture>

<ScreebId id="checkout_button">
  <Button title="Checkout" />
</ScreebId>
```

For working examples, see:
- [React Native CLI example](https://github.com/ScreebApp/sdk/tree/master/examples/example-reactnative)
- [Expo example](https://github.com/ScreebApp/sdk/tree/master/examples/example-expo)

## Documentation

- Install guide: [developers.screeb.app/sdk-react-native/install](https://developers.screeb.app/sdk-react-native/install)
- API reference: [developers.screeb.app/sdk-react-native/reference](https://developers.screeb.app/sdk-react-native/reference)

## Run examples

### React Native CLI example

```sh
npm install

cd examples/example-reactnative/ios
pod install
cd ../../..

npm run android --workspace=example-reactnative
npm run ios --workspace=example-reactnative
```

### Expo example

The Expo project lives in `example-expo`. It builds a full native binary (Expo Go will not load custom native modules).

```sh
npm install

npm run prebuild --workspace=example-expo
npm run ios --workspace=example-expo   # or android

# in another terminal, from the repo root
npm run example:expo --workspace=@screeb/react-native
```

Re-run `prebuild` whenever native configuration changes. Use `npm run prebuild --workspace=example-expo -- --clean` if you need to fully regenerate the iOS/Android projects.

## Changelog

[See here.](https://www.notion.so/screeb/ReactNative-SDK-30e8dc27fa7a4dea979084d83e5140c3)

## Support

For any issues, please contact our support team at support@screeb.com.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
