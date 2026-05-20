package app.screeb.example

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import app.screeb.sdk.Screeb

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Replace with your Screeb channel ID
        Screeb.initSdk(
            context = this,
            channelId = "<YOUR_CHANNEL_ID>"
        )
    }
}
