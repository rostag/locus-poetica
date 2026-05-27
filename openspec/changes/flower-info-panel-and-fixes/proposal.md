## Why

Three related user-facing improvements: a drag-and-drop bug makes custom arrangement unreliable (flowers jump after release), the first preset slot doesn't reflect the desired hand-painted compositions from the reference artwork, and there is no way to understand the symbolic meaning of a flower's colored arc without prior knowledge of the numerological system.

## What Changes

- **Fix drag-and-drop offset bug**: After releasing a dragged flower it snaps to an incorrect position. Fix: track delta-from-grab-point so the flower stays exactly where the mouse was released.
- **Replace Preset 0 for main bush** (3 flowers, from reference image — left sheet):
  - Flower 0 (upper-right): `[163, 68]`
  - Flower 1 (middle-left): `[73, 148]`
  - Flower 2 (lower-center): `[118, 235]`
- **Replace Preset 0 for Rozpakovka bush** (4 flowers, from reference image — right sheet):
  - Flower 0 (upper-center): `[132, 60]`
  - Flower 1 (middle-left): `[73, 148]`
  - Flower 2 (middle-right): `[178, 148]`
  - Flower 3 (lower-center): `[128, 238]`
- **Arc hover info panel**: A styled side-panel appears to the left of the bush area on arc mouseover, showing three sections — KOLJOR (color name + description), ČYSLO (number meaning), and POJEDNANNJA KOLJORU TA ČYSLA (combined meaning) — drawn from a static lookup table of all 12 colors × 9 numbers.

## Capabilities

### New Capabilities

- `arc-info-panel`: Left-side panel component displaying KOLJOR, ČYSLO, and POJEDNANNJA for the currently hovered arc. Hidden when no arc is hovered. Contains the full Ukrainian-latynka lookup table for all 12 colors and 9 numbers plus their combinations.

### Modified Capabilities

- `custom-arrangement`: Drag-and-drop positioning fix — the release position must match the visual drop location exactly.
- `arrangement-presets`: Preset 0 coordinates updated for both main and Rozpakovka bushes to match the hand-painted reference compositions.

## Impact

- `toneflower.constants.ts` — `BUSH_PRESETS[0]` and `ROZP_PRESETS[0]` point arrays replaced; new `ARC_INFO` lookup constants added (color descriptions × number meanings × combinations).
- `toneflower.component.ts` — drag offset calculation simplified; arc `mouseover`/`mouseleave` events emit hover state to parent.
- `toneflower.component.html` — new `<app-arc-info-panel>` component placed left of the flex row.
- New `arc-info-panel/` component (template + CSS + TS).
- No new npm dependencies; no API or localStorage schema changes.
