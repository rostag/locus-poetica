## ADDED Requirements

### Requirement: Five geometric presets define alternative flower positions for the main bush
The system SHALL provide exactly 5 named preset arrangements for the main bush, each specifying a distinct `[x, y]` coordinate for each of the 3 flower positions within the SVG viewport. Preset names SHALL be in Ukrainian latynka.

Preset table (main bush, viewport ~250×290):
- Preset 0 — **Trykutnyk** (Triangle): `[[162,231],[80,137],[165,60]]` (current default)
- Preset 1 — **Duga** (Arc): `[[60,200],[125,80],[190,200]]`
- Preset 2 — **Linija** (Line): `[[125,230],[125,145],[125,60]]`
- Preset 3 — **Romb** (Diamond): `[[125,240],[60,145],[125,50]]`
- Preset 4 — **Klaster** (Cluster): `[[125,175],[95,120],[155,120]]`

#### Scenario: Applying a main bush preset changes flower positions
- **WHEN** the user clicks preset button N (0–4) beneath the main bush
- **THEN** the main bush SHALL re-render with each flower's `flowerX/flowerY` set to `BUSH_PRESETS[N].points[flowerIndex]`

#### Scenario: Main bush Preset 0 matches existing default layout
- **WHEN** the app loads for the first time (no localStorage entry)
- **THEN** the main bush SHALL render with Preset 0 coordinates, identical to the previous hardcoded `PLANT_POINTS`

#### Scenario: Switching main bush presets preserves input data
- **WHEN** both name and date inputs are populated and the user selects a different preset
- **THEN** all three flowers SHALL immediately move to the new preset coordinates without clearing input data

### Requirement: Five geometric presets define alternative flower positions for the Rozpakovka bush
The system SHALL provide exactly 5 named preset arrangements for the Rozpakovka bush, each specifying a distinct `[x, y]` coordinate for each of the 4 flower positions within the Rozpakovka SVG viewport. Preset names SHALL be in Ukrainian latynka.

Preset table (Rozpakovka bush, viewport ~250×290):
- Preset 0 — **Romb** (Diamond/current default): `[[125,50],[75,140],[175,140],[125,240]]`
- Preset 1 — **Khryst** (Wide Cross): `[[125,40],[40,140],[210,140],[125,250]]`
- Preset 2 — **Kvadrat** (Square): `[[80,70],[170,70],[80,200],[170,200]]`
- Preset 3 — **Linija** (Line): `[[125,50],[125,110],[125,180],[125,240]]`
- Preset 4 — **Klaster** (Cluster): `[[100,110],[150,110],[100,170],[150,170]]`

#### Scenario: Applying a Rozpakovka preset changes flower positions
- **WHEN** the user clicks preset button N (0–4) beneath the Rozpakovka bush
- **THEN** the Rozpakovka bush SHALL re-render with each flower's `flowerX/flowerY` set to `ROZP_PRESETS[N].points[flowerIndex]`

#### Scenario: Rozpakovka Preset 0 matches existing default layout
- **WHEN** the app loads for the first time (no localStorage entry for Rozpakovka)
- **THEN** the Rozpakovka bush SHALL render with Preset 0 coordinates, identical to the previous hardcoded `ROZP_POINTS`

### Requirement: Preset controls display as SVG thumbnails with hover tooltips
Each preset control SHALL be rendered as a small button (~44×44px) containing an inline SVG thumbnail. The thumbnail SHALL depict scaled dot positions representing the flowers in that preset's layout. The Ukrainian latynka preset name SHALL appear as a tooltip on hover (via the HTML `title` attribute). No text label SHALL be visible by default.

#### Scenario: Thumbnail shows scaled flower dot positions
- **WHEN** a preset button is rendered
- **THEN** the inline SVG SHALL contain one filled circle per flower in the preset, positioned proportionally within the 44×44 thumbnail to reflect the actual layout geometry

#### Scenario: Hover reveals preset name
- **WHEN** the user hovers over a preset button
- **THEN** the browser-native tooltip SHALL display the preset's Ukrainian latynka name

#### Scenario: Active preset button has a distinct visual state
- **WHEN** a preset is the currently active arrangement
- **THEN** that preset button SHALL have a visually distinct active state (e.g., highlighted border or background)

#### Scenario: Preset controls appear beneath both bushes
- **WHEN** the ToneFlower page is displayed
- **THEN** 5 SVG thumbnail preset buttons AND the "Moia kompozytsiia" button SHALL appear beneath BOTH the main bush SVG and the Rozpakovka bush SVG independently
