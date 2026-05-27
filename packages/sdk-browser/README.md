<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-browser/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/sdk-browser</h1>
<p align="center">
  Screeb's browser sdk.

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@screeb/sdk-browser" alt="version">
    <img alt="version" src="https://img.shields.io/npm/v/@screeb/sdk-browser.svg" />
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-browser" alt="min size">
    <img alt="min size" src="https://img.shields.io/bundlephobia/min/@screeb/sdk-browser">
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-browser" alt="minzipped size">
    <img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/@screeb/sdk-browser">
  </a>
<img alt="downloads" src="https://badgen.net/npm/dw/@screeb/sdk-browser" />
</p>


## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
npm install @screeb/sdk-browser --save

# For Yarn, use the command below.
yarn add @screeb/sdk-browser
```

## Package Size

Current package size snapshot:

- npm tarball: 15.0 KB
- unpacked package: 101.0 KB

## Usage

Basic usage:
```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.load();
Screeb.init('<your-website-id>');
```

For a working example, see our [Screeb Browser SDK example app](https://github.com/ScreebApp/sdk/tree/master/examples/example-browser).

## Documentation

- Install guide: [developers.screeb.app/sdk-browser/install](https://developers.screeb.app/sdk-browser/install)
- API reference: [developers.screeb.app/sdk-browser/reference](https://developers.screeb.app/sdk-browser/reference)

## Support
For any issues, please contact our support team at support@screeb.com.

## Contributing
All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
