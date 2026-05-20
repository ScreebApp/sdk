import UIKit
import Screeb

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        Screeb.initSdk(
            context: nil,
            channelId: "<channel-id>",
            identity: "<user-id>",                                            // optional
            visitorProperty: ["age": AnyEncodable(12), "name": AnyEncodable("JohnDoe")], // optional
            language: "en"                                                    // optional
        )
        guard let _ = (scene as? UIWindowScene) else { return }
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        Screeb.handleDeepLink(url: URLContexts.first?.url)
    }
}
