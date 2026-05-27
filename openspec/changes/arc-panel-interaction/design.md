## Context

`ArcInfoPanelComponent` receives `info: ArcHoverInfo | null` from `ToneFlowerComponent` via a signal. Currently: panel is invisible unless an arc is hovered; it has fixed cyan/violet/gold colors. The five changes in this proposal require an expanded state model, a new arc interaction, and dynamic color application.

## Goals / Non-Goals

**Goals:**
- Panel always visible with a meaningful default state (intro text).
- Hover and click produce distinct, layered interaction: hover = preview, click = lock.
- All panel accent colors (background, borders, headers) respond to the hovered/clicked arc color.
- Readable text contrast for all 12 colors, including light ones (perlynovyj, sribnyj, bilyj).
- Hover arc gets a visible stroke highlight without affecting layout.

**Non-Goals:**
- Panel animation / slide-in transitions.
- Touch/mobile tap-to-lock (hover events only on pointer devices).
- Persisting the clicked arc across page reloads.

## Decisions

### 1. Two-signal state model in ToneFlowerComponent

Two component-level signals drive the panel:

```
hoveredArc = signal<ArcHoverInfo | null>(null)   // transient, set on arc mouseover/leave
clickedArc = signal<ArcHoverInfo | null>(null)   // persistent, set on arc click
```

`ArcInfoPanelComponent` receives both as `@Input()`. Its internal `activeInfo` computed property resolves:
```
activeInfo = hoveredInfo ?? clickedInfo  (hover preview overrides lock)
```

When mouse leaves an arc: `hoveredArc` → null, so panel falls back to `clickedArc` (or intro if nothing locked).

Alternatives considered: (a) Single signal with explicit state enum — more complex, no benefit at this scale. (b) RxJS BehaviorSubject — heavier lifecycle, not needed.

### 2. colorHex flows through ArcHoverInfo

`ArcHoverInfo` gains a `colorHex: string` field populated from `leafModel.leafIdn.colorHex` at the point `addArc` sets the signal. This makes the panel self-contained — it doesn't need to import `IDNS` or look up the hex separately.

```typescript
export interface ArcHoverInfo {
  colorOrdinal: number;
  leafNum: number;
  colorHex: string;   // ← new
}
```

### 3. Text contrast via luminance threshold

To ensure readability against any of the 12 `colorHex` backgrounds:

```typescript
function contrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Perceived luminance (ITU-R BT.601)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? '#1a1a2e' : '#ffffff';
}
```

Light colors (perlynovyj `#f2f2dc`, sribnyj `#DBDFE5`, bilyj `#f5f5f5`) → dark text. Dark/medium → white text.

This helper lives in `arc-info-panel.component.ts` as a pure function.

### 4. Accent color via CSS custom property --arc-color

The panel's `[style]` host binding sets `--arc-color: <colorHex>` on the `.arc-panel` root element. All accent rules (border-left, header color) reference `var(--arc-color)` instead of hardcoded values. KOLJOR section uses `background: var(--arc-color)` and `color: <contrastColor>` applied inline.

This avoids per-section `[style]` bindings — one binding at the root, pure CSS does the rest.

Alternatives considered: Inline `[style.borderLeftColor]` per section — verbose and harder to maintain.

### 5. Arc hover stroke highlight via D3 inline style

On `mouseover`, add `.style("stroke", "#fff").style("stroke-width", "2px")` to `arcPath`.
On `mouseleave`, remove with `.style("stroke", null).style("stroke-width", null)`.

Since arcs are full circles (`startAngle=0, endAngle=tau`) the stroke appears as an outer ring highlight. No layout change since SVG stroke is painted on top.

On `click`, additionally add `.style("stroke", <colorHex>).style("stroke-width", "3px")` to mark the locked arc (and remove from previously locked arc). This requires tracking the last-clicked `arcPath` reference.

### 6. Arc click stops propagation; SVG background click clears lock

Arc `click` handler calls `event.stopPropagation()` to prevent the SVG canvas `click` handler (which adds a new arc at the clicked position) from firing. The SVG background `click` handler (already exists) is augmented to also call `clickedArc.set(null)`.

### 7. Intro text content

```
Navedytj kursor na koljorove kilce kvitky, ščob pobačyty joho znacennja.
Natysnitj na kilce, ščob zakripyty informaciju.
```

Shown when `activeInfo` is null. Styled in muted white, centered, comfortable padding.

## Risks / Trade-offs

- [Conflicting click handlers] SVG background click vs arc click: stopPropagation solves this but means the "add arc at click" feature is disabled when clicking a flower arc. → Acceptable tradeoff since flowers cover a small area.
- [Locked arc stroke lingers after preset switch] On `redrawBush`, all SVG elements are destroyed. The `clickedArc` signal keeps its value so the panel still shows the last info, but the visual stroke on the arc is gone. → Acceptable; the panel content stays which is the more important part.
