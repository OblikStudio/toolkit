/**
 * Restricts a value to a specified minimum and maximum.
 * @param {number} number
 * @param {number} min 
 * @param {number} max 
 */
export function clamp (number, min, max) {
  return Math.min(Math.max(number, min), max)
}
