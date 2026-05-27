## Why

Flowers in each bush are currently locked to fixed SVG coordinates (`PLANT_POINTS`), giving users no agency over how their composition looks. Enabling geometric rearrangement and personal customisation transforms ToneFlower from a display tool into an expressive, personalised instrument.

## What Changes

- Each bush gains a row of **5 preset layout buttons** rendered beneath its SVG, each offering a distinct, harmonious geometric arrangement of its flowers.
- A sixth button — **"Moia kompozytsiia"** (Ukrainian latynka) — enters a custom drag-and-drop mode where the user freely repositions each flower by dragging its center.
- The active arrangement (preset index or custom positions) is **persisted to `localStorage`** per bush, so compositions survive page reload.
- Custom arrangements store each flower's `{x, y}` coordinates keyed by bush identifier.

## Capabilities

### New Capabilities

- `arrangement-presets`: Five built-in geometric layouts per bush (e.g., line, arc, triangle, diamond, cluster). Each is a named mapping of flower index → `{x, y}` within the bush SVG viewport. Rendered as clickable icon/label buttons beneath the bush.
- `custom-arrangement`: "Moia kompozytsiia" mode — sixth button that enables drag-and-drop repositioning of individual flowers by their center point. Dragging snaps to within SVG bounds. Exiting the mode preserves the last positions.
- `arrangement-persistence`: `localStorage` adapter that reads/writes the active arrangement choice (preset index `0–4`, or `"custom"` + positions map) per bush ID on every change and on app load.

### Modified Capabilities

- `flower-rendering`: Bush `PLANT_POINTS` must become dynamic — driven by the active arrangement rather than hardcoded constants. The renderer must accept an externally supplied positions array instead of referencing `PLANT_POINTS` directly.

## Impact

- `GetOrdinalComponent` (main bush renderer) and the Rozpakovka bush renderer — both need to consume dynamic positions.
- `BushModel` or the rendering call-site needs a positions array passed in alongside flower data.
- New UI component(s) for the preset buttons and drag UI, likely Angular components in the same feature module.
- No new external dependencies required; D3's drag behaviour (`d3.drag`) is already available.
- `localStorage` keys scoped per bush to avoid collisions (e.g., `toneflower.bush.main.arrangement`, `toneflower.bush.rozpakovka.arrangement`).
