import { isObject, defaultsDeep } from 'lodash-es'
import { Emitter } from '../utils/emitter'

type Input<O> = boolean | number | string | Partial<O> & { $preset?: string }
type Options<O> = Partial<O> & { $preset?: string, value?: any }

export interface ComponentConstructor<O = object> {
  new (element: Element, options?: Input<O>, parent?: Component): Component
  readonly components?: {
    [key: string]: ComponentConstructor
  }
  defaults?: Partial<O>
  presets?: {
    [key: string]: Partial<O>
  }
  resources?: {
    [key: string]: any
  }
  isMovable?: boolean
  isPersistent?: boolean
  $name (ctor: ComponentConstructor): string
  $options (input: Input<O>): Options<O>
}

export class Component<E extends Element = Element, O = object> {
  ['constructor']: ComponentConstructor<O>

  _isInit = false
  _isDestroyed = false
  _name: string = null
  _children: Component[] = []

  $element: E
  $options: Options<O>
  $parent: Component
  $emitter: Emitter

  static isMovable = true
  static isPersistent = false

  static $name (this: ComponentConstructor, ctor: ComponentConstructor) {
    let subcomponents = this.components
    if (subcomponents) {
      let names = Object.entries(subcomponents)
        .filter(entry => entry[1] === ctor)
        .map(tuple => tuple[0])

      if (names.length === 1) {
        return names[0]
      } else if (names.length < 1) {
        throw new Error(`${ parent.name } has no child: ${ ctor.name }`)
      } else if (names.length > 1) {
        throw new Error(`Child has multiple names: ${ names }`)
      }
    } else {
      throw new Error(`Parent has no children: ${ parent.name }`)
    }
  }

  static $options (this: ComponentConstructor, input: Input<object>): Options<object> {
    let presets = this.presets
    let defaults = this.defaults

    let options = {} as Options<object>
    let preset = null
    let presetName: string = null

    if (typeof input === 'string') {
      presetName = input
    } else if (isObject(input)) {
      options = input
      presetName = input.$preset
    }

    if (presets && presetName) {
      preset = presets[presetName]
    }

    if (preset) {
      options.$preset = presetName
    } else if (typeof input === 'string') {
      options.value = input
    }

    return defaultsDeep(options, preset, defaults)
  }

  constructor (element: E, options?: Input<O>, parent?: Component) {
    this.$element = element
    this.$options = this.constructor.$options(options)
    this.$parent = parent
    this.$emitter = new Emitter()

    this.create()

    if (this.$parent) {
      this._name = this.$parent.constructor.$name(this.constructor)
      this.$parent._addChild(this)
    }
  }

  $init () {
    if (!this._isInit) {
      this._children.forEach(child => child.$init())

			this.init()
			this.$emitter.emit('init')
      this._isInit = true
    }
  }

  _ref (component: Component, remove = false) {
    let prop = '$' + component._name
    let value = this[prop]

    if (Array.isArray(value)) {
      let index = value.indexOf(component)
      let added = index >= 0

      if (remove) {
        if (added) {
          value.splice(index, 1)
        }
      } else if (!added) {
        value.push(component)
      }
    } else {
      if (remove) {
        if (value === component) {
          this[prop] = null
        }
      } else {
        this[prop] = component
      }
    }
  }

  _addChild (component: Component) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this._ref(component)
      this.$emitter.emit('add:' + component._name, component)
    }
  }

  _removeChild (component: Component) {
    let index = this._children.indexOf(component)
    if (index >= 0) {
      this._children.splice(index, 1)
      this._ref(component, true)
      this.$emitter.emit('remove:' + component._name, component)
    }
  }

  $destroy () {
    if (!this._isDestroyed) {
      this.destroy()

      Array.from(this._children).forEach(child => {
        child.$destroy()
      })

      if (this.$parent) {
        this.$parent._removeChild(this)
      }

			this.$emitter.emit('destroy')
      this._isDestroyed = true
    }
  }

  create () {}
  init () {}
  destroy () {}
}

export default Component
