import { getContext, setContext } from "svelte";

import { createScreebClient } from "./client";
import * as logger from "./logger";
import { ScreebClient, ScreebConfig } from "./types";
import { isSSR } from "./utils";

export const SCREEB_CONTEXT_KEY = Symbol("screeb");

export function setScreebContext(config: ScreebConfig): ScreebClient {
  const client = createScreebClient(config);

  setContext(SCREEB_CONTEXT_KEY, client);

  if (!isSSR && (config.shouldLoad ?? true)) {
    void client.load(config.options);
  }

  return client;
}

export const provideScreeb = setScreebContext;

export function useScreeb(): ScreebClient {
  const context = getContext<ScreebClient | undefined>(SCREEB_CONTEXT_KEY);

  if (!context) {
    logger.log(
      "warn",
      "`useScreeb` must be called inside a component tree where `setScreebContext` or `provideScreeb` has been called.",
    );
  }

  return context as ScreebClient;
}
