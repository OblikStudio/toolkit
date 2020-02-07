export interface Entry {
	markup: string
}

export class Cache {
	entries: {
		[key: string]: Entry
	}

	constructor () {
		this.entries = {}
	}

	get (url: string) {
		return this.entries[url]
	}

	set (url: string, data: Entry) {
		return this.entries[url] = data
	}
}
