## ADDED Requirements

### Requirement: Active preset is persisted to localStorage per bush
The system SHALL write the active preset index (or `"custom"`) to `localStorage` whenever the user selects a preset or activates custom mode. Keys are scoped per bush:
- Main bush: `toneflower.bush.main.preset`
- Rozpakovka bush: `toneflower.bush.rozpakovka.preset`

#### Scenario: Main bush preset selection is persisted
- **WHEN** the user clicks preset button N beneath the main bush
- **THEN** `localStorage.getItem('toneflower.bush.main.preset')` SHALL return `"N"`

#### Scenario: Rozpakovka preset selection is persisted
- **WHEN** the user clicks preset button N beneath the Rozpakovka bush
- **THEN** `localStorage.getItem('toneflower.bush.rozpakovka.preset')` SHALL return `"N"`

#### Scenario: Entering custom mode is persisted per bush
- **WHEN** the user clicks "Moia kompozytsiia" beneath a bush
- **THEN** that bush's preset localStorage key SHALL return `"custom"`
- **AND** the other bush's preset localStorage key SHALL be unaffected

### Requirement: Custom flower positions are persisted to localStorage per bush
The system SHALL write the current custom positions array to `localStorage` as a JSON-encoded array of `[number, number]` pairs whenever any flower position changes in custom mode. Keys:
- Main bush: `toneflower.bush.main.custom` — array of 3 `[x, y]` pairs
- Rozpakovka bush: `toneflower.bush.rozpakovka.custom` — array of 4 `[x, y]` pairs

#### Scenario: Main bush custom positions written on drag end
- **WHEN** the user drops a flower at a new position in main bush custom mode
- **THEN** `localStorage.getItem('toneflower.bush.main.custom')` SHALL return a valid JSON string with all 3 flower positions, updated for the moved flower

#### Scenario: Rozpakovka custom positions written on drag end
- **WHEN** the user drops a flower at a new position in Rozpakovka custom mode
- **THEN** `localStorage.getItem('toneflower.bush.rozpakovka.custom')` SHALL return a valid JSON string with all 4 flower positions, updated for the moved flower

### Requirement: Arrangement is restored from localStorage on load for both bushes
On application startup, `BushArrangementService` SHALL read both bushes' preset keys from `localStorage` and apply the saved arrangements before the first render.

#### Scenario: Main bush preset restored on load
- **WHEN** the app loads and `toneflower.bush.main.preset` is `"2"`
- **THEN** the main bush SHALL render immediately with Preset 2 coordinates (Linija)

#### Scenario: Rozpakovka preset restored on load
- **WHEN** the app loads and `toneflower.bush.rozpakovka.preset` is `"3"`
- **THEN** the Rozpakovka bush SHALL render immediately with Rozpakovka Preset 3 coordinates (Linija)

#### Scenario: Custom arrangement restored on load
- **WHEN** the app loads and a bush's preset key is `"custom"` and its custom key contains valid positions
- **THEN** that bush SHALL render with the stored custom flower positions

#### Scenario: Missing localStorage entry defaults to preset 0
- **WHEN** the app loads and a bush's preset key is absent from localStorage
- **THEN** that bush SHALL render with Preset 0 (its current default layout)

#### Scenario: Corrupt or invalid localStorage value falls back to preset 0
- **WHEN** a bush's custom key contains malformed JSON or a wrong-length positions array
- **THEN** the system SHALL fall back to Preset 0 for that bush and overwrite the corrupt entry
