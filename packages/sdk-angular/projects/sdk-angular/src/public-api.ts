/*
 * Public API Surface of @screeb/sdk-angular
 */

export { ScreebModule } from "./lib/screeb.module";
export { ScreebConfig } from "./lib/screeb-config";
export { Screeb } from "./lib/screeb";

// Re-export the underlying browser SDK types (PropertyRecord, ScreebOptions,
// HooksInit, Survey, …) so consumers don't need a direct @screeb/sdk-browser dep.
export type * from "@screeb/sdk-browser";
