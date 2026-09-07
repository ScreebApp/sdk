// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import Foundation
import PackageDescription

// Mirrors plugin_screeb.podspec's SCREEB_USE_LOCAL_SDK switch. Unlike the CocoaPods `:path`
// pod, which builds straight from ../sdk-ios sources, a SwiftPM manifest can't invoke
// xcodebuild itself — build the local xcframework once first with
// `node scripts/build-local-ios-xcframework.mjs --output packages/sdk-flutter/ios/plugin_screeb/Screeb.xcframework`
// (see docs/screeb-team-release.md). The path below is package-root-relative with no `..`
// on purpose: Flutter's tooling resolves a plugin's Package.swift through a per-build symlink
// (ios/Flutter/ephemeral/Packages/.packages/<plugin>-<version>), and relative paths are resolved
// against that symlink's own location, not the plugin's real path in this monorepo — the same
// reason FlutterFramework's own binaryTarget is symlinked inside that directory instead of
// referenced by a `..`-relative path (see flutter_tools' swift_package_manager.dart). A path
// with no `..` component resolves the same way whether or not the manifest is read through
// a symlink, so the xcframework must live directly inside this package.
let useLocalSDK = ProcessInfo.processInfo.environment["SCREEB_USE_LOCAL_SDK"] == "true"
let localScreebXCFrameworkPath = "Screeb.xcframework"

var packageDependencies: [Package.Dependency] = [
    .package(name: "FlutterFramework", path: "../FlutterFramework")
]
var pluginTargets: [Target] = []
let screebTargetDependency: Target.Dependency

if useLocalSDK {
    screebTargetDependency = .target(name: "Screeb")
    pluginTargets.append(.binaryTarget(name: "Screeb", path: localScreebXCFrameworkPath))
} else {
    packageDependencies.append(.package(url: "https://github.com/ScreebApp/sdk-ios-public.git", exact: "4.2.0"))
    screebTargetDependency = .product(name: "Screeb", package: "sdk-ios-public")
}

pluginTargets.append(
    .target(
        name: "plugin_screeb",
        dependencies: [
            .product(name: "FlutterFramework", package: "FlutterFramework"),
            screebTargetDependency
        ]
    )
)

let package = Package(
    name: "plugin_screeb",
    platforms: [
        .iOS("12.0")
    ],
    products: [
        .library(name: "plugin-screeb", targets: ["plugin_screeb"])
    ],
    dependencies: packageDependencies,
    targets: pluginTargets
)
