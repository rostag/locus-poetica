## ADDED Requirements

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

#### Scenario: Ukrainian letter lookup
- **WHEN** the letter "В" is looked up in the Ukrainian Cyrillic ordinal table
- **THEN** the result SHALL be 3 (помаранчевий / D)

#### Scenario: Case-insensitive matching
- **WHEN** a lowercase letter is supplied for lookup
- **THEN** the system SHALL match it case-insensitively, returning the same ordinal as the uppercase form

#### Scenario: Unknown letter
- **WHEN** a character is not found in the ordinal table
- **THEN** the ordinal SHALL default to 0 (contributing nothing to the sum)

---

### Requirement: ordinalByWord reduction
The system SHALL compute the ordinal of a word by summing the ordinals of all its characters and reducing modulo 12, with the result always in the range 1–12.

**Algorithm:** `result = sum(ordinals) % 12 || 12`
- If `sum % 12 === 0`, result is 12 (never 0).

#### Scenario: Simple word reduction
- **WHEN** `ordinalByWord` is called with Ukrainian word "РОСТ" (Р=9, О=7, С=10, Т=11)
- **THEN** sum = 37, 37 % 12 = 1, result SHALL be 1 (чорний / C)

#### Scenario: Sum divisible by 12
- **WHEN** the sum of letter ordinals is exactly 12
- **THEN** result SHALL be 12 (білий / B), not 0

#### Scenario: Sum exceeds 12
- **WHEN** the sum of letter ordinals exceeds 12
- **THEN** result SHALL be `sum % 12` (unless that equals 0, in which case 12)

---

### Requirement: IDN — color+note identity record
The system SHALL maintain a 12-entry IDN table mapping each ordinal (1–12) to: color name (Ukrainian), hex color code, and musical note name (chromatic, C through B).

#### Scenario: IDN lookup by ordinal
- **WHEN** `getIdnByNumber(6)` is called
- **THEN** result SHALL be `{ ordinal: 6, color: "blakytnyj", colorHex: "#56acc7", note: "F" }`

#### Scenario: IDN ordinal range
- **WHEN** any valid ordinal (1–12) is looked up
- **THEN** a non-null IDN record SHALL be returned

---

### Requirement: ordinalByDate reduction
The system SHALL compute the ordinal of a date by reducing day, month, and year each independently modulo 12 (min 1), then summing them and reducing modulo 12 (min 1).

**Algorithm per component:** `component % 12 || 12`
**Jadro:** `(day + month + year) % 12 || 12`

**Example from code comments:** Date 24.08.1991:
- day: 24 % 12 = 0 → 12 (білий/B)
- month: 8 % 12 = 8 (фіолетовий/G)
- year: 1991 % 12 = 11 (срібний/A#)
- jadro: (12 + 8 + 11) % 12 = 31 % 12 = 7 (синій/F#)

#### Scenario: Date ordinal for day
- **WHEN** day = "24"
- **THEN** day ordinal SHALL be 12 (24 % 12 = 0 → 12)

#### Scenario: Date ordinal jadro
- **WHEN** date is "24.08.1991"
- **THEN** jadro ordinal SHALL be 7 (синій / F#)

---

### Requirement: ordinalByNumber reduction
The system SHALL reduce a plain integer string modulo 12, with minimum result 1.

**Algorithm:** `parseInt(numString) % 12 || 12`

#### Scenario: Number reduction
- **WHEN** `ordinalByNumber("37")` is called
- **THEN** result SHALL be 1 (37 % 12 = 1)

#### Scenario: Multiple that is 12
- **WHEN** `ordinalByNumber("24")` is called
- **THEN** result SHALL be 12 (24 % 12 = 0 → 12)
