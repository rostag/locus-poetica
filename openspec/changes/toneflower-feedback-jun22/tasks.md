## 1. Crimean Tatar small "i" fix (item 4)

- [x] 1.1 Add failing unit tests in `abetka.helper.spec.ts`: dotted `i` (U+0069) → cardinal 3 / ordinal 12, dotless `ı` (U+0131) → cardinal 2 / ordinal 11, plus regression cases for an existing single-case alphabet (e.g. UA "н" → cardinal 9, "к" → ordinal 3)
- [x] 1.2 Rewrite `cardinalByLetter` in `abetka.helper.ts` to exact-match (`letters.includes(letter)`) first, then fall back to case-insensitive comparison; remove the `RegExp(letter, "i")` usage
- [x] 1.3 Apply the same exact-match-first / case-insensitive-fallback logic to `ordinalByLetter`
- [x] 1.4 Run `npm test` and confirm the new and existing abetka tests pass

## 2. Patronymic label spelling (item 5)

- [x] 2.1 In `toneflower-translations.ts`, change LAT `pobatjkovi` from `"Po-batjkovi"` to `"Po batjkovi"`
- [x] 2.2 In `toneflower-translations.ts`, change UA `pobatjkovi` from `"По-батькові"` to `"По батькові"`

## 3. Bottom flower alignment (item 1)

- [x] 3.1 Determine the main bush bottom flower's distance from the paper bottom edge (`BUSH_PRESETS[0]` lowest-Y point vs paper height)
- [x] 3.2 Adjust only the Y of `ROZP_PRESETS[0]` bottom flower (4th point) in `toneflower.constants.ts` so its bottom-edge distance matches; leave the other three points unchanged
- [x] 3.3 Verify both default papers' bottom flowers visually align (equal bottom margin) and no other flowers moved

## 4. INFO + paper top-edge alignment (item 2)

- [x] 4.1 In `toneflower.component.css` / `arc-info-panel.component.css`, align the `.arc-panel` top and the `.bushcont`/`.bushwrap` tops to the language-switcher header row edge
- [ ] 4.2 Verify the INFO panel top, both paper tops, and the header edge sit on the same horizontal line

## 5. Header-to-content gap (item 3)

- [x] 5.1 Measure the header-to-content gap when `showChyslo` is active (the expanded-header state from the reference screenshot) — this is the target gap
- [x] 5.2 In `toneflower.component.css`, add a fixed bottom margin/spacer below `.flow-header-controls` (or top margin on `.midwrap`) so the default ("titulka", show-number off) view reproduces that same gap, applied unconditionally
- [ ] 5.3 Confirm the gap is identical with show-number on vs off, and identical in LAT and UA locales

## 6. Verification

- [x] 6.1 Run `npm test` (full suite) and `npm run build` to confirm no regressions
- [ ] 6.2 Manually load ToneFlower: type a name containing "i" with the Krymsjkotatarsjka abetka and confirm it renders white/3 (not silver/2); visually confirm items 1–3 and the patronymic label in both languages
