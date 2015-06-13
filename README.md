# QueryStringJS

A query string parsing utility that properly handles a [bunch of edge cases][1]. Use this when you want to handle query strings correctly.

## Usage

You can install via NPM:

    npm install querystringjs

Or just [download the latest release in the repo][3].

QueryStringJS uses [UMD][2], so that it can easily be included regardless of whether you prefer AMD, CommonJS, or just want to include the script in your page.

For example, if you're using [browserify][4] you could call:

    var QueryString = require('querystringjs');

Otherwise you can just access the global value:

    QueryString

## API

### `[new] QueryString([options])`

`QueryString` is a constructor that generates query string parsers. It can be called with or without `new`:

    var qs = new QueryString([options]);
    var qs = QueryString([options]);
    var qs = require('querystringjs')([options]);

**`options`**  
Type: `Object`

The options to use with the query string parser.

**`options.ignoreFirst`**  
Type: `String`

A string of characters to skip as the first character in a query string.

Defaults to `'?'`.

**`options.flatten`**  
Type: `String`, `Boolean`

A string describing how the lists of query string values should be flattened. Query strings may contain multiple values for a single key. For example:

    foo=bar&foo=baz&fizz=buzz

would be parsed into:

    {
        "foo": [
            "bar",
            "baz"
        ],
        "fizz": [
            "buzz"
        ]
    }

This can be inconvenient for access, so these inner arrays may be flattened in various different ways.

Options include:

 * *`'first'`* - select the first values:
   ```
   {
       "foo": "bar",
       "fizz": "buzz"
   }
   ```
 * *`'last'`* - select the last values:
   ```
   {
       "foo": "baz",
       "fizz": "buzz"
   }
   ```
 * *`'singles'`* - flatten the array only if there's a single value:
   ```
   {
       "foo": [
           "bar",
           "baz"
       ],
       "fizz": "buzz"
   }
   ```
 * *`'none'`* - don't flatten the array
 * *`true`* - same as `'last'`
 * *`false`* - same as `'none'`
 * *any other value* - same as `'none'`

Defaults to `'singles'`

**`options.semicolons`**  
Type: `Boolean`

Whether or not key value pairs should be split on semicolons (`;`) when parsing query strings.

Defaults to `true`

### `QueryString.defaultOptions`

The default options can be updated globally if many similar parsers are being created.

### `QueryString.prototype.parse(string)`

**`string`**  
Type: `String`

The query string to parse into an object.

### `QueryString.prototype.stringify(object)`

**`object`**  
Type: `Object`

The object to stringify into a query string.

[1]: http://zzzzbov.com/blag/querystring-hell
[2]: https://github.com/umdjs/umd
[3]: https://github.com/zzzzBov/QueryStringJS/releases
[4]: http://browserify.org/