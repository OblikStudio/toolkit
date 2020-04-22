import { Parser } from '..'

function test (input: string, expected: any) {
  let parser = new Parser()
  let result = parser.parse(input)
  expect(result).deep.equal(expected)
}

test('some string', 'some string')
test('42e3', 42000)
test('true', true)

test(
  'foo: bar',
  { foo: 'bar' }
)

test(
  'one: value, two: value',
  { one: 'value', two: 'value' }
)

test(
  'foo: bar:baz, qux',
  { foo: 'bar:baz', qux: true }
)

test(
  'num: 42.25, neg: -4e2, bool: true, empty: null, yes, !no',
  { num: 42.25, neg: -400, bool: true, empty: null, yes: true, no: false }
)

test(
  'bool: `true`, str: `42`',
  { bool: 'true', str: '42' }
)

test(
  '`:{key}`: `:,[\\`]\\\\}`, `{arr}`[ `:,}` ]',
  { ':{key}': ':,[`]\\}', '{arr}': [':,}'] }
)

test(
  'arr[ one, two ] str: test',
  { arr: ['one', 'two'], str: 'test' }
)

test(
  'arr:[ one, two ], str: test',
  { arr: ['one', 'two'], str: 'test' }
)

test(
  '{ val: yes, bool }',
  { val: 'yes', bool: true }
)

test(
  '[ foo, bar ]',
  ['foo', 'bar']
)

test(
  '{ val: value, test }',
  { val: 'value', test: true }
)

test(
  '[ val: value, test ]',
  ['val: value', 'test']
)

test(
  'name: one, nested{ array[ one, two ] three } four',
  { name: 'one', nested: { array: ['one', 'two'], three: true }, four: true }
)

test(
  'nested{ array[ one, two ] array2[ three, four ] }',
  { nested: { array: ['one', 'two'], array2: ['three', 'four'] } }
)

test(
  '[ foo, bar ] key{ nest: bar, foo [ hai ] } str: hello, string [ ab, cd ]',
  [['foo', 'bar'], { nest: 'bar', foo: ['hai'] }, 'str: hello', 'string', ['ab', 'cd']]
)

test(
  'test: Hello, data { type: text, !isActive, numbers [5, 6] }',
  { test: 'Hello', data: { type: 'text', isActive: false, numbers: [5, 6] } }
)
