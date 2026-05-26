## Why

The Toneflower model currently has three flowers: "Імʼя", "Дата", and "Поєднання". A fourth flower — "Розпаковка" — completes the numerological portrait by cross-combining the core (jadro) values of name and date with each individual name component and its matching date component.

## What Changes

- Add a fourth `FlowerModel` ("Rozpakovka") computed in `GetOrdinalComponent.setData()`, emitted as part of the `BushModel`
- Add a 4th plant position in `PLANT_POINTS` (or use `PLANT_CENTER`) to place the new flower visually
- Add `IdnRozpakovkaOut` type to `abetka.models.ts`
- Extend the UI in `get-ordinal.component.html` with a "Rozpakovka" section showing all 4 rows
- Update `abetka.component.html` description to document the Rozpakovka algorithm

## Capabilities

### New Capabilities

- `rozpakovka-flower`: Fourth Toneflower — computes 4 combination petals from name-core × date-components and name-components × date-components cross-products, rendered as a flower in the bush

### Modified Capabilities

## Impact

- `get-ordinal/get-ordinal.component.ts` — new flower computed in `setData()`
- `get-ordinal/get-ordinal.component.html` — new Rozpakovka UI rows
- `toneflower.constants.ts` — new plant point or reuse of `PLANT_CENTER` for the 4th flower position
- `models/abetka.models.ts` — new `IdnRozpakovkaOut` type
- `abetka/abetka.component.html` — algorithm description update
