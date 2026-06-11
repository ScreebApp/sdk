import * as Screeb from "@screeb/sdk-browser";
import { App, InjectionKey, Plugin, reactive, watch } from "vue";

import CONSTANTS from "./constants";
import * as logger from "./logger";
import {
  CloseFunction,
  DebugFunction,
  EventTrackFunction,
  IdentityFunction,
  IdentityGetFunction,
  IdentityGroupAssignFunction,
  IdentityGroupUnassignFunction,
  IdentityPropertiesFunction,
  IdentityResetFunction,
  InitFunction,
  LoadFunction,
  MessageCloseFunction,
  MessageStartFunction,
  ScreebConfig,
  ScreebContextValues,
  SessionReplayStartFunction,
  SessionReplayStopFunction,
  SurveyCloseFunction,
  SurveyStartFunction,
  TargetingCheckFunction,
  TargetingDebugFunction,
} from "./types";
import { isSSR } from "./utils";

export const SCREEB_PLUGIN_KEY: InjectionKey<ScreebContextValues> =
  Symbol("screeb");

let isInitialized = false;

export const ScreebPlugin: Plugin = {
  install(app: App, config: ScreebConfig) {
    const reactiveConfig = reactive(config);

    const ensureScreeb = async function <T extends () => ReturnType<T>>(
      functionName: string,
      callback: T,
      onlyLoaded = false,
    ): Promise<ReturnType<T>> {
      const shouldLoad = reactiveConfig.shouldLoad ?? true;
      if (!Screeb.isLoaded() && !shouldLoad) {
        const message =
          "Screeb instance is not loaded because `shouldLoad` is set to `false` in `ScreebPlugin`";
        logger.log("warn", message);
        return Promise.reject(message);
      }
      if (!isInitialized && !onlyLoaded) {
        const message = [
          `"${functionName}" was called but Screeb has not been initialized yet. `,
          `Please call 'init' before calling '${functionName}' or `,
          "set 'autoInit' to true in the ScreebPlugin config.",
        ].join("");
        logger.log("warn", message);
        return Promise.reject(message);
      }
      return Promise.resolve(callback());
    };

    const close: CloseFunction = async () => {
      if (Screeb.isLoaded()) {
        await Screeb.close();
        isInitialized = false;
      }
    };

    const debug: DebugFunction = async () =>
      await ensureScreeb("debug", () => Screeb.debug());

    const eventTrack: EventTrackFunction = async (
      eventName: string,
      eventProperties?: Screeb.PropertyRecord,
    ) =>
      await ensureScreeb("eventTrack", () =>
        Screeb.eventTrack(eventName, eventProperties),
      );

    const identity: IdentityFunction = async (
      userId: string,
      userProperties?: Screeb.PropertyRecord,
    ) =>
      await ensureScreeb("identity", () =>
        Screeb.identity(userId, userProperties),
      );

    const identityGet: IdentityGetFunction = async () =>
      await ensureScreeb("identityGet", () => Screeb.identityGet());

    const identityGroupAssign: IdentityGroupAssignFunction = async (
      groupName: string,
      groupType?: string,
      groupProperties?: Screeb.PropertyRecord,
    ) =>
      await ensureScreeb("identityGroupAssign", () =>
        Screeb.identityGroupAssign(groupName, groupType, groupProperties),
      );

    const identityGroupUnassign: IdentityGroupUnassignFunction = async (
      groupName: string,
      groupType?: string,
    ) =>
      await ensureScreeb("identityGroupUnassign", () =>
        Screeb.identityGroupUnassign(groupName, groupType),
      );

    const identityProperties: IdentityPropertiesFunction = async (
      userProperties: Screeb.PropertyRecord,
    ) =>
      await ensureScreeb("identityProperties", () =>
        Screeb.identityProperties(userProperties),
      );

    const identityReset: IdentityResetFunction = async () =>
      await ensureScreeb("identityReset", () => Screeb.identityReset());

    const init: InitFunction = async (
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

    const load: LoadFunction = async (options?: Screeb.ScreebOptions) => {
      if (!Screeb.isLoaded()) {
        Screeb.load({
          sdkName: "sdk-vue",
          sdkVersion: CONSTANTS.version,
          ...options,
        });

        if (reactiveConfig.autoInit ?? false) {
          if (reactiveConfig.websiteId) {
            await init(
              reactiveConfig.websiteId,
              reactiveConfig.userId,
              reactiveConfig.userProperties,
              reactiveConfig.hooks,
              reactiveConfig.language,
            );
          } else {
            logger.log(
              "warn",
              "autoInit is set to true, but no websiteId have been provided.",
            );
          }
        }
      }
    };

    const surveyClose: SurveyCloseFunction = async () =>
      await ensureScreeb("surveyClose", () => Screeb.surveyClose());

    const surveyStart: SurveyStartFunction = async (
      surveyId: string,
      distributionId?: string,
      allowMultipleResponses?: boolean,
      hiddenFields?: Screeb.PropertyRecord,
      hooks?: Screeb.HooksSurveyStart,
      language?: string,
      selectors?: string | string[],
    ) =>
      await ensureScreeb("surveyStart", () =>
        Screeb.surveyStart(
          surveyId,
          distributionId,
          allowMultipleResponses,
          hiddenFields,
          hooks,
          language,
          selectors,
        ),
      );

    const messageClose: MessageCloseFunction = async () =>
      await ensureScreeb("messageClose", () => Screeb.messageClose());

    const messageStart: MessageStartFunction = async (
      messageId: string,
      allowMultipleResponses = true,
      hiddenFields?: Screeb.PropertyRecord,
      hooks?: Screeb.HooksMessageStart,
      language?: string,
    ) =>
      await ensureScreeb("messageStart", () =>
        Screeb.messageStart(
          messageId,
          allowMultipleResponses,
          hiddenFields,
          hooks,
          language,
        ),
      );

    const sessionReplayStop: SessionReplayStopFunction = async () =>
      await ensureScreeb("sessionReplayStop", () => Screeb.sessionReplayStop());

    const sessionReplayStart: SessionReplayStartFunction = async () =>
      await ensureScreeb("sessionReplayStart", () =>
        Screeb.sessionReplayStart(),
      );

    const targetingCheck: TargetingCheckFunction = async () =>
      await ensureScreeb("targetingCheck", () => Screeb.targetingCheck());

    const targetingDebug: TargetingDebugFunction = async () =>
      await ensureScreeb("targetingDebug", () => Screeb.targetingDebug());

    watch(
      () => reactiveConfig.userId,
      (newId, oldId) => {
        if (!isInitialized) return;
        if (newId === oldId) return;
        if (newId) {
          Screeb.identity(newId);
        } else {
          Screeb.identityReset();
        }
      },
    );

    const context: ScreebContextValues = {
      close,
      debug,
      eventTrack,
      identity,
      identityGet,
      identityGroupAssign,
      identityGroupUnassign,
      identityProperties,
      identityReset,
      init,
      load,
      surveyClose,
      surveyStart,
      messageClose,
      messageStart,
      sessionReplayStop,
      sessionReplayStart,
      targetingCheck,
      targetingDebug,
    };

    app.provide(SCREEB_PLUGIN_KEY, context);

    if (!isSSR && (reactiveConfig.shouldLoad ?? true)) {
      load(reactiveConfig.options);
    }
  },
};
