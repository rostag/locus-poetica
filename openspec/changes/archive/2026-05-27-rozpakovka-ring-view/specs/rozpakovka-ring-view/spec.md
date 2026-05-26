## ADDED Requirements

### Requirement: Ring view renders four concentric circle diagrams
The system SHALL render a `RozpakovkaRingViewComponent` that displays 4 SVG concentric circle diagrams arranged in a 2×2 grid layout (rows 1 and 4 centered, rows 2 and 3 side by side), each labelled with its row number matching the reference painting.

#### Scenario: Component renders with valid input
- **WHEN** `rozpakovkaOut` has all four non-null IDN fields
- **THEN** four SVG circle diagrams are visible, each showing the correct colors from the IDN `colorHex` values

#### Scenario: Component renders nothing when input is null
- **WHEN** `rozpakovkaOut` is null or any field is null
- **THEN** no ring diagrams are displayed

### Requirement: Row 1 ring structure — 2 inputs, result center
Row 1 SHALL display two rings and a center:
- Outermost ring: `jadroImeniDen.colorHex` wait — the inputs to row 1 are `jadroNomer` (name jadro) and `jadroDateNomer` (date jadro). The outermost ring is the date jadro IDN color (sribnyj in the sample), the inner ring is the name jadro IDN color (pomarančevyj), and the center is `jadroImeniDen.colorHex` (červonyj — the computed result).

To determine the input IDN colors, the component needs to receive them separately. The `rozpakovkaOut.jadroImeniDen` field only stores the *result*. Input colors are provided via additional `@Input()` fields or a combined data structure.

#### Scenario: Row 1 visual matches reference painting
- **WHEN** sample data is Ростислав / 26.11.1978 (jadroName=pomarančevyj=3, jadroDate=sribnyj=11, result=červonyj=2)
- **THEN** Row 1 ring shows: outer ring = sribnyj (#DBDFE5), inner ring = pomarančevyj (#d9792b), center = červonyj (#bd1e1e)

### Requirement: Row 2 ring structure — 2 inputs, result center
Row 2 inputs are imjaNomer (blakytnyj) and denNomer (červonyj). Result is fioletovyj.

#### Scenario: Row 2 visual matches reference painting
- **WHEN** sample data is Ростислав / 26.11.1978 (imja=blakytnyj=6, den=červonyj=2, result=fioletovyj=8)
- **THEN** Row 2 ring shows: outer ring = červonyj (#bd1e1e), inner ring = blakytnyj (#56acc7), center = fioletovyj (#9091B6)

### Requirement: Row 3 ring structure — 2 inputs, result center
Row 3 inputs are pobatNomer (blakytnyj) and misjacNomer (sribnyj). Result is zelenyj.

#### Scenario: Row 3 visual matches reference painting
- **WHEN** sample data is Ростислав / 26.11.1978 (pobat=blakytnyj=6, misjacj=sribnyj=11, result=zelenyj=5)
- **THEN** Row 3 ring shows: outer ring = sribnyj (#DBDFE5), inner ring = blakytnyj (#56acc7), center = zelenyj (#32963a)

### Requirement: Row 4 ring structure — 3 inputs, result center
Row 4 inputs are prizNeofNomer (blakytnyj), prizNomer (zolotyj), rikNomer (perlynovyj). Result is čornyj.

#### Scenario: Row 4 visual matches reference painting
- **WHEN** sample data is Ростислав / 26.11.1978 (prizNeof=blakytnyj=6, priz=zolotyj=9, rik=perlynovyj=10, result=čornyj=1)
- **THEN** Row 4 ring shows: outermost = perlynovyj (#f2f2dc), middle = zolotyj (#BE9C5C), inner = blakytnyj (#56acc7), center = čornyj (#151210)

### Requirement: Component receives input IDN colors via IdnRozpakovkaRingIn structure
The system SHALL define an `IdnRozpakovkaRingIn` data structure that pairs each result IDN with its input IDNs, to allow the ring-view component to render both inputs and outputs without re-computing them.

#### Scenario: Data structure contains input and result IDN for each row
- **WHEN** `GetOrdinalComponent.setData()` is called
- **THEN** an `IdnRozpakovkaRingIn` object is constructed with input IDNs and result IDNs for all 4 rows and passed to `RozpakovkaRingViewComponent`

### Requirement: Ring view embedded in get-ordinal sidebar
The system SHALL embed `<app-rozpakovka-ring-view>` in `get-ordinal.component.html` directly below the Rozpakovka label rows.

#### Scenario: Ring view visible below Rozpakovka section
- **WHEN** both `useName` and `useDate` are true
- **THEN** the ring view SVG diagrams are visible in the sidebar below the "Pr Neof + Pr + Rik" row
