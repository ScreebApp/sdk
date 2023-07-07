import "@angular/compiler";

import "zone.js";

import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import "./style.css";

import { ScreebModule } from "@screeb/sdk-angular";
import { AppComponent } from "./app.component";
import { appRouting } from "./app.routing";

bootstrapApplication(AppComponent, {
  providers: [
    ...appRouting,
    importProvidersFrom(
      ScreebModule.forRoot({
        autoInit: true,
        hooks: {
          onReady: (payload) => {
            // eslint-disable-next-line no-console
            console.log("SDK is ready", payload);
          },
        },
        userId: "dev@screeb.app",
        userProperties: {
          authenticated: true,
          firstname: "John",
          last_seen_at: new Date(),
          lastname: "Smith",
          org_size: 20,
        },
        websiteId: "0e2b609a-8dce-4695-a80f-966fbfa87a88",
      })
    ),
  ],
});
