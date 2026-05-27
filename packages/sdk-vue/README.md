<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk/master/packages/sdk-vue/readme/screeb-logo.svg" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/sdk-vue</h1>
<p align="center">
  Screeb's browser SDK, optimized for Vue 3.

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@screeb/sdk-vue" alt="version">
    <img alt="version" src="https://img.shields.io/npm/v/@screeb/sdk-vue.svg" />
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-vue" alt="min size">
    <img alt="min size" src="https://img.shields.io/bundlephobia/min/@screeb/sdk-vue">
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-vue" alt="minzipped size">
    <img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/@screeb/sdk-vue">
  </a>
  <img alt="downloads" src="https://badgen.net/npm/dw/@screeb/sdk-vue" />
</p>

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @screeb/sdk-vue --save

# For Yarn, use the command below.
yarn add @screeb/sdk-vue
```

## Package Size

Current package size snapshot:

- npm tarball: 12.2 KB
- unpacked package: 61.5 KB

## Usage

Basic usage:

```ts
// main.ts
import { createApp } from 'vue'
import { ScreebPlugin } from '@screeb/sdk-vue'
import App from './App.vue'

createApp(App)
  .use(ScreebPlugin, {
    websiteId: '<YOUR-CHANNEL-ID>',
    autoInit: true,
    userId: '<USER-ID>',
  })
  .mount('#app')
```

## Use in components

```vue
<script setup lang="ts">
import { useScreeb } from '@screeb/sdk-vue'

const { eventTrack } = useScreeb()
</script>

<template>
  <button @click="() => eventTrack('button-clicked')">Track</button>
</template>
```

For a working example, see our [Screeb Vue SDK example app](https://github.com/ScreebApp/sdk/tree/master/examples/example-vue).

## Documentation

- Install guide: [developers.screeb.app/sdk-vue/install](https://developers.screeb.app/sdk-vue/install)
- API reference: [developers.screeb.app/sdk-vue/reference](https://developers.screeb.app/sdk-vue/reference)

## Support

For any issues, please contact our support team at support@screeb.com.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk/blob/master/LICENSE).
