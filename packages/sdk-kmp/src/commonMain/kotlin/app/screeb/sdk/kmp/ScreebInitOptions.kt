package app.screeb.sdk.kmp

data class ScreebInitOptions(
    val isDebugMode: Boolean = false,
    val disableMirror: Boolean = false,
    /** "light", "dark" or "auto"; null keeps the native default (auto). */
    val colorScheme: String? = null,
)
