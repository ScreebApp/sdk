import org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    kotlin("multiplatform") version "2.1.0"
    id("com.android.library") version "8.7.3"
    id("maven-publish")
    id("signing")
    id("io.github.gradle-nexus.publish-plugin") version "2.0.0"
}

group = project.property("GROUP") as String
version = project.property("VERSION_NAME") as String

val useLocalSdk = providers.gradleProperty("SCREEB_USE_LOCAL_SDK")
    .orElse(providers.environmentVariable("SCREEB_USE_LOCAL_SDK"))
    .map { it.equals("true", ignoreCase = true) }
    .orElse(false)
val defaultLocalIosSdkPath = projectDir.resolve("../../../sdk-ios").canonicalFile.absolutePath
val localIosSdkPath = providers.environmentVariable("SCREEB_IOS_SDK_PATH").orElse(defaultLocalIosSdkPath)
val localIosXcframework = layout.buildDirectory.dir("local-ios/Screeb.xcframework")
val packagedIosXcframework = projectDir.resolve("native/ios/Screeb.xcframework").absolutePath
val xcframeworkPath = if (useLocalSdk.get()) {
    localIosXcframework.get().asFile.absolutePath
} else {
    packagedIosXcframework
}
val screebAndroidSdkVersion = project.property("SCREEB_ANDROID_SDK_VERSION") as String

val buildLocalScreebIosXcframework by tasks.registering(Exec::class) {
    onlyIf { useLocalSdk.get() }
    commandLine(
        "node",
        projectDir.resolve("../../scripts/build-local-ios-xcframework.mjs").canonicalFile.absolutePath,
        "--sdk-ios",
        localIosSdkPath.get(),
        "--output",
        localIosXcframework.get().asFile.absolutePath,
    )
}

kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xexpect-actual-classes")
    }

    @OptIn(ExperimentalKotlinGradlePluginApi::class)
    androidTarget {
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_11)
        }
        publishLibraryVariants("release")
    }

    iosArm64 {
        compilations["main"].cinterops.create("Screeb") {
            defFile("iosInterop/Screeb.def")
            compilerOpts("-F", "$xcframeworkPath/ios-arm64")
        }
        binaries.all {
            linkerOpts("-framework", "Screeb", "-F", "$xcframeworkPath/ios-arm64")
        }
    }

    iosSimulatorArm64 {
        compilations["main"].cinterops.create("Screeb") {
            defFile("iosInterop/Screeb.def")
            compilerOpts("-F", "$xcframeworkPath/ios-arm64_x86_64-simulator")
        }
        binaries.all {
            linkerOpts("-framework", "Screeb", "-F", "$xcframeworkPath/ios-arm64_x86_64-simulator")
        }
    }

    iosX64 {
        compilations["main"].cinterops.create("Screeb") {
            defFile("iosInterop/Screeb.def")
            compilerOpts("-F", "$xcframeworkPath/ios-arm64_x86_64-simulator")
        }
        binaries.all {
            linkerOpts("-framework", "Screeb", "-F", "$xcframeworkPath/ios-arm64_x86_64-simulator")
        }
    }

    sourceSets {
        commonMain.dependencies {
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
        }
        androidMain.dependencies {
            implementation("app.screeb.sdk:survey:$screebAndroidSdkVersion")
        }
        commonTest.dependencies {
            implementation(kotlin("test"))
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.10.2")
        }
    }
}

android {
    namespace = "app.screeb.sdk.kmp"
    compileSdk = 35
    defaultConfig {
        minSdk = 21
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

tasks.matching { it.name in setOf("iosArm64Test", "iosSimulatorArm64Test", "iosX64Test") }.configureEach {
    // The native framework is linked for compilation, but Kotlin/Native test binaries do not embed it.
    // Common behavior is covered by Android unit tests; iOS release confidence comes from target compilation.
    enabled = false
}

tasks.configureEach {
    if (useLocalSdk.get() && (name.startsWith("cinteropScreeb") || name.startsWith("compileKotlinIos") || name.startsWith("link"))) {
        dependsOn(buildLocalScreebIosXcframework)
    }
}

// ---- Publishing ----

val javadocJar by tasks.registering(Jar::class) {
    archiveClassifier.set("javadoc")
}

publishing {
    publications.withType<MavenPublication> {
        artifact(javadocJar)
        pom {
            name.set(project.property("POM_NAME") as String)
            description.set(project.property("POM_DESCRIPTION") as String)
            url.set(project.property("POM_URL") as String)
            licenses {
                license {
                    name.set(project.property("POM_LICENCE_NAME") as String)
                    url.set(project.property("POM_LICENCE_URL") as String)
                }
            }
            developers {
                developer {
                    id.set(project.property("POM_DEVELOPER_ID") as String)
                    name.set(project.property("POM_DEVELOPER_NAME") as String)
                    url.set(project.property("POM_DEVELOPER_URL") as String)
                }
            }
            scm {
                url.set(project.property("POM_SCM_URL") as String)
                connection.set(project.property("POM_SCM_CONNECTION") as String)
                developerConnection.set(project.property("POM_SCM_DEV_CONNECTION") as String)
            }
        }
    }
}

nexusPublishing {
    repositories {
        sonatype {
            // Central Publishing Portal (legacy s01.oss.sonatype.org is decommissioned)
            nexusUrl.set(uri("https://ossrh-staging-api.central.sonatype.com/service/local/"))
            snapshotRepositoryUrl.set(uri("https://central.sonatype.com/repository/maven-snapshots/"))
            username.set(System.getenv("OSSRH_USERNAME"))
            password.set(System.getenv("OSSRH_PASSWORD"))
        }
    }
}

signing {
    val gpgKey = System.getenv("GPG_KEY")
    val gpgKeyId = System.getenv("GPG_KEY_ID")
    val gpgPassword = System.getenv("GPG_PASSWORD")
    if (gpgKey != null && gpgKeyId != null && gpgPassword != null) {
        useInMemoryPgpKeys(gpgKeyId, gpgKey, gpgPassword)
        sign(publishing.publications)
    }
}

// The shared javadoc jar is signed once per publication into the same .asc:
// every publish task must wait for all sign tasks or Gradle fails validation.
tasks.withType<AbstractPublishToMaven>().configureEach {
    dependsOn(tasks.withType<Sign>())
}
