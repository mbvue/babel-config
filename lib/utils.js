const path = require('path');

module.exports = {
    //判断是否包含模块
    hasModule: function (name) {
        try {
            return require(path.resolve(process.cwd(), './node_modules/' + name));
        } catch (error) {
            return false;
        }
    },

    //对象类型
    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]' ? true : false;
    }
};