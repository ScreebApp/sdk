import { Inject, Injectable } from "@angular/core";
import * as _Screeb from "@screeb/sdk-browser";

import * as logger from "./logger";
import { ScreebConfig } from "./screeb-config";

@Injectable({ providedIn: "root" })
export class Screeb {
  private isInitialized = false;

  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(ScreebConfig) private config: ScreebConfig) {}

  private async ensureScreeb(functionName: string, onlyLoaded = false) {
    if (!_Screeb.isLoaded() && !this.config.shouldLoad) {
      const message =
        "Screeb instance is not loaded because `shouldLoad` is set to `false` in `ScreebModule` configuration.";

      logger.log("warn", message);

      return Promise.reject(message);
    }
    if (!this.isInitialized && !onlyLoaded) {
      const message = [
        `"${functionName}" was called but Screeb has not been initialized yet. `,
        `Please call 'init' before calling '${functionName}' or `,
        "set 'autoInit' to true in the `ScreebModule` configuration.",
      ].join("");

      logger.log("warn", message);

      return Promise.reject(message);
    }
    return Promise.resolve();
  }

  /**
   * Shutdowns current Screeb session.
   *
   * @example
   * ```ts
   * this.screeb.close();
   * ```
   */
  public async close() {
    await this.ensureScreeb("close");

    return _Screeb.close();
  }

  /**
   * Prints the actual state information of Screeb tag.
   *
   * @example
   * ```ts
   * this.screeb.debug();
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
  public async debug() {
    await this.ensureScreeb("debug");

    return _Screeb.debug();
  }

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
   * this.screeb.eventTrack(
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
  public async eventTrack(
    eventName: string,
    eventProperties?: _Screeb.PropertyRecord
  ) {
    await this.ensureScreeb("eventTrack");

    return _Screeb.eventTrack(eventName, eventProperties);
  }

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
   * this.screeb.identity(
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
  public async identity(
    userId: string,
    userProperties?: _Screeb.PropertyRecord
  ) {
    await this.ensureScreeb("identity");

    return _Screeb.identity(userId, userProperties);
  }

  /**
   * Retrieves the current user identity.
   *
   * @example
   * ```ts
   * console.log(await this.screeb.identityGet());
   * // {
   * //   channel_id: "<UUID>",
   * //   anonymous_id: "<UUID>",
   * //   user_id: "<UUID>",
   * //   is_ready: true,
   * //   session_id: "<UUID>",
   * //   session_start: "2023-05-04T16:30:15.882Z",
   * //   session_end: "2023-05-04T17:02:09.087Z",
   * // }
   * ```
   */
  public async identityGet() {
    await this.ensureScreeb("identityGet");

    return _Screeb.identityGet();
  }

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
   * this.screeb.identityGroupAssign(
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
  public async identityGroupAssign(
    groupName: string,
    groupType?: string,
    groupProperties?: _Screeb.PropertyRecord
  ) {
    await this.ensureScreeb("identityGroupAssign");

    return _Screeb.identityGroupAssign(groupName, groupType, groupProperties);
  }

  /**
   * Unassigns the current user to a group.
   *
   * @param groupName The name of your user group.
   * @param groupType The type of your user group.
   *
   * @example
   * ```ts
   * this.screeb.identityGroupUnassign('company', 'Apple');
   * ```
   */
  public async identityGroupUnassign(groupName: string, groupType?: string) {
    await this.ensureScreeb("identityGroupUnassign");

    return _Screeb.identityGroupUnassign(groupName, groupType);
  }

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
   * // Set user properties
   * this.screeb.identityProperties(
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
   * this.screeb.identityProperties(
   *   {
   *     age: null,
   *     company: null,
   *     logged: true,
   *   }
   * );
   * ```
   */
  public async identityProperties(userProperties: _Screeb.PropertyRecord) {
    await this.ensureScreeb("identityProperties");

    return _Screeb.identityProperties(userProperties);
  }

  /**
   * Resets the current user identity.
   * Warning: This command must be called only once, since it creates a new identity on Screeb side.
   *
   * @example
   * ```ts
   * this.screeb.identityReset();
   * ```
   */
  public async identityReset() {
    await this.ensureScreeb("identityReset");

    return _Screeb.identityReset();
  }

  /**
   * Interrupts a running survey.
   *
   * @example
   * ```ts
   * this.screeb.surveyClose();
   * ```
   */
  public async surveyClose() {
    await this.ensureScreeb("surveyClose");

    return _Screeb.surveyClose();
  }

  /**
   * Starts a survey by its ID.
   *
   * @example
   * ```ts
   * this.screeb.surveyStart(
   *   '<UUID>',
   *   false,
   *   {
   *     color: "green",
   *     article_id: 42
   *   },
   *   {
   *     version: "1.0.0",
   *     onSurveyShowed: (payload) => console.log("Survey showed", payload),
   *   },
   * );
   * ```
   */
  public async surveyStart(
    surveyId: string,
    allowMultipleResponses: boolean,
    hiddenFields: _Screeb.PropertyRecord,
    hooks?: _Screeb.Hooks
  ) {
    await this.ensureScreeb("surveyStart");

    return _Screeb.surveyStart(
      surveyId,
      allowMultipleResponses,
      hiddenFields,
      hooks
    );
  }

  /**
   * Forces a targeting check.
   *
   * @example
   * ```ts
   * this.screeb.targetingCheck();
   * ```
   */
  public async targetingCheck() {
    await this.ensureScreeb("targetingCheck");

    return _Screeb.targetingCheck();
  }

  /**
   * Prints the current state of the targeting engine.
   *
   * @example
   * ```ts
   * console.log(await this.screeb.targetingDebug());
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
  public async targetingDebug() {
    await this.ensureScreeb("targetingDebug");

    return _Screeb.targetingDebug();
  }

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
   *
   * @example
   * ```ts
   * this.screeb.init(
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
   *     version: "1.0.0",
   *     onReady: (payload) => console.log("Screeb SDK is ready!", payload),
   *   },
   * );
   * ```
   */
  public async init(
    websiteId: string,
    userId?: string,
    userProperties?: _Screeb.PropertyRecord,
    hooks?: _Screeb.Hooks
  ) {
    await this.ensureScreeb("init", true);

    this.isInitialized = true;

    return await _Screeb.init(websiteId, userId, userProperties, hooks);
  }

  /**
   * Appends Screeb tag into your dom.
   *
   * @param options Screeb module options.
   * @param options.window If you're running Screeb tag in an iframe, please set the inner window here.
   * @param options.screebEndpoint Please don't do this.
   *
   * @example
   * ```ts
   * this.screeb.load();
   * ```
   */
  public async load() {
    return _Screeb.load();
  }
}
