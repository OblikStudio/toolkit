export default function (element, options) {
	var src = element.getAttribute('data-src')
	element.style.backgroundImage = `url(${ src })`
}
