package app.screeb.sdk.kmp

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class ScreebUtilsTest {

    @Test
    fun nullInputReturnsNull() {
        assertNull(ScreebUtils.formatProperties(null))
    }

    @Test
    fun primitiveValuesArePassedThrough() {
        val input = mapOf("name" to "Alice", "age" to 30, "score" to 9.5, "active" to true)
        val result = ScreebUtils.formatProperties(input)!!
        assertEquals("Alice", result["name"])
        assertEquals(30, result["age"])
        assertEquals(9.5, result["score"])
        assertEquals(true, result["active"])
    }

    @Test
    fun nestedMapIsRecursivelyProcessed() {
        val input = mapOf<String, Any>(
            "meta" to mapOf("key" to "value")
        )
        val result = ScreebUtils.formatProperties(input)!!
        @Suppress("UNCHECKED_CAST")
        val nested = result["meta"] as Map<String, Any>
        assertEquals("value", nested["key"])
    }

    @Test
    fun emptyMapReturnsEmptyMap() {
        val result = ScreebUtils.formatProperties(emptyMap())
        assertEquals(emptyMap(), result)
    }
}
