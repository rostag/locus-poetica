## Why

User feedback collected on 2026-05-29 identified two functional defects in ToneFlower and a user request to enlarge the flower circles. The defects degrade first-use experience (wrong date on load, invisible right bush). The visual change follows direct user input with reference screenshots.

## What Changes

- **Fix defect**: Date fields always load as 01.01.1971 — uncomment `setDateInput(new Date())` in `GetOrdinalComponent.ngOnInit()` so the date defaults to today
- **Fix defect**: Right (rozpakovka) bush not rendered when the right panel is initially collapsed — initialize the right bush directly in `ToneFlowerComponent.ngOnInit()` with a default model, independent of the panel state
- **Visual enhancement**: Increase flower element size — larger circle radii and adjusted leaf width, expanding sideways to fill surrounding white space (Option 1 from user sketch, `feedback-2025-05-29/` images)
- **Visual enhancement**: Reduce čyslo number font size in the arc-info panel — the large number (`3rem`) leaves excessive white space adjacent to it; reduce to a more proportionate size

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `flower-rendering`: Flower circle sizes change — `buttSize` / `leafWidth` / `IC` defaults updated

## Impact

- `src/app/soundflow/tonecircus/get-ordinal/get-ordinal.component.ts` — uncomment date init line
- `src/app/soundflow/tonecircus/toneflower.component.ts` — draw default rozpakovka bush in `ngOnInit`
- `src/app/soundflow/tonecircus/toneflower.constants.ts` — adjust `IC.flowerButtSize` / `IC.flowerLeafWidth` (or equivalent sizing constants)
- `src/app/soundflow/tonecircus/arc-info-panel/arc-info-panel.component.css` — reduce `.section-label-num` font-size; optionally reduce `.section-label-combo`
- No new routes, no new components, no dependency changes
