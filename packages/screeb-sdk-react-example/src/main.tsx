import { ScreebProvider } from "@screeb/sdk-react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ScreebProvider
      autoInit
      websiteId="0e2b609a-8dce-4695-a80f-966fbfa87a88"
      userId="dev@screeb.app"
      userProperties={{
        authenticated: true,
        firstname: "John",
        last_seen_at: new Date(),
        lastname: "Smith",
        org_size: 20,
      }}
      hooks={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReady: (payload: any) => {
          // eslint-disable-next-line no-console
          console.log("onReady", payload);
        },
        version: "1.0.0",
      }}
    >
      <App />
    </ScreebProvider>
  </React.StrictMode>
);
