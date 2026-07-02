package app.screeb.sdk.kmp

/**
 * Entry point for the Screeb KMP SDK.
 * All methods are suspend functions dispatched on Dispatchers.Main.
 * Platform implementations live in androidMain/Screeb.android.kt and iosMain/Screeb.ios.kt.
 */
expect object Screeb {

    suspend fun initSdk(
        channelId: String,
        userId: String? = null,
        properties: Map<String, Any>? = null,
        hooks: ScreebHooks? = null,
        initOptions: ScreebInitOptions? = null,
        language: String? = null,
    ): Boolean?

    suspend fun closeSdk(): Boolean?

    suspend fun setIdentity(
        userId: String,
        properties: Map<String, Any>? = null,
    ): Boolean?

    suspend fun setProperties(properties: Map<String, Any>? = null): Boolean?

    suspend fun resetIdentity(): Boolean?

    suspend fun getIdentity(): Map<String, Any>?

    suspend fun assignGroup(
        groupType: String? = null,
        groupName: String,
        properties: Map<String, Any>? = null,
    ): Boolean?

    suspend fun unassignGroup(
        groupType: String? = null,
        groupName: String,
        properties: Map<String, Any>? = null,
    ): Boolean?

    suspend fun trackEvent(name: String, properties: Map<String, Any>? = null): Boolean?

    suspend fun trackScreen(name: String, properties: Map<String, Any>? = null): Boolean?

    suspend fun startSurvey(
        surveyId: String,
        allowMultipleResponses: Boolean = true,
        hiddenFields: Map<String, Any>? = null,
        ignoreSurveyStatus: Boolean = true,
        hooks: ScreebHooks? = null,
        language: String? = null,
        distributionId: String? = null,
    ): Boolean?

    suspend fun closeSurvey(surveyId: String? = null): Boolean?

    suspend fun startMessage(
        messageId: String,
        allowMultipleResponses: Boolean = true,
        hiddenFields: Map<String, Any>? = null,
        ignoreMessageStatus: Boolean = true,
        hooks: ScreebHooks? = null,
        language: String? = null,
        distributionId: String? = null,
    ): Boolean?

    suspend fun closeMessage(messageId: String? = null): Boolean?

    suspend fun sessionReplayStart(): Boolean?

    suspend fun sessionReplayStop(): Boolean?

    suspend fun debug(): String?

    suspend fun debugTargeting(): String?

    /**
     * Forward an incoming deep link (e.g. `screeb-<channel-id>://inspector`) to the SDK so it can
     * act on it — used by the in-app message editor / native inspector. Pass the URL of the launch
     * (or new) intent. On Android, call this from your Activity's `onCreate` and `onNewIntent`.
     */
    fun handleDeepLink(url: String?)
}
