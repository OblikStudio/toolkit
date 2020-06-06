import '../../src/polyfill'
import { Watcher, components } from '../../src'

let comps = {}

for (let k in components) {
	comps[k.toLowerCase()] = components[k]
}

let w = new Watcher(document.body, {
	components: comps
})

w.init()
