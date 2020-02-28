import Shape from "./shapes/Shape";
import Ray3 from "./Ray3";
import IntersectResult from "./shapes/IntersectResult";

class Union{
    constructor(
        public geometries: Array<Shape>
    ){}

    initialize() {
        for (const geometry of this.geometries) {
            geometry.initialize();
        }
    }

    intersect(ray: Ray3) {
        let minDistance = Infinity;
        let minResult = IntersectResult.NoHit;

        for (const geometry of this.geometries) {
            const result = geometry.intersect(ray);
            if (result.geometry && result.distance <= minDistance) {
                minDistance = result.distance;
                minResult = result;
            }
        }
        return minResult;
    }
}

export default Union;
