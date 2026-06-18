<script lang="ts">
  import { provideScreeb } from "@screeb/sdk-svelte";

  import ScreebDemo from "./ScreebDemo.svelte";

  provideScreeb({
    autoInit: true,
    hooks: {
      onReady: (payload) => {
        // eslint-disable-next-line no-console
        console.log("onReady", payload);
      },
      version: "1.0.0",
    },
    userId: "dev@screeb.app",
    userProperties: {
      authenticated: true,
      firstname: "John",
      last_seen_at: new Date(),
      lastname: "Smith",
      org_size: 20,
    },
    websiteId: "0e2b609a-8dce-4695-a80f-966fbfa87a88",
  });
</script>

<ScreebDemo />
