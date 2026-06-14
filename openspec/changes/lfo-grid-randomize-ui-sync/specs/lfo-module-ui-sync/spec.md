## ADDED Requirements

### Requirement: Per-module randomize syncs knob indicators

When the user clicks **Randomize** on a single LFO module, every visible knob on that module SHALL reflect the newly randomized parameter values immediately.

#### Scenario: Oscillator module knobs move after randomize

- **WHEN** the user clicks **Randomize** on LFO 1 through LFO 6
- **THEN** each visible knob indicator rotates to match the updated `lfos[i]` values without requiring a full page reload

#### Scenario: Noise module knobs move after randomize

- **WHEN** the user clicks **Randomize** on the White Noise or Pink Noise module
- **THEN** each visible knob indicator rotates to match the updated values, including FREQ within the knob's display range

### Requirement: Module display names are single-sourced

Module labels in routing dropdowns SHALL use the same display names as module headers: `LFO 1`–`LFO 6`, **WN** (White Noise, index 6), **PN** (Pink Noise, index 7).

#### Scenario: Route dropdown shows WN for white noise

- **WHEN** the routing dropdown lists a destination on module index 6
- **THEN** the option label prefix is **WN**, not "LFO 7"

#### Scenario: Route dropdown shows PN for pink noise

- **WHEN** the routing dropdown lists a destination on module index 7
- **THEN** the option label prefix is **PN**, not "LFO 8"

### Requirement: Parameter ranges match knob display ranges

Randomization ranges for each parameter SHALL match the min/max used by that parameter's knob control so indicator position is always meaningful.

#### Scenario: Noise FREQ randomization matches knob range

- **WHEN** White Noise or Pink Noise FREQ is randomized
- **THEN** the value falls within the FREQ knob min/max used for rendering that module
