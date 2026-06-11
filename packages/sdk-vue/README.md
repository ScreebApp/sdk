# @screeb/sdk-vue

[![npm version](https://img.shields.io/npm/v/@screeb/sdk-vue.svg)](https://www.npmjs.com/package/@screeb/sdk-vue)
[![License: MIT](https://img.shields.io/badge/license-MIT-purple.svg)](https://opensource.org/licenses/MIT)

Screeb SDK for Vue 3 — wraps `@screeb/sdk-browser` with a Plugin + `useScreeb` composable.

## Install

```sh
npm install @screeb/sdk-vue --save
```

## Setup

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

## Custom domains (AdBlocker bypass)

If you route Screeb traffic through your own domain (reverse proxy) to bypass AdBlockers, pass the
`endpoints` (and optionally `screebEndpoint` for the loader URL) through the plugin's `options`.
Only the endpoints you provide are overridden; the rest fall back to Screeb's defaults.

```ts
createApp(App)
  .use(ScreebPlugin, {
    websiteId: '<YOUR-CHANNEL-ID>',
    autoInit: true,
    options: {
      screebEndpoint: 'https://analytics.acme.com/sdk/tag.js',
      endpoints: {
        rpc:        'https://analytics.acme.com/rpc',
        static:     'https://analytics.acme.com/static',
        report:     'https://analytics.acme.com/report',
        hostedPage: 'https://analytics.acme.com/hosted-page',
        centipede:  'wss://analytics.acme.com/centipede',
      },
    },
  })
  .mount('#app')
```

All endpoints must use `https://` (or `wss://` for `centipede`) and the domains must be allow-listed
in **Screeb Admin → Settings → Custom Domains**. See the
[Custom Collector URL guide](https://developers.screeb.app/sdk-js/custom-collector-url).

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

## Documentation

[https://developers.screeb.app/sdk-vue/install](https://developers.screeb.app/sdk-vue/install)
