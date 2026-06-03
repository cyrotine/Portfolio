# Spec: Black Hole

## Overview
Replace the existing human Character model (`src/components/Character/`) with an interactive R3F black hole as the hero's 3D centerpiece. The black hole renders an event horizon sphere, a glowing accretion disk made of particles, and a Bloom postprocessing pass for the glow effect. The cursor exerts a gravitational pull on the accretion disk particles — particles near the mouse are drawn toward it and slingshot away, reinforcing the immersive dev-aesthetic. On mobile (≤768px) the canvas is hidden and a static fallback image is shown instead, matching the existing `.mobile-photo` pattern.

## Depends on
No dependencies.

## Components

- **Create:** `src/components/BlackHole/index.tsx` — barrel re-export (`export { default } from "./Scene"`)
- **Create:** `src/components/BlackHole/Scene.tsx` — R3F `<Canvas>` wrapper; owns the camera, `<EffectComposer>` + `<Bloom>`, mouse state, and composes `<EventHorizon>` + `<AccretionDisk>`
- **Create:** `src/components/BlackHole/EventHorizon.tsx` — a perfectly black sphere mesh (`MeshBasicMaterial`, `color="black"`) at the center; radius ~1.2 units
- **Create:** `src/components/BlackHole/AccretionDisk.tsx` — `<Points>` buffer of ~3 000 particles distributed in a flat torus ring; accepts a `mouseNDC: {x,y}` prop and applies gravitational displacement in `useFrame`
- **Modify:** `src/App.tsx` — swap the `CharacterModel` lazy import for a `BlackHoleModel` lazy import pointing at `./components/BlackHole`

## Three.js / R3F

Scene graph:
```
<Canvas>
  <ambientLight />              // very dim, just enough to see the disk
  <EventHorizon />              // black sphere, radius 1.2, zIndex center
  <AccretionDisk mouseNDC />    // Points geometry in a torus ring
  <EffectComposer>
    <Bloom intensity={1.4} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
  </EffectComposer>
</Canvas>
```

**EventHorizon:** `SphereGeometry(1.2, 64, 64)` + `MeshBasicMaterial({ color: 'black' })`. Rendered on top of disk particles via `renderOrder={1}` + `depthWrite={true}`.

**AccretionDisk particles:**
- Generate ~3 000 positions in a flat torus: `r = random(1.8, 3.6)`, `θ = random(0, 2π)`, `x = r·cos(θ)`, `z = r·sin(θ)`, `y = gaussian noise ×0.08` (thin disk).
- Each particle color is interpolated between `var(--accentColor)` (`#c2a4ff`) and near-white along its radial distance.
- In `useFrame`: each particle slowly orbits (`θ += speed / r`), then a gravitational nudge is added toward the projected mouse world position, clamped so particles don't collapse into the horizon. Particles that drift inside `r < 1.3` are reset to a new random outer position (spiral-in effect).

**Mouse tracking:** `Scene.tsx` attaches a `onPointerMove` handler to the `<Canvas>` div and stores NDC coords `{x: [-1,1], y: [-1,1]}` in a `useRef` (not state — avoids re-renders). Passed down as a prop.

## Animation

- `useFrame` in `AccretionDisk.tsx`: per-frame particle orbit + gravitational nudge toward mouse. No GSAP needed — pure R3F animation loop.
- Intro fade-in: GSAP `gsap.fromTo` on the canvas container `opacity: 0 → 1` over 1.2 s, triggered after a 2 500 ms delay (matching the existing loading flow in `Scene.tsx`).

## Config changes (`src/config.ts`)
No config changes.

## CSS

- **Create:** `src/components/BlackHole/BlackHole.css`
  - `.blackhole-container` — full viewport, `position: absolute`, `top: 0; left: 0; width: 100%; height: 100%; pointer-events: none` (hero text sits on top)
  - `.blackhole-canvas` — `width: 100%; height: 100%`
  - `.blackhole-mobile-fallback` — `display: none` by default; shows a static placeholder image
  - `@media (max-width: 768px)`: `.blackhole-canvas { display: none }`, `.blackhole-mobile-fallback { display: block }`
  - Rules: use `var(--accentColor)` and `var(--backgroundColor)` only — no hardcoded hex values

## Files to change
- `src/App.tsx`

## Files to create
- `src/components/BlackHole/index.tsx`
- `src/components/BlackHole/Scene.tsx`
- `src/components/BlackHole/EventHorizon.tsx`
- `src/components/BlackHole/AccretionDisk.tsx`
- `src/components/BlackHole/BlackHole.css`
- `public/images/blackhole-fallback.png` *(static placeholder image — can be a dark solid PNG for now)*

## New packages
No new packages. All required packages are already installed:
- `@react-three/fiber` ^8.17.10
- `@react-three/drei` ^9.120.4
- `@react-three/postprocessing` ^2.16.3
- `three` ^0.168.0
- `gsap` ^3.12.7

## Implementation rules
- No hardcoded hex values — use `var(--accentColor)` and CSS variables from `index.css`; for Three.js materials that need a numeric color, read the CSS variable at runtime: `getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim()`
- TypeScript strict — no `any` unless justified with a comment
- GSAP for all scroll-triggered animations, not CSS keyframes (intro fade is GSAP)
- Keep existing variable names and component structure
- Targeted edits only — never rewrite entire files
- Mobile fallback required: canvas hidden on `max-width: 768px`, fallback image shown
- `useRef` for mouse position in the render loop — never `useState` for hot-path data
- Particle reset logic must prevent visual popping: teleport to outer ring with random θ, not position (0,0,0)
- `pointer-events: none` on the canvas container so hero text/CTAs remain clickable

## Definition of done
- [ ] Hero section renders the R3F black hole canvas at full viewport height on desktop
- [ ] A visibly black event horizon sphere is centered in the canvas
- [ ] Accretion disk particles form a visible flat ring around the event horizon with a purple-white glow
- [ ] Bloom postprocessing effect is visible (particles glow beyond their geometry boundary)
- [ ] Moving the mouse over the canvas causes particles near the cursor to shift/drift toward it
- [ ] Particles that spiral into the event horizon reappear at the outer ring without a visible pop
- [ ] On mobile (≤768px viewport), the canvas is not rendered; a fallback image is shown in its place
- [ ] No TypeScript errors (`npm run build` completes without errors)
- [ ] No console errors or warnings in the browser during normal interaction
- [ ] The existing `/myworks` and `/play` routes still load and function correctly