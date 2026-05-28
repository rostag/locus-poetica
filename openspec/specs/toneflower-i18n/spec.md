### Requirement: ToneFlower supports runtime language switching
The ToneFlower feature SHALL support two display languages: Ukrainian Cyrillic (`uk`) and Latynka (`lat`). A `ToneflowerI18nService` SHALL manage the active language as an Angular signal and persist the selection to `localStorage` under key `toneflower-lang`.

#### Scenario: Default language on first visit
- **WHEN** the user opens the ToneFlower page for the first time (no localStorage entry)
- **THEN** the active language SHALL default to `lat` (Latynka)

#### Scenario: Language persists across page reloads
- **WHEN** the user switches language and reloads the page
- **THEN** the previously selected language SHALL be restored from localStorage

#### Scenario: Language toggle in UI
- **WHEN** the user views the ToneFlower page
- **THEN** a language toggle button SHALL be visible in the top controls area
- **AND** it SHALL display the current language and allow switching to the other
- **AND** toggling SHALL update all translatable text immediately without a page reload

### Requirement: Right panel (numerology calculator) is collapsible
The `app-get-ordinal` panel SHALL have a toggle button that hides or shows the panel. The open/closed state SHALL be persisted in `localStorage` under key `rightPanelOpen`.

#### Scenario: Panel collapsed on user's previous choice
- **WHEN** the user opens the ToneFlower page and had previously collapsed the right panel
- **THEN** the right panel SHALL be hidden initially

#### Scenario: Collapse toggle
- **WHEN** the user clicks the collapse/expand toggle
- **THEN** the panel visibility SHALL toggle
- **AND** the new state SHALL be saved to localStorage immediately
