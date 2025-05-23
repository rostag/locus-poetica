export type ToneCircusProps = {
  color: string;
  note: string;
  colorHex: string;
};

export type ToneFlowerLeaf = {
  order: number;
  toneCircus: ToneCircusProps;
};

export type ToneFlowerConfig = {
  leaves: ToneFlowerLeaf[];
  baseRadius: number;
  leafWidth: number;
  cx: number;
  cy: number;
};

export const TONE_CIRCUS_PRESETS: ToneCircusProps[] = [
  { color: "čornyй", note: "do", colorHex: "#151210" },
  { color: "červonyй", note: "do#", colorHex: "#9F352B" },
  { color: "pomarančevyй", note: "re", colorHex: "#C18A2F" },
  { color: "žovtyй", note: "re#", colorHex: "#D1B170" },
  { color: "zelenyй", note: "mi", colorHex: "#366C2C" },
  { color: "blakytnyй", note: "fa", colorHex: "#4D86B3" },
  { color: "syniй", note: "fa#", colorHex: "#163063" },
  { color: "fioletovyй", note: "solj", colorHex: "#554062" },
  { color: "zolotyй", note: "solj#", colorHex: "#BE9C5C" },
  { color: "perlynovyй", note: "lja", colorHex: "#C2C0B1" },
  { color: "sribnyй", note: "lja#", colorHex: "#B1B1AA" },
  { color: "bilyй", note: "si", colorHex: "#B7B9B4" },
  { color: "korycnevyйй", note: "?", colorHex: "#865D2E" },
];
