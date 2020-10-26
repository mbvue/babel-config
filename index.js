const merge = require('lodash.merge');

const _MODULE = '|amd|umd|systemjs|commonjs|cjs|auto|';
const isString = function (obj) { return Object.prototype.toString.call(obj) !== '[object String]' ? true : false; } //字符串类型
const isBoolean = function (obj) { return Object.prototype.toString.call(obj) !== '[object Boolean]' ? true : false; } //布尔类型
const isObject = function (obj) { return Object.prototype.toString.call(obj) !== '[object Object]' ? true : false; } //对象类型

module.exports = function (api, opts) {
    let modules = 'auto';
    opts = opts && isObject(opts) ? opts : {};
    
    if (api) {
        if (api.cache && api.cache.never) {
            api.cache.never(); //不要缓存此配置，每次都重新执行函数
        } else {
            //处理单独动态传入 modules
            if((isString(api) && _MODULE.indexOf('|' + api.toLowerCase() + '|') !== -1) || (isBoolean(api) && !api)) {
                modules = api;
            }
        }
    }

    //预设
    let presets = [
        [
            require.resolve('@babel/preset-env'),  //预设插件的集合
            merge({
                modules, //是否启用将ES6模块语法转换为其他模块类型的功能
                targets: {
                    browsers: require('./browsers.js') //项目支持的环境
                }
            }, opts)
        ]
    ];
    //插件
    let plugins = [];

    if(opts.vue && opts.vue * 1 == 2){
        presets.push(require.resolve('@vue/babel-preset-jsx')); //vue2 Jsx 预设
        presets.push(require.resolve('@babel/preset-typescript')); //vue2 TypeScript 预设
    } else {
        plugins.push(require.resolve('@vue/babel-plugin-jsx')); //Vue3 Jsx TypeScript 转换插件
    }

    plugins.push.apply(plugins, [
        require.resolve('@babel/plugin-proposal-optional-chaining'), //深层嵌套转换插件(https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining)
        require.resolve('@babel/plugin-transform-object-assign'), //Rest、Spread属性转换插件(https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread)
        require.resolve('@babel/plugin-proposal-object-rest-spread'), //Object.assign转换插件(https://babeljs.io/docs/en/babel-plugin-transform-object-assign/)
        require.resolve('@babel/plugin-proposal-export-default-from'), //default导出支持转换插件((https://www.babeljs.cn/docs/babel-plugin-proposal-export-default-from)
        require.resolve('@babel/plugin-proposal-class-properties'), //类属性转换插件(https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
        require.resolve('@babel/plugin-syntax-dynamic-import'), //动态Import转换插件(https://www.babeljs.cn/docs/babel-plugin-syntax-dynamic-import)
        [require.resolve('@babel/plugin-transform-runtime'), { helpers: true, 'corejs': 3 }] //函数、全局引入来替代插件(https://www.babeljs.cn/docs/babel-plugin-transform-runtime)
    ]);

    return { presets, plugins };
};
    