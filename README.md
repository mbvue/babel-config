## Vendor
Babel Preset Config.

## Installation
```bash
yarn add -D @mbvue/babel-preset-config
```

## Usage
babel.config.js：

```js
module.exports = {
  presets: ['@mbvue/babel-preset-config']
};

#OR

module.exports = {
  presets: [['@mbvue/babel-preset-config', { modules: 'commonjs' }]]
};
```

## Browsers
```js
require('@mbvue/babel-preset-config/browsers')
```