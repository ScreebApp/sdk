import Screeb
import React
import UIKit
import Foundation

@objc(ScreebReactNative)
class ScreebReactNative: RCTEventEmitter {
  private var hasListeners = false
  private var pendingEvents: [[String: Any]] = []

  override func startObserving() {
    hasListeners = true
    flushPendingEventsIfPossible()
  }

  override func stopObserving() {
    hasListeners = false
  }

  @objc(initSdk:userId:properties:hooks:initOptions:language:resolve:reject:)
  func initSdk(
      _ channelId: String,
      userId userId_: String?,
      properties properties_: [String: Any]?,
      hooks hooks_: [String: Any]?,
      initOptions initOptions_: [String: Any]?,
      language language_: String?,
      resolve: @escaping RCTPromiseResolveBlock,
      reject: @escaping RCTPromiseRejectBlock
    ) {
    Screeb.setSecondarySDK(name: "react-native", version: "4.0.3")
    let mapHooks = makeHooks(hooks_)

    let initOptionsDict: NSDictionary = NSDictionary(dictionary: (initOptions_ ?? [:]).compactMapValues { $0 })
    let initOptionsFinal = InitOptions(dict: initOptionsDict)
    DispatchQueue.main.async {
      Screeb.initSdk(context: nil, channelId: channelId, identity: userId_, visitorProperty: properties_ ?? [:], initOptions: initOptionsFinal, hooks: mapHooks, language: language_)
      resolve(nil)
    }
  }

