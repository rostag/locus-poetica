## MODIFIED Requirements

### Requirement: Letter-to-ordinal tables (1–12) for four alphabets
The system SHALL maintain a letter→ordinal mapping for each supported alphabet. Each letter maps to an integer in the range 1–12, corresponding to a chromatic musical note and a color. Letters within the same group share the same ordinal.

**Ukrainian Cyrillic (Ukrajinsjka):**
| Ordinal | Letters | Note | Color |
|---------|---------|------|-------|
| 1 | А, Ї, Ф | C | чорний (#151210) |
| 2 | Б, Й, Х | C# | червоний (#bd1e1e) |
| 3 | В, К, Ц | D | помаранчевий (#d9792b) |
| 4 | Г, Л, Ч | D# | жовтий (#e0a536) |
| 5 | Ґ, М, Ш | E | зелений (#32963a) |
| 6 | Д, Н, Щ | F | блакитний (#56acc7) |
| 7 | Е, О, Ь | F# | синій (#266696) |
| 8 | Є, П, Ю | G | фіолетовий (#9091B6) |
| 9 | Ж, Р, Я | G# | золотий (#BE9C5C) |
| 10 | З, С | A | перлиновий (#f2f2dc) |
| 11 | И, Т | A# | срібний (#DBDFE5) |
| 12 | І, У | B | білий (#f5f5f5) |

**Ukrainian Latin (Latynka):**
| Ordinal | Letters |
|---------|---------|
| 1 | A, K, Y |
| 2 | B, L, Z |
| 3 | C, M, Ž |
| 4 | Č, N |
| 5 | D, O |
| 6 | E, P |
| 7 | F, R |
| 8 | G, S |
| 9 | Ĝ, Š |
| 10 | H, T |
| 11 | I, U |
| 12 | J, V |

**Russian (Moskaljsjka):**
| Ordinal | Letters |
|---------|---------|
| 1 | А, Л, Ч |
| 2 | Б, М, Ш |
| 3 | В, Н, Щ |
| 4 | Г, О, Ъ |
| 5 | Д, П, Ы |
| 6 | Е, Р, Ь |
| 7 | Ё/ё, С, Э |
| 8 | Ж, Т, Ю |
| 9 | З, У, Я |
| 10 | И, Ф |
| 11 | Й, Х |
| 12 | К, Ц |

**English:**
| Ordinal | Letters |
|---------|---------|
| 1 | A, M, Y |
| 2 | B, N, Z |
| 3 | C, O |
| 4 | D, P |
| 5 | E, Q |
| 6 | F, R |
| 7 | G, S |
| 8 | H, T |
| 9 | I, U |
| 10 | J, V |
| 11 | K, W |
| 12 | L, X |

**Crimean Tatar (Krymsjkotatarsjka):**
| Ordinal | Letters |
|---------|---------|
| 1 | A, Â, J, Ş |
| 2 | B, K, T |
| 3 | C, L, U |
| 4 | Ç, M, Ü |
| 5 | D, N, V |
| 6 | E, Ñ, Y |
| 7 | F, O, Z |
| 8 | G, Ö |
| 9 | Ğ, P |
| 10 | H, Q |
| 11 | I, ı, R |
| 12 | İ, i, S |

*Note: Ordinal 11 stores both `I` (U+0049) and `ı` (U+0131, dotless i) explicitly. Ordinal 12 stores both `İ` (U+0130, dotted I) and `i` (U+0069) explicitly. This is required because JavaScript's `/i` regex flag does not case-fold these two pairs interchangeably.*

#### Scenario: Ukrainian letter lookup
- **WHEN** the letter "В" is looked up in the Ukrainian Cyrillic ordinal table
- **THEN** the result SHALL be 3 (помаранчевий / D)

#### Scenario: Case-insensitive matching
- **WHEN** a lowercase letter is supplied for lookup
- **THEN** the system SHALL match it case-insensitively, returning the same ordinal as the uppercase form

#### Scenario: Unknown letter
- **WHEN** a character is not found in the ordinal table
- **THEN** the ordinal SHALL default to 0 (contributing nothing to the sum)

#### Scenario: Crimean Tatar letter lookup
- **WHEN** the letter "Q" is looked up in the Crimean Tatar ordinal table
- **THEN** the result SHALL be 10
