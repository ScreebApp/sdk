/** This is property types that are supported by Screeb. */
export type PropertyType = number | boolean | string | Date | PropertyRecord;

/** This is a property object that are supported by Screeb. */
export type PropertyRecord = {
  [key: string]: PropertyType | PropertyType[];
};

/**
 * Action
 */
export type ResponseQuestionActionButton = {
  id: string;
  type: "button";
  payload: {
    emoji: string;
    label: string;
    url?: string;
  };
};

export type ResponseQuestionActionLink = {
  id: string;
  type: "link";
  payload: {
    emoji: string;
    label: string;
    link: string;
  };
};

export type ResponseQuestionActionScoring = {
  id: string;
  type: "scoring";
  payload: {
    emoji: string;
    value: number;
  };
};

export type ResponseQuestionActionInputValidation = "text" | "email";

export type ResponseQuestionActionInput = {
  id: string;
  type: "text_input";
  payload: {
    validation: ResponseQuestionActionInputValidation;
  };
};

export type ResponseQuestionActionRange = {
  id: string;
  type: "number_input";
  payload: {
    validation: "min_max";
    min: number;
    max: number;
    emoji: string;
  };
};

/**
 * CTA
 */
export type ResponseQuestionCTANone = {
  type: "none";
};

export type ResponseQuestionCTAChoices = {
  type: "multiple_choice" | "pmf" | "link";
  choices: ResponseQuestionActionButton[];
};

export type ResponseQuestionCTAScores = {
  type: "scoring" | "nps" | "ces" | "csat";
  scores: ResponseQuestionActionScoring[];
};

export type ResponseQuestionCTAInput = {
  type: "input";
  input: ResponseQuestionActionInput;
};

export type ResponseQuestionCTARange = {
  type: "range";
  range: ResponseQuestionActionRange;
};

export type ResponseQuestionCTAAppStoreRating = {
  type: "appstore_rating";
};

export type ResponseQuestionCTA =
  | ResponseQuestionCTANone
  | ResponseQuestionCTAChoices
  | ResponseQuestionCTAScores
  | ResponseQuestionCTAInput
  | ResponseQuestionCTARange
  | ResponseQuestionCTAAppStoreRating;

/**
 * Answer
 */
export type ResponseAnswerValue =
  | ResponseAnswerValueNone
  | ResponseAnswerValueString
  | ResponseAnswerValueNumber
  | ResponseAnswerValueBoolean
  | ResponseAnswerValueTime;

export type ResponseAnswerValueNone = ResponseAnswerValueAbstract & {
  type: "none";
};

export type ResponseAnswerValueString = ResponseAnswerValueAbstract & {
  type: "string";
  value_string: string;
};

export type ResponseAnswerValueNumber = ResponseAnswerValueAbstract & {
  type: "number";
  value_number: number;
};

export type ResponseAnswerValueBoolean = ResponseAnswerValueAbstract & {
  type: "boolean";
  value_boolean: boolean;
};

export type ResponseAnswerValueTime = ResponseAnswerValueAbstract & {
  type: "time";
  value_time: Date;
};

type ResponseAnswerValueAbstract = {
  action_id: string;
};

export type ResponseAnswer = {
  id: string;
  question_id: string;
  values: ResponseAnswerValue[];
  created_at: Date;
};

