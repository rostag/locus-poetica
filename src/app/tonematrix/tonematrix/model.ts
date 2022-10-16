export const matrixSize = 16;

export class Pattern {
    private readonly data = new Uint32Array(matrixSize)

    constructor() {
    }

    serialize(): string {
        let r: string[] = []
        for (let i = 0; i < 16; i++) {
            r.push(this.data[i].toString(32))
        }
        return r.join(".")
    }

    deserialize(code: string): void {
        try {
            code.split(".")
                .map(c => parseInt(c, 32))
                .forEach((value, index) => this.data[index] = value)
        } catch (e) {
        }
    }

    setStep(x: number, y: number, value: boolean): void {
        if (value) {
            this.data[y] |= 1 << x
        } else {
            this.data[y] &= ~(1 << x)
        }
    }

    getStep(x: number, y: number): boolean {
        return 0 !== (this.data[y] & (1 << x))
    }

    clear(): void {
        this.data.fill(0)
    }
}

export class Model {
    readonly pattern: Pattern = new Pattern()

    public stepIndex: number = 0 | 0

    constructor() {
    }
}