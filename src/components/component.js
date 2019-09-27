import Emitter from 'events'

export default class {
  constructor (element, value) {
    this.$element = element
    this.$options = value
    this.$parent = null
    this.$emitter = new Emitter()

    this._name = null
    this._children = []
    this._destroyed = false
  }

  $addComponent (component) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this.$emitter.emit(component._name + ':added', component)
    }
  }

  $removeComponent (component) {
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

    if (this.$parent) {
      this.$parent.$removeComponent(this)
      this.$parent = null
    }

    this._children.forEach(child => child.$destroy())
    this._children = null
    this._destroyed = true
  }
}
