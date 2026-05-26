## ADDED Requirements

### Requirement: Rozpakovka flower computation
The system SHALL compute a fourth flower ("Rozpakovka") that cross-combines jadro values and individual name/date components into 4 petals using the same ordinal (1–12) and cardinal (1–9) reduction functions used by the Поєднання flower.

The 4 petals are computed as follows — each row uses `ordinalByDate` for color/note and `cardinalByNumber` for čyslo:

| # | Inputs (ordinal)                          | Inputs (cardinal)                 |
|---|-------------------------------------------|-----------------------------------|
| 1 | `jadroImeniNomer` + `denNomer`            | `jadroCyslo` + `denCyslo`        |
| 2 | `imjaNomer` + `denNomer`                  | `imjaCyslo` + `denCyslo`         |
| 3 | `pobatNomer` + `misjacNomer`              | `pobatCyslo` + `misjacCyslo`     |
| 4 | `prizNeofNomer` + `prizNomer` + `rikNomer`| `prizNeofCyslo` + `prizCyslo` + `rikCyslo` |

Where:
- `jadroImeniNomer` = `ordinalByNumber(imjaNomer + pobatNomer + prizNeofNomer + prizNomer)` — the name jadro ordinal already computed for the Імʼя flower
- `jadroCyslo` = `cardinalByNumber(imjaCyslo + pobatCyslo + prizNeofCyslo + prizCyslo)` — the name jadro cardinal already computed for the Імʼя flower
- All other intermediate values are shared with the Імʼя and Дата flowers

#### Scenario: Row 1 example — jadro imeni + jadro dnja
- **WHEN** jadroImeniNomer = 3 (pomarančevyj) and denNomer = 11 (sribnyj)
- **THEN** petal 1 ordinal = ordinalByDate("3.11") = 2 (červonyj), cardinal = cardinalByNumber("" + jadroCyslo + denCyslo)

#### Scenario: Row 2 example — imja + denj
- **WHEN** imjaNomer = 6 (blakytnyj) and denNomer = 2 (červonyj)
- **THEN** petal 2 ordinal = ordinalByDate("6.2") = 8 (fioletovyj), cardinal = cardinalByNumber("" + imjaCyslo + denCyslo)

#### Scenario: Row 3 example — pobatjkovi + misjacj
- **WHEN** pobatNomer = 6 (blakytnyj) and misjacNomer = 11 (sribnyj)
- **THEN** petal 3 ordinal = ordinalByDate("6.11") = 5 (zelenyj), cardinal = cardinalByNumber("" + pobatCyslo + misjacCyslo)

#### Scenario: Row 4 example — prizvysceNeoficijne + prizvysce + rik
- **WHEN** prizNeofNomer = 6 (blakytnyj), prizNomer = 9 (zolotyj), rikNomer = 10 (perlynovyj)
- **THEN** petal 4 ordinal = ordinalByDate("6.9.10") = 1 (čornyj), cardinal = cardinalByNumber("" + prizNeofCyslo + prizCyslo + rikCyslo)

### Requirement: Rozpakovka flower rendered in the bush
The system SHALL include the Rozpakovka flower in the `BushModel` emitted by `GetOrdinalComponent` when both `useName` and `useDate` are true, positioned at `PLANT_CENTER`.

#### Scenario: Both name and date provided
- **WHEN** `useName` is true and `useDate` is true
- **THEN** the emitted `BushModel.flowers` array includes the Rozpakovka `FlowerModel` at `PLANT_CENTER`

#### Scenario: Name or date not used
- **WHEN** `useName` is false OR `useDate` is false
- **THEN** the emitted `BushModel.flowers` array does NOT include the Rozpakovka flower

### Requirement: Rozpakovka output type
The system SHALL define an `IdnRozpakovkaOut` type in `abetka.models.ts` with four `IDN | null` fields: `jadroImeniDen`, `imjaDen`, `pobatMisjacj`, `prNeofPrRik`.

#### Scenario: Type fields are populated after setData
- **WHEN** valid name and date inputs are provided
- **THEN** all four fields of `rozpakovkaOut` are non-null `IDN` values

### Requirement: Rozpakovka displayed in get-ordinal sidebar
The system SHALL display a "Rozpakovka" section in `get-ordinal.component.html` showing all 4 rows, each as a label + `<app-idn>` color chip, following the same layout pattern as the Поєднання section.

#### Scenario: Rozpakovka section visible
- **WHEN** the get-ordinal component is rendered with valid inputs
- **THEN** a "Rozpakovka" section heading and 4 label+chip rows are visible below the Pojednannja section
