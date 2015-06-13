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
    });
    describe('.stringify()', function () {
        
    });
});