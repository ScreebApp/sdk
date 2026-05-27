#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = resolve(root, process.env.DOCS_PUBLIC_PATH || "../screeb/docs/public");
const checkOnly = process.argv.includes("--check");
const checkCapabilitiesOnly = process.argv.includes("--check-capabilities");

const browserTypeFiles = [
  resolve(root, "packages/sdk-browser/src/types.ts"),
  resolve(root, "packages/sdk-browser/src/hooks.types.ts"),
];

const links = {
  close: "[👉](./install)",
  closeMessage: "[👉](./start-message-programmatically)",
  closeSdk: "[👉](./install)",
  closeSurvey: "-",
  debug: "[👉](./troubleshooting)",
  debugTargeting: "[👉](./troubleshooting)",
  assignGroup: "[👉](./group-assignation)",
  eventTrack: "[👉](./event-tracking)",
  getIdentity: "[👉](./identity)",
  identity: "[👉](./identity)",
  identityGet: "[👉](./identity)",
  identityGroupAssign: "[👉](./group-assignation)",
  identityGroupUnassign: "[👉](./group-assignation)",
  identityProperties: "[👉](./identity)",
  identityReset: "[👉](./identity)",
  init: "[👉](./install)",
  initSdk: "[👉](./install)",
  isLoaded: "[👉](./troubleshooting)",
  load: "[👉](./install)",
  messageClose: "[👉](./start-message-programmatically)",
  messageStart: "[👉](./start-message-programmatically)",
  resetIdentity: "[👉](./identity)",
  ScreebId: "[👉](./privacy-helpers)",
  ScreebMaskText: "[👉](./privacy-helpers)",
  ScreebNoCapture: "[👉](./privacy-helpers)",
  screebId: "[👉](./privacy-helpers)",
  screebMaskText: "[👉](./privacy-helpers)",
  screebNoCapture: "[👉](./privacy-helpers)",
  sessionReplayStart: "[👉](./session-replay)",
  sessionReplayStop: "[👉](./session-replay)",
  setIdentity: "[👉](./identity)",
  setProperty: "[👉](./identity)",
  setProperties: "[👉](./identity)",
  startMessage: "[👉](./start-message-programmatically)",
  startSurvey: "[👉](./start-survey-programmatically)",
  surveyClose: "[👉](./start-survey-programmatically)",
  surveyStart: "[👉](./start-survey-programmatically)",
  targetingDebug: "[👉](./troubleshooting)",
  trackEvent: "[👉](./event-tracking)",
  trackScreen: "[👉](./screen-tracking)",
  unassignGroup: "[👉](./group-assignation)",
};

const methodGroups = [
  {
    title: "Lifecycle",
    names: ["init", "initSdk", "load", "close", "closeSdk"],
  },
  {
    title: "Identity",
    names: [
      "setIdentity",
      "identity",
      "setProperties",
      "setProperty",
      "identityProperties",
      "resetIdentity",
      "identityReset",
      "getIdentity",
      "identityGet",
    ],
  },
  {
    title: "Groups",
    names: ["assignGroup", "identityGroupAssign", "unassignGroup", "identityGroupUnassign"],
  },
  {
    title: "Tracking",
    names: ["trackEvent", "eventTrack", "trackScreen"],
  },
  {
    title: "Surveys",
    names: ["startSurvey", "surveyStart", "closeSurvey", "surveyClose"],
  },
  {
    title: "Messages",
    names: ["startMessage", "messageStart", "closeMessage", "messageClose"],
  },
  {
    title: "Session replay",
    names: ["sessionReplayStart", "sessionReplayStop"],
  },
  {
    title: "Debug",
    names: ["debug", "debugTargeting", "targetingDebug", "isLoaded"],
  },
  {
    title: "Privacy helpers",
    names: ["ScreebMaskText", "ScreebNoCapture", "ScreebId", "screebMaskText", "screebNoCapture", "screebId"],
  },
];

const methodDescriptions = {
  assignGroup: "Assign the current user to a group.",
  close: "Stop the SDK.",
  closeMessage: "Close the currently displayed message.",
  closeSdk: "Stop the SDK.",
  closeSurvey: "Close the currently displayed survey.",
  debug: "Get SDK debug information.",
  debugTargeting: "Get targeting debug information.",
  eventTrack: "Track a custom event.",
  getIdentity: "Get the current visitor identity and properties.",
  identity: "Identify the current user with optional properties.",
  identityGet: "Get the current visitor identity and properties.",
  identityGroupAssign: "Assign the current user to a group.",
  identityGroupUnassign: "Remove the current user from a group.",
  identityProperties: "Send visitor properties without changing the identity.",
  identityReset: "Reset the current visitor identity.",
  init: "Initialize the Screeb SDK.",
  initSdk: "Initialize the Screeb SDK.",
  isLoaded: "Check whether the SDK is loaded.",
  load: "Load the Screeb tag.",
  messageClose: "Close the currently displayed message.",
  messageStart: "Start a specific message programmatically.",
  resetIdentity: "Reset the current visitor identity.",
  ScreebId: "Set a stable Screeb element ID for IAM targeting.",
  ScreebMaskText: "Mask a view or component in session replay.",
  ScreebNoCapture: "Exclude a view or component from session replay capture.",
  screebId: "Set a stable Screeb element ID for IAM targeting.",
  screebMaskText: "Mask a view or component in session replay.",
  screebNoCapture: "Exclude a view or component from session replay capture.",
  sessionReplayStart: "Start session replay recording.",
  sessionReplayStop: "Stop session replay recording.",
  setIdentity: "Identify the current user with optional properties.",
  setProperty: "Deprecated alias for setting visitor properties.",
  setProperties: "Send visitor properties without changing the identity.",
  startMessage: "Start a specific message programmatically.",
  startSurvey: "Start a specific survey programmatically.",
  surveyClose: "Close the currently displayed survey.",
  surveyStart: "Start a specific survey programmatically.",
  targetingDebug: "Get targeting debug information.",
  trackEvent: "Track a custom event.",
  trackScreen: "Track a screen navigation event.",
  unassignGroup: "Remove the current user from a group.",
};

