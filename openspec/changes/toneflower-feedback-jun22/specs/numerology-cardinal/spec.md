## ADDED Requirements

### Requirement: Cardinal letter lookup disambiguates dotted and dotless I
The cardinal letter lookup SHALL resolve the dotted I (`İ` U+0130 / `i` U+0069) and the dotless I (`I` U+0049 / `ı` U+0131) to their distinct cardinals, independent of input case. A typed character SHALL NOT be matched to a bucket that only contains the opposite-dot variant of I via case-insensitive folding.

For the Crimean Tatar alphabet this means:
- dotted `i` (U+0069) and dotted `İ` (U+0130) SHALL resolve to cardinal 3
- dotless `ı` (U+0131) and dotless `I` (U+0049) SHALL resolve to cardinal 2

The lookup SHALL continue to resolve all other letters case-insensitively (e.g. a lowercase Ukrainian or Latin letter SHALL match its uppercase table entry).

#### Scenario: Dotted lowercase i resolves to cardinal 3
- **WHEN** the lowercase dotted `i` (U+0069) is looked up in the Crimean Tatar cardinal table
- **THEN** the result SHALL be 3 (not 2)

#### Scenario: Dotless lowercase ı resolves to cardinal 2
- **WHEN** the lowercase dotless `ı` (U+0131) is looked up in the Crimean Tatar cardinal table
- **THEN** the result SHALL be 2

#### Scenario: Case-insensitive lookup preserved for single-case alphabets
- **WHEN** the lowercase Ukrainian Cyrillic letter "н" is looked up in the Ukrainian cardinal table (which stores only uppercase "Н")
- **THEN** the result SHALL be 9
