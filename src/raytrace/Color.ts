class Color {
    constructor(
        public r: number,
        public g: number,
        public b : number,
    ) {}

    copy() {
        return new Color(this.r, this.g, this.b);
    }

    add(c: Color) {
        return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
    }

    multiply(f: number) {
        return new Color(this.r * f, this.g * f, this.b * f);
    }

    modulate(c: Color) {
        return new Color(this.r * c.r, this.g * c.g, this.b * c.b);
    }

    static Black = new Color(0, 0, 0);
    static White = new Color(1, 1, 1);
    static Red = new Color(1, 0, 0);
    static Green = new Color(0, 1, 0);
    static Blue = new Color(0, 0, 1);
}

export default Color;