const methodOrder = new Map();
const methodGroupByName = new Map();
methodGroups.forEach((group, groupIndex) => {
  group.names.forEach((name, nameIndex) => {
    methodOrder.set(name, groupIndex * 100 + nameIndex);
    methodGroupByName.set(name, group.title);
  });
});

const capabilityChecks = [
  { label: "Initialize SDK", aliases: ["init", "initSdk"] },
  { label: "Close SDK", aliases: ["close", "closeSdk"] },
  { label: "Set identity", aliases: ["identity", "setIdentity"] },
  { label: "Set properties", aliases: ["identityProperties", "setProperties", "setProperty"] },
  { label: "Reset identity", aliases: ["identityReset", "resetIdentity"] },
  { label: "Get identity", aliases: ["identityGet", "getIdentity"] },
  { label: "Assign group", aliases: ["identityGroupAssign", "assignGroup"] },
  { label: "Unassign group", aliases: ["identityGroupUnassign", "unassignGroup"] },
  { label: "Track event", aliases: ["eventTrack", "trackEvent"] },
  { label: "Track screen", aliases: ["trackScreen"], mobileOnly: true },
  { label: "Start survey", aliases: ["surveyStart", "startSurvey"] },
  { label: "Close survey", aliases: ["surveyClose", "closeSurvey"] },
  { label: "Start message", aliases: ["messageStart", "startMessage"] },
  { label: "Close message", aliases: ["messageClose", "closeMessage"] },
  { label: "Start session replay", aliases: ["sessionReplayStart"] },
  { label: "Stop session replay", aliases: ["sessionReplayStop"] },
  { label: "Debug", aliases: ["debug"] },
  { label: "Debug targeting", aliases: ["debugTargeting", "targetingDebug"] },
  { label: "Privacy mask text", aliases: ["ScreebMaskText", "screebMaskText"] },
  { label: "Privacy no capture", aliases: ["ScreebNoCapture", "screebNoCapture"] },
  { label: "Privacy element ID", aliases: ["ScreebId", "screebId"] },
];

const capabilityReports = [];
const mobileTargetIds = new Set(["sdk-react-native", "sdk-flutter", "sdk-kmp", "sdk-maui"]);

