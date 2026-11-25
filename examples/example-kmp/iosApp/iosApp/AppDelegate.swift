import UIKit
import ComposeApp
import Screeb

@main
class AppDelegate: UIResponder, UIApplicationDelegate {}

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(
        _ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions
    ) {
        guard let windowScene = scene as? UIWindowScene else { return }
        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = MainViewControllerKt.MainViewController()
        window.makeKeyAndVisible()
        self.window = window
        // Cold start from a deep link (app not running when the URL was opened).
        Screeb.handleDeepLink(url: connectionOptions.urlContexts.first?.url)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        // Screeb deep links (screeb-* scheme): editor/survey/message links open in-app.
        URLContexts.forEach { Screeb.handleDeepLink(url: $0.url) }
    }
}
