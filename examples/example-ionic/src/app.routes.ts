import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./home.page").then((c) => c.HomePage),
  },
  {
    path: "profile",
    loadComponent: () => import("./profile.page").then((c) => c.ProfilePage),
  },
];
