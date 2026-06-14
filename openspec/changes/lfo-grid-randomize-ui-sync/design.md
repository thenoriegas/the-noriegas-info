## Context

The Modular LFO Grid Synth lives entirely in `index.html` as inline JavaScript. Module metadata (waveform type, display names, param visibility) is duplicated across randomize, render, and routing code paths. Per-module randomize mutates `lfos[i]` then calls `renderLFOs()`, which rebuilds the entire grid — but noise-module FREQ is randomized to 500–8000 while knobs clamp to 20–2000, so indicators appear stuck at max.

## Goals / Non-Goals

**Goals:**

- One module metadata table drives display names, param visibility, and value ranges.
- Per-module randomize: mutate state → sync bound knob UI for that module only.
- Route dropdown labels use WN/PN for noise modules.
- Fix title DOM assembly so oscilloscope canvas is not destroyed by `innerHTML +=`.

**Non-Goals:**

- Extracting script to separate files or adding a build step.
- Changing audio DSP behavior beyond reading corrected param values.
- Renaming module header titles ("WHITE NOISE" / "PINK NOISE" stay as-is).

## Decisions

### D1 — Module registry object

**Choice:** `MODULE_DEFS[i]` holds `{ waveform, isNoise, shortName, titleText, color }` derived once from existing `LFO_WAVEFORMS` / `LFO_COLORS`.

**Why:** Eliminates scattered `i === 6` / `i === 7` / `LFO_WAVEFORMS[i] === 'white'` checks (repetition rule).

### D2 — Param spec table with range resolver

**Choice:** `PARAM_DEFS[param]` holds label, step, and oscillator vs noise min/max. `paramRange(param, moduleIdx)` returns `{ min, max, step, label }`.

**Why:** Randomize and knob render read the same range — fixes noise FREQ pegging.

### D3 — Knob UI registry + sync instead of full re-render

**Choice:** `renderKnob` returns `{ element, setValue }`; stored in `knobUi[moduleIdx][param]`. `syncModuleKnobs(i)` updates all bound knobs and the route `<select>` after randomize.

**Why:** Deterministic UI apply after state mutation; avoids rebuilding all 8 modules on every per-module randomize.

**Alternative rejected:** Keep `renderLFOs()` on per-module randomize — still works for oscillators but masks the range bug on noise modules and wastes DOM work.

### D4 — `moduleRouteLabel(i, param)` for dropdown options

**Choice:** `` `${MODULE_DEFS[j].shortName} ${paramLabel}` `` where `shortName` is `LFO N`, `WN`, or `PN`.

## Risks / Trade-offs

- [Registry out of sync if new params added without updating PARAM_DEFS] → Keep `LFO_PARAMS` as iteration source; visibility guard in one function.
- [knobUi empty before first renderLFOs] → Per-module randomize only fires after initial render; guard null entries in sync.

## Migration Plan

Single commit to `index.html`. Deploy via GitHub Pages on merge to `master`. No rollback beyond revert.