  @objc func setIdentity(_ userId: String, properties properties_: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.setIdentity(uniqueVisitorId: userId, visitorProperty: properties_ ?? [:])
      resolve(nil)
    }
  }

  @objc func trackEvent(_ eventId: String, properties properties_: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.trackEvent(name: eventId, trackingEventProperties: properties_ ?? [:])
      resolve(nil)
    }
  }

  @objc func trackScreen(_ screen: String, properties properties_: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.trackScreen(name: screen, trackingEventProperties: properties_ ?? [:])
      resolve(nil)
    }
  }

  @objc(setProperties:resolve:reject:)
  func setVisitorPropertiesImpl(_ properties: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.visitorProperty(visitorProperty: properties ?? [:])
      resolve(nil)
    }
  }

  @objc func startSurvey(_ surveyId: String, allowMultipleResponses allowMultipleResponses_: Bool, hiddenFields hiddenFields_: [String: Any]?,ignoreSurveyStatus ignoreSurveyStatus_: Bool, hooks hooks_: [String: Any]?, language language_: String?, distributionId distributionId_: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let mapHooks = makeHooks(hooks_)
    DispatchQueue.main.async {
      Screeb.startSurvey(surveyId: surveyId, allowMultipleResponses: allowMultipleResponses_, hiddenFields: hiddenFields_ ?? [:], ignoreSurveyStatus: ignoreSurveyStatus_, hooks: mapHooks, language: language_, distributionId: distributionId_)
      resolve(nil)
    }
  }

  @objc func startMessage(_ messageId: String, allowMultipleResponses allowMultipleResponses_: Bool, hiddenFields hiddenFields_: [String: Any]?, ignoreMessageStatus ignoreMessageStatus_: Bool, hooks hooks_: [String: Any]?, language language_: String?, distributionId distributionId_: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let mapHooks = makeHooks(hooks_)
    DispatchQueue.main.async {
      Screeb.startMessage(messageId: messageId, allowMultipleResponses: allowMultipleResponses_, hiddenFields: hiddenFields_ ?? [:], ignoreMessageStatus: ignoreMessageStatus_, hooks: mapHooks, language: language_, distributionId: distributionId_)
      resolve(nil)
    }
  }

  @objc func assignGroup(_ type: String?, name name_: String, properties properties_: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.assignGroup(type: type, name: name_, properties: properties_ ?? [:])
      resolve(nil)
    }
  }

  @objc func unassignGroup(_ type: String?, name name_: String, properties properties_: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.unassignGroup(type: type, name: name_, properties: properties_ ?? [:])
      resolve(nil)
    }
  }

  @objc func resetIdentity(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.resetIdentity()
      resolve(nil)
    }
  }

  @objc func closeSdk(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.closeSdk()
      resolve(nil)
    }
  }

  @objc func handleDeepLink(_ url: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.handleDeepLink(url: URL(string: url))
      resolve(nil)
    }
  }

  @objc func closeSurvey(_ surveyId: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.closeSurvey(surveyId: surveyId)
      resolve(nil)
    }
  }

  @objc func closeMessage(_ messageId: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.closeMessage(messageId: messageId)
      resolve(nil)
    }
  }

  @objc func onHookResult(_ hookId: String, payload: [String: Any]?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if payload != nil {
        Screeb.onHookResult(hookId, payload!["result"])
      }
      resolve(nil)
    }
  }

  @objc func debug(_ resolve: @escaping RCTPromiseResolveBlock,
                   reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.debug { debugInfo, error in
        if let error = error {
          reject("DEBUG_ERROR", error.localizedDescription, error)
        } else {
          resolve(debugInfo ?? "")
        }
      }
    }
  }

  @objc func debugTargeting(_ resolve: @escaping RCTPromiseResolveBlock,
                            reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.debugTargeting { debugInfo, error in
        if let error = error {
          reject("DEBUG_TARGETING_ERROR", error.localizedDescription, error)
        } else {
          resolve(debugInfo ?? "")
        }
      }
    }
  }

  @objc func sessionReplayStart(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.sessionReplayStart()
      resolve(nil)
    }
  }

  @objc func sessionReplayStop(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      Screeb.sessionReplayStop()
      resolve(nil)
    }
  }

  @objc func getIdentity(_ resolve: @escaping RCTPromiseResolveBlock,
                         reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      Screeb.getIdentity { identity, error in
        if let error = error {
          reject("GET_IDENTITY_ERROR", error.localizedDescription, error)
        } else {
          resolve(identity)
        }
      }
    }
  }

  private func makeHooks(_ hooks: [String: Any]?) -> [String: Any]? {
    guard let hooks else { return nil }

    var hookIds: [String: String] = [:]
    hooks.forEach { hook in
      if let value = hook.value as? String {
        hookIds[hook.key] = value
      }
    }

    guard !hookIds.isEmpty else { return nil }

    return Screeb.makeHooks(hookIds) { [weak self] hookId, nativeHookId, payload in
      self?.emitHookEvent(hookId: hookId, nativeHookId: nativeHookId, payload: payload)
    }
  }

  private func emitHookEvent(hookId: String, nativeHookId: String, payload: String) {
    let body: [String: Any] = ["hookId": hookId, "nativeHookId": nativeHookId, "payload": payload]

    let sendBlock = { [weak self] in
      guard let self else { return }
      if self.hasListeners, self.callableJSModules != nil {
        self.sendEvent(withName: "ScreebEvent", body: body)
      } else {
        self.pendingEvents.append(body)
      }
    }

    if Thread.isMainThread {
      sendBlock()
      flushPendingEventsIfPossible()
    } else {
      DispatchQueue.main.async {
        sendBlock()
        self.flushPendingEventsIfPossible()
      }
    }
  }

  private func flushPendingEventsIfPossible() {
    guard hasListeners, callableJSModules != nil, !pendingEvents.isEmpty else { return }

    let events = pendingEvents
    pendingEvents.removeAll()

    let flushBlock = { [weak self] in
      guard let self else { return }
      events.forEach { self.sendEvent(withName: "ScreebEvent", body: $0) }
    }

    if Thread.isMainThread {
      flushBlock()
    } else {
      DispatchQueue.main.async(execute: flushBlock)
    }
  }

  override func supportedEvents() -> [String]! {
    return ["ScreebEvent"]
  }
}
