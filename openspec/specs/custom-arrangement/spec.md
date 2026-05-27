### Requirement: "Moia kompozytsiia" button enters custom drag mode
The system SHALL display a sixth button beneath the main bush SVG labeled **"Moia kompozytsiia"** (Ukrainian latynka). Clicking it SHALL activate custom arrangement mode, enabling drag-and-drop repositioning of each flower.

#### Scenario: Custom mode button is visible
- **WHEN** the ToneFlower page is displayed
- **THEN** a button labeled "Moia kompozytsiia" SHALL appear alongside the 5 preset buttons beneath the main bush SVG

#### Scenario: Entering custom mode
- **WHEN** the user clicks "Moia kompozytsiia"
- **THEN** custom mode SHALL become active
- **AND** the button SHALL display a visually distinct active state (e.g., highlighted border or fill)
- **AND** each flower center SHALL show a visible drag handle (cursor changes to grab/grabbing)

#### Scenario: Exiting custom mode by clicking another preset
- **WHEN** custom mode is active and the user clicks any preset button (0–4)
- **THEN** custom mode SHALL deactivate
- **AND** the bush SHALL re-render with the selected preset's coordinates

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
