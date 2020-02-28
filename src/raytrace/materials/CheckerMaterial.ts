import Ray3 from "../Ray3";
import Vector3 from "../Vector3";
import Color from "../Color";
import Material from "./Material";

class CheckerMaterial extends Material {
    copy(): Material {
        return new CheckerMaterial(this.scale, this.reflectiveness);
    }

    constructor(public scale: number,
        reflectiveness: number) {
            super(reflectiveness);
    }

    sample(ray: Ray3, position: Vector3, normal: Vector3) {
        return Math.abs(
            (Math.floor(position.x * 0.1) + Math.floor(position.z * this.scale)) % 2) < 1 ?
                Color.Black : Color.White;
    }
}

export default CheckerMaterial;
