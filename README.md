# Screeb SDKs

Public SDKs for [Screeb](https://screeb.app) — the Product Discovery platform.

> Full documentation: [developers.screeb.app](https://developers.screeb.app)

## SDKs

| SDK | Package | Registry | Docs |
|---|---|---|---|
| Browser | [`@screeb/sdk-browser`](packages/sdk-browser) | [npm](https://www.npmjs.com/package/@screeb/sdk-browser) | [Install](https://developers.screeb.app/sdk-browser/install) · [Reference](https://developers.screeb.app/sdk-browser/reference) |
| Angular | [`@screeb/sdk-angular`](packages/sdk-angular) | [npm](https://www.npmjs.com/package/@screeb/sdk-angular) | [Install](https://developers.screeb.app/sdk-angular/install) · [Reference](https://developers.screeb.app/sdk-angular/reference) |
| React | [`@screeb/sdk-react`](packages/sdk-react) | [npm](https://www.npmjs.com/package/@screeb/sdk-react) | [Install](https://developers.screeb.app/sdk-react/install) · [Reference](https://developers.screeb.app/sdk-react/reference) |
| Vue | [`@screeb/sdk-vue`](packages/sdk-vue) | [npm](https://www.npmjs.com/package/@screeb/sdk-vue) | [Install](https://developers.screeb.app/sdk-vue/install) · [Reference](https://developers.screeb.app/sdk-vue/reference) |
| Svelte | [`@screeb/sdk-svelte`](packages/sdk-svelte) | [npm](https://www.npmjs.com/package/@screeb/sdk-svelte) | [Install](https://developers.screeb.app/sdk-svelte/install) · [Reference](https://developers.screeb.app/sdk-svelte/reference) |
| Ionic | Uses `@screeb/sdk-angular` / `@screeb/sdk-react` / `@screeb/sdk-browser` | - | [Install](https://developers.screeb.app/sdk-ionic/install) · [Reference](https://developers.screeb.app/sdk-ionic/reference) |
| React Native | [`@screeb/react-native`](packages/sdk-reactnative) | [npm](https://www.npmjs.com/package/@screeb/react-native) | [Install](https://developers.screeb.app/sdk-react-native/install) · [Reference](https://developers.screeb.app/sdk-react-native/reference) |
| .NET MAUI | [`Screeb.Maui`](packages/sdk-maui) | [NuGet](https://www.nuget.org/packages/Screeb.Maui) | [Install](https://developers.screeb.app/sdk-maui/install) · [Reference](https://developers.screeb.app/sdk-maui/reference) |
| Flutter | [`plugin_screeb`](packages/sdk-flutter) | [pub.dev](https://pub.dev/packages/plugin_screeb) | [Install](https://developers.screeb.app/sdk-flutter/install) · [Reference](https://developers.screeb.app/sdk-flutter/reference) |
| iOS | Native SDK ([`sdk-ios-public`](https://github.com/ScreebApp/sdk-ios-public) - SPM mirror) | [SPM](https://github.com/ScreebApp/sdk-ios-public) | [Install](https://developers.screeb.app/sdk-ios/install) · [Reference](https://developers.screeb.app/sdk-ios/reference) |
| Android | Native SDK | [Maven](https://central.sonatype.com/artifact/app.screeb.sdk/survey) | [Install](https://developers.screeb.app/sdk-android/install) · [Reference](https://developers.screeb.app/sdk-android/reference) |

## Battery usage

Screeb is optimized to minimize battery impact. Most features are event-driven, and session replay adapts automatically to app activity and device conditions.

When session replay is enabled, the SDK reduces work while idle and under Low Power Mode, Battery Saver, thermal pressure, or memory pressure. It prioritizes reducing image quality, resolution, and changed-region processing before lowering active capture cadence.

## Examples

| Example | Stack | Directory |
|---|---|---|
| Browser | Vanilla JS | [`examples/example-browser`](examples/example-browser) |
| Angular | Angular 16 | [`examples/example-angular`](examples/example-angular) |
| React | React 18 | [`examples/example-react`](examples/example-react) |
| Vue | Vue 3 | [`examples/example-vue`](examples/example-vue) |
| Svelte | Svelte 4 | [`examples/example-svelte`](examples/example-svelte) |
| Ionic | Angular 16 + Capacitor | [`examples/example-ionic`](examples/example-ionic) |
| Expo | React Native + Expo | [`examples/example-expo`](examples/example-expo) |
| React Native | React Native CLI | [`examples/example-reactnative`](examples/example-reactnative) |
| .NET MAUI | .NET MAUI | [`examples/example-maui`](examples/example-maui) |
| Flutter | Flutter | [`examples/example-flutter`](examples/example-flutter) |
| Android | Android (Kotlin) | [`examples/example-android`](examples/example-android) |
| iOS | iOS (Swift) | [`examples/example-ios`](examples/example-ios) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Screeb Team

Internal release and local SDK testing notes are in [docs/screeb-team-release.md](docs/screeb-team-release.md).
