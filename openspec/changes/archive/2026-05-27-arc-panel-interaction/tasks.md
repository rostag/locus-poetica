## 1. Extend ArcHoverInfo with colorHex

- [x] 1.1 In `toneflower.constants.ts`, add `colorHex: string` to the `ArcHoverInfo` interface
- [x] 1.2 In `toneflower.component.ts` → `addArc`, update the `hoveredArc.set(...)` call to include `colorHex: leafModel.leafIdn.colorHex`
- [x] 1.3 In `toneflower.component.ts`, add `clickedArc = signal<ArcHoverInfo | null>(null)` as a component property

## 2. Arc Hover Stroke Highlight

- [x] 2.1 In `addArc`, on the `mouseover` handler, add `.style("stroke", "#ffffff").style("stroke-width", "2.5px")` to `arcPath`
- [x] 2.2 In `addArc`, on the `mouseleave` handler, restore `.style("stroke", null).style("stroke-width", null)` to remove the highlight

## 3. Click-to-Lock Wiring in D3

- [x] 3.1 In `addArc`, add `.on("click", (event) => { event.stopPropagation(); this.clickedArc.set({ colorOrdinal: leafModel.leafIdn.ordinal, leafNum: leafModel.leafNum, colorHex: leafModel.leafIdn.colorHex }); })` on `arcPath`
- [x] 3.2 In `initFlow`, update the SVG background `click` handler to also call `this.clickedArc.set(null)` when the click is not on an arc (it already calls `addArc` for non-custom mode — add the signal clear before or after)

## 4. Update ArcInfoPanelComponent Inputs

- [x] 4.1 In `arc-info-panel.component.ts`, add `@Input() clickedInfo: ArcHoverInfo | null = null`
- [x] 4.2 Add a `get activeInfo()` getter that returns `this.info ?? this.clickedInfo` (hover preview takes priority over lock)
- [x] 4.3 Add a `get arcColor()` getter that returns `this.activeInfo?.colorHex ?? null`
- [x] 4.4 Add a pure `contrastColor(hex: string): string` helper in the component file using the ITU-R BT.601 luminance formula (threshold 0.55 → '#1a1a2e' for light, '#ffffff' for dark)
- [x] 4.5 In `toneflower.component.html`, update the `<app-arc-info-panel>` binding to `[info]="hoveredArc()" [clickedInfo]="clickedArc()"`

## 5. Update ArcInfoPanelComponent Template

- [x] 5.1 In `arc-info-panel.component.html`, wrap the entire content in `<div class="arc-panel" [style]="{'--arc-color': arcColor}">` (adds style binding)
- [x] 5.2 Add `@if (!activeInfo)` intro block: show the Ukrainian-latynka invite text with class `arc-intro`
- [x] 5.3 Change outer `@if (info && colorData && numberData)` to `@if (activeInfo && colorData && numberData)` and update all `info` references inside the template to `activeInfo`
- [x] 5.4 On the `.koljor` section, add `[style.background]="arcColor"` and `[style.color]="arcColor ? contrastColor(arcColor) : null"`

## 6. Update ArcInfoPanelComponent CSS

- [x] 6.1 In `arc-info-panel.component.css`, replace the hardcoded `border-left` color values on `.koljor`, `.čyslo`, `.pojednannja` with `border-left: 3px solid var(--arc-color, #f0c040)`
- [x] 6.2 Replace hardcoded `color` values on `.koljor .section-label`, `.čyslo .section-label`, `.pojednannja .section-label` with `color: var(--arc-color, #f0c040)` (unified on `.section-label`)
- [x] 6.3 Remove the old hardcoded `.čyslo` border/color rules and `.pojednannja` border/color rules that conflict (kept only the shared `var(--arc-color)` version)
- [x] 6.4 Add `.arc-intro` style: muted white text (0.45 opacity), center-aligned, vertical padding 20px, italic

## 7. TypeScript Compile Check

- [x] 7.1 Run `npx tsc --noEmit 2>&1 | grep -v "\.spec\.ts"` and confirm zero errors outside test files
