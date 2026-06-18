@file:OptIn(kotlinx.cinterop.ExperimentalForeignApi::class)

package app.screeb.sdk.kmp

import app.screeb.sdk.ios.cinterop.ScreebView as NativeScreebView
import kotlinx.cinterop.interpretObjCPointerOrNull
import kotlinx.cinterop.objcPtr
import objcnames.classes.UIView as NativeUIView
import platform.UIKit.UIView

fun UIView.screebId(id: String): UIView {
    NativeScreebView.screebId(toNativeUIView(), id = id)
    return this
}

fun UIView.screebMaskText(): UIView {
    NativeScreebView.screebMaskText(toNativeUIView())
    return this
}

fun UIView.screebNoCapture(): UIView {
    NativeScreebView.screebNoCapture(toNativeUIView())
    return this
}

private fun UIView.toNativeUIView(): NativeUIView =
    interpretObjCPointerOrNull<NativeUIView>(objcPtr())
        ?: error("Unable to bridge UIKit.UIView to Screeb UIView")
