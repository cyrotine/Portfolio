# Spec: Horizontal Work Gallery

## Overview
Convert the "My Work" section from a static vertical 3-column grid into a scroll-driven
horizontal gallery. On desktop, the first three project cards (starting with Forge) are
visible; as the user scrolls down, the section pins in place and the cards translate
horizontally to reveal the remaining cards one at a time. Once the last card is fully
revealed, the section unpins and normal vertical scrolling resumes into the next section
(TechStackNew). This adds the modern, tactile scroll feel common to high-end portfolios
while reusing the existing card markup and content. The horizontal behavior is
desktop-only — the section stays fully responsive and degrades to the current vertical
stack on tablet/mobile.

## Depends on
- The Forge project (4th card) added in the previous commit. The horizontal reveal is only
  meaningful with more than three cards — with exactly three there is nothing to scroll to.
- No other feature-step dependency.

## Components
- **Modify:** `src/components/Work.tsx` — keep the heading and footer in normal document
  flow. Wrap the card list in a pinned viewport (`.work-pin`) containing a horizontal flex
  track (`.work-track`). Replace the current single fade/stagger `useEffect` with a
  `gsap.matchMedia()` block that, on desktop only, pins `.work-pin` and scrubs the track's
  `x` from 0 to `-(track.scrollWidth - pin.clientWidth)`. Keep the existing card JSX
  (image, content, tags, visit button) unchanged — only the wrapping containers change.

## Three.js / R3F (if applicable)
No 3D work.

## Animation
- GSAP `ScrollTrigger` with `pin: true`, `scrub: 1`, `anticipatePin: 1`.
- `trigger: .work-pin`, `start: "top top"`, `end: () => "+=" + (track.scrollWidth - pin.clientWidth)`
  so the vertical scroll distance equals the horizontal travel distance (1:1, no dead zone).
- Tween: `gsap.to(".work-track", { x: () => -(track.scrollWidth - pin.clientWidth), ease: "none" })`.
- Wrap the whole setup in `gsap.matchMedia()` so behavior is fully responsive and each
  branch cleans itself up on breakpoint change:
  - `(min-width: 1025px)` — desktop: horizontal pin + scrub (the gallery behavior above).
  - `(max-width: 1024px)` — tablet/mobile: **no pin**, no horizontal tween. Apply the
    existing fade-in stagger on `.work-card` so the section keeps its current vertical
    behavior. Never leave a pin spacer active below 1025px.
- matchMedia automatically reverts the desktop tween/pin (and any inline `x` transform on
  `.work-track`) when the viewport crosses below 1025px, so resizing from desktop to mobile
  must not leave the track shifted or the section stuck.
- Lenis already drives native scroll, so ScrollTrigger receives scroll events without a
  scrollerProxy. Add `lenis.on("scroll", ScrollTrigger.update)` (importing `lenis` from
  `../Navbar`, the existing export) inside the effect for frame-tight sync between Lenis
  smoothing and the scrub, and remove the listener on cleanup.
- Call `ScrollTrigger.refresh()` after images/layout settle and on resize (matchMedia
  handles the breakpoint teardown automatically). Clean up all triggers/tweens in the
  effect's return.

## Config changes (`src/config.ts`)
- Reorder the `projects` array so the **Forge** project is the first element (currently last,
  `id: 4`). Cards render in array order via `config.projects.map`, so moving the Forge object
  to the top of the array makes it the first visible card. Leave the `id` values as they are
  (they are only React keys) — only the array order changes; do not edit any other project's
  content.

## CSS
- **Modify:** `src/components/styles/Work.css`
  - Add `.work-pin` — full-bleed horizontal viewport: `overflow: hidden; width: 100%;`
    (height driven by content / cards). Sits outside `.section-container` so the track can
    use the full window width while cards still align to the container via track padding.
  - Add `.work-track` — `display: flex; flex-wrap: nowrap; gap: 20px;` with left/right
    padding matching the section gutter so the first card lines up under the heading.
    `will-change: transform;`.
  - Give `.work-card` a fixed flex basis so exactly three fit in view:
    `flex: 0 0 calc((min(1300px, 100vw) - gutters - 2*gap) / 3)` (use the same container
    widths already defined in `App.css`: 1300/1200/900). `width` no longer comes from grid.
  - Keep the old `.work-grid` rules only if still referenced; otherwise repurpose to
    `.work-track`. Do not delete unrelated card styling.
  - **Responsive — three tiers (match the breakpoints already in `App.css`):**
    - `> 1024px` (desktop): horizontal flex track, three cards in view (fixed flex basis as
      above), `.work-pin { overflow: hidden; }`.
    - `769px–1024px` (tablet): disable the horizontal track — `.work-track` becomes a 2-up
      vertical grid/stack (`flex-direction: column;` or `grid` of 2), `.work-card`
      `flex: 1 1 auto; width: 100%;`, `.work-pin { overflow: visible; }`. Mirrors the
      pre-existing 2-column tablet layout.
    - `≤ 768px` (mobile): single-column stack — `.work-track { flex-direction: column; }`,
      `.work-card { width: 100%; }`, `.work-pin { overflow: visible; }`, reduced image
      height as today.
    These CSS tiers must align with the `gsap.matchMedia()` cutover at 1025px so layout and
    animation never disagree (no horizontal track without the pin, and vice versa).
- Rules: use `var(--accentColor)` and existing CSS variables only — never hardcode hex.

## Files to change
- `src/components/Work.tsx`
- `src/components/styles/Work.css`

## Files to create
None.

## New packages
No new packages — `gsap`, `gsap/ScrollTrigger`, and `lenis` are already installed and used.

## Implementation rules
- No hardcoded hex values — use `var(--accentColor)` and CSS variables from `index.css`.
- TypeScript strict — no `any` unless justified with a comment.
- GSAP for all scroll-triggered animations, not CSS keyframes.
- Keep existing variable names and component structure; reuse the existing card JSX verbatim.
- Targeted edits only — never rewrite entire files.
- Mobile (`max-width: 768px`) must fall back to the current vertical stack with no pin.
- All ScrollTriggers, tweens, and the Lenis scroll listener must be cleaned up on unmount
  to avoid duplicate pins on hot-reload / route changes.

## Definition of done
- [ ] On desktop (`npm run dev`, wide viewport), the My Work section initially shows exactly
      three cards, with **Forge as the first (leftmost) card**.
- [ ] Scrolling down pins the section and moves the cards horizontally to the left, revealing
      the remaining card(s) one at a time.
- [ ] After the last card is fully revealed, the section unpins and vertical scrolling
      continues smoothly into the TechStackNew section — no jump, gap, or overlap.
- [ ] The horizontal motion is scrubbed to scroll position (scrubs both directions) and feels
      smooth with Lenis, not janky.
- [ ] Resizing the window keeps the gallery aligned (ScrollTrigger refreshes; three cards
      still fit).
- [ ] On tablet (769–1024px), cards show in the 2-up vertical layout with no pin.
- [ ] On mobile (`max-width: 768px`), cards stack in a single column with the fade-in stagger
      and no pinning — identical to current behavior.
- [ ] Resizing across the 1025px boundary in either direction cleanly switches between
      horizontal-pinned and vertical layouts with no leftover transform, spacer, or stuck pin.
- [ ] No console errors; no duplicated/stuck pin spacer after hot-reload.
