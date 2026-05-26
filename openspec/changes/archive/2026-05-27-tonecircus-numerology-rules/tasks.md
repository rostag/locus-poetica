## 1. Ordinal system tests (numerology-ordinal spec)

- [x] 1.1 Write unit tests for `ordinalByWord` covering UA Cyrillic letter table — verify each of the 12 ordinal groups maps correctly
- [x] 1.2 Write unit tests for `ordinalByWord` covering UA Latin (Latynka) letter table
- [x] 1.3 Write unit tests for `ordinalByWord` covering Russian (Moskaljsjka) letter table including Ё/ё Unicode edge case
- [x] 1.4 Write unit tests for `ordinalByWord` covering English letter table
- [x] 1.5 Write unit tests for `ordinalByWord` reduction rules: sum % 12, sum divisible by 12 → result is 12, case-insensitive matching, unknown letter → 0
- [x] 1.6 Write unit tests for `ordinalByDate` with example 24.08.1991 (expected: day=12, month=8, year=11, jadro=7)
- [x] 1.7 Write unit tests for `ordinalByNumber` covering mod-12 reduction and zero-case → 12
- [x] 1.8 Write unit tests for `getIdnByNumber` — verify all 12 IDN records return correct color+note

## 2. Cardinal system tests (numerology-cardinal spec)

- [x] 2.1 Write unit tests for `cardinalByWord` covering UA Cyrillic cardinal table — verify each of the 9 groups
- [x] 2.2 Write unit tests for `cardinalByWord` covering UA Latin, Russian, and English cardinal tables
- [x] 2.3 Write unit tests for `cardinalByWord` recursive digit-sum reduction: multi-digit sum, repeated reduction until single digit
- [x] 2.4 Write unit tests for `cardinalByDate` with example 24.08.1991 (expected: day=6, month=8, year=2, reduce(sum 16)=7)
- [x] 2.5 Write unit tests for `cardinalByNumber` with multi-digit and single-digit inputs

## 3. Flower rendering spec validation (flower-rendering spec)

- [x] 3.1 Write unit tests for `ToneFlower.seed()` — verify `leaves` array length and `leafOrder` indexing after seeding a FlowerModel
- [x] 3.2 Write unit tests for ring geometry: verify `innerRadius` and `outerRadius` formulas for each `leafOrder` value
- [x] 3.3 Write unit tests for jadro placement: jadro leaf is always at `leafOrder = 0` (first entry in leaves array) for both name and date flowers
- [x] 3.4 Write unit tests for `getSectionData` — verify that `leafNum` produces an array of `leafNum` equal-degree sectors

## 4. Combination (jednotka-kombinatsiya) spec validation

- [x] 4.1 Write unit tests for `pojedOut` calculation — verify `imjaDenNomer`, `pobatMisjacNomer`, `prizNeofPrizRikNomer`, and `pojednanoJadroNomer` using the commented example in `get-ordinal.component.ts`
- [x] 4.2 Write unit tests for combination cardinal numbers — verify `imjaDenCyslo`, `pobatMisjacCyslo`, `prizNeofPrizRikCyslo`, `pojednanoJadroCyslo` using the commented example
- [x] 4.3 Write unit tests for `SlovoComponent.setData()` — verify a 4-character word produces a 5-leaf flower (jadro + 4 character leaves)
- [x] 4.4 Update `SlovoComponent.setData()` to support words longer than 4 characters — iterate all characters (capped at 10,000), produce one leaf per character, jadro computed from all character ordinals
- [x] 4.5 Write unit tests for `SlovoComponent` long-word support — verify N-character word produces (N+1)-leaf flower and jadro reflects all characters

## 5. Documentation and spec cross-references

- [x] 5.1 Add JSDoc to `ordinalByWord`, `cardinalByWord`, `ordinalByDate`, `cardinalByDate` referencing the spec capability names
- [x] 5.2 Add JSDoc to `IDNS` constant in `toneflower.constants.ts` documenting the 12-entry chromatic table
- [x] 5.3 Add JSDoc to `ORDINALS_BY_LETTERS_UA` and `CARDINALS_BY_LETTERS_UA` in `abetka.constants.ts` linking to spec
- [x] 5.4 Document the `getButtColor` inactive variant in a code comment referencing the open question in `design.md`
- [x] 5.5 Add a TODO comment near `getButtColor` in `toneflower.class.ts` noting the possibility of it replacing the current `% 12` jadro calculation in the future
