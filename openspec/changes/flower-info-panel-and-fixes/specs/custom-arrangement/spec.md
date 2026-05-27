## MODIFIED Requirements

### Requirement: Each flower is draggable by its center in custom mode
In custom arrangement mode, the user SHALL be able to drag any flower by clicking and dragging its center point. The flower SHALL follow the pointer continuously during drag and settle **exactly** at the drop position — no offset jump after release.

#### Scenario: Dragging a flower
- **WHEN** custom mode is active and the user drags a flower's center
- **THEN** the flower SHALL move in real-time with the pointer within the SVG canvas

#### Scenario: Drag stays within SVG bounds
- **WHEN** the user drags a flower beyond the SVG viewport edge
- **THEN** the flower position SHALL be clamped to remain within the SVG bounds (0–svgWidth, 0–svgHeight)

#### Scenario: Drop sets new position without offset jump
- **WHEN** the user releases the drag
- **THEN** the flower SHALL remain visually at the exact position where the pointer was released
- **AND** the re-rendered flower position after the signal update SHALL match the visual position during the drag (no coordinate shift)
- **AND** the custom position SHALL be saved immediately

#### Scenario: Custom positions are independent per flower
- **WHEN** the user drags flower 0 in custom mode
- **THEN** only flower 0's position SHALL change; flowers 1 and 2 SHALL remain at their previous custom positions
