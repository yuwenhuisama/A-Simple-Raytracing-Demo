import PerspectiveCamera from "./PerspectiveCamera";
import Sphare from "./shapes/Sphare";
import Vector3 from "./Vector3";
import PhongMaterial from "./materials/PhongMaterial";
import Color from "./Color";
import Union from "./Union";
import Plane from "./shapes/Plane";
import CheckerMaterial from "./materials/CheckerMaterial";
import Ray3 from "./Ray3";

class Scene {
    constructor(
        private canvas: HTMLCanvasElement,
        private camera: PerspectiveCamera,
        private maxDepth: number,
    ) {}

    // private objects = new Sphare(new Vector3(0, 0, 0), 10, new PhongMaterial(Color.Green, Color.White, 16, 16));
    private objects = new Union([
        new Sphare(new Vector3(-10, 10, -10), 10, new PhongMaterial(Color.Red, Color.White, 16, 0.25)),
        new Sphare(new Vector3(10, 10, -10), 10, new PhongMaterial(Color.Blue, Color.White, 16, 0.25)),
        new Plane(new Vector3(0, 1, 0), 0, new CheckerMaterial(0.1, 0.5)),
    ]);

    initialize() {
        this.objects.initialize();
        this.camera.initialize();
    }

    private _rayTranceRecursive(ray: Ray3, maxReflect: number) {
        const result = this.objects.intersect(ray);

        if (result.geometry) {
            const reflectiveness = result.geometry.material.reflectiveness;
            let color = result.geometry.material.sample(ray, result.position, result.normal);
            color = color.multiply(1 - reflectiveness);

            if (reflectiveness > 0 && maxReflect > 0) {
                const r = result.normal.multiply(-2 * result.normal.dot(ray.direction)).add(ray.direction);
                ray = new Ray3(result.position, r);
                const reflectedColor = this._rayTranceRecursive(ray, maxReflect - 1);
                color = color.add(reflectedColor.multiply(reflectiveness));
            }
            return color
        }
        else {
            return Color.Black;
        }
    }

    render() {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            const w = Number(this.canvas.attributes.getNamedItem('width')!.value);
            const h = Number(this.canvas.attributes.getNamedItem('height')!.value);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, w, h);

            const imgData = ctx.getImageData(0, 0, w, h);
            const pixels = imgData.data;

            let i = 0;
            for (let y = 0; y < h; ++y) {
                const sy = 1 - y / h;
                for (let x = 0; x < w; ++x) {
                    const sx = x / w;
                    const ray = this.camera.generateRay(sx, sy);
                    const color = this._rayTranceRecursive(ray, 100);

                    pixels[i] = color.r * 255;
                    pixels[i+1] = color.g * 255;
                    pixels[i+2] = color.b * 255;
                    pixels[i+3] = 255;

                    // if (result.geometry) {
                    //     const color = result.geometry.material.sample(ray, result.position, result.normal);
                    //     pixels[i] = color.r * 255;
                    //     pixels[i+1] = color.g * 255;
                    //     pixels[i+2] = color.b * 255;
                    //     pixels[i+3] = 255;

                    //     // const depth = 255 - Math.min((result.distance / this.maxDepth) * 255, 255);
                    //     // pixels[i] = depth;
                    //     // pixels[i + 1] = depth;
                    //     // pixels[i + 2] = depth;

                    //     // pixels[i] = (result.normal.x + 1) * 128;
                    //     // pixels[i+1] = (result.normal.y + 1) * 128;
                    //     // pixels[i+2] = (result.normal.z + 1) * 128;

                    //     pixels[i + 3] = 255;
                    // }
                    
                    i +=4 ;
                }
            }

            ctx.putImageData(imgData, 0, 0);
        }
    }
}

export default Scene;
