## MODIFIED Requirements

### Requirement: ArcInfoPanelComponent is always visible with a default intro state
The panel SHALL be visible at all times — it SHALL NOT be hidden when no arc is hovered or clicked. When no arc is active (`activeInfo` is null), the panel SHALL display a short Ukrainian-latynka invitation text explaining how to interact with the flowers.

#### Scenario: Panel visible on page load before any interaction
- **WHEN** the ToneFlower page is loaded
- **THEN** the arc info panel SHALL be visible to the left of the bushes
- **AND** it SHALL display the intro invitation text (no KOLJOR / ČYSLO / POJEDNANNJA sections)

#### Scenario: Intro text is in Ukrainian latynka
- **WHEN** the panel is in intro state
- **THEN** it SHALL display text inviting the user to hover over a colored arc to see its meaning and click to lock the info
- **AND** the text SHALL be readable against the panel background
- **AND** all words SHALL match the Latynizator character mappings (г→g, ь→j, і→i): `Naveditj kursor na koljorove kiljce kvitky, ščob pobačyty jogo znacennja. Natysnitj na kiljce, ščob zakripyty informaciju.`

#### Scenario: Intro text is replaced when an arc is hovered or clicked
- **WHEN** the user hovers over or clicks an arc
- **THEN** the intro text SHALL no longer be shown
- **AND** the KOLJOR, ČYSLO, and POJEDNANNJA sections SHALL appear instead
