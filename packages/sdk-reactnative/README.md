<p align="center">
  <a href="https://www.npmjs.com/package/@screeb/react-native"><img alt="npm screeb/react-native" src="https://img.shields.io/npm/v/@screeb/react-native"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple.svg" alt="License: MIT"></a>
  <a href="https://cocoapods.org/pods/Screeb"><img src="https://img.shields.io/cocoapods/v/Screeb.svg?style=flat" alt="Cocoapods"></a>
  <a href="https://search.maven.org/search?q=g:%22app.screeb.sdk%22%20AND%20a:%22survey%22"><img src="https://img.shields.io/maven-central/v/app.screeb.sdk/survey.svg?label=Maven%20Central" alt="Maven Central"></a>
</p>

# @screeb/react-native

A react-native module to integrate Screeb mobile sdk for Android and/or iOS.

## How to install the React-Native SDK in your app ?

[See here.](https://developers.screeb.app/sdk-react-native/install)

## Changelog

[See here.](https://www.notion.so/screeb/ReactNative-SDK-30e8dc27fa7a4dea979084d83e5140c3)

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

Re-run `prebuild` whenever native configuration changes (for example after toggling the new architecture). Use `npm run prebuild --workspace=example-expo -- --clean` if you need to fully regenerate the iOS/Android projects. The `examples/example-expo/react-native.config.js` file ensures the Screeb module is autolinked automatically.

## License

MIT
