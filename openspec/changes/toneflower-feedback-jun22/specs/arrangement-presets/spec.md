## ADDED Requirements

### Requirement: Rozpakovka default bottom flower aligns with the main bush bottom flower
In the default (preset 0) arrangement, the bottom flower of the Rozpakovka bush SHALL be positioned at the same vertical distance from the bottom edge of its paper as the bottom flower of the main bush is from the bottom edge of its paper, so the two papers read as a matched pair. Only the bottom flower position is constrained by this requirement; the other flower positions in each preset are unchanged.

#### Scenario: Default bottom flowers share the same bottom margin
- **WHEN** the app loads for the first time (no localStorage preset for either bush) and both bushes render their default preset 0 arrangement
- **THEN** the Rozpakovka bottom flower's vertical offset from its paper's bottom edge SHALL equal the main bush bottom flower's vertical offset from its paper's bottom edge

#### Scenario: Other flowers are not moved by the alignment
- **WHEN** the Rozpakovka default arrangement is adjusted to satisfy the bottom-flower alignment
- **THEN** the upper-center, middle-left, and middle-right Rozpakovka flowers SHALL retain their previous default coordinates
