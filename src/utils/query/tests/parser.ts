import Parser from '../parser'

describe('Parser', () => {
	const parser = new Parser

	it('parses plain string', () => {
		expect(parser.parse('foo')).deep.equal([
			{ name: 'foo', arg: null }
		])
	})

	it('parses multiple items', () => {
		expect(parser.parse('foo.bar.baz')).deep.equal([
			{ name: 'foo', arg: null },
			{ name: 'bar', arg: null },
			{ name: 'baz', arg: null }
		])
	})

	it('parses dots in arguments', () => {
		expect(parser.parse('bar(.baz)')).deep.equal([
			{ name: 'bar', arg: '.baz' }
		])
	})

	it('parses brackets in arguments', () => {
		expect(parser.parse('foo(bar(test))')).deep.equal([
			{ name: 'foo', arg: 'bar(test)' }
		])
	})
})
