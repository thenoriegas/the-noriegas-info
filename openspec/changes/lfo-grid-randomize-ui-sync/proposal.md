## Why

Per-module **Randomize** on [thenoriegas.info](https://github.com/thenoriegas/the-noriegas-info) updates LFO state but knob indicators often stay visually fixed — especially on noise modules where randomized frequency exceeds the knob display range. Routing dropdowns also label modules 7 and 8 as "LFO 7" / "LFO 8" instead of the established **WN** / **PN** (White Noise / Pink Noise) titles shown on the module headers.

## What Changes

- Centralize module metadata (display name, waveform type, per-param ranges and visibility) in one table consumed by randomize, render, and routing UI.
- After per-module randomize, sync knob indicators and route `<select>` from the mutated `lfos[]` state without relying on a fragile full-grid rebuild.
- Align noise-module frequency randomization range with the FREQ knob min/max so indicator rotation reflects new values.
- Route dropdown option labels use **WN** and **PN** for module indices 6 and 7 (0-based); oscillator modules keep `LFO N` labels.
- Replace `innerHTML +=` title injection (which destroys the oscilloscope canvas sibling) with DOM `createElement` assembly.

## Capabilities

### New Capabilities

- `lfo-module-ui-sync`: Per-module randomize mutates state once, then applies knob and route UI from that state; module display names are single-sourced.

### Modified Capabilities

_(none — greenfield OpenSpec in this repo)_

## Impact

- `index.html` — inline synth script (~400 lines in the LFO UI section)
- No build pipeline changes (static site, no bundler source for synth logic)
- No API or backend impact
