import { Query } from '../query'

chai.Assertion.addMethod('ids', function (expected) {
  new chai.Assertion(this._obj).to.be.instanceof(Query)
  var ids = this._obj.elements.map(node => node.id)
  new chai.Assertion(ids).to.deep.equal(expected)
})

declare global {
  export namespace Chai {
    interface Assertion {
      ids: (expected: string[]) => void
    }
  }
}

document.body.innerHTML = `
  <div id="a">
    <div id="a-a">
      <div id="a-a-a"></div>
      <div id="a-a-b"></div>
      <div id="a-a-c"></div>
      <svg id="a-a-svg"></svg>
    </div>

    <div id="a-b">
      <div id="a-b-a"></div>
      <div id="a-b-b"></div>
      <div id="a-b-c"></div>
    </div>
  </div>

  <div id="b">
    <div id="b-a">
      <div id="b-a-a"></div>
      <div id="b-a-b"></div>
      <div id="b-a-c"></div>
    </div>

    <div id="b-b">
      <div id="b-b-a"></div>
      <div id="b-b-b"></div>
      <div id="b-b-c"></div>
    </div>
  </div>

  <div id="c"></div>
`

describe('Query', function () {
  var node = document.getElementById('b-a')
  var query = new Query(node)

  it('initializes with an element', () => {
    expect(query.elements).to.include(node)
  })

  it('adds Element', () => {
    query.add(document.documentElement)
    expect(query.elements).to.include(document.documentElement)
  })

  it('adds array', () => {
    query.add([document.body])
    expect(query.elements).to.include(document.body)
  })

  describe('operation', () => {
    before(() => {
      query = query.first()
    })

    it('first', () => {
      expect(query).ids(['b-a'])
    })

    it('parent', () => {
      expect(query.parent(2).elements).deep.equal([document.body])
    })

    it('descendant', () => {
      expect(query.parent().descendant(2)).ids(['b-a-a'])
    })

    it('child', () => {
      expect(query.child(1)).ids(['b-a-b'])
    })

    it('children', () => {
      expect(query.children()).ids(['b-a-a', 'b-a-b', 'b-a-c'])
    })

    it('sibling', () => {
      expect(query.parent().sibling(1)).ids(['c'])
      expect(query.parent().sibling(-1)).ids(['a'])
    })

    it('query', () => {
      expect(query.select('#b-a-c')).ids(['b-a-c'])
    })

    it('queryAll', () => {
      expect(query.selectAll('div')).ids(['b-a-a', 'b-a-b', 'b-a-c'])
    })
  })
})
