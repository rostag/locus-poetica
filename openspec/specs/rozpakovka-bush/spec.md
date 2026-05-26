## ADDED Requirements

### Requirement: Rozpakovka bush is a separate BushModel
The system SHALL construct a Rozpakovka-specific `BushModel` with exactly 4 `FlowerModel` entries — one per Rozpakovka row — independent of the existing three-flower bush.

#### Scenario: Rozpakovka BushModel emitted with valid inputs
- **WHEN** `useName` is true AND `useDate` is true
- **THEN** `GetOrdinalComponent` emits a `BushModel` on `onRozpakovkaBushUpdate` with `flowers.length === 4`

#### Scenario: Empty BushModel emitted when inputs incomplete
- **WHEN** `useName` is false OR `useDate` is false
- **THEN** `GetOrdinalComponent` emits `{ flowers: [] }` on `onRozpakovkaBushUpdate`

### Requirement: Each Rozpakovka flower encodes one row
Each of the 4 flowers SHALL have leaves ordered as: `[resultLeaf, innermostInputLeaf, ..., outermostInputLeaf]` so that the D3 renderer draws the result as the center and inputs as concentric outer rings.

#### Scenario: Flower 1 leaf structure (jadroName + jadroDate → result)
- **WHEN** sample Ростислав/26.11.1978 is entered
- **THEN** Flower 1 has 3 leaves: leaf[0].leafIdn = červonyj (result=2), leaf[1].leafIdn = pomarančevyj (jadroName=3), leaf[2].leafIdn = sribnyj (jadroDate=11)

#### Scenario: Flower 2 leaf structure (imja + denj → result)
- **WHEN** sample Ростислав/26.11.1978 is entered
- **THEN** Flower 2 has 3 leaves: leaf[0].leafIdn = fioletovyj (result=8), leaf[1].leafIdn = blakytnyj (imja=6), leaf[2].leafIdn = červonyj (denj=2)

#### Scenario: Flower 3 leaf structure (pobat + misjacj → result)
- **WHEN** sample Ростислав/26.11.1978 is entered
- **THEN** Flower 3 has 3 leaves: leaf[0].leafIdn = zelenyj (result=5), leaf[1].leafIdn = blakytnyj (pobat=6), leaf[2].leafIdn = sribnyj (misjacj=11)

#### Scenario: Flower 4 leaf structure (prizNeof + priz + rik → result)
- **WHEN** sample Ростислав/26.11.1978 is entered
- **THEN** Flower 4 has 4 leaves: leaf[0].leafIdn = čornyj (result=1), leaf[1].leafIdn = blakytnyj (prizNeof=6), leaf[2].leafIdn = zolotyj (priz=9), leaf[3].leafIdn = perlynovyj (rik=10)

### Requirement: Rozpakovka flowers arranged in a diamond
The 4 flowers SHALL be positioned at `ROZP_POINTS` forming a diamond (rhombus) in the Rozpakovka SVG viewport. Flower 1 at top, 2 at right, 3 at bottom, 4 at left.

#### Scenario: ROZP_POINTS defines four distinct diamond positions
- **WHEN** the Rozpakovka bush is rendered
- **THEN** the SVG contains 4 flower groups at approximately `[125,55]`, `[210,160]`, `[125,265]`, `[40,160]`

### Requirement: Rozpakovka bush rendered in a separate SVG
The system SHALL render the Rozpakovka bush in a second D3 SVG (`#rozpakovka-bushwrap`) displayed to the right of the existing main bush SVG, within the same flex-row layout.

#### Scenario: Both bushes visible simultaneously
- **WHEN** both `useName` and `useDate` are true
- **THEN** the page shows two side-by-side SVG bush diagrams: the existing 3-flower bush on the left and the Rozpakovka 4-flower diamond bush on the right

### Requirement: Existing incorrect fourth flower removed from main bush
The `rozpakovkaFlower` previously appended to the main bush's `flowers` array SHALL be removed. The main bush SHALL contain only nameFlower, dateFlower, and pojedFlower (subject to `useName`/`useDate` flags).

#### Scenario: Main bush has at most 3 flowers
- **WHEN** both `useName` and `useDate` are true
- **THEN** the main bush `BushModel` emitted on `onBushUpdate` contains exactly 3 flowers (nameFlower, dateFlower, pojedFlower)

### Requirement: Shared display settings apply to both bushes
Toggling `showChyslo`, `padAngle`, and `padAngleBgStyle` SHALL redraw both bushes.

#### Scenario: Čyslo toggle affects Rozpakovka bush
- **WHEN** the user clicks "pokazuvaty chyslo"
- **THEN** both the main bush and the Rozpakovka bush re-render with pie segments visible

## MODIFIED Requirements

### Requirement: rozpakovka-flower — incorrect flower removed from main bush
The `rozpakovka-flower` change introduced a `rozpakovkaFlower` appended to the main bush. This requirement supersedes that: `rozpakovkaFlower` is removed from the main bush's `flowers` array. `rozpakovkaOut`, `rozpakovkaRingIn`, and `RozpakovkaRingViewComponent` are preserved unchanged.

#### Scenario: Main bush emits without rozpakovkaFlower
- **WHEN** `setData()` is called with valid inputs
- **THEN** the `BushModel` emitted on `onBushUpdate` does NOT include a flower at `PLANT_CENTER`
