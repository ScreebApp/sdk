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
    }
}

if (providers.gradleProperty("SCREEB_USE_LOCAL_SDK").orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK")).orNull == "true") {
    includeBuild(providers.environmentVariable("SCREEB_ANDROID_SDK_PATH").getOrElse("../../../screeb/sdk-android")) {
        dependencySubstitution {
            substitute(module("app.screeb.sdk:survey")).using(project(":sdk"))
        }
    }
}

rootProject.name = "sdk-kmp"
