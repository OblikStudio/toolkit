import { Emitter } from '../utils'

export default class Component {
  $element: HTMLElement
  $options: object
  $parent: Component
  $emitter: Emitter

  _name: string
  _children: Component[]
  _destroyed: boolean

  constructor (element: HTMLElement, options: object) {
    this.$element = element
    this.$options = options
    this.$parent = null
    this.$emitter = new Emitter()

    this._name = null
    this._children = []
    this._destroyed = false
    this.$create()
  }

  $create () {}

  $addComponent (component: Component) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this.$emitter.emit(component._name + ':added', component)
    }
  }

  $removeComponent (component: Component) {
    var index = this._children.indexOf(component)
    if (index >= 0) {
      this._children.splice(index, 1)
      this.$emitter.emit(component._name + ':removed', component)
    }
  }

  $destroy () {
    if (this._destroyed) {
      return
    }

    /**
     * No need to destroy children because the observer will walk over them and
     * destroy them.
     */
    
    this._destroyed = true
  }
}
