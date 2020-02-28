import Shape from "./Shape";
import Vector3 from "../Vector3";
import Material from "../materials/Material";
import Ray3 from "../Ray3";
import IntersectResult from "./IntersectResult";

class Plane extends Shape {
    position = Vector3.zero;

    constructor(public normal: Vector3, public d: number, public material: Material) {
        super(material)
    }

    copy(): Shape {
        return new Plane(this.normal.copy(), this.d, this.material.copy());
    }
    
    initialize(): void {
        this.position = this.normal.multiply(this.d);
    }

    intersect(ray: Ray3) {
        const a = ray.direction.dot(this.normal);
        if (a >= 0) {
            return IntersectResult.NoHit;
        }

        const b = this.normal.dot(ray.original.substract(this.position));
        
        const distance = -b / a;
        const result: IntersectResult = new IntersectResult(
            this,
            distance,
            ray.getPoint(distance),
            this.normal
        );

        return result;
    }
}

export default Plane;
