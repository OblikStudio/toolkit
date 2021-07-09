import { defaults } from "../../utils/functions";
import { Component, ComponentConstructor } from "../component";
import * as getters from "./getters";

const RE_CONFIG = /([^:]+):([^,]*),?/g;
const RE_NUMBER = /^\-?\d*\.?\d+(?:e-?\d+)?$/;

interface WatcherSettings {
	element?: HTMLElement;
	prefix?: string;
	components: {
		[key: string]: ComponentConstructor<any, any>;
	};
	getters?: {
		[key: string]: getters.Getter;
	};
}

export class Watcher {
	private instances: Map<Element, Map<ComponentConstructor, Component>>;
	private observer?: MutationObserver;

	options: WatcherSettings = {
		element: document.body,
		prefix: "ob",
		components: {},
		getters: {
			...getters,
		},
	};

	constructor(settings: WatcherSettings) {
		this.options = defaults(settings, this.options);
		this.instances = new Map();
	}

	private runCreate(
		target: Element | Component,
		components: { [key: string]: ComponentConstructor },
		name?: string
	) {
		let el = target instanceof Element ? target : target.$element;
		let parent = target instanceof Element ? undefined : target;

		for (let k in components) {
			let comp = components[k];
			let fullName = name ? `${name}-${k}` : k;
			let attr = `${this.options.prefix}-${fullName}`;
			let sel = `[${attr}]`;
			let qs = Array.from(el.querySelectorAll(sel));

			if (el.matches(sel)) {
				qs.unshift(el);
			}

			for (let i = 0, l = qs.length; i < l; i++) {
				let eq = qs[i];
				let comps = this.instances.get(eq);

				if (!comps) {
					comps = new Map();
					this.instances.set(eq, comps);
				} else if (comps.get(comp)) {
					continue;
				}

				let inst: Component;

				try {
					inst = new comp(eq, this.parseOptions(eq.getAttribute(attr), eq));
				} catch (e) {
					console.error(`Create ${fullName}:`, e);
					continue;
				}

				comps.set(comp, inst);

				if (parent) {
					parent.$addChild(inst);
				}

				if (comp.components) {
					this.runCreate(inst, comp.components, fullName);
				}

				if (!parent) {
					// Children are initialized by parents, so only parents
					// should be initialized.
					try {
						inst.$init();
					} catch (e) {
						console.error(`Init ${fullName}:`, e);
					}
				}
			}
		}
	}

	private runDestroy(target: Element) {
		this.instances.forEach((comps, el) => {
			if (el === target || target.contains(el)) {
				comps.forEach((c) => c.$destroy());
				this.instances.delete(target);
			}
		});
	}

	private handleMutations(list: MutationRecord[]) {
		list.forEach((mutation) => {
			mutation.addedNodes.forEach((n) => {
				if (n instanceof Element) {
					this.runCreate(n, this.options.components);
				}
			});

			mutation.removedNodes.forEach((n) => {
				if (n instanceof Element) {
					this.runDestroy(n);
				}
			});
		});
	}

	private parseOptions(value: string, element: Element) {
		if (value[0] === "{") {
			return JSON.parse(value);
		}

		let result = {};
		let match: RegExpExecArray;

		RE_CONFIG.lastIndex = 0;

		while ((match = RE_CONFIG.exec(value))) {
			let k = match[1].trim();
			let v: any = match[2].trim();

			if (v.match(RE_NUMBER)) {
				v = parseFloat(v);
			} else if (v === "true") {
				v = true;
			} else if (v === "false") {
				v = false;
			} else if (v === "null") {
				v = null;
			} else if (v.length === 0) {
				v = undefined;
			}

			if (k.indexOf("$") > 0) {
				let split = k.split("$");
				let getter = this.options.getters[split[1]];

				k = split[0];
				v = getter ? getter(v, element) : null;
			}

			result[k] = v;
		}

		return result;
	}

	run() {
		this.runCreate(this.options.element, this.options.components);
	}

	observe() {
		this.observer = new MutationObserver((list) => this.handleMutations(list));
		this.observer.observe(this.options.element, {
			childList: true,
			subtree: true,
		});
	}

	get<T extends ComponentConstructor<any, any>>(
		element: Element,
		constructor: T
	): InstanceType<T> {
		return this.instances.get(element)?.get(constructor) as any;
	}

	destroy() {
		this.instances.clear();
		this.observer?.disconnect();
	}
}

export default Watcher;
