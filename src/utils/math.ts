/**
 * Restricts a value to a specified minimum and maximum.
 */
export function clamp (number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}
