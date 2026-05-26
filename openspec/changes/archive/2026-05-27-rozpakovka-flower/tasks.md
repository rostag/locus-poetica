## 1. Type definitions

- [x] 1.1 Add `IdnRozpakovkaOut` type to `src/app/soundflow/tonecircus/models/abetka.models.ts` with fields: `jadroImeniDen: IDN | null`, `imjaDen: IDN | null`, `pobatMisjacj: IDN | null`, `prNeofPrRik: IDN | null`

## 2. Computation in GetOrdinalComponent

- [x] 2.1 Declare `rozpakovkaOut: IdnRozpakovkaOut` field on `GetOrdinalComponent` (initialised with all nulls)
- [x] 2.2 Import `IdnRozpakovkaOut` in `get-ordinal.component.ts`
- [x] 2.3 In `setData()`, after the existing Поєднання block, compute the 4 Rozpakovka ordinals using `ordinalByDate`:
  - `jadroImeniDenNomer = ordinalByDate("" + jadroNomer + "." + denNomer)`
  - `imjaDenNomer = ordinalByDate("" + imjaNomer + "." + denNomer)` (reuse existing `imjaDenNomer` if already present — check if it equals this; if yes, reuse)
  - `pobatMisjacNomer = ordinalByDate("" + pobatNomer + "." + misjacNomer)` (already exists as `poBatMisjacNomer` — reuse)
  - `prizNeofPrizRikNomer = ordinalByDate("" + prizNeofNomer + "." + prizNomer + "." + rikNomer)` (already exists — reuse)
- [x] 2.4 Compute the 4 Rozpakovka cardinals using `cardinalByNumber`:
  - `jadroImeniDenCyslo = cardinalByNumber("" + jadroCyslo + denCyslo)`
  - `imjaDenCyslo` (already exists — reuse)
  - `poBatMisjacCyslo` (already exists — reuse)
  - `prizNeofPrizRikCyslo` (already exists — reuse)
- [x] 2.5 Assign `rozpakovkaOut` fields via `getIdnByNumber()`
- [x] 2.6 Build `rozpakovkaFlower: FlowerModel` with 4 leaves at `PLANT_CENTER` (+ `BUSH_LOC.marginTop()`) with `buttSize: IC.flowerButtSize` and `leafWidth: IC.flowerLeafWidth`
- [x] 2.7 Push `rozpakovkaFlower` into the `flowers` array inside the `if (this.useDate && this.useName)` guard

## 3. UI

- [x] 3.1 Add a `<h3>Rozpakovka</h3>` section to `get-ordinal.component.html` below the Pojednannja section
- [x] 3.2 Add 4 `<div class="flex-row">` rows following the existing label + `<app-idn>` pattern:
  - Row 1: label "Jadro imeni + jadro dnja", `[idn]="rozpakovkaOut.jadroImeniDen"`
  - Row 2: label "Im'ja + denj", `[idn]="rozpakovkaOut.imjaDen"`
  - Row 3: label "Po batjkovi + misjacj", `[idn]="rozpakovkaOut.pobatMisjacj"`
  - Row 4: label "Pr Neof + Pr + Rik", `[idn]="rozpakovkaOut.prNeofPrRik"`

## 4. Algorithm documentation

- [x] 4.1 Update `abetka/abetka.component.html` to add a "Rozpakovka" section in the `<pre>` block documenting the 4-row algorithm, matching the style of the existing Поєднання description

## 5. Verification

- [x] 5.1 Verify with sample inputs (Ростислав / 24.08.1991) that row results match the worked example in the spec:
  - Row 1: červonyj (2), cardinal 2
  - Row 2: fioletovyj (8), cardinal 2
  - Row 3: zelenyj (5), cardinal 8
  - Row 4: čornyj (1), cardinal 1
- [x] 5.2 Verify the 4th flower appears in the bush SVG when both name and date are provided
- [x] 5.3 Verify the flower is absent when `useName` or `useDate` is unchecked
