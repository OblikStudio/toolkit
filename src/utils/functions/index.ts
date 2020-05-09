export function merge (target: object, ...sources: object[]): any {
	sources.forEach(obj => {
		for (let k in obj) {
			if (obj.hasOwnProperty(k)) {
				if (obj[k] && typeof obj[k] === 'object') {
					if (target[k] && typeof target[k] === 'object') {
						merge(target[k], obj[k])
					} else {
						target[k] = merge({}, obj[k])
					}
				} else {
					target[k] = obj[k]
				}
			}
		}
	})

	return target
}
