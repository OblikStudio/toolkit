import watcher from '../index'
import Composite from '../../modules/composite'

global.console.warn = jest.fn()
global.MutationObserver = require('mutation-observer')

document.body.innerHTML = `
  <div mb-basic></div>
  <div mb-nested>
    <div mb-nested-child></div>
    <div mb-nested-random></div>
  </div>
  <div mb-missing></div>
`

const elBasic = document.querySelector('[mb-basic]')
const elNested = document.querySelector('[mb-nested]')
const elNestedChild = document.querySelector('[mb-nested-child]')

const modules = {
  basic: jest.fn(function (element, options, parent) {
    test('basic module arguments', () => {
      expect(element).toBe(elBasic)
      expect(options).toBe(undefined)
      expect(parent).toBe(null)
    })
  }),
  nested: {
    $base: jest.fn(function () {
      this.init = jest.fn(function () {
        test('child module', () => {
          expect(this.$child).not.toBe(undefined)
        })

        describe('arbitrary module', () => {
          test('is a composite', () => {
            expect(this.$random).toBeInstanceOf(Composite)
          })

          test('has a correct name', () => {
            expect(this.$random._name).toBe('random')
          })
        })
      })
    }),
    child: jest.fn()
  }
}

watcher.register(modules)
watcher.init()

describe('module constructors', () => {
  test('invokes basic module', () => {
    expect(modules.basic).toHaveBeenCalled()
  })

  test('invokes composite base', () => {
    expect(modules.nested.$base).toHaveBeenCalled()
  })

  test('invokes composite child', () => {
    expect(modules.nested.child).toHaveBeenCalled()
  })

  test('warns of missing modules', () => {
    expect(global.console.warn).toHaveBeenCalledWith('Definition of module missing not found.')
  })
})

describe('dom elements', () => {
  test('nested has module', () => {
    expect(typeof elNested.minibits.nested).toBeTruthy()
  })

  test('child has module', () => {
    expect(typeof elNestedChild.minibits['nested-child']).toBeTruthy()
  })
})

describe('events', () => {
  test('nested was initialized', () => {
    expect(elNested.minibits.nested.init).toHaveBeenCalled()
  })
})
