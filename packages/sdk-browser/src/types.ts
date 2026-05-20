/** This is property types that are supported by Screeb. */
export type PropertyType = number | boolean | string | Date | PropertyRecord;

/** This is a property object that are supported by Screeb. */
export type PropertyRecord = {
  [key: string]: PropertyType | PropertyType[];
};

/** This is the Screeb tag options object. */
export type ScreebOptions = {
  /** If you're running Screeb tag in an iframe, please set the inner window here. */
  window?: Window;

  /** SDK name (eg: sdk-browser, sdk-react, sdk-angular, etc...) */
  sdkName?: string;
  /** SDK version (eg: 1.2.3) */
  sdkVersion?: string;

  /** Please don't do this. */
  screebEndpoint?: string;

  /** @hidden Use a specific platform */
  platform?: string;
};

// eslint-disable-next-line no-unused-vars
export type ScreebFunction = (..._: unknown[]) => void | Promise<unknown>;

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
  /** `true` if the tag is loaded, initialized and ready to rock */
  is_ready: boolean;
};
