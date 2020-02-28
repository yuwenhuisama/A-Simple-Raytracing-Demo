import Color from "../Color";
import Ray3 from "../Ray3";
import Vector3 from "../Vector3";

abstract class Material {
    constructor(public reflectiveness: number) {}

    abstract sample(ray: Ray3, position: Vector3, normal: Vector3): Color;
    abstract copy(): Material;
}

export default Material;
