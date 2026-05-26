// abetka.helper.ts

import { Abetka, AbetkaName, NumberByLetter } from "./../models/abetka.models";
import { IDNS } from "../../tonecircus/toneflower.constants";
import {
  ABETKA_STD,
  ABETKY,
} from "../../tonecircus/constants/abetka.constants";

function ordinalByLetter(abetka: Abetka, letter: string) {
  const ordinal =
    abetka.ordinals.find((ordinalByLetter: NumberByLetter) => {
      return ordinalByLetter.letters.find((letters) =>
        letters.match(new RegExp(letter, "i"))
      );
    })?.cardinal || 0;
  // console.log(letter, ordinal);

  return ordinal;
}

/**
 * Compute the chromatic ordinal (1–12) of a word.
 *
 * Spec: openspec/specs/numerology-ordinal/spec.md — Requirement: ordinalByWord reduction
 *
 * Sums per-letter ordinals via {@link Abetka.ordinals} (case-insensitive),
 * then reduces `sum % 12 || 12` so the result is always in [1, 12].
 */
export function ordinalByWord(abetka: Abetka, word: string) {
  const letters = word.split("");
  const sum = letters.reduce(
    (acc, letter) => acc + ordinalByLetter(abetka, letter),
    0
  );
  return sum % 12 || 12;
}

/**
 * Compute the chromatic ordinal (1–12) of a date string "DD.MM.YYYY".
 *
 * Spec: openspec/specs/numerology-ordinal/spec.md — Requirement: ordinalByDate reduction
 *
 * Reduces each component (day, month, year) by `% 12 || 12`, then sums them
 * and reduces again by `% 12 || 12`. Also used as a generic multi-value
 * reducer for combination (pojednannja) ordinals.
 *
 * Example: 24.08.1991 → day=12, month=8, year=11, jadro=7
 */
// 24.08.1991 r.
// 24-12=12 (bilyj/si);
// 8 (fioletovyj/solj);
// 1991-(12×165)=11 (sribnyj/lja#);
// suma (seredynka): 12+8+11=31. 31-(12×2)=7 (synij/fa#)
export function ordinalByDate(dateString: string) {
  const parts = dateString.split(".") || [1, 1, 1];

  const day = parseInt(parts[0], 10) % 12 || 12;
  const month = parseInt(parts[1], 10) % 12 || 12;
  const year = parseInt(parts[2], 10) % 12 || 12;

  return (day + month + year) % 12 || 12;
}

export function ordinalByNumber(numString: string) {
  return parseInt(numString, 10) % 12 || 12;
}

function cardinalByLetter(abetka: Abetka, letter: string) {
  const cardinal =
    abetka.cardinals.find((cardinalByLetter: NumberByLetter) => {
      return cardinalByLetter.letters.find((letters) =>
        letters.match(new RegExp(letter, "i"))
      // letters.includes(letter.toLocaleUpperCase()) // yo fix
      );
    })?.cardinal || 0;
  // console.log(letter, cardinal);

  return cardinal;
}

function reduceNumber(num: number) {
  const digits = ("" + num).split("");
  const sum = digits.reduce((acc, digit) => {
    return acc + parseInt(digit);
  }, 0);
  if (sum > 9) {
    return reduceNumber(sum);
  } else {
    return sum;
  }
}

/**
 * Compute the pythagorean cardinal (1–9) of a word.
 *
 * Spec: openspec/specs/numerology-cardinal/spec.md — Requirement: cardinalByWord reduction
 *
 * Sums per-letter cardinals via {@link Abetka.cardinals} (case-insensitive),
 * then recursively digit-sums until a single digit remains.
 */
export function cardinalByWord(abetka: Abetka, word: string) {
  const letters = word.split("");
  const sum = letters.reduce(
    (acc, letter) => acc + cardinalByLetter(abetka, letter),
    0
  );
  if (sum > 9) {
    return reduceNumber(sum);
  } else {
    return sum;
  }
}

/**
 * Compute the pythagorean cardinal of a date string "DD.MM.YYYY".
 *
 * Spec: openspec/specs/numerology-cardinal/spec.md — Requirement: cardinalByDate reduction
 *
 * Recursively digit-sums day, month, and year independently, sums the three
 * results, then reduces the sum `% 12 || 12`.
 */
export function cardinalByDate(dateString: string) {
  const parts = dateString.split(".") || [1, 1, 1];

  const day = reduceNumber(parseInt(parts[0], 10));
  const month = reduceNumber(parseInt(parts[1], 10));
  const year = reduceNumber(parseInt(parts[2], 10));

  return reduceNumber(day + month + year) % 12 || 12;
}

export function cardinalByNumber(numString: string) {
  const digits = numString.split("");
  const sum = digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  if (sum > 9) {
    return cardinalByNumber("" + sum);
  } else {
    return sum;
  }
}

export function getIdnByNumber(ordinal: number) {
  return IDNS.find((IDN) => IDN.ordinal === ordinal);
}

export function abetkaByName(name: AbetkaName) {
  const res = ABETKY?.find((a) => a.name === name) || ABETKA_STD;
  console.log("abetka", res);
  return res;
}
