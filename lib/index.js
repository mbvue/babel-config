const utils = require('./utils');

module.exports = function (api, opts = {}) {
    if(api && utils.isObject(api)){
        if(api.cache && api.cache.never){
            api.cache.never(); //不要缓存此配置，每次都重新执行函数
        } else {
            opts = api;
        }
    }

    let presets = [[require.resolve('@babel/preset-env'), opts.env || {}]]; //预设
    let plugins = []; //插件

    // Vue 配置
    let vue = utils.hasModule('vue');
    if(vue){
        if(vue.version.slice(0, 1) === '2') {
            presets.push([require.resolve('@vue/babel-preset-jsx'), opts.jsx || {}]); //vue2 Jsx 预设
        }else{
            plugins.push([require.resolve('@vue/babel-plugin-jsx'), opts.jsx || {}]); //Vue3 Jsx 转换插件
        }
    }

    //Typescript 配置
    if(utils.hasModule('typescript')){
        presets.push([require.resolve('@babel/preset-typescript'), opts.typescript || {}]); //TypeScript 预设
    }

    plugins.push(require.resolve('@babel/plugin-proposal-optional-chaining')); //深层嵌套转换插件
    plugins.push(require.resolve('@babel/plugin-transform-object-assign')); //Rest、Spread属性转换插件
    plugins.push(require.resolve('@babel/plugin-proposal-object-rest-spread')); //Object.assign转换插件
    plugins.push(require.resolve('@babel/plugin-proposal-export-default-from')); //default导出支持转换插件
    plugins.push(require.resolve('@babel/plugin-proposal-class-properties')); //类属性转换插件
    plugins.push(require.resolve('@babel/plugin-syntax-dynamic-import')); //动态Import转换插件
    plugins.push([require.resolve('@babel/plugin-transform-runtime'), opts.runtime || {}]); //函数、全局引入来替代插件

    return { presets, plugins };
};