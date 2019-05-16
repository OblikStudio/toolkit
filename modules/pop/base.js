import BaseModule from '../BaseModule'

export default class extends BaseModule {
	constructor (element, options) {
		super('pop')

		this.on('contentAdd', function () {
			console.log('added content')
		})

		this.on('contentRemove', function () {
			console.log('removed content')
		})

		console.log('created pop')
	}

	destroy () {
		super.destroy()
	}
}
