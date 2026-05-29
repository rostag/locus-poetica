## ADDED Requirements

### Requirement: Crimean Tatar alphabet registered as a selectable Abetka
The system SHALL include a fifth `Abetka` named `"Krymsjkotatarsjka"` in the `ABETKY` array, with complete ordinal (1–12) and cardinal (1–9) tables covering all 32 letters of the Crimean Tatar Latin alphabet.

The `AbetkaName` union type SHALL include `"Krymsjkotatarsjka"` as a valid value.

The two distinct Unicode I letters SHALL be stored with explicit case pairs to avoid case-insensitive regex ambiguity:
- Dotless I: uppercase `I` (U+0049) and lowercase `ı` (U+0131) stored together
- Dotted İ: uppercase `İ` (U+0130) and lowercase `i` (U+0069) stored together

#### Scenario: Abetka appears in selector
- **WHEN** the user opens the abetka selector in the ToneFlower numerology calculator
- **THEN** `"Krymsjkotatarsjka"` SHALL appear as a selectable option alongside the four existing abetky

#### Scenario: Ordinal lookup for a Crimean Tatar letter
- **WHEN** the letter `"Q"` is looked up in the Crimean Tatar ordinal table
- **THEN** the result SHALL be 10

#### Scenario: Cardinal lookup for a Crimean Tatar letter
- **WHEN** the letter `"Q"` is looked up in the Crimean Tatar cardinal table
- **THEN** the result SHALL be 4

#### Scenario: Dotless ı (U+0131) resolves correctly
- **WHEN** the lowercase dotless `ı` is looked up in the Crimean Tatar ordinal table
- **THEN** the result SHALL be 11 (same as uppercase `I`)

#### Scenario: Dotted İ (U+0130) resolves correctly
- **WHEN** the uppercase dotted `İ` is looked up in the Crimean Tatar cardinal table
- **THEN** the result SHALL be 3 (same as lowercase `i`)

#### Scenario: Every Crimean Tatar letter resolves to a non-zero ordinal
- **WHEN** any of the 32 Crimean Tatar alphabet letters (A Â B C Ç D E F G Ğ H I İ J K L M N Ñ O Ö P Q R S Ş T U Ü V Y Z) is looked up
- **THEN** the ordinal result SHALL be in the range 1–12 (never 0)

#### Scenario: Every Crimean Tatar letter resolves to a non-zero cardinal
- **WHEN** any of the 32 Crimean Tatar alphabet letters is looked up
- **THEN** the cardinal result SHALL be in the range 1–9 (never 0)
