import {
  Abetka,
  NumberByLetter,
} from "src/app/soundflow/tonecircus/models/abetka.models";

// UA - Kolir zvuk
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

// UA - Cyslo
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

/** UA LAT - Rozrahunok koljoru ta zvuku 
1 - A K Y
2 - B L Z
3 - C M Ž
4 - Č N
5 - D O
6 - E P
7 - F R
8 - G S
9 - Ĝ Š
10 - H T
11 - I U
12 - J V */

export const ORDINALS_BY_LETTERS_UA_LAT: NumberByLetter[] = [
  { cardinal: 1, letters: ["A", "K", "Y"] },
  { cardinal: 2, letters: ["B", "L", "Z"] },
  { cardinal: 3, letters: ["C", "M", "Ž"] },
  { cardinal: 4, letters: ["Č", "N"] },
  { cardinal: 5, letters: ["D", "O"] },
  { cardinal: 6, letters: ["E", "P"] },
  { cardinal: 7, letters: ["F", "R"] },
  { cardinal: 8, letters: ["G", "S"] },
  { cardinal: 9, letters: ["Ĝ", "Š"] },
  { cardinal: 10, letters: ["H", "T"] },
  { cardinal: 11, letters: ["I", "U"] },
  { cardinal: 12, letters: ["J", "V"] },
];

/** UA LAT - Rozrahunok čysla
1 - A H R
2 - B I S
3 - C J Š
4 - Č K T
5 - D L U
6 - E M V
7 - F N Y
8 - G O Z
9 - Ĝ P Ž */

export const CARDINALS_BY_LETTERS_UA_LAT: NumberByLetter[] = [
  { cardinal: 1, letters: ["A", "H", "R"] },
  { cardinal: 2, letters: ["B", "I", "S"] },
  { cardinal: 3, letters: ["C", "J", "Š"] },
  { cardinal: 4, letters: ["Č", "K", "T"] },
  { cardinal: 5, letters: ["D", "L", "U"] },
  { cardinal: 6, letters: ["E", "M", "V"] },
  { cardinal: 7, letters: ["F", "N", "Y"] },
  { cardinal: 8, letters: ["G", "O", "Z"] },
  { cardinal: 9, letters: ["Ĝ", "P", "Ž"] },
];

/** MSK - Rozrahunok koljoru ta zvuku
1 - А Л Ч
2 - Б М Ш
3 - В Н Щ
4 - Г О Ъ
5 - Д П ЬІ
6 - Е Р Ь
7 - Ë С Э
8 - Ж Т Ю
9 - З У Я
10 - И Ф
11 - Й Х
12 - К Ц 
*/

export const ORDINALS_BY_LETTERS_MSK: NumberByLetter[] = [
  { cardinal: 1, letters: ["А", "Л", "Ч"] },
  { cardinal: 2, letters: ["Б", "М", "Ш"] },
  { cardinal: 3, letters: ["В", "Н", "Щ"] },
  { cardinal: 4, letters: ["Г", "О", "Ъ"] },
  { cardinal: 5, letters: ["Д", "П", "Ы"] },
  { cardinal: 6, letters: ["Е", "Р", "Ь"] },
  { cardinal: 7, letters: ["Ë", "С", "Э"] },
  { cardinal: 8, letters: ["Ж", "Т", "Ю"] },
  { cardinal: 9, letters: ["З", "У", "Я"] },
  { cardinal: 10, letters: ["И", "Ф"] },
  { cardinal: 11, letters: ["Й", "Х"] },
  { cardinal: 12, letters: ["К", "Ц"] },
];

/** MSK - Rozrahunok čysla (mos.)
1 - А И С Ъ
2 - Б Й Т ЬІ
3 - В К У Ь
4 - Г Л Ф Э
5 - Д М Х Ю
6 - Е Н Ц Я
7 - Ë О Ч
8 - Ж П Ш
9 - З Р Щ
*/

