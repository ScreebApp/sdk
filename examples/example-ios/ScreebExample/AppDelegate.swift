import UIKit
import Screeb

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        Screeb.initSdk(
            context: nil,
            channelId: "<channel-id>",
            identity: "<user-id>",                                            // optional
            visitorProperty: ["age": AnyEncodable(12), "name": AnyEncodable("JohnDoe")], // optional
            language: "en"                                                    // optional
        )
        return true
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        Screeb.handleDeepLink(url: url)
        return true
    }
}
