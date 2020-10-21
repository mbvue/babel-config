const merge = require('lodash.merge');
const isModules = function (value) {
    if(Object.prototype.toString.call(value) === '[object String]' && '|amd|umd|systemjs|commonjs|cjs|auto|'.indexOf('|' + value.toLowerCase() + '|') !== -1){
        return true;
    }

    if(Object.prototype.toString.call(value) === '[object Boolean]' && !value){
        return true;
    }

    return false;
}

module.exports = function (api, opts) {
    let modules = 'auto';
    
    if (api) {
        if ('cache' in api && 'never' in api.cache) {
            api.cache.never();
        }else if(isModules(api)){
            modules = api;
        }
    }

    if(!opts || Object.prototype.toString.call(opts) !== '[object Object]') {
        opts = {};
    }
    
    return {
        presets: [
            [
                require.resolve('@babel/preset-env'),
                merge({
                    modules,
                    targets: {
                        browsers: require('./browsers.js')
                    }
                }, opts)
            ]
        ],
    
        plugins: [
            require.resolve('@vue/babel-plugin-jsx'),
            require.resolve('@babel/plugin-proposal-optional-chaining'),
            require.resolve('@babel/plugin-transform-object-assign'),
            require.resolve('@babel/plugin-proposal-object-rest-spread'),
            require.resolve('@babel/plugin-proposal-export-default-from'),
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-transform-runtime')
        ]
    };
};
    