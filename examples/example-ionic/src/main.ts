import "@angular/compiler";
import "zone.js";

import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from "@ionic/angular/standalone";
import { ScreebModule } from "@screeb/sdk-angular";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";

/* Ionic CSS */
import "./style.css";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    importProvidersFrom(
      ScreebModule.forRoot({
        autoInit: true,
        hooks: {
          onReady: (payload) => {
            // eslint-disable-next-line no-console
            console.log("Screeb ready", payload);
          },
          version: "1.0.0",
        },
        userId: "dev@screeb.app", // optional — remove for anonymous sessions
        userProperties: {
          // optional
          authenticated: true,
          firstname: "John",
          last_seen_at: new Date(),
          lastname: "Smith",
          plan: "growth",
        },
        websiteId: "0e2b609a-8dce-4695-a80f-966fbfa87a88",
      }),
    ),
    provideRouter(routes),
  ],
});
