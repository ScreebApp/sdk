package app.screeb.example.kmp

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import app.screeb.sdk.kmp.Screeb
import app.screeb.sdk.kmp.ScreebInitOptions
import kotlinx.coroutines.launch

@Composable
fun App(channelId: String) {
    val scope = rememberCoroutineScope()
    var status by remember { mutableStateOf("Not initialized") }

    LaunchedEffect(Unit) {
        val ok = Screeb.initSdk(
            channelId = channelId,
            initOptions = ScreebInitOptions(isDebugMode = true),
        )
        if (ok == true) {
            Screeb.trackScreen("KMP Example", mapOf("platform" to "android"))
        }
        status = if (ok == true) "SDK initialized" else "SDK init failed"
    }

    MaterialTheme {
        Column(
            modifier = Modifier.fillMaxSize().padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text("Screeb KMP Example")
            Text(status)

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.trackScreen("KMP Example", mapOf("button" to "track_screen"))
                    status = if (ok == true) "Screen tracked" else "Screen tracking failed"
                }
            }) { Text("Track Screen") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.trackEvent("button_tapped", mapOf("source" to "example_kmp"))
                    status = if (ok == true) "Event tracked" else "Event tracking failed"
                }
            }) { Text("Track Event") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.setIdentity("user_123", mapOf("plan" to "pro"))
                    status = if (ok == true) "Identity sent" else "Identity failed"
                }
            }) { Text("Set Identity") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.startSurvey(
                        surveyId = "replace-with-survey-id",
                        hiddenFields = mapOf("example" to "kmp"),
                        language = "en",
                    )
                    status = if (ok == true) "Survey start requested" else "Survey start failed"
                }
            }) { Text("Start Survey") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.startMessage(
                        messageId = "replace-with-message-id",
                        hiddenFields = mapOf("example" to "kmp"),
                        language = "en",
                    )
                    status = if (ok == true) "Message start requested" else "Message start failed"
                }
            }) { Text("Start Message") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.sessionReplayStart()
                    status = if (ok == true) "Session replay started" else "Session replay failed"
                }
            }) { Text("Start Replay") }

            Button(onClick = {
                scope.launch {
                    val debug = Screeb.debug()
                    status = debug?.take(160) ?: "Debug failed"
                }
            }) { Text("Debug SDK") }

            Button(onClick = {
                scope.launch {
                    val targeting = Screeb.debugTargeting()
                    status = targeting?.take(160) ?: "Targeting debug failed"
                }
            }) { Text("Debug Targeting") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.resetIdentity()
                    status = if (ok == true) "Identity reset" else "Reset failed"
                }
            }) { Text("Reset Identity") }
        }
    }
}
