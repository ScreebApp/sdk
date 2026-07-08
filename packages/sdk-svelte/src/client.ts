import * as Screeb from "@screeb/sdk-browser";

import CONSTANTS from "./constants";
import * as logger from "./logger";
import { ScreebClient, ScreebConfig } from "./types";

export const createScreebClient = (config: ScreebConfig): ScreebClient => {
  let isInitialized = false;

  const ensureScreeb = async function <T extends () => ReturnType<T>>(
    functionName: string,
    callback: T,
    onlyLoaded = false,
  ): Promise<ReturnType<T>> {
    const shouldLoad = config.shouldLoad ?? true;
    if (!Screeb.isLoaded() && !shouldLoad) {
      const message =
        "Screeb instance is not loaded because `shouldLoad` is set to `false` in the Svelte provider";
      logger.log("warn", message);
      return Promise.reject(message);
    }

    if (!isInitialized && !onlyLoaded) {
      const message = [
        `"${functionName}" was called but Screeb has not been initialized yet. `,
        `Please call 'init' before calling '${functionName}' or `,
        "set 'autoInit' to true in the Svelte provider config.",
      ].join("");
      logger.log("warn", message);
      return Promise.reject(message);
    }

    return Promise.resolve(callback());
  };

  const init = async (
    websiteId: string,
    userId?: string,
    userProperties?: Screeb.PropertyRecord,
    hooks?: Screeb.HooksInit,
    language?: string,
  ) => {
    await ensureScreeb(
      "init",
      () => {
        if (!isInitialized) {
          Screeb.init(websiteId, userId, userProperties, hooks, language);
          isInitialized = true;
        }
      },
      true,
    );
  };

  const load = async (options?: Screeb.ScreebOptions) => {
    if (!Screeb.isLoaded()) {
      Screeb.load({
        sdkName: "sdk-svelte",
        sdkVersion: CONSTANTS.version,
        ...options,
      });
    }

    if (config.autoInit && !isInitialized) {
      if (config.websiteId) {
        await init(
          config.websiteId,
          config.userId,
          config.userProperties,
          config.hooks,
          config.language,
        );
      } else {
        logger.log(
          "warn",
          "autoInit is set to true, but no websiteId have been provided.",
        );
      }
    }
  };

  const close = async () => {
    if (Screeb.isLoaded()) {
      await Screeb.close();
      isInitialized = false;
    }
  };

  return {
    ScreebId: Screeb.ScreebId,
    ScreebMaskText: Screeb.ScreebMaskText,
    ScreebNoCapture: Screeb.ScreebNoCapture,
    close,
    debug: async () => ensureScreeb("debug", () => Screeb.debug()),
    eventTrack: async (eventName, eventProperties) =>
      ensureScreeb("eventTrack", () =>
        Screeb.eventTrack(eventName, eventProperties),
      ),
    identity: async (userId, userProperties) =>
      ensureScreeb("identity", () => Screeb.identity(userId, userProperties)),
    identityGet: async () =>
      ensureScreeb("identityGet", () => Screeb.identityGet()),
    identityGroupAssign: async (groupName, groupType, groupProperties) =>
      ensureScreeb("identityGroupAssign", () =>
        Screeb.identityGroupAssign(groupName, groupType, groupProperties),
      ),
    identityGroupUnassign: async (groupName, groupType) =>
      ensureScreeb("identityGroupUnassign", () =>
        Screeb.identityGroupUnassign(groupName, groupType),
      ),
    identityProperties: async (userProperties) =>
      ensureScreeb("identityProperties", () =>
        Screeb.identityProperties(userProperties),
      ),
    identityReset: async () =>
      ensureScreeb("identityReset", () => Screeb.identityReset()),
    init,
    load,
    messageClose: async () =>
      ensureScreeb("messageClose", () => Screeb.messageClose()),
    messageStart: async (
      messageId,
      allowMultipleResponses,
      hiddenFields,
      hooks,
      language,
    ) =>
      ensureScreeb("messageStart", () =>
        Screeb.messageStart(
          messageId,
          allowMultipleResponses,
          hiddenFields,
          hooks,
          language,
        ),
      ),
    sessionReplayStart: async () =>
      ensureScreeb("sessionReplayStart", () => Screeb.sessionReplayStart()),
    sessionReplayStop: async () =>
      ensureScreeb("sessionReplayStop", () => Screeb.sessionReplayStop()),
    surveyClose: async () =>
      ensureScreeb("surveyClose", () => Screeb.surveyClose()),
    surveyStart: async (
      surveyId,
      distributionId,
      allowMultipleResponses,
      hiddenFields,
      hooks,
      language,
      selectors,
    ) =>
      ensureScreeb("surveyStart", () =>
        Screeb.surveyStart(
          surveyId,
          distributionId,
          allowMultipleResponses,
          hiddenFields,
          hooks,
          language,
          selectors,
        ),
      ),
    targetingDebug: async () =>
      ensureScreeb("targetingDebug", () => Screeb.targetingDebug()),
  };
};
