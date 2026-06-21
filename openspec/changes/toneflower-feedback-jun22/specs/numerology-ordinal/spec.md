## ADDED Requirements

### Requirement: Ordinal letter lookup disambiguates dotted and dotless I
The ordinal letter lookup SHALL resolve the dotted I (`İ` U+0130 / `i` U+0069) and the dotless I (`I` U+0049 / `ı` U+0131) to their distinct ordinals, independent of input case. A typed character SHALL NOT be matched to a bucket that only contains the opposite-dot variant of I via case-insensitive folding.

For the Crimean Tatar alphabet this means:
- dotted `i` (U+0069) and dotted `İ` (U+0130) SHALL resolve to ordinal 12 (bilyj / white)
- dotless `ı` (U+0131) and dotless `I` (U+0049) SHALL resolve to ordinal 11 (sribnyj / silver)

The lookup SHALL continue to resolve all other letters case-insensitively (e.g. a lowercase Ukrainian or Latin letter SHALL match its uppercase table entry).

#### Scenario: Dotted lowercase i resolves to ordinal 12 (white)
- **WHEN** the lowercase dotted `i` (U+0069) is looked up in the Crimean Tatar ordinal table
- **THEN** the result SHALL be 12 (not 11)

#### Scenario: Dotless lowercase ı resolves to ordinal 11 (silver)
- **WHEN** the lowercase dotless `ı` (U+0131) is looked up in the Crimean Tatar ordinal table
- **THEN** the result SHALL be 11

#### Scenario: Case-insensitive lookup preserved for single-case alphabets
- **WHEN** the lowercase Ukrainian Cyrillic letter "к" is looked up in the Ukrainian ordinal table (which stores only uppercase "К")
- **THEN** the result SHALL be 3
