## Context

The Toneflower bush currently renders three flowers produced by `GetOrdinalComponent.setData()`:
1. **Імʼя** — name components + jadro imeni
2. **Дата** — date components + jadro daty
3. **Поєднання** — cross-product of name+date pairs + jadro

A fourth flower, **Розпаковка**, provides a deeper cross-combination: each row pairs a core (jadro) or individual name component with its matching date component. All arithmetic uses the same two reduction functions already in use — `ordinalByDate` (1–12) for color/sound and `cardinalByNumber` (1–9) for čyslo.

The visual system uses D3; each `FlowerModel` added to the `BushModel` array is automatically drawn by the existing `drawBush` → `drawFlower` pipeline. No D3 changes are needed.

## Goals / Non-Goals

**Goals:**
- Compute the 4 Rozpakovka petals from already-available intermediate values (`imjaNomer`, `denNomer`, etc.)
- Emit the 4th flower in the `BushModel` alongside the existing three
- Show the 4 rows in the `get-ordinal` sidebar
- Place the flower at `PLANT_CENTER` (already defined, currently unused as a flower position)

**Non-Goals:**
- A dedicated jadro (center) petal for Rozpakovka — the spec does not define one; the 4 rows are the full output
- New alphabet tables or reduction logic
- Changing the visual layout of the first three flowers

## Decisions

### D1 — Reuse existing ordinal/cardinal reduction functions

The same `ordinalByDate` and `cardinalByNumber` helpers used for Поєднання work for Rozpakovka rows. No new math utilities needed.

`ordinalByDate` accepts a dot-separated string of already-reduced ordinals and reduces their sum. This is the same pattern used for `imjaDenNomer` etc. in the existing code.

### D2 — Place the 4th flower at PLANT_CENTER

`PLANT_CENTER = [125, 150]` is already exported but currently only used as a fallback position. Using it for Rozpakovka avoids adding a 4th entry to `PLANT_POINTS` and keeps the visual layout symmetric (the three existing flowers surround the center).

Alternative: add `PLANT_POINTS[3]`. Rejected — adds visual clutter and requires layout tuning.

### D3 — Add `IdnRozpakovkaOut` type alongside existing output types

Four fields: `jadroImeniJadroDen`, `imjaDen`, `pobatMisjacj`, `prNeofPrRik`. Each is `IDN | null`. Follows the naming convention of `IdnPojedOut`.

### D4 — Conditional inclusion mirrors Поєднання

Rozpakovka requires both `useName` and `useDate` to be true (same guard as `pojedFlower`). This is the natural constraint: all 4 rows require both name and date inputs.

## Risks / Trade-offs

- **Row 1 reuses jadro values** — `jadroImeniJadroDen` is computed from `jadroNomer` and `denNomer` (not `jadroDenNomer`). The example confirms: jadro imeni (3) + jadro **dnja** (11, which is `denNomer`, not `jadroDatyNomer`). This must be clear in the spec and task.
- **PLANT_CENTER already used as a layout fallback** — using it as a real flower position when both flags are on is a minor dual-use but acceptable given the existing semantics.
