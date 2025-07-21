import { ScreebProvider } from "@screeb/sdk-react";
import * as React from "react";

import App from "./App.tsx";
import "./index.css";

export const ProvidedApp = () => {
  const [userId, setUserId] = React.useState<string | undefined>(
    "dev+1@screeb.app",
  );

  const identityReset = React.useCallback(() => setUserId(undefined), []);
  const identitySet1 = React.useCallback(
    () => setUserId("dev+1@screeb.app"),
    [],
  );
  const identitySet2 = React.useCallback(
    () => setUserId("dev+2@screeb.app"),
    [],
  );

  return (
    <ScreebProvider
      autoInit
      websiteId="0e2b609a-8dce-4695-a80f-966fbfa87a88"
      userId={userId}
      userProperties={{
        authenticated: true,
        firstname: "John",
        last_seen_at: new Date(),
        lastname: "Smith",
        org_size: 20,
      }}
      hooks={{
        onReady: (payload) => {
          // eslint-disable-next-line no-console
          console.log("onReady", payload);
        },
        version: "1.0.0",
      }}
    >
      <App />
      <div>
        <h5>Identity: {userId}</h5>
        <button onClick={() => identityReset()}>identity reset</button>
        <button onClick={() => identitySet1()}>identity set 1</button>
        <button onClick={() => identitySet2()}>identity set 2</button>
      </div>
    </ScreebProvider>
  );
};
