## Vendor
Babel Preset Config.

## Installation
```bash
yarn add -D @mbvue/babel-preset-config
```

## Usage
babel.config.js：

```js
//Vue3
module.exports = {
  presets: ['@mbvue/babel-preset-config']
};

#OR

//Vue2
module.exports = {
  presets: [['@mbvue/babel-preset-config', { vue: 2 }]]
};
```

Use Function：
```js
import BabelPresetConfig from '@mbvue/babel-preset-config';

let modules = false;

BabelPresetConfig(modules);

#OR

BabelPresetConfig(modules, { vue: 2 });
```

## Browsers
```js
require('@mbvue/babel-preset-config/browsers')
```