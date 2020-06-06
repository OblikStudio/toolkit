import { parse } from '..'

describe('parse()', () => {
	it('resolves selector', () => {
		expect(parse('div').length).greaterThan(0)
	})

	it('resolves query', () => {
		expect(parse(document.body, '@parent')[0]).equal(document.documentElement)
	})

	it('resolves both', () => {
		expect(parse('div#b-b@parent')[0]).equal(document.querySelector('#b'))
	})

	it('works with Element as input', () => {
		expect(parse(document.body)[0]).equal(document.body)
	})

	it('filters by constructor', () => {
		expect(parse('#a-a@children', null, SVGElement)).deep.equal([document.querySelector('#a-a-svg')])
	})
})
