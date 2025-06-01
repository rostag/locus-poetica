export type LeafIdn = {
  color: string;
  num: number;
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

export const LEAF_IDNS: LeafIdn[] = [
  { num: 1, color: "čornyj", note: "C", colorHex: "#151210" },
  { num: 2, color: "červonyj", note: "C#", colorHex: "#9F352B" },
  { num: 3, color: "pomarančevyj", note: "D", colorHex: "#AA482E" },
  { num: 4, color: "žovtyj", note: "D#", colorHex: "#D1B170" },
  { num: 5, color: "zelenyj", note: "E", colorHex: "#366C2C" },
  { num: 6, color: "blakytnyj", note: "F", colorHex: "#4D86B3" },
  { num: 7, color: "synij", note: "F#", colorHex: "#163063" },
  { num: 8, color: "fioletovyj", note: "G", colorHex: "#9091B6" },
  { num: 9, color: "zolotyj", note: "G#", colorHex: "#BE9C5C" },
  { num: 10, color: "perlynovyj", note: "A", colorHex: "#E5E3D5" },
  { num: 11, color: "sribnyj", note: "A#", colorHex: "#DBDFE5" },
  { num: 12, color: "bilyj", note: "B", colorHex: "#B7B9B4" },
];