const targets = [
  {
    id: "sdk-browser",
    title: "@screeb/sdk-browser",
    kind: "browser",
    entry: resolve(root, "packages/sdk-browser/src/index.ts"),
    reference: resolve(docsRoot, "docs/sdk-browser/reference.md"),
    sidebarPosition: 11,
  },
  {
    id: "sdk-react",
    title: "@screeb/sdk-react",
    kind: "typed-wrapper",
    source: resolve(root, "packages/sdk-react/src/types.ts"),
    clientType: "ScreebContextValues",
    propsTypes: ["ScreebProps", "ScreebProviderProps"],
    reference: resolve(docsRoot, "docs/sdk-react/reference.md"),
    intro: "Complete reference for `@screeb/sdk-react`.",
    usageTitle: "useScreeb() methods",
    sidebarPosition: 11,
  },
  {
    id: "sdk-vue",
    title: "@screeb/sdk-vue",
    kind: "typed-wrapper",
    source: resolve(root, "packages/sdk-vue/src/types.ts"),
    clientType: "ScreebContextValues",
    propsTypes: ["ScreebConfig"],
    reference: resolve(docsRoot, "docs/sdk-vue/reference.md"),
    intro: "Complete reference for `@screeb/sdk-vue`.",
    usageTitle: "useScreeb() methods",
    sidebarPosition: 12,
  },
  {
    id: "sdk-svelte",
    title: "@screeb/sdk-svelte",
    kind: "typed-wrapper",
    source: resolve(root, "packages/sdk-svelte/src/types.ts"),
    clientType: "ScreebClient",
    propsTypes: ["ScreebConfig"],
    reference: resolve(docsRoot, "docs/sdk-svelte/reference.md"),
    intro: "Complete reference for `@screeb/sdk-svelte`.",
    usageTitle: "useScreeb() methods",
    sidebarPosition: 12,
  },
  {
    id: "sdk-angular",
    title: "@screeb/sdk-angular",
    kind: "angular",
    source: resolve(root, "packages/sdk-angular/projects/sdk-angular/src/lib/screeb.ts"),
    configSource: resolve(root, "packages/sdk-angular/projects/sdk-angular/src/lib/screeb-config.ts"),
    reference: resolve(docsRoot, "docs/sdk-angular/reference.md"),
    intro: "Complete reference for `@screeb/sdk-angular`.",
    sidebarPosition: 11,
  },
  {
    id: "sdk-ionic",
    title: "Ionic SDK",
    kind: "angular",
    source: resolve(root, "packages/sdk-angular/projects/sdk-angular/src/lib/screeb.ts"),
    configSource: resolve(root, "packages/sdk-angular/projects/sdk-angular/src/lib/screeb-config.ts"),
    reference: resolve(docsRoot, "docs/sdk-ionic/reference.md"),
    intro: "Complete reference for the Ionic SDK, which uses `@screeb/sdk-angular` internally.",
    sidebarPosition: 11,
  },
  {
    id: "sdk-react-native",
    title: "@screeb/react-native",
    kind: "ts-functions",
    source: resolve(root, "packages/sdk-reactnative/src/index.tsx"),
    nativeSource: resolve(root, "packages/sdk-reactnative/src/NativeScreebReactNative.ts"),
    reference: resolve(docsRoot, "docs/sdk-react-native/reference.md"),
    intro: "Complete reference for `@screeb/react-native`.",
    usageTitle: "Screeb methods and components",
    sidebarPosition: 14,
  },
  {
    id: "sdk-flutter",
    title: "plugin_screeb",
    kind: "dart",
    source: resolve(root, "packages/sdk-flutter/lib/plugin_screeb.dart"),
    reference: resolve(docsRoot, "docs/sdk-flutter/reference.md"),
    intro: "Complete reference for the Screeb Flutter SDK.",
    usageTitle: "Screeb methods and widgets",
    sidebarPosition: 14,
  },
  {
    id: "sdk-kmp",
    title: "Screeb KMP SDK",
    kind: "kotlin",
    source: resolve(root, "packages/sdk-kmp/src/commonMain/kotlin/app/screeb/sdk/kmp/Screeb.kt"),
    extraSources: [
      resolve(root, "packages/sdk-kmp/src/commonMain/kotlin/app/screeb/sdk/kmp/ScreebHooks.kt"),
      resolve(root, "packages/sdk-kmp/src/commonMain/kotlin/app/screeb/sdk/kmp/ScreebInitOptions.kt"),
      resolve(root, "packages/sdk-kmp/src/androidMain/kotlin/app/screeb/sdk/kmp/ScreebView.android.kt"),
      resolve(root, "packages/sdk-kmp/src/iosMain/kotlin/app/screeb/sdk/kmp/ScreebView.ios.kt"),
    ],
    reference: resolve(docsRoot, "docs/sdk-kmp/reference.md"),
    intro: "Complete reference for the Screeb Kotlin Multiplatform SDK.",
    usageTitle: "Screeb methods",
    sidebarPosition: 14,
  },
  {
    id: "sdk-maui",
    title: "Screeb.Maui",
    kind: "csharp",
    source: resolve(root, "packages/sdk-maui/Screeb.cs"),
    extraSources: [
      resolve(root, "packages/sdk-maui/ScreebHooks.cs"),
      resolve(root, "packages/sdk-maui/ScreebInitOptions.cs"),
      resolve(root, "packages/sdk-maui/ScreebViewExtensions.cs"),
    ],
    reference: resolve(docsRoot, "docs/sdk-maui/reference.md"),
    intro: "Complete reference for the Screeb .NET MAUI SDK.",
    usageTitle: "Screeb methods and extension helpers",
    sidebarPosition: 14,
  },
];

function sourceFile(file) {
  return ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
}

function hasExportModifier(node) {
  return node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}

function stripComments(text) {
  return text
    .replace(/\/\*\*[\s\S]*?\*\/\n?/g, "")
    .replace(/^\s*\/\/ eslint-disable-next-line.*\n/gm, "")
    .trim();
}

