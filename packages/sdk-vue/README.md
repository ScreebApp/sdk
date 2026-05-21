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
