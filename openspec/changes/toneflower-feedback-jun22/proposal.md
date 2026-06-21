## Why

User feedback collected on 2026-06-22 (annotated tablet screenshot) lists five ToneFlower polish items: three layout/spacing alignment fixes, one numerology-correctness bug in the Crimean Tatar alphabet, and one patronymic label spelling fix. The numerology bug produces a wrong colour+number for the Crimean Tatar small "i"; the rest degrade the print-layout polish of the two "paper" bushes and the right-hand calculator.

## What Changes

- **Layout (item 1)**: Align the bottom flower of the right (Rozpakovka) paper with the bottom flower of the left (main) paper — equal distance from each paper's bottom edge. Only the bottom flower position moves; the other flowers stay where they are.
- **Layout (item 2)**: Align the INFO (arc-info) panel's top and the top edge of both paper bushes to the same horizontal edge as the language switcher row (the top control bar).
- **Layout (item 3)**: Widen the vertical gap between the header controls row (čyslo toggle / number switch) and the content below it, matching the spacing that appears when "show number" (`pokazuvaty čyslo`) is active. The gap must be consistent in both LAT and UA locales. *(User will provide a second reference screenshot for the exact spacing; final value is tuned during apply.)*
- **Numerology fix (item 4)**: Fix the Crimean Tatar small "i". A typed dotted small `i` (U+0069) currently resolves to ordinal 11 (sribnyj/silver) + cardinal 2 instead of ordinal 12 (bilyj/white) + cardinal 3, because the letter lookup uses a case-insensitive regex that matches the dotless `I` bucket first. Make the lookup disambiguate dotted vs dotless I so `i`→12/3 and `ı`→11/2.
- **Label fix (item 5)**: Correct the patronymic field label spelling — remove the incorrect hyphen: `Po-batjkovi` → `Po batjkovi` (LAT) and `По-батькові` → `По батькові` (UA).

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `numerology-ordinal`: Letter lookup must resolve dotted/dotless I correctly — lowercase dotted `i` (U+0069) → ordinal 12, lowercase dotless `ı` (U+0131) → ordinal 11.
- `numerology-cardinal`: Letter lookup must resolve dotted/dotless I correctly — lowercase dotted `i` (U+0069) → cardinal 3, lowercase dotless `ı` (U+0131) → cardinal 2.
- `arrangement-presets`: The Rozpakovka "Baza" (preset 0) bottom flower default position aligns vertically with the main "Baza" bottom flower (equal distance from the paper's bottom edge).

## Impact

- `src/app/soundflow/tonecircus/helpers/abetka.helper.ts` — `ordinalByLetter` / `cardinalByLetter` lookup logic (item 4)
- `src/app/soundflow/tonecircus/toneflower.constants.ts` — `ROZP_PRESETS[0]` bottom flower Y coordinate (item 1)
- `src/app/soundflow/tonecircus/toneflower.component.css` — paper/INFO top-edge alignment, header-to-content gap (items 2, 3)
- `src/app/soundflow/tonecircus/arc-info-panel/arc-info-panel.component.css` — INFO panel top alignment (item 2)
- `src/app/soundflow/tonecircus/toneflower-translations.ts` — patronymic label, both `lat` and `uk` (item 5)
- Existing unit tests in `src/app/soundflow/tonecircus/helpers/abetka.helper.spec.ts` extended for the dotted/dotless i cases
- No new routes, no new components, no dependency changes
