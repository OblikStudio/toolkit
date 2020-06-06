export function isObject (input: any): input is object {
	return input && typeof input === 'object'
}

export function merge (target: object, ...sources: object[]): any {
	sources.forEach(obj => {
		if (isObject(obj)) {
			for (let k in obj) {
				if (obj.hasOwnProperty(k)) {
					if (isObject(obj[k]) && isObject(target[k])) {
						merge(target[k], obj[k])
					} else {
						target[k] = obj[k]
					}
				}
			}
		}
	})

	return target
}
