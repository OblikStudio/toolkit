import { Component, ComponentConstructor } from "../..";
import { merge } from "../../utils/functions";
import { value } from "./parse";
import { resolve } from "./resolve";

interface WatcherSettings {
	prefix?: string;
	components: {
		[key: string]: ComponentConstructor;
	};
}

export class Watcher {
	private instances: Map<Element, Map<ComponentConstructor, Component>>;
	private observer?: MutationObserver;

	target: Element;
	options: WatcherSettings;

	constructor(element: Element, settings: WatcherSettings) {
		this.target = element;
		this.options = merge(
			{
				prefix: "ob",
				components: {},
			},
			settings
		);

		this.instances = new Map();
	}

	private handleMutations(list: MutationRecord[]) {
		list.forEach((mutation) => {
			mutation.addedNodes.forEach((n) => {
				if (n instanceof Element) {
					this.runInternal(n, this.options.components);
				}
			});

			mutation.removedNodes.forEach((n) => {
				if (n instanceof Element) {
					this.runDestroy(n);
				}
			});
		});
	}

	private runInternal(
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
					this.runInternal(inst, comp.components, fullName);
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

	run() {
		this.runInternal(this.target, this.options.components);
	}

	observe() {
		this.run();

		this.observer = new MutationObserver((list) => this.handleMutations(list));
		this.observer.observe(this.target, {
			childList: true,
			subtree: true,
		});
	}

	instance(element: Element, id: string) {
		return this.instances.get(element)?.[id];
	}

	destroy() {
		this.target = null;
		this.instances.clear();
		this.observer?.disconnect();
	}
}

export default Watcher;
