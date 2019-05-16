import EventEmitter from 'events'

export default class extends EventEmitter {
	constructor (name, parent) {
		super()

		this._name = name
		this._parent = parent
		this._children = []
		this._destroyed = false

		if (this._parent) {
			this._parent._addModule(this)
		}
	}

	_addModule (module) {
		if (this._children.indexOf(module) < 0) {
			this._children.push(module)
			this.emit(module._name + 'Add', module)
		}
	}

	_removeModule (module) {
		var index = this._children.indexOf(module)
		if (index >= 0) {
			this._children.splice(index, 1)
			this.emit(module._name + 'Remove', module)
		}
	}

	destroy () {
		if (this._destroyed) {
			return
		}

		if (this._parent) {
			this._parent._removeModule(this)
			this._parent = null
		}

		this._children.forEach(child => child.destroy())
		this._children = null
		this._destroyed = true
	}
}
