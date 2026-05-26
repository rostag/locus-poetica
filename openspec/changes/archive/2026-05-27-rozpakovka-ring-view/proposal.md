## Why

The Rozpakovka flower computation produces 4 rows of color/note results, but verifying correctness visually is currently only possible by reading hex color chips in the sidebar. The reference painting (4 concentric circle diagrams) shows the expected relationship: each row's inputs appear as outer rings and the computed result as the center. A dedicated ring-view component makes this visual contract testable and observable in the app.

## What Changes

- Add a new standalone Angular component `RozpakovkaRingViewComponent` that renders 4 concentric SVG circle diagrams, one per Rozpakovka row, matching the reference painting layout
- Each diagram shows input IDN colors as outer rings (outermost = last input) and the result IDN color as the filled center
- The component accepts `IdnRozpakovkaOut` as input and renders only when all 4 rows are non-null
- Embed the component in `get-ordinal.component.html` below the Rozpakovka label section
- The reference image (4 hand-painted circles from the numerological specification) serves as a loose visual acceptance test: running the app with sample inputs (Ростислав / 26.11.1978) should produce ring diagrams visually matching the painting

## Capabilities

### New Capabilities

- `rozpakovka-ring-view`: A visual ring-view component rendering Rozpakovka rows as concentric color circles matching the painted reference

### Modified Capabilities

## Impact

- New file: `src/app/soundflow/tonecircus/get-ordinal/rozpakovka-ring-view/rozpakovka-ring-view.component.ts`
- New file: `src/app/soundflow/tonecircus/get-ordinal/rozpakovka-ring-view/rozpakovka-ring-view.component.html`
- Modified: `get-ordinal.component.html` — embed the new component
- Modified: `get-ordinal.component.ts` — import the new component
