# `@screeb/sdk-ionic-example`

Screeb's example app for Ionic (Angular + Capacitor).

> Documentation: [developers.screeb.app/sdk-js/sdk-ionic](https://developers.screeb.app/sdk-js/sdk-ionic)

## Get started

### Before getting started

This package requires the installation of the whole mono-repository.

See [getting started guide](../../README.md#get-started) for more information.

### Getting set up

```bash
npm start
```

Then go to [http://localhost:5173/](http://localhost:5173/)

## Features demonstrated

- **Initialization** — `ScreebModule.forRoot()` in `main.ts` with channel ID, user ID and properties
- **Event tracking** — `eventTrack()` on page view and button click
- **Identity properties** — `identityProperties()` to update visitor attributes
- **Group assignment** — `identityGroupAssign()` to segment users into cohorts
- **Programmatic survey** — `surveyStart()` triggered from a button
- **Identity reset** — `identityReset()` on logout
- **Multi-page navigation** — two Ionic pages (Home + Profile) to show tracking across routes

## Running on a real device (Capacitor)

To run this example as a native iOS/Android app with Capacitor:

```bash
# Build the web app
npm run build

# Add platforms
npx cap add android
npx cap add ios

# Sync and open
npx cap sync
npx cap open android   # or ios
```

## License

Released under [MIT License](../../LICENSE).
