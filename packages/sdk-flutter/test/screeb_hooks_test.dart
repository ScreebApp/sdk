import 'package:flutter_test/flutter_test.dart';
import 'package:plugin_screeb/plugin_screeb.dart';

void main() {
  setUp(() {
    PluginScreeb.hooksRegistry.clear();
  });

  tearDown(() {
    PluginScreeb.hooksRegistry.clear();
  });

  test('handleHooks forwards payload to the registered hook', () async {
    String? receivedPayload;
    PluginScreeb.hooksRegistry['wrapper-hook'] = (String payload) {
      receivedPayload = payload;
      return true;
    };

    final result = await PluginScreeb.handleHooks(
      'wrapper-hook',
      '{"hook_id":"native-hook"}',
    );

    expect(receivedPayload, '{"hook_id":"native-hook"}');
    expect(result, isTrue);
  });

  test('handleHooks awaits async hook results', () async {
    PluginScreeb.hooksRegistry['wrapper-hook'] = (String payload) async {
      await Future<void>.delayed(Duration.zero);
      return payload.contains('native-hook');
    };

    final result = await PluginScreeb.handleHooks(
      'wrapper-hook',
      '{"hook_id":"native-hook"}',
    );

    expect(result, isTrue);
  });

  test('handleHooks returns null when hook is not registered', () async {
    final result = await PluginScreeb.handleHooks(
      'missing-hook',
      '{"hook_id":"native-hook"}',
    );

    expect(result, isNull);
  });
}
