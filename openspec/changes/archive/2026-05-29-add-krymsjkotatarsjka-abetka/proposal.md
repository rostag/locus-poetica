## Why

ToneFlower's numerology calculator supports Ukrainian Cyrillic, Ukrainian Latin, Russian, and English — but not Crimean Tatar, a language with deep cultural significance that deserves representation on its own terms. Adding it as a fifth `Abetka` option lets users compute color and number readings for Crimean Tatar names and words using the community-defined letter mappings.

## What Changes

- New `AbetkaName` variant `"Krymsjkotatarsjka"` added to the union type
- Two new letter-mapping tables: `ORDINALS_BY_LETTERS_KT` (1–12, color/chromatic) and `CARDINALS_BY_LETTERS_KT` (1–9, pythagorean), derived from the Crimean Tatar alphabet of 32 letters
- New `ABETKA_KT` object added to the `ABETKY` array so it appears in the abetka selector
- `selectKrymsjkotatarsjka` label added to both translation objects (`uk` and `lat`) in `toneflower-translations.ts`
- Explicit storage of both cases for the two distinct Unicode I letters (`I`/`ı` dotless and `İ`/`i` dotted) to avoid mis-matching via the case-insensitive regex

## Capabilities

### New Capabilities
- `krymsjkotatarsjka-abetka`: Crimean Tatar alphabet (32 letters) with ordinal (1–12) and cardinal (1–9) mappings, registered as a selectable `Abetka` in ToneFlower

### Modified Capabilities
- `numerology-ordinal`: Letter-to-ordinal table (1–12) extended with a fifth alphabet — Crimean Tatar
- `numerology-cardinal`: Letter-to-cardinal table (1–9) extended with a fifth alphabet — Crimean Tatar
- `toneflower-i18n`: New `selectKrymsjkotatarsjka` label required in both `uk` and `lat` translation objects

## Impact

- `src/app/soundflow/tonecircus/models/abetka.models.ts` — `AbetkaName` union type
- `src/app/soundflow/tonecircus/constants/abetka.constants.ts` — mapping tables + `ABETKY` array
- `src/app/soundflow/tonecircus/toneflower-translations.ts` — selector label
- No new routes, no new components, no dependency changes
- Existing abetky and all other ToneFlower behavior unchanged
