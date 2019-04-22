export default function (element, options) {
	var targets = [element]

	if (options.target) {
		targets = [document.querySelector(options.target)]
	}

	if (options.targets) {
		targets = document.querySelectorAll(options.targets)
	}

	var toggle = function () {
		targets.forEach(target => {
			target.classList.toggle(options.class)
		})
	}

	element.addEventListener('click', toggle)
}
