// abetka.helper.ts

import {
  CARDINALS_BY_LETTERS_UA,
  NumberByLetter,
  ORDINALS_BY_LETTERS_UA,
} from "./../models/abetka.models";
import { IDNS } from "../../tonecircus/toneflower.constants";

function ordinalByLetter(letter: string) {
  const ordinal =
    ORDINALS_BY_LETTERS_UA.find((ordinalByLetter: NumberByLetter) => {
      return ordinalByLetter.letters.find((letters) =>
        letters.includes(letter.toLocaleUpperCase())
      );
    })?.cardinal || 0;
  // console.log(letter, ordinal);

  return ordinal;
}

export function ordinalByWord(word: string) {
  const letters = word.split("");
  const sum = letters.reduce((acc, letter) => acc + ordinalByLetter(letter), 0);
  return sum % 12 || 12;
}

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

function cardinalByLetter(letter: string) {
  const cardinal =
    CARDINALS_BY_LETTERS_UA.find((cardinalByLetter: NumberByLetter) => {
      return cardinalByLetter.letters.find((letters) =>
        letters.includes(letter.toLocaleUpperCase())
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

export function cardinalByWord(word: string) {
  const letters = word.split("");
  const sum = letters.reduce(
    (acc, letter) => acc + cardinalByLetter(letter),
    0
  );
  if (sum > 9) {
    return reduceNumber(sum);
  } else {
    return sum;
  }
}

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
