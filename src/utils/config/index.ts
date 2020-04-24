const RE_NUMBER = /^\-?\d*\.?\d+(?:e\d+)?$/

export function parseValue (value: any) {
	if (typeof value === 'string') {
		if (value.match(RE_NUMBER)) {
			return parseFloat(value)
		} else if (value === 'true') {
			return true
		} else if (value === 'false') {
			return false
		} else if (value === 'null') {
			return null
		}
	}

	return value
}

export class Parser {
	input: string
	index: number
	buffer: string

	key: null | string
	context: any[] | object
	lastContext: object
	contextStack: object[]

	isImplicitContext: boolean
	isInQuote: boolean | string
	isEscapeNext: boolean
	isQuotedToken: boolean

	init (input) {
		this.input = input
		this.index = 0
		this.buffer = ''

		this.key = null
		this.context = null
		this.lastContext = null
		this.contextStack = []

		this.isImplicitContext = null
		this.isInQuote = false
		this.isEscapeNext = false
		this.isQuotedToken = false
	}

	error (message: string) {
		throw new Error(`${ message } at index ${ this.index }`)
	}

	isEmpty () {
		return Object.keys(this.context).length === 0
	}

	isInArray () {
		return Array.isArray(this.context)
	}

	isExpectingKey () {
		return !this.key && !this.isInArray()
	}

	setContext (value: object) {
		this.context = value
		this.contextStack = [this.context]
		this.isImplicitContext = true
	}

	pushContext (value: object) {
		this.flush()

		if (this.lastContext && !this.contextStack.length) {
			// If there was a root context, it has been popped off, and a new one
			// begins, assume an implicit array context with the previous root as the
			// first entry inside.
			this.setContext([this.lastContext])
		}

		if (this.context || this.key) {
			this.commit(value)
		}

		if (!this.context) {
			// The root context is explicitly defined by the input, i.e. the input
			// string begins with `{` or `[`.
			this.isImplicitContext = false
		}

		this.context = value
		this.contextStack.push(this.context)
	}

	popContext () {
		this.clear()

		if (this.contextStack.length > 0) {
			this.contextStack.pop()
			this.lastContext = this.context
			this.context = this.contextStack[this.contextStack.length - 1]
		} else {
			this.error('Can not pop context')
		}
	}

	commit (value) {
		if (!this.context) {
			// The first value is being commited and there's no explicit context;
			// assume an object context.
			this.setContext({})
		}

		if (this.isQuotedToken) {
			this.isQuotedToken = false
		} else {
			value = parseValue(value)
		}

		if (this.isInArray()) {
			let ctx = this.context as any[]
			ctx.push(value)
		} else if (this.key) {
			this.context[this.key] = value
		} else {
			this.error('Missing value key')
		}

		this.key = null
	}

	flush () {
		var content = this.buffer.trim()
		if (content.length) {
			if (this.isExpectingKey()) {
				this.key = content
			} else {
				this.commit(content)
			}
		}

		this.buffer = ''
	}

	clear () {
		this.flush()

		if (this.key) {
			if (this.key[0] === '!') {
				this.key = this.key.substr(1)
				this.commit(false)
			} else {
				this.commit(true)
			}
		}
	}

	read (char: string) {
		if (this.isEscapeNext) {
			this.isEscapeNext = false
		} else if (this.isInQuote) {
			if (char === '`') {
				this.isQuotedToken = true
				return this.isInQuote = false
			} else if (char === '\\') {
				return this.isEscapeNext = true
			}
		} else {
			if (char === ':') {
				if (this.isExpectingKey()) {
					return this.flush()
				}
			} else if (char === ',') {
				return this.clear()
			} else if (char === '{') {
				return this.pushContext({})
			} else if (char === '[') {
				return this.pushContext([])
			} else if (char === '}' || char === ']') {
				return this.popContext()
			} else if (char === '`') {
				return this.isInQuote = true
			}
		}

		this.buffer += char
	}

	next () {
		this.read(this.input[this.index])
		this.index++
	}

	parse (input: string) {
		this.init(input)

		if (typeof this.input !== 'string') {
			return input
		}

		while (this.index < this.input.length) {
			this.next()
		}

		if (this.isInQuote) {
			this.error('Unterminated string')
		}

		if (this.key || this.context) {
			this.clear()
		}

		if (this.context && this.isImplicitContext) {
			this.popContext()
		}

		if (this.contextStack.length > 0) {
			this.error('Unclosed context')
		}

		if (this.lastContext) {
			return this.lastContext
		} else {
			return parseValue(this.buffer)
		}
	}
}
