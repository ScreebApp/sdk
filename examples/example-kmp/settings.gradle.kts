pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        if (providers.gradleProperty("SCREEB_USE_LOCAL_SDK").orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK")).orNull == "true") {
            mavenLocal()
        }
        google()
        mavenCentral()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}

if (providers.gradleProperty("SCREEB_USE_LOCAL_SDK").orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK")).orNull == "true") {
    includeBuild("../../../sdk-android") {
        dependencySubstitution {
            substitute(module("app.screeb.sdk:survey")).using(project(":sdk"))
        }
    }
}

includeBuild("../../packages/sdk-kmp") {
    dependencySubstitution {
        substitute(module("app.screeb.sdk.kmp:screeb-kmp")).using(project(":"))
    }
}

rootProject.name = "example-kmp"
include(":composeApp")
