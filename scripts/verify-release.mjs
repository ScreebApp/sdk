#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir, platform } from "node:os";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const androidRoot = resolve(root, "../sdk-android");
const iosRoot = resolve(root, "../sdk-ios");
const isMac = platform() === "darwin";

function envWithTooling(extra = {}) {
  const env = { ...process.env, SCREEB_USE_LOCAL_SDK: "true", ...extra };
  if (!env.SCREEB_LOCAL_MAVEN_REPOSITORY) {
    env.SCREEB_LOCAL_MAVEN_REPOSITORY = resolve(homedir(), ".m2/repository");
  }
  return env;
}

function defaultIosTestDestination() {
  if (process.env.SCREEB_IOS_TEST_DESTINATION) {
    return process.env.SCREEB_IOS_TEST_DESTINATION;
  }

  const result = spawnSync("xcrun simctl list devices available --json", {
    shell: true,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    return "platform=iOS Simulator,name=iPhone 17 Pro,OS=latest";
  }

  const devices = JSON.parse(result.stdout);
  for (const [runtime, runtimeDevices] of Object.entries(devices.devices ?? {})) {
    if (!runtime.includes("iOS")) {
      continue;
    }
    const device = runtimeDevices.find((candidate) => candidate.isAvailable && candidate.name.startsWith("iPhone"));
    if (!device) {
      continue;
    }
    const os = runtime.match(/iOS-(\d+-\d+)/)?.[1]?.replace("-", ".");
    return `platform=iOS Simulator,name=${device.name}${os ? `,OS=${os}` : ""}`;
  }

  return "platform=iOS Simulator,name=iPhone 17 Pro,OS=latest";
}

const checks = [
  {
    scope: "versions",
    label: "version manifest is synced",
    cwd: root,
    command: "npm run versions:check",
  },
  {
    scope: "android",
    label: "Android SDK release gates",
    cwd: androidRoot,
    command: "./gradlew :sdk:testDebugUnitTest :sdk:lintRelease :sdk:assembleRelease --no-daemon",
    skip: () => !existsSync(resolve(androidRoot, "settings.gradle")) && !existsSync(resolve(androidRoot, "settings.gradle.kts")),
    reason: "sdk-android checkout not found next to sdk",
  },
  {
    scope: "flutter",
    label: "Flutter wrapper analyze/tests",
    cwd: resolve(root, "packages/sdk-flutter"),
    command: "flutter analyze && flutter test",
  },
  {
    scope: "react-native",
    label: "React Native wrapper build/typecheck",
    cwd: root,
    command: "npm run build --workspace=@screeb/react-native && npm run typecheck --workspace=@screeb/react-native",
  },
  {
    scope: "kmp",
    label: "KMP wrapper tests with local native SDKs",
    cwd: resolve(root, "packages/sdk-kmp"),
    command: "./gradlew allTests --no-daemon",
  },
  {
    scope: "maui",
    label: "MAUI unit tests",
    cwd: root,
    command: "dotnet test packages/sdk-maui/tests/ScreebUtilsTests.csproj",
  },
  {
    scope: "maui",
    label: "MAUI Android release build",
    cwd: root,
    command: "dotnet build packages/sdk-maui/ScreebMaui.csproj -f net9.0-android -c Release",
  },
  {
    scope: "maui-ios",
    label: "MAUI iOS release build",
    cwd: root,
    command: "dotnet build packages/sdk-maui/ScreebMaui.csproj -f net9.0-ios -c Release",
    skip: () => !isMac,
    reason: "iOS build requires macOS/Xcode",
  },
  {
    scope: "ios",
    label: "iOS SDK tests",
    cwd: iosRoot,
    command: () => `xcodebuild test -scheme Screeb-Package -destination '${defaultIosTestDestination()}' -quiet`,
    skip: () => !isMac || !existsSync(resolve(iosRoot, "Package.swift")),
    reason: "sdk-ios checkout or macOS/Xcode toolchain not available",
  },
];

function parseArgs() {
  const scopes = new Set();
  let listOnly = false;

  for (const arg of process.argv.slice(2)) {
    if (arg === "--list") {
      listOnly = true;
    } else if (arg.startsWith("--scope=")) {
      for (const scope of arg.slice("--scope=".length).split(",")) {
        if (scope) scopes.add(scope);
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return { listOnly, scopes };
}

function selectedChecks(scopes) {
  if (scopes.size === 0) {
    return checks;
  }
  return checks.filter((check) => scopes.has(check.scope));
}

function printMatrix(items) {
  console.log("Release validation matrix");
  for (const check of items) {
    const status = check.skip?.() ? `skip: ${check.reason}` : "run";
    const command = typeof check.command === "function" ? check.command() : check.command;
    console.log(`- [${check.scope}] ${check.label}: ${status}`);
    console.log(`  ${relative(root, check.cwd) || "."} $ ${command}`);
  }
}

function run(check) {
  if (check.skip?.()) {
    console.log(`\n- SKIP ${check.label}: ${check.reason}`);
    return;
  }

  console.log(`\n- RUN ${check.label}`);
  console.log(`  cwd: ${relative(root, check.cwd) || "."}`);
  const command = typeof check.command === "function" ? check.command() : check.command;
  console.log(`  $ ${command}`);

  const result = spawnSync(command, {
    cwd: check.cwd,
    env: envWithTooling(),
    shell: true,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`${check.label} failed with exit code ${result.status}`);
  }
}

const { listOnly, scopes } = parseArgs();
const items = selectedChecks(scopes);
if (items.length === 0) {
  throw new Error(`No checks matched scopes: ${[...scopes].join(", ")}`);
}

printMatrix(items);

if (!listOnly) {
  for (const check of items) {
    run(check);
  }
  console.log("\nRelease validation passed.");
}
