import { Route, provideRouter } from "@angular/router";

const routes: Route[] = [
  {
    loadComponent: () =>
      import("./home.component").then((c) => c.HomeComponent),
    path: "",
  },
];

export const appRouting = [provideRouter(routes)];
