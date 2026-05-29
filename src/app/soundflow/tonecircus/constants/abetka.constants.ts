import {
  Abetka,
  NumberByLetter,
} from "src/app/soundflow/tonecircus/models/abetka.models";

/**
 * Ukrainian Cyrillic letter → ordinal (1–12) mapping (kolir/zvuk).
 *
 * Spec: openspec/specs/numerology-ordinal/spec.md — Requirement: Letter-to-ordinal tables (1–12) for four alphabets
 *
 * Each letter resolves to a position in the chromatic 12-note scale, which in
 * turn selects one of the 12 IDNs (color + musical note). Letters in the same
 * group share an ordinal.
 */
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

/**
 * Ukrainian Cyrillic letter → cardinal (1–9) mapping (chyslo / pythagorean).
 *
 * Spec: openspec/specs/numerology-cardinal/spec.md — Requirement: Letter-to-cardinal tables (1–9) for four alphabets
 *
 * Each letter resolves to a pythagorean digit (1–9). Word cardinals are the
 * recursive digit-sum of letter cardinals, used as the segment count per
 * concentric ring (leafNum) when the "chyslo" display mode is active.
 */
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
  { cardinal: 7, letters: ["\u0401", "\u0451", "С", "Э"] }, // замість Ё ё прийшлося вставити спецвираз \u0401 \u0451, бо її не визнає світ =)
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
  { cardinal: 7, letters: ["\u0401", "\u0451", "О", "Ч"] }, // замість Ё ё прийшлося вставити спецвирази \u0401 \u0451, бо її не визнає світ =)
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

/** KT - Rozrahunok koljoru ta zvuku (krymsjkotatarsjka)
1  - A Â J Ş
2  - B K T
3  - C L U
4  - Ç M Ü
5  - D N V
6  - E Ñ Y
7  - F O Z
8  - G Ö
9  - Ğ P
10 - H Q
11 - I ı R     (dotless I: U+0049 / U+0131 — stored explicitly, not via /i flag)
12 - İ i S     (dotted I:  U+0130 / U+0069 — stored explicitly, not via /i flag)
*/

export const ORDINALS_BY_LETTERS_KT: NumberByLetter[] = [
  { cardinal: 1, letters: ["A", "Â", "J", "Ş"] },
  { cardinal: 2, letters: ["B", "K", "T"] },
  { cardinal: 3, letters: ["C", "L", "U"] },
  { cardinal: 4, letters: ["Ç", "M", "Ü"] },
  { cardinal: 5, letters: ["D", "N", "V"] },
  { cardinal: 6, letters: ["E", "Ñ", "Y"] },
  { cardinal: 7, letters: ["F", "O", "Z"] },
  { cardinal: 8, letters: ["G", "Ö"] },
  { cardinal: 9, letters: ["Ğ", "P"] },
  { cardinal: 10, letters: ["H", "Q"] },
  { cardinal: 11, letters: ["I", "ı", "R"] }, // dotless: I (U+0049) + ı (U+0131)
  { cardinal: 12, letters: ["İ", "i", "S"] }, // dotted:  İ (U+0130) + i (U+0069)
];

/** KT - Rozrahunok čysla (krymsjkotatarsjka)
1 - A Â H O Ü
2 - B I ı Ö V  (dotless I: U+0049 / U+0131)
3 - C İ i P Y  (dotted I:  U+0130 / U+0069)
4 - Ç J Q Z
5 - D K R
6 - E L S
7 - F M Ş
8 - G N T
9 - Ğ Ñ U
*/

export const CARDINALS_BY_LETTERS_KT: NumberByLetter[] = [
  { cardinal: 1, letters: ["A", "Â", "H", "O", "Ü"] },
  { cardinal: 2, letters: ["B", "I", "ı", "Ö", "V"] }, // dotless: I (U+0049) + ı (U+0131)
  { cardinal: 3, letters: ["C", "İ", "i", "P", "Y"] }, // dotted:  İ (U+0130) + i (U+0069)
  { cardinal: 4, letters: ["Ç", "J", "Q", "Z"] },
  { cardinal: 5, letters: ["D", "K", "R"] },
  { cardinal: 6, letters: ["E", "L", "S"] },
  { cardinal: 7, letters: ["F", "M", "Ş"] },
  { cardinal: 8, letters: ["G", "N", "T"] },
  { cardinal: 9, letters: ["Ğ", "Ñ", "U"] },
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

export const ABETKA_KT: Abetka = {
  name: "Krymsjkotatarsjka",
  ordinals: ORDINALS_BY_LETTERS_KT,
  cardinals: CARDINALS_BY_LETTERS_KT,
};

export const ABETKY: Abetka[] = [
  ABETKA_UA,
  ABETKA_UA_LAT,
  ABETKA_MSK,
  ABETKA_EN,
  ABETKA_KT,
];

export const ABETKA_STD = ABETKA_EN;
