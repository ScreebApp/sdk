@file:OptIn(kotlinx.cinterop.ExperimentalForeignApi::class)

package app.screeb.sdk.kmp

import app.screeb.sdk.ios.cinterop.InitOptions
import app.screeb.sdk.ios.cinterop.Screeb as NativeScreeb
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

/** Converts a KMP property map to a Kotlin Map that the cinterop bridge converts to NSDictionary. */
@Suppress("UNCHECKED_CAST")
private fun Map<String, Any>?.toObjCMap(): Map<Any?, Any?> =
    (ScreebUtils.formatProperties(this) ?: emptyMap()) as Map<Any?, Any?>

/** Reads the cinterop-bridged NSDictionary (exposed as Map<Any?, *>) to a typed Kotlin Map. */
@Suppress("UNCHECKED_CAST")
private fun Map<Any?, *>?.toKotlinMap(): Map<String, Any>? {
    if (this == null) return null
    return entries.associate { (k, v) -> k.toString() to (v?.toString() ?: "") }
}

actual object Screeb {

    actual suspend fun initSdk(
        channelId: String,
        userId: String?,
        properties: Map<String, Any>?,
        hooks: ScreebHooks?,
        initOptions: ScreebInitOptions?,
        language: String?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            val uuidMap = HooksRegistry.register(hooks)
            NativeScreeb.setSecondarySDK("kmp", version = SDK_VERSION)
            val opts = InitOptions()
            opts.setIsDebugMode(initOptions?.isDebugMode ?: false)
            opts.setDisableMirror(initOptions?.disableMirror ?: false)
            NativeScreeb.initSdk(
                null,
                channelId = channelId,
                identity = userId,
                visitorProperty = properties.toObjCMap(),
                initOptions = opts,
                hooks = HooksIOS.toMap(uuidMap),
                language = language,
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun closeSdk(): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            HooksRegistry.clear()
            HooksScope.reset()
            NativeScreeb.closeSdk()
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun setIdentity(
        userId: String,
        properties: Map<String, Any>?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            NativeScreeb.setIdentity(
                userId,
                visitorProperty = properties.toObjCMap(),
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun setProperties(properties: Map<String, Any>?): Boolean? =
        withContext(Dispatchers.Main) {
            runCatching {
                NativeScreeb.visitorProperty(properties.toObjCMap())
                true
            }.orNullRethrowingCancellation()
        }

    actual suspend fun resetIdentity(): Boolean? = withContext(Dispatchers.Main) {
        runCatching { NativeScreeb.resetIdentity(); true }.orNullRethrowingCancellation()
    }

    actual suspend fun getIdentity(): Map<String, Any>? = withContext(Dispatchers.Main) {
        runCatching {
            suspendCancellableCoroutine { cont ->
                NativeScreeb.getIdentity { identity, error ->
                    if (error != null) cont.resumeWithException(Exception(error.localizedDescription))
                    else cont.resume((identity as Map<Any?, *>?).toKotlinMap())
                }
            }
        }.orNullRethrowingCancellation()
    }

    actual suspend fun assignGroup(
        groupType: String?,
        groupName: String,
        properties: Map<String, Any>?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            NativeScreeb.assignGroup(
                groupType,
                name = groupName,
                properties = properties.toObjCMap(),
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun unassignGroup(
        groupType: String?,
        groupName: String,
        properties: Map<String, Any>?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            NativeScreeb.unassignGroup(
                groupType,
                name = groupName,
                properties = properties.toObjCMap(),
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun trackEvent(name: String, properties: Map<String, Any>?): Boolean? =
        withContext(Dispatchers.Main) {
            runCatching {
                NativeScreeb.trackEvent(
                    name,
                    trackingEventProperties = properties.toObjCMap(),
                )
                true
            }.orNullRethrowingCancellation()
        }

    actual suspend fun trackScreen(name: String, properties: Map<String, Any>?): Boolean? =
        withContext(Dispatchers.Main) {
            runCatching {
                NativeScreeb.trackScreen(
                    name,
                    trackingEventProperties = properties.toObjCMap(),
                )
                true
            }.orNullRethrowingCancellation()
        }

    actual suspend fun startSurvey(
        surveyId: String,
        allowMultipleResponses: Boolean,
        hiddenFields: Map<String, Any>?,
        ignoreSurveyStatus: Boolean,
        hooks: ScreebHooks?,
        language: String?,
        distributionId: String?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            val uuidMap = HooksRegistry.register(hooks)
            NativeScreeb.startSurvey(
                surveyId,
                allowMultipleResponses = allowMultipleResponses,
                hiddenFields = hiddenFields.toObjCMap(),
                ignoreSurveyStatus = ignoreSurveyStatus,
                hooks = HooksIOS.toMap(uuidMap),
                language = language,
                distributionId = distributionId,
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun closeSurvey(surveyId: String?): Boolean? = withContext(Dispatchers.Main) {
        runCatching { NativeScreeb.closeSurvey(surveyId); true }.orNullRethrowingCancellation()
    }

    actual suspend fun startMessage(
        messageId: String,
        allowMultipleResponses: Boolean,
        hiddenFields: Map<String, Any>?,
        ignoreMessageStatus: Boolean,
        hooks: ScreebHooks?,
        language: String?,
        distributionId: String?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            val uuidMap = HooksRegistry.register(hooks)
            NativeScreeb.startMessage(
                messageId,
                allowMultipleResponses = allowMultipleResponses,
                hiddenFields = hiddenFields.toObjCMap(),
                ignoreMessageStatus = ignoreMessageStatus,
                hooks = HooksIOS.toMap(uuidMap),
                language = language,
                distributionId = distributionId,
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun closeMessage(messageId: String?): Boolean? = withContext(Dispatchers.Main) {
        runCatching { NativeScreeb.closeMessage(messageId); true }.orNullRethrowingCancellation()
    }

    actual suspend fun sessionReplayStart(): Boolean? = withContext(Dispatchers.Main) {
        runCatching { NativeScreeb.sessionReplayStart(); true }.orNullRethrowingCancellation()
    }

    actual suspend fun sessionReplayStop(): Boolean? = withContext(Dispatchers.Main) {
        runCatching { NativeScreeb.sessionReplayStop(); true }.orNullRethrowingCancellation()
    }

    actual suspend fun debug(): String? = withContext(Dispatchers.Main) {
        runCatching {
            suspendCancellableCoroutine { cont ->
                NativeScreeb.debug { info, error ->
                    if (error != null) cont.resumeWithException(Exception(error.localizedDescription))
                    else cont.resume(info)
                }
            }
        }.orNullRethrowingCancellation()
    }

    actual suspend fun debugTargeting(): String? = withContext(Dispatchers.Main) {
        runCatching {
            suspendCancellableCoroutine { cont ->
                NativeScreeb.debugTargeting { info, error ->
                    if (error != null) cont.resumeWithException(Exception(error.localizedDescription))
                    else cont.resume(info)
                }
            }
        }.orNullRethrowingCancellation()
    }

    // Forward to the native SDK (editor/survey/message links open in-app). Call it
    // from your AppDelegate's open-URL entry point or a shared linking listener.
    actual fun handleDeepLink(url: String?) {
        if (url == null) return
        NativeScreeb.handleDeepLink(platform.Foundation.NSURL.URLWithString(url))
    }
}
