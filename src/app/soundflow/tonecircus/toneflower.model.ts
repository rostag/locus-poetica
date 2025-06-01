export type LeafIdn = {
  color: string;
  idn: number;
  note: string;
  colorHex: string;
};

export type LeafModel = {
  leafOrder: number;
  leafIdn: LeafIdn;
  leafNum: number;
};

export type FlowerModel = {
  leaves: LeafModel[];
  baseRadius: number;
  leafWidth: number;
  cx: number;
  cy: number;
};

export type FlowerInstanceModel = FlowerModel & {
  flowerX: number;
  flowerY: number;
};

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
  flowerInstance: FlowerInstanceModel[];
};
