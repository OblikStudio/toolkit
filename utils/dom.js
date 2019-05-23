export function getAnchor (element) {
  var value = null

  do {
    value = element.nodeName === 'A'
  } while (!value && (element = element.parentNode))

  if (value) {
    return element
  } else {
    return false
  }
}
