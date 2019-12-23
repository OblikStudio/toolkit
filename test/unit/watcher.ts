import { SinonSpy } from 'sinon'

import Watcher from '../../src/watcher'
import Component from '../../src/components/component'

class Tester<O = object> extends Component<HTMLElement, O> {
  spyCreate: SinonSpy
  spyInit = sinon.spy()
  spyDestroy = sinon.spy()

  create () {
    this.spyCreate = sinon.spy()
    this.spyCreate()
  }
  
  init () {
    this.spyInit()
  }

  destroy () {
    this.spyDestroy()
  }
}

class Parent extends Tester<{ foo: string }> {
  static components = {
    child: Tester
  }
}

describe('watcher', () => {
  it('initializes components', () => {
    fixture.set(`
      <main>
        <div ob-test>
          <div ob-test-child></div>
        </div>
      </main>
    `)

    let main = fixture.el.querySelector('main')
    let parent = main.firstElementChild
    let child = parent.firstElementChild
    let watcher = new Watcher(main, {
      components: {
        test: Parent
      }
    })

    watcher.init()

    let parentInstance = watcher.getInstance(parent, 'test') as Parent
    let childInstance = watcher.getInstance(child, 'test-child') as Tester

    expect(parentInstance.spyCreate.called).true
    expect(childInstance.spyCreate).calledAfter(parentInstance.spyCreate)
    expect(childInstance.spyInit).calledAfter(childInstance.spyCreate)
    expect(parentInstance.spyInit).calledAfter(childInstance.spyInit)
  })

  it('dynamically creates components', function (done) {
    fixture.set(`<main></main>`)

    let main = fixture.el.querySelector('main')
    let watcher = new Watcher(main, {
      components: {
        test: Tester
      }
    })

    watcher.init()

    let el = document.createElement('div')
    el.setAttribute('ob-test', '')
    main.appendChild(el)

    window.requestAnimationFrame(() => {
      let component = watcher.getInstance(el, 'test') as Tester
      expect(component.spyInit.called).true
      done()
    })
  })

  it('destroys components', function (done) {
    fixture.set(`<main><div ob-test></div></main>`)

    let main = fixture.el.querySelector('main')
    let target = main.firstElementChild
    let watcher = new Watcher(main, {
      components: {
        test: Tester
      }
    })

    watcher.init()

    let component = watcher.getInstance(target, 'test') as Tester
    main.removeChild(target)
    
    window.requestAnimationFrame(() => {
      expect(component.spyDestroy.called).true
      done()
    })
  })
})
