## Context

ToneFlower renders two D3 "paper" bushes (main + Rozpakovka) plus an arc-info (INFO) panel and a right-hand numerology calculator. Feedback from 2026-06-22 mixes pixel-level layout polish (items 1–3), a numerology-correctness bug in the Crimean Tatar alphabet (item 4), and a label typo (item 5).

The numerology bug is the only logic defect. The letter lookup in `abetka.helper.ts` uses `letters.match(new RegExp(letter, "i"))`. The `"i"` flag folds case, so when a user types a dotted lowercase `i` (U+0069) it matches the dotless `I` (U+0049) that sits in an earlier bucket (cardinal 2 / ordinal 11), and `Array.find` returns that first match. The Crimean Tatar tables already store explicit case pairs (`I`/`ı` together, `İ`/`i` together) precisely to support this distinction, but the case-insensitive regex defeats the intent. Result: small `i` → silver(11)/two(2) instead of white(12)/three(3). Using a regex also risks breaking on regex-special characters.

The layout items are CSS / coordinate tuning. Item 3 lacks an exact target spacing — the user will provide a second reference screenshot — so its final value is tuned during apply, not fixed now.

## Goals / Non-Goals

**Goals:**
- Correct the Crimean Tatar dotted/dotless `i` resolution for both ordinal (colour) and cardinal (number) without regressing case-insensitive matching for the other four alphabets.
- Align the two papers' bottom flowers, top edges, and the INFO panel top edge as described.
- Widen and equalize (LAT/UA) the header-to-content gap.
- Fix the patronymic label spelling in both locales.

**Non-Goals:**
- No change to the numerology tables themselves (the data is already correct).
- No redesign of the preset system or the D3 rendering pipeline.
- No change to flower sizing (covered by the prior may29 change).

## Decisions

### Decision: Replace case-insensitive regex with exact-match-first, case-insensitive fallback
In both `ordinalByLetter` and `cardinalByLetter`, replace `letters.match(new RegExp(letter, "i"))` with:
1. Exact match: `letters.includes(letter)` — wins first, so KT's explicitly-listed case pairs resolve correctly (`i`→dotted bucket, `ı`→dotless bucket).
2. Fallback case-insensitive match (`letter.toLowerCase()` compared against each entry's `toLowerCase()`) — only reached when no exact match exists, preserving today's behavior for alphabets that store a single case (UA, MSK, EN, Latynka).

**Why over alternatives:**
- *Locale-aware uppercasing (Turkish `tr` locale)* — fragile across JS engines, and `toLocaleUpperCase` of `İ`/`ı` is inconsistent; rejected.
- *Pure exact match (case-sensitive only)* — would break lowercase input for the single-case alphabets that store only uppercase; rejected.
- The exact-first/fallback approach is the minimal change that satisfies both KT disambiguation and existing case-insensitivity, and also removes the regex-injection fragility.

### Decision: Align bottom flowers via the Rozpakovka preset-0 bottom coordinate
Item 1 says "only the bottom flower moves." The main bush bottom flower (`BUSH_PRESETS[0]`, lowest-Y point) and the Rozpakovka bottom flower (`ROZP_PRESETS[0]`, 4th point) sit at different Y values. Adjust only the Rozpakovka preset-0 bottom point's Y so its distance from the paper bottom matches the main bush's bottom flower. Other preset-0 points and all other presets are untouched. Exact Y is verified visually during apply against the reference screenshot.

### Decision: Layout edges via CSS in the toneflower component
Items 2 and 3 are handled in `toneflower.component.css` (and `arc-info-panel.component.css` for the INFO panel's `margin-top`): align `.arc-panel` top and `.bushcont`/`.bushwrap` top to the header row baseline, and increase the vertical gap between `.flow-header-controls` and `.midwrap`. The gap must be applied unconditionally (not only when `showChyslo` expands the header) so LAT and UA match.

**Item 3 target (reference screenshot received 2026-06-22, annotated "ось цей проміжок на титулці"):** the desired gap is the larger vertical space that already appears between the header and the content when "show number" (`showChyslo`) is active and the header expands with the mat-slider row. The default ("titulka") view — show-number off — must reproduce that same gap. Implementation: add a fixed bottom margin / spacer below `.flow-header-controls` (or top margin on `.midwrap`) sized to match the show-number-active layout, so the gap is constant regardless of `showChyslo` and identical in LAT and UA.

### Decision: Label fix is a pure translation-string edit
Change `pobatjkovi` value in both translation objects: `"Po-batjkovi"` → `"Po batjkovi"` and `"По-батькові"` → `"По батькові"`. No structural/i18n-interface change.

## Risks / Trade-offs

- [Exact-match-first changes lookup for all alphabets] → Mitigated by the case-insensitive fallback and by extending `abetka.helper.spec.ts` with dotted/dotless `i` cases plus existing-alphabet regression cases before changing the function.
- [Item 3 spacing value is unspecified] → Defer the exact pixel value to apply once the user supplies the reference screenshot; ship the structural CSS gap and tune the magnitude.
- [Coordinate drift between arrangement-presets spec and code] → The spec's preset coordinates already differ from `ROZP_PRESETS`; this change only constrains the bottom-flower vertical relationship, not absolute coordinates, to avoid widening that drift.

## Open Questions

- None. Item 3 reference screenshot received (2026-06-22): target gap = the header-to-content spacing seen when "show number" is active; the default view must match it.
