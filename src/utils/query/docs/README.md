# Querel

Utility for querying DOM elements.

## Installation

With [npm](http://npmjs.com/package/querel):

```
npm i querel
```

## Usage

The [Query](src/query.ts) class provides a chainable API for querying elements. It's reminiscent of [jQuery](https://api.jquery.com/):

```js
import { Query } from 'querel'

var element = document.getElementById('foo')
var query = new Query(element)
var result = query
  .parent(2)        // grandparent of `element`
  .sibling()        // next sibling
  .children()       // all child elements
  .child(3)         // third child of all elements
  .select('.test')  // elements with class `test` in matched elements

console.log(result.elements) // Array of resulting elements
```

### Interpreter

It might be more comfortable to use the query interpreter via [`parse()`](src/interpreter.ts):

```js
import parse from 'querel'

var element = document.getElementById('foo')
var result = parse(element, '@parent(2).sibling.children.child(3).select(.test)')
```

This could be useful when the input value comes from somewhere else as it can handle all those cases:

```js
parse(null)               // falsy value
parse(document.body)      // Element
parse('div#foo')          // CSS selector
parse('div#foo@sibling')  // CSS selector + query
```

If you have a defined starting element, you specify it as the first argument and the foreign input as second:

```js
parse(element, null)                // element
parse(element, document.body)       // element
parse(element, 'div#foo')           // result of CSS selector on element
parse(element, '@sibling')          // sibling of element
parse(element, 'div#foo@sibling')   // sibling of div#foo
```

The return value of `parse()` is _always_ an array containing the resulting elements. This allows you to get consistent results from various inputs. For example, if you're interested in a single element of the resulting query:

```js
parse(null)[0]           // undefined
parse(document.body)[0]  // Element
parse('.many')[0]        // Element
parse('#foo@parent')[0]  // Element
```