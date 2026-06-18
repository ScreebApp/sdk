package app.screeb.sdk.kmp

import app.screeb.sdk.Screeb as AndroidScreeb
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

/** Module-level scope for invoking hook callbacks. Cancelled and recreated on closeSdk(). */
internal object HooksScope {
    var scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
        private set

    fun reset() {
        scope.cancel()
        scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    }
}

internal object HooksAndroid {

    fun toHooks(uuidMap: Map<String, String>): HashMap<String, Any>? {
        if (uuidMap.isEmpty()) return null
        return AndroidScreeb.makeHooks(uuidMap) { uuid, nativeHookId, payload ->
            val fn = HooksRegistry.get(uuid)
            if (fn != null) {
                HooksScope.scope.launch {
                    val result = runCatching { fn(payload) }.getOrElse { false }
                    if (nativeHookId.isNotBlank()) {
                        AndroidScreeb.onHookResult(nativeHookId, result)
                    }
                }
            }
        }
    }
}
