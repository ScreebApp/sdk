package app.screeb.sdk.kmp

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlinx.coroutines.test.runTest

class HooksRegistryTest {

    @Test
    fun registerNullHooksReturnsEmptyMap() {
        HooksRegistry.clear()
        val result = HooksRegistry.register(null)
        assertTrue(result.isEmpty())
    }

    @Test
    fun registerHooksReturnsVersionAndUuids() {
        HooksRegistry.clear()
        val hooks = ScreebHooks(
            version = "1.0",
            callbacks = mapOf("onSurveyShowed" to { _ -> null })
        )
        val uuidMap = HooksRegistry.register(hooks)
        assertEquals("1.0", uuidMap["version"])
        val uuid = uuidMap["onSurveyShowed"]
        assertNotNull(uuid)
        assertTrue(uuid.startsWith("onSurveyShowed_"))
    }

    @Test
    fun getReturnsRegisteredCallback() = runTest {
        HooksRegistry.clear()
        var receivedPayload: String? = null
        val hooks = ScreebHooks(
            version = "1.0",
            callbacks = mapOf("onSurveyShowed" to { payload ->
                receivedPayload = payload
                true
            })
        )
        val uuidMap = HooksRegistry.register(hooks)
        val uuid = uuidMap["onSurveyShowed"]!!
        val fn = HooksRegistry.get(uuid)
        assertNotNull(fn)
        assertEquals(true, fn("""{"hook_id":"native-hook"}"""))
        assertEquals("""{"hook_id":"native-hook"}""", receivedPayload)
    }

    @Test
    fun clearRemovesAllCallbacks() {
        HooksRegistry.clear()
        val hooks = ScreebHooks(
            version = "1.0",
            callbacks = mapOf("onSurveyShowed" to { _ -> null })
        )
        val uuidMap = HooksRegistry.register(hooks)
        val uuid = uuidMap["onSurveyShowed"]!!
        HooksRegistry.clear()
        assertNull(HooksRegistry.get(uuid))
    }
}
