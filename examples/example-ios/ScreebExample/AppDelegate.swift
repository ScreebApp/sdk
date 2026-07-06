import UIKit
import Screeb

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    /// Public demo channel — replace with your own (Screeb workspace → Settings → Channels).
    static let screebChannelId = "0e2b609a-8dce-4695-a80f-966fbfa87a88"

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        Screeb.initSdk(
            context: nil,
            channelId: AppDelegate.screebChannelId,
            identity: "ios-example-user",                       // optional
            visitorProperty: [                                  // optional
                "firstname": "Ada",
                "lastname": "Lovelace",
                "plan": "public-example",
                "authenticated": true,
            ],
            language: "en"                                      // optional
        )
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let configuration = UISceneConfiguration(name: nil, sessionRole: connectingSceneSession.role)
        configuration.delegateClass = SceneDelegate.self
        return configuration
    }
}