export const CARDINALS_BY_LETTERS_MSK: NumberByLetter[] = [
  { cardinal: 1, letters: ["А", "И", "С", "Ъ"] },
  { cardinal: 2, letters: ["Б", "Й", "Т", "Ы"] },
  { cardinal: 3, letters: ["В", "К", "У", "Ь"] },
  { cardinal: 4, letters: ["Г", "Л", "Ф", "Э"] },
  { cardinal: 5, letters: ["Д", "М", "Х", "Ю"] },
  { cardinal: 6, letters: ["Е", "Н", "Ц", "Я"] },
  { cardinal: 7, letters: ["Ë", "О", "Ч"] },
  { cardinal: 8, letters: ["Ж", "П", "Ш"] },
  { cardinal: 9, letters: ["З", "Р", "Щ"] },
];

/** Angl - rozrahunok koljoru ta zvuku
1 - A M Y
2 - B N Z
3 - C O
4 - D P
5 - E Q
6 - F R
7 - G S
8 - H T
9 - I U
10 - J V
11 - K W
12 - L X 
*/

export const ORDINALS_BY_LETTERS_EN: NumberByLetter[] = [
  { cardinal: 1, letters: ["A", "M", "Y"] },
  { cardinal: 2, letters: ["B", "N", "Z"] },
  { cardinal: 3, letters: ["C", "O"] },
  { cardinal: 4, letters: ["D", "P"] },
  { cardinal: 5, letters: ["E", "Q"] },
  { cardinal: 6, letters: ["F", "R"] },
  { cardinal: 7, letters: ["G", "S"] },
  { cardinal: 8, letters: ["H", "T"] },
  { cardinal: 9, letters: ["I", "U"] },
  { cardinal: 10, letters: ["J", "V"] },
  { cardinal: 11, letters: ["K", "W"] },
  { cardinal: 12, letters: ["L", "X"] },
];

/** Angl - rozrahunok čysla (angl.)
1 - A J S
2 - B K T
3 - C L U
4 - D M V
5 - E N W
6 - F O X
7 - G P Y
8 - H Q Z
9 - I R
*/

export const CARDINALS_BY_LETTERS_EN: NumberByLetter[] = [
  { cardinal: 1, letters: ["A", "J", "S"] },
  { cardinal: 2, letters: ["B", "K", "T"] },
  { cardinal: 3, letters: ["C", "L", "U"] },
  { cardinal: 4, letters: ["D", "M", "V"] },
  { cardinal: 5, letters: ["E", "N", "W"] },
  { cardinal: 6, letters: ["F", "O", "X"] },
  { cardinal: 7, letters: ["G", "P", "Y"] },
  { cardinal: 8, letters: ["H", "Q", "Z"] },
  { cardinal: 9, letters: ["I", "R"] },
];

export const ABETKA_UA: Abetka = {
  name: "Ukrajinsjka",
  ordinals: ORDINALS_BY_LETTERS_UA,
  cardinals: CARDINALS_BY_LETTERS_UA,
};

export const ABETKA_UA_LAT: Abetka = {
  name: "Ukrajinsjka Latynka",
  ordinals: ORDINALS_BY_LETTERS_UA_LAT,
  cardinals: CARDINALS_BY_LETTERS_UA_LAT,
};

export const ABETKA_MSK: Abetka = {
  name: "Moskaljsjka",
  ordinals: ORDINALS_BY_LETTERS_MSK,
  cardinals: CARDINALS_BY_LETTERS_MSK,
};

export const ABETKA_EN: Abetka = {
  name: "Anglijsjka",
  ordinals: ORDINALS_BY_LETTERS_EN,
  cardinals: CARDINALS_BY_LETTERS_EN,
};

export const ABETKY: Abetka[] = [
  ABETKA_UA,
  ABETKA_UA_LAT,
  ABETKA_MSK,
  ABETKA_EN,
];

export const ABETKA_STD = ABETKA_EN;
