/**
 * Restricts a value to a specified minimum and maximum.
 */
export function clamp (number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}

export class Point {
  x: number
  y: number

  constructor (x = 0, y = 0) {
    this.set(x, y)
  }

  set (input: number | Point, y?: number) {
    if (typeof input === 'number') {
      this.x = input
      this.y = y
    } else if (input instanceof Point) {
      this.set(input.x, input.y)
    }
  }

  add (input: number | Vector, y = 0) {
    if (typeof input === 'number') {
      this.set(this.x + input, this.y + y)
    } else if (input instanceof Vector) {
      this.add(
        input.magnitude * Math.cos(input.direction),
        input.magnitude * Math.sin(input.direction)
      )
    }
  }
}

export class Vector {
  magnitude = 0
  direction = 0

  constructor (p1?: Point, p2?: Point) {
    if (p1) {
      this.set(p1, p2)
    }
  }

  set (p1: Point, p2?: Point) {
    let x = p1.x
    let y = p1.y

    if (p2) {
      x = p2.x - x
      y = p2.y - y
    }

    this.magnitude = Math.sqrt(y ** 2 + x ** 2)
    this.direction = Math.atan2(y, x)
  }

  add (vector: Vector) {
    let point = new Point()

    point.add(this)
    point.add(vector)

    this.set(point)
  }
}
