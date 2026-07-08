<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-svelte/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/sdk-svelte</h1>
<p align="center">
  Screeb's browser SDK, optimized for Svelte 4.

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@screeb/sdk-svelte" alt="version">
    <img alt="version" src="https://img.shields.io/npm/v/@screeb/sdk-svelte.svg" />
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-svelte" alt="min size">
    <img alt="min size" src="https://img.shields.io/bundlephobia/min/@screeb/sdk-svelte">
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-svelte" alt="minzipped size">
    <img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/@screeb/sdk-svelte">
  </a>
  <img alt="downloads" src="https://badgen.net/npm/dw/@screeb/sdk-svelte" />
</p>

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @screeb/sdk-svelte --save

# For Yarn, use the command below.
yarn add @screeb/sdk-svelte
```

## Package Size

Current package size snapshot:

- npm tarball: 7.1 KB
- unpacked package: 42.3 KB

## Usage

Basic usage:

Call `setScreebContext` once in the root component that wraps your app:

```svelte
<!-- App.svelte -->
<script lang="ts">
  import { setScreebContext } from "@screeb/sdk-svelte";
  import YourApp from "./YourApp.svelte";

  setScreebContext({
    websiteId: "<YOUR-CHANNEL-ID>",
    autoInit: true,
    userId: "<USER-ID>",
    userProperties: {
      plan: "pro",
      authenticated: true,
    },
  });
</script>

<YourApp />
```

## Usage

Use `useScreeb()` in any child component:

```svelte
<script lang="ts">
  import { useScreeb } from "@screeb/sdk-svelte";

  const { eventTrack } = useScreeb();
</script>

<button on:click={() => eventTrack("button-clicked")}>
  Track event
</button>
```

## Identify after login

```svelte
<!-- LoginButton.svelte -->
<script lang="ts">
  import { useScreeb } from "@screeb/sdk-svelte";

  const { identity } = useScreeb();

  async function onLogin(userId: string) {
    await identity(userId, { plan: "pro" });
  }
</script>
```

For a working example, see our [Screeb Svelte SDK example app](https://github.com/ScreebApp/sdk/tree/master/examples/example-svelte).

## Documentation

- Install guide: [developers.screeb.app/sdk-svelte/install](https://developers.screeb.app/sdk-svelte/install)
- API reference: [developers.screeb.app/sdk-svelte/reference](https://developers.screeb.app/sdk-svelte/reference)

## Support

For any issues, please contact our support team at support@screeb.app.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
