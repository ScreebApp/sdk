package app.screeb.sdk.kmp

import app.screeb.sdk.Screeb as AndroidScreeb
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

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
            AndroidScreeb.setSecondarySDK("kmp", SDK_VERSION)
            AndroidScreeb.pluginInit(
                channelId,
                userId,
                ScreebUtils.formatProperties(properties)?.let { HashMap(it) },
                initOptions?.let {
                    hashMapOf("isDebugMode" to it.isDebugMode, "disableMirror" to it.disableMirror)
                },
                HooksAndroid.toHooks(uuidMap),
                language,
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun closeSdk(): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            HooksRegistry.clear()
            HooksScope.reset()
            AndroidScreeb.closeSdk()
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun setIdentity(
        userId: String,
        properties: Map<String, Any>?,
    ): Boolean? = withContext(Dispatchers.Main) {
        runCatching {
            AndroidScreeb.setIdentity(
                userId,
                ScreebUtils.formatProperties(properties)?.let { HashMap(it) },
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun setProperties(properties: Map<String, Any>?): Boolean? =
        withContext(Dispatchers.Main) {
            runCatching {
                val props = ScreebUtils.formatProperties(properties)?.let { HashMap(it) }
                if (props != null) AndroidScreeb.setVisitorProperties(props)
                true
            }.orNullRethrowingCancellation()
        }

    actual suspend fun resetIdentity(): Boolean? = withContext(Dispatchers.Main) {
        runCatching { AndroidScreeb.resetIdentity(); true }.orNullRethrowingCancellation()
    }

    actual suspend fun getIdentity(): Map<String, Any>? = withContext(Dispatchers.Main) {
        runCatching {
            suspendCancellableCoroutine { cont ->
                AndroidScreeb.getIdentity { identity: HashMap<String, Any?>?, error: Exception? ->
                    if (error != null) cont.resumeWithException(error)
                    else cont.resume(identity?.filterValues { it != null }?.mapValues { it.value!! })
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
            AndroidScreeb.assignGroup(
                groupType, groupName,
                ScreebUtils.formatProperties(properties)?.let { HashMap(it) },
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
            AndroidScreeb.unassignGroup(
                groupType, groupName,
                ScreebUtils.formatProperties(properties)?.let { HashMap(it) },
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun trackEvent(name: String, properties: Map<String, Any>?): Boolean? =
        withContext(Dispatchers.Main) {
            runCatching {
                AndroidScreeb.trackEvent(
                    name,
                    ScreebUtils.formatProperties(properties)?.let { HashMap(it) },
                )
                true
            }.orNullRethrowingCancellation()
        }

    actual suspend fun trackScreen(name: String, properties: Map<String, Any>?): Boolean? =
        withContext(Dispatchers.Main) {
            runCatching {
                AndroidScreeb.trackScreen(
                    name,
                    ScreebUtils.formatProperties(properties)?.let { HashMap(it) },
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
            AndroidScreeb.startSurvey(
                surveyId, allowMultipleResponses,
                ScreebUtils.formatProperties(hiddenFields)?.let { HashMap(it) },
                ignoreSurveyStatus,
                HooksAndroid.toHooks(uuidMap),
                language, distributionId,
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun closeSurvey(surveyId: String?): Boolean? = withContext(Dispatchers.Main) {
        runCatching { AndroidScreeb.closeSurvey(surveyId); true }.orNullRethrowingCancellation()
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
            AndroidScreeb.startMessage(
                messageId, allowMultipleResponses,
                ScreebUtils.formatProperties(hiddenFields)?.let { HashMap(it) },
                ignoreMessageStatus,
                HooksAndroid.toHooks(uuidMap),
                language, distributionId,
            )
            true
        }.orNullRethrowingCancellation()
    }

    actual suspend fun closeMessage(messageId: String?): Boolean? = withContext(Dispatchers.Main) {
        runCatching { AndroidScreeb.closeMessage(messageId); true }.orNullRethrowingCancellation()
    }

    actual suspend fun sessionReplayStart(): Boolean? = withContext(Dispatchers.Main) {
        runCatching { AndroidScreeb.sessionReplayStart(); true }.orNullRethrowingCancellation()
    }

    actual suspend fun sessionReplayStop(): Boolean? = withContext(Dispatchers.Main) {
        runCatching { AndroidScreeb.sessionReplayStop(); true }.orNullRethrowingCancellation()
    }

    actual suspend fun debug(): String? = withContext(Dispatchers.Main) {
        runCatching {
            suspendCancellableCoroutine { cont ->
                AndroidScreeb.debug { info: String, error: Exception? ->
                    if (error != null) cont.resumeWithException(error)
                    else cont.resume(info)
                }
            }
        }.orNullRethrowingCancellation()
    }

    actual suspend fun debugTargeting(): String? = withContext(Dispatchers.Main) {
        runCatching {
            suspendCancellableCoroutine { cont ->
                AndroidScreeb.debugTargeting { info: String, error: Exception? ->
                    if (error != null) cont.resumeWithException(error)
                    else cont.resume(info)
                }
            }
        }.orNullRethrowingCancellation()
    }

    actual fun handleDeepLink(url: String?) {
        AndroidScreeb.handleDeepLink(url)
    }
}
