import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

class PluginScreeb {
  static const MethodChannel _channel = MethodChannel('plugin_screeb');

  static Map<String, Function> hooksRegistry = <String, Function>{};

  static Map<String, String>? _buildHooksMap(Map<String, dynamic>? hooks) {
    if (hooks == null) {
      return null;
    }

    final mapHooksId = <String, String>{};
    hooks.forEach((key, value) {
      if (key == "version") {
        mapHooksId[key] = value.toString();
      } else {
        final uuid = UniqueKey().toString() + key;
        hooksRegistry[uuid] = value;
        mapHooksId[key] = uuid;
      }
    });
    return mapHooksId;
  }

  /// Provides a way to initialize the SDK with a specific channel ID
  ///
  /// Call this method first elsewhere subsequent calls will fail
  /// Providing a [channelId] is mandatory, please visit your account to find
  /// the identifiers
  static Future<bool?> initSdk(String channelId,
      {String? userId,
      Map<String, dynamic>? properties,
      Map<String, dynamic>? initOptions,
      Map<String, dynamic>? hooks,
      String? language}) {
    _channel.setMethodCallHandler(channelHandler);

    final mapHooksId = _buildHooksMap(hooks);

    return _channel.invokeMethod('initSdk', [
      channelId,
      userId,
      _formatDates(properties),
      initOptions,
      mapHooksId,
      language,
    ]);
  }

  /// Provides an id for the user of the app with optional [properties]
  ///
  /// Providing a [userId] is important to sharpen the Screeb targeting engine
  /// and avoid survey triggering more than necessary.
  static Future<bool?> setIdentity(String userId,
          {Map<String, dynamic>? properties}) =>
      _channel.invokeMethod('setIdentity', [userId, _formatDates(properties)]);

  /// Send to Screeb backend the user's custom [properties]
  ///
  /// This api call is important to trigger a survey where the targeting is
  /// configured using visitor properties parameters.
  static Future<bool?> setProperties(Map<String, dynamic>? properties) =>
      _channel.invokeMethod('setProperty', [_formatDates(properties)]);

  /// Deprecated alias for [setProperties].
  @Deprecated('Use setProperties instead.')
  static Future<bool?> setProperty(Map<String, dynamic>? properties) =>
      setProperties(properties);

  /// Send to Screeb backend a group assignation for current user [properties]
  ///
  /// This api call is important to improve analysis.
  static Future<bool?> assignGroup(String? groupType, String groupName,
          {Map<String, dynamic>? properties}) =>
      _channel.invokeMethod(
          'assignGroup', [groupType, groupName, _formatDates(properties)]);

  /// Send to Screeb backend a group unassignation for current user [properties]
  ///
  /// This api call is important to improve analysis.
  static Future<bool?> unassignGroup(String? groupType, String groupName,
          Map<String, dynamic>? properties) =>
      _channel.invokeMethod(
          'unassignGroup', [groupType, groupName, _formatDates(properties)]);

  /// Send to Screeb backend a tracking [eventId] with optional [properties]
  static Future<bool?> trackEvent(String eventId,
          {Map<String, dynamic>? properties}) =>
      _channel.invokeMethod('trackEvent', [eventId, _formatDates(properties)]);

  /// Send to Screeb backend a tracking [screen] name with optional [properties]
  ///
  /// This api call is important to trigger a survey where the targeting is
  /// configured using screens parameters.
  static Future<bool?> trackScreen(String screen,
          {Map<String, dynamic>? properties}) =>
      _channel.invokeMethod('trackScreen', [screen, _formatDates(properties)]);

  /// Provide a way to start a survey with a specific [surveyId]
  ///
  /// You can provide optional [properties] to sharpen targeting rules
  /// You can also provide [hooks] to handle survey events
  static Future<bool?> startSurvey(
    String surveyId, {
    bool allowMultipleResponses = true,
    Map<String, dynamic>? properties,
    bool ignoreSurveyStatus = true,
    Map<String, dynamic>? hooks,
    String? language,
    String? distributionId,
  }) {
    final mapHooksId = _buildHooksMap(hooks);

    return _channel.invokeMethod('startSurvey', [
      surveyId,
      allowMultipleResponses,
      _formatDates(properties),
      ignoreSurveyStatus,
      mapHooksId,
      language,
      distributionId
    ]);
  }

  /// Provide a way to start a message with a specific [messageId]
  ///
  /// You can provide optional [properties] to sharpen targeting rules
  /// You can also provide [hooks] to handle message events
  static Future<bool?> startMessage(
    String messageId, {
    bool allowMultipleResponses = true,
    Map<String, dynamic>? properties,
    bool ignoreMessageStatus = true,
    Map<String, dynamic>? hooks,
    String? language,
    String? distributionId,
  }) {
    final mapHooksId = _buildHooksMap(hooks);

    return _channel.invokeMethod('startMessage', [
      messageId,
      allowMultipleResponses,
      _formatDates(properties),
      ignoreMessageStatus,
      mapHooksId,
      language,
      distributionId
    ]);
  }

  ///Provide a way to stop the SDK
  ///
  ///Its the opposite of initSdk
  static Future<bool?> closeSdk() => _channel.invokeMethod('closeSdk', []);

