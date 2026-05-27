## ADDED Requirements

### Requirement: Arc hover triggers an info panel to the left of the bushes
The system SHALL display a persistent info panel to the left of the bush flex row. When the user hovers over any colored arc (ring segment) of any flower, the panel SHALL update to show three sections: KOLJOR (color name + description), ČYSLO (number + meaning), and POJEDNANNJA KOLJORU TA ČYSLA (combined energy text). When no arc is hovered, the panel SHALL be hidden (zero width / display:none).

#### Scenario: Panel appears on arc mouseover
- **WHEN** the user moves the pointer over a colored arc ring of any flower
- **THEN** the arc info panel SHALL become visible to the left of the bushes
- **AND** the panel SHALL display the KOLJOR section with the arc's color ordinal name and full Ukrainian-latynka description
- **AND** the panel SHALL display the ČYSLO section with the arc's leaf number (1–9) and its meaning
- **AND** the panel SHALL display the POJEDNANNJA KOLJORU TA ČYSLA section with the combined energy text for that color+number pair

#### Scenario: Panel disappears on mouseleave
- **WHEN** the user moves the pointer off a flower arc
- **THEN** the arc info panel SHALL become hidden
- **AND** the bush layout SHALL NOT shift or reflow when the panel hides

#### Scenario: Panel updates when hovering a different arc
- **WHEN** the user moves from one arc to another arc (same or different flower)
- **THEN** the panel SHALL update its KOLJOR, ČYSLO, and POJEDNANNJA content immediately to reflect the newly hovered arc

#### Scenario: Panel is positioned left of both bushes
- **WHEN** the arc info panel is visible
- **THEN** it SHALL render as a flex sibling to the left of the main bush column, not overlapping any SVG canvas

### Requirement: Arc info panel contains all 12 color descriptions
The panel lookup table SHALL include descriptions for all 12 colors in the numerological system (ordinals 1–12), stored as static constants in `toneflower.constants.ts`.

#### Scenario: Every IDN color ordinal has a description
- **WHEN** the user hovers an arc whose color ordinal is any value from 1 to 12
- **THEN** the KOLJOR section SHALL display a non-empty name and description

### Requirement: Arc info panel contains all 9 number meanings
The panel lookup table SHALL include meanings for all 9 numerological leaf numbers (1–9), stored as static constants in `toneflower.constants.ts`.

#### Scenario: Every leaf number has a meaning
- **WHEN** the user hovers an arc whose leaf number is any value from 1 to 9
- **THEN** the ČYSLO section SHALL display a non-empty meaning text

### Requirement: Arc info panel contains all 36 color+number combination texts
The panel lookup table SHALL include a combined-energy text for each valid color+number pair that appears in the system. Pairs with a defined combination text SHALL display it; pairs without a defined entry MAY display only the KOLJOR and ČYSLO sections.

#### Scenario: Known combination has POJEDNANNJA text
- **WHEN** the user hovers an arc with a color+number pair that has a defined combination entry
- **THEN** the POJEDNANNJA KOLJORU TA ČYSLA section SHALL display the combination text

#### Scenario: Panel is visually bright and readable
- **WHEN** the arc info panel is visible
- **THEN** it SHALL use a visually distinct, brightly colored design with clearly readable Ukrainian-latynka text for all three sections
- **AND** the KOLJOR, ČYSLO, and POJEDNANNJA headers SHALL be visually distinct from the body text
