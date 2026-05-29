import {
  ABETKA_UA,
  ABETKA_UA_LAT,
  ABETKA_MSK,
  ABETKA_EN,
  ABETKA_KT,
} from "../constants/abetka.constants";
import { IDNS } from "../toneflower.constants";
import {
  cardinalByDate,
  cardinalByNumber,
  cardinalByWord,
  getIdnByNumber,
  ordinalByDate,
  ordinalByNumber,
  ordinalByWord,
} from "./abetka.helper";

// Spec: openspec/changes/tonecircus-numerology-rules/specs/numerology-ordinal/spec.md
describe("numerology-ordinal — UA Cyrillic letter table", () => {
  // One representative letter per ordinal group (1..12) for ABETKA_UA
  const cases: [string, number][] = [
    ["А", 1],
    ["Ї", 1],
    ["Ф", 1],
    ["Б", 2],
    ["Й", 2],
    ["Х", 2],
    ["В", 3],
    ["К", 3],
    ["Ц", 3],
    ["Г", 4],
    ["Л", 4],
    ["Ч", 4],
    ["Ґ", 5],
    ["М", 5],
    ["Ш", 5],
    ["Д", 6],
    ["Н", 6],
    ["Щ", 6],
    ["Е", 7],
    ["О", 7],
    ["Ь", 7],
    ["Є", 8],
    ["П", 8],
    ["Ю", 8],
    ["Ж", 9],
    ["Р", 9],
    ["Я", 9],
    ["З", 10],
    ["С", 10],
    ["И", 11],
    ["Т", 11],
    ["І", 12],
    ["У", 12],
  ];

  it.each(cases)(
    "letter '%s' maps to ordinal %i (single-letter word → ordinal)",
    (letter, expected) => {
      expect(ordinalByWord(ABETKA_UA, letter)).toEqual(expected);
    }
  );
});

// Spec: openspec/changes/tonecircus-numerology-rules/specs/numerology-ordinal/spec.md
describe("numerology-ordinal — UA Latynka letter table", () => {
  const cases: [string, number][] = [
    ["A", 1],
    ["K", 1],
    ["Y", 1],
    ["B", 2],
    ["L", 2],
    ["Z", 2],
    ["C", 3],
    ["M", 3],
    ["Ž", 3],
    ["Č", 4],
    ["N", 4],
    ["D", 5],
    ["O", 5],
    ["E", 6],
    ["P", 6],
    ["F", 7],
    ["R", 7],
    ["G", 8],
    ["S", 8],
    ["Ĝ", 9],
    ["Š", 9],
    ["H", 10],
    ["T", 10],
    ["I", 11],
    ["U", 11],
    ["J", 12],
    ["V", 12],
  ];

  it.each(cases)(
    "Latynka letter '%s' maps to ordinal %i",
    (letter, expected) => {
      expect(ordinalByWord(ABETKA_UA_LAT, letter)).toEqual(expected);
    }
  );
});

// Spec: openspec/changes/tonecircus-numerology-rules/specs/numerology-ordinal/spec.md
describe("numerology-ordinal — Russian (Moskaljsjka) letter table", () => {
  const cases: [string, number][] = [
    ["А", 1],
    ["Л", 1],
    ["Ч", 1],
    ["Б", 2],
    ["М", 2],
    ["Ш", 2],
    ["В", 3],
    ["Н", 3],
    ["Щ", 3],
    ["Г", 4],
    ["О", 4],
    ["Ъ", 4],
    ["Д", 5],
    ["П", 5],
    ["Ы", 5],
    ["Е", 6],
    ["Р", 6],
    ["Ь", 6],
    ["Ё", 7], // Ё
    ["ё", 7], // ё
    ["С", 7],
    ["Э", 7],
    ["Ж", 8],
    ["Т", 8],
    ["Ю", 8],
    ["З", 9],
    ["У", 9],
    ["Я", 9],
    ["И", 10],
    ["Ф", 10],
    ["Й", 11],
    ["Х", 11],
    ["К", 12],
    ["Ц", 12],
  ];

  it.each(cases)("MSK letter '%s' maps to ordinal %i", (letter, expected) => {
    expect(ordinalByWord(ABETKA_MSK, letter)).toEqual(expected);
  });
});

