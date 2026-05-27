package app.screeb.sdk.kmp

/**
 * Hook callbacks to pass to initSdk, startSurvey, or startMessage.
 * [version] is passed verbatim to the native SDK.
 * [callbacks] maps hook names (e.g. "onSurveyShowed") to suspend lambdas
 * that receive the JSON payload string.
 */
data class ScreebHooks(
    val version: String,
    val callbacks: Map<String, suspend (String) -> Any?> = emptyMap(),
)

/**
 * Internal registry mapping UUID → suspend callback.
 * UUID format: "<hookName>_<random>" to aid debugging.
 * All accesses are performed on the Main dispatcher (enforced by callers via withContext(Dispatchers.Main)),
 * so no additional synchronization is required.
 */
internal object HooksRegistry {
    private val registry = mutableMapOf<String, suspend (String) -> Any?>()

    /** Registers callbacks, returns a map of hookName → UUID for passing to native SDK. */
    fun register(hooks: ScreebHooks?): Map<String, String> {
        if (hooks == null) return emptyMap()
        val uuidMap = mutableMapOf<String, String>()
        uuidMap["version"] = hooks.version
        for ((key, callback) in hooks.callbacks) {
            val uuid = "${key}_${randomUuid()}"
            registry[uuid] = callback
            uuidMap[key] = uuid
        }
        return uuidMap
    }

    fun get(uuid: String): (suspend (String) -> Any?)? = registry[uuid]

    fun clear() = registry.clear()
}

/** Platform-provided UUID. Defined as expect/actual. */
internal expect fun randomUuid(): String
