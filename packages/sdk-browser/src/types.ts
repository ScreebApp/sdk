/** This is property types that are supported by Screeb. */
export type PropertyType = number | boolean | string | Date | PropertyRecord;

/** This is a property object that are supported by Screeb. */
export type PropertyRecord = {
  [key: string]: PropertyType | PropertyType[];
};

/**
 * Custom collector URLs used to bypass AdBlockers by routing Screeb traffic
 * through your own domain (reverse proxy).
 *
 * Every key is optional: any omitted endpoint falls back to Screeb's default
 * URL. All endpoints must use `https://` (or `wss://` for the WebSocket one),
 * and the domains must be allow-listed in Screeb Admin → Settings → Custom Domains.
 *
 * @see https://developers.screeb.app/sdk-js/custom-collector-url
 */
export type ScreebEndpoints = {
  /** REST API (surveys, tracking). Default: `https://rpc.screeb.app/rpc`. */
  rpc?: string;
  /** Static assets (images, fonts). Default: `https://static.screeb.app`. */
  static?: string;
  /** Response reporting. Default: `https://r.screeb.app/rpc`. */
  report?: string;
  /** Hosted survey page. Default: `https://survey.screeb.app`. */
  hostedPage?: string;
  /** WebSocket (real-time targeting). Default: `wss://centipede.screeb.app`. */
  centipede?: string;
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

  /**
   * Override Screeb's collector URLs to route traffic through your own domain
   * (custom domains / AdBlocker bypass). Only the endpoints you provide are
   * overridden; the rest fall back to Screeb's defaults.
   *
   * @see https://developers.screeb.app/sdk-js/custom-collector-url
   */
  endpoints?: ScreebEndpoints;

  /** @hidden Use a specific platform */
  platform?: string;
};

/**
 * Host-provided navigation handler for the `in-page-spa` "Navigate to URL"
 * target. It runs in your page (where your SPA router lives) instead of the tag
 * doing a `history.pushState` + `popstate` dispatch itself. Provide this when
 * your router does not resync on `popstate` (most React Router / Vue Router /
 * Angular Router setups do, so this is only needed for custom routers). May be
 * async so `onButtonNavigateCompleted` can await the route change.
 */
// eslint-disable-next-line no-unused-vars
export type SpaNavigationHandler = (url: string) => void | Promise<void>;

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
