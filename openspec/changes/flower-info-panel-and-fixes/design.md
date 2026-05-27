## Context

ToneFlower renders two D3 SVG canvases (main bush + Rozpakovka) inside Angular standalone components. Flowers are drawn as concentric arc rings. A `BushArrangementService` holds arrangement state as Angular signals. Drag-and-drop attaches D3 drag listeners to a `<g class="flower-group">` wrapper per flower.

The arc info panel is a new feature: on hover of any arc segment the user should see the symbolic meaning of that arc's color (KOLJOR), number (ČYSLO), and their combined energy (POJEDNANNJA). The full lookup table (12 colors × 9 numbers + combinations) is static and Ukrainian-latynka encoded.

## Goals / Non-Goals

**Goals:**
- Fix the visual position jump on flower drag release.
- Replace Preset 0 coordinates for both bushes to match the reference artwork.
- Add a left-side panel showing arc hover info (KOLJOR + ČYSLO + POJEDNANNJA).

**Non-Goals:**
- Animated panel transitions (simple show/hide is fine).
- Click-to-lock the panel (hover only).
- Mobile/touch drag support changes.
- Internationalisation or language toggle.

## Decisions

### 1. Drag offset fix: delta-from-start instead of offset-from-center

**Current code** computes `offsetX = event.x - flower.cx` at drag start, then uses `event.x - offsetX` as the new center. This is logically correct but depends on D3's `event.x` being in the same coordinate space as `flower.cx`. If there is any SVG viewBox scaling, CSS sizing mismatch, or transform accumulation between the SVG root and the flower group the two values diverge and produce a jump on release.

**Fix**: Track only `deltaX = event.x - startX` where `startX = event.x` at drag start. This avoids any reliance on `flower.cx` being in the same coordinate space as the drag event:

```typescript
let startX: number, startY: number;
let currentDx = 0, currentDy = 0;

.on("start", e => { startX = e.x; startY = e.y; currentDx = 0; currentDy = 0; })
.on("drag",  e => {
  currentDx = Math.max(-flower.cx, Math.min(svgW - flower.cx, e.x - startX));
  currentDy = Math.max(-flower.cy, Math.min(svgH - flower.cy, e.y - startY));
  flowerGroup.attr("transform", `translate(${currentDx},${currentDy})`);
})
.on("end",   () => { /* save flower.cx+currentDx, flower.cy+currentDy */ })
```

Alternatives considered: (a) Passing an explicit `container` to d3.drag — fragile, depends on container selection. (b) Recomputing flower center from DOM bounding box — expensive and brittle.

### 2. Arc info data: static constants in toneflower.constants.ts

All 12 color descriptions, 9 number meanings, and their 36 combination texts are stored as typed lookup objects in `toneflower.constants.ts`. This keeps the data co-located with the other numerological constants (`IDNS`, etc.) and avoids an extra HTTP request or lazy-load.

Structure:
```typescript
export const COLOR_INFO: Record<number, { name: string; description: string }> = { ... };
export const NUMBER_INFO: Record<number, { meaning: string }> = { ... };
export const COMBO_INFO: Record<string, string> = { /* key: "colorOrd_num" */ };
```

Alternatives considered: (a) JSON asset file — unnecessary for static data that never changes. (b) i18n message catalog — overkill, no other language is planned.

### 3. Arc hover → panel: Angular signal on ToneFlowerComponent

`ToneFlowerComponent` owns the D3 canvas. It exposes a `WritableSignal<ArcHoverInfo | null>` called `hoveredArc`. D3 arc `mouseover` sets this signal; `mouseleave` clears it. `ArcInfoPanelComponent` is a sibling in the template receiving the signal value via `@Input`.

```
ToneFlowerComponent
  ├── hoveredArc = signal<ArcHoverInfo | null>(null)
  ├── <div class="midwrap">
  │     ├── <app-arc-info-panel [info]="hoveredArc()" />   ← left
  │     ├── .bushcont.left  (main SVG)
  │     └── .bushcont.right (rozpakovka SVG)
  └── drawFlowerInSvg: arc.on("mouseover", ...) → hoveredArc.set(...)
```

`ArcHoverInfo`:
```typescript
interface ArcHoverInfo {
  colorOrdinal: number;  // 1–12, from IDN.ordinal
  leafNum: number;       // 1–9, from LeafModel.leafNum
}
```

Alternatives considered: (a) RxJS Subject — heavier, adds subscription lifecycle. (b) Service-level signal — unnecessary coupling between an ephemeral UI state and the arrangement service.

### 4. Panel placement: flex item to the left in `.midwrap`

`midwrap` is already a flex row. Adding `<app-arc-info-panel>` as the first flex child places it to the left of the bushes naturally. When `info` is null the panel renders nothing (zero width / `display:none`), so the bush layout doesn't shift.

## Risks / Trade-offs

- [Coordinate space] The delta-fix assumes drag `event.x` is consistent between start and drag events — this is guaranteed by D3. → No mitigation needed beyond the fix itself.
- [Large constants file] Adding ~80 text strings to `toneflower.constants.ts` makes it longer. → Acceptable; data belongs with other domain constants.
- [Signal on component] `hoveredArc` is a component-level signal, not a service. If a second canvas later needs to share hover state, it will need to be lifted. → Not a concern in current scope; easy to refactor if needed.
