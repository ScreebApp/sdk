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

## Reproducing: surveys stop displaying with expo-updates

Customer-reported bug (SDK ≤ 4.0.1, fixed in 4.0.2): after expo-updates applies
an OTA, surveys never display visually again. Applying an update relaunches the
JS bundle (`Updates.reloadAsync()`), the app re-runs `Screeb.initSdk` against
the already-loaded native singleton, and the subsequent Screeb webview reload
left its readiness gate armed — every later command hit a mid-reload document
(`window[window["ScreebObject"]] is not a function` in the webview console) and
the survey pipeline never recovered.

The example ships a **"Reload JS (expo-updates)"** button that triggers the
same native relaunch path without needing an EAS server (updates are configured
with `checkAutomatically: NEVER` and a placeholder URL — no network involved).

Steps (expo-updates is inert in dev builds — use a release build):

```bash
npm run prebuild --workspace=example-expo -- --clean   # picks up the expo-updates config plugin
npx expo run:android --variant release                 # or: npx expo run:ios --configuration Release
```

1. Tap **Start survey** → the survey displays. Close it.
2. Tap **Reload JS (expo-updates)** → the bundle relaunches, `initSdk` re-runs.
3. Tap **Start survey** again:
   - SDK ≤ 4.0.1: nothing displays (bug).
   - SDK ≥ 4.0.2: the survey displays normally.
