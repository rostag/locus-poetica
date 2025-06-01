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

export type ToneFlowerModel = {
  leaves: LeafModel[];
  baseRadius: number;
  leafWidth: number;
  cx: number;
  cy: number;
};

/**
 * export const PLAY_BUSH: BushModel = {
 * flowers: [[1,1]],
 * places: [[156, 170]]
 * };
 */
export type BushModel = {
  flowers: number[][][];
  places: number[][];
};
