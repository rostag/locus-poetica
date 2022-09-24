export interface Rhyme {
    name: string;
    value: number[][];
}

export interface Rhymes {
    [index: string]: Rhyme;
}

export const ABAB: Rhyme = {
    name: 'ABAB',
    value: [[1],[0],[1],[0]]
} 

export const rhymes = {
    pyro: {
        name: 'Пирожки',
        value: [
            [1, 1, 1, 2, 1, 2],
            [2, 3, 3],
            [1, 3, 1, 4],
            [1, 2, 1, 3, 2]
        ]
    },
    haiku: {
        name: 'Хайку',
        value: [
            [1, 2, 1],
            [3, 1, 2, 1],
            [2, 3],
        ]
    },
    // r1r2r3: {
    //     name: 'r1r2r3r2r3r1',
    //     value: [
    //         [1, 2, 3],
    //         [2, 3, 1],
    //         [3, 1, 2],
    //         [1, 3, 2],
    //     ]
    // },
    r1r2r31: {
        name: '1-2-3',
        value: [
            [1, 2, 3],
        ]
    },
    salo: {
        name: 'Сало',
        value: [
            [1, 2, 3],
            [2, 2, 2],
            [1, 2, 3],
            [3, 3],
        ]
    },
    prorizz: {
        name: 'Прорізь',
        value: [
            [1, 2, 3, 1, 2, 3,],
            [2, 2, 2, 2, 2, 2,],
            [1, 2, 3, 1, 2, 3,],
            [3, 3, 3, 3,],
        ]
    },
    senkan: {
        name: 'Сенкан',
        value: [
            [2],
            [1, 3],
            [2, 4],
            [2, 4, 2],
            [2]
        ]
    },
    r1r2: {
        name: '1 2',
        value: [
            [1, 2,],
            [1, 2,],
            [1, 2,],
            [1, 2,],
            [1, 2,],
            [1, 2,],
            [1, 2, 1,],
            [2,],
        ]
    },
    // ipav: {
    //     name: 'Ipav',
    //     value: [
    //         [1, 2,],
    //         [1, 2,],
    //         [4,],
    //         [1, 2,],
    //         [1, 2,],
    //         [4,],
    //     ]
    // }
};
