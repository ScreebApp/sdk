import UIKit
import ComposeApp
import Screeb

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        let window = UIWindow(frame: UIScreen.main.bounds)
        window.rootViewController = MainViewControllerKt.MainViewController()
        window.makeKeyAndVisible()
        self.window = window
        // Cold start from a deep link (app not running when the URL was opened).
        Screeb.handleDeepLink(url: launchOptions?[.url] as? URL)
        return true
    }

    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey: Any] = [:]
    ) -> Bool {
        // Screeb deep links (screeb-* scheme) — editor/survey/message links open in-app.
        Screeb.handleDeepLink(url: url)
        return true
    }
}
