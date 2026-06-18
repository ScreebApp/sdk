package app.screeb.sdk.kmp

/**
 * Converts Map<String, Any>? to a form safe for native SDK consumption.
 * Nested maps are recursively processed.
 * Mirrors MAUI's ScreebUtils.FormatProperties.
 */
internal object ScreebUtils {
    fun formatProperties(props: Map<String, Any>?): Map<String, Any>? {
        if (props == null) return null
        return props.mapValues { (_, v) -> formatValue(v) }
    }

    private fun formatValue(value: Any): Any = when (value) {
        is Map<*, *> -> {
            @Suppress("UNCHECKED_CAST")
            formatProperties(value as Map<String, Any>) ?: emptyMap<String, Any>()
        }
        else -> value
    }
}
