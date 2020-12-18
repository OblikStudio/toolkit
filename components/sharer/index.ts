import { copyToClipboard } from "../../utils";
import { Component } from "../..";
import * as Sharers from "./urls";

interface Options extends Sharers.SharerOptions {
	type: "copy" | keyof typeof Sharers;
	width?: number;
	height?: number;
}

export class Sharer extends Component<Element, Options> {
	static defaults: Partial<Options> = {
		width: 600,
		height: 400,
		url: window.location.href,
		text: document.title,
	};

	static getUrl(data: Options) {
		let sharer = Sharers[data.type] as Sharers.Sharer;

		if (sharer) {
			return sharer(data);
		}
	}

	protected clickHandler = this.action.bind(this);

	init() {
		this.$element.addEventListener("click", this.clickHandler);
	}

	destroy() {
		this.$element.removeEventListener("click", this.clickHandler);
	}

	action() {
		if (this.$options.type === "copy") {
			copyToClipboard(this.$options.url);
			this.handleCopy();
		} else {
			let ctor = this.constructor as typeof Sharer;
			let url = ctor.getUrl(this.$options);

			if (url) {
				window.open(
					url,
					"_blank",
					`width=${this.$options.width},height=${this.$options.height}`
				);
			}
		}
	}

	handleCopy() {
		alert("URL copied!");
	}
}

export default Sharer;
