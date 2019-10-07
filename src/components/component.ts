import { Emitter } from '../utils'

export interface Schema<O> {
  name?: string
  options?: Partial<O>
  presets?: {
    [index: string]: Partial<O>
  }
  components?: {
    [index: string]: typeof Component
  }
}

export class Component<O> {
  static $model: Schema<object>
  
  _name: string = null
  _isInit: boolean = true
  _isDestroyed: boolean = false
  _children: Component<any>[] = []

  $element: HTMLElement
  $emitter: Emitter
  $options: O
  $parent: Component<any>
  
  constructor (element: HTMLElement, options?: string | O, parent?: Component<any>) {
    this.$element = element
    this.$parent = parent
    this.$emitter = new Emitter()

    let ctor = (this.constructor as typeof Component)
    let model = ctor.$model
    let defaults = null

    if (model) {
      this._name = model.name

      if (typeof options === 'string') {
        defaults = model.presets && model.presets[options]

        if (defaults) {
          options = null
        }
      } else {
        defaults = model.options
      }
    }

    if (typeof options === 'string') {
      options = { value: options }
    }

    if (defaults) {
      options = { ...defaults, ...options }
    }

    this.$options = options

    if (!this._name && this.$parent) {
      throw new Error(`Child component missing name: ${ ctor.name }`)
    }

    this.$create()

    if (this.$parent) {
      this.$parent.$addComponent(this)
    }
  }

  _init () {
    if (this._isInit) {
      this.$init()
      this._isInit = false
      console.log('init', this._name)
    }
  }

  _destroy () {
    if (!this._isDestroyed) {
      Array.from(this._children).forEach(child => {
        child._destroy()
      })

      this.$destroy()

      if (this.$parent) {
        this.$parent.$removeComponent(this)
      }

      this._isDestroyed = true
      console.log('destroy', this._name)
    }
  }

  _update (parentComponent, childComponent, remove = false) {
    var key = '$' + childComponent._name
    var value = parentComponent[key]
  
    if (Array.isArray(value)) {
      var index = value.indexOf(childComponent)
      var added = index >= 0
  
      if (remove) {
        if (added) {
          value.splice(index, 1)
        }
      } else if (!added) {
        value.push(childComponent)
      }
    } else {
      if (remove) {
        if (value === childComponent) {
          parentComponent[key] = null
        }
      } else {
        parentComponent[key] = childComponent
      }
    }
  }

  $create () {}

  $init () {}

  $addComponent (component: Component<any>) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this._update(this, component)
      this.$emitter.emit(component._name + ':added', component)
    }
  }

  $removeComponent (component: Component<any>) {
    var index = this._children.indexOf(component)
    if (index >= 0) {
      this._children.splice(index, 1)
      this._update(this, component, true)
      this.$emitter.emit(component._name + ':removed', component)
    }
  }

  $destroy () {}
}

export default Component
