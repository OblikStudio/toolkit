import { findAnchor } from "../../utils/dom";
import { Easing, easeOutQuint } from "../../utils/easings";
import { debounce } from "../../utils/functions";
import { scrollTo } from "../../utils/scroll";
import { Component } from "../..";
import { Cache } from "./cache";
import { Container } from "./container";

interface State {
	scroll: number;
}

export interface Options {
	scroll: {
		duration: number;
		easing: Easing;
	};
}

export class Loader extends Component<Element, Options> {
	static components = {
		container: Container,
	};

	static defaults: Options = {
		scroll: {
			duration: 1000,
			easing: easeOutQuint,
		},
	};

	cache: Cache;
	parser: DOMParser;
	scrollAnimation: ReturnType<typeof scrollTo>;
	promiseTransition: Promise<any>;
	isIgnoreNextPop: boolean;

	protected popStateHandler = this.handlePopState.bind(this);
	protected clickHandler = this.handleClick.bind(this);
	protected scrollHandler = this.handleScroll.bind(this);
	protected scrollUpdateDebounced = debounce(this.scrollUpdate.bind(this), 100);

	create() {
		this.cache = new Cache();
		this.parser = new DOMParser();
	}

	init() {
		window.addEventListener("popstate", this.popStateHandler);
		document.addEventListener("click", this.clickHandler);
		document.addEventListener("scroll", this.scrollHandler);

		history.scrollRestoration = "manual";
	}

	changeState(state: State, url?: string) {
		if (url) {
			history.pushState(state, "", url);
		} else {
			history.replaceState(state, "");
		}
	}

	scrollTo(options: { target?: HTMLElement; offset?: number }) {
		let defaults = (this.constructor as typeof Loader).defaults;
		let config: Parameters<typeof scrollTo>[0] = Object.assign(
			{},
			defaults.scroll,
			options
		);

		if (this.scrollAnimation) {
			this.scrollAnimation.stop();
		}

		this.scrollAnimation = scrollTo(config);
	}

	getFragmentElement(url: URL): HTMLElement {
		if (url.hash) {
			return document.querySelector(url.hash);
		} else {
			return null;
		}
	}

	getContainers() {
		let result: Container[] = [];

		for (let name in this.constructor.components) {
			let comp = this["$" + name] as Container;
			if (comp) {
				result.push(comp);
			}
		}

		return result;
	}

	addContainers(doc: Document) {
		let promises = this.getContainers().map((container) => {
			let element = doc.querySelector(`[ob-loader-${container.$name}]`);
			let parent = container.$element.parentElement;

			if (element && container) {
				parent.insertBefore(element, container.$element);
				return this.$emitter.promise(`add:${container.$name}`);
			}
		});

		return Promise.all(promises);
	}

	showContainers() {
		return Promise.all(
			this.getContainers().map((container) => {
				return this.interruptify(container.animateIn());
			})
		);
	}

	hideContainers() {
		return Promise.all(
			this.getContainers().map((container) => {
				return this.interruptify(container.animateOut());
			})
		);
	}

	removeContainers() {
		let containers = this.getContainers();

		this.$children.forEach((child) => {
			if (containers.indexOf(child as Container) < 0) {
				child.$element.parentElement.removeChild(child.$element);
			}
		});
	}

	interruptify(action: Promise<any>) {
		return new Promise((resolve, reject) => {
			let ready = false;

			action
				.then(() => {
					ready = true;
					resolve(true);
				})
				.catch(reject);

			this.$emitter.once("navigation", () => {
				if (!ready) {
					reject(new Error("Interrupted"));
				}
			});
		});
	}

	async transition(state: State, url: string, push: boolean) {
		let markup: string = null;
		let added = false;

		try {
			await Promise.all([
				this.hideContainers(),
				this.cache.fetch(url).then((v) => (markup = v)),
			]);

			let doc = this.parser.parseFromString(markup, "text/html");
			await this.addContainers(doc);
			added = true;

			this.removeContainers();

			if (push) {
				this.changeState(state, url);
				document.title = doc.querySelector("head title")?.textContent;
			}

			let element = this.getFragmentElement(new URL(url));
			let options: Parameters<Loader["scrollTo"]>[0] = {};

			if (element && element) {
				options.target = element;
			} else if (typeof state.scroll === "number") {
				options.offset = state.scroll;
			}

			this.scrollTo(options);

			await this.showContainers();
		} catch (e) {
			// New navigation interrupted the transition. If the containers were
			// not added, the out animation was interruped. In that case,
			// immediately remove the old containers and add the new ones so
			// that the new transition can play *their* out animation.

			if (markup && !added) {
				let doc = this.parser.parseFromString(markup, "text/html");
				await this.addContainers(doc);
				document.scrollingElement.scrollTop = state.scroll;

				this.removeContainers();
			}
		}

		this.promiseTransition = null;
	}

	async performTransition(state: State, url: string, push = false) {
		this.$emitter.emit("navigation");

		if (this.promiseTransition) {
			await this.promiseTransition;
		}

		this.promiseTransition = this.transition(state, url, push);
	}

	handleClick(event: MouseEvent) {
		if (event.target instanceof Element) {
			let link = findAnchor(event.target);

			if (link) {
				let href = link.getAttribute("href");
				let target = link.getAttribute("target");

				if (href && this.handleNavigation(href, target) === true) {
					event.preventDefault();
				}
			}
		}
	}

	handleNavigation(href: string, target?: string) {
		let url = new URL(href, window.location.href);
		let sameOrigin = url.host === window.location.host;
		let samePath = url.pathname === window.location.pathname;
		let shouldLink = sameOrigin && target !== "_blank";
		let shouldScrollOnly = shouldLink && samePath && url.hash;

		if (shouldLink) {
			if (shouldScrollOnly) {
				// When the hash is changed, a popstate event is fired. Ignore
				// it to avoid changing the page.
				this.isIgnoreNextPop = true;

				this.scrollTo({
					target: this.getFragmentElement(url),
				});

				// Do not preventDefault() to fire the window hashchange event.
				return false;
			} else {
				this.performTransition({ scroll: 0 }, url.href, true);

				return true;
			}
		}
	}

	handlePopState() {
		if (this.isIgnoreNextPop) {
			this.isIgnoreNextPop = false;
			return;
		}

		this.performTransition(history.state, window.location.href);
	}

	handleScroll() {
		if (!this.promiseTransition) {
			this.scrollUpdateDebounced();
		}
	}

	scrollUpdate() {
		this.changeState({
			...history.state,
			scroll: document.scrollingElement.scrollTop,
		});
	}

	destroy() {
		window.removeEventListener("popstate", this.popStateHandler);
		document.removeEventListener("click", this.clickHandler);
		document.removeEventListener("scroll", this.scrollHandler);
	}
}

export { Container };
export default Loader;
