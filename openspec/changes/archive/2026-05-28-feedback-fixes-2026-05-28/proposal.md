## Why

User feedback on the deployed ToneFlowers app (rostag.github.io) identified several immediate corrections: three latynka transcription errors in the arc info panel intro text, one incorrect button label, one incorrect section label, and a Baza preset arrangement that doesn't match the user's preferred hand-tuned MOJA position.

## What Changes

- Fix `Navedytj` → `Naveditj` in arc panel intro (Ukrainian і maps to `i`, not `y`)
- Fix `kilce` → `kiljce` in arc panel intro ×2 (Ukrainian ь maps to `j`)
- Fix `joho` → `jogo` in arc panel intro (Ukrainian г maps to `g`, not `h`)
- Fix `chyslo` → `čyslo` on "pokazuvaty" button (Ukrainian ч maps to `č`)
- Rename section label `KOLJOR` → `KOLIR` in arc-info-panel (Ukrainian колір = `kolir`, not `koljor`)
- Update `BUSH_PRESETS[0]` (Baza) coordinates to match user's preferred MOJA arrangement (visual estimation from reference screenshot)

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `arc-panel-intro`: Intro text words corrected to match Latynizator character mappings

## Impact

- `src/app/soundflow/tonecircus/arc-info-panel/arc-info-panel.component.html` — 3 word corrections in intro, KOLJOR→KOLIR label
- `src/app/soundflow/tonecircus/toneflower.component.html` — button label fix
- `src/app/soundflow/tonecircus/toneflower.constants.ts` — BUSH_PRESETS[0] coordinates
