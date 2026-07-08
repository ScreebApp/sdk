import 'package:flutter/material.dart';
import 'package:plugin_screeb/plugin_screeb.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();

    _initSdk();
  }

  void _initSdk() {
    PluginScreeb.initSdk(
      "0e2b609a-8dce-4695-a80f-966fbfa87a88",
      userId: "dev@screeb.app",
      properties: <String, dynamic>{
        'isConnected': false,
        'age': 29,
        'product': 'iPhone 13',
        'email': 'dev@screeb.app',
        'born': DateTime.now(),
      },
      hooks: <String, dynamic>{
        "version": "1.0.0",
        "onReady": (dynamic data) {
          debugPrint("onReady");
          debugPrint(data.toString());
        },
      },
    );
    debugPrint("InitSdk");
  }

  void _setIdentity(String userId, Map<String, dynamic>? properties) {
    PluginScreeb.setIdentity(userId, properties: properties);
    debugPrint("SetIdentity");
  }

  void _visitorProperty(Map<String, dynamic>? properties) {
    PluginScreeb.setProperties(properties);
    debugPrint("SetIdentityProperties");
  }

  void _sendAssignGroup(
    String? groupType,
    String groupName,
    Map<String, dynamic>? properties,
  ) {
    PluginScreeb.assignGroup(groupType, groupName, properties: properties);
    debugPrint("AssignGroup");
  }

  void _sendUnassignGroup(
    String? groupType,
    String groupName,
    Map<String, dynamic>? properties,
  ) {
    PluginScreeb.unassignGroup(groupType, groupName, properties);
    debugPrint("UnassignGroup");
  }

  void _sendTrackingEvent(String eventId, Map<String, dynamic>? properties) {
    PluginScreeb.trackEvent(eventId, properties: properties);
    debugPrint("TrackingEvent");
  }

  void _sendTrackingScreen(String screen, Map<String, dynamic>? properties) {
    PluginScreeb.trackScreen(screen, properties: properties);
    debugPrint("TrackingScreen");
  }

  void _startSurvey(
    String surveyId,
    bool allowMultiple,
    Map<String, dynamic>? hooks,
  ) {
    PluginScreeb.startSurvey(
      surveyId,
      allowMultipleResponses: allowMultiple,
      hooks: hooks,
    );
    debugPrint("StartSurvey");
  }

  void _startMessage(
    String messageId,
    bool allowMultiple,
    Map<String, dynamic>? hooks,
  ) {
    PluginScreeb.startMessage(
      messageId,
      allowMultipleResponses: allowMultiple,
      hooks: hooks,
    );
    debugPrint("StartMessage");
  }

  void _sessionReplayStart() {
    PluginScreeb.sessionReplayStart();
    debugPrint("SessionReplayStart");
  }

  void _sessionReplayStop() {
    PluginScreeb.sessionReplayStop();
    debugPrint("SessionReplayStop");
  }

  void _closeSdk() {
    PluginScreeb.closeSdk();
    debugPrint("CloseSdk");
  }

  void _resetIdentity() {
    PluginScreeb.resetIdentity();
    debugPrint("ResetIdentity");
  }

  void _getIdentity() async {
    try {
      final identity = await PluginScreeb.getIdentity();
      debugPrint("getIdentity: $identity");
    } catch (e) {
      debugPrint("getIdentity error: $e");
    }
  }

  void _debug() async {
    try {
      final debugInfo = await PluginScreeb.debug();
      debugPrint("debug: $debugInfo");
    } catch (e) {
      debugPrint("debug error: $e");
    }
  }

  void _debugTargeting() async {
    try {
      final debugInfo = await PluginScreeb.debugTargeting();
      debugPrint("debugTargeting: $debugInfo");
    } catch (e) {
      debugPrint("debugTargeting error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Plugin example app')),
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                const Text("Screeb Commands"),
                ElevatedButton(
                  child: const Text('Init SDK'),
                  onPressed: () => _initSdk(),
                ),
                ElevatedButton(
                  child: const Text('Set identity'),
                  onPressed:
                      () => _setIdentity('iosflutterId', <String, dynamic>{
                        'isConnected': false,
                        'age': 29,
                        'product': 'iPhone 13',
                      }),
                ),
                ElevatedButton(
                  child: const Text('Set visitor properties'),
                  onPressed:
                      () => _visitorProperty(<String, dynamic>{
                        'isConnected': false,
                        'age': 29,
                        'product': 'iPhone 13',
                      }),
                ),
                ElevatedButton(
                  child: const Text('Assign group'),
                  onPressed: () => _sendAssignGroup(null, "Apple", {}),
                ),
                ElevatedButton(
                  child: const Text('Unassign group'),
                  onPressed: () => _sendUnassignGroup(null, "Apple", {}),
                ),
                ElevatedButton(
                  child: const Text('Reset identity'),
                  onPressed: () => _resetIdentity(),
                ),
                ElevatedButton(
                  child: const Text('Get identity'),
                  onPressed: () => _getIdentity(),
                ),
                ElevatedButton(
                  child: const Text('Track event'),
                  onPressed:
                      () => _sendTrackingEvent("eventId", <String, dynamic>{
                        'isConnected': true,
                        'age': 27,
                        'company': 'Screeb',
                        'technology': 'iOS',
                        'flutterAccount': true,
                      }),
                ),
                ElevatedButton(
                  child: const Text('Track screen'),
                  onPressed:
                      () => _sendTrackingScreen("Settings", <String, dynamic>{
                        'isConnected': true,
                        'age': 28,
                        'company': 'Screeb',
                        'technology': 'Android',
                        'flutterAccount': false,
                      }),
                ),
                ElevatedButton(
                  child: const Text('Start survey'),
                  onPressed:
                      () => _startSurvey(
                        "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff",
                        true,
                        <String, dynamic>{
                          "version": "1.0.0",
                          "onSurveyShowed": (dynamic data) {
                            debugPrint("onSurveyShowed");
                            debugPrint(data.toString());
                          },
                          "onQuestionReplied": (dynamic data) {
                            debugPrint("onQuestionReplied");
                            debugPrint(data.toString());
                          },
                        },
                      ),
                ),
                ElevatedButton(
                  child: const Text('Start message'),
                  onPressed:
                      () => _startMessage(
                        "642929b9-28f1-4cb5-b153-f482777e0003",
                        true,
                        <String, dynamic>{
                          "version": "1.0.0",
                          "onMessageShowed": (dynamic data) {
                            debugPrint("onMessageShowed");
                            debugPrint(data.toString());
                          },
                        },
                      ),
                ),
                ElevatedButton(
                  child: const Text('Session replay start'),
                  onPressed: () => _sessionReplayStart(),
                ),
                ElevatedButton(
                  child: const Text('Session replay stop'),
                  onPressed: () => _sessionReplayStop(),
                ),
                ElevatedButton(
                  child: const Text('Debug SDK'),
                  onPressed: () => _debug(),
                ),
                ElevatedButton(
                  child: const Text('Debug targeting'),
                  onPressed: () => _debugTargeting(),
                ),
                ElevatedButton(
                  child: const Text('Close SDK'),
                  onPressed: () => _closeSdk(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
