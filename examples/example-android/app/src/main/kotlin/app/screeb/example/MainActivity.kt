package app.screeb.example

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import app.screeb.sdk.InitOptions
import app.screeb.sdk.Screeb

class MainActivity : Activity() {
    private lateinit var status: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(createContentView())

        requestOptionalMediaPermissions()
        initializeScreeb()
        Screeb.handleDeepLink(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        Screeb.handleDeepLink(intent)
        setStatus("Deep link handled")
    }

    private fun initializeScreeb() {
        val visitorProperties = hashMapOf<String, Any?>(
            "firstname" to "Ada",
            "lastname" to "Lovelace",
            "plan" to "public-example",
            "authenticated" to true,
        )

        Screeb.initSdk(
            context = this,
            channelId = SCREEB_CHANNEL_ID,
            visitorId = "android-example-user",
            visitorProperties = visitorProperties,
            initOptions = InitOptions(isDebugMode = false, disableMirror = false),
            hooks = null,
            language = "en",
        )

        setStatus("Screeb initialized with channel $SCREEB_CHANNEL_ID")
    }

    private fun createContentView(): View {
        val density = resources.displayMetrics.density
        val root = ScrollView(this)
        val content = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding((20 * density).toInt(), (24 * density).toInt(), (20 * density).toInt(), (32 * density).toInt())
        }
        root.addView(content)

        content.addView(title("Screeb Android Example"))
        content.addView(body("A complete native Android integration sample using the public Maven artifact."))

        status = body("Starting...")
        content.addView(status)

        content.addView(action("Init SDK") {
            initializeScreeb()
        })

        content.addView(action("Set identity") {
            Screeb.setIdentity(
                "android-example-user",
                hashMapOf("role" to "tester", "source" to "native-android-example"),
            )
            setStatus("Identity sent")
        })

        content.addView(action("Set visitor properties") {
            Screeb.setVisitorProperties(
                hashMapOf("company" to "Screeb", "example_session" to System.currentTimeMillis()),
            )
            setStatus("Visitor properties sent")
        })

        content.addView(action("Assign group") {
            Screeb.assignGroup(
                "company",
                "Screeb",
                hashMapOf("plan" to "public-example", "source" to "native-android-example"),
            )
            setStatus("Group assigned")
        })

        content.addView(action("Unassign group") {
            Screeb.unassignGroup(
                "company",
                "Screeb",
                hashMapOf("source" to "native-android-example"),
            )
            setStatus("Group unassigned")
        })

        content.addView(action("Reset identity") {
            Screeb.resetIdentity()
            setStatus("Identity reset")
        })

        content.addView(action("Get identity") {
            Screeb.getIdentity { identity, error ->
                runOnUiThread {
                    setStatus(error?.message ?: identity.toString())
                }
            }
        })

        content.addView(action("Track event") {
            Screeb.trackEvent(
                "android_example_button_clicked",
                hashMapOf("button" to "track_event", "screen" to "home"),
            )
            setStatus("Event tracked")
        })

        content.addView(action("Track screen") {
            Screeb.trackScreen("Android Example", hashMapOf("tab" to "main"))
            setStatus("Screen tracked")
        })

        content.addView(action("Start survey") {
            Screeb.startSurvey(
                surveyId = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff",
                allowMultipleResponses = true,
                hiddenFields = hashMapOf("example" to "android"),
                ignoreSurveyStatus = true,
                hooks = null,
                language = "en",
                distributionId = null,
            )
            setStatus("Survey start requested")
        })

        content.addView(action("Start message") {
            Screeb.startMessage(
                messageId = "642929b9-28f1-4cb5-b153-f482777e0003",
                allowMultipleResponses = true,
                hiddenFields = hashMapOf("example" to "android"),
                ignoreMessageStatus = true,
                hooks = null,
                language = "en",
                distributionId = null,
            )
            setStatus("Message start requested")
        })

        content.addView(action("Session replay start") {
            Screeb.sessionReplayStart()
            setStatus("Session replay start requested")
        })

        content.addView(action("Session replay stop") {
            Screeb.sessionReplayStop()
            setStatus("Session replay stop requested")
        })

        content.addView(action("Debug SDK") {
            Screeb.debug { result, error ->
                runOnUiThread {
                    setStatus(error?.message ?: result.ifBlank { "Debug command sent" })
                }
            }
        })

        content.addView(action("Debug targeting") {
            Screeb.debugTargeting { result, error ->
                runOnUiThread {
                    setStatus(error?.message ?: result.ifBlank { "Targeting debug command sent" })
                }
            }
        })

        content.addView(action("Close SDK") {
            Screeb.closeSdk()
            setStatus("SDK closed")
        })

        return root
    }

    private fun title(text: String): TextView =
        TextView(this).apply {
            this.text = text
            textSize = 24f
            setTextColor(0xFF111827.toInt())
            setPadding(0, 0, 0, 20)
        }

    private fun body(text: String): TextView =
        TextView(this).apply {
            this.text = text
            textSize = 15f
            setTextColor(0xFF374151.toInt())
            setPadding(0, 0, 0, 18)
        }

    private fun action(label: String, onClick: () -> Unit): Button =
        Button(this).apply {
            text = label
            isAllCaps = false
            setOnClickListener {
                try {
                    onClick()
                } catch (e: Exception) {
                    setStatus("Error: ${e.message ?: e.javaClass.simpleName}")
                }
            }
        }

    private fun setStatus(message: String) {
        status.text = "Status: $message"
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun requestOptionalMediaPermissions() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return
        val permissions = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO,
        ).filter { checkSelfPermission(it) != PackageManager.PERMISSION_GRANTED }

        if (permissions.isNotEmpty()) {
            requestPermissions(permissions.toTypedArray(), REQUEST_MEDIA_PERMISSIONS)
        }
    }

    private companion object {
        const val SCREEB_CHANNEL_ID = "0e2b609a-8dce-4695-a80f-966fbfa87a88"
        const val REQUEST_MEDIA_PERMISSIONS = 42
    }
}
