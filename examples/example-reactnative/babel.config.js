const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../../packages/sdk-reactnative/package.json');

const root = path.resolve(__dirname, '../../packages/sdk-reactnative');

module.exports = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
  },
  { root, pkg }
);
