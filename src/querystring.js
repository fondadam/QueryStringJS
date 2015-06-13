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
            var obj,
                pairs,
                pair,
                eqIndex,
                rawKey,
                rawValue,
                key,
                value,
                i;

            if (str === null ||
                str === undefined) {
                return null;
            }

            //cast to string
            str += '';

            obj = {};

            if (!str.length) {
                return obj;
            }

            //check if the string starts with ?,
            //remove the first ? if it does
            if (~this.options.ignoreFirst.indexOf(str.charAt(0))) {
                str = str.slice(1);
            }

            str = str.replace(/\+/g, '%20');

            pairs =
                this.options.semicolons
                    ? str.split(/[&;]/g)
                    : str.split(/&/g);

            for (i = 0; i < pairs.length; i += 1) {
                pair = pairs[i];
                eqIndex = pair.indexOf('=');
                if (eqIndex < 0) {
                    rawKey = pair;
                    rawValue = null;
                } else {
                    rawKey = pair.slice(0, eqIndex);
                    rawValue = pair.slice(eqIndex + 1);
                }
                key = decodeURIComponent(rawKey);
                value =
                    rawValue === null
                        ? null
                        : decodeURIComponent(rawValue);
                if (has(obj, key)) {
                    obj[key].push(value);
                } else {
                    obj[key] = [value];
                }
            }

            switch (this.options.flatten) {
                case 'first':
                    for (key in obj) {
                        if (has(obj, key)) {
                            obj[key] = obj[key].shift();
                        }
                    }
                    break;
                case 'last':
                case true:
                    for (key in obj) {
                        if (has(obj, key)) {
                            obj[key] = obj[key].pop();
                        }
                    }
                    break;
                case 'singles':
                    for (key in obj) {
                        if (has(obj, key) &&
                            obj[key].length === 1) {
                            obj[key] = obj[key].pop();
                        }
                    }
                    break;
            }

            return obj;
        },
        stringify: function (obj) {
            var pairs;

            if (obj === null ||
                obj === undefined) {
                return null;
            }

            pairs = [];

            Object.keys(obj).forEach(function (rawKey) {
                var key,
                    rawValue;

                function getValue(rawValue) {
                    var value;
                    if (rawValue === null ||
                        rawValue === undefined) {
                        return [key];
                    }
                    value = encodeURIComponent(rawValue);
                    return [key, value];
                }

                key = encodeURIComponent(rawKey);
                rawValue = obj[rawKey];
                if (Array.isArray(rawValue)) {
                    pairs.push.apply(pairs, rawValue.map(getValue));
                } else {
                    pairs.push(getValue(rawValue));
                }
            });

            return pairs.map(function (arr) {
                return arr.join('=');
            }).join('&');
        }
    };

    return QueryString;
}));