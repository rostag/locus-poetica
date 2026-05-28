## 1. Fix latynka text in arc-info-panel intro

- [x] 1.1 In `arc-info-panel.component.html`, replace `Navedytj` with `Naveditj` (наведіть: і→i)
- [x] 1.2 Replace both occurrences of `kilce` with `kiljce` (кільце: ь→j)
- [x] 1.3 Replace `joho` with `jogo` (його: г→g)

## 2. Fix labels and button text

- [x] 2.1 In `arc-info-panel.component.html`, rename section label `KOLJOR` → `KOLIR` (колір: no soft sign before і)
- [x] 2.2 In `toneflower.component.html`, fix button label: `pokazuvaty chyslo` → `pokazuvaty čyslo` (число: ч→č)

## 3. Update Baza preset coordinates

- [x] 3.1 In `toneflower.constants.ts`, update `BUSH_PRESETS[0].points` to estimated coordinates from user's MOJA reference screenshot: `[[150, 232], [78, 143], [160, 68]]`
