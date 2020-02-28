import Vector3 from "../Vector3";
import Ray3 from "../Ray3";
import IntersectResult from "./IntersectResult";
import Shape from "./Shape";
import Material from "../materials/Material";

class Sphare extends Shape {
    constructor(public center: Vector3, public radius: number, public material: Material) {
        super(material);
    }

    private sqrRadius = 0;

    copy() {
        return new Sphare(this.center.copy(), this.radius, this.material.copy());
    }

    initialize() {
        this.sqrRadius = this.radius * this.radius;
    }

    intersect(ray: Ray3) {
        const v = ray.original.substract(this.center);
        const a0 = v.sqrLength() - this.sqrRadius;
        const DdotV = ray.direction.dot(v);

        if (DdotV <= 0) {
            const discr = DdotV * DdotV - a0;
            if (discr >= 0) {
                const distance = -DdotV - Math.sqrt(discr);
                const result: IntersectResult = new IntersectResult(
                    this,
                    -DdotV - Math.sqrt(discr),
                    ray.getPoint(distance),
                    ray.getPoint(distance).substract(this.center).normalize()
                );

                return result;
            }
        }

        return IntersectResult.NoHit;
    }
}

export default Sphare;
