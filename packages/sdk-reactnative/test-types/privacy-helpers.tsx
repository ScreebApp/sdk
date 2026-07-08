import { View } from 'react-native';
import { ScreebId, ScreebMaskText, ScreebNoCapture } from '../src';

export const privacyHelperNodes = [
  <ScreebMaskText key="mask">
    <View />
  </ScreebMaskText>,
  <ScreebNoCapture key="no-capture">
    <View />
  </ScreebNoCapture>,
  <ScreebId key="id" id="checkout_button">
    <View />
  </ScreebId>,
];