function normalizeTypeText(text) {
  return stripComments(text)
    .replace(/^export\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function nodeName(node) {
  if (ts.isClassDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
    return node.name?.text;
  }
  if (ts.isVariableStatement(node)) {
    const [declaration] = node.declarationList.declarations;
    return declaration?.name && ts.isIdentifier(declaration.name) ? declaration.name.text : undefined;
  }
  return undefined;
}

function jsDocSummary(node) {
  const comment = node.jsDoc?.[0]?.comment;
  if (typeof comment !== "string") {
    return "";
  }

  const [summary] = comment.replace(/\s+/g, " ").trim().split(/\.(?:\s|$)/);
  return summary ? `${summary}.` : "";
}

function exportedTypes(filePaths) {
  const exported = [];

  for (const filePath of filePaths) {
    const file = sourceFile(filePath);
    for (const statement of file.statements) {
      if (
        (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) &&
        hasExportModifier(statement)
      ) {
        exported.push({
          description: jsDocSummary(statement),
          name: nodeName(statement),
          text: normalizeTypeText(statement.getFullText(file)),
        });
      }
    }
  }

  return exported;
}

function namedTypes(filePath, names) {
  const wanted = new Set(names);
  const types = [];
  const file = sourceFile(filePath);

  for (const statement of file.statements) {
    if (
      (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) &&
      statement.name &&
      wanted.has(statement.name.text)
    ) {
      types.push({
        description: jsDocSummary(statement),
        name: nodeName(statement),
        text: normalizeTypeText(statement.getFullText(file)),
      });
    }
  }

  return types;
}

function inferTypeFromInitializer(initializer) {
  if (!initializer) {
    return undefined;
  }
  if (initializer.kind === ts.SyntaxKind.TrueKeyword || initializer.kind === ts.SyntaxKind.FalseKeyword) {
    return "boolean";
  }
  if (ts.isStringLiteral(initializer)) {
    return "string";
  }
  if (ts.isNumericLiteral(initializer)) {
    return "number";
  }
  if (ts.isArrayLiteralExpression(initializer)) {
    return "unknown[]";
  }
  if (ts.isObjectLiteralExpression(initializer)) {
    return "Record<string, unknown>";
  }
  return undefined;
}

function parameterSignature(parameter, printer, file) {
  const name = parameter.name.getText(file);
  const isOptional = Boolean(parameter.questionToken || parameter.initializer);
  const type = parameter.type
    ? printer.printNode(ts.EmitHint.Unspecified, parameter.type, file)
    : inferTypeFromInitializer(parameter.initializer) || "unknown";
  return `${name}${isOptional ? "?" : ""}: ${type.replace(/_Screeb\./g, "")}`;
}

function callableSignature(name, declaration, printer, file) {
  const typeParameters = declaration.typeParameters?.length
    ? `<${declaration.typeParameters
        .map((parameter) => printer.printNode(ts.EmitHint.Unspecified, parameter, file))
        .join(", ")}>`
    : "";
  const params = declaration.parameters.map((parameter) => parameterSignature(parameter, printer, file));
  const returnType = declaration.type
    ? `: ${printer.printNode(ts.EmitHint.Unspecified, declaration.type, file).replace(/_Screeb\./g, "")}`
    : "";
  return `${name}${typeParameters}(${params.join(", ")})${returnType}`;
}

function callableSignatureWithFallback(name, declaration, printer, file, returnTypesByName = new Map()) {
  const signature = callableSignature(name, declaration, printer, file);
  if (declaration.type || !returnTypesByName.has(name)) {
    return signature;
  }
  return `${signature}: ${returnTypesByName.get(name)}`;
}

function exportedConstMethods(filePath, options = {}) {
  const file = sourceFile(filePath);
  const printer = ts.createPrinter({ removeComments: true });
  const methods = [];

  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement) || !hasExportModifier(statement)) {
      continue;
    }

    const [declaration] = statement.declarationList.declarations;
    if (!declaration?.initializer || !ts.isIdentifier(declaration.name)) {
      continue;
    }

    const initializer = declaration.initializer;
    if (!ts.isArrowFunction(initializer) && !ts.isFunctionExpression(initializer)) {
      continue;
    }

    methods.push({
      description: jsDocSummary(statement),
      name: declaration.name.text,
      signature: callableSignatureWithFallback(
        declaration.name.text,
        initializer,
        printer,
        file,
        options.returnTypesByName,
      ),
    });
  }

  return methods;
}

function exportedFunctionMethods(filePath, options = {}) {
  const file = sourceFile(filePath);
  const printer = ts.createPrinter({ removeComments: true });
  const methods = exportedConstMethods(filePath, options);

  for (const statement of file.statements) {
    if (!ts.isFunctionDeclaration(statement) || !hasExportModifier(statement) || !statement.name) {
      continue;
    }
    methods.push({
      description: jsDocSummary(statement),
      name: statement.name.text,
      signature: callableSignatureWithFallback(
        statement.name.text,
        statement,
        printer,
        file,
        options.returnTypesByName,
      ),
    });
  }

  return methods;
}

function interfaceMethodReturnTypes(filePath, interfaceName) {
  const file = sourceFile(filePath);
  const printer = ts.createPrinter({ removeComments: true });
  const returnTypes = new Map();

  for (const statement of file.statements) {
    if (!ts.isInterfaceDeclaration(statement) || statement.name.text !== interfaceName) {
      continue;
    }

    for (const member of statement.members) {
      if (!ts.isMethodSignature(member) || !member.name || !ts.isIdentifier(member.name) || !member.type) {
        continue;
      }
      returnTypes.set(member.name.text, printer.printNode(ts.EmitHint.Unspecified, member.type, file));
    }
  }

  return returnTypes;
}

function publicClassMethods(filePath) {
  const file = sourceFile(filePath);
  const printer = ts.createPrinter({ removeComments: true });
  const methods = [];

  for (const statement of file.statements) {
    if (!ts.isClassDeclaration(statement)) {
      continue;
    }
    for (const member of statement.members) {
      if (!ts.isMethodDeclaration(member) || !member.name || !ts.isIdentifier(member.name)) {
        continue;
      }
      if (member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword)) {
        continue;
      }
      methods.push({
        description: jsDocSummary(member),
        name: member.name.text,
        signature: callableSignature(member.name.text, member, printer, file),
      });
    }
  }

  return methods;
}

function typeAliasesByName(filePath) {
  const aliases = new Map();
  for (const type of exportedTypes([filePath])) {
    aliases.set(type.name, type);
  }
  return aliases;
}

