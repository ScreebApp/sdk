#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(root, "sdk-versions.json");
const semverPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;

function readManifest() {
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function setByPath(object, dottedPath, value) {
  const parts = dottedPath.split(".");
  let current = object;
  for (const part of parts.slice(0, -1)) {
    if (!current[part] || typeof current[part] !== "object") {
      throw new Error(`Unknown version path: ${dottedPath}`);
    }
    current = current[part];
  }
  const leaf = parts.at(-1);
  if (!leaf || !(leaf in current)) {
    throw new Error(`Unknown version path: ${dottedPath}`);
  }
  current[leaf] = value;
}

function replaceInFile(file, pattern, replacement) {
  const path = resolve(root, file);
  const before = readFileSync(path, "utf8");
  if (!pattern.test(before)) {
    throw new Error(`No version match found in ${file}`);
  }
  const after = before.replace(pattern, replacement);
  writeIfNeeded(file, before, after);
  if (!check && after !== before) {
    console.log(`${file}`);
  }
}

function replacePackageVersion(file, version) {
  const path = resolve(root, file);
  const before = readFileSync(path, "utf8");
  const json = JSON.parse(before);
  json.version = version;
  const after = `${JSON.stringify(json, null, 2)}\n`;
  writeIfNeeded(file, before, after);
  if (!check && after !== before) {
    console.log(`${file}`);
  }
}

function parseArgs(args) {
  const sets = [];
  let check = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--check") {
      check = true;
      continue;
    }
    if (arg === "--set") {
      const path = args[index + 1];
      const version = args[index + 2];
      if (!path || !version) {
        throw new Error("Usage: node scripts/sync-sdk-versions.mjs --set <path> <version>");
      }
      sets.push([path, version]);
      index += 2;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return { check, sets };
}

const { check, sets } = parseArgs(process.argv.slice(2));
const manifest = readManifest();
const changedFiles = [];

function writeIfNeeded(file, before, after) {
  if (after === before) {
    return;
  }
  if (check) {
    changedFiles.push(file);
    return;
  }
  writeFileSync(resolve(root, file), after);
}

for (const [path, version] of sets) {
  if (!semverPattern.test(version)) {
    throw new Error(`Invalid semantic version for ${path}: ${version}`);
  }
  setByPath(manifest, path, version);
}

if (sets.length > 0 && !check) {
  writeJson(manifestPath, manifest);
  console.log("sdk-versions.json");
}

const androidVersion = manifest.native.android;
const iosVersion = manifest.native.ios;
const flutterVersion = manifest.wrappers.flutter;
const kmpVersion = manifest.wrappers.kmp;
const mauiVersion = manifest.wrappers.maui;
const reactNativeVersion = manifest.wrappers.reactNative;
const svelteVersion = manifest.wrappers.svelte;

replacePackageVersion("packages/sdk-reactnative/package.json", reactNativeVersion);
replacePackageVersion("packages/sdk-svelte/package.json", svelteVersion);
replaceInFile("packages/sdk-flutter/pubspec.yaml", /^version: .+$/m, `version: ${flutterVersion}`);
replaceInFile("packages/sdk-flutter/android/build.gradle", /^version '.+'$/m, `version '${flutterVersion}'`);
replaceInFile("packages/sdk-flutter/android/build.gradle", /api "app\.screeb\.sdk:survey:[^"]+"/, `api "app.screeb.sdk:survey:${androidVersion}"`);
replaceInFile("packages/sdk-flutter/ios/plugin_screeb.podspec", /s\.version\s+=\s+'[^']+'/, `s.version          = '${flutterVersion}'`);
replaceInFile("packages/sdk-flutter/ios/plugin_screeb.podspec", /s\.dependency 'Screeb', '[^']+'/, `s.dependency 'Screeb', '${iosVersion}'`);
replaceInFile("packages/sdk-reactnative/android/build.gradle", /api "app\.screeb\.sdk:survey:[^"]+"/, `api "app.screeb.sdk:survey:${androidVersion}"`);
replaceInFile("packages/sdk-reactnative/ScreebReactNative.podspec", /s\.dependency "Screeb", '~> [^']+'/, `s.dependency "Screeb", '~> ${iosVersion}'`);
replaceInFile(
  "packages/sdk-reactnative/android/src/main/java/app/screeb/reactnative/ScreebReactNativeModule.kt",
  /Screeb\.setSecondarySDK\("react-native", "[^"]+"\)/,
  `Screeb.setSecondarySDK("react-native", "${reactNativeVersion}")`,
);
replaceInFile(
  "packages/sdk-reactnative/ios/ScreebReactNative.swift",
  /Screeb\.setSecondarySDK\(name: "react-native", version: "[^"]+"\)/,
  `Screeb.setSecondarySDK(name: "react-native", version: "${reactNativeVersion}")`,
);
replaceInFile(
  "packages/sdk-flutter/android/src/main/kotlin/app/screeb/plugin_screeb/PluginScreebPlugin.kt",
  /Screeb\.setSecondarySDK\("flutter", "[^"]+"\)/,
  `Screeb.setSecondarySDK("flutter", "${flutterVersion}")`,
);
replaceInFile(
  "packages/sdk-flutter/ios/Classes/SwiftPluginScreebPlugin.swift",
  /Screeb\.setSecondarySDK\(name: "flutter", version: "[^"]+"\)/,
  `Screeb.setSecondarySDK(name: "flutter", version: "${flutterVersion}")`,
);
replaceInFile("packages/sdk-kmp/gradle.properties", /^VERSION_NAME=.*$/m, `VERSION_NAME=${kmpVersion}`);
replaceInFile("packages/sdk-kmp/gradle.properties", /^SCREEB_ANDROID_SDK_VERSION=.*$/m, `SCREEB_ANDROID_SDK_VERSION=${androidVersion}`);
replaceInFile("packages/sdk-kmp/gradle.properties", /^SCREEB_IOS_SDK_VERSION=.*$/m, `SCREEB_IOS_SDK_VERSION=${iosVersion}`);
replaceInFile(
  "packages/sdk-kmp/src/commonMain/kotlin/app/screeb/sdk/kmp/SdkVersion.kt",
  /internal const val SDK_VERSION = "[^"]+"/,
  `internal const val SDK_VERSION = "${kmpVersion}"`,
);
replaceInFile(
  "packages/sdk-svelte/src/constants.ts",
  /const CONSTANTS = \{ version: "[^"]+" \};/,
  `const CONSTANTS = { version: "${svelteVersion}" };`,
);
replaceInFile("packages/sdk-maui/ScreebMaui.csproj", /(<Version>)[^<]+(<\/Version>)/, `$1${mauiVersion}$2`);
replaceInFile(
  "packages/sdk-maui/ScreebMaui.csproj",
  /(Include="app\.screeb\.sdk:survey"\s*\n\s*Version=")[^"]+(")/,
  `$1${androidVersion}$2`,
);
// SCREEB_USE_LOCAL_SDK dev path: stale here means binding a previous aar.
replaceInFile(
  "packages/sdk-maui/ScreebMaui.csproj",
  /survey\/[^/"]+\/survey-[^"]+\.aar/,
  `survey/${androidVersion}/survey-${androidVersion}.aar`,
);
replaceInFile("examples/example-android/app/build.gradle", /implementation 'app\.screeb\.sdk:survey:[^']+'/, `implementation 'app.screeb.sdk:survey:${androidVersion}'`);

if (check && changedFiles.length > 0) {
  console.error(`Version files are not synced:\n${changedFiles.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

if (check) {
  console.log("Version files are synced.");
}
