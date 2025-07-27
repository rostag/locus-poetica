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

export type IdnPojedOut = {
  imjaDenj: IDN | null;
  pobatMisjacj: IDN | null;
  prNeofPrRik: IDN | null;
  jadro: IDN | null;
};

// Dzvin - Slovo
// abetka.models.ts
export type IdnSlovoIn = {
  bukva: string[];
};

export type IdnSlovoOut = {
  imja: IDN[] | null;
  jadro: IDN | null;
};

export type IdnFinalSource = {
  a: string;
  b: string;
  c: string;
};

export type NumberByLetter = {
  cardinal: number;
  letters: string[];
};

export type Abetka = {
  name: AbetkaName;
  ordinals: NumberByLetter[];
  cardinals: NumberByLetter[];
};

export type AbetkaName =
  | "Ukrajinsjka"
  | "Ukrajinsjka Latynka"
  | "Moskaljsjka"
  | "Anglijsjka";
