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
            initOptions = ScreebInitOptions(isDebugMode = false),
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
                    val ok = Screeb.initSdk(
                        channelId = channelId,
                        initOptions = ScreebInitOptions(isDebugMode = false),
                    )
                    status = if (ok == true) "SDK initialized" else "SDK init failed"
                }
            }) { Text("Init SDK") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.setIdentity("user_123", mapOf("plan" to "pro"))
                    status = if (ok == true) "Identity sent" else "Identity failed"
                }
            }) { Text("Set identity") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.setProperties(mapOf("plan" to "pro"))
                    status = if (ok == true) "Properties set" else "Properties failed"
                }
            }) { Text("Set visitor properties") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.assignGroup(
                        groupType = "company",
                        groupName = "Screeb",
                        properties = mapOf("plan" to "pro"),
                    )
                    status = if (ok == true) "Group assigned" else "Assign group failed"
                }
            }) { Text("Assign group") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.unassignGroup(
                        groupType = "company",
                        groupName = "Screeb",
                        properties = mapOf("plan" to "pro"),
                    )
                    status = if (ok == true) "Group unassigned" else "Unassign group failed"
                }
            }) { Text("Unassign group") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.resetIdentity()
                    status = if (ok == true) "Identity reset" else "Reset failed"
                }
            }) { Text("Reset identity") }

            Button(onClick = {
                scope.launch {
                    val identity = Screeb.getIdentity()
                    status = identity?.toString()?.take(160) ?: "Get identity failed"
                }
            }) { Text("Get identity") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.trackEvent("button_tapped", mapOf("source" to "example_kmp"))
                    status = if (ok == true) "Event tracked" else "Event tracking failed"
                }
            }) { Text("Track event") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.trackScreen("KMP Example", mapOf("button" to "track_screen"))
                    status = if (ok == true) "Screen tracked" else "Screen tracking failed"
                }
            }) { Text("Track screen") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.startSurvey(
                        surveyId = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff",
                        hiddenFields = mapOf("example" to "kmp"),
                        language = "en",
                    )
                    status = if (ok == true) "Survey start requested" else "Survey start failed"
                }
            }) { Text("Start survey") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.startMessage(
                        messageId = "642929b9-28f1-4cb5-b153-f482777e0003",
                        hiddenFields = mapOf("example" to "kmp"),
                        language = "en",
                    )
                    status = if (ok == true) "Message start requested" else "Message start failed"
                }
            }) { Text("Start message") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.sessionReplayStart()
                    status = if (ok == true) "Session replay started" else "Session replay failed"
                }
            }) { Text("Session replay start") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.sessionReplayStop()
                    status = if (ok == true) "Session replay stopped" else "Session replay stop failed"
                }
            }) { Text("Session replay stop") }

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
            }) { Text("Debug targeting") }

            Button(onClick = {
                scope.launch {
                    val ok = Screeb.closeSdk()
                    status = if (ok == true) "SDK closed" else "SDK close failed"
                }
            }) { Text("Close SDK") }
        }
    }
}
