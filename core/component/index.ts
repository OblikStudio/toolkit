import { Emitter } from "../../utils/emitter";
import { merge } from "../../utils/functions";

export interface ComponentConstructor<E extends Element = Element, O = object> {
	new (element: E, options?: O): Component<E, O>;
	readonly components?: {
		[key: string]: ComponentConstructor<any, any>;
	};
	defaults?: Partial<O>;
	$name(ctor: ComponentConstructor<any, any>): string;
}

export class Component<E extends Element = Element, O = object> {
	["constructor"]: ComponentConstructor<E, O>;

	private _isInit = false;
	private _isDestroyed = false;

	$name: string = null;
	$element: E;
	$options: O;
	$parent: Component<Element, any>;
	$emitter: Emitter<any>;
	$children: Component[] = [];

	static $name(this: ComponentConstructor, ctor: ComponentConstructor) {
		if (this.components) {
			let names = Object.entries(this.components)
				.filter((entry) => entry[1] === ctor)
				.map((tuple) => tuple[0]);

			if (names.length === 1) {
				return names[0];
			} else if (names.length < 1) {
				throw new Error(`${this.name} has no child: ${ctor.name}`);
			} else if (names.length > 1) {
				throw new Error(`Subcomponent has multiple names: ${names}`);
			}
		} else {
			throw new Error(`Component has no children: ${this.name}`);
		}
	}

	constructor(element: E, options?: Partial<O>) {
		this.$element = element;
		this.$options = merge({} as any, this.constructor.defaults, options);
		this.$emitter = new Emitter();

		this.create();
	}

	$init() {
		if (!this._isInit) {
			this.$children.forEach((child) => child.$init());

			this.init();
			this.$emitter.emit("init");
			this._isInit = true;
		}
	}

	private _ref(component: Component, remove = false) {
		let prop = "$" + component.$name;
		let value = this[prop];

		if (Array.isArray(value)) {
			let index = value.indexOf(component);
			let added = index >= 0;

			if (remove) {
				if (added) {
					value.splice(index, 1);
				}
			} else if (!added) {
				value.push(component);
			}
		} else {
			if (remove) {
				if (value === component) {
					this[prop] = null;
				}
			} else {
				this[prop] = component;
			}
		}
	}

	$addChild(component: Component<Element, any>) {
		if (this.$children.indexOf(component) < 0) {
			component.$name = this.constructor.$name(component.constructor);
			component.$parent = this;

			this.$children.push(component);
			this._ref(component);
			this.$emitter.emit("add:" + component.$name, component);
		}
	}

	$removeChild(component: Component<Element, any>) {
		let index = this.$children.indexOf(component);
		if (index >= 0) {
			component.$parent = null;

			this.$children.splice(index, 1);
			this._ref(component, true);
			this.$emitter.emit("remove:" + component.$name, component);
		}
	}

	$destroy() {
		if (!this._isDestroyed) {
			this.destroy();

			Array.from(this.$children).forEach((child) => {
				child.$destroy();
			});

			if (this.$parent) {
				this.$parent.$removeChild(this);
			}

			this.$emitter.emit("destroy");
			this._isDestroyed = true;
		}
	}

	create() {}
	init() {}
	destroy() {}
}
