## Context

Each bush currently renders flowers at hardcoded `PLANT_POINTS` / `ROZP_POINTS` arrays in `toneflower.constants.ts`. The positions are used directly inside `get-ordinal.component.ts` at the time each `FlowerModel` is constructed. There is no mechanism to override positions at runtime. The D3 renderer in `toneflower.component.ts` consumes `BushModel` objects where `flowerX/flowerY` are already baked into each `FlowerModel`.

Viewport is 250×290 (main bush) and similar for Rozpakovka. D3 and Angular signals are already in the stack.

## Goals / Non-Goals

**Goals:**
- 5 named geometric presets per bush (main 3-flower + Rozpakovka 4-flower), selectable via SVG thumbnail buttons beneath each SVG.
- "Moia kompozytsiia" drag-and-drop custom mode per bush.
- Active arrangement persisted in `localStorage` separately per bush, restored on load.
- No change to the audio/D3 play-arc interaction.

**Non-Goals:**
- Animated transitions between presets (future work).
- Sharing or exporting custom compositions.

## Decisions

### 1. Arrangement state lives in a new `BushArrangementService`

An Angular injectable service holds two signals per bush:
- `activePreset: Signal<number | 'custom'>` — which preset (0–4) or `'custom'` is active.
- `customPositions: Signal<[number, number][]>` — per-flower `[x, y]` in custom mode.

**Why a service over component-local state?** The positions need to be readable by `GetOrdinalComponent` (which builds `FlowerModel`) and by `ToneFlowerComponent` (which applies D3 drag). A service bridges the two without prop-drilling.

**Why signals?** Already used for `BUSH_LOC.marginTop`; consistent pattern; reactive without RxJS overhead.

### 2. Preset coordinates defined as constant tables in `toneflower.constants.ts`

```ts
export const BUSH_PRESETS: Array<{ name: string; points: [number,number][] }> = [
  { name: 'Trykutnyk', points: [[162,231],[80,137],[165,60]]  },  // current default
  { name: 'Duga',      points: [[60,200],[125,80],[190,200]]  },
  { name: 'Linija',    points: [[125,230],[125,145],[125,60]] },
  { name: 'Romb',      points: [[125,240],[60,145],[125,50]]  },
  { name: 'Klaster',   points: [[125,175],[95,120],[155,120]] },
];

export const ROZP_PRESETS: Array<{ name: string; points: [number,number][] }> = [
  { name: 'Romb',      points: [[125,50],[75,140],[175,140],[125,240]] },  // current default
  { name: 'Khryst',    points: [[125,40],[40,140],[210,140],[125,250]] },
  { name: 'Kvadrat',   points: [[80,70],[170,70],[80,200],[170,200]]   },
  { name: 'Linija',    points: [[125,50],[125,110],[125,180],[125,240]] },
  { name: 'Klaster',   points: [[100,110],[150,110],[100,170],[150,170]] },
];
```

Names in Ukrainian latynka to stay consistent with the project's language convention.

**Why not dynamic/generated?** Preset geometry is editorial — hand-crafted harmony matters here. A data table is sufficient and reviewable.

### 3. `GetOrdinalComponent` reads positions from the service

Replace the three direct `PLANT_POINTS[n]` lookups and the four `ROZP_POINTS[n]` lookups with calls to `arrangementService.positionsForFlower(bushId, flowerIndex)`. `PLANT_CENTER` fallback (when only one input is set) remains unchanged.

This is a minimal surgical change: no new inputs/outputs on the component.

### 4. Drag uses D3 `.drag()` on existing flower `<g>` elements, gated by a `customMode` signal

`ToneFlowerComponent` already owns the D3 SVG. When `activePreset === 'custom'`, apply `d3.drag()` to each flower group. On drag end, call `arrangementService.updateCustomPosition(flowerIndex, x, y)`. The service writes to localStorage and emits the updated signal, which triggers a redraw via the existing `redrawBush()` call.

