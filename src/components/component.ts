import { Emitter } from '../utils'

type Input<O> = boolean | number | string | Partial<O> & { $preset?: string }
type ConfigFunction<O> = (component: Component, options: Input<O>) => Options<O>
type Config<O> = Partial<O> | ConfigFunction<O>
type Options<O> = Partial<O> & { $preset?: string, value?: any }

interface Hooks {
  $create?: () => void
  $init?: () => void
  $destroy?: () => void
}

export interface ComponentConstructor<O = object> extends Hooks {
  new (element: HTMLElement, options?: Input<O>, parent?: Component): Component
  readonly $components?: {
    [key: string]: ComponentConstructor
  }
  $defaults?: Config<O>
  $presets?: {
    [key: string]: Config<O>
  }
}

export interface Component extends Hooks {
  constructor: ComponentConstructor
  _init?: () => void
  _addChild?: (component: Component) => void
  _removeChild?: (component: Component) => void
  _destroy?: () => void
}

export class OblikComponent<O = object> implements Component {
  ['constructor']: ComponentConstructor<O>

  _isInit = true
  _isDestroyed = false
  _children: Component[] = []

  $element: HTMLElement
  $options: Options<O>
  $parent: Component
  $emitter: Emitter
  
  constructor (element: HTMLElement, options?: Input<O>, parent?: Component) {
    this.$element = element
    this.$options = this._resolveOptions(options)
    this.$parent = parent
    this.$emitter = new Emitter()

    this._hook('$create')

    if (this.$parent) {
      this.$parent._addChild(this)
    }
  }

  _hook (name: string, ...args: any[]) {
    let instanceFn = this[name]
    let ctorFn = this.constructor[name]

    if (typeof instanceFn === 'function') {
      instanceFn.apply(this, args)
    }

    if (typeof ctorFn === 'function') {
      ctorFn.apply(this, args)
    }
  }

  _init () {
    if (this._isInit) {
      this._children.forEach(child => child._init())

      this._hook('$init')
      this._isInit = false
    }
  }

  _resolveConfig (config: Config<O>, input: Input<O>): Options<O> {
    if (typeof config === 'object' && config !== null) {
      return config
    } else if (typeof config === 'function') {
      return config(this, input)
    } else {
      return {}
    }
  }

  _resolveOptions (input: Input<O>): Options<O> {
    let preset = null
    let presets = this.constructor.$presets
    let defaults = this.constructor.$defaults

    let options = {} as Options<O>
    let defaultOptions = this._resolveConfig(defaults, input)
    let presetOptions = {}

    if (input && typeof input === 'object') {
      options = input
    }
    
    if (presets) {
      if (typeof input === 'string') {
        preset = presets[input]

        if (preset) {
          options.$preset = input
        } else {
          options.value = input
        }
      } else if (input && typeof input === 'object') {
        preset = presets[input.$preset]
      }
    }
    
    if (preset) {
      presetOptions = this._resolveConfig(preset, input)
    }

    return { ...defaultOptions, ...presetOptions, ...options }
  }

  _childName (child: Component) {
    let subcomponents = this.constructor.$components
    if (subcomponents) {
      let names = Object.entries(subcomponents)
        .filter(entry => entry[1] === child.constructor)
        .map(tuple => tuple[0])

      if (names.length === 1) {
        return names[0]
      } else if (names.length < 1) {
        throw new Error(`${ this.constructor.name } has no child: ${ child.constructor.name }`)
      } else if (names.length > 1) {
        throw new Error(`Child has multiple names: ${ names }`)
      }
    } else {
      throw new Error(`Parent has no children: ${ this.constructor.name }`)
    }
  }

  _ref (component: Component, name: string, remove = false) {
    let prop = '$' + name
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
      let name = this._childName(component)
      this._children.push(component)
      this._ref(component, name)
      this.$emitter.emit(name + ':added', component)
    }
  }

  _removeChild (component: Component) {
    let index = this._children.indexOf(component)
    if (index >= 0) {
      let name = this._childName(component)
      this._children.splice(index, 1)
      this._ref(component, name, true)
      this.$emitter.emit(name + ':removed', component)
    }
  }

  _destroy () {
    if (!this._isDestroyed) {
      this._hook('$destroy')

      Array.from(this._children).forEach(child => {
        if (typeof child._destroy === 'function') {
          child._destroy()
        }
      })

      if (this.$parent) {
        this.$parent._removeChild(this)
      }

      this._isDestroyed = true
    }
  }
}

export default OblikComponent
