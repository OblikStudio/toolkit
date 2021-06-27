import { merge } from "../../utils/functions";
import { Component, ComponentConstructor } from "../component";
import { value } from "./parse";
import { resolve } from "./resolve";

interface WatcherSettings {
	element?: HTMLElement;
	prefix?: string;
	components: {
		[key: string]: ComponentConstructor<any, any, any>;
	};
}

export class Watcher {
	private instances: Map<Element, Map<ComponentConstructor, Component>>;
	private observer?: MutationObserver;

	options: WatcherSettings;

	constructor(settings: Partial<WatcherSettings>) {
		this.options = merge<WatcherSettings>(
			{
				element: document.body,
				prefix: "ob",
				components: {},
			},
			settings
		);

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

			for (let i = qs.length - 1; i >= 0; i--) {
				let eq = qs[i];
				let comps = this.instances.get(eq);

				if (!comps) {
					comps = new Map();
					this.instances.set(eq, comps);
				} else if (comps.get(comp)) {
					continue;
				}

				let opts = value(eq.getAttribute(attr));
				resolve(opts, eq);

				let inst = new comp(eq, opts, parent);
				comps.set(comp, inst);

				if (comp.components) {
					this.runCreate(inst, comp.components, fullName);
				}

				if (!parent) {
					// Children are initialized by parents, so only parents
					// should be initialized.
					inst.$init();
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

	get(element: Element, constructor?: ComponentConstructor) {
		let comps = this.instances.get(element);
		return comps && constructor ? comps.get(constructor) : comps;
	}

	destroy() {
		this.instances.clear();
		this.observer?.disconnect();
	}
}

export default Watcher;
