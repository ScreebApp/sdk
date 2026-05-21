import { inject } from "vue";

import { SCREEB_PLUGIN_KEY } from "./plugin";
import { ScreebContextValues } from "./types";

export function useScreeb(): ScreebContextValues {
  const context = inject(SCREEB_PLUGIN_KEY);

  if (!context) {
    // eslint-disable-next-line no-console
    console.warn(
      "`useScreeb` must be called inside a component tree where ScreebPlugin is installed.",
    );
  }

  return context as ScreebContextValues;
}
