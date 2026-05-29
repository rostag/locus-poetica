## Context

Three items from user feedback collected 2026-05-29.

**Defect 1 — Date stuck at 01.01.1971**  
`GetOrdinalComponent.ngOnInit()` calls `setInputs()`, which loads `BUSH_SAMPLES[0]` (`"Д,е,н,ь,1,1,1971"`). The next line — `this.setDateInput(new Date())` — is commented out. The date is therefore always `1/1/1971` on first load, never replaced by today's date.

**Defect 2 — Right bush invisible when panel starts collapsed**  
`app-get-ordinal` is wrapped in `@if (rightPanelOpen())`. When `localStorage` has `rightPanelOpen = false` at startup, the component never mounts, its `ngOnInit` never fires, and `onRozpakovkaBushUpdate` is never emitted. `ToneFlowerComponent.updateRozpakovkaBush()` is never called, so `drawRozpBush()` is never called, leaving the right SVG container empty.

**Visual — Larger flower circles**  
Current IC defaults: `flowerButtSize = 12`, `flowerLeafWidth = 10`. User feedback (with two reference screenshots and audio) requests larger circles expanded sideways to fill surrounding white space (Option 1). Proposed new defaults: `flowerButtSize = 16`, `flowerLeafWidth = 13`. These are starting values — can be tuned visually.

**Visual — Čyslo number too large in arc-info panel**  
The `.section-label-num` class in `arc-info-panel.component.css` is `font-size: 3rem` with `margin-bottom: 24px`. User audio feedback: "величезне" (huge), with a large adjacent white space. The `.section-label-combo` (pojednannnja section) at `2rem` is secondary — reduce only if it also looks oversized after the main fix.

## Goals / Non-Goals

**Goals:**
- Date always initializes to today's date on first load
- Right bush renders correctly regardless of whether the right panel was collapsed on startup
- Flower circles visually larger per user's direction (Option 1: expand sideways)
- Čyslo number in arc-info panel reduced to a proportionate size with less surrounding whitespace

**Non-Goals:**
- Making `flowerButtSize` / `flowerLeafWidth` user-configurable at runtime (separate feature)
- Implementing Option 2 (crop/trim whitespace above and below bush containers) — user chose Option 1
- Changing the layout or arrangement of the two bush containers

## Decisions

### D1 — Uncomment the existing `setDateInput(new Date())` call

The fix is a one-line change: remove the comment on line 582 of `get-ordinal.component.ts`. `setDateInput` is correct; it uses `dayjs(date).month() + 1` for 1-indexed months. No behavior changes elsewhere.

### D2 — Initialize rozpakovka bush in `ToneFlowerComponent.ngOnInit` with a default model

Rather than restructuring the panel visibility logic, seed the right bush directly during component init. The default model to use is `SAMPLE_BUSHMODELS[1]` (already used as the sample for the right bush by `app-get-ordinal`). When the right panel is later opened and `app-get-ordinal` mounts, it will emit its calculated model which overwrites this default — no conflict.

*Alternative considered:* Move `app-get-ordinal` outside the `@if`. Rejected because it would initialize the heavy numerology panel even when the user intends it to stay hidden.

### D3 — Update IC constants only; no per-flower overrides

`flowerButtSize` and `flowerLeafWidth` in the `IC` object in `toneflower.constants.ts` are the single source of truth for all flower sizes. Updating them there propagates everywhere without touching `SAMPLE_BUSHMODELS` or any flower model constructors.

### D4 — Reduce `.section-label-num` font-size; optionally reduce `.section-label-combo`

Reduce `.section-label-num` from `3rem` → `2rem` and `margin-bottom` from `24px` → `16px` in `arc-info-panel.component.css`. This directly addresses the "величезне" feedback without touching component logic or bindings.

Reduce `.section-label-combo` from `2rem` → `1.5rem` and `margin-bottom` from `16px` → `12px` — secondary, verify visually after the primary fix.

## Risks / Trade-offs

- **Risk: Larger flowers overlap in the current preset layouts** — flower positions in `BUSH_PRESETS` / `ROZP_PRESETS` / `SAMPLE_BUSHMODELS` were designed for the old size. With bigger rings, flowers may visually collide. → Mitigation: verify all presets visually after resize; adjust flower position constants if needed.
- **Risk: `SAMPLE_BUSHMODELS` entries hardcode `buttSize: IC.flowerButtSize`** — they reference the constant at construction time. Since `IC` is a plain object (not a signal), the values in `SAMPLE_BUSHMODELS` are frozen at module load. As long as `IC` is updated before `SAMPLE_BUSHMODELS` is initialized (they're in the same file, in order), this is fine. → Verify constant ordering in `toneflower.constants.ts`.
