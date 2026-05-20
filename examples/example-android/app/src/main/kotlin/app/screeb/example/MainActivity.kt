package app.screeb.example

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import app.screeb.sdk.Screeb
import app.screeb.sdk.VisitorProperties
import java.util.Date

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Screeb.initSdk(
            this,
            "<channel-id>",
            "<unique-user-id>",          // optional
            VisitorProperties().apply {  // optional
                this["firstname"] = "<user-firstname>"
                this["lastname"] = "<user-lastname>"
                this["plan"] = "<user-plan>"
                this["age"] = 42
                this["logged_at"] = Date()
                this["authenticated"] = true
            },
            language = "en"             // optional
        )

        Screeb.handleDeepLink(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        Screeb.handleDeepLink(intent)
    }
}
