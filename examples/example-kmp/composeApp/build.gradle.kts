plugins {
    kotlin("multiplatform") version "2.1.0"
    id("com.android.application") version "8.7.3"
    id("org.jetbrains.compose") version "1.7.3"
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.0"
}

kotlin {
    androidTarget()
    iosArm64()
    iosSimulatorArm64()
    iosX64()

    sourceSets {
        commonMain.dependencies {
            implementation(compose.runtime)
            implementation(compose.foundation)
            implementation(compose.material3)
            implementation("app.screeb.sdk.kmp:screeb-kmp:0.1.0")
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
        }
        androidMain.dependencies {
            implementation("androidx.activity:activity-compose:1.9.3")
        }
    }
}

android {
    namespace = "app.screeb.example.kmp"
    compileSdk = 35
    defaultConfig {
        applicationId = "app.screeb.example.kmp"
        minSdk = 21
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
