class Vector3 {
    constructor(public x: number,
        public y: number,
        public z: number) {}

    copy() {
        return new Vector3(this.x, this.y, this.z);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    sqrLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize() {
        const inv = 1 / this.length();
        return new Vector3(this.x * inv, this.y * inv, this.z * inv)
    }

    negate() {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    add(v: Vector3) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    substract(v: Vector3) {
        return this.add(v.negate());
    }

    multiply(factor: number) {
        return new Vector3(this.x * factor, this.y * factor, this.z * factor);
    }

    devive(factor: number) {
        return this.multiply(1 / factor);
    }

    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v: Vector3) {
        return new Vector3(
            -this.z * v.y + this.y * v.z,
            this.z * v.x - this.x * v.z,
            -this.y * v.x + this.x * v.y
        );
    }

    static zero = new Vector3(0, 0, 0);
}

export default Vector3;
