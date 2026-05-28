## MODIFIED Requirements

### Requirement: ArcInfoPanelComponent is always visible with a default intro state
The panel SHALL be visible at all times — it SHALL NOT be hidden when no arc is hovered or clicked. When no arc is active (`activeInfo` is null), the panel SHALL display a short invitation text in the active language explaining how to interact with the flowers.

#### Scenario: Panel visible on page load before any interaction
- **WHEN** the ToneFlower page is loaded
- **THEN** the arc info panel SHALL be visible to the left of the bushes
- **AND** it SHALL display the intro invitation text (no KOLIR / ČYSLO / POJEDNANNJA sections)

#### Scenario: Intro text matches the active language
- **WHEN** the panel is in intro state and language is `lat`
- **THEN** it SHALL display the Latynka invitation text: "Naveditj kursor na koljorove kiljce kvitky, ščob pobačyty jogo značennja. Natysnitj na kiljce, ščob zakripyty informaciju."
- **WHEN** the panel is in intro state and language is `uk`
- **THEN** it SHALL display the Ukrainian Cyrillic invitation text: "Наведіть курсор на кольорове кільце квітки, щоб побачити його значення. Натисніть на кільце, щоб закріпити інформацію."
- **AND** the text SHALL be readable against the panel background

#### Scenario: Intro text is replaced when an arc is hovered or clicked
- **WHEN** the user hovers over or clicks an arc
- **THEN** the intro text SHALL no longer be shown
- **AND** the KOLIR, ČYSLO, and POJEDNANNJA sections SHALL appear instead
