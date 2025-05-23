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
  { color: "čornyй", note: "C", colorHex: "#151210" },
  { color: "červonyй", note: "C#", colorHex: "#9F352B" },
  { color: "pomarančevyй", note: "D", colorHex: "#C18A2F" },
  { color: "žovtyй", note: "D#", colorHex: "#D1B170" },
  { color: "zelenyй", note: "E", colorHex: "#366C2C" },
  { color: "blakytnyй", note: "F", colorHex: "#4D86B3" },
  { color: "syniй", note: "F#", colorHex: "#163063" },
  { color: "fioletovyй", note: "G", colorHex: "#554062" },
  { color: "zolotyй", note: "G#", colorHex: "#BE9C5C" },
  { color: "perlynovyй", note: "A", colorHex: "#C2C0B1" },
  { color: "sribnyй", note: "A#", colorHex: "#B1B1AA" },
  { color: "bilyй", note: "B", colorHex: "#B7B9B4" },
];
