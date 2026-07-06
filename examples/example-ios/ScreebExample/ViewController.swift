import UIKit
import Screeb

/// Complete native iOS integration sample — one button per public SDK API,
/// mirroring examples/example-android.
final class ViewController: UIViewController {
    private let statusLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        buildLayout()
        setStatus("Screeb initialized with channel \(AppDelegate.screebChannelId)")
    }

    private func buildLayout() {
        let scroll = UIScrollView()
        scroll.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(scroll)

        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 10
        stack.translatesAutoresizingMaskIntoConstraints = false
        scroll.addSubview(stack)

        NSLayoutConstraint.activate([
            scroll.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scroll.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            scroll.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scroll.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            stack.topAnchor.constraint(equalTo: scroll.topAnchor, constant: 24),
            stack.bottomAnchor.constraint(equalTo: scroll.bottomAnchor, constant: -32),
            stack.leadingAnchor.constraint(equalTo: scroll.leadingAnchor, constant: 20),
            stack.trailingAnchor.constraint(equalTo: scroll.trailingAnchor, constant: -20),
            stack.widthAnchor.constraint(equalTo: scroll.widthAnchor, constant: -40),
        ])

        let title = UILabel()
        title.text = "Screeb iOS Example"
        title.font = .boldSystemFont(ofSize: 24)
        stack.addArrangedSubview(title)

        let subtitle = UILabel()
        subtitle.text = "A complete native iOS integration sample using the public Swift package."
        subtitle.font = .systemFont(ofSize: 15)
        subtitle.textColor = .secondaryLabel
        subtitle.numberOfLines = 0
        stack.addArrangedSubview(subtitle)

        statusLabel.font = .systemFont(ofSize: 15)
        statusLabel.textColor = .secondaryLabel
        statusLabel.numberOfLines = 0
        stack.addArrangedSubview(statusLabel)

        addAction(to: stack, "Set identity") {
            Screeb.setIdentity(
                uniqueVisitorId: "ios-example-user",
                visitorProperty: ["role": "tester", "source": "native-ios-example"]
            )
            self.setStatus("Identity sent")
        }
        addAction(to: stack, "Set visitor properties") {
            Screeb.visitorProperty(visitorProperty: ["company": "Screeb", "example_session": Date().timeIntervalSince1970])
            self.setStatus("Visitor properties sent")
        }
        addAction(to: stack, "Assign group") {
            Screeb.assignGroup(type: "company", name: "Screeb", properties: ["plan": "public-example", "source": "native-ios-example"])
            self.setStatus("Group assigned")
        }
        addAction(to: stack, "Unassign group") {
            Screeb.unassignGroup(type: "company", name: "Screeb", properties: ["source": "native-ios-example"])
            self.setStatus("Group unassigned")
        }
        addAction(to: stack, "Reset identity") {
            Screeb.resetIdentity()
            self.setStatus("Identity reset")
        }
        addAction(to: stack, "Get identity") {
            Screeb.getIdentity { identity, error in
                DispatchQueue.main.async {
                    self.setStatus(error?.localizedDescription ?? String(describing: identity))
                }
            }
        }
        addAction(to: stack, "Track event") {
            Screeb.trackEvent(name: "ios_example_button_clicked", trackingEventProperties: ["button": "track_event", "screen": "home"])
            self.setStatus("Event tracked")
        }
        addAction(to: stack, "Track screen") {
            Screeb.trackScreen(name: "iOS Example", trackingEventProperties: ["tab": "main"])
            self.setStatus("Screen tracked")
        }
        addAction(to: stack, "Start survey") {
            Screeb.startSurvey(
                surveyId: "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff",
                allowMultipleResponses: true,
                hiddenFields: ["example": "ios"],
                ignoreSurveyStatus: true
            )
            self.setStatus("Survey start requested")
        }
        addAction(to: stack, "Start message") {
            Screeb.startMessage(
                messageId: "642929b9-28f1-4cb5-b153-f482777e0003",
                allowMultipleResponses: true,
                hiddenFields: ["example": "ios"],
                ignoreMessageStatus: true
            )
            self.setStatus("Message start requested")
        }
        addAction(to: stack, "Session replay start") {
            Screeb.sessionReplayStart()
            self.setStatus("Session replay start requested")
        }
        addAction(to: stack, "Session replay stop") {
            Screeb.sessionReplayStop()
            self.setStatus("Session replay stop requested")
        }
        addAction(to: stack, "Debug SDK") {
            Screeb.debug { result, error in
                DispatchQueue.main.async {
                    self.setStatus(error?.localizedDescription ?? String(describing: result))
                }
            }
        }
        addAction(to: stack, "Debug targeting") {
            Screeb.debugTargeting { result, error in
                DispatchQueue.main.async {
                    self.setStatus(error?.localizedDescription ?? String(describing: result))
                }
            }
        }
        addAction(to: stack, "Close SDK") {
            Screeb.closeSdk()
            self.setStatus("SDK closed")
        }
    }

    private func addAction(to stack: UIStackView, _ label: String, handler: @escaping () -> Void) {
        let button = UIButton(type: .system)
        button.setTitle(label, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .medium)
        button.contentHorizontalAlignment = .leading
        button.addAction(UIAction { _ in handler() }, for: .touchUpInside)
        stack.addArrangedSubview(button)
    }

    private func setStatus(_ message: String) {
        statusLabel.text = "Status: \(message)"
    }
}
