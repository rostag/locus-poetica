## Context

The `tonecircus` module implements a Ukrainian esoteric numerology system that translates textual input (words, full names, dates) into colorized concentric circular shapes — called "flowers" — each ring colored by a musical-chromatic identity (IDN) and divided into sectors whose count encodes a pythagorean digit-sum. The logic currently lives across `abetka.helper.ts`, `abetka.constants.ts`, `toneflower.constants.ts`, and two orchestration components (`get-ordinal`, `slovo`). There is no formal specification — the rules exist only in code and in commented Ukrainian-transliterated prose fragments.

## Goals / Non-Goals

**Goals:**

- Produce a machine-readable spec for every rule in the numerological engine
- Establish vocabulary: ordinal (колір/звук, 1–12), cardinal (число, 1–9), IDN, leaf, flower, bush, jadro
- Make the reduction algorithms explicit and verifiable with examples
- Specify all four alphabet letter tables so they can be validated independently

**Non-Goals:**

- Changing any existing logic — this is documentation/spec extraction only
- Adding new alphabets or extending the IDN palette
- Addressing the commented-out `getButtColor` center-calculation logic (deferred)

## Decisions

### D1 — Two independent numeral systems, not one

The module maintains two separate letter→number tables per alphabet:

- **Ordinals** (1–12): map letters to a chromatic 12-note scale position → determines color and musical note. Reduction: `sum % 12 || 12` (never zero).
- **Cardinals** (1–9): map letters to pythagorean digits → determines pie-segment count per ring. Reduction: recursive digit-sum until single digit.

These two systems are parallel and independent — the same word produces both an ordinal (color) and a cardinal (segment count) simultaneously.

_Alternative considered_: Merging them into one table. Rejected — the chromatic 12-cycle and pythagorean 9-cycle have different mathematical bases and are used for different visual properties.

### D2 — Flower = ordered stack of concentric rings (leaves)

Each input element (word, name part, date component) produces one `LeafModel`:

- `leafIdn`: the IDN determined by the element's ordinal
- `leafNum`: the cardinal number (ring segment count)
- `leafOrder`: position in the stack (innermost = 0 = jadro/center)

Rings are rendered outward: `radius = baseRadius + leafWidth × leafOrder`. The innermost ring (index 0) is always the **jadro** (computed center = sum of all part ordinals, reduced mod 12).

### D3 — Jadro is always the innermost ring, computed last

For a name flower: `jadroOrdinal = (imja + pobat + prizNeof + priz) % 12 || 12`. The jadro leaf is pushed as index 0 in the leaves array, making it the center ring visually.

For a date flower: `jadroOrdinal = (day + month + year) % 12 || 12`.

### D4 — Combination (pojednannja) flower cross-pairs name parts with date parts

Three intermediate values are computed:

1. `imjaDen` = `ordinalByDate(imjaNomer + "." + denNomer)` — first name + birth day
2. `pobatMis` = `ordinalByDate(pobatNomer + "." + misjacNomer)` — patronymic + birth month
3. `prizNeofPrizRik` = `ordinalByDate(prizNeofNomer + "." + prizNomer + "." + rikNomer)` — unofficial surname + official surname + birth year

`jadro` = `ordinalByDate(imjaDen + "." + pobatMis + "." + prizNeofPrizRik)`

Note: `ordinalByDate` applies the same `% 12 || 12` reduction to each dot-separated segment, then sums them — identical algorithm to date parsing.

### D5 — SlovoComponent treats word characters as positional name-parts

`slovo.component.ts` maps the first 4 characters of a word to the same 4 name-part slots (imja, pobat, prizNeof, priz). This is a single-word shorthand for the full name flower, useful for analyzing individual words.

## Risks / Trade-offs

- **Commented-out center logic** (`getButtColor` in `toneflower.class.ts`): there is an alternative center-color algorithm that sums leaf ordinals and subtracts 12 repeatedly. It is not used in the live code. Spec will document it as an open variant. → Mitigation: mark it `[VARIANT - inactive]` in spec.
- **`ordinalByDate` reused for combination**: the date-parsing function (`split(".")`) is repurposed to reduce arbitrary multi-value concatenations. The semantics are non-obvious. → Mitigation: spec explicitly notes the dual use.
- **Case sensitivity**: `abetka.helper.ts` uses `new RegExp(letter, "i")` for matching — case-insensitive. One commented line uses `toLocaleUpperCase()`. → Mitigation: spec mandates case-insensitive matching as the canonical rule.

## Open Questions

- Should `getButtColor` (sum-and-subtract-12 center) eventually replace the current `% 12` jadro calculation, or remain an alternative?
  Answer: let's keep it as alternative, but add a todo mentioning this possibility.s
- The `SlovoComponent` only uses 4 characters of a word. Should longer words be supported (one leaf per character)?
  Answer: yes, longer words should be supported, up to 10000 characters.
