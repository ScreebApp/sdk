package app.screeb.example.kmp

import androidx.compose.runtime.ExperimentalComposeApi
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.platform.AccessibilitySyncOptions
import androidx.compose.ui.window.ComposeUIViewController

@OptIn(ExperimentalComposeUiApi::class, ExperimentalComposeApi::class)
fun MainViewController() = ComposeUIViewController(configure = {
    // Materialize the iOS accessibility tree even without VoiceOver: Screeb's
    // session replay / element picker reads it to mirror Compose semantics
    // (roles, labels, bounds) instead of an opaque Metal canvas.
    accessibilitySyncOptions = AccessibilitySyncOptions.Always(debugLogger = null)
}) {
    App(channelId = "0e2b609a-8dce-4695-a80f-966fbfa87a88")
}
