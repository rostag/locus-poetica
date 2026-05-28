## Context

The arc info panel intro text (`arc-info-panel.component.html`) contains Ukrainian latynka (Latin-script Ukrainian) that was written with three transcription errors. The Latynizator tool in this project defines the canonical character mappings:

- г → `g` (not `h` — that's х)
- ь → `j` (soft sign)
- і → `i` (not и/y)

Current intro text has: `Navedytj kursor na koljorove kilce kvitky, ščob pobačyty joho znacennja.`

## Goals / Non-Goals

**Goals:**
- Correct 3 words in the intro text to match Latynizator mappings
- Single-file change, no logic or behavior affected

**Non-Goals:**
- Auditing all latynka text in `toneflower.constants.ts` (COLOR_INFO / NUMBER_INFO / COMBO_INFO) — out of scope for this change
- Updating preset coordinates or any other feedback items

## Decisions

**Correct word-by-word per Latynizator:**

| Current | Correct | Rule |
|---------|---------|------|
| `Navedytj` | `Naveditj` | наведіть: і→i (not и→y) |
| `kilce` | `kiljce` | кільце: ь→j soft sign present |
| `joho` | `jogo` | його: г→g (not х→h) |

The second occurrence of `kilce` (`Natysnitj na kilce, ščob zakripyty informaciju.`) is fixed identically.

## Risks / Trade-offs

None — purely a text correction, no logic changes.
