/* eslint-disable no-unused-vars */
import {
  HooksInit,
  HooksMessageStart,
  HooksSurveyStart,
  PropertyRecord,
  ScreebIdentityGetReturn,
  ScreebOptions,
  SpaNavigationHandler,
} from "@screeb/sdk-browser";

/** Configuration for the ScreebPlugin */
export type ScreebConfig = {
  /** Your website/channel id. */
  websiteId: string;
  /** The unique identifier of your user. */
  userId?: string;
  /** The properties of your user. */
  userProperties?: PropertyRecord;
  /** Hooks to define callback for various Screeb events */
  hooks?: HooksInit;
  /** Force a specific language (e.g. 'en'). Default: browser language. */
  language?: string;
  /** Optional handler for the `in-page-spa` "Navigate to URL" target (custom SPA routers). */
  spaNavigationHandler?: SpaNavigationHandler;
  /**
   * Indicates if Screeb should be automatically loaded.
   * Set to false to prevent the SDK from loading (e.g. in CI).
   * @default true
   */
  shouldLoad?: boolean;
  /**
   * Indicates if Screeb should be automatically initialized.
   * When true, `init` is called automatically with `websiteId` and `userId`.
   * @default false
   */
  autoInit?: boolean;
  /** Screeb tag initialization options — handle with care. */
  options?: ScreebOptions;
};

export type CloseFunction = () => Promise<void>;
export type DebugFunction = () => Promise<unknown>;

export type EventTrackFunction = (
  eventName: string,
  eventProperties?: PropertyRecord,
) => Promise<unknown>;

export type IdentityFunction = (
  userId: string,
  userProperties?: PropertyRecord,
) => Promise<unknown>;

export type IdentityGetFunction = () => Promise<ScreebIdentityGetReturn>;

export type IdentityGroupAssignFunction = (
  groupName: string,
  groupType?: string,
  groupProperties?: PropertyRecord,
) => Promise<unknown>;

export type IdentityGroupUnassignFunction = (
  groupName: string,
  groupType?: string,
) => Promise<unknown>;

export type IdentityPropertiesFunction = (
  userProperties: PropertyRecord,
) => Promise<unknown>;

export type IdentityResetFunction = () => Promise<unknown>;

export type InitFunction = (
  websiteId: string,
  userId?: string,
  userProperties?: PropertyRecord,
  hooks?: HooksInit,
  language?: string,
  spaNavigationHandler?: SpaNavigationHandler,
) => Promise<void>;

export type LoadFunction = (options?: ScreebOptions) => Promise<void>;

export type SurveyCloseFunction = () => Promise<unknown>;

export type SurveyStartFunction = (
  surveyId: string,
  distributionId?: string,
  allowMultipleResponses?: boolean,
  hiddenFields?: PropertyRecord,
  hooks?: HooksSurveyStart,
  language?: string,
  selectors?: string | string[],
) => Promise<unknown>;

export type MessageCloseFunction = () => Promise<unknown>;

export type MessageStartFunction = (
  messageId: string,
  allowMultipleResponses?: boolean,
  hiddenFields?: PropertyRecord,
  hooks?: HooksMessageStart,
  language?: string,
) => Promise<unknown>;

export type SessionReplayStopFunction = () => Promise<unknown>;
export type SessionReplayStartFunction = () => Promise<unknown>;
export type TargetingDebugFunction = () => Promise<unknown>;
export type ScreebMaskTextFunction = <T extends Element>(element: T) => T;
export type ScreebNoCaptureFunction = <T extends Element>(element: T) => T;
export type ScreebIdFunction = <T extends Element>(element: T, id: string) => T;

/** All Screeb methods provided via `useScreeb()` */
export type ScreebContextValues = {
  close: CloseFunction;
  debug: DebugFunction;
  eventTrack: EventTrackFunction;
  identity: IdentityFunction;
  identityGet: IdentityGetFunction;
  identityGroupAssign: IdentityGroupAssignFunction;
  identityGroupUnassign: IdentityGroupUnassignFunction;
  identityProperties: IdentityPropertiesFunction;
  identityReset: IdentityResetFunction;
  init: InitFunction;
  load: LoadFunction;
  surveyClose: SurveyCloseFunction;
  surveyStart: SurveyStartFunction;
  messageClose: MessageCloseFunction;
  messageStart: MessageStartFunction;
  sessionReplayStart: SessionReplayStartFunction;
  sessionReplayStop: SessionReplayStopFunction;
  targetingDebug: TargetingDebugFunction;
  ScreebMaskText: ScreebMaskTextFunction;
  ScreebNoCapture: ScreebNoCaptureFunction;
  ScreebId: ScreebIdFunction;
};
