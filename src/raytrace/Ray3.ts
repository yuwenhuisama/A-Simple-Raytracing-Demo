import Vector3 from "./Vector3";

class Ray3 {
    constructor(public original: Vector3, public direction: Vector3) {}

    getPoint(t: number) {
        return this.original.add(this.direction.multiply(t));
    }
}

export default Ray3;
