package app.screeb.sdk.kmp

import kotlin.coroutines.cancellation.CancellationException

/**
 * Returns the encapsulated value, or `null` when the call failed.
 *
 * Unlike [Result.getOrNull], a [CancellationException] is rethrown instead of
 * being swallowed, so coroutine cancellation (structured concurrency) keeps
 * working when a Screeb call is cancelled.
 */
internal fun <T> Result<T>.orNullRethrowingCancellation(): T? =
    when (val error = exceptionOrNull()) {
        null -> getOrNull()
        is CancellationException -> throw error
        else -> null
    }
