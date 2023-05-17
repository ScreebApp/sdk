<p align="center">
  <a href="https://screeb.app" alt="Intercom">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk-js/master/packages/screeb-sdk-browser/readme/screeb-logo.svg?token=GHSAT0AAAAAAB2OOPMGT2QD5TL3IRJN3CKCZDEYHJA" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/sdk-browser</h1>
<p align="center">
  Screeb's browser sdk.

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Intercom">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
<a href="https://github.com/ScreebApp/sdk-js/actions/workflows/node.js.yml" alt="ci">
  <img alt="ci" src="https://github.com/ScreebApp/sdk-js/actions/workflows/node.js.yml/badge.svg">
</a>
<img alt="version" src="https://img.shields.io/npm/v/@screeb/sdk-browser.svg" />
<img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@screeb/sdk-browser">
<img alt="downloads" src="https://badgen.net/npm/dw/@screeb/sdk-browser" />
</p>


## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
npm install @screeb/sdk-browser --save

# For Yarn, use the command below.
yarn add @screeb/sdk-browser
```

## Usage

Basic usage:
```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.load();
Screeb.init('<your-website-id>');
```

For a more advanced usage and a complete API documentation, see [documentation generated from source files](https://github.com/ScreebApp/sdk-js/tree/master/packages/screeb-sdk-browser/docs).

For further information, see [our developper documentation](https://github.com/ScreebApp/developers).

## Support
For any issues, please contact our support team at support@screeb.com.

## Contributing
All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk-js/blob/master/LICENSE).