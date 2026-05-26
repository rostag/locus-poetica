## ADDED Requirements

### Requirement: Combination (pojednannja) — cross-pairing name parts with date parts
The system SHALL compute a third "combination" flower that merges name-part ordinals with date-part ordinals via three paired reductions.

**Three intermediate combination ordinals:**
1. `imjaDen` = `ordinalByDate(imjaNomer + "." + denNomer)` — first name ordinal paired with birth day ordinal
2. `pobatMis` = `ordinalByDate(pobatNomer + "." + misjacNomer)` — patronymic ordinal paired with birth month ordinal
3. `prizNeofPrizRik` = `ordinalByDate(prizNeofNomer + "." + prizNomer + "." + rikNomer)` — unofficial surname + official surname ordinals paired with birth year ordinal

**Combination jadro:** `ordinalByDate(imjaDen + "." + pobatMis + "." + prizNeofPrizRik)`

Note: `ordinalByDate` is reused here as a multi-value reducer: each dot-separated segment is parsed as an integer, reduced `% 12 || 12`, then all segments are summed and reduced `% 12 || 12`.

#### Scenario: Combination flower computed from name and date
- **WHEN** name ordinals are imja=6, pobat=6, prizNeof=6, priz=9 and date ordinals are den=2, mis=11, rik=10
- **THEN** imjaDen = (6+2) % 12 = 8, pobatMis = (6+11) % 12 = 5, prizNeofPrizRik = (6+9+10) % 12 = 1
- **AND** jadro = (8+5+1) % 12 = 2 (червоний / C#)

#### Scenario: Combination requires both name and date
- **WHEN** only name OR only date is provided (not both)
- **THEN** the combination flower SHALL NOT be rendered

---

### Requirement: SlovoComponent — variable-length word as per-character leaves
The system SHALL support analyzing a word of any length up to 10,000 characters, producing one leaf per character plus a jadro center leaf.

**Per-character leaves:**
- For each character `c` at index `i` (0-based), produce a leaf with:
  - `leafIdn = getIdnByNumber(ordinalByWord(abetka, c))`
  - `leafNum = cardinalByWord(abetka, c)`
  - `leafOrder = i + 1` (leafOrder 0 is reserved for jadro)

**Jadro (innermost leaf):**
- `jadroOrdinal = ordinalByNumber(sum of all character ordinals as string)` → reduces sum % 12 || 12
- `jadroCardinal = cardinalByNumber(concatenation of all character cardinals as string)` → recursive digit-sum
- `leafOrder = 0` (innermost)

**Word length cap:**
- Words longer than 10,000 characters SHALL be truncated to the first 10,000 characters.

The resulting flower has structure: `[jadro, char0, char1, ..., charN-1]` for an N-character word.

#### Scenario: 4-character word produces 5-leaf flower
- **WHEN** word "РОСТ" (4 chars) is analyzed
- **THEN** a flower with 5 leaves SHALL be produced: jadro (center) + Р-leaf + О-leaf + С-leaf + Т-leaf

#### Scenario: 7-character word produces 8-leaf flower
- **WHEN** word "ДРУЖИНА" (7 chars) is analyzed
- **THEN** a flower with 8 leaves SHALL be produced: jadro + 7 character leaves

#### Scenario: Single-character word produces 2-leaf flower
- **WHEN** a 1-character word is analyzed
- **THEN** a flower with 2 leaves SHALL be produced: jadro + 1 character leaf

#### Scenario: Jadro for word flower
- **WHEN** word ordinals for N characters are `o1, o2, ..., oN`
- **THEN** jadro ordinal SHALL be `(o1 + o2 + ... + oN) % 12 || 12`

#### Scenario: Word longer than 10,000 characters
- **WHEN** a word with more than 10,000 characters is provided
- **THEN** only the first 10,000 characters SHALL be used to produce leaves

---

### Requirement: Combination cardinal numbers (chyslo)
Each combination leaf's `leafNum` (cardinal / segment count) SHALL be computed by digit-sum reduction of the concatenated cardinal values of its paired inputs.

**Cardinal pairing rules:**
- `imjaDenCyslo = cardinalByNumber(imjaCyslo + "" + denCyslo)`
- `pobatMisCyslo = cardinalByNumber(pobatCyslo + "" + misjacCyslo)`
- `prizNeofPrizRikCyslo = cardinalByNumber(prizNeofCyslo + "" + prizCyslo + "" + rikCyslo)`
- `jadroCyslo = cardinalByNumber(imjaDenCyslo + "" + pobatMisCyslo + "" + prizNeofPrizRikCyslo)`

**Example from code comments:**
- imja cardinal = 3, den cardinal = 8 → imjaDen cardinal = cardinalByNumber("38") = 3+8 = 11 → 1+1 = 2
- pobat cardinal = 6, mis cardinal = 2 → pobatMis cardinal = cardinalByNumber("62") = 6+2 = 8
- prizNeof cardinal = 3, priz cardinal = 9, rik cardinal = 7 → cardinalByNumber("397") = 3+9+7 = 19 → 1+9 = 10 → 1+0 = 1
- jadro cardinal = cardinalByNumber("281") = 2+8+1 = 11 → 1+1 = 2

#### Scenario: Combination cardinal from concatenated strings
- **WHEN** imja cardinal = 3 and den cardinal = 8
- **THEN** imjaDen cardinal SHALL be cardinalByNumber("38") = 2
