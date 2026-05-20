# Contributing

Thanks for contributing to the Screeb SDKs!

## Setup

```bash
git clone https://github.com/ScreebApp/sdk.git
cd sdk
npm install
```

## Repository structure

| Path | Contents |
|---|---|
| `packages/sdk-browser` | `@screeb/sdk-browser` — vanilla JS/TS |
| `packages/sdk-angular` | `@screeb/sdk-angular` — Angular wrapper |
| `packages/sdk-react` | `@screeb/sdk-react` — React wrapper |
| `packages/sdk-reactnative` | `@screeb/react-native` — React Native |
| `packages/sdk-flutter` | `plugin_screeb` — Flutter plugin |
| `examples/` | Demo apps (not published) |

## Build

```bash
npm run build              # all JS/TS packages
cd packages/sdk-flutter && flutter pub get && flutter build  # Flutter
```

## Testing

```bash
npm test                   # JS/TS packages
cd packages/sdk-flutter && flutter test  # Flutter
```

## Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(sdk-browser): add X`
- `fix(sdk-react): resolve Y`
- `chore: update dependencies`

## Releasing

Each package is released independently. Releases are triggered by pushing a git tag:

```bash
# JS packages — use Lerna
npx lerna version --scope=@screeb/sdk-browser

# Flutter
# 1. Bump version in packages/sdk-flutter/pubspec.yaml
# 2. git tag sdk-flutter/vX.Y.Z && git push --tags
```
