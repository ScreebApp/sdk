@file:OptIn(kotlinx.cinterop.ExperimentalForeignApi::class)

package app.screeb.sdk.kmp

import app.screeb.sdk.ios.cinterop.Screeb as NativeScreeb
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

/** Module-level scope for invoking iOS hook callbacks. Cancelled and recreated on closeSdk(). */
internal object HooksScope {
    var scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
        private set

    fun reset() {
        scope.cancel()
        scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    }
}

internal object HooksIOS {

    @Suppress("UNCHECKED_CAST")
    fun toMap(uuidMap: Map<String, String>): Map<Any?, Any?>? {
        if (uuidMap.isEmpty()) return null
        return NativeScreeb.makeHooks(uuidMap as Map<Any?, Any?>) { wrapperHookId, nativeHookId, payload ->
            val fn = wrapperHookId?.let { HooksRegistry.get(it) }
            if (fn != null && !nativeHookId.isNullOrBlank()) {
                HooksScope.scope.launch {
                    val result = runCatching { fn(payload ?: "{}") }.getOrElse { false }
                    NativeScreeb.onHookResult(nativeHookId, result)
                }
            }
        } as Map<Any?, Any?>
    }
}
