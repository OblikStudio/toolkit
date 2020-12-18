export class Cache {
	entries: {
		[key: string]: string;
	};

	constructor() {
		this.entries = {
			[window.location.href]: document.documentElement.outerHTML,
		};
	}

	get(url: string) {
		return this.entries[url];
	}

	set(url: string, markup: string) {
		return (this.entries[url] = markup);
	}

	async fetch(url: string): Promise<string> {
		let entry = this.get(url);

		if (!entry) {
			entry = this.set(
				url,
				await fetch(url).then((response) => response.text())
			);
		}

		return entry;
	}
}
