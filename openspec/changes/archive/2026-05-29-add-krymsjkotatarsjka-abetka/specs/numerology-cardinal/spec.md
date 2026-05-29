## MODIFIED Requirements

### Requirement: Letter-to-cardinal tables (1–9) for four alphabets
The system SHALL maintain a letter→cardinal mapping for each supported alphabet. Each letter maps to a digit in the range 1–9 (pythagorean numerology). Letters within the same group share the same cardinal.

**Ukrainian Cyrillic (Ukrajinsjka):**
| Cardinal | Letters |
|----------|---------|
| 1 | А, З, О, Ч |
| 2 | Б, И, П, Ш |
| 3 | В, І, Р, Щ |
| 4 | Г, Ї, С, Ь |
| 5 | Ґ, Й, Т, Ю |
| 6 | Д, К, У, Я |
| 7 | Е, Л, Ф |
| 8 | Є, М, Х |
| 9 | Ж, Н, Ц |

**Ukrainian Latin (Latynka):**
| Cardinal | Letters |
|----------|---------|
| 1 | A, H, R |
| 2 | B, I, S |
| 3 | C, J, Š |
| 4 | Č, K, T |
| 5 | D, L, U |
| 6 | E, M, V |
| 7 | F, N, Y |
| 8 | G, O, Z |
| 9 | Ĝ, P, Ž |

**Russian (Moskaljsjka):**
| Cardinal | Letters |
|----------|---------|
| 1 | А, И, С, Ъ |
| 2 | Б, Й, Т, Ы |
| 3 | В, К, У, Ь |
| 4 | Г, Л, Ф, Э |
| 5 | Д, М, Х, Ю |
| 6 | Е, Н, Ц, Я |
| 7 | Ё/ё, О, Ч |
| 8 | Ж, П, Ш |
| 9 | З, Р, Щ |

**English:**
| Cardinal | Letters |
|----------|---------|
| 1 | A, J, S |
| 2 | B, K, T |
| 3 | C, L, U |
| 4 | D, M, V |
| 5 | E, N, W |
| 6 | F, O, X |
| 7 | G, P, Y |
| 8 | H, Q, Z |
| 9 | I, R |

**Crimean Tatar (Krymsjkotatarsjka):**
| Cardinal | Letters |
|----------|---------|
| 1 | A, Â, H, O, Ü |
| 2 | B, I, ı, Ö, V |
| 3 | C, İ, i, P, Y |
| 4 | Ç, J, Q, Z |
| 5 | D, K, R |
| 6 | E, L, S |
| 7 | F, M, Ş |
| 8 | G, N, T |
| 9 | Ğ, Ñ, U |

*Note: Cardinal 2 stores both `I` (U+0049) and `ı` (U+0131, dotless i) explicitly. Cardinal 3 stores both `İ` (U+0130, dotted I) and `i` (U+0069) explicitly.*

#### Scenario: Ukrainian cardinal letter lookup
- **WHEN** the letter "Н" is looked up in the Ukrainian Cyrillic cardinal table
- **THEN** the result SHALL be 9

#### Scenario: Unknown letter cardinal
- **WHEN** a character is not found in the cardinal table
- **THEN** the cardinal SHALL default to 0

#### Scenario: Crimean Tatar cardinal letter lookup
- **WHEN** the letter "Q" is looked up in the Crimean Tatar cardinal table
- **THEN** the result SHALL be 4