function literalTypeProperties(typeText) {
  const file = ts.createSourceFile("inline.ts", `export ${typeText}`, ts.ScriptTarget.Latest, true);
  const statement = file.statements[0];
  if (!statement || !ts.isTypeAliasDeclaration(statement)) {
    return [];
  }

  const collectMembers = (node) => {
    if (ts.isTypeLiteralNode(node)) {
      return node.members;
    }
    if (ts.isIntersectionTypeNode(node)) {
      return node.types.flatMap(collectMembers);
    }
    return [];
  };

  return collectMembers(statement.type)
    .filter(ts.isPropertySignature)
    .map((member) => ({
      name: member.name.getText(file).replace(/^["']|["']$/g, ""),
      optional: Boolean(member.questionToken),
      type: member.type?.getText(file).replace(/_Screeb\./g, "") || "unknown",
    }));
}

function methodsFromClientType(sourcePath, clientTypeName) {
  const aliases = typeAliasesByName(sourcePath);
  const clientType = aliases.get(clientTypeName);
  if (!clientType) {
    throw new Error(`Could not find ${clientTypeName} in ${sourcePath}`);
  }

  return literalTypeProperties(clientType.text).map((property) => {
    const functionType = aliases.get(property.type);
    const signature = functionType
      ? `${property.name}${cleanFunctionType(functionType.text)}`
      : `${property.name}: ${property.type}`;
    return {
      description: functionType?.description || "",
      name: property.name,
      signature,
    };
  });
}

function cleanFunctionType(typeText) {
  return typeText
    .replace(/^type\s+\w+\s*=\s*/, "")
    .replace(/;\s*$/, "")
    .trim();
}

function propsFromTypes(sourcePath, typeNames) {
  const aliases = typeAliasesByName(sourcePath);
  return typeNames.flatMap((typeName) => {
    const type = aliases.get(typeName);
    return type ? literalTypeProperties(type.text) : [];
  });
}

function classProperties(filePath, className) {
  const file = sourceFile(filePath);
  const printer = ts.createPrinter({ removeComments: true });
  const properties = [];

  for (const statement of file.statements) {
    if (!ts.isClassDeclaration(statement) || statement.name?.text !== className) {
      continue;
    }
    for (const member of statement.members) {
      if (!ts.isPropertyDeclaration(member) || !member.name) {
        continue;
      }
      properties.push({
        description: jsDocSummary(member),
        name: member.name.getText(file),
        optional: Boolean(member.questionToken),
        type: member.type ? printer.printNode(ts.EmitHint.Unspecified, member.type, file) : "unknown",
      });
    }
  }

  return properties;
}

function hookTypes(types) {
  return types.filter((type) => type.name?.startsWith("HookOn"));
}

function methodKey(name) {
  if (!name) return "";
  return `${name[0].toLowerCase()}${name.slice(1)}`;
}

function methodRank(method) {
  const key = methodKey(method.name);
  return methodOrder.get(method.name) ?? methodOrder.get(key) ?? 10000;
}

function methodGroup(method) {
  const key = methodKey(method.name);
  return methodGroupByName.get(method.name) ?? methodGroupByName.get(key) ?? "Other";
}

function normalizeMethod(method) {
  const key = methodKey(method.name);
  return {
    ...method,
    description: method.description && method.description !== "-" ? method.description : methodDescriptions[method.name] || methodDescriptions[key] || "-",
  };
}

function sortMethods(methods) {
  return methods
    .map(normalizeMethod)
    .sort((left, right) => methodRank(left) - methodRank(right) || left.name.localeCompare(right.name));
}

function reportCapabilities(target, methods) {
  const methodNames = new Set(methods.map((method) => methodKey(method.name)));
  const missing = capabilityChecks
    .filter((capability) => !capability.mobileOnly || mobileTargetIds.has(target.id))
    .filter((capability) => !capability.aliases.some((alias) => methodNames.has(methodKey(alias))))
    .map((capability) => capability.label);

  capabilityReports.push({
    missing,
    target: target.id,
  });
}

function printCapabilityReport() {
  console.log("\nCapability coverage:");
  for (const report of capabilityReports) {
    if (report.missing.length === 0) {
      console.log(`- ${report.target}: complete`);
      continue;
    }
    console.log(`- ${report.target}: missing ${report.missing.join(", ")}`);
  }
}

function methodsByGroup(methods) {
  const sorted = sortMethods(methods);
  const byGroup = new Map();
  for (const method of sorted) {
    const group = methodGroup(method);
    byGroup.set(group, [...(byGroup.get(group) || []), method]);
  }

  const orderedGroups = methodGroups.map((group) => group.title).filter((group) => byGroup.has(group));
  if (byGroup.has("Other")) {
    orderedGroups.push("Other");
  }

  return orderedGroups.map((group) => ({ title: group, methods: byGroup.get(group) }));
}

function methodsTable(methods) {
  return [
    "| Method | Description | More |",
    "|---|---|---|",
    ...methods.map((method) => {
      const link = methodLink(method.name);
      return `| \`${tableCode(inlineSignature(method.signature))}\` | ${inlineDescription(method.description)} | ${link} |`;
    }),
  ].join("\n");
}

function methodsByCapabilitySection(methods) {
  return methodsByGroup(methods)
    .map(
      (group) => `### ${group.title}

${methodsTable(group.methods)}`,
    )
    .join("\n\n");
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function methodLink(name) {
  if (!name) return "-";
  const lowerCamel = `${name[0].toLowerCase()}${name.slice(1)}`;
  return links[name] || links[lowerCamel] || "-";
}

function inlineSignature(signature) {
  return normalizeWhitespace(signature.replace(/;\s*$/, ""))
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/,\s*\)/g, ")");
}

function tableCode(text) {
  return text.replace(/\|/g, "\\|");
}

function inlineDescription(description) {
  return normalizeWhitespace(description || "-").replace(/\|/g, "\\|");
}

function countChar(text, char) {
  return [...text].filter((current) => current === char).length;
}

function collectDeclaration(lines, startIndex) {
  const declaration = [];
  let balance = 0;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();
    declaration.push(line);
    balance += countChar(line, "(") - countChar(line, ")");
    if (balance <= 0 && line.includes(")")) {
      return declaration.join(" ");
    }
  }

  return declaration.join(" ");
}

