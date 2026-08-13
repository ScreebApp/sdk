#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function run(command, args, cwd) {
  // Clean environment: when invoked from an Xcode build phase (KMP host app),
  // the inherited SDKROOT/ARCHS/TOOLCHAINS poison the nested xcodebuild
  // archive of sdk-ios and break its link step.
  const env = {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    TMPDIR: process.env.TMPDIR,
    DEVELOPER_DIR: process.env.DEVELOPER_DIR,
  };
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function removeFilesMatching(path, matcher) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) {
      removeFilesMatching(child, matcher);
      continue;
    }
    if (entry.isFile() && matcher(child)) {
      unlinkSync(child);
    }
  }
}

const sdkIosPath = resolve(
  argValue("--sdk-ios")
    || process.env.SCREEB_IOS_SDK_PATH
    || resolve(process.env.SCREEB_MONOREPO_PATH || resolve(root, "../screeb"), "sdk-ios"),
);
const output = resolve(argValue("--output") || process.env.SCREEB_IOS_XCFRAMEWORK_PATH || resolve(root, ".local/ios/Screeb.xcframework"));
mkdirSync(dirname(output), { recursive: true }); // mkdtemp requires an existing parent
const workDir = mkdtempSync(resolve(dirname(output), ".build-"));
const derivedDataPath = resolve(workDir, "DerivedData");
const iosArchive = resolve(workDir, "Screeb-iOS.xcarchive");
const simulatorArchive = resolve(workDir, "Screeb-iOS-simulator.xcarchive");

rmSync(output, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
mkdirSync(workDir, { recursive: true });
mkdirSync(dirname(output), { recursive: true });

const archiveSettings = [
  "SKIP_INSTALL=NO",
  "BUILD_LIBRARY_FOR_DISTRIBUTION=YES",
  "DEPLOYMENT_POSTPROCESSING=YES",
  "STRIP_INSTALLED_PRODUCT=YES",
  "COPY_PHASE_STRIP=YES",
  "STRIP_STYLE=non-global",
  "DEBUG_INFORMATION_FORMAT=dwarf-with-dsym",
  // preserve-types-as-written: the public class Screeb shadows the module Screeb,
  // so module-qualified names (Screeb.InitOptions…) in the emitted swiftinterface
  // fail to recompile in Swift host apps consuming the xcframework.
  `OTHER_SWIFT_FLAGS=$(inherited) -debug-prefix-map ${sdkIosPath}=. -Xfrontend -module-interface-preserve-types-as-written`,
];
// SCREEB_TELEMETRY=true adds the SDK's local perf/debug logging (never for
// published builds — this script only produces local test artifacts).
if (process.env.SCREEB_TELEMETRY === "true") {
  archiveSettings.push("SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) SCREEB_TELEMETRY");
}

run("xcodebuild", [
  "archive",
  "-quiet",
  "-project",
  "Screeb.xcodeproj",
  "-scheme",
  "Screeb-Package",
  "-destination",
  "generic/platform=iOS",
  "-sdk",
  "iphoneos",
  "-archivePath",
  iosArchive,
  "-derivedDataPath",
  derivedDataPath,
  ...archiveSettings,
], sdkIosPath);

run("xcodebuild", [
  "archive",
  "-quiet",
  "-project",
  "Screeb.xcodeproj",
  "-scheme",
  "Screeb-Package",
  "-destination",
  "generic/platform=iOS Simulator",
  "-sdk",
  "iphonesimulator",
  "-archivePath",
  simulatorArchive,
  "-derivedDataPath",
  derivedDataPath,
  ...archiveSettings,
], sdkIosPath);

run("xcodebuild", [
  "-create-xcframework",
  "-framework",
  resolve(iosArchive, "Products/Library/Frameworks/Screeb.framework"),
  "-framework",
  resolve(simulatorArchive, "Products/Library/Frameworks/Screeb.framework"),
  "-output",
  output,
], sdkIosPath);

removeFilesMatching(output, (file) => file.endsWith(".abi.json"));

// The archives/DerivedData workdir weighs ~200MB per run — never leave it behind.
rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
