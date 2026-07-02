package app.screeb.example.kmp

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import app.screeb.sdk.kmp.Screeb

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            App(channelId = "0e2b609a-8dce-4695-a80f-966fbfa87a88")
        }
        // Forward the launch deep link (e.g. screeb-<channel-id>://inspector) to the SDK.
        Screeb.handleDeepLink(intent?.data?.toString())
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        Screeb.handleDeepLink(intent.data?.toString())
    }
}