function parameterList(declaration) {
  const start = declaration.indexOf("(");
  if (start === -1) {
    return "";
  }

  let balance = 0;
  for (let index = start; index < declaration.length; index += 1) {
    const char = declaration[index];
    if (char === "(") {
      balance += 1;
    }
    if (char === ")") {
      balance -= 1;
      if (balance === 0) {
        return declaration.slice(start + 1, index);
      }
    }
  }

  return declaration.slice(start + 1);
}

function lineCommentSummary(lines, index, marker) {
  const docs = [];
  let current = index - 1;

  while (current >= 0 && lines[current].trim().startsWith("@")) {
    current -= 1;
  }

  for (; current >= 0; current -= 1) {
    const line = lines[current].trim();
    if (!line.startsWith(marker)) {
      break;
    }
    docs.unshift(line.slice(marker.length).trim());
  }

  return normalizeWhitespace(docs.join(" ")) || "-";
}

function dartPublicMembers(filePath) {
  const source = readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);
  const members = [];
  const internalMethods = new Set(["channelHandler", "handleHooks"]);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const match = line.match(/^static\s+(?!const\b|final\b|var\b)(.+?)\s+(\w+)\s*\(/);
    if (!match) {
      continue;
    }

    const [, returnType, name] = match;
    if (name.startsWith("_")) continue;
    if (internalMethods.has(name)) continue;

    const declaration = collectDeclaration(lines, index);
    const params = parameterList(declaration);
    members.push({
      description: lineCommentSummary(lines, index, "///"),
      name,
      signature: `${name}(${normalizeWhitespace(params)}): ${normalizeWhitespace(returnType)}`,
    });
  }

  const classPattern = /((?:\s*\/\/\/[^\n]*\n)+)?\s*class\s+(Screeb\w+)\s+extends\s+StatelessWidget/g;
  let match;
  while ((match = classPattern.exec(source))) {
    const [, docs = "", name] = match;
    const signatures = {
      ScreebId: "ScreebId(String id, {Key? key, required Widget child})",
      ScreebMaskText: "ScreebMaskText({Key? key, required Widget child})",
      ScreebNoCapture: "ScreebNoCapture({Key? key, required Widget child})",
    };
    members.push({
      description: docs.replace(/^\s*\/\/\/\s?/gm, " ").trim() || "-",
      name,
      signature: signatures[name] || name,
    });
  }
  return members;
}

function kotlinPublicMembers(filePath) {
  const source = readFileSync(filePath, "utf8");
  const members = [];
  const methodPattern = /((?:\s*\/\*\*[\s\S]*?\*\/\s*)?)\s*suspend\s+fun\s+(\w+)\s*\(([\s\S]*?)\)\s*:\s*([^\n{]+)/g;
  let match;
  while ((match = methodPattern.exec(source))) {
    const [, docs = "", name, params, returnType] = match;
    members.push({
      description: kdocSummary(docs),
      name,
      signature: `${name}(${normalizeWhitespace(params)}): ${normalizeWhitespace(returnType)}`,
    });
  }
  return members;
}

function kotlinExtensionMembers(filePaths) {
  return filePaths.flatMap((filePath) => {
    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    const members = [];

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index].trim();
      const match = line.match(/^fun\s+([\w.]+)\.(\w+)\s*\(([^)]*)\)\s*:\s*([^{=]+)/);
      if (!match) {
        continue;
      }

      const [, receiver, name, params, returnType] = match;
      if (!["screebId", "screebMaskText", "screebNoCapture"].includes(name)) {
        continue;
      }

      members.push({
        description: "-",
        name,
        signature: `${receiver}.${name}(${normalizeWhitespace(params)}): ${normalizeWhitespace(returnType)}`,
      });
    }

    return members;
  });
}

function kotlinTypes(filePaths) {
  return filePaths.flatMap((filePath) => {
    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    const types = [];

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index].trim();
      if (!line.startsWith("data class ")) {
        continue;
      }

      types.push({
        name: line.match(/^data class\s+(\w+)/)?.[1] || "",
        text: normalizeWhitespace(collectDeclaration(lines, index)).replace(/\s*,\s*/g, ", "),
      });
    }

    return types;
  });
}

function kdocSummary(text) {
  return text
    .replace(/^\/\*\*|\*\/$/g, "")
    .replace(/^\s*\*\s?/gm, " ")
    .replace(/\s+/g, " ")
    .trim() || "-";
}

function csharpPublicMembers(filePaths) {
  return filePaths.flatMap((filePath) => {
    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    const members = [];

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index].trim();
      const match = line.match(/^public\s+static(?:\s+partial)?\s+(.+?)\s+(\w+)(?:<[^>]+>)?\s*\(/);
      if (!match) {
        continue;
      }

      const [, returnType, name] = match;
      const declaration = collectDeclaration(lines, index);
      const params = parameterList(declaration);
      members.push({
        description: xmlSummary(lineCommentSummary(lines, index, "///")),
        name,
        signature: `${name}(${normalizeWhitespace(params)}): ${normalizeWhitespace(returnType)}`,
      });
    }

    return members;
  });
}

