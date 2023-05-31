import { useScreeb } from "@screeb/sdk-react";
import * as React from "react";

import reactLogo from "./assets/react.svg";
import screebLogo from "./assets/screeb.png";

import "./App.css";

function App() {
  const {
    debug,
    eventTrack,
    identityProperties,
    identityGroupAssign,
    identityGet,
  } = useScreeb();

  React.useEffect(() => {
    debug();
    eventTrack("screeb-sdk-react-example started", { test: 123 });
    identityProperties({ hello: "I'm a dev." });
    identityGroupAssign("cohort", "Screeb Developers");

    // eslint-disable-next-line no-console
    setTimeout(() => identityGet().then(console.log), 500);
  }, [debug, eventTrack, identityProperties, identityGroupAssign, identityGet]);

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
    </main>
  );
}

export default App;
