<script lang="ts">
  import { onMount } from "svelte";
  import { useScreeb } from "@screeb/sdk-svelte";

  const {
    debug,
    eventTrack,
    identityGet,
    identityGroupAssign,
    identityProperties,
  } = useScreeb();

  let lastIdentity = "";

  onMount(async () => {
    // eslint-disable-next-line no-console
    console.log(await debug());

    await eventTrack("screeb-sdk-svelte-example started", {
      test: 123,
    });
    await identityProperties({ hello: "I'm a dev." });
    await identityGroupAssign("cohort", "Screeb Developers");

    setTimeout(async () => {
      const identity = await identityGet();
      lastIdentity = JSON.stringify(identity, null, 2);
      // eslint-disable-next-line no-console
      console.log(identity);
    }, 200);
  });
</script>

<main>
  <div class="logo-mark">S</div>
  <h1>Hello <em>you</em>!</h1>

  <h2>Welcome aboard!</h2>
  <p>
    This Svelte example loads Screeb through <code>@screeb/sdk-svelte</code>,
    initializes a test user, tracks an event, updates properties, and assigns a
    group.
  </p>

  {#if lastIdentity}
    <pre>{lastIdentity}</pre>
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

  pre {
    background: #f7f5ff;
    border: 1px solid #ded6ff;
    border-radius: 8px;
    color: #303140;
    overflow: auto;
    padding: 16px;
    text-align: left;
  }
</style>
