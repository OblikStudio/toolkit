import EventEmitter from 'events'

export default class extends EventEmitter {
	constructor (name, element, parentModule) {
		super()

    this.element = element
		this._name = name
		this._parent = parentModule
		this._children = []
		this._destroyed = false
	}

	$addModule (module) {
		if (this._children.indexOf(module) < 0) {
			this._children.push(module)
      this.emit(module._name + ':added', module)
		}
	}

	$removeModule (module) {
		var index = this._children.indexOf(module)
		if (index >= 0) {
			this._children.splice(index, 1)
			this.emit(module._name + ':removed', module)
		}
	}

	destroy () {
		if (this._destroyed) {
			return
		}

		if (this._parent) {
			this._parent.$removeModule(this)
			this._parent = null
		}

		this._children.forEach(child => child.destroy())
		this._children = null
		this._destroyed = true
	}
}
