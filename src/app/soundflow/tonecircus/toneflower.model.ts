export type IDN = {
  color: string;
  idn: number;
  note: string;
  colorHex: string;
};

export type LeafModel = {
  leafOrder: number;
  leafIdn: IDN;
  leafNum: number;
};

export type FlowerModel = {
  leaves: LeafModel[];
  flowerX: number;
  flowerY: number;
  buttSize: number;
  leafWidth: number;
};

// export type FlowerInstanceModel = FlowerModel & {
//   flowerX: number;
//   flowerY: number;
// };

/**
 * export const PLAY_BUSH: BushCode = {
 * flowers: [[1,1]],
 * places: [[156, 170]]
 * };
 */
export type BushCode = {
  flowers: number[][][];
  places: number[][];
};

export type BushModel = {
  flowers: FlowerModel[];
};
