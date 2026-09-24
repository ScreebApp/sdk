import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plugin_screeb/plugin_screeb.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  const channel = MethodChannel('plugin_screeb');
  final calls = <MethodCall>[];

  setUp(() {
    calls.clear();
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, (MethodCall call) async {
      calls.add(call);
      return true;
    });
  });

  tearDown(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, null);
  });

  test('setAnonymousId relays the id to the native side', () async {
    final result = await PluginScreeb.setAnonymousId('amplitude-device-id');

    expect(result, isTrue);
    expect(calls, hasLength(1));
    expect(calls.single.method, 'setAnonymousId');
    expect(calls.single.arguments, ['amplitude-device-id']);
  });
}
