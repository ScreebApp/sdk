<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk-js/master/packages/screeb-sdk-react/readme/screeb-logo.svg?token=GHSAT0AAAAAAB2OOPMGT2QD5TL3IRJN3CKCZDEYHJA" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/sdk-react</h1>
<p align="center">
  Screeb's browser sdk, optimized for React.

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk-js/actions/workflows/node.js.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk-js/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@screeb/sdk-react" alt="version">
    <img alt="version" src="https://img.shields.io/npm/v/@screeb/sdk-react.svg" />
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-react" alt="min size">
    <img alt="min size" src="https://img.shields.io/bundlephobia/min/@screeb/sdk-react">
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-react" alt="minzipped size">
    <img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/@screeb/sdk-react">
  </a>
<img alt="downloads" src="https://badgen.net/npm/dw/@screeb/sdk-react" />
</p>


## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
npm install @screeb/sdk-react --save

# For Yarn, use the command below.
yarn add @screeb/sdk-react
```

## Usage

Basic usage:
```ts
import * as React from 'react';

import { ScreebProvider, useScreeb } from '@screeb/sdk-react';

const SCREEB_APP_ID = 'your-screeb-website-id';

const App = () => (
  <ScreebProvider
    autoInit
    websiteId={SCREEB_APP_ID}
    userId="dev@screeb.app"
    userProperties={{
      firstname: "John",
      lastname: "Smith",
      last_seen_at: new Date(),
      authenticated: true,
      org_size: 20,
    }}
  >
    <HomePage />
  </ScreebProvider>
);

// Anywhere in your app
const HomePage = () => {
  const { eventTrack } = useScreeb();

  const onButtonClicked = React.useCallback(
    () => eventTrack(
      "screeb-sdk-react-example started",
      { test: 123 }
    );
  );

  return (
    <button onClick={onButtonClicked}>
      Track event!
    </button>
  );
};
```

For a working example, see our [Screeb React SDK example app](https://github.com/ScreebApp/sdk-js/tree/master/packages/screeb-sdk-react-example).

For a more advanced usage and a complete API documentation, see [documentation generated from source files](https://github.com/ScreebApp/sdk-js/tree/master/packages/screeb-sdk-react/docs).

For further information, see [our developper documentation](https://github.com/ScreebApp/developers).

## Support
For any issues, please contact our support team at support@screeb.com.

## Contributing
All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk-js/blob/master/LICENSE).