// Spec: openspec/changes/tonecircus-numerology-rules/specs/numerology-ordinal/spec.md
describe("numerology-ordinal — English letter table", () => {
  const cases: [string, number][] = [
    ["A", 1],
    ["M", 1],
    ["Y", 1],
    ["B", 2],
    ["N", 2],
    ["Z", 2],
    ["C", 3],
    ["O", 3],
    ["D", 4],
    ["P", 4],
    ["E", 5],
    ["Q", 5],
    ["F", 6],
    ["R", 6],
    ["G", 7],
    ["S", 7],
    ["H", 8],
    ["T", 8],
    ["I", 9],
    ["U", 9],
    ["J", 10],
    ["V", 10],
    ["K", 11],
    ["W", 11],
    ["L", 12],
    ["X", 12],
  ];

  it.each(cases)("EN letter '%s' maps to ordinal %i", (letter, expected) => {
    expect(ordinalByWord(ABETKA_EN, letter)).toEqual(expected);
  });
});

// Spec: numerology-ordinal — Requirement: ordinalByWord reduction
describe("numerology-ordinal — ordinalByWord reduction rules", () => {
  it("РОСТ → 1 (Р=9 + О=7 + С=10 + Т=11 = 37, 37 % 12 = 1)", () => {
    expect(ordinalByWord(ABETKA_UA, "РОСТ")).toEqual(1);
  });

  it("sum % 12 === 0 → returns 12 (never zero)", () => {
    // ВВВВ: В=3, 4×3 = 12, 12 % 12 = 0 → 12
    expect(ordinalByWord(ABETKA_UA, "ВВВВ")).toEqual(12);
  });

  it("matches case-insensitively (lowercase letter yields same ordinal)", () => {
    expect(ordinalByWord(ABETKA_UA, "р")).toEqual(
      ordinalByWord(ABETKA_UA, "Р")
    );
    expect(ordinalByWord(ABETKA_EN, "a")).toEqual(
      ordinalByWord(ABETKA_EN, "A")
    );
  });

  it("unknown letter contributes 0 to the sum", () => {
    // "@" is not in any table; on its own → 0 % 12 = 0 → 12
    expect(ordinalByWord(ABETKA_UA, "@")).toEqual(12);
    // А@ → А (1) + @ (0) = 1
    expect(ordinalByWord(ABETKA_UA, "А@")).toEqual(1);
  });

  it("empty string returns 12 (0 % 12 = 0 → 12)", () => {
    expect(ordinalByWord(ABETKA_UA, "")).toEqual(12);
  });
});

// Spec: numerology-ordinal — Requirement: ordinalByDate reduction
describe("numerology-ordinal — ordinalByDate", () => {
  it("24.08.1991: day=12, month=8, year=11, jadro=7", () => {
    // Total reduction: 24 % 12 = 12, 8 % 12 = 8, 1991 % 12 = 11
    // jadro: (12 + 8 + 11) % 12 = 31 % 12 = 7
    expect(ordinalByDate("24.08.1991")).toEqual(7);
  });

  it("01.01.0001: day=1, month=1, year=1, jadro=3", () => {
    expect(ordinalByDate("01.01.0001")).toEqual(3);
  });

  it("12.12.0012: each component is 12, jadro = 36 % 12 = 0 → 12", () => {
    expect(ordinalByDate("12.12.0012")).toEqual(12);
  });
});

// Spec: numerology-ordinal — Requirement: ordinalByNumber reduction
describe("numerology-ordinal — ordinalByNumber", () => {
  it("37 % 12 = 1", () => {
    expect(ordinalByNumber("37")).toEqual(1);
  });

  it("24 % 12 = 0 → returns 12", () => {
    expect(ordinalByNumber("24")).toEqual(12);
  });

  it("12 % 12 = 0 → returns 12 (never zero)", () => {
    expect(ordinalByNumber("12")).toEqual(12);
  });

  it("5 % 12 = 5", () => {
    expect(ordinalByNumber("5")).toEqual(5);
  });
});

// Spec: numerology-ordinal — Requirement: IDN — color+note identity record
describe("numerology-ordinal — getIdnByNumber + IDN table", () => {
  it("IDN table has 12 entries", () => {
    expect(IDNS).toHaveLength(12);
  });

  const expectedIdns: [number, string, string][] = [
    [1, "C", "#151210"],
    [2, "C#", "#bd1e1e"],
    [3, "D", "#d9792b"],
    [4, "D#", "#e0a536"],
    [5, "E", "#32963a"],
    [6, "F", "#56acc7"],
    [7, "F#", "#266696"],
    [8, "G", "#9091B6"],
    [9, "G#", "#BE9C5C"],
    [10, "A", "#f2f2dc"],
    [11, "A#", "#DBDFE5"],
    [12, "B", "#f5f5f5"],
  ];

  it.each(expectedIdns)(
    "ordinal %i → note %s + hex %s",
    (ordinal, note, colorHex) => {
      const idn = getIdnByNumber(ordinal);
      expect(idn).toBeDefined();
      expect(idn!.ordinal).toEqual(ordinal);
      expect(idn!.note).toEqual(note);
      expect(idn!.colorHex).toEqual(colorHex);
    }
  );
});

