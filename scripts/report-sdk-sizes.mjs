#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const versions = JSON.parse(readFileSync(resolve(root, "sdk-versions.json"), "utf8"));
const androidVersion = process.env.SCREEB_ANDROID_SDK_VERSION || versions.native.android;
const mavenRepo = process.env.SCREEB_LOCAL_MAVEN_REPOSITORY || resolve(homedir(), ".m2/repository");
const shouldBuild = !process.argv.includes("--no-build");

const npmSdks = [
  "packages/sdk-browser",
  "packages/sdk-react",
  "packages/sdk-vue",
  "packages/sdk-svelte",
  "packages/sdk-angular",
  "packages/sdk-reactnative",
];

function envWithTooling(extra = {}) {
  const env = { ...process.env, SCREEB_USE_LOCAL_SDK: "true", ...extra };
  env.GRADLE_OPTS = `${env.GRADLE_OPTS || ""} -Dorg.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g -Dkotlin.compiler.execution.strategy=in-process -Dkotlin.incremental=false`.trim();
  env.KOTLIN_DAEMON_JVMARGS = env.KOTLIN_DAEMON_JVMARGS || "-Xmx2g -XX:MaxMetaspaceSize=1g";
  return env;
}

function run(command, cwd, options = {}) {
  console.log(`\n$ ${command}\n  cwd: ${relative(root, cwd) || "."}`);
  const result = spawnSync(command, {
    cwd,
    env: envWithTooling(options.env),
    shell: true,
    stdio: options.capture ? "pipe" : "inherit",
    encoding: options.capture ? "utf8" : undefined,
  });
  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
    throw new Error(output || `Command failed: ${command}`);
  }
  return result.stdout;
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function walkFiles(path, options = {}) {
  if (!existsSync(path)) {
    return [];
  }
  const files = [];
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    const relativeChild = relative(path, child);
    if (options.excludeNames?.has(entry.name)) {
      continue;
    }
    if (entry.isDirectory()) {
      files.push(...walkFiles(child, options));
      continue;
    }
    if (!options.match || options.match(child, relativeChild)) {
      files.push(child);
    }
  }
  return files;
}

function totalSize(files) {
  return files.reduce((total, file) => total + statSync(file).size, 0);
}

function printSize(label, bytes, suffix = "") {
  console.log(`${label}: ${formatBytes(bytes)} (${bytes} bytes)${suffix}`);
}

function npmPackSize(packagePath) {
  const output = run("npm pack --dry-run --json --ignore-scripts", resolve(root, packagePath), { capture: true });
  const [pack] = JSON.parse(output.trim());
  return {
    packageSize: pack.size,
    unpackedSize: pack.unpackedSize,
    entryCount: pack.entryCount,
  };
}

function buildAll() {
  for (const packagePath of npmSdks) {
    run("npm run build", resolve(root, packagePath));
  }

  run("./gradlew build --no-daemon", resolve(root, "packages/sdk-kmp"));
  run("flutter pub get", resolve(root, "packages/sdk-flutter"));
  run("dotnet build packages/sdk-maui/ScreebMaui.csproj -f net9.0-android -c Release", root);
  run("dotnet build packages/sdk-maui/ScreebMaui.csproj -f net9.0-ios -c Release", root);
}

function reportNativeAndroid() {
  const aar = resolve(mavenRepo, `app/screeb/sdk/survey/${androidVersion}/survey-${androidVersion}.aar`);
  if (!existsSync(aar)) {
    console.log(`Android native AAR ${androidVersion}: missing (${aar})`);
    return;
  }
  printSize(`Android native AAR ${androidVersion}`, statSync(aar).size);
}

function reportNpmSdks() {
  for (const packagePath of npmSdks) {
    const packageJson = JSON.parse(readFileSync(resolve(root, packagePath, "package.json"), "utf8"));
    const size = npmPackSize(packagePath);
    printSize(
      `${packageJson.name} npm tarball`,
      size.packageSize,
      `, unpacked ${formatBytes(size.unpackedSize)}, ${size.entryCount} files`
    );
  }
}

function reportFlutter() {
  const packagePath = resolve(root, "packages/sdk-flutter");
  const files = walkFiles(packagePath, {
    excludeNames: new Set([".dart_tool", ".gradle", "build", ".git"]),
    match: (path) => {
      const rel = relative(packagePath, path);
      return !rel.startsWith("example/") && !rel.includes("/build/");
    },
  });
  printSize("plugin_screeb Flutter package source", totalSize(files), `, ${files.length} files`);
}

function reportKmp() {
  const libs = resolve(root, "packages/sdk-kmp/build/libs");
  const files = walkFiles(libs, {
    match: (path) => /\.(jar|klib)$/.test(path),
  });
  if (files.length === 0) {
    console.log(`Screeb KMP Maven artifacts: missing (${libs})`);
    return;
  }
  printSize("Screeb KMP Maven artifacts", totalSize(files), `, ${files.length} files`);
}

function reportMaui() {
  const packages = walkFiles(resolve(root, "packages/sdk-maui/bin/packages"), {
    match: (path) => path.endsWith(".nupkg"),
  });
  if (packages.length > 0) {
    for (const file of packages) {
      printSize(`Screeb.Maui NuGet ${basename(file)}`, statSync(file).size);
    }
    return;
  }

  const dlls = walkFiles(resolve(root, "packages/sdk-maui/bin/Release"), {
    match: (path) => /Screeb\.Maui\.dll$/.test(path),
  });
  if (dlls.length === 0) {
    console.log("Screeb.Maui: no NuGet package or DLL build output found");
    return;
  }
  for (const file of dlls) {
    printSize(`Screeb.Maui ${relative(root, file)}`, statSync(file).size);
  }
}

function reportNativeIos() {
  const xcframework = resolve(root, "packages/sdk-kmp/native/ios/Screeb.xcframework");
  const files = walkFiles(xcframework, {
    match: (path) => !path.endsWith(".abi.json"),
  });
  if (files.length === 0) {
    console.log(`iOS native xcframework: missing (${xcframework})`);
    return;
  }
  printSize("iOS native xcframework (all slices)", totalSize(files), `, ${files.length} files`);

  const deviceSlice = resolve(xcframework, "ios-arm64/Screeb.framework");
  const deviceFiles = walkFiles(deviceSlice, {
    match: (path) => !path.endsWith(".abi.json"),
  });
  if (deviceFiles.length > 0) {
    printSize("iOS native app embed estimate (device slice)", totalSize(deviceFiles), `, ${deviceFiles.length} files`);
  }
}

if (shouldBuild) {
  buildAll();
}

console.log("\nSDK sizes");
reportNativeAndroid();
reportNativeIos();
reportNpmSdks();
reportFlutter();
reportKmp();
reportMaui();
