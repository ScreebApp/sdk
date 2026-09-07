// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "plugin_screeb",
    platforms: [
        .iOS("12.0")
    ],
    products: [
        .library(name: "plugin-screeb", targets: ["plugin_screeb"])
    ],
    dependencies: [
        .package(name: "FlutterFramework", path: "../FlutterFramework"),
        .package(url: "https://github.com/ScreebApp/sdk-ios-public.git", exact: "4.2.0")
    ],
    targets: [
        .target(
            name: "plugin_screeb",
            dependencies: [
                .product(name: "FlutterFramework", package: "FlutterFramework"),
                .product(name: "Screeb", package: "sdk-ios-public")
            ],
            cSettings: [
                .headerSearchPath("include/plugin_screeb")
            ]
        )
    ]
)