function csharpTypes(filePaths) {
  return filePaths.flatMap((filePath) => {
    const source = readFileSync(filePath, "utf8");
    const matches = source.match(/public\s+(?:sealed\s+)?(?:class|record)\s+\w+[\s\S]*?\n}/g) || [];
    return matches.map((text) => ({ name: "", text: text.trim() }));
  });
}

function xmlSummary(text) {
  const match = text.match(/<summary>([\s\S]*?)<\/summary>/);
  return match ? normalizeWhitespace(match[1].replace(/\/\/\/\s?/g, "")) : "-";
}

function propsTable(props) {
  return [
    "| Option | Type | Required | Description |",
    "|---|---|---|---|",
    ...props.map((prop) =>
      `| \`${prop.name}\` | \`${tableCode(prop.type)}\` | ${prop.optional ? "No" : "Yes"} | ${prop.description || "-"} |`
    ),
  ].join("\n");
}

function hooksSection(types) {
  return hookTypes(types)
    .map(
      (type) => `### \`${type.name}\`

\`\`\`ts
${type.text}
\`\`\``,
    )
    .join("\n\n");
}

function typeCodeBlock(types, exclude = new Set()) {
  return types
    .filter((type) => !exclude.has(type.name))
    .map((type) => type.text)
    .join("\n\n");
}

function signatureLine(method, prefix = "") {
  return `${prefix}${inlineSignature(method.signature)};`;
}

function angularSignatureLine(method) {
  return signatureLine(
    method,
    ["ScreebId", "ScreebMaskText", "ScreebNoCapture"].includes(method.name)
      ? "public "
      : "public async ",
  );
}

function rawSignatureLine(method) {
  return inlineSignature(method.signature);
}

function groupedSignatureSection(methods, language, formatter = rawSignatureLine) {
  return methodsByGroup(methods)
    .map(
      (group) => `### ${group.title}

\`\`\`${language}
${group.methods.map((method) => formatter(method)).join("\n")}
\`\`\``,
    )
    .join("\n\n");
}

function hookReferenceSection(language) {
  const examples = {
    ts: `const hooks = {
  version: "1.0.0",
  onSurveyShowed: async (payload: string) => {
    // handle hook payload
  },
};`,
    dart: `final hooks = {
  'version': '1.0.0',
  'onSurveyShowed': (String payload) async {
    // handle hook payload
  },
};`,
    kotlin: `val hooks = ScreebHooks(
    version = "1.0.0",
    callbacks = mapOf(
        "onSurveyShowed" to { payload -> /* handle hook payload */ },
    ),
)`,
    csharp: `var hooks = new ScreebHooks
{
    Version = "1.0.0",
    Callbacks =
    {
        ["onSurveyShowed"] = async payload =>
        {
            // handle hook payload
            return null;
        },
    },
};`,
  };

  return `## Hooks

Hooks can be passed to initialization and programmatic survey/message starts. Callback payloads are forwarded as JSON strings by the mobile wrappers.

\`\`\`${language}
${examples[language] || examples.ts}
\`\`\`

For complete hook payload definitions, see the [JS tag hooks reference](../sdk-js/js-hooks).`;
}

function privacyHelpersSection(language) {
  const examples = {
    ts: `<ScreebMaskText>
  <Text>Sensitive content</Text>
</ScreebMaskText>

<ScreebNoCapture>
  <Text>Do not record</Text>
</ScreebNoCapture>

<ScreebId id="checkout-button">
  <Button title="Checkout" />
</ScreebId>`,
    dart: `ScreebMaskText(child: Text('Sensitive content'))

ScreebNoCapture(child: Text('Do not record'))

ScreebId('checkout-button', child: ElevatedButton(...))`,
    kotlin: `view.screebMaskText()

view.screebNoCapture()

view.screebId("checkout-button")`,
    csharp: `entry.ScreebMaskText();

view.ScreebNoCapture();

button.ScreebId("checkout-button");`,
  };

  if (!examples[language]) {
    return "";
  }

  return `## Privacy helpers

\`\`\`${language}
${examples[language]}
\`\`\``;
}

function pageHeader(target) {
  return `---
sidebar_position: ${target.sidebarPosition}
---

# Reference

${target.intro || `Complete reference for \`${target.title}\`.`}

✨ **New to Screeb? Start with the [Install guide](./install).**

<!-- This file is generated from SDK source by npm run docs:reference:update. -->
`;
}

function generateBrowser(target) {
  const methods = sortMethods(exportedConstMethods(target.entry));
  const types = exportedTypes(browserTypeFiles);
  reportCapabilities(target, methods);

  return `${pageHeader(target)}

## Methods by capability

${methodsByCapabilitySection(methods)}

## API signatures

${groupedSignatureSection(methods, "ts", (method) => signatureLine(method, "export function "))}

## Hooks

${hooksSection(types)}

For complete hook payload definitions, see the [JS tag hooks reference](../sdk-js/js-hooks).

## Type definitions

\`\`\`ts
${typeCodeBlock(types)}
\`\`\`
`;
}

