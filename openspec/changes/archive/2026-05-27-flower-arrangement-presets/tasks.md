## 1. Preset Data & Service

- [x] 1.1 Add `BUSH_PRESETS` constant to `toneflower.constants.ts` — array of 5 `{ name, points }` entries (3-point each) with Ukrainian latynka names
- [x] 1.2 Add `ROZP_PRESETS` constant to `toneflower.constants.ts` — array of 5 `{ name, points }` entries (4-point each) with Ukrainian latynka names
- [x] 1.3 Create `BushArrangementService` (`src/app/soundflow/tonecircus/bush-arrangement.service.ts`) holding separate signals for each bush: `mainPreset: WritableSignal<number | 'custom'>`, `mainCustomPositions: WritableSignal<[number,number][]>`, `rozpakovkaPreset: WritableSignal<number | 'custom'>`, `rozpakovkaCustomPositions: WritableSignal<[number,number][]>`
- [x] 1.4 Implement `positionsForFlower(bushId: 'main' | 'rozpakovka', index: number): [number, number]` that returns the correct coordinates based on the active preset or custom positions for that bush
- [x] 1.5 Implement `selectPreset(bushId, n: number)` and `activateCustomMode(bushId)` methods that update the appropriate signals

## 2. localStorage Persistence

- [x] 2.1 On service construction, read `toneflower.bush.main.preset` and `toneflower.bush.rozpakovka.preset`; apply valid values (0–4 or `"custom"`), default to 0 otherwise
- [x] 2.2 On service construction, read `toneflower.bush.main.custom` and `toneflower.bush.rozpakovka.custom`; validate (3 and 4 entries respectively), load if valid, clear corrupt entries
- [x] 2.3 In `selectPreset()`, write `toneflower.bush.<id>.preset` to localStorage after updating the signal
- [x] 2.4 In `activateCustomMode()`, write `"custom"` to `toneflower.bush.<id>.preset` in localStorage
- [x] 2.5 Implement `saveCustomPositions(bushId)` that JSON-serialises the relevant custom signal and writes to `toneflower.bush.<id>.custom`

## 3. Refactor GetOrdinalComponent to Use Dynamic Positions

- [x] 3.1 Inject `BushArrangementService` into `GetOrdinalComponent`
- [x] 3.2 Replace the 3 direct `PLANT_POINTS[n]` references (lines ~273, ~307, ~403) with `arrangementService.positionsForFlower('main', n)`; keep `PLANT_CENTER` fallback unchanged
- [x] 3.3 Replace the 4 direct `ROZP_POINTS[n]` references (lines ~439, ~454, ~477, ~501) with `arrangementService.positionsForFlower('rozpakovka', n)`
- [x] 3.4 Add `effect()` calls (or equivalent reactive triggers) so that changes to either bush's arrangement signal trigger a redraw of the respective bush SVG

## 4. SVG Thumbnail Preset Buttons Component

- [x] 4.1 Create `ArrangementPresetsComponent` (`src/app/soundflow/tonecircus/arrangement-presets/arrangement-presets.component.ts`) as a standalone Angular component with `@Input() bushId: 'main' | 'rozpakovka'`
- [x] 4.2 For each of the 5 presets, render a button (~44×44px) containing an inline `<svg>` thumbnail: draw one small circle per flower position, scaled proportionally from the preset's coordinate space to the 44×44 viewport
- [x] 4.3 Set the `title` attribute on each button to the preset's Ukrainian latynka name (browser tooltip on hover); no visible text label
- [x] 4.4 Render the "Moia kompozytsiia" sixth button as a text button; mark it active when the bush's active preset is `'custom'`
- [x] 4.5 Apply an `active` CSS class to the currently selected preset button
- [x] 4.6 Wire button clicks to `arrangementService.selectPreset(bushId, n)` and `arrangementService.activateCustomMode(bushId)`
- [x] 4.7 Add `ArrangementPresetsComponent` to `ToneFlowerComponent`'s imports; place one instance beneath the main bush `<svg>` (`bushId="main"`) and one beneath the Rozpakovka bush `<svg>` (`bushId="rozpakovka"`)

## 5. Drag-and-Drop Custom Mode

- [x] 5.1 In `ToneFlowerComponent.drawBush()`, after rendering main bush flower groups, conditionally attach `d3.drag()` to each flower `<g>` when `arrangementService.mainPreset() === 'custom'`
- [x] 5.2 In the Rozpakovka draw function, conditionally attach `d3.drag()` to each Rozpakovka flower `<g>` when `arrangementService.rozpakovkaPreset() === 'custom'`
- [x] 5.3 On drag: update the D3 transform of the flower group in real-time; clamp `x` to `[0, svgWidth]` and `y` to `[0, svgHeight]`
- [x] 5.4 On drag end: call `arrangementService.rozpakovkaCustomPositions.update(...)` (or `mainCustomPositions`) with the new `[x, y]`, then call `arrangementService.saveCustomPositions(bushId)`
- [x] 5.5 When a bush's active preset changes away from `'custom'`, remove D3 drag listeners from its flower groups and trigger a redraw

## 6. Styling

- [x] 6.1 Add CSS in `arrangement-presets.component.css`: flex-row layout for the 6 buttons, active-state border/background highlight, consistent sizing
- [x] 6.2 Style SVG thumbnail circles in inactive vs active states (e.g., dimmer fill for inactive presets)
- [x] 6.3 Add `cursor: grab` / `cursor: grabbing` to flower `<g>` elements when their bush's custom mode is active (toggle a CSS class on the respective SVG container)
