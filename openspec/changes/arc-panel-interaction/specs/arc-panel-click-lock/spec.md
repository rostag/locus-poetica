## ADDED Requirements

### Requirement: Hovering an arc shows preview info without locking
Moving the pointer over an arc SHALL show that arc's info in the panel as a preview. Moving the pointer away SHALL revert the panel to the previously locked state (or intro if nothing is locked).

#### Scenario: Hover shows arc info as preview
- **WHEN** the user hovers over a colored arc and no arc is currently clicked/locked
- **THEN** the panel SHALL display that arc's KOLJOR, ČYSLO, and POJEDNANNJA info
- **AND** the hovered arc SHALL show a contrasting stroke/border outline

#### Scenario: Hover reverts to locked content on mouseleave
- **WHEN** an arc is locked (previously clicked) and the user hovers a different arc then moves away
- **THEN** the panel SHALL return to displaying the locked arc's info after the pointer leaves the hovered arc

#### Scenario: Hover reverts to intro on mouseleave when nothing is locked
- **WHEN** no arc is locked and the user hovers an arc then moves away
- **THEN** the panel SHALL return to the intro state after the pointer leaves the arc

### Requirement: Clicking an arc locks its info in the panel
Clicking a colored arc SHALL lock that arc's info in the panel. The locked info SHALL remain visible even when the user moves the pointer elsewhere or hovers other arcs.

#### Scenario: Click locks arc info
- **WHEN** the user clicks a colored arc
- **THEN** the panel SHALL display that arc's info
- **AND** the info SHALL remain visible even after the pointer moves away from the arc

#### Scenario: Clicking a different arc changes the lock
- **WHEN** an arc is already locked and the user clicks a different arc
- **THEN** the panel SHALL update to show the newly clicked arc's info
- **AND** the previous lock SHALL be released

#### Scenario: Clicking SVG background clears the lock
- **WHEN** an arc is locked and the user clicks on the SVG canvas away from any arc
- **THEN** the lock SHALL be released and the panel SHALL return to intro state

### Requirement: Hovered arc shows a contrasting stroke highlight
While the pointer is over an arc, that arc SHALL display a visible outline/stroke to indicate it is interactive.

#### Scenario: Hover adds stroke to arc
- **WHEN** the user moves the pointer over a colored arc
- **THEN** the arc SHALL gain a visible contrasting stroke (e.g. 2px white outline)

#### Scenario: Stroke removed on mouseleave
- **WHEN** the pointer leaves the arc
- **THEN** the stroke SHALL be removed and the arc SHALL return to its normal appearance
