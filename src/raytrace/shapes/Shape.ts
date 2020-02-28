import Material from "../materials/Material";
import IntersectResult from "./IntersectResult";
import Ray3 from "../Ray3";

abstract class Shape {
    constructor(public material: Material) {}

    abstract copy(): Shape;
    abstract initialize(): void;
    abstract intersect(ray: Ray3): IntersectResult;
}

export default Shape;
