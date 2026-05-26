## ADDED Requirements

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

#### Scenario: Ukrainian cardinal letter lookup
- **WHEN** the letter "Н" is looked up in the Ukrainian Cyrillic cardinal table
- **THEN** the result SHALL be 9

#### Scenario: Unknown letter cardinal
- **WHEN** a character is not found in the cardinal table
- **THEN** the cardinal SHALL default to 0

---

### Requirement: cardinalByWord reduction (recursive digit-sum)
The system SHALL compute the cardinal of a word by summing the cardinals of all its characters, then recursively reducing via digit-sum until a single digit (1–9) remains.

**Algorithm:**
1. `sum = Σ cardinal(letter) for letter in word`
2. If `sum > 9`: split into digits, sum digits, repeat until `sum ≤ 9`
3. Result is always 1–9 (zero is possible only for an empty word)

#### Scenario: Simple word cardinal
- **WHEN** `cardinalByWord` is called with "АБ" (А=1, Б=2)
- **THEN** sum = 3, result SHALL be 3

#### Scenario: Multi-digit reduction
- **WHEN** sum of letter cardinals is 29
- **THEN** digit-sum = 2+9 = 11, digit-sum again = 1+1 = 2, result SHALL be 2

#### Scenario: Single digit, no reduction needed
- **WHEN** sum of letter cardinals is 7
- **THEN** result SHALL be 7 with no further reduction

---

### Requirement: cardinalByDate reduction
The system SHALL compute the cardinal of a date by reducing day, month, and year each via recursive digit-sum, summing the three results, reducing that sum via recursive digit-sum, and finally applying `% 12 || 12` (so the result is in `[1, 12]`).

**Algorithm:** `(reduceNumber(reduceNumber(day) + reduceNumber(month) + reduceNumber(year))) % 12 || 12`

**Example (24.08.1991):**
- day: reduceNumber(24) = 2+4 = 6
- month: reduceNumber(8) = 8
- year: reduceNumber(1991) = 1+9+9+1 = 20 → 2+0 = 2
- sum: 6+8+2 = 16
- reduceNumber(16) = 1+6 = 7
- 7 % 12 = 7 → result = **7**

#### Scenario: Date cardinal
- **WHEN** date is "24.08.1991"
- **THEN** day cardinal = 6, month cardinal = 8, year cardinal = 2, jadro cardinal = 7

---

### Requirement: cardinalByNumber reduction
The system SHALL reduce a plain integer string via recursive digit-sum until a single digit remains.

**Algorithm:** Split digits, sum, repeat if > 9.

#### Scenario: Multi-digit number
- **WHEN** `cardinalByNumber("1991")` is called
- **THEN** 1+9+9+1 = 20 → 2+0 = 2, result SHALL be 2

#### Scenario: Single digit
- **WHEN** `cardinalByNumber("7")` is called
- **THEN** result SHALL be 7
