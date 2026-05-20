import UIKit
import Screeb

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // Replace with your Screeb channel ID
        Screeb.initSdk(
            context: self,
            channelId: "<YOUR_CHANNEL_ID>"
        )

        return true
    }
}
