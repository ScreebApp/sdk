import { Injectable } from "@angular/core";
import { Hooks, PropertyRecord, ScreebOptions } from "@screeb/sdk-browser";

/** Configuration of Screeb module */
@Injectable({ providedIn: "root" })
export class ScreebConfig {
  /** Your website/channel id. */
  websiteId?: string;
  /** The unique identifier of your user. */
  userId?: string;
  /** The properties of your user. */
  userProperties?: PropertyRecord;
  /** Hooks to define callback for various event */
  hooks?: Hooks;
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
}
