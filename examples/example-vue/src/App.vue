<script setup lang="ts">
import { ref } from "vue";
import { useScreeb } from "@screeb/sdk-vue";

import screebLogo from "./assets/screeb.png";

const {
  init,
  identity,
  identityProperties,
  identityGroupAssign,
  identityGroupUnassign,
  identityReset,
  identityGet,
  eventTrack,
  surveyStart,
  messageStart,
  sessionReplayStart,
  sessionReplayStop,
  debug,
  targetingDebug,
  close,
} = useScreeb();

// Reused from src/main.ts plugin config.
const WEBSITE_ID = "0e2b609a-8dce-4695-a80f-966fbfa87a88";

// Placeholder ids — replace with real ones from your Screeb workspace.
const SURVEY_ID = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff";
const MESSAGE_ID = "642929b9-28f1-4cb5-b153-f482777e0003";

const result = ref("");

const onInit = async () => {
  await init(WEBSITE_ID);
  result.value = "SDK initialized.";
};

const onSetIdentity = async () => {
  await identity("dev+1@screeb.app", {
    firstname: "John",
    lastname: "Smith",
  });
  result.value = "Identity set.";
};

const onSetProperties = async () => {
  await identityProperties({ hello: "I'm a dev." });
  result.value = "Visitor properties set.";
};

const onAssignGroup = async () => {
  await identityGroupAssign("cohort", "Screeb Developers");
  result.value = "Group assigned.";
};

const onUnassignGroup = async () => {
  await identityGroupUnassign("cohort", "Screeb Developers");
  result.value = "Group unassigned.";
};

const onResetIdentity = async () => {
  await identityReset();
  result.value = "Identity reset.";
};

const onGetIdentity = async () => {
  const identityResult = await identityGet();
  result.value = JSON.stringify(identityResult, null, 2);
};

const onTrackEvent = async () => {
  await eventTrack("screeb-sdk-vue-example started", { test: 123 });
  result.value = "Event tracked.";
};

const onStartSurvey = async () => {
  await surveyStart(SURVEY_ID);
  result.value = "Survey started.";
};

const onStartMessage = async () => {
  await messageStart(MESSAGE_ID);
  result.value = "Message started.";
};

const onSessionReplayStart = async () => {
  await sessionReplayStart();
  result.value = "Session replay started.";
};

const onSessionReplayStop = async () => {
  await sessionReplayStop();
  result.value = "Session replay stopped.";
};

const onDebug = async () => {
  const debugResult = await debug();
  result.value = String(debugResult ?? "Debug done.");
};

const onDebugTargeting = async () => {
  const targetingResult = await targetingDebug();
  result.value = String(targetingResult ?? "");
};

const onClose = async () => {
  await close();
  result.value = "SDK closed.";
};
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
    <div class="actions">
      <button type="button" @click="onInit">Init SDK</button>
      <button type="button" @click="onSetIdentity">Set identity</button>
      <button type="button" @click="onSetProperties">
        Set visitor properties
      </button>
      <button type="button" @click="onAssignGroup">Assign group</button>
      <button type="button" @click="onUnassignGroup">Unassign group</button>
      <button type="button" @click="onResetIdentity">Reset identity</button>
      <button type="button" @click="onGetIdentity">Get identity</button>
      <button type="button" @click="onTrackEvent">Track event</button>
      <button type="button" @click="onStartSurvey">Start survey</button>
      <button type="button" @click="onStartMessage">Start message</button>
      <button type="button" @click="onSessionReplayStart">
        Session replay start
      </button>
      <button type="button" @click="onSessionReplayStop">
        Session replay stop
      </button>
      <button type="button" @click="onDebug">Debug SDK</button>
      <button type="button" @click="onDebugTargeting">Debug targeting</button>
      <button type="button" @click="onClose">Close SDK</button>
    </div>
    <pre v-if="result" class="targeting">{{ result }}</pre>
  </main>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  background: #5e21f1;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-family: Rubik, sans-serif;
  font-size: 1em;
  font-weight: 500;
  margin-top: 1em;
  padding: 10px 18px;
}

pre.targeting {
  background: #f7f5ff;
  border: 1px solid #ded6ff;
  border-radius: 8px;
  color: #303140;
  margin-top: 1em;
  overflow: auto;
  padding: 16px;
  text-align: left;
  white-space: pre-wrap;
}
</style>
