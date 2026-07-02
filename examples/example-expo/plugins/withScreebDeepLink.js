const { withMainActivity } = require("expo/config-plugins");

/**
 * Forwards incoming deep links to the Screeb SDK from the (Expo-generated) Android MainActivity.
 *
 * Screeb editor / inspector deep links (e.g. `<app-scheme>://editor?token=...` or
 * `screeb-<channel-id>://inspector`) must reach `Screeb.handleDeepLink(intent)`. On bare RN we edit
 * MainActivity directly, but Expo regenerates the native project on every prebuild, so this must be
 * a config plugin. Without it, Expo Router swallows the URL and shows an "Unmatched Route" screen
 * instead of opening the editor.
 */
module.exports = function withScreebDeepLink(config) {
  return withMainActivity(config, (cfg) => {
    if (cfg.modResults.language !== "kt") return cfg;
    let src = cfg.modResults.contents;

    if (!src.includes("import app.screeb.sdk.Screeb")) {
      src = src.replace(
        /^(package .+)$/m,
        "$1\n\nimport android.content.Intent\nimport app.screeb.sdk.Screeb",
      );
    }

    if (!src.includes("Screeb.handleDeepLink")) {
      // Forward the launch intent (cold start via a deep link).
      src = src.replace(
        /(super\.onCreate\([^)]*\))/,
        "$1\n    Screeb.handleDeepLink(intent)",
      );
      // Forward deep links delivered while running (singleTask -> onNewIntent).
      src = src.replace(
        /(class MainActivity : ReactActivity\(\) \{)/,
        "$1\n  override fun onNewIntent(intent: Intent?) {\n" +
          "    super.onNewIntent(intent)\n" +
          "    setIntent(intent)\n" +
          "    Screeb.handleDeepLink(intent)\n" +
          "  }\n",
      );
    }

    cfg.modResults.contents = src;
    return cfg;
  });
};
