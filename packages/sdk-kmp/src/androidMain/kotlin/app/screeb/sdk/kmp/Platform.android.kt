package app.screeb.sdk.kmp

import java.util.UUID

internal actual fun randomUuid(): String = UUID.randomUUID().toString()
