import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plugin_screeb/plugin_screeb.dart';

void main() {
  testWidgets('ScreebMaskText adds the native mask marker', (tester) async {
    debugDefaultTargetPlatformOverride = TargetPlatform.android;

    await tester.pumpWidget(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: ScreebMaskText(child: Text('Secret')),
      ),
    );

    final semantics = tester.widget<Semantics>(find.byType(Semantics));

    expect(semantics.properties.identifier, 'screeb-mask-text');
    debugDefaultTargetPlatformOverride = null;
  });

  testWidgets('ScreebNoCapture adds the native no-capture marker', (tester) async {
    debugDefaultTargetPlatformOverride = TargetPlatform.iOS;

    await tester.pumpWidget(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: ScreebNoCapture(child: Text('Hidden')),
      ),
    );

    final semantics = tester.widget<Semantics>(find.byType(Semantics));

    expect(semantics.properties.identifier, 'screebNoCapture');
    debugDefaultTargetPlatformOverride = null;
  });

  testWidgets('ScreebId prefixes stable element IDs', (tester) async {
    await tester.pumpWidget(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: ScreebId('checkout_button', child: Text('Checkout')),
      ),
    );

    final semantics = tester.widget<Semantics>(find.byType(Semantics));

    expect(semantics.properties.identifier, 'screebId:checkout_button');
  });
}
