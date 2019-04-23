export default function (element, options) {
	var targets = [element]

	if (options.target) {
		targets = [document.querySelector(options.target)]
	}

	if (options.targets) {
		targets = document.querySelectorAll(options.targets)
	}

	var toggle = function () {
		for (var target of targets) {
			target.classList.toggle(options.class)
		}
	}

	element.addEventListener('click', toggle)
}