  ///Provide a way to close the survey
  ///
  ///Its the opposite of startSurvey
  static Future<bool?> closeSurvey({String? surveyId}) =>
      _channel.invokeMethod('closeSurvey', [surveyId]);

  ///Provide a way to close the message
  ///
  ///Its the opposite of startMessage
  static Future<bool?> closeMessage({String? messageId}) =>
      _channel.invokeMethod('closeMessage', [messageId]);

  ///Provide a way to start session replay recording
  static Future<bool?> sessionReplayStart() =>
      _channel.invokeMethod('sessionReplayStart', []);

  ///Provide a way to stop session replay recording
  ///
  ///Its the opposite of sessionReplayStart
  static Future<bool?> sessionReplayStop() =>
      _channel.invokeMethod('sessionReplayStop', []);

  ///Provide a way to reset the identity of the user
  ///
  ///You can use it on the disconnection of a user for example to make it anonymous
  static Future<bool?> resetIdentity() =>
      _channel.invokeMethod('resetIdentity', []);

  /// Provides a way to get the current visitor identity
  static Future<Map<String, dynamic>?> getIdentity() async {
    final result = await _channel.invokeMethod('getIdentity', []);
    if (result is Map) {
      return Map<String, dynamic>.from(result);
    }
    return null;
  }

  ///Provide a way to get various debug informations
  static Future<String?> debug() async {
    final result = await _channel.invokeMethod('debug', []);
    return result as String?;
  }

  ///Provide a way to debug targeting rules
  ///
  ///If you don't know why your survey isn't showing you can use this command to print debug log
  static Future<String?> debugTargeting() async {
    final result = await _channel.invokeMethod('debugTargeting', []);
    return result as String?;
  }

  // Channel handler
  static Future<dynamic> channelHandler(MethodCall methodCall) async {
    switch (methodCall.method) {
      case "handleHooks":
        return handleHooks(
            methodCall.arguments["hookId"], methodCall.arguments["payload"]);
      default:
        throw Exception("Method not implemented");
    }
  }

  // Handle hooks callback
  static Future<dynamic> handleHooks(dynamic hookId, dynamic payload) async {
    if (hooksRegistry.containsKey(hookId)) {
      Function? hook = hooksRegistry[hookId];
      if (hook != null) {
        final result = hook(payload);
        return result;
      }
    }
  }

  /// Format payloads so DateTime properties are correctly interpreted by the SDK
  static Map<String, dynamic>? _formatDates(Map<String, dynamic>? properties) {
    final formatted = _formatValue(properties);
    return formatted is Map<String, dynamic> ? formatted : null;
  }

  static dynamic _formatValue(dynamic value) {
    if (value is DateTime) {
      return _formatDateTime(value);
    }
    if (value is Map) {
      return value.map((key, nestedValue) =>
          MapEntry(key.toString(), _formatValue(nestedValue)));
    }
    if (value is Iterable) {
      return value.map(_formatValue).toList();
    }
    return value;
  }

  static String _formatDateTime(DateTime value) {
    final offset = value.timeZoneOffset;
    final sign = offset.isNegative ? '-' : '+';
    final absOffset = offset.abs();
    final offsetHours = absOffset.inHours.toString().padLeft(2, '0');
    final offsetMinutes = (absOffset.inMinutes % 60).toString().padLeft(2, '0');
    final localValue = value.isUtc ? value : value.toLocal();
    String two(int number) => number.toString().padLeft(2, '0');
    String three(int number) => number.toString().padLeft(3, '0');

    return '${localValue.year.toString().padLeft(4, '0')}-'
        '${two(localValue.month)}-'
        '${two(localValue.day)}T'
        '${two(localValue.hour)}:'
        '${two(localValue.minute)}:'
        '${two(localValue.second)}.'
        '${three(localValue.millisecond)}'
        '$sign$offsetHours:$offsetMinutes';
  }
}

/// Marks [child] as sensitive in Screeb session replay.
///
/// The underlying native SDK masks the view instead of recording its content.
class ScreebMaskText extends StatelessWidget {
  const ScreebMaskText({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      identifier: _screebPlatformMarker(
        android: 'screeb-mask-text',
        ios: 'screebMaskText',
      ),
      container: true,
      child: child,
    );
  }
}

/// Excludes [child] from Screeb session replay capture.
class ScreebNoCapture extends StatelessWidget {
  const ScreebNoCapture({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      identifier: _screebPlatformMarker(
        android: 'screeb-no-capture',
        ios: 'screebNoCapture',
      ),
      container: true,
      child: child,
    );
  }
}

/// Sets a stable Screeb element ID on [child] for IAM targeting.
class ScreebId extends StatelessWidget {
  const ScreebId(this.id, {Key? key, required this.child}) : super(key: key);

  final String id;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      identifier: 'screebId:$id',
      container: true,
      child: child,
    );
  }
}

String _screebPlatformMarker({
  required String android,
  required String ios,
}) {
  switch (defaultTargetPlatform) {
    case TargetPlatform.android:
      return android;
    case TargetPlatform.iOS:
      return ios;
    case TargetPlatform.fuchsia:
    case TargetPlatform.linux:
    case TargetPlatform.macOS:
    case TargetPlatform.windows:
      return ios;
  }
}
