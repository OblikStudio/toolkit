import { SinonSpy } from 'sinon'

import Watcher from '..'
import Component from '../../components/component'

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

class NonMovable extends Tester {
  static isMovable = false
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

  it('moves components', function (done) {
    fixture.set(`
      <main>
        <div><div ob-test></div></div>
        <div><div ob-test2></div></div>
        <div id="dest"></div>
      </main>
    `)

    let main = fixture.el.querySelector('main')
    let target1 = main.querySelector('[ob-test]')
    let target2 = main.querySelector('[ob-test2]')
    let dest = main.querySelector('#dest')
    let watcher = new Watcher(main, {
      components: {
        test: Tester,
        test2: NonMovable
      }
    })

    watcher.init()

    let comp1 = watcher.getInstance(target1, 'test') as Tester
    let comp2 = watcher.getInstance(target2, 'test2') as NonMovable

    dest.appendChild(target1)
    dest.appendChild(target2)
    
    window.requestAnimationFrame(() => {
      expect(comp1.spyDestroy.called).false
      expect(comp2.spyDestroy.called).true

      let newComp2 = watcher.getInstance(target2, 'test2') as NonMovable
      expect(newComp2).not.equal(comp2)
      expect(newComp2.spyInit.called).true
      done()
    })
  })
})
