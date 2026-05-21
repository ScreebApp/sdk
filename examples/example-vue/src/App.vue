<script setup lang="ts">
import { onMounted } from "vue";
import { useScreeb } from "@screeb/sdk-vue";

import screebLogo from "./assets/screeb.png";

const { debug, eventTrack, identityProperties, identityGroupAssign, identityGet } =
  useScreeb();

onMounted(async () => {
  debug();
  eventTrack("screeb-sdk-vue-example started", { test: 123 });
  identityProperties({ hello: "I'm a dev." });
  identityGroupAssign("cohort", "Screeb Developers");

  // eslint-disable-next-line no-console
  setTimeout(() => identityGet().then(console.log), 500);
});
</script>

<template>
  <main>
    <header>
      <img :src="screebLogo" alt="This is the Screeb.app logo" />
    </header>
    <h1>
      Hello <em>you</em>!
    </h1>
    <h2>Welcome aboard!</h2>
    <p>
      Visit our&nbsp;
      <a
        href="https://github.com/ScreebApp/developers/wiki/Javascript-SDK-install"
        target="_blank"
      >
        Developer documentation
      </a>
      &nbsp;to learn how to integrate&nbsp;
      <a href="https://screeb.app" target="_blank">Screeb</a>.
    </p>
  </main>
</template>