// Spec: openspec/changes/tonecircus-numerology-rules/specs/numerology-cardinal/spec.md
describe("numerology-cardinal — UA Cyrillic cardinal table", () => {
  const cases: [string, number][] = [
    ["А", 1],
    ["З", 1],
    ["О", 1],
    ["Ч", 1],
    ["Б", 2],
    ["И", 2],
    ["П", 2],
    ["Ш", 2],
    ["В", 3],
    ["І", 3],
    ["Р", 3],
    ["Щ", 3],
    ["Г", 4],
    ["Ї", 4],
    ["С", 4],
    ["Ь", 4],
    ["Ґ", 5],
    ["Й", 5],
    ["Т", 5],
    ["Ю", 5],
    ["Д", 6],
    ["К", 6],
    ["У", 6],
    ["Я", 6],
    ["Е", 7],
    ["Л", 7],
    ["Ф", 7],
    ["Є", 8],
    ["М", 8],
    ["Х", 8],
    ["Ж", 9],
    ["Н", 9],
    ["Ц", 9],
  ];

  it.each(cases)(
    "UA letter '%s' maps to cardinal %i",
    (letter, expected) => {
      expect(cardinalByWord(ABETKA_UA, letter)).toEqual(expected);
    }
  );
});

// Spec: numerology-cardinal — Letter tables for other alphabets
describe("numerology-cardinal — other alphabet tables", () => {
  it("Latynka 'H' → 1, 'I' → 2, 'Ž' → 9", () => {
    expect(cardinalByWord(ABETKA_UA_LAT, "H")).toEqual(1);
    expect(cardinalByWord(ABETKA_UA_LAT, "I")).toEqual(2);
    expect(cardinalByWord(ABETKA_UA_LAT, "Ž")).toEqual(9);
  });

  it("MSK 'И' → 1, 'Ё' → 7, 'Щ' → 9", () => {
    expect(cardinalByWord(ABETKA_MSK, "И")).toEqual(1);
    expect(cardinalByWord(ABETKA_MSK, "Ё")).toEqual(7);
    expect(cardinalByWord(ABETKA_MSK, "Щ")).toEqual(9);
  });

  it("EN 'A' → 1, 'S' → 1, 'R' → 9, 'I' → 9", () => {
    expect(cardinalByWord(ABETKA_EN, "A")).toEqual(1);
    expect(cardinalByWord(ABETKA_EN, "S")).toEqual(1);
    expect(cardinalByWord(ABETKA_EN, "R")).toEqual(9);
    expect(cardinalByWord(ABETKA_EN, "I")).toEqual(9);
  });
});

// Spec: numerology-cardinal — Requirement: cardinalByWord recursive digit-sum
describe("numerology-cardinal — cardinalByWord recursive digit-sum", () => {
  it("single-digit sum returns unchanged: АБ → 1+2 = 3", () => {
    expect(cardinalByWord(ABETKA_UA, "АБ")).toEqual(3);
  });

  it("two-step reduction: sum 29 → 11 → 2", () => {
    // Pick letters whose cardinals sum to 29.
    // Use English: Z=8, R=9, R=9, C=3 → 8+9+9+3 = 29 → 2+9=11 → 1+1=2
    expect(cardinalByWord(ABETKA_EN, "ZRRC")).toEqual(2);
  });

  it("Ростислав → 3 (matches existing fixture)", () => {
    // Р=3, О=1, С=4, Т=5, И=2, С=4, Л=7, А=1, В=3 = 30 → 3
    expect(cardinalByWord(ABETKA_UA, "Ростислав")).toEqual(3);
  });

  it("Ірина → 9", () => {
    expect(cardinalByWord(ABETKA_UA, "Ірина")).toEqual(9);
  });
});

// Spec: numerology-cardinal — Requirement: cardinalByDate
describe("numerology-cardinal — cardinalByDate", () => {
  // For 24.08.1991: day=6, month=8, year=2, sum=16,
  // reduceNumber(16) = 1+6 = 7, 7 % 12 = 7
  it("24.08.1991 → 7 (day=6, month=8, year=2, reduce(16)=7)", () => {
    expect(cardinalByDate("24.08.1991")).toEqual(7);
  });

  it("01.01.2000 → day=1, month=1, year=2; reduce(4) = 4", () => {
    expect(cardinalByDate("01.01.2000")).toEqual(4);
  });
});

