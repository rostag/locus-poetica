## 1. Create i18n service and translation data

- [x] 1.1 Create `toneflower-i18n.service.ts` — standalone injectable with `currentLang = signal<'uk' | 'lat'>` and `toggle()` method; read/write `localStorage` key `toneflower-lang`
- [x] 1.2 Create `toneflower-translations.ts` — export `TRANSLATIONS` object with `uk` and `lat` keys, each containing `intro`, `labelKolir`, `labelCyslo`, `labelPjednannja`, `colors` (1–12), `numbers` (1–9), `combos` (36 entries)
- [x] 1.3 Populate `TRANSLATIONS.lat` from existing `COLOR_INFO`, `NUMBER_INFO`, `COMBO_INFO` constants in `toneflower.constants.ts` plus the corrected intro text
- [x] 1.4 Populate `TRANSLATIONS.uk` from `2026-05-28-feedback/arc-help-update.txt` for colors, numbers, and combinations; use Cyrillic intro text from the same file

## 2. Update ArcInfoPanelComponent to use i18n

- [x] 2.1 Inject `ToneflowerI18nService` into `ArcInfoPanelComponent`
- [x] 2.2 Replace hardcoded `COLOR_INFO` / `NUMBER_INFO` / `COMBO_INFO` lookups with `i18n.t('colors')[ordinal]` etc. (reactive to language signal)
- [x] 2.3 Add `introText` computed property reading `TRANSLATIONS[currentLang].intro`
- [x] 2.4 In `arc-info-panel.component.html`, replace hardcoded intro text with `{{ introText }}`
- [x] 2.5 Replace hardcoded labels `KOLIR`, `ČYSLO`, `POJEDNANNJA` with translated equivalents from the service

## 3. Language toggle UI

- [x] 3.1 In `toneflower.component.ts`, inject `ToneflowerI18nService` and expose it as `i18n`
- [x] 3.2 In `toneflower.component.html`, add a toggle button in the top controls bar: shows `UA` when active language is `uk`, `LAT` when `lat`; calls `i18n.toggle()`

## 4. Right panel collapsible

- [x] 4.1 In `toneflower.component.ts`, add `rightPanelOpen = signal(localStorage.getItem('rightPanelOpen') !== 'false')` and an `effect()` that writes the value to localStorage on change
- [x] 4.2 In `toneflower.component.html`, wrap `<app-get-ordinal>` in `@if (rightPanelOpen())` and add a collapse toggle button (chevron icon) adjacent to the panel
