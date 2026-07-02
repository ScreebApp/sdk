<script lang="ts">
  import { onMount } from "svelte";
  import { useScreeb } from "@screeb/sdk-svelte";

  const {
    close,
    debug,
    eventTrack,
    identity,
    identityGet,
    identityGroupAssign,
    identityGroupUnassign,
    identityProperties,
    identityReset,
    init,
    load,
    messageStart,
    sessionReplayStart,
    sessionReplayStop,
    surveyStart,
    targetingDebug,
  } = useScreeb();

  // Reuse the same website id as the ScreebProvider config in App.svelte.
  const WEBSITE_ID = "0e2b609a-8dce-4695-a80f-966fbfa87a88";
  // Placeholder ids — replace with real ones from your Screeb workspace.
  const SURVEY_ID = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff";
  const MESSAGE_ID = "642929b9-28f1-4cb5-b153-f482777e0003";

  let lastIdentity = "";
  let targeting = "";
  let status = "";

  const onInit = async () => {
    await load();
    await init(WEBSITE_ID, "dev@screeb.app", {
      authenticated: true,
      firstname: "John",
      lastname: "Smith",
    });
    status = "SDK initialized";
  };

  const onIdentity = async () => {
    await identity("dev@screeb.app", { firstname: "John", lastname: "Smith" });
    status = "Identity set";
  };

  const onProperties = async () => {
    await identityProperties({ hello: "I'm a dev." });
    status = "Visitor properties set";
  };

  const onGroupAssign = async () => {
    await identityGroupAssign("cohort", "Screeb Developers", {
      plan: "enterprise",
    });
    status = "Group assigned";
  };

  const onGroupUnassign = async () => {
    await identityGroupUnassign("cohort", "Screeb Developers");
    status = "Group unassigned";
  };

  const onIdentityReset = async () => {
    await identityReset();
    status = "Identity reset";
  };

  const onIdentityGet = async () => {
    const identityValue = await identityGet();
    lastIdentity = JSON.stringify(identityValue, null, 2);
  };

  const onEventTrack = async () => {
    await eventTrack("screeb-sdk-svelte-example event", { test: 123 });
    status = "Event tracked";
  };

  const onSurveyStart = async () => {
    await surveyStart(SURVEY_ID);
    status = "Survey started";
  };

  const onMessageStart = async () => {
    await messageStart(MESSAGE_ID);
    status = "Message started";
  };

  const onSessionReplayStart = async () => {
    await sessionReplayStart();
    status = "Session replay started";
  };

  const onSessionReplayStop = async () => {
    await sessionReplayStop();
    status = "Session replay stopped";
  };

  const onDebug = async () => {
    const result = await debug();
    lastIdentity = JSON.stringify(result, null, 2);
  };

  const onDebugTargeting = async () => {
    const result = await targetingDebug();
    targeting = String(result ?? "");
  };

  const onClose = async () => {
    await close();
    status = "SDK closed";
  };

  onMount(async () => {
    // SDK auto-inits on mount (see provideScreeb in App.svelte).
    // eslint-disable-next-line no-console
    console.log(await debug());
  });
</script>

<main>
  <div class="logo-mark">S</div>
  <h1>Hello <em>you</em>!</h1>

  <h2>Welcome aboard!</h2>
  <p>
    This Svelte example loads Screeb through <code>@screeb/sdk-svelte</code>. Use
    the buttons below to exercise the full Screeb action list.
  </p>

  <div class="actions">
    <button type="button" on:click={onInit}>Init SDK</button>
    <button type="button" on:click={onIdentity}>Set identity</button>
    <button type="button" on:click={onProperties}>Set visitor properties</button>
    <button type="button" on:click={onGroupAssign}>Assign group</button>
    <button type="button" on:click={onGroupUnassign}>Unassign group</button>
    <button type="button" on:click={onIdentityReset}>Reset identity</button>
    <button type="button" on:click={onIdentityGet}>Get identity</button>
    <button type="button" on:click={onEventTrack}>Track event</button>
    <button type="button" on:click={onSurveyStart}>Start survey</button>
    <button type="button" on:click={onMessageStart}>Start message</button>
    <button type="button" on:click={onSessionReplayStart}
      >Session replay start</button
    >
    <button type="button" on:click={onSessionReplayStop}
      >Session replay stop</button
    >
    <button type="button" on:click={onDebug}>Debug SDK</button>
    <button type="button" on:click={onDebugTargeting}>Debug targeting</button>
    <button type="button" on:click={onClose}>Close SDK</button>
  </div>

  {#if status}
    <pre>{status}</pre>
  {/if}

  {#if lastIdentity}
    <pre>{lastIdentity}</pre>
  {/if}

  {#if targeting}
    <pre>{targeting}</pre>
  {/if}
</main>

<style>
  .logo-mark {
    align-items: center;
    background: #5e21f1;
    border-radius: 8px;
    color: #fff;
    display: inline-flex;
    font-family: Rubik, sans-serif;
    font-size: 48px;
    font-weight: 700;
    height: 88px;
    justify-content: center;
    margin-top: 1em;
    width: 88px;
  }

  main {
    color: #303140;
    margin: 0 auto;
    max-width: 520px;
    padding: 1em;
    text-align: center;
  }

  h1 {
    font-family: Rubik, sans-serif;
    font-size: 4em;
    font-weight: 500;
    margin-block-end: 0.2em;
    margin-block-start: 0.2em;
  }

  h2 {
    font-family: Rubik, sans-serif;
    font-size: 1.2em;
    font-weight: 500;
  }

  em {
    color: #5e21f1;
    font-style: normal;
    font-weight: 700;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  pre {
    background: #f7f5ff;
    border: 1px solid #ded6ff;
    border-radius: 8px;
    color: #303140;
    overflow: auto;
    padding: 16px;
    text-align: left;
    white-space: pre-wrap;
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
</style>
