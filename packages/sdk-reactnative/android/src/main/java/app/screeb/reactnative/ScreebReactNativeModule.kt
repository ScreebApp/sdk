package app.screeb.reactnative
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.HashMap
import app.screeb.sdk.Screeb
import app.screeb.sdk.InitOptions
import android.os.Handler
import android.os.Looper

@ReactModule(name = ScreebReactNativeModule.NAME)
class ScreebReactNativeModule(reactContext: ReactApplicationContext) :
  NativeScreebReactNativeSpec(reactContext) {

  override fun getName(): String = NAME


  override fun initSdk(
    channelId: String,
    userId: String?,
    properties: ReadableMap?,
    hooks: ReadableMap?,
    initOptions: ReadableMap?,
    language: String?,
    promise: Promise
  ) {
    Screeb.setSecondarySDK("react-native", "4.2.0")
    val mapHooks = makeHooks(hooks)

    Handler(Looper.getMainLooper()).post {
      Screeb.pluginInit(channelId, userId, fromReadableMap(properties), fromReadableMap(initOptions), mapHooks, language)
      promise.resolve(null)
    }
  }

  override fun setIdentity(userId: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.setIdentity(userId, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun setProperties(properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      fromReadableMap(properties)?.let { Screeb.setVisitorProperties(it) }
      promise.resolve(null)
    }
  }

  override fun assignGroup(type: String?, name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.assignGroup(type, name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun unassignGroup(type: String?, name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.unassignGroup(type, name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun trackEvent(name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.trackEvent(name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun trackScreen(name: String, properties: ReadableMap?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.trackScreen(name, fromReadableMap(properties))
      promise.resolve(null)
    }
  }

  override fun startSurvey(
    surveyId: String,
    allowMultipleResponses: Boolean?,
    hiddenFields: ReadableMap?,
    ignoreSurveyStatus: Boolean?,
    hooks: ReadableMap?,
    language: String?,
    distributionId: String?,
    promise: Promise
  ) {
    val mapHooks = makeHooks(hooks)

    Handler(Looper.getMainLooper()).post {
      Screeb.startSurvey(
        surveyId,
        allowMultipleResponses ?: true,
        fromReadableMap(hiddenFields),
        ignoreSurveyStatus ?: true,
        mapHooks,
        language,
        distributionId
      )
      promise.resolve(null)
    }
  }

  override fun startMessage(
    messageId: String,
    allowMultipleResponses: Boolean?,
    hiddenFields: ReadableMap?,
    ignoreMessageStatus: Boolean?,
    hooks: ReadableMap?,
    language: String?,
    distributionId: String?,
    promise: Promise
  ) {
    val mapHooks = makeHooks(hooks)

    Handler(Looper.getMainLooper()).post {
      Screeb.startMessage(
        messageId,
        allowMultipleResponses ?: true,
        fromReadableMap(hiddenFields),
        ignoreMessageStatus ?: true,
        mapHooks,
        language,
        distributionId
      )
      promise.resolve(null)
    }
  }

  override fun debug(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.debug { debugInfo, error ->
        if (error != null) {
          promise.reject("DEBUG_ERROR", error.message, error)
        } else {
          promise.resolve(debugInfo ?: "")
        }
      }
    }
  }

  override fun debugTargeting(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.debugTargeting { debugInfo, error ->
        if (error != null) {
          promise.reject("DEBUG_TARGETING_ERROR", error.message, error)
        } else {
          promise.resolve(debugInfo ?: "")
        }
      }
    }
  }

  override fun sessionReplayStart(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.sessionReplayStart()
      promise.resolve(null)
    }
  }

  override fun sessionReplayStop(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.sessionReplayStop()
      promise.resolve(null)
    }
  }

  override fun resetIdentity(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.resetIdentity()
      promise.resolve(null)
    }
  }

  override fun getIdentity(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.getIdentity { identity, error ->
        if (error != null) {
          promise.reject("GET_IDENTITY_ERROR", error.message, error)
        } else {
          promise.resolve(identity)
        }
      }
    }
  }

  override fun closeSdk(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.closeSdk()
      promise.resolve(null)
    }
  }

  override fun handleDeepLink(url: String, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.handleDeepLink(android.net.Uri.parse(url))
      promise.resolve(null)
    }
  }

  override fun closeSurvey(surveyId: String?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.closeSurvey(surveyId)
      promise.resolve(null)
    }
  }

  override fun closeMessage(messageId: String?, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.closeMessage(messageId)
      promise.resolve(null)
    }
  }

  override fun onHookResult(hookId: String, result: ReadableMap, promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      Screeb.onHookResult(hookId, result.toHashMap())
      promise.resolve(null)
    }
  }

  private fun fromReadableMap(readableMap: ReadableMap?): HashMap<String, Any?>? =
    readableMap?.toHashMap() as? HashMap<String, Any?>

  private fun makeHooks(hooks: ReadableMap?): HashMap<String, Any>? {
    if (hooks == null) return null

    val hookIds = hashMapOf<String, String>()
    val keys = hooks.keySetIterator()
    while (keys.hasNextKey()) {
      val key = keys.nextKey()
      val value = hooks.getString(key) ?: continue
      hookIds[key] = value
    }

    if (hookIds.isEmpty()) return null

    return Screeb.makeHooks(hookIds) { hookId, nativeHookId, payload ->
      emitHookEvent(hookId, nativeHookId, payload)
    }
  }

  private fun emitHookEvent(hookId: String, nativeHookId: String, payload: String) {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(
        "ScreebEvent",
        Arguments.createMap().apply {
          putString("hookId", hookId)
          putString("nativeHookId", nativeHookId)
          putString("payload", payload)
        }
      )
  }

  companion object {
    const val NAME = "ScreebReactNative"
  }
}
