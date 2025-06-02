// abetka.helper.ts

import {
  NumberByLetter,
  NUMBERS_BY_LETTERS_UA,
} from "src/app/soundflow/tonecircus/models/abetka.models";

function numberByLetter(letter: string) {
  const cardinal =
    NUMBERS_BY_LETTERS_UA.find((numberByLetter: NumberByLetter) => {
      return numberByLetter.letters.find((letters) =>
        letters.includes(letter.toLocaleUpperCase())
      );
    })?.cardinal || 0;
  console.log("l-c", letter, cardinal);

  return cardinal;
}

export function numberByWord(word: string) {
  const letters = word.split("");
  const sum = letters.reduce((acc, letter) => acc + numberByLetter(letter), 0);
  return sum;
}
