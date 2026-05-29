## ADDED Requirements

### Requirement: Crimean Tatar abetka selector label in both UI languages
The `ToneflowerStrings` interface SHALL include a `selectKrymsjkotatarsjka` field under the `labels` object. Both `uk` and `lat` translation objects SHALL provide a value for this field.

- `lat` translation: `"Krymsjkotatarsjka"`
- `uk` translation: `"Кримськотатарська"`

#### Scenario: Selector label rendered in Latynka mode
- **WHEN** the UI language is `lat` and the user opens the abetka selector
- **THEN** the Crimean Tatar option SHALL display `"Krymsjkotatarsjka"`

#### Scenario: Selector label rendered in Ukrainian Cyrillic mode
- **WHEN** the UI language is `uk` and the user opens the abetka selector
- **THEN** the Crimean Tatar option SHALL display `"Кримськотатарська"`
