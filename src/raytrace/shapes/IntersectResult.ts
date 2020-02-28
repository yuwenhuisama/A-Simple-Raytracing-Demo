import Vector3 from "../Vector3";
import Shape from "./Shape";

class IntersectResult {
    constructor(public geometry: Shape | null,
        public distance: number,
        public position: Vector3,
        public normal: Vector3) {}

    copy() {
        return new IntersectResult(this.geometry, this.distance, this.position, this.normal);
    }

    static NoHit = new IntersectResult(null, 0, Vector3.zero, Vector3.zero);
}

export default IntersectResult;
