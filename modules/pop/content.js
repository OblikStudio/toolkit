import BaseModule from '../BaseModule'

export default class extends BaseModule {
	constructor (element, options, parent) {
		super('content', parent)

		console.log('created content')
	}
}
