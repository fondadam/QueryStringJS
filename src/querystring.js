(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.QueryString = factory();
    }
}(this, function () {
    function extend() {
        var i,
            obj,
            extendingObject;
        obj = arguments[0];
        for (i = 1; i < arguments.length; i += 1) {
            extendingObject = arguments[i];
            for (j in extendingObject) {
                if (has(extendingObject, j)) {
                    obj[j] = extendingObject[j];
                }
            }
        }
        return obj;
    }

    function has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function QueryString(options) {
        if (!(this instanceof QueryString)) {
            return new QueryString(options);
        }

        this.options = extend({}, QueryString.defaultOptions, options || {});
    }
    QueryString.defaultOptions = {
        ignoreFirst: '?',
        flatten: 'singles', //'first', 'last' (true), 'singles', any other value (false)
        semicolons: true
    };
    QueryString.prototype = {
        parse: function (str) {

        },
        stringify: function (obj) {

        }
    };

    return QueryString;
}));