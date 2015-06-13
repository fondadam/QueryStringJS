var assert = require('chai').assert;
var QueryString = require('../src/querystring');

describe('QueryString', function () {
    var qs = new QueryString();
    describe('.parse()', function () {
        it('should split key value pairs on equal signs', function () {
            assert.deepEqual(qs.parse('foo=bar'), {foo: 'bar'});
        });
        it('should keep extra equal signs in keys', function () {
            assert.deepEqual(qs.parse('foo=bar=baz'), {foo: 'bar=baz'});
        });
        it('should split multiple key value pairs with ampersands', function () {
            assert.deepEqual(qs.parse('foo=bar&fizz=buzz'), {foo: 'bar', fizz: 'buzz'});
        });
        it('should split multiple key value pairs with semi-colons', function () {
            assert.deepEqual(qs.parse('foo=bar;fizz=buzz'), {foo: 'bar', fizz: 'buzz'});
        });
        it('should split multiple key value pairs with mixed ampersands and semi-colons', function () {
            assert.deepEqual(qs.parse('foo=bar&fizz=buzz;lorem=ipsum'), {foo: 'bar', fizz: 'buzz', lorem: 'ipsum'});
        });
        it('should handle empty values', function () {
            assert.deepEqual(qs.parse('foo='), {foo: ''});
        });
        it('should handle null values', function () {
            assert.deepEqual(qs.parse('foo'), {foo: null});
        });
        it('should handle multiple values with the same key', function () {
            assert.deepEqual(qs.parse('foo=bar&foo=baz'), {foo: ['bar', 'baz']});
        });
        it('should handle duplicate key value pairs', function () {
            assert.deepEqual(qs.parse('foo=bar&foo=bar'), {foo: ['bar', 'bar']});
        });
        it('should ignore initial `?` characters', function () {
            assert.deepEqual(qs.parse('?foo=bar'), {foo: 'bar'});
            assert.deepEqual(qs.parse('??foo=bar'), {'?foo': 'bar'});
        });
        it('should handle empty keys', function () {
            assert.deepEqual(qs.parse('=bar'), {'': 'bar'});
        });
        it('should handle empty keys with empty values', function () {
            assert.deepEqual(qs.parse('='), {'': ''});
        });
        it('should handle empty keys with null values', function () {
            assert.deepEqual(qs.parse('foo=bar&'), {foo: 'bar', '': null});
            assert.deepEqual(qs.parse('?'), {'': null});
        });
        it('should handle no keys or values', function () {
            assert.deepEqual(qs.parse(''), {});
        });
        it('should handle null', function () {
            assert.strictEqual(qs.parse(null), null);
        });
        it('should handle undefined', function () {
            assert.strictEqual(qs.parse(undefined), null);
        });
        it('should handle percent encoded values', function () {
            assert.deepEqual(qs.parse('foo=bar%26baz'), {foo: 'bar&baz'});
        });
        it('should handle percent encoded keys', function () {
            assert.deepEqual(qs.parse('foo%26bar=baz'), {'foo&bar': 'baz'});
        });
        it('should handle `+` as a space character', function () {
            assert.deepEqual(qs.parse('foo=bar+baz'), {foo: 'bar baz'});
        });
        it('should run the gauntlet', function () {
            assert.deepEqual(
                qs.parse('?foo=bar&foo=baz;fizz&fizz=;fizz=buzz&fizz=buzz&fizz=buzz%26buzz&&=;==;?&%26;'),
                {
                    foo: ['bar', 'baz'],
                    fizz: [null, '', 'buzz', 'buzz', 'buzz&buzz'],
                    '': [null, '', '=', null],
                    '?': null,
                    '&': null
                });
        });
        it('should cast objects to strings', function () {
            var obj = {
                toString: function () {
                    return 'foo=bar';
                }
            };
            assert.deepEqual(qs.parse(obj), {foo: 'bar'});
        });
    });
    describe('.stringify()', function () {

    });
});