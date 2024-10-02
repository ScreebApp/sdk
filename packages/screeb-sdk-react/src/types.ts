/* eslint-disable no-unused-vars */
import {
  Hooks,
  PropertyRecord,
  ScreebIdentityGetReturn,
  ScreebOptions,
} from "@screeb/sdk-browser";

/** Properties of Screeb provider */
export type ScreebProps = {
  /** Your website/channel id. */
  websiteId: string;
  /** The unique identifier of your user. */
  userId?: string;
  /** The properties of your user. */
  userProperties?: PropertyRecord;
  /** Hooks to define callback for various event */
  hooks?: Hooks;
  /** The language you want to force */
  language?: string;
};

/**
 * Shutdowns current Screeb session.
 *
 * @example
 * ```ts
 * const { close } = useScreeb();
 *
 * close();
 * ```
 */
export type CloseFunction = () => Promise<void>;

/**
 * Prints the actual state information of Screeb tag.
 *
 * @example
 * ```ts
 * const { debug } = useScreeb();
 *
 * debug();
 * // ******************* SCREEB SESSION DEBUG *********************
 * // Screeb channel id: <UUID>
 * // Screeb channel type: widget
 * // Screeb respondent id: <UUID>
 * // Screeb survey id: none
 * // Screeb response id: none
 * //
 * // Screeb current session start: Thu May 04 2023 16:53:49 GMT+0200 (Central European Summer Time)
 * // Screeb current session last activity: Thu May 04 2023 17:41:30 GMT+0200 (Central European Summer Time)
 * //
 * // Screeb targeting engine status: disabled
 * // Screeb targeting engine: 3 surveys
 * //
 * // Detected platform: desktop
 * // Detected locale: en-GB
 * // Detected timezone: -120
 * // **************************************************************
 * ```
 */
export type DebugFunction = () => Promise<unknown>;

/**
 * Tracks a user event.
 *
 * @param eventName The event name.
 * @param eventProperties The properties of your event.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * const { eventTrack } = useScreeb();
 *
 * eventTrack(
 *   "Product added to cart",
 *   {
 *     product_name: 'Red bike 2021',
 *     category: 'sport',
 *     color: 'red',
 *     price: 299,
 *     count: 1,
 *     reference: '2CF093TG1',
 *     delivery_method: 'UPS',
 *     user_logged: false,
 *     added_at: new Date(),
 *   }
 * );
 * ```
 */
export type EventTrackFunction = (
  eventName: string,
  eventProperties?: PropertyRecord,
) => Promise<unknown>;

/**
 * Change the current user identity.
 * Warning: Running surveys will be closed.
 *
 * @param userId The unique identifier of your user.
 * @param userProperties The properties of your user.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * const { identity } = useScreeb();
 *
 * identity(
 *   "<your-user-id>",
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   }
 * );
 * ```
 */
export type IdentityFunction = (
  userId: string,
  userProperties?: PropertyRecord,
) => Promise<unknown>;

/**
 * Retrieves the current user identity.
 *
 * @example
 * ```ts
 * const { identityGet } = useScreeb();
 *
 * console.log(await identityGet());
 * // {
 * //   anonymous_id: "<UUID>",
 * //   user_id: "<UUID>",
 * //   session_id: "<UUID>",
 * //   session_start: "2023-05-04T16:30:15.882Z",
 * //   session_end: "2023-05-04T17:02:09.087Z",
 * //   channel_id: "<UUID>",
 * //   is_ready: true,
 * // }
 * ```
 */
export type IdentityGetFunction = () => Promise<ScreebIdentityGetReturn>;

/**
 * Assigns the current user to a group.
 *
 * @param groupName
 * @param groupType
 * @param groupProperties The properties of your user group.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * const { identityGroupAssign } = useScreeb();
 *
 * identityGroupAssign(
 *   'company',
 *   'Apple',
 *   {
 *     address_line_1: 'Apple Campus',
 *     address_line_2: '1 Infinite Loop',
 *     city: 'Cupertino',
 *     zipcode: 95014,
 *     state: 'California',
 *     country: 'United states',
 *   }
 * );
 * ```
 */
export type IdentityGroupAssignFunction = (
  groupName: string,
  groupType?: string,
  groupProperties?: PropertyRecord,
) => Promise<unknown>;

/**
 * Unassigns the current user to a group.
 *
 * @param groupName The name of your user group.
 * @param groupType The type of your user group.
 *
 * @example
 * ```ts
 * const { identityGroupUnassign } = useScreeb();
 *
 * identityGroupUnassign('company', 'Apple');
 * ```
 */
export type IdentityGroupUnassignFunction = (
  groupName: string,
  groupType?: string,
) => Promise<unknown>;

