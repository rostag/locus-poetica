## 1. Data model

- [x] 1.1 Add `IdnRozpakovkaRingIn` type to `models/abetka.models.ts` — a structure that holds input IDNs and result IDN for each row:
  ```ts
  type RozpakovkaRingRow = { inputs: IDN[]; result: IDN };
  type IdnRozpakovkaRingIn = { rows: RozpakovkaRingRow[] };
  ```
  Row order: index 0=Row1, 1=Row2, 2=Row3, 3=Row4. Each `inputs` array lists IDNs outermost-first.

## 2. Compute ring data in GetOrdinalComponent

- [x] 2.1 Import `IdnRozpakovkaRingIn` in `get-ordinal.component.ts`
- [x] 2.2 Declare `rozpakovkaRingIn: IdnRozpakovkaRingIn | null = null` field on `GetOrdinalComponent`
- [x] 2.3 In `setData()`, after assigning `rozpakovkaOut` fields, build `rozpakovkaRingIn` using already-available IDNs:
  - Row 1 inputs (outermost first): `[getIdnByNumber(jadroDateNomer)!, getIdnByNumber(jadroNomer)!]`, result: `this.rozpakovkaOut.jadroImeniDen!`
  - Row 2 inputs: `[this.dateOut.denj!, this.nameOut.imja!]`, result: `this.rozpakovkaOut.imjaDen!`
  - Row 3 inputs: `[this.dateOut.misjacj!, this.nameOut.pobatjkovi!]`, result: `this.rozpakovkaOut.pobatMisjacj!`
  - Row 4 inputs (outermost first): `[this.dateOut.rik!, this.nameOut.prizvysce!, this.nameOut.prizvysceNeoficijne!]`, result: `this.rozpakovkaOut.prNeofPrRik!`
- [x] 2.4 Set `rozpakovkaRingIn = null` when `useName` or `useDate` is false (clear it in the same guard block)

## 3. RozpakovkaRingViewComponent

- [x] 3.1 Create `src/app/soundflow/tonecircus/get-ordinal/rozpakovka-ring-view/rozpakovka-ring-view.component.ts` as a standalone Angular component with `@Input() data: IdnRozpakovkaRingIn | null`
- [x] 3.2 Create `rozpakovka-ring-view.component.html` — renders an `@if (data)` block containing a `<div class="ring-grid">` with 4 labeled SVG ring diagrams:
  - Each diagram: an SVG with concentric `<circle>` elements; outermost circle uses `inputs[0].colorHex`, next uses `inputs[1].colorHex`, (Row 4 also `inputs[2].colorHex`), center circle uses `result.colorHex`
  - Fixed SVG `viewBox="0 0 130 130"`, center at (65,65)
  - Ring radii for 2-input rows: outer=62, inner=45, center=28
  - Ring radii for 3-input rows (Row 4): outer=62, mid=47, inner=32, center=17
  - Row number label as `<text>` element at top-left of SVG (e.g. "1.")
- [x] 3.3 Add CSS grid layout in the component's inline `styles` or a `.css` file: 2-column grid, Row 1 (`grid-column: 1 / -1`, justify-self: center) and Row 4 (`grid-column: 1 / -1`) spanning full width, rows 2 and 3 in separate columns

## 4. Integration

- [x] 4.1 Import `RozpakovkaRingViewComponent` in `get-ordinal.component.ts`
- [x] 4.2 Add `<app-rozpakovka-ring-view [data]="rozpakovkaRingIn" />` to `get-ordinal.component.html` below the Rozpakovka label rows

## 5. Visual verification

- [x] 5.1 Run the dev server and load the app with sample inputs (Ростислав / 26.11.1978 — select sample 6 from the BUSH_SAMPLES array) and visually confirm the 4 ring diagrams match the reference painting:
  - Ring 1: silver outer, orange inner, red center
  - Ring 2: red outer, blue inner, violet center
  - Ring 3: silver outer, blue inner, green center
  - Ring 4: pearl outer, gold middle, blue inner, black center
