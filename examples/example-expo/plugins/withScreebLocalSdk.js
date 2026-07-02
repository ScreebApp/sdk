const fs = require("node:fs");
const path = require("node:path");
const { withDangerousMod, withProjectBuildGradle, withSettingsGradle } = require("expo/config-plugins");

const LOCAL_REPOSITORY = [
  '    if (providers.gradleProperty("SCREEB_USE_LOCAL_SDK").orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK")).orNull == "true") {',
  "      mavenLocal()",
  "    }",
].join("\n");

function addLocalRepository(buildGradle) {
  if (buildGradle.includes("SCREEB_USE_LOCAL_SDK")) {
    return buildGradle;
  }

  const nextBuildGradle = buildGradle.replace(
    /repositories \{\n\s+google\(\)/g,
    `repositories {\n${LOCAL_REPOSITORY}\n    google()`,
  );

  if (!nextBuildGradle.includes("SCREEB_USE_LOCAL_SDK")) {
    throw new Error(
      "Unable to inject Screeb local SDK repository in android/build.gradle. Expo's Gradle template may have changed.",
    );
  }

  return nextBuildGradle;
}

const LOCAL_ANDROID_SDK_BOOTSTRAP = [
  'if (providers.gradleProperty("SCREEB_USE_LOCAL_SDK").orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK")).orNull == "true") {',
  '    def screebAndroidSdkPath = providers.environmentVariable("SCREEB_ANDROID_SDK_PATH")',
  '        .orElse(file("../../../../sdk-android").canonicalPath)',
  "        .get()",
  "    exec {",
  "        workingDir screebAndroidSdkPath",
  '        commandLine "./gradlew", ":sdk:publishReleasePublicationToMavenLocal", "--no-daemon"',
  "    }",
  "}",
].join("\n");

function addLocalAndroidSdkBootstrap(settingsGradle) {
  if (settingsGradle.includes("SCREEB_ANDROID_SDK_PATH")) {
    return settingsGradle;
  }

  return `${settingsGradle}\n\n${LOCAL_ANDROID_SDK_BOOTSTRAP}`;
}

const LOCAL_IOS_POD = [
  '  if ENV["SCREEB_USE_LOCAL_SDK"] == "true"',
  '    screeb_ios_sdk_path = ENV["SCREEB_IOS_SDK_PATH"] || File.expand_path("../../../../sdk-ios", __dir__)',
  '    pod "Screeb", :path => screeb_ios_sdk_path',
  "  end",
].join("\n");

function addLocalIosPod(podfile) {
  if (podfile.includes("SCREEB_IOS_SDK_PATH")) {
    return podfile;
  }

  const nextPodfile = podfile.replace(/target ['"][^'"]+['"] do\n/, (match) => `${match}${LOCAL_IOS_POD}\n\n`);

  if (!nextPodfile.includes("SCREEB_IOS_SDK_PATH")) {
    throw new Error(
      "Unable to inject Screeb local iOS SDK pod in ios/Podfile. Expo's Podfile template may have changed.",
    );
  }

  return nextPodfile;
}

module.exports = function withScreebLocalSdk(config) {
  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addLocalRepository(config.modResults.contents);
    }

    return config;
  });

  config = withSettingsGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addLocalAndroidSdkBootstrap(config.modResults.contents);
    }

    return config;
  });

  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfile = path.join(config.modRequest.platformProjectRoot, "Podfile");
      if (fs.existsSync(podfile)) {
        fs.writeFileSync(podfile, addLocalIosPod(fs.readFileSync(podfile, "utf8")));
      }

      return config;
    },
  ]);
};
