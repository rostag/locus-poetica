## Context

ToneFlower computes numerological color (ordinal, 1–12) and number (cardinal, 1–9) readings for names and words. The `Abetka` type bundles a name, an ordinals table, and a cardinals table. Four abetky currently exist. The `ABETKY` array is the single source of truth consumed by `abetkaByName()` (lookup) and the selector UI in `get-ordinal.component`.

The Crimean Tatar (Qırımtatar) alphabet has 32 letters, several of which are unique to the script: `Â â`, `Ç ç`, `Ğ ğ`, `Ñ ñ`, `Ö ö`, `Ş ş`, `Ü ü`, `İ i` (dotted), and `I ı` (dotless). The community-defined ordinal and cardinal mappings come from `feat-Krymsjkotatarsjka.md/Krymsjkotatarsjka.md`.

## Goals / Non-Goals

**Goals:**
- Register Crimean Tatar as a fifth selectable `Abetka` in ToneFlower
- Correctly map all 32 letters to ordinals (1–12) and cardinals (1–9)
- Preserve correct Unicode identity for the two I letters throughout matching

**Non-Goals:**
- UI changes beyond adding the selector option
- Transliterating Crimean Tatar text (no latynizator extension)
- Support for mixed-script input (Cyrillic-based historical Crimean Tatar variants)
- Adding Crimean Tatar to the arc info panel color/number descriptions (those are the same 12 colors, unchanged)

## Decisions

### D1 — Store both cases explicitly for I/ı and İ/i

The helper `ordinalByLetter` matches via `new RegExp(letter, "i")`. JavaScript's `/i` flag folds `I` ↔ `i` but treats `ı` (U+0131, dotless i) and `İ` (U+0130, dotted I) as distinct code points not covered by that fold. Relying on the regex flag would silently assign dotless `ı` to the wrong ordinal (or miss it entirely).

**Decision:** Store both the uppercase and lowercase form explicitly for each of the two I letters:
- Ordinal 11: `["I", "ı", "R"]`  (dotless I — U+0049 / U+0131)
- Ordinal 12: `["İ", "i", "S"]`  (dotted I — U+0130 / U+0069)

This is consistent with how the Ukrainian Cyrillic table stores `"Ї"` alongside `"І"` as separate entries. The `/i` flag remains harmless for all other Crimean Tatar letters since they each have a standard Unicode case pair.

*Alternative considered:* Patch `ordinalByLetter` to use `toUpperCase()` before matching — rejected because it would break the dotless/dotted distinction globally for any future Turkic alphabet.

### D2 — Name the constant `ABETKA_KT` and the `AbetkaName` value `"Krymsjkotatarsjka"`

The existing naming convention uses the full transliterated name (`ABETKA_UA`, `ABETKA_MSK`, `ABETKA_EN`). `KT` follows that pattern for the constant. The `AbetkaName` string `"Krymsjkotatarsjka"` mirrors the feature-doc spelling and the pattern used by other names (`"Ukrajinsjka"`, `"Anglijsjka"`).

### D3 — No new component or route

The selector already iterates `ABETKY` dynamically via `abetkaByName`. Adding `ABETKA_KT` to the array is sufficient for it to appear in the dropdown. No template changes needed.

## Risks / Trade-offs

- **Risk: Incorrect letter coverage** — The source doc lists uppercase and lowercase; if any letter is missed the ordinal returns 0 (falls through to `IDNS[0]`), producing silent wrong results. → Mitigation: tasks include a unit test asserting every letter of the 32-letter alphabet resolves to a non-zero ordinal and cardinal.

- **Risk: Future regex-based matching broken by new Unicode letters** — Letters like `Ğ ğ` and `Ş ş` use standard Unicode case pairs, so `/i` flag handles them fine. Only the I pair needs explicit dual storage (D1). → Mitigation: document this in a comment on the KT table constants.

## Open Questions

- Should `ABETKA_KT` be the default (`ABETKA_STD`) for any scenario, or always remain an opt-in selection? Current assumption: opt-in only, `ABETKA_STD` stays `ABETKA_EN`.
- Translation labels for `selectKrymsjkotatarsjka` — `uk` translation could use the Crimean Tatar name in Cyrillic (`Кримськотатарська`) and `lat` can use the transliterated form (`Krymsjkotatarsjka`). Confirm with user if needed.
