## 1. Constants

- [x] 1.1 Add `ROZP_POINTS` to `toneflower.constants.ts`:
  ```typescript
  export const ROZP_POINTS = [
    [125, 55],   // flower 1 — top
    [210, 160],  // flower 2 — right
    [125, 265],  // flower 3 — bottom
    [40,  160],  // flower 4 — left
  ];
  ```

## 2. GetOrdinalComponent — remove incorrect flower, add new emitter

- [x] 2.1 Import `ROZP_POINTS` in `get-ordinal.component.ts`
- [x] 2.2 Add `@Output() onRozpakovkaBushUpdate = new EventEmitter<BushModel>()` field
- [x] 2.3 In `setData()`, remove `rozpakovkaFlower` construction (`const rozpakovkaFlower`, its 4 leaf declarations, and the `flowers.push(rozpakovkaFlower)` line) — keep `rozpakovkaOut` assignments and `rozpakovkaRingIn` assignments intact
- [x] 2.4 In `setData()`, inside the `if (this.useDate && this.useName)` block, build a `rozpakovkaBush: BushModel` with 4 flowers positioned at `ROZP_POINTS`:
  - **Flower 1** (`ROZP_POINTS[0]`): leaves = `[{leafIdn: rozpakovkaOut.jadroImeniDen!, leafNum: jadroImeniDenCyslo}, {leafIdn: nameOut.jadro!, leafNum: jadroCyslo}, {leafIdn: dateOut.jadro!, leafNum: jadroDateCyslo}]`
  - **Flower 2** (`ROZP_POINTS[1]`): leaves = `[{leafIdn: rozpakovkaOut.imjaDen!, leafNum: imjaDenCyslo}, {leafIdn: nameOut.imja!, leafNum: imjaCyslo}, {leafIdn: dateOut.denj!, leafNum: denCyslo}]`
  - **Flower 3** (`ROZP_POINTS[2]`): leaves = `[{leafIdn: rozpakovkaOut.pobatMisjacj!, leafNum: poBatMisjacCyslo}, {leafIdn: nameOut.pobatjkovi!, leafNum: pobatCyslo}, {leafIdn: dateOut.misjacj!, leafNum: misjacCyslo}]`
  - **Flower 4** (`ROZP_POINTS[3]`): leaves = `[{leafIdn: rozpakovkaOut.prNeofPrRik!, leafNum: prizNeofPrizRikCyslo}, {leafIdn: nameOut.prizvysceNeoficijne!, leafNum: prizNeofCyslo}, {leafIdn: nameOut.prizvysce!, leafNum: prizCyslo}, {leafIdn: dateOut.rik!, leafNum: rikCyslo}]`
  - All flowers: `flowerX: ROZP_POINTS[i][0]`, `flowerY: ROZP_POINTS[i][1] + BUSH_LOC.marginTop()`, `buttSize: IC.flowerButtSize`, `leafWidth: IC.flowerLeafWidth`
- [x] 2.5 Emit `rozpakovkaBush` via `this.onRozpakovkaBushUpdate.emit(rozpakovkaBush)` inside the `if` block
- [x] 2.6 In the `else` block, emit `this.onRozpakovkaBushUpdate.emit({ flowers: [] })`

## 3. ToneFlowerComponent — second SVG

- [x] 3.1 Import `ROZP_POINTS` in `toneflower.component.ts`
- [x] 3.2 Add `private rozpSvgr` field (type `any`, same as `svgr`)
- [x] 3.3 Add `private rozpArcs = []` field
- [x] 3.4 Add `private rozpFlowers: ToneFlower[] = []` field
- [x] 3.5 In `initFlow()`, initialize `this.rozpSvgr` targeting `#rozpakovka-bushwrap`:
  ```typescript
  this.rozpSvgr = d3
    .select("#rozpakovka-bushwrap")
    .append("svg")
    .style("border", "1px solid #ccc")
    .attr("viewBox", [0, 0, this.width, this.height]);
  ```
- [x] 3.6 Add `clearRozpFlowers()` method (mirrors `clearFlowers()` but uses `rozpSvgr`, `rozpFlowers`, `rozpArcs`)
- [x] 3.7 Add `private drawRozpBush(bush: BushModel)` method (mirrors `drawBush()` but uses `rozpSvgr`, `rozpFlowers`, `rozpArcs`, and calls `drawFlowerInSvg(rozpSvgr, rozpArcs, flower)`)
- [x] 3.8 Extract a `private drawFlowerInSvg(svgTarget, arcsTarget, flower: ToneFlower)` helper from the existing `drawFlower()` — or make `drawFlower` accept an optional `svgr` param — so the same rendering logic works for both SVGs. Simplest: pass `svgr` and `arcs` explicitly to the drawing helpers.
- [x] 3.9 Add `updateRozpakovkaBush(bush: BushModel)` public method:
  ```typescript
  updateRozpakovkaBush(bush: BushModel) {
    this.clearRozpFlowers();
    this.drawRozpBush(bush);
  }
  ```
- [x] 3.10 Update `clearFlowers()` to also call `clearRozpFlowers()` (so padAngle/bgStyle toggles redraw both) — OR call `clearRozpFlowers()` explicitly in `redrawBush()`

## 4. Template wiring

- [x] 4.1 Add `<figure id="rozpakovka-bushwrap"></figure>` to `toneflower.component.html` inside `.bushcont` (or as a sibling `<div class="bushcont">`) immediately after the existing `#bushwrap` figure
- [x] 4.2 Add `(onRozpakovkaBushUpdate)="updateRozpakovkaBush($event)"` binding to `<app-get-ordinal>` in `toneflower.component.html`

## 5. Verification

- [x] 5.1 Confirm the main bush no longer shows a flower at `PLANT_CENTER` — the 3-flower layout is restored
- [x] 5.2 Confirm the Rozpakovka bush appears to the right with 4 flowers in a diamond arrangement
- [x] 5.3 Verify Flower 1 colors match the reference painting: outer ring = sribnyj, inner ring = pomarančevyj, center = červonyj (for Ростислав/26.11.1978 sample)
- [x] 5.4 Verify that toggling čyslo and changing padAngle redraws both bushes