// Spec: numerology-cardinal — Requirement: cardinalByNumber
describe("numerology-cardinal — cardinalByNumber", () => {
  it("1991 → 1+9+9+1 = 20 → 2+0 = 2", () => {
    expect(cardinalByNumber("1991")).toEqual(2);
  });

  it("7 (single digit) → 7", () => {
    expect(cardinalByNumber("7")).toEqual(7);
  });

  it("99 → 9+9 = 18 → 1+8 = 9", () => {
    expect(cardinalByNumber("99")).toEqual(9);
  });
});

// Spec: openspec/changes/add-krymsjkotatarsjka-abetka/specs/numerology-ordinal/spec.md
describe("numerology-ordinal — Crimean Tatar (Krymsjkotatarsjka) letter table", () => {
  const cases: [string, number][] = [
    ["A", 1], ["Â", 1], ["J", 1], ["Ş", 1],
    ["B", 2], ["K", 2], ["T", 2],
    ["C", 3], ["L", 3], ["U", 3],
    ["Ç", 4], ["M", 4], ["Ü", 4],
    ["D", 5], ["N", 5], ["V", 5],
    ["E", 6], ["Ñ", 6], ["Y", 6],
    ["F", 7], ["O", 7], ["Z", 7],
    ["G", 8], ["Ö", 8],
    ["Ğ", 9], ["P", 9],
    ["H", 10], ["Q", 10],
    ["I", 11], ["R", 11],  // dotless I (U+0049)
    ["İ", 12], ["S", 12], // dotted İ (U+0130)
  ];

  it.each(cases)(
    "KT letter '%s' maps to ordinal %i",
    (letter, expected) => {
      expect(ordinalByWord(ABETKA_KT, letter)).toEqual(expected);
    }
  );

  it("every KT letter resolves to a non-zero ordinal", () => {
    const allLetters = [
      "A", "Â", "B", "C", "Ç", "D", "E", "F", "G", "Ğ",
      "H", "I", "ı", "İ", "i", "J", "K", "L", "M", "N",
      "Ñ", "O", "Ö", "P", "Q", "R", "S", "Ş", "T", "U",
      "Ü", "V", "Y", "Z",
    ];
    allLetters.forEach((letter) => {
      expect(ordinalByWord(ABETKA_KT, letter)).toBeGreaterThan(0);
    });
  });

  it("dotless ı (U+0131) maps to ordinal 11 — same as I", () => {
    expect(ordinalByWord(ABETKA_KT, "ı")).toEqual(11);
  });

  it("dotted İ (U+0130) maps to ordinal 12 — same as i", () => {
    expect(ordinalByWord(ABETKA_KT, "İ")).toEqual(12);
  });
});

// Spec: openspec/changes/add-krymsjkotatarsjka-abetka/specs/numerology-cardinal/spec.md
describe("numerology-cardinal — Crimean Tatar (Krymsjkotatarsjka) letter table", () => {
  const cases: [string, number][] = [
    ["A", 1], ["Â", 1], ["H", 1], ["O", 1], ["Ü", 1],
    ["B", 2], ["I", 2], ["Ö", 2], ["V", 2],  // dotless I (U+0049)
    ["C", 3], ["İ", 3], ["P", 3], ["Y", 3],  // dotted İ (U+0130)
    ["Ç", 4], ["J", 4], ["Q", 4], ["Z", 4],
    ["D", 5], ["K", 5], ["R", 5],
    ["E", 6], ["L", 6], ["S", 6],
    ["F", 7], ["M", 7], ["Ş", 7],
    ["G", 8], ["N", 8], ["T", 8],
    ["Ğ", 9], ["Ñ", 9], ["U", 9],
  ];

  it.each(cases)(
    "KT letter '%s' maps to cardinal %i",
    (letter, expected) => {
      expect(cardinalByWord(ABETKA_KT, letter)).toEqual(expected);
    }
  );

  it("every KT letter resolves to a non-zero cardinal", () => {
    const allLetters = [
      "A", "Â", "B", "C", "Ç", "D", "E", "F", "G", "Ğ",
      "H", "I", "ı", "İ", "i", "J", "K", "L", "M", "N",
      "Ñ", "O", "Ö", "P", "Q", "R", "S", "Ş", "T", "U",
      "Ü", "V", "Y", "Z",
    ];
    allLetters.forEach((letter) => {
      expect(cardinalByWord(ABETKA_KT, letter)).toBeGreaterThan(0);
    });
  });

  it("dotless ı (U+0131) maps to cardinal 2 — same as I", () => {
    expect(cardinalByWord(ABETKA_KT, "ı")).toEqual(2);
  });

  it("dotted İ (U+0130) maps to cardinal 3 — same as i", () => {
    expect(cardinalByWord(ABETKA_KT, "İ")).toEqual(3);
  });
});
