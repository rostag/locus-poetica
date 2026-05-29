## 1. Fix: Date always shows 01.01.1971

- [x] 1.1 In `src/app/soundflow/tonecircus/get-ordinal/get-ordinal.component.ts`, uncomment line `// this.setDateInput(new Date());` inside `ngOnInit()` so the date fields initialize to today's date

## 2. Fix: Right bush not rendered when panel starts collapsed

- [x] 2.1 In `src/app/soundflow/tonecircus/toneflower.component.ts`, after `this.drawFlowers()` in `ngOnInit()`, call `this.updateRozpakovkaBush(SAMPLE_BUSHMODELS[1])` to seed the right bush with the default model regardless of right panel state
- [x] 2.2 Verify visually that opening the right panel after a collapsed start correctly updates the right bush via `onRozpakovkaBushUpdate`

## 3. Visual: Larger flower circles

- [x] 3.1 In `src/app/soundflow/tonecircus/toneflower.constants.ts`, update `IC.flowerButtSize` from `12` to `16`
- [x] 3.2 In the same file, update `IC.flowerLeafWidth` from `10` to `13`
- [x] 3.3 Verify all bush presets visually — check that larger flowers don't overlap excessively in any preset layout; adjust `BUSH_PRESETS` / `ROZP_PRESETS` flower positions if needed

## 4. Note: Audio feedback

- [x] 4.1 Transcribed `feedback-2025-05-29/WhatsApp Audio 2026-05-29 at 9.40.34 дп.opus` — confirmed Option 1 (expand circles sideways, keep positions) and identified čyslo number size as too large; tasks added as section 5

## 5. Visual: Reduce čyslo number font size

- [x] 5.1 In `src/app/soundflow/tonecircus/arc-info-panel/arc-info-panel.component.css`, reduce `.section-label-num` `font-size` from `3rem` to `2rem` and `margin-bottom` from `24px` to `16px`
- [x] 5.2 In the same file, reduce `.section-label-combo` `font-size` from `2rem` to `1.5rem` and `margin-bottom` from `16px` to `12px`
- [x] 5.3 Verify visually — number should be clearly prominent but not dominate the panel with excess whitespace
