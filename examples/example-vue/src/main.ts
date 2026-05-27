import { ScreebPlugin } from "@screeb/sdk-vue";
import { createApp } from "vue";

import App from "./App.vue";
import "./index.css";

createApp(App)
  .use(ScreebPlugin, {
    autoInit: true,
    hooks: {
      onReady: (payload: unknown) => {
        // eslint-disable-next-line no-console
        console.log("onReady", payload);
      },
      version: "1.0.0",
    },
    userId: "dev+1@screeb.app",
    userProperties: {
      authenticated: true,
      firstname: "John",
      last_seen_at: new Date().toISOString(),
      lastname: "Smith",
      org_size: 20,
    },
    websiteId: "0e2b609a-8dce-4695-a80f-966fbfa87a88",
  })
  .mount("#app");
