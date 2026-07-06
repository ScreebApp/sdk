import UIKit
import Screeb

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }
        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = ViewController()
        window.makeKeyAndVisible()
        self.window = window
        // Cold start from a deep link (app not running when the URL was opened).
        Screeb.handleDeepLink(url: connectionOptions.urlContexts.first?.url)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        // Screeb deep links (screeb-* scheme) — survey/message links open in-app.
        Screeb.handleDeepLink(url: URLContexts.first?.url)
    }
}
