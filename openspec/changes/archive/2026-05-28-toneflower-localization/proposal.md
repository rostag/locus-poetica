## Why

The ToneFlower UI is entirely in Latynka (Latin-script Ukrainian), which is inaccessible to users who read standard Ukrainian Cyrillic. Adding a runtime language toggle — Ukrainian Cyrillic and Latynka — makes the app usable for a wider audience and is a prerequisite for publishing full Cyrillic-language arc descriptions from the authoritative `arc-help-update.txt` content file. The right-panel (numerology calculator) also needs a collapsible toggle so users can focus on the flower visualization.

## What Changes

- **i18n service**: Standalone Angular service using signals (`currentLang: signal<'uk' | 'lat'>`), with localStorage persistence
- **Language toggle**: UI button in the top-right corner of the ToneFlower page switching between Ukrainian Cyrillic and Latynka
- **Bilingual arc panel text**: `COLOR_INFO`, `NUMBER_INFO`, `COMBO_INFO`, section labels, and intro text each have Ukrainian Cyrillic and Latynka versions; the arc-info-panel reads from the active language
- **Right panel collapsible**: `app-get-ordinal` panel has a toggle (chevron button); open/closed state persists in localStorage

## Capabilities

### New Capabilities

- `toneflower-i18n`: Language service + toggle for UA Cyrillic / Latynka runtime switching in ToneFlower

### Modified Capabilities

- `arc-panel-intro`: Intro text sourced from i18n service (both languages)
- `arc-info-panel`: Section labels and all lookup text (colors, numbers, combos) sourced from i18n service

## Impact

- New file: `src/app/soundflow/tonecircus/toneflower-i18n.service.ts`
- New file: `src/app/soundflow/tonecircus/toneflower-translations.ts` (all bilingual text)
- Modified: `arc-info-panel.component.ts` — inject i18n service, compute text from service
- Modified: `toneflower.component.html` — language toggle button, collapsible right panel wrapper
- Modified: `toneflower.component.ts` — collapse state via localStorage
- No new external dependencies (uses Angular signals + localStorage)