function generateTypedWrapper(target) {
  const methods = sortMethods(methodsFromClientType(target.source, target.clientType));
  const props = propsFromTypes(target.source, target.propsTypes);
  const localTypes = exportedTypes([target.source]);
  const browserTypes = exportedTypes(browserTypeFiles);
  const excluded = new Set(methods.map((method) => `${method.name[0].toUpperCase()}${method.name.slice(1)}Function`));
  reportCapabilities(target, methods);

  return `${pageHeader(target)}

## Configuration

${propsTable(props)}

## ${target.usageTitle}

${methodsByCapabilitySection(methods)}

## API signatures

${groupedSignatureSection(methods, "ts", (method) => signatureLine(method, ""))}

## Hooks

${hooksSection(browserTypes)}

For complete hook payload definitions, see the [JS tag hooks reference](../sdk-js/js-hooks).

## Type definitions

\`\`\`ts
${typeCodeBlock(localTypes, excluded)}

${typeCodeBlock(browserTypes)}
\`\`\`
`;
}

function generateAngular(target) {
  const methods = sortMethods(publicClassMethods(target.source));
  const config = classProperties(target.configSource, "ScreebConfig");
  const browserTypes = exportedTypes(browserTypeFiles);
  reportCapabilities(target, methods);

  return `${pageHeader(target)}

## Methods by capability

Inject the \`Screeb\` service and call these methods. All methods return a \`Promise\`.

${methodsByCapabilitySection(methods)}

## API signatures

${groupedSignatureSection(methods, "ts", angularSignatureLine)}

## ScreebModule configuration

${propsTable(config)}

> **Note:** The \`language\` parameter is not available in \`ScreebModule.forRoot()\`. To set the language, use the \`language\` parameter when calling \`init()\` directly.

## Hooks

${hooksSection(browserTypes)}

For complete hook payload definitions, see the [JS tag hooks reference](../sdk-js/js-hooks).

## Type definitions

\`\`\`ts
${typeCodeBlock(browserTypes)}
\`\`\`
`;
}

function generateMethodOnly(target, methods, typeBlocks = [], options = {}) {
  const sortedMethods = sortMethods(methods);
  const language = options.language || "";
  const extraSections = [options.hooks ? hookReferenceSection(language) : "", options.privacy ? privacyHelpersSection(language) : ""]
    .filter(Boolean)
    .join("\n\n");
  reportCapabilities(target, sortedMethods);

  return `${pageHeader(target)}

## Methods by capability

${methodsByCapabilitySection(sortedMethods)}

## API signatures

${groupedSignatureSection(sortedMethods, language)}
${extraSections ? `\n\n${extraSections}` : ""}
${typeBlocks.length > 0 ? `

## Type definitions

\`\`\`${language}
${typeBlocks.map((type) => type.text).join("\n\n")}
\`\`\`
` : ""}
`;
}

function generate(target) {
  if (!existsSync(target.reference)) {
    throw new Error(`Public docs reference file not found: ${target.reference}`);
  }

  if (target.kind === "browser") {
    return generateBrowser(target);
  }
  if (target.kind === "typed-wrapper") {
    return generateTypedWrapper(target);
  }
  if (target.kind === "angular") {
    return generateAngular(target);
  }
  if (target.kind === "ts-functions") {
    const returnTypesByName = target.nativeSource
      ? interfaceMethodReturnTypes(target.nativeSource, "Spec")
      : new Map();
    return generateMethodOnly(
      target,
      exportedFunctionMethods(target.source, { returnTypesByName }),
      namedTypes(target.source, ["HookMap", "InitOptions", "ScreebPrivacyViewProps", "ScreebIdProps"]),
      { hooks: true, language: "ts", privacy: true },
    );
  }
  if (target.kind === "dart") {
    return generateMethodOnly(target, dartPublicMembers(target.source), [], {
      hooks: true,
      language: "dart",
      privacy: true,
    });
  }
  if (target.kind === "kotlin") {
    return generateMethodOnly(
      target,
      [
        ...kotlinPublicMembers(target.source),
        ...kotlinExtensionMembers(target.extraSources || []),
      ],
      kotlinTypes(target.extraSources || []),
      { hooks: true, language: "kotlin", privacy: true },
    );
  }
  if (target.kind === "csharp") {
    return generateMethodOnly(
      target,
      csharpPublicMembers([target.source, ...(target.extraSources || [])]),
      csharpTypes(target.extraSources || []),
      { hooks: true, language: "csharp", privacy: true },
    );
  }
  throw new Error(`Unsupported target kind: ${target.kind}`);
}

function main() {
  const staleReferences = [];

  for (const target of targets) {
    const content = `${generate(target).trimEnd()}\n`;
    if (checkOnly) {
      const current = readFileSync(target.reference, "utf8");
      if (current !== content) {
        staleReferences.push(relative(root, target.reference));
      }
      continue;
    }
    if (!checkCapabilitiesOnly) {
      writeFileSync(target.reference, content);
      console.log(`Updated ${relative(root, target.reference)}`);
    }
  }

  if (checkOnly) {
    if (staleReferences.length > 0) {
      console.error("Public docs references are stale. Run `npm run docs:reference:update`.");
      for (const reference of staleReferences) {
        console.error(`- ${reference}`);
      }
      process.exitCode = 1;
    } else {
      console.log("Public docs references are up to date.");
    }
  }

  printCapabilityReport();
}

main();
