/**
 * Restricts a value to a specified minimum and maximum.
 */
export function clamp(number: number, min: number, max: number) {
	return Math.min(Math.max(number, min), max);
}

export class Point {
	static average(...points: Point[]) {
		let pt = new Point();

		points.forEach((p) => pt.addPoint(p));

		pt.x /= points.length;
		pt.y /= points.length;

		return pt;
	}

	constructor(public x = 0, public y = 0) {
		this.set(x, y);
	}

	clone() {
		return new Point(this.x, this.y);
	}

	set(a: number, b?: number) {
		this.x = a;
		this.y = b ?? a;
		return this;
	}

	setPoint(p: Point) {
		return this.set(p.x, p.y);
	}

	add(a: number, b?: number) {
		this.x += a;
		this.y += b ?? a;
		return this;
	}

	addPoint(p: Point) {
		return this.add(p.x, p.y);
	}

	addVector(v: Vector) {
		return this.add(
			v.magnitude * Math.cos(v.direction),
			v.magnitude * Math.sin(v.direction)
		);
	}

	sub(a: number, b?: number) {
		this.x -= a;
		this.y -= b ?? a;
		return this;
	}

	subPoint(p: Point) {
		return this.sub(p.x, p.y);
	}

	mul(a: number, b?: number) {
		this.x *= a;
		this.y *= b ?? a;
		return this;
	}

	mulPoint(p: Point) {
		return this.mul(p.x, p.y);
	}

	dist(p?: Point) {
		let x = this.x;
		let y = this.y;

		if (p) {
			x -= p.x;
			y -= p.y;
		}

		return Math.hypot(Math.abs(x), Math.abs(y));
	}

	to(input: Point) {
		return new Vector(this, input);
	}
}

export class Vector {
	magnitude = 0;
	direction = 0;

	constructor(p1?: Point, p2?: Point) {
		if (p1) {
			this.set(p1, p2);
		}
	}

	copy() {
		let v = new Vector();
		v.magnitude = this.magnitude;
		v.direction = this.direction;
		return v;
	}

	set(p1: Point, p2?: Point) {
		let x = p1.x;
		let y = p1.y;

		if (p2) {
			x = p2.x - x;
			y = p2.y - y;
		}

		this.magnitude = Math.sqrt(y ** 2 + x ** 2);
		this.direction = Math.atan2(y, x);
	}

	add(vector: Vector) {
		let point = new Point();

		point.addVector(this);
		point.addVector(vector);

		this.set(point);
	}
}
