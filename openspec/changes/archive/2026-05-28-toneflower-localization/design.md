## Context

The app has no i18n system. All text is hardcoded as Latynka in component templates and `toneflower.constants.ts`. The `arc-help-update.txt` file contains authoritative Ukrainian Cyrillic text for intro, colors, numbers, and combinations. The Latynizator service in this project defines canonical character mappings, which was used to produce the existing Latynka text.

The right-panel (`app-get-ordinal`) is always visible and occupies significant screen space; users frequently want to hide it to focus on the visualization.

## Goals / Non-Goals

**Goals:**
- Runtime language switch (no page reload) between Ukrainian Cyrillic and Latynka
- Arc panel shows bilingual content (intro, section labels, color/number/combo descriptions)
- `app-get-ordinal` panel collapses with persisted state
- No new npm dependencies

**Non-Goals:**
- Localizing the `app-idn-list`, `app-abetka`, or any other sub-components
- Auto-transliteration via Latynizator at runtime (manual bilingual strings are used for accuracy)
- Routing-based locale URLs

## Decisions

### 1. Signal-based i18n service (no ngx-translate)
A lightweight standalone `ToneflowerI18nService` with `currentLang = signal<'uk' | 'lat'>('lat')` and a `t(key)` getter. No added dependencies. Fits the existing signal patterns in the codebase.

Alternative considered: `@ngx-translate/core`. Rejected because it would be the only translation library in the project and the scope is narrow (one page, two languages).

### 2. Translation strings in a separate file
`toneflower-translations.ts` exports `TRANSLATIONS: Record<'uk' | 'lat', ToneflowerStrings>`. Keeps the constants file clean; makes diffing Cyrillic vs Latynka straightforward.

Structure:
```typescript
interface ToneflowerStrings {
  intro: string;
  labelKolir: string;
  labelCyslo: string;
  labelPjednannja: string;
  colors: Record<number, { name: string; description: string }>;
  numbers: Record<number, { meaning: string }>;
  combos: Record<string, string>;
}
```

### 3. Language toggle placement
A small `UA | LAT` toggle rendered inside `toneflower.component.html` in the top controls bar (next to existing inputs). Stored in `ToneflowerI18nService` so any component can read it.

### 4. Right panel collapse
`ToneflowerComponent` adds `rightPanelOpen = signal(localStorage.getItem('rightPanelOpen') !== 'false')`. An `effect()` persists changes to localStorage. A chevron `<button>` outside `app-get-ordinal` toggles the signal; the panel itself is wrapped in `@if (rightPanelOpen())`.

### 5. Arc panel reads from i18n service
`ArcInfoPanelComponent` injects `ToneflowerI18nService`. Computed properties (`colorData`, `numberData`, `comboText`, `introText`, section labels) derive from `i18n.currentLang()`. The component is already Angular standalone so injection is straightforward.

## Risks / Trade-offs

- Cyrillic text in `toneflower-translations.ts` is large (~4 KB). Trade-off: readability vs bundle size — acceptable for a small app.
- Manual bilingual strings risk drift if one language is updated and the other isn't. Mitigation: single file with both languages side-by-side.
- `arc-help-update.txt` references file as a source — it must be transcribed manually into the translations object. Note: file is `2026-05-28-feedback/arc-help-update.txt`; the user referenced it as `arc-help-ukrainian.txt`.
