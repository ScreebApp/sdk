import * as Screeb from "@screeb/sdk-browser";
import * as React from "react";

import ScreebContext from "./context";
import * as logger from "./logger";
import { ScreebContextValues, ScreebProviderProps } from "./types";
import { isSSR } from "./utils";

let isInitialized = false;

export const ScreebProvider: React.FC<
  React.PropsWithChildren<ScreebProviderProps>
> = ({
  websiteId,
  userId,
  userProperties,
  hooks,
  children,
  shouldLoad = !isSSR,
  autoInit = false,
  options,
  ...rest
}) => {
  const isLoaded = React.useRef(Screeb.isLoaded());

  // Allow data-x attributes, see https://github.com/devrnt/react-use-screeb/issues/478
  const invalidPropKeys = Object.keys(rest).filter(
    (key) => !key.startsWith("data-"),
  );

  if (invalidPropKeys.length > 0) {
    logger.log(
      "warn",
      [
        "some invalid props were passed to ScreebProvider. ",
        `Please check following props: ${invalidPropKeys.join(", ")}.`,
      ].join(""),
    );
  }

  const ensureScreeb = React.useCallback(
    // eslint-disable-next-line no-unused-vars
    async function <T extends (...args: unknown[]) => ReturnType<T>>(
      functionName: string,
      callback: T,
      onlyLoaded = false,
    ): Promise<ReturnType<T>> {
      if (!Screeb.isLoaded() && !shouldLoad) {
        const message =
          "Screeb instance is not loaded because `shouldLoad` is set to `false` in `ScreebProvider`";

        logger.log("warn", message);

        return Promise.reject(message);
      }
      if (!isInitialized && !onlyLoaded) {
        const message = [
          `"${functionName}" was called but Screeb has not been initialized yet. `,
          `Please call 'init' before calling '${functionName}' or `,
          "set 'autoInit' to true in the ScreebProvider.",
        ].join("");

        logger.log("warn", message);

        return Promise.reject(message);
      }
      return Promise.resolve(callback());
    },
    [shouldLoad],
  );

  const close = React.useCallback(async () => {
    if (isLoaded.current) {
      await Screeb.close();

      isLoaded.current = false;
    }
  }, [isLoaded.current]);

  const debug = React.useCallback(
    async () => await ensureScreeb("debug", () => Screeb.debug()),
    [],
  );

  const eventTrack = React.useCallback(
    async (eventName: string, eventProperties?: Screeb.PropertyRecord) =>
      await ensureScreeb("eventTrack", () =>
        Screeb.eventTrack(eventName, eventProperties),
      ),
    [],
  );

  const identity = React.useCallback(
    async (userId: string, userProperties?: Screeb.PropertyRecord) =>
      await ensureScreeb("identity", () =>
        Screeb.identity(userId, userProperties),
      ),
    [],
  );

  const identityGet = React.useCallback(
    async () => await ensureScreeb("identityGet", () => Screeb.identityGet()),
    [],
  );

  const identityGroupAssign = React.useCallback(
    async (
      groupName: string,
      groupType?: string,
      groupProperties?: Screeb.PropertyRecord,
    ) =>
      await ensureScreeb("identityGroupAssign", () =>
        Screeb.identityGroupAssign(groupName, groupType, groupProperties),
      ),
    [],
  );

  const identityGroupUnassign = React.useCallback(
    async (groupName: string, groupType?: string) =>
      await ensureScreeb("identityGroupUnassign", () =>
        Screeb.identityGroupUnassign(groupName, groupType),
      ),
    [],
  );

  const identityProperties = React.useCallback(
    async (userProperties: Screeb.PropertyRecord) =>
      await ensureScreeb("identityProperties", () =>
        Screeb.identityProperties(userProperties),
      ),
    [],
  );

  const identityReset = React.useCallback(
    async () =>
      await ensureScreeb("identityReset", () => Screeb.identityReset()),
    [],
  );

  const init = React.useCallback(
    async (
      websiteId: string,
      userId?: string,
      userProperties?: Screeb.PropertyRecord,
      hooks?: Screeb.Hooks,
    ) => {
      await ensureScreeb(
        "init",
        () => {
          if (!isInitialized) {
            Screeb.init(websiteId, userId, userProperties, hooks);

            isInitialized = true;
          }
        },
        true,
      );
    },
    [ensureScreeb, websiteId, shouldLoad],
  );

  const load = React.useCallback(
    async (options?: Screeb.ScreebOptions) => {
      if (!isLoaded.current) {
        Screeb.load(options);

        isLoaded.current = true;

        if (autoInit) {
          if (websiteId) {
            await init(websiteId, userId, userProperties, hooks);
          } else {
            logger.log(
              "warn",
              "autoInit is set to true, but no websiteId have been provided.",
            );
          }
        }
      }
    },
    [isLoaded.current, autoInit],
  );

  const surveyClose = React.useCallback(
    async () => await ensureScreeb("surveyClose", () => Screeb.surveyClose()),
    [],
  );

  const surveyStart = React.useCallback(
    async (
      surveyId: string,
      allowMultipleResponses: boolean,
      hiddenFields: Screeb.PropertyRecord,
      hooks?: Screeb.Hooks,
    ) =>
      await ensureScreeb("surveyStart", () =>
        Screeb.surveyStart(
          surveyId,
          allowMultipleResponses,
          hiddenFields,
          hooks,
        ),
      ),
    [],
  );

  const targetingCheck = React.useCallback(
    async () =>
      await ensureScreeb("targetingCheck", () => Screeb.targetingCheck()),
    [],
  );

  const targetingDebug = React.useCallback(
    async () =>
      await ensureScreeb("targetingDebug", () => Screeb.targetingDebug()),
    [],
  );

  const providerValue = React.useMemo<ScreebContextValues>(
    () => ({
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
      targetingCheck,
      targetingDebug,
    }),
    [
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
      targetingCheck,
      targetingDebug,
    ],
  );

  if (!isSSR && shouldLoad) {
    load(options);
  }

  return (
    <ScreebContext.Provider value={providerValue}>
      {children}
    </ScreebContext.Provider>
  );
};

export const useScreebContext = () => {
  const context = React.useContext(ScreebContext);

  if (context === undefined) {
    // eslint-disable-next-line quotes
    throw new Error('"useScreeb" must be used within `ScreebProvider`.');
  }

  return context as ScreebContextValues;
};
