interface Instruction {
	name: string
	arg: string
}

export default class {
	name: string
	arg: string
	brackets: number
	data: Instruction[]

	init () {
		this.clear()
		this.brackets = 0
		this.data = []
	}

	clear () {
		this.name = ''
		this.arg = ''
	}

	commit () {
		if (this.name) {
			this.data.push({
				name: this.name,
				arg: this.arg || null
			})

			this.clear()
		}
	}

	read (char: string) {
		if (char === '(') {
			this.brackets++

			if (this.brackets === 1) {
				if (!this.name) {
					throw new Error('Method name expected')
				}

				return
			}
		} else if (char === ')') {
			this.brackets--

			if (this.brackets === 0) {
				this.commit()
				return
			}
		}

		if (this.brackets) {
			this.arg += char
		} else if (char === '.') {
			this.commit()
		} else {
			this.name += char
		}
	}

	parse (input: string) {
		this.init()

		if (typeof input === 'string' && input.length) {
			for (let i = 0; i < input.length; i++) {
				this.read(input[i])
			}

			this.commit()
		}

		if (this.brackets) {
			throw new Error('Unclosed brackets')
		}

		return this.data
	}
}
