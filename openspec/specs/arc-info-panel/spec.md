### Requirement: Arc hover triggers an info panel to the left of the bushes
The system SHALL display a persistent info panel to the left of the bush flex row at all times. When an arc is hovered or clicked, the panel SHALL display three sections: KOLJOR, ČYSLO, and POJEDNANNJA. The KOLJOR section background SHALL match the arc's color (`colorHex`). The ČYSLO and POJEDNANNJA section headers and border-left accents SHALL match the same arc color. Text in the KOLJOR section SHALL be rendered in a contrasting color (white for dark backgrounds, dark for light backgrounds) calculated from relative luminance. When no arc is active the panel SHALL show its intro state.

#### Scenario: Panel appears on arc mouseover
- **WHEN** the user moves the pointer over a colored arc ring of any flower
- **THEN** the arc info panel SHALL display that arc's KOLJOR, ČYSLO, and POJEDNANNJA info
- **AND** the KOLJOR section background SHALL be the arc's `colorHex`
- **AND** the KOLJOR section text SHALL be white or dark depending on the color's luminance to ensure readable contrast
- **AND** the ČYSLO section header text and border-left SHALL match the same `colorHex`
- **AND** the POJEDNANNJA section header text and border-left SHALL match the same `colorHex`

#### Scenario: Panel updates when hovering a different arc
- **WHEN** the user moves from one arc to another arc
- **THEN** the panel SHALL update all three sections and all accent colors to reflect the newly hovered arc

#### Scenario: Panel is positioned left of both bushes
- **WHEN** the arc info panel is visible
- **THEN** it SHALL render as a flex sibling to the left of the main bush column, not overlapping any SVG canvas

#### Scenario: Color section background covers full width of section
- **WHEN** the KOLJOR section is rendered
- **THEN** the background color SHALL fill the entire section area
- **AND** text SHALL be legible for all 12 IDN colors including light ones (perlynovyj, sribnyj, bilyj)

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
The panel lookup table SHALL include a combined-energy text for each valid color+number pair that appears in the system.

#### Scenario: Known combination has POJEDNANNJA text
- **WHEN** the user hovers an arc with a color+number pair that has a defined combination entry
- **THEN** the POJEDNANNJA KOLJORU TA ČYSLA section SHALL display the combination text

#### Scenario: Panel is visually bright and readable
- **WHEN** the arc info panel is visible
- **THEN** it SHALL use a visually distinct design with clearly readable Ukrainian-latynka text
- **AND** KOLJOR, ČYSLO, and POJEDNANNJA headers SHALL be visually distinct from body text
- **AND** all section accent colors SHALL derive from the arc's own color
