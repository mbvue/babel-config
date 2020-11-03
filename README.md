## Installation
```bash
npm install --save-dev @mbvue/babel-preset-config
#OR
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
  presets: [
    ['@mbvue/babel-preset-config', { env: { useBuiltIns: "entry" } }]
  ]
};
```

package.json：

```json
"babel": {
  "presets": [
    "@mbvue/babel-preset-config"
  ]
}
```

Use Function：
```js
import babelPresetConfig from '@mbvue/babel-preset-config';

babelPresetConfig({ env: { useBuiltIns: "entry" } });
```

## Options
#### env
@babel/preset-env options

#### jsx
If vue version is 2：@babel/babel-preset-jsx options
If vue version is 3：@babel/babel-plugin-jsx options

#### typescript
@babel/preset-typescript options

#### runtime
@babel/plugin-transform-runtime options