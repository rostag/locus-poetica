export class ArrayUtils {
    static fill<T>(n: number, factory: (index: number) => T): T[] {
        const array: T[] = []
        for (let i = 0; i < n; i++) {
            array[i] = factory(i)
        }
        return array
    }

    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }
}