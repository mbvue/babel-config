## Vendor
Babel Preset Config.

## Installation
yarn add -D @mbvue/babel-preset-config

## Usage
babel.config.js：

module.exports = {
  presets: ['@mbvue/babel-preset-config']
};

module.exports = {
  presets: [['@mbvue/babel-preset-config', { modules: 'commonjs' }]]
};

## Browsers
require('@mbvue/babel-preset-config/browsers')