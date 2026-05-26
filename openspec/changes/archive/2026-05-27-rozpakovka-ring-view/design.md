## Context

The reference painting encodes 4 Rozpakovka rows as concentric circle diagrams. Each diagram:
- Row 1: 2 input rings (outer=sribnyj/11, inner=pomarančevyj/3) → center=červonyj/2
- Row 2: 2 input rings (outer=červonyj/2, inner=blakytnyj/6) → center=fioletovyj/8
- Row 3: 2 input rings (outer=sribnyj/11, inner=blakytnyj/6) → center=zelenyj/5
- Row 4: 3 input rings (outer=perlynovyj/10, middle=zolotyj/9, inner=blakytnyj/6) → center=čornyj/1

The order of inputs → rings follows the natural reading order from the Rozpakovka formula (last input = innermost input ring, result = center). The IDN `colorHex` values from `IDNS` are used directly.

The existing ToneFlower bush uses D3 for complex animated rings. This component is simpler — pure inline SVG, no animation, no D3 dependency. Angular renders it directly in the template.

## Goals / Non-Goals

**Goals:**
- Render 4 SVG concentric-circle diagrams matching the reference painting's structure
- Accept `IdnRozpakovkaOut` as `@Input()`, render nothing when any row is null
- Use `colorHex` from each `IDN` directly — no new color lookups needed
- Row labels (e.g. "1.", "2.") match the painting's numbering

**Non-Goals:**
- Pixel-perfect match to the painting — "loose" visual testing only
- Animation or interactive behavior
- Standalone routing or lazy-loading — embedded directly in get-ordinal

## Decisions

### D1 — Inline SVG in template, no D3

Each ring diagram is rendered as a plain SVG `<circle>` stack. The outer radius decreases for each inner ring. Center circle = result color. This is straightforward without the D3 overhead used by the bush.

Ring radii (px, from outside in): 60, 45, 30 for 2-input rows; 60, 47, 34, 21 for Row 4 (3 inputs + center).

### D2 — Component layout: 2×2 grid

The reference painting places circles: 1 top-center, 2 left-mid, 3 right-mid, 4 bottom-center. A CSS grid with `grid-template-columns: 1fr 1fr` and manual placement via `grid-column: span 2` for rows 1 and 4 matches this layout.

### D3 — Single component, data passed via @Input

`RozpakovkaRingViewComponent` takes `rozpakovkaOut: IdnRozpakovkaOut | null` as input. It exposes computed `rings` from a getter, derived from the input. No service, no store.

### D4 — Ring order: outermost = first named input

For each row the inputs are listed left-to-right in the formula. The outermost ring in the diagram is the first-named input (the one furthest in the formula chain), the innermost ring is the last input, and the center is the result. This matches the reference painting where the outermost ring is sribnyj (jadroDate) and the center is the computed result.

## Risks / Trade-offs

- SVG circle sizes are hardcoded; any responsive resizing would require revisiting the fixed radii.
- Row 4 has 3 inputs so it needs one extra ring level — handled separately in the template or by making the ring count data-driven.
