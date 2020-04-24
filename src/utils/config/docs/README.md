# SLIC

Single Line Configuration (SLIC) is a data format that attempts to be as short as possible while remaining readable and easily editable on a single line. It's like JSON with stripped quotes, some optional tokens, and a few enhancements.

The format was designed for usage in HTML attributes where JSON is tougher to both read and write. You could also put the data in a file, spread it on multiple lines as you please, and use it as a configuration file, for example.

## Features

It's a lot like JSON:

- Keys are separated from values with `:`
- Key-value pairs are separated with `,`
- Objects are delimited with `{` and `}`
- Arrays are delimited with `[` and `]`

Except:

- Quotation marks are omitted
- Optional starting and ending bracket
- Optional `:` and `,` before and after arrays/objects
- Primitive values (numbers, booleans, and null) are parsed
- String input with no special tokens is returned as is (primitives are still parsed)
- Object keys with no values are set to `true`
- Object keys with no values that begin with `!` are set to `false`
- Explicit strings are delimited with `` ` `` which is escaped with `\`

## Example

This:

```
test: Hello, data { type: text, !isActive, numbers [5, 6] }
```

...results in:

```json
{
	"test": "Hello",
	"data": {
		"type": "text",
		"isActive": false,
		"numbers": [5, 6]
	}
}
```

You can easily check more examples in the [tests](tests/index.js).

## Installation

With [npm](https://www.npmjs.com/package/slic):

```
npm i slic
```

## Usage

```js
var SlicParser = require('slic').Parser
var parser = new SlicParser()
var data = parser.parse('text: Hello!')

console.log(data) // { "text": "Hello!" }
```
