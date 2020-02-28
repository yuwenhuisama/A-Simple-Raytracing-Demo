import Ray3 from "../Ray3";
import Vector3 from "../Vector3";
import Color from "../Color";
import Material from "./Material";

const lightDir = new Vector3(1, 1, 1).normalize();
const lightColor = Color.White;

class PhongMaterial extends Material {
    copy(): Material {
        return new PhongMaterial(
            this.diffuse.copy(),
            this.specular.copy(),
            this.shininess,
            this.reflectiveness);
    }
    constructor(
        public diffuse: Color,
        public specular: Color,
        public shininess: number,
        reflectiveness: number
    ) {
        super(reflectiveness);
    }

    sample(ray: Ray3, position: Vector3, normal: Vector3) {
        const NDotL = normal.dot(lightDir);
        const H = (lightDir.substract(ray.direction)).normalize();
        const NdotH = normal.dot(H);
        const diffuseTerm = this.diffuse.multiply(Math.max(NDotL, 0));
        const specularTerm = this.specular.multiply(Math.pow(Math.max(NdotH, 0), this.shininess));
        return lightColor.modulate(diffuseTerm.add(specularTerm));
    }
}

export default PhongMaterial;
