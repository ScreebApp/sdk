# `@screeb/react-native` example

Bare React Native app used to exercise the Screeb React Native wrapper.

> Documentation: [developers.screeb.app/sdk-react-native/install](https://developers.screeb.app/sdk-react-native/install)

## Run

Install dependencies from the repository root, then build and launch the app (Metro starts
with it):

```bash
npm install
npm run android --workspace=example-reactnative
npm run ios --workspace=example-reactnative
```

`npm run ios` runs `pod install` first. Screeb team members can build against unreleased native SDKs, see
[Mobile examples against the local native SDKs](../../CONTRIBUTING.md#mobile-examples-against-the-local-native-sdks).

The app code lives in [`src/App.tsx`](src/App.tsx). Screeb deep links are forwarded from
`MainActivity.kt` on Android and from the `SceneDelegate` in `AppDelegate.swift` on iOS.
