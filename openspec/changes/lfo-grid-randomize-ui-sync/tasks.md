## 1. Module registry

- [x] 1.1 Add `MODULE_DEFS`, `PARAM_DEFS`, `paramRange`, `isParamVisible`, and `moduleRouteLabel` helpers after existing LFO constants
- [x] 1.2 Add `knobUi` registry array and `syncModuleKnobs(i)` function

## 2. Randomize pipeline

- [x] 2.1 Rewrite `randomizeLFOParams` to use `paramRange` for value generation (fix noise FREQ range)
- [x] 2.2 Add `randomizeModule(i)` that mutates state then calls `syncModuleKnobs(i)` and audio refresh
- [x] 2.3 Wire per-module Randomize button and `randomizeAll` through the new pipeline

## 3. Render and labels

- [x] 3.1 Fix module title DOM assembly (no `innerHTML +=` after canvas append)
- [x] 3.2 Update `renderKnob` to return `{ element, setValue }` and register in `knobUi`
- [x] 3.3 Update route dropdown options to use `moduleRouteLabel` (WN/PN for indices 6/7)
- [x] 3.4 Use `paramRange` in render loop instead of inline min/max blocks

## 4. Verification

- [x] 4.1 Manual check: per-module Randomize moves knobs on LFO 1 and WN module
- [x] 4.2 Manual check: route dropdown shows WN/PN labels for noise modules