export type ResponseQuestionActionSkip = {
  id: string;
  type: "skip";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

/**
 * Messages
 */
export type ResponseQuestionMessageText = {
  type: "text";
  text: string;
};

export type ResponseQuestionMessage = {
  id: string;
} & ResponseQuestionMessageText;

export type ResponseQuestion = {
  id: string;
  messages: ResponseQuestionMessage[];
  call_to_action: ResponseQuestionCTA;
  skip_action?: ResponseQuestionActionSkip;
  ends: boolean;
};

export type QuestionAnswerPair = {
  question: ResponseQuestion;
  answer?: ResponseAnswer;
};

export type ResponseStatus = "started" | "ended" | "closed" | "interrupted";

/**
 * Hooks
 */
export type HookType =
  | "onSurveyShowed"
  | "onSurveyStarted"
  | "onQuestionReplied"
  | "onSurveyCompleted"
  | "onSurveyHidden";

export type ResponseHookSurveyShowed = {
  survey: {
    id: string;
    survey_position: number;
    survey_size: number;
    survey_format: "conversationnal" | "cards" | undefined;
  };
  response: {
    id: string;
  };
  user: {
    anonymous_id: string;
    user_id: string;
  };
  items: QuestionAnswerPair[];
};

export type ResponseHookSDKReady = {
  user: {
    anonymous_id: string;
    user_id: string;
  };
};

export type ResponseHookSurveyStarted = {
  survey: {
    id: string;
    survey_position: number;
    survey_size: number;
    survey_format: "conversationnal" | "cards" | undefined;
  };
  response: {
    id: string;
  };
  user: {
    anonymous_id: string;
    user_id: string;
  };
};

export type ResponseHookSurveyHidden = {
  survey: {
    id: string;
    survey_position: number;
    survey_size: number;
    survey_format: "conversationnal" | "cards" | undefined;
  };
  response: {
    id: string;
    hide_reason: ResponseStatus;
  };
  user: {
    anonymous_id: string;
    user_id: string;
  };
  items: QuestionAnswerPair[];
};

export type ResponseHookSurveyReplied = {
  survey: {
    id: string;
    survey_position: number;
    survey_size: number;
    survey_format: "conversationnal" | "cards" | undefined;
  };
  response: {
    id: string;
    status: ResponseStatus;
  };
  user: {
    anonymous_id: string;
    user_id: string;
  };
  items: QuestionAnswerPair[];
};

export type ResponseHookSurveyCompleted = {
  survey: {
    id: string;
    survey_position: number;
    survey_size: number;
    survey_format: "conversationnal" | "cards" | undefined;
  };
  response: {
    id: string;
  };
  user: {
    anonymous_id: string;
    user_id: string;
  };
  items: QuestionAnswerPair[];
};

export type ResponseHook = {
  onReady: ResponseHookSDKReady;
  onSurveyShowed: ResponseHookSurveyShowed;
  onSurveyStarted: ResponseHookSurveyStarted;
  onQuestionReplied: ResponseHookSurveyReplied;
  onSurveyCompleted: ResponseHookSurveyCompleted;
  onSurveyHidden: ResponseHookSurveyHidden;
};

export type GlobalHooks = {
  // eslint-disable-next-line no-unused-vars
  [key in HookType | "onReady"]?: (payload: ResponseHook[key]) => void;
};
export type SurveyHooks = {
  // eslint-disable-next-line no-unused-vars
  [key in HookType]?: (payload: ResponseHook[key]) => void;
};

/** This is the Screeb tag options object. */
export type ScreebOptions = {
  /** If you're running Screeb tag in an iframe, please set the inner window here. */
  window?: Window;
  /** Please don't do this. */
  screebEndpoint?: string;
};

// eslint-disable-next-line no-unused-vars
type ScreebFunction = (..._: unknown[]) => void | Promise<unknown>;

/** This is the Screeb object publicly exposed in browser `window`. */
export type ScreebObject = ScreebFunction & {
  q?: {
    args: unknown[];
    // eslint-disable-next-line no-unused-vars
    ko: (reason?: unknown) => void;
    // eslint-disable-next-line no-unused-vars
    ok: (value?: unknown) => void;
    v: number;
  }[];
};

/** This is the object returned by the function `identityGet()`. */
export type ScreebIdentityGetReturn = {
  /** Anonymous id given to each user */
  anonymous_id: string;
  /** The authenticated id assigned to the user. */
  user_id: string;
  /** The current user session id */
  session_id: string;
  /** The current user session start time */
  session_start: string;
  /** The current user session end time */
  session_end: string;
  /** The current channel id with which the tag was initialized */
  channel_id: string;
  /** `true` if the tag us loaded, initialized and ready to rock */
  is_ready: boolean;
};

declare const window: Window & { $screeb?: ScreebObject };

const SCREEB_TAG_ENDPOINT = "https://t.screeb.app/tag.js";

let _window = window;

const callScreebCommand: ScreebFunction = (...args) => {
  if (_window.$screeb) {
    return _window.$screeb.apply(_window.$screeb, args);
  }

  return Promise.reject(
    "[Screeb] Screeb.load() must be called before any other function."
  );
};

/**
 * Appends Screeb tag into your dom.
 *
 * @param options Screeb module options.
 * @param options.window If you're running Screeb tag in an iframe, please set the inner window here.
 * @param options.screebEndpoint Please don't do this.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.load();
 * ```
 */
export const load = (options: ScreebOptions = {}) =>
  new Promise<undefined>((resolve, reject) => {
    _window = options.window ?? window;

    const scriptElement = document.createElement("script");

    scriptElement.async = true;
    scriptElement.src = options.screebEndpoint ?? SCREEB_TAG_ENDPOINT;

    scriptElement.addEventListener("load", () => resolve(undefined));
    scriptElement.addEventListener("error", reject);

    _window.$screeb =
      _window.$screeb ??
      function (...args) {
        return new Promise((a, b) => {
          if (_window.$screeb) {
            return (_window.$screeb.q = _window.$screeb.q ?? []).push({
              args,
              ko: b,
              ok: a,
              v: 1,
            });
          }
          return 0;
        });
      };

    _window.document.head.appendChild(scriptElement);
  });

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
 * @param hooks Hooks to be called when SDK is ready or a survey is showed, started, completed, hidden
 * or when a question is replied.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.init(
 *   "<your-website-id>",
 *   "<your-user-id>",
 *   {
 *     firstname: '<user-firstname>',
 *     lastname: '<user-lastname>',
 *     plan: '<user-plan>',
 *     last_seen_at: new Date(),
 *     authenticated: true
 *   },
 *   {
 *     onReady: (payload) => {
 *        console.log("SDK is ready", payload);
 *     },
 *   },
 * );
 * ```
 */
export const init = (
  websiteId: string,
  userId?: string,
  userProperties?: PropertyRecord,
  hooks?: GlobalHooks
) => {
  let identityObject;

  if (userId || userProperties) {
    identityObject = {
      hooks: hooks,
      identity: {
        id: userId,
        properties: userProperties,
      },
    };
  }

  return callScreebCommand("init", websiteId, identityObject);
};

/**
 * Checks if Screeb tag has been loaded.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * console.log(Screeb.isLoaded()); // false
 * Screeb.load();
 * console.log(Screeb.isLoaded()); // true
 * ```
 */
export const isLoaded = () =>
  Boolean(_window.$screeb) && typeof _window.$screeb === "function";

/**
 * Shutdowns current Screeb session.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.close();
 * ```
 */
export const close = () => callScreebCommand("close");

/**
 * Prints the actual state information of Screeb tag.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.debug();
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
export const debug = () => callScreebCommand("debug");

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
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.eventTrack(
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
export const eventTrack = (
  eventName: string,
  eventProperties?: PropertyRecord
) => callScreebCommand("event.track", eventName, eventProperties);

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
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identity(
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
export const identity = (userId: string, userProperties?: PropertyRecord) =>
  callScreebCommand("identity", userId, userProperties);

/**
 * Retrieves the current user identity.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * console.log(await Screeb.identityGet());
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
export const identityGet = (): Promise<ScreebIdentityGetReturn> =>
  callScreebCommand("identity.get") as Promise<ScreebIdentityGetReturn>;

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
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identityGroupAssign(
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
export const identityGroupAssign = (
  groupName: string,
  groupType?: string,
  groupProperties?: PropertyRecord
) =>
  callScreebCommand(
    "identity.group.assign",
    groupType,
    groupName,
    groupProperties
  );

/**
 * Unassigns the current user to a group.
 *
 * @param groupName The name of your user group.
 * @param groupType The type of your user group.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identityGroupUnassign('company', 'Apple');
 * ```
 */
export const identityGroupUnassign = (groupName: string, groupType?: string) =>
  callScreebCommand("identity.group.unassign", groupType, groupName);

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
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * // Set user properties
 * Screeb.identityProperties(
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
 * Screeb.identityProperties(
 *   {
 *     age: null,
 *     company: null,
 *     logged: true,
 *   }
 * );
 * ```
 */
export const identityProperties = (userProperties: PropertyRecord) =>
  callScreebCommand("identity.properties", userProperties);

/**
 * Resets the current user identity.
 * Warning: This command must be called only once, since it creates a new identity on Screeb side.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.identityReset();
 * ```
 */
export const identityReset = () => callScreebCommand("identity.reset");

/**
 * Interrupts a running survey.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.surveyClose();
 * ```
 */
export const surveyClose = () => callScreebCommand("survey.close");

/**
 * Starts a survey by its ID.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.surveyStart(
 *   '<UUID>',
 *   false,
 *   {
 *     color: "green",
 *     article_id: 42
 *   },
 *   {
 *     onSurveyShowed: (payload) => {
 *        console.log("Survey showed", payload);
 *     },
 *   },
 * );
 * ```
 */
export const surveyStart = (
  surveyId: string,
  allowMultipleResponses = true,
  hiddenFields: PropertyRecord = {},
  hooks: SurveyHooks | undefined = undefined
) =>
  callScreebCommand("survey.start", surveyId, {
    allow_multiple_responses: allowMultipleResponses,
    hidden_fields: hiddenFields,
    hooks: hooks,
  });

/**
 * Forces a targeting check.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * Screeb.targetingCheck();
 * ```
 */
export const targetingCheck = () => callScreebCommand("targeting.check");

/**
 * Prints the current state of the targeting engine.
 *
 * @example
 * ```ts
 * import * as Screeb from "@screeb/sdk-browser";
 *
 * console.log(await Screeb.targetingDebug());
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
export const targetingDebug = () => callScreebCommand("targeting.debug");
