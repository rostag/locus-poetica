## MODIFIED Requirements

### Requirement: Flower structure — ordered concentric rings from a leaf list
A flower SHALL be a set of concentric circular rings (leaves) rendered outward from a center point. Each `LeafModel` in the flower's `leaves` array corresponds to one ring, ordered by `leafOrder` (0 = innermost).

Ring geometry:
- `innerRadius = baseRadius + leafWidth × leafOrder` (for leafOrder > 0)
- `outerRadius = innerRadius + leafWidth`
- For the center ring (leafOrder = 0): `innerRadius = 0` (solid disc)

Default constants: `baseRadius = 16`, `leafWidth = 13`.

#### Scenario: Single-leaf flower
- **WHEN** a flower has one leaf at leafOrder 0
- **THEN** it SHALL render as a solid disc of radius `baseRadius + leafWidth`

#### Scenario: Multi-leaf flower ring radii
- **WHEN** a flower has 3 leaves (leafOrder 0, 1, 2)
- **THEN** the outermost ring SHALL have `outerRadius = baseRadius + leafWidth × 2 + leafWidth = 16 + 13×2 + 13 = 55`
