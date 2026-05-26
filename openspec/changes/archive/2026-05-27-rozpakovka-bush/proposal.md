## Why

The Rozpakovka was previously specified and implemented incorrectly — as a fourth flower appended to the existing three-flower bush. The correct model is that Розпаковка is a **separate Bush** of 4 flowers arranged in a diamond, displayed side-by-side with the existing bush. This change corrects that by removing the incorrect fourth flower from the existing bush and introducing a standalone Rozpakovka Bush rendered in its own SVG.

## What Changes

- **Remove** `rozpakovkaFlower` from the existing bush's `flowers` array in `GetOrdinalComponent.setData()` — it no longer belongs there
- **Add** `@Output() onRozpakovkaBushUpdate = new EventEmitter<BushModel>()` to `GetOrdinalComponent`, emitting a separate 4-flower `BushModel` arranged in a diamond
- **Add** diamond `ROZP_POINTS` constant to `toneflower.constants.ts` — 4 positions forming a rhombus for the Rozpakovka flowers
- **Add** `<figure id="rozpakovka-bushwrap">` to `toneflower.component.html` alongside the existing `#bushwrap`
- **Add** a second D3 SVG in `ToneFlowerComponent` for the Rozpakovka bush, reusing existing `drawFlower`/`addArc` infrastructure with a separate arcs array
- **Add** `updateRozpakovkaBush(bush: BushModel)` method to `ToneFlowerComponent` and wire it to the new output event

Each of the 4 Rozpakovka flowers encodes one row of the algorithm:

| Flower | Center (result) | Ring 1 (inner) | Ring 2 | Ring 3 (outer) |
|--------|-----------------|----------------|--------|----------------|
| 1 | jadroImeniDen | jadroName | jadroDate | — |
| 2 | imjaDen | imja | denj | — |
| 3 | pobatMisjacj | pobat | misjacj | — |
| 4 | prNeofPrRik | prizNeof | priz | rik |

## Capabilities

### New Capabilities

- `rozpakovka-bush`: A standalone second Bush rendered in its own SVG with 4 flowers in a diamond layout, each representing one Rozpakovka row

### Modified Capabilities

- `rozpakovka-flower`: The incorrect fourth-flower implementation is removed from the existing bush; `rozpakovkaOut`, `rozpakovkaRingIn`, and `RozpakovkaRingViewComponent` are kept as-is (they remain correct for the sidebar)

## Impact

- `get-ordinal/get-ordinal.component.ts` — new output emitter, removed rozpakovkaFlower from bush, new BushModel construction for Rozpakovka
- `get-ordinal/get-ordinal.component.html` — bind new `(onRozpakovkaBushUpdate)` output
- `toneflower.constants.ts` — new `ROZP_POINTS` diamond coordinates
- `toneflower.component.ts` — second SVG, second arcs array, `updateRozpakovkaBush()` method
- `toneflower.component.html` — second `<figure id="rozpakovka-bushwrap">` element
