## Why

The arc info panel was implemented in the previous change but has three usability gaps: it is invisible until the user accidentally discovers hover works, it disappears the moment the mouse moves away making content impossible to read, and its visual design is disconnected from the flower's actual colors. These five improvements close those gaps and make the panel a first-class part of the ToneFlower experience.

## What Changes

- **Persistent intro state**: `ArcInfoPanelComponent` is always visible. When no arc is hovered or clicked it shows a short Ukrainian-latynka welcome text and a "move over an arc to see its meaning; click to lock" invitation.
- **Hover arc highlight**: On `mouseover`, the hovered arc path gets a contrasting stroke/border (e.g. 2px white outline) that disappears on `mouseleave`.
- **Click-to-lock**: On `click` of an arc, the panel locks to that arc's info. Subsequent hovers show preview info temporarily; after `mouseleave` the panel returns to the locked content. Clicking a different arc changes the lock. Clicking SVG background (not an arc) clears the lock and returns to intro.
- **KOLJOR section background = arc color**: The background color of the KOLJOR section is set to `colorHex` of the arc. Text color is calculated for reading contrast (white for dark colors, dark for light colors) using relative-luminance comparison.
- **ČYSLO and POJEDNANNJA section header/border accent = same arc color**: Border-left and header text color of the ČYSLO and POJEDNANNJA sections are set to the same `colorHex` instead of fixed cyan/violet, so the whole panel is color-coherent.

## Capabilities

### New Capabilities

- `arc-panel-intro`: Default visible state of ArcInfoPanelComponent showing invite text when no arc is active.
- `arc-panel-click-lock`: Click-to-lock interaction — clicked arc's info persists in the panel until another arc is clicked; hovering away from a locked arc returns to locked content, not intro.

### Modified Capabilities

- `arc-info-panel`: KOLJOR background and all accent colors derive from the arc's `colorHex`; `ArcHoverInfo` gains a `colorHex` field so the panel can apply it via Angular `[style]` binding.
- `custom-arrangement`: Arc `click` event must co-exist with the existing SVG click handler (which adds arcs in non-custom mode). Arc-level `click` must stop propagation to avoid triggering the SVG background click handler.

## Impact

- `toneflower.constants.ts` — `ArcHoverInfo` gains `colorHex: string` field.
- `toneflower.component.ts` — new `clickedArc = signal<ArcHoverInfo | null>(null)`; `addArc` gains `.on("click", ...)` on `arcPath`; SVG background click clears `clickedArc`; mouseover/leave updated to pass `colorHex`; arc stroke highlight added/removed on hover; `ToneFlowerComponent` template passes both signals to panel.
- `arc-info-panel.component.ts` — new `@Input() clickedInfo: ArcHoverInfo | null` alongside existing `info`; computed `activeInfo` merges them; `colorHex` used for dynamic inline styles.
- `arc-info-panel.component.html` — intro state rendered when `activeInfo` is null; color sections use `[style.background]` and `[style.color]` / `[style.borderLeftColor]`.
- `arc-info-panel.component.css` — fixed accent colors (cyan, violet, gold) replaced with CSS custom property `--arc-color` set by component; contrast text logic handled inline or via utility.
