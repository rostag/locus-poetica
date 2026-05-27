## MODIFIED Requirements

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
