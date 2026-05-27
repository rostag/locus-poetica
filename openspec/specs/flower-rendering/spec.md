## ADDED Requirements

### Requirement: Flower structure — ordered concentric rings from a leaf list
A flower SHALL be a set of concentric circular rings (leaves) rendered outward from a center point. Each `LeafModel` in the flower's `leaves` array corresponds to one ring, ordered by `leafOrder` (0 = innermost).

Ring geometry:
- `innerRadius = baseRadius + leafWidth × leafOrder` (for leafOrder > 0)
- `outerRadius = innerRadius + leafWidth`
- For the center ring (leafOrder = 0): `innerRadius = 0` (solid disc)

Default constants: `baseRadius = 12`, `leafWidth = 10`.

#### Scenario: Single-leaf flower
- **WHEN** a flower has one leaf at leafOrder 0
- **THEN** it SHALL render as a solid disc of radius `baseRadius + leafWidth`

#### Scenario: Multi-leaf flower ring radii
- **WHEN** a flower has 3 leaves (leafOrder 0, 1, 2)
- **THEN** the outermost ring SHALL have `outerRadius = baseRadius + leafWidth × 2 + leafWidth = 12 + 10×2 + 10 = 42`

---

### Requirement: Ring color from IDN
Each ring SHALL be filled with the hex color of its `LeafModel.leafIdn.colorHex`.

#### Scenario: Ring color assignment
- **WHEN** a leaf has `leafIdn = { colorHex: "#bd1e1e" }` (червоний, ordinal 2)
- **THEN** the rendered ring SHALL use fill color `#bd1e1e`

---

### Requirement: Ring segmentation from cardinal (showChyslo mode)
When the "число" (chyslo) display mode is active, each ring SHALL be subdivided into `leafNum` equal sectors using a D3 pie layout. The segment count equals the leaf's cardinal number.

- `leafNum` sectors each span `360 / leafNum` degrees
- A pad angle is applied between sectors (default `0.01`, configurable)
- White stroke `#ffffff` with `0.25px` width separates sectors

#### Scenario: Ring with 3 segments
- **WHEN** `leafNum = 3` and showChyslo is true
- **THEN** the ring SHALL be divided into 3 equal sectors of 120° each

#### Scenario: Ring without segmentation
- **WHEN** showChyslo is false
- **THEN** each ring SHALL render as a single unsegmented arc

---

### Requirement: Jadro — innermost ring is always the computed center
The leaf at `leafOrder = 0` SHALL always be the **jadro** (center), whose IDN is computed from the sum of all other part ordinals reduced mod 12. It is the first element in the `leaves` array.

**Flower leaf order (name flower):** `[jadro, imja, pobat, prizNeof, priz]`
**Flower leaf order (date flower):** `[jadro, day, month, year]`

#### Scenario: Jadro is innermost
- **WHEN** a name flower is rendered
- **THEN** the jadro leaf SHALL occupy `leafOrder = 0` and render as the center disc

---

### Requirement: Bush — multiple flowers at dynamic canvas positions
A bush SHALL contain 1–3 flowers (main bush) or 4 flowers (Rozpakovka bush) positioned at coordinates supplied by `BushArrangementService` rather than the previously hardcoded `PLANT_POINTS` / `ROZP_POINTS` constants. The service provides the active preset's `[x, y]` pairs for the respective bush, or the user's saved custom positions when custom mode is active.

`PLANT_CENTER` fallback (when only one flower is rendered because a name or date input is absent) remains unchanged for the main bush.

A `marginTop` signal offsets all Y coordinates uniformly (default 20px).

#### Scenario: Three-flower main bush with active preset
- **WHEN** both name and date inputs are provided and main bush Preset N is active
- **THEN** the main bush SHALL render three flowers at `BUSH_PRESETS[N].points[0..2]` each offset by `marginTop`

#### Scenario: Name-only main bush still centers at PLANT_CENTER
- **WHEN** only name is provided (no date) regardless of active preset
- **THEN** the main bush SHALL render one flower centered at `PLANT_CENTER` = [125, 150]

#### Scenario: Three-flower main bush in custom mode
- **WHEN** both name and date inputs are provided and main bush custom mode is active
- **THEN** the main bush SHALL render three flowers at the user's saved custom positions, each offset by `marginTop`

#### Scenario: Four-flower Rozpakovka bush with active preset
- **WHEN** both name and date inputs are provided and Rozpakovka Preset N is active
- **THEN** the Rozpakovka bush SHALL render four flowers at `ROZP_PRESETS[N].points[0..3]` each offset by `marginTop`

#### Scenario: Four-flower Rozpakovka bush in custom mode
- **WHEN** both name and date inputs are provided and Rozpakovka custom mode is active
- **THEN** the Rozpakovka bush SHALL render four flowers at the user's saved custom positions, each offset by `marginTop`

---

### Requirement: Animated expanding ring (play arc)
The canvas SHALL support click-spawned animated arcs that expand from zero radius outward, triggering a note collision when they intersect a static leaf ring.

- Arcs expand over `duration = 9000ms` using `d3.easeLinear`
- On collision: arc deflates (contracts back to zero), triggers `noteOn` with the colliding leaf's IDN
- On deflation complete: arc re-expands and `noteOff` is called

#### Scenario: Click spawns expanding arc
- **WHEN** user clicks on the SVG canvas
- **THEN** a new expanding arc SHALL appear at the clicked coordinates
