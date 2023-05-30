import * as React from "react";

import { ScreebContextValues } from "./types";

const ScreebContext = React.createContext<ScreebContextValues | undefined>(
  undefined
);

export default ScreebContext;
