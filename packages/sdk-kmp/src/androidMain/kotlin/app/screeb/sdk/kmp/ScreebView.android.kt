package app.screeb.sdk.kmp

import android.view.View
import app.screeb.sdk.R

fun View.screebId(id: String): View {
    setTag(R.id.screeb_id, id)
    return this
}

fun View.screebMaskText(): View {
    setTag(R.id.screeb_sensitive_tag, true)
    return this
}

fun View.screebNoCapture(): View {
    setTag(R.id.screeb_no_capture_tag, true)
    return this
}
