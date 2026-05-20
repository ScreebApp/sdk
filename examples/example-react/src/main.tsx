import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ProvidedApp } from "./ProvidedApp.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvidedApp />
  </React.StrictMode>,
);