/**
 * Adds properties to the current user identity.
 *
 * @param userProperties The properties of your user.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date.
 * ```
 *
 * @example
 * ```ts
 * const { identityProperties } = useScreeb();
 *
 * // Set user properties
 * identityProperties(
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   }
 * );
 *
 * // Delete user property : set values to null
 * identityProperties(
 *   {
 *     age: null,
 *     company: null,
 *     logged: true,
 *   }
 * );
 * ```
 */
export type IdentityPropertiesFunction = (
  userProperties: PropertyRecord,
) => Promise<unknown>;

/**
 * Resets the current user identity.
 * Warning: This command must be called only once, since it creates a new identity on Screeb side.
 *
 * @example
 * ```ts
 * const { identityReset } = useScreeb();
 *
 * identityReset();
 * ```
 */
export type IdentityResetFunction = () => Promise<unknown>;

/**
 * Initializes Screeb tag.
 *
 * @param websiteId Your website/channel id.
 * @param userId The unique identifier of your user.
 * @param userProperties The properties of your user.
 * ```text Requirements:
 *   - Property names must be limited to 128 characters
 *   - No more than 1000 attributes
 *   - Supported types for values: string, number, boolean and Date
 * ```
 * @param language Force a specific language for the tag. eg: 'en'. default: browser language.
 *
 * @example
 * ```ts
 * const { init } = useScreeb();
 *
 * init(
 *   "<your-website-id>",
 *   "<your-user-id>",
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   },
 *   "en"
 * );
 * ```
 */
export type InitFunction = (
  websiteId: string,
  userId?: string,
  userProperties?: PropertyRecord,
  hooks?: Hooks,
  language?: string,
) => Promise<void>;

/**
 * Appends Screeb tag into your dom.
 *
 * @param options Screeb module options.
 * @param options.window If you're running Screeb tag in an iframe, please set the inner window here.
 * @param options.screebEndpoint Please don't do this.
 *
 * @example
 * ```ts
 * const { load } = useScreeb();
 *
 * load();
 * ```
 */
export type LoadFunction = (options?: ScreebOptions) => Promise<void>;

/**
 * Interrupts a running survey.
 *
 * @example
 * ```ts
 * const { surveyClose } = useScreeb();
 *
 * surveyClose();
 * ```
 */
export type SurveyCloseFunction = () => Promise<unknown>;

/**
 * Starts a survey by its ID.
 *
 * @example
 * ```ts
 * const { surveyStart } = useScreeb();
 *
 * surveyStart(
 *   '<UUID>',
 *   false,
 *   {
 *     color: "green",
 *     article_id: 42
 *   }
 * );
 * ```
 */
export type SurveyStartFunction = (
  surveyId: string,
  allowMultipleResponses: boolean,
  hiddenFields: PropertyRecord,
  hooks?: Hooks,
  language?: string,
) => Promise<unknown>;

/**
 * Forces a targeting check.
 *
 * @example
 * ```ts
 * const { targetingCheck } = useScreeb();
 *
 * targetingCheck();
 * ```
 */
export type TargetingCheckFunction = () => Promise<unknown>;

/**
 * Prints the current state of the targeting engine.
 *
 * @example
 * ```ts
 * const { targetingDebug } = useScreeb();
 *
 * console.log(await targetingDebug());
 * // targeting ************ SCREEB TARGETING RULES DEBUG **************
 * // Disabled surveys are not listed here.
 * //
 * // Screeb channel id: <UUID>
 * // Screeb respondent id: <UUID>
 * //
 * // Survey <UUID>:
 * // https://admin.screeb.app/org/last/survey/<UUID>/share
 * //
 * //   - Rule of type "Device type (desktop/mobile/tablet)": true 🟢
 * //   - Rule of type "Multiple display": true 🟢
 * //   - Rule of type "Capping per time between survey display on current respondent": true 🟢
 * //   - Rule of type "User event count": false 🔴
 * //   - Rule of type "Capping per respondent display count": false 🔴
 * ```
 */
export type TargetingDebugFunction = () => Promise<unknown>;

/** Screeb context API */
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
  targetingCheck: TargetingCheckFunction;
  targetingDebug: TargetingDebugFunction;
};

/** Properties of Screeb provider */
export type ScreebProviderProps = {
  /**
   * Indicates if Screeb should be automatically loaded.
   * This will ping to the Screeb servers.
   *
   * @remarks if `true`, 'load' does not need to be called manually. Can be used for multistaged environments
   */
  shouldLoad?: boolean;
  /**
   * Indicates if Screeb should be automatically initialized.
   *
   * @remarks if `true`, 'init' does not need to be called manually
   * */
  autoInit?: boolean;
  /**
   * Screeb tag initialization options.
   *
   * @remarks this is used is really particular cases, handle with care.
   * */
  options?: ScreebOptions;
} & Partial<ScreebProps>;
