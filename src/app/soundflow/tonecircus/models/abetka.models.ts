import { IDN } from "src/app/soundflow/tonecircus/toneflower.model";

// abetka.models.ts
export type IdnNameIn = {
  imja: string;
  pobatjkovi: string;
  prizvysceNeoficijne: string;
  prizvysce: string;
};

export type IdnNameOut = {
  imja: IDN | null;
  pobatjkovi: IDN | null;
  prizvysceNeoficijne: IDN | null;
  prizvysce: IDN | null;
  jadro: IDN | null;
};

export type IdnDateIn = {
  denj: string;
  misjacj: string;
  rik: string;
};

export type IdnDateOut = {
  denj: IDN | null;
  misjacj: IDN | null;
  rik: IDN | null;
  jadro: IDN | null;
};

export type IdnFinalSource = {
  a: string;
  b: string;
  c: string;
};

// export type IdnOutput = {
//   : string;
//   pobatjkovi: string;
//   prizvysceNeoficijne: string;
//   prizvysce: string;
//   denj: string;
//   misjacj: string;
//   rik: string;
// };

export type NumberByLetter = {
  cardinal: number;
  letters: string[];
};
export const ORDINALS_BY_LETTERS_UA: NumberByLetter[] = [
  { cardinal: 1, letters: ["А", "Ї", "Ф"] },
  { cardinal: 2, letters: ["Б", "Й", "Х"] },
  { cardinal: 3, letters: ["В", "К", "Ц"] },
  { cardinal: 4, letters: ["Г", "Л", "Ч"] },
  { cardinal: 5, letters: ["Ґ", "М", "Ш"] },
  { cardinal: 6, letters: ["Д", "Н", "Щ"] },
  { cardinal: 7, letters: ["Е", "О", "Ь"] },
  { cardinal: 8, letters: ["Є", "П", "Ю"] },
  { cardinal: 9, letters: ["Ж", "Р", "Я"] },
  { cardinal: 10, letters: ["З", "С"] },
  { cardinal: 11, letters: ["И", "Т"] },
  { cardinal: 12, letters: ["І", "У"] },
];

export const CARDINALS_BY_LETTERS_UA: NumberByLetter[] = [
  { cardinal: 1, letters: ["А", "З", "О", "Ч"] },
  { cardinal: 2, letters: ["Б", "И", "П", "Ш"] },
  { cardinal: 3, letters: ["В", "І", "Р", "Щ"] },
  { cardinal: 4, letters: ["Г", "Ї", "С", "Ь"] },
  { cardinal: 5, letters: ["Ґ", "Й", "Т", "Ю"] },
  { cardinal: 6, letters: ["Д", "К", "У", "Я"] },
  { cardinal: 7, letters: ["Е", "Л", "Ф"] },
  { cardinal: 8, letters: ["Є", "М", "Х"] },
  { cardinal: 9, letters: ["Ж", "Н", "Ц"] },
];
