# `@screeb/react-native` Expo example

Minimal Expo app used to validate the Screeb React Native SDK with a generated native project.

> Documentation: [developers.screeb.app/sdk-react-native/install](https://developers.screeb.app/sdk-react-native/install)

## Run

Install dependencies from the repository root:

```bash
npm install
```

Recreate the native project:

```bash
npm run prebuild --workspace=example-expo
```

Run the native app:

```bash
npm run ios --workspace=example-expo
# or
npm run android --workspace=example-expo
```

Start Metro from the React Native SDK workspace:

```bash
npm run example:expo --workspace=@screeb/react-native
```

Expo Go cannot load the Screeb TurboModule. Use the app produced by `expo run:ios` or `expo run:android`.

If native sources fall out of sync, regenerate them with:

```bash
npm run prebuild --workspace=example-expo -- --clean
```
