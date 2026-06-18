package app.screeb.sdk.kmp

import platform.Foundation.NSUUID

internal actual fun randomUuid(): String = NSUUID().UUIDString()
