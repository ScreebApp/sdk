import { useScreeb } from "@screeb/sdk-react";
import * as React from "react";

import reactLogo from "./assets/react.svg";
import screebLogo from "./assets/screeb.png";

import "./App.css";

// Reuse the same website id configured in the ScreebProvider (ProvidedApp.tsx).
const WEBSITE_ID = "0e2b609a-8dce-4695-a80f-966fbfa87a88";

// Placeholder ids — replace with real ones from your Screeb workspace.
const SURVEY_ID = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff";
const MESSAGE_ID = "642929b9-28f1-4cb5-b153-f482777e0003";

function App() {
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

  const [result, setResult] = React.useState<string>("");

  const show = (value: unknown) => setResult(String(value ?? ""));

  const actions: { label: string; onClick: () => void | Promise<void> }[] = [
    {
      label: "Init SDK",
      onClick: async () => {
        await init(WEBSITE_ID, "dev+1@screeb.app", { hello: "I'm a dev." });
        show("SDK initialized");
      },
    },
    {
      label: "Set identity",
      onClick: async () => {
        await identity("dev+1@screeb.app", { authenticated: true });
        show("Identity set");
      },
    },
    {
      label: "Set visitor properties",
      onClick: async () => {
        await identityProperties({ hello: "I'm a dev." });
        show("Visitor properties set");
      },
    },
    {
      label: "Assign group",
      onClick: async () => {
        await identityGroupAssign("cohort", "Screeb Developers");
        show("Group assigned");
      },
    },
    {
      label: "Unassign group",
      onClick: async () => {
        await identityGroupUnassign("cohort", "Screeb Developers");
        show("Group unassigned");
      },
    },
    {
      label: "Reset identity",
      onClick: async () => {
        await identityReset();
        show("Identity reset");
      },
    },
    {
      label: "Get identity",
      onClick: async () => {
        const identityResult = await identityGet();
        show(JSON.stringify(identityResult, null, 2));
      },
    },
    {
      label: "Track event",
      onClick: async () => {
        await eventTrack("screeb-sdk-react-example event", { test: 123 });
        show("Event tracked");
      },
    },
    {
      label: "Start survey",
      onClick: async () => {
        await surveyStart(SURVEY_ID);
        show("Survey started");
      },
    },
    {
      label: "Start message",
      onClick: async () => {
        await messageStart(MESSAGE_ID);
        show("Message started");
      },
    },
    {
      label: "Session replay start",
      onClick: async () => {
        await sessionReplayStart();
        show("Session replay started");
      },
    },
    {
      label: "Session replay stop",
      onClick: async () => {
        await sessionReplayStop();
        show("Session replay stopped");
      },
    },
    {
      label: "Debug SDK",
      onClick: async () => {
        const debugResult = await debug();
        show(JSON.stringify(debugResult, null, 2));
      },
    },
    {
      label: "Debug targeting",
      onClick: async () => {
        const targetingResult = await targetingDebug();
        show(JSON.stringify(targetingResult, null, 2));
      },
    },
    {
      label: "Close SDK",
      onClick: async () => {
        await close();
        show("SDK closed");
      },
    },
  ];

  return (
    <main>
      <header>
        <img src={screebLogo} alt="This is the Screeb.app logo" />
        <span>+</span>
        <img src={reactLogo} alt="This is the React logo" />
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
        <a href="https://screeb.app" target="_blank">
          Screeb
        </a>
        .
      </p>

      <ul className="actions">
        {actions.map((action) => (
          <li key={action.label}>
            <button type="button" onClick={action.onClick}>
              {action.label}
            </button>
          </li>
        ))}
      </ul>

      {result && <pre className="targeting">{result}</pre>}
    </main>
  );
}

export default App;
