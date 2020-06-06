// For more advanced detection:
// https://github.com/lancedikson/bowser

const ua = navigator.userAgent.toLowerCase()

var name = 'unknown'
var isMobile = ua.match(/android|webos|iphone|ipad|ipod|blackberry|windows phone/i)

if (ua.indexOf('firefox') >= 0) {
	name = 'firefox'
} else if (ua.indexOf('edge') >= 0) {
	name = 'edge'
} else if (ua.indexOf('chrome') >= 0) {
	name = 'chrome'
} else if (ua.indexOf('safari') >= 0) {
	name = 'safari'
} else if (ua.indexOf('trident') >= 0) {
	name = 'ie'
}

export function browser () {
	return name
}

export function mobile () {
	return isMobile
}
