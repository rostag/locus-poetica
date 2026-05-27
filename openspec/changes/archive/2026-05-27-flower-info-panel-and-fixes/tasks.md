## 1. Drag-and-Drop Fix

- [x] 1.1 In `toneflower.component.ts` → `attachFlowerDrag`, replace the `offsetX/offsetY` offset-from-center approach with delta tracking: capture `startX = event.x, startY = event.y` on drag start, compute `currentDx = e.x - startX, currentDy = e.y - startY` on drag
- [x] 1.2 Update the clamp logic in the drag handler to use `Math.max(-flower.cx, Math.min(svgW - flower.cx, currentDx))` so bounds are enforced on the delta, not on an absolute position
- [x] 1.3 Verify: drag a flower in custom mode, release, confirm no position jump after re-render

## 2. Preset 0 Coordinate Update

- [x] 2.1 In `toneflower.constants.ts`, replace `BUSH_PRESETS[0]` with `{ name: 'Kompozytsija', points: [[163,68],[73,148],[118,235]] }`
- [x] 2.2 In `toneflower.constants.ts`, replace `ROZP_PRESETS[0]` with `{ name: 'Kompozytsija', points: [[132,60],[73,148],[178,148],[128,238]] }`
- [x] 2.3 Verify: on fresh load (clear localStorage), both bushes render with the new Preset 0 compositions; SVG thumbnails in the preset row reflect the new layouts

## 3. Arc Info Data Constants

- [x] 3.1 Add `COLOR_INFO: Record<number, { name: string; description: string }>` to `toneflower.constants.ts` with entries for ordinals 1–12 (Čornyj through Bilyj), using the full Ukrainian-latynka descriptions from the spec
- [x] 3.2 Add `NUMBER_INFO: Record<number, { meaning: string }>` to `toneflower.constants.ts` with entries for numbers 1–9
- [x] 3.3 Add `COMBO_INFO: Record<string, string>` to `toneflower.constants.ts` with keys `"colorOrd_num"` (e.g. `"1_1"`, `"1_4"`, `"1_7"`, `"2_2"`, …) for all 36 defined combination texts
- [x] 3.4 Export the `ArcHoverInfo` interface (`{ colorOrdinal: number; leafNum: number }`) from `toneflower.constants.ts` or a shared types file

## 4. Arc Info Panel Component

- [x] 4.1 Create `src/app/soundflow/tonecircus/arc-info-panel/arc-info-panel.component.ts` as a standalone Angular component with `@Input() info: ArcHoverInfo | null = null`
- [x] 4.2 Create `arc-info-panel.component.html`: three sections (KOLJOR, ČYSLO, POJEDNANNJA); panel hidden via `*ngIf` / `@if (info)` when `info` is null; use the lookup constants to render text
- [x] 4.3 Create `arc-info-panel.component.css`: visually bright design — bold colored section headers, comfortable padding, distinct background, readable font size; panel width ~220–260px; smooth `display` toggle that doesn't cause bush layout reflow

## 5. Arc Hover Events in D3

- [x] 5.1 In `toneflower.component.ts`, add `hoveredArc = signal<ArcHoverInfo | null>(null)` as a component property
- [x] 5.2 In `addArc`, on the `arcPath`, add `.on("mouseover", () => this.hoveredArc.set({ colorOrdinal: leafModel.leafIdn.ordinal, leafNum: leafModel.leafNum }))` and `.on("mouseleave", () => this.hoveredArc.set(null))`
- [x] 5.3 Verify the correct datum shape — `addArc` receives `leafModel` directly as a parameter, so `leafModel.leafIdn.ordinal` and `leafModel.leafNum` are always available

## 6. Wire Panel into Template

- [x] 6.1 Import `ArcInfoPanelComponent` in `ToneFlowerComponent` imports array
- [x] 6.2 In `toneflower.component.html`, add `<app-arc-info-panel [info]="hoveredArc()" />` as the first child inside `.midwrap` (before `.bushcont.left`)
- [x] 6.3 Verify: hovering a flower arc shows the panel with correct KOLJOR + ČYSLO + POJEDNANNJA; moving off hides it; bush layout does not shift

## 7. TypeScript Compile Check

- [x] 7.1 Run `npx tsc --noEmit 2>&1 | grep -v "\.spec\.ts"` and confirm zero errors outside test files
