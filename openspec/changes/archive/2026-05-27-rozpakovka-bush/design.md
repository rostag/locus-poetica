## Context

`ToneFlowerComponent` currently renders one D3 SVG (`#bushwrap`) driven by a `BushModel` emitted from `GetOrdinalComponent` via `(onBushUpdate)`. All D3 state lives in `this.svgr`, `this.arcs`, and `this.flowers[]`.

`GetOrdinalComponent.setData()` constructs the existing bush (nameFlower + dateFlower + pojedFlower) and — incorrectly since `rozpakovka-flower` — also appends `rozpakovkaFlower` to the same bush. This change removes that and introduces a parallel data path for the Rozpakovka bush.

Existing `rozpakovkaOut`, `rozpakovkaRingIn`, and `RozpakovkaRingViewComponent` are untouched — they drive the sidebar ring-view and are already correct.

## Goals / Non-Goals

**Goals:**
- Move Rozpakovka out of the existing bush and into its own separate `BushModel`
- Render the Rozpakovka bush in a second SVG to the right of the existing bush
- 4 flowers in a diamond arrangement, each matching the reference painting's concentric ring structure
- Reuse all existing D3 drawing infrastructure (`drawFlower`, `addArc`, `drawPie`, collision detection loop is per-arcs-array so stays separate)

**Non-Goals:**
- Changing the existing three-flower bush layout or behavior
- Changing `RozpakovkaRingViewComponent` — it stays
- Audio/collision interaction for the Rozpakovka bush (passive visualization only for now)

## Decisions

### D1 — Second D3 SVG in same ToneFlowerComponent

Add `private rozpSvgr` and `private rozpArcs = []` alongside the existing `svgr`/`arcs`. Add `private rozpFlowers: ToneFlower[] = []`. The `initFlow()` method initializes both SVGs. `updateRozpakovkaBush()` mirrors `updateBush()` but targets `rozpSvgr` and `rozpArcs`.

Alternative: separate `RozpakovkaBushComponent`. Rejected — duplicates all D3 infrastructure; the two bushes share settings (padAngle, showChyslo, bgStyle) so same-component is cleaner.

### D2 — `ROZP_POINTS` diamond with flower 1 at top

```
       1 (top)
  4 (left)   2 (right)
       3 (bottom)
```

Coordinates (in a 250×400 viewBox, same dimensions as the main bush SVG):
```typescript
export const ROZP_POINTS = [
  [125, 55],   // 1 — top (jadroName + jadroDate)
  [210, 160],  // 2 — right (imja + denj)
  [125, 265],  // 3 — bottom (pobat + misjacj)
  [40,  160],  // 4 — left (prizNeof + priz + rik)
];
```

Spacing ~110px between adjacent flowers gives comfortable separation given max outer radius ~52px.

### D3 — Flower leaf ordering: center = result, rings outward = inputs inner→outer

Following the existing `drawFlower` contract (leaf[0] = butt/center, higher index = outer ring):

- `leaves[0]` — result IDN (center circle)
- `leaves[1]` — innermost input IDN
- `leaves[2]` — next input IDN (outermost for 2-input rows)
- `leaves[3]` — outermost input IDN (Row 4 only)

Matches the reference painting (Row 1: outer=sribnyj, inner=pomarančevyj, center=červonyj).

Row 1: `[jadroImeniDenLeaf, jadroNameLeaf, jadroDateLeaf]`
Row 2: `[imjaDenLeaf, imjaLeaf, denjLeaf]`
Row 3: `[pobatMisjacLeaf, pobatLeaf, misjacLeaf]`
Row 4: `[prNeofPrRikLeaf, prizNeofLeaf, prizLeaf, rikLeaf]`

### D4 — New `@Output` on GetOrdinalComponent

`onRozpakovkaBushUpdate = new EventEmitter<BushModel>()` — emitted at the same time as `onBushUpdate`, from within the `if (this.useDate && this.useName)` guard. When the guard fails, emit an empty `BushModel` (`{ flowers: [] }`) so the second SVG clears.

### D5 — Layout: two SVG figure elements side-by-side

In `toneflower.component.html`, add `<figure id="rozpakovka-bushwrap">` immediately after `<figure id="bushwrap">` inside `.bushcont`, or as a sibling `div.bushcont`. The existing `.midwrap` flex row accommodates this naturally.

## Risks / Trade-offs

- **Collision detection**: `d3.timer` currently runs `collisionDetection(this.arcs)` over the main bush arcs. The Rozpakovka arcs (`this.rozpArcs`) are separate, so no cross-bush collisions. The timer callback doesn't need to change; Rozpakovka flowers are static (no play-flower in the second bush).
- **clearFlowers / redrawBush**: `clearFlowers()` and `redrawBush()` currently operate only on the main bush. A separate `clearRozpFlowers()` / `redrawRozpBush()` is needed, called when settings change (padAngle, showChyslo, bgStyle). Simplest: call both in every redraw trigger.
- **Initialization order**: `initFlow()` must initialize both SVGs. `ngOnInit` calls `initFlow()` then `drawFlowers()` — same pattern applies for the second bush.