**Why D3 drag over Angular CDK drag?** The flowers are D3 `<g>` elements, not Angular DOM nodes. D3 drag is already in-project and handles SVG coordinate space correctly.

**Drag handle**: the center circle (`<circle>` at `cx=0,cy=0`) of each flower group acts as the drag target. No new DOM elements needed.

### 5. `localStorage` schema

```
toneflower.bush.main.preset         → "0" | "1" | "2" | "3" | "4" | "custom"
toneflower.bush.main.custom         → JSON: [[x,y],[x,y],[x,y]]
toneflower.bush.rozpakovka.preset   → "0" | "1" | "2" | "3" | "4" | "custom"
toneflower.bush.rozpakovka.custom   → JSON: [[x,y],[x,y],[x,y],[x,y]]
```

Read on service construction (before first render). Write on every change.

**Why two keys per bush?** Separating `preset` from `custom` means switching back from custom to a preset doesn't destroy the saved custom layout.
**Why separate keys per bush?** Avoids namespace collisions and allows independent compositions on main vs Rozpakovka.

### 6. Preset controls as SVG thumbnail buttons in `ArrangementPresetsComponent`

A standalone Angular component that receives `@Input() bushId: 'main' | 'rozpakovka'` and renders:
- 5 preset buttons, each containing a **small inline SVG thumbnail** (~44×44px) showing scaled dot positions for that preset's flower layout. No text label visible by default.
- A `title` attribute on each button provides the Ukrainian latynka preset name as a browser-native tooltip shown on hover.
- 1 "Moia kompozytsiia" toggle button (text label, no thumbnail needed).

The thumbnail SVG renders each flower position as a small filled circle (~4px radius), scaled to fit the 44×44 viewport using `d3.scaleLinear` or manual linear mapping from bush coordinate space.

Placed in the template of `ToneFlowerComponent` below each respective bush `<svg>` — once for main bush (bushId=`'main'`), once for Rozpakovka (bushId=`'rozpakovka'`).

**Alternative considered**: text labels. Rejected per user decision — thumbnails communicate geometry visually and are more compact.
**Alternative considered**: CSS-drawn dots (absolute positioning). Rejected — inline SVG is already in the stack and scales cleanly.

## Risks / Trade-offs

- **Redraw coupling**: `GetOrdinalComponent` currently rebuilds the full `BushModel` (including positions) when the user changes name/date. If the arrangement service signal changes between that and a redraw cycle, a brief position flash is possible. Mitigation: ensure `setData()` in `get-ordinal.component.ts` always reads the latest positions from the service synchronously.
- **Custom positions with different flower counts**: If `useName` is false, only 1–2 main-bush flowers render; stored 3-position custom arrays remain valid since we access by index. Rozpakovka custom arrays always hold 4 entries.
- **Rozpakovka redraw trigger**: Rozpakovka positions currently set at construction time in `GetOrdinalComponent`. Must ensure an `effect()` on the Rozpakovka arrangement signal also calls `redrawBush()` for the Rozpakovka SVG.
- **First-load flash**: `localStorage` read happens in service constructor; as long as the service is injected before first render (via `providers` in the module), no flash occurs.

## Migration Plan

1. Add `BUSH_PRESETS` to `toneflower.constants.ts`.
2. Create `BushArrangementService` with signals + localStorage I/O.
3. Refactor `GetOrdinalComponent` to use service positions.
4. Build `ArrangementPresetsComponent` and add to `ToneFlowerComponent` template.
5. Wire D3 drag in `ToneFlowerComponent` when `activePreset === 'custom'`.
6. Manual smoke test; no migration/rollback needed (localStorage key absence defaults to preset 0).

## Open Questions

_None — all questions resolved:_
- Preset controls use **small SVG icon thumbnails** (not text labels); Ukrainian latynka name appears as hover tooltip. See Decision 6.
- **Rozpakovka bush is in scope** for this change. See `ROZP_PRESETS` in Decision 2 and Rozpakovka-specific tasks.
