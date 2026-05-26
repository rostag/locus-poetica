## Why

The `tonecircus` module encodes a numerological system that maps words, names, and dates to colorized circular shapes (flowers) with musical note associations, but this logic is spread across multiple files with no single source of truth documenting the rules. Extracting and formalizing these rules makes the system transparent, testable, and extensible.

## What Changes

- Document and formalize the two parallel numeral systems: **ordinal** (color/sound, 1–12 chromatic scale) and **cardinal** (pythagorean digit-sum, 1–9)
- Formally specify the letter-to-number mapping tables for all four alphabets: Ukrainian Cyrillic, Ukrainian Latin (Latynka), Russian (Moskaljsjka), English
- Specify the `ordinalByWord` / `cardinalByWord` reduction algorithms
- Specify how a word's letters produce a flower: each letter → IDN (color + musical note), the sum reduced mod 12 → center/jadro IDN
- Specify date numerology: day/month/year each reduced mod 12, their sum reduced mod 12 for jadro
- Specify the "combination" (pojednannja) flower: name × date cross-products reduced mod 12
- Specify flower geometry: concentric ring structure where ring count = number of leaves, ring color = leaf IDN color, ring segment count = leaf cardinal number

## Capabilities

### New Capabilities
- `numerology-ordinal`: Color/sound ordinal system — letter tables (1–12), `ordinalByWord` and `ordinalByDate` reduction rules, IDN color+note mapping
- `numerology-cardinal`: Pythagorean cardinal system — letter tables (1–9), `cardinalByWord` and `cardinalByDate` digit-sum reduction rules
- `flower-rendering`: Rules for rendering a flower from a leaf list — concentric rings, ring color from IDN, segment count from cardinal number, jadro (center) ring
- `jednotka-kombinatsiya`: Combination (pojednannja) calculation — cross-pairing name parts with date parts and reducing to a third flower

### Modified Capabilities

## Impact

- `src/app/soundflow/tonecircus/helpers/abetka.helper.ts` — primary logic under spec
- `src/app/soundflow/tonecircus/constants/abetka.constants.ts` — letter tables under spec
- `src/app/soundflow/tonecircus/toneflower.constants.ts` — IDN color/note table under spec
- `src/app/soundflow/tonecircus/toneflower.class.ts` — flower model assembly under spec
- `src/app/soundflow/tonecircus/get-ordinal/get-ordinal.component.ts` — orchestration logic under spec
- `src/app/soundflow/tonecircus/udzvin/slovo.component.ts` — word-to-flower pipeline under spec
