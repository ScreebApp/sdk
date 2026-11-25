pluginManagement {
    val flutterSdkPath = run {
        val properties = java.util.Properties()
        file("local.properties").inputStream().use { properties.load(it) }
        val flutterSdkPath = properties.getProperty("flutter.sdk")
        require(flutterSdkPath != null) { "flutter.sdk not set in local.properties" }
        flutterSdkPath
    }

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("dev.flutter.flutter-plugin-loader") version "1.0.0"
    id("com.android.application") version "9.5.2" apply false
    // Pins the Kotlin Gradle Plugin used by AGP's built-in Kotlin support.
    id("org.jetbrains.kotlin.android") version "2.4.21" apply false
}

if (providers.gradleProperty("SCREEB_USE_LOCAL_SDK").orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK")).orNull.equals("true", ignoreCase = true)) {
    val screebAndroidSdkPath = providers.environmentVariable("SCREEB_ANDROID_SDK_PATH")
        .orElse(file("../../../../sdk-android").canonicalPath)
        .get()
    providers.exec {
        workingDir = file(screebAndroidSdkPath)
        commandLine("./gradlew", ":sdk:publishReleasePublicationToMavenLocal", "--no-daemon")
    }.result.get()
}

include(":app")
