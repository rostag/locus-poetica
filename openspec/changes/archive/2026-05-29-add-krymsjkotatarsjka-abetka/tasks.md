## 1. Type System

- [x] 1.1 Add `"Krymsjkotatarsjka"` to the `AbetkaName` union in `src/app/soundflow/tonecircus/models/abetka.models.ts`

## 2. Alphabet Tables

- [x] 2.1 Add `ORDINALS_BY_LETTERS_KT` constant to `src/app/soundflow/tonecircus/constants/abetka.constants.ts` with all 12 ordinal groups per spec, storing both `I`/`ı` and `İ`/`i` explicitly
- [x] 2.2 Add `CARDINALS_BY_LETTERS_KT` constant to the same file with all 9 cardinal groups per spec, storing both `I`/`ı` and `İ`/`i` explicitly
- [x] 2.3 Add `ABETKA_KT` object combining the two tables with `name: "Krymsjkotatarsjka"`
- [x] 2.4 Append `ABETKA_KT` to the `ABETKY` array

## 3. i18n Labels

- [x] 3.1 Add `selectKrymsjkotatarsjka` field to the `ToneflowerStrings` interface in `toneflower-translations.ts` (under `labels`)
- [x] 3.2 Add `selectKrymsjkotatarsjka: "Krymsjkotatarsjka"` to the `lat` translation object
- [x] 3.3 Add `selectKrymsjkotatarsjka: "Кримськотатарська"` to the `uk` translation object

## 4. Tests

- [x] 4.1 Add unit tests asserting every Crimean Tatar letter (A Â B C Ç D E F G Ğ H I ı İ i J K L M N Ñ O Ö P Q R S Ş T U Ü V Y Z) resolves to a non-zero ordinal via `ordinalByLetter`
- [x] 4.2 Add unit tests asserting the same letter set resolves to a non-zero cardinal
- [x] 4.3 Add a test verifying `ordinalByLetter` returns 11 for dotless `ı` (U+0131) and 12 for dotted `İ` (U+0130)
- [x] 4.4 Add a test verifying `cardinalByLetter` returns 2 for dotless `ı` and 3 for dotted `İ`
