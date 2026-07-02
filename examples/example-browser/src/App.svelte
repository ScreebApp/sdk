<script lang="ts">
  import * as Screeb from "@screeb/sdk-browser"
  import { onMount } from "svelte"
  import screebLogo from "./assets/screeb.png"

  // Placeholder ids — replace with real ones from your Screeb workspace.
  const SURVEY_ID = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff"
  const MESSAGE_ID = "642929b9-28f1-4cb5-b153-f482777e0003"

  let result = ""

  const show = (value: unknown) => {
    result =
      typeof value === "string" ? value : JSON.stringify(value, null, 2)
  }

  const initSDK = async () => {
    await Screeb.load()
    // eslint-disable-next-line no-console
    console.log("screeb loaded")
    await Screeb.init(
      "0e2b609a-8dce-4695-a80f-966fbfa87a88",
      "dev@screeb.app",
      {
        authenticated: true,
        firstname: "John",
        last_seen_at: new Date(),
        lastname: "Smith",
        org_size: 20,
      },
      {
        onReady: (payload) => {
          // eslint-disable-next-line no-console
          console.log("onReady", payload)
        },
        version: "1.0.0",
      }
    )
  }

  const onInitSDK = async () => {
    await initSDK()
    show("SDK initialized")
  }

  const onSetIdentity = async () => {
    await Screeb.identity("dev@screeb.app", {
      authenticated: true,
      firstname: "John",
      lastname: "Smith",
    })
    show("Identity set")
  }

  const onSetVisitorProperties = async () => {
    await Screeb.identityProperties({ hello: "I'm a dev." })
    show("Visitor properties set")
  }

  const onAssignGroup = async () => {
    await Screeb.identityGroupAssign("cohort", "Screeb Developers")
    show("Group assigned")
  }

  const onUnassignGroup = async () => {
    await Screeb.identityGroupUnassign("cohort", "Screeb Developers")
    show("Group unassigned")
  }

  const onResetIdentity = async () => {
    await Screeb.identityReset()
    show("Identity reset")
  }

  const onGetIdentity = async () => {
    show(await Screeb.identityGet())
  }

  const onTrackEvent = async () => {
    await Screeb.eventTrack("screeb-sdk-browser-example event", { test: 123 })
    show("Event tracked")
  }

  const onStartSurvey = async () => {
    await Screeb.surveyStart(SURVEY_ID)
    show("Survey started")
  }

  const onStartMessage = async () => {
    await Screeb.messageStart(MESSAGE_ID)
    show("Message started")
  }

  const onSessionReplayStart = async () => {
    await Screeb.sessionReplayStart()
    show("Session replay started")
  }

  const onSessionReplayStop = async () => {
    await Screeb.sessionReplayStop()
    show("Session replay stopped")
  }

  const onDebugSDK = async () => {
    show(await Screeb.debug())
  }

  const onDebugTargeting = async () => {
    show(await Screeb.targetingDebug())
  }

  const onCloseSDK = async () => {
    await Screeb.close()
    show("SDK closed")
  }

  onMount(async () => {
    await initSDK()
  })
</script>

<main>
  <img src={screebLogo} alt="This is the Screeb.app logo" />
  <h1>Hello <em>you</em>!</h1>

  <h2>Welcome aboard!</h2>
  <p>
    Visit our
    <a
      href="https://github.com/ScreebApp/developers/wiki/Javascript-SDK-install"
      target="_blank"
    >
      Developer documentation
    </a>
    to learn how to integrate
    <a href="https://screeb.app" target="_blank">Screeb</a>.
  </p>

  <div class="actions">
    <button type="button" on:click={onInitSDK}>Init SDK</button>
    <button type="button" on:click={onSetIdentity}>Set identity</button>
    <button type="button" on:click={onSetVisitorProperties}>
      Set visitor properties
    </button>
    <button type="button" on:click={onAssignGroup}>Assign group</button>
    <button type="button" on:click={onUnassignGroup}>Unassign group</button>
    <button type="button" on:click={onResetIdentity}>Reset identity</button>
    <button type="button" on:click={onGetIdentity}>Get identity</button>
    <button type="button" on:click={onTrackEvent}>Track event</button>
    <button type="button" on:click={onStartSurvey}>Start survey</button>
    <button type="button" on:click={onStartMessage}>Start message</button>
    <button type="button" on:click={onSessionReplayStart}>
      Session replay start
    </button>
    <button type="button" on:click={onSessionReplayStop}>
      Session replay stop
    </button>
    <button type="button" on:click={onDebugSDK}>Debug SDK</button>
    <button type="button" on:click={onDebugTargeting}>Debug targeting</button>
    <button type="button" on:click={onCloseSDK}>Close SDK</button>
  </div>

  {#if result}
    <pre>{result}</pre>
  {/if}
</main>

<style>
  img {
    margin-top: 1em;
    max-width: 100px;
  }

  main {
    color: #303140;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    font-size: 4em;
    font-weight: 500;
    font-family: Rubik;
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
  }

  h2 {
    font-size: 1.2em;
    font-weight: 500;
    font-family: Rubik;
  }

  em {
    font-style: normal;
    color: #5e21f1;
    font-weight: 700;
  }

  a {
    font-weight: 700;
    color: #5e21f1;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5em;
  }

  button {
    background: #5e21f1;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-family: Rubik;
    font-size: 1em;
    font-weight: 500;
    margin-top: 1em;
    padding: 10px 18px;
  }

  pre {
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
