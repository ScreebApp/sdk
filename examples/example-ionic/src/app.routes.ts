import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    loadComponent: () => import("./home.page").then((c) => c.HomePage),
    path: "",
  },
  {
    loadComponent: () => import("./profile.page").then((c) => c.ProfilePage),
    path: "profile",
  },
];
