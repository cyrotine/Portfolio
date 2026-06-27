# Spec: Responsive CSS

## Overview
A dedicated responsive pass across every section of the portfolio. The goal is to audit and fix all viewport-specific layout issues so the site looks polished from 320px (iPhone SE) through 1920px+ (wide monitor). Specific problems to solve: WhatIDo accordion bleeds horizontally on mid-range tablets, the social icons bar on mobile overlaps section content, the custom cursor fires on touch devices (where it's invisible), and a handful of sections have hardcoded pixel widths that overflow on small phones.

## Depends on
No dependencies. All three prior specs (01, 02, 03) should be complete first for accurate visual review, but this spec can proceed independently since it only touches CSS.

## Components
- **Modify:** `src/components/Cursor.tsx` — add a check: if `matchMedia('(pointer: coarse)')` is true (touch device), skip rendering the cursor entirely so `cursor: none` doesn't fire on mobile.

## Three.js / R3F
No 3D work.

## Animation
No new animations. Existing GSAP scroll triggers may need `invalidateOnRefresh: true` (already present in Scene.tsx) — no change needed here.

## Config changes (`src/config.ts`)
No config changes.

## CSS

### Modify: `src/index.css`
- On `@media (pointer: coarse)` (touch devices) set `* { cursor: auto !important; }` so the invisible custom cursor does not block system cursor behavior on touch screens.
- On `@media (max-width: 768px)`, add `padding-bottom: 80px` to `body` to prevent the fixed social-icons bottom bar from overlapping the last section's content.

### Modify: `src/components/styles/WhatIDo.css`
- Remove the `margin-left: -50px` on `.what-box-in` at the `max-width: 1024px` breakpoint — this negative margin causes horizontal scrollbar bleed on tablets.
- At `max-width: 550px`, add `overflow: hidden` to `.whatIDO` and set `.what-content` to `width: 100%; max-width: 100%; box-sizing: border-box;` so cards never overflow the viewport.
- At `max-width: 400px`, reduce `.what-content h3` to `font-size: 20px` and `.what-content { padding: 20px; }` so accordion items remain readable on the smallest phones.

### Modify: `src/components/styles/style.css`
- At `max-width: 900px`, change `.section-container` to `width: var(--cWidth); max-width: 100%;` (remove the fixed `500px` width that overflows on narrow viewports like 375px where `var(--cWidth)` is ~345px but `500px` wins).

### Modify: `src/components/styles/Contact.css`
- At `max-width: 900px`, add `padding-bottom: 30px` to `.contact-section` on top of the existing `padding-bottom: 50px` to ensure contact links don't run under the mobile icons bar (total ~80px of bottom breathing room).

### Modify: `src/components/styles/Career.css`
- At `max-width: 600px`, add `overflow-x: hidden` to `.career-section` to prevent the absolutely-positioned timeline from triggering horizontal scroll.
- At `max-width: 400px`, reduce `.career-section h2` to `font-size: 34px; line-height: 36px` (currently 45px which is tight on 320px screens).

### Modify: `src/components/styles/Landing.css`
- At `max-width: 768px`, update `.mobile-photo` to show a static purple-tinted gradient placeholder in place of the character image (since no `blackhole-fallback.png` exists yet). Use a CSS `background` gradient on `.mobile-photo` with `var(--accentColor)` tones. The `<img>` inside can remain but will fallback gracefully to the gradient background if the asset is absent.
- At `max-width: 400px`, reduce `.landing-intro h1` to `font-size: 28px` and `.landing-h2-1` to `font-size: 20px` to prevent text wrap overflow on 320px width.

### Modify: `src/components/styles/TechStackNew.css`
- Add a `@media screen and (max-width: 400px)` block: `.techstack-content h2 { font-size: 28px; }` and `.techstack-item { width: 36px; height: 44px; padding: 4px; }` and `.techstack-item img { width: 18px; height: 18px; }`.

### Rules
- Use `var(--accentColor)` and `var(--backgroundColor)` only — never hardcode hex values in new CSS rules.
- No new stylesheets — all changes are targeted edits to existing files.

## Files to change
- `src/index.css`
- `src/components/Cursor.tsx`
- `src/components/styles/WhatIDo.css`
- `src/components/styles/style.css`
- `src/components/styles/Contact.css`
- `src/components/styles/Career.css`
- `src/components/styles/Landing.css`
- `src/components/styles/TechStackNew.css`

## Files to create
None.

## New packages
No new packages.

## Implementation rules
- No hardcoded hex values — use `var(--accentColor)` and CSS variables from `index.css`
- TypeScript strict — no `any` unless justified with a comment
- GSAP for all scroll-triggered animations, not CSS keyframes
- Keep existing variable names and component structure
- Targeted edits only — never rewrite entire files
- Mobile fallback required for any 3D canvas (already handled via `MainContainer.tsx` conditional render — no change needed)
- Only add rules at new or existing breakpoints; do not restructure existing selectors unless they cause a specific listed bug
- Test at: 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px, 1920px

## Definition of done
- [ ] On a 375px viewport (iPhone 14), no horizontal scrollbar appears anywhere on the page
- [ ] On a 320px viewport (iPhone SE), the WhatIDo section renders without cards overflowing the screen edge
- [ ] On a 768px viewport (iPad portrait), the WhatIDo `margin-left: -50px` no longer causes a scrollbar
- [ ] On any touch device (or Chrome DevTools "mobile" mode), the system cursor is visible (not hidden by `cursor: none`)
- [ ] On mobile (≤768px), the fixed social icons bar does not overlap the Contact section or CTA section content
- [ ] The Career section on a 320px viewport shows no horizontal overflow
- [ ] The `.section-container` utility class never exceeds viewport width on screens below 900px
- [ ] `npm run build` completes without TypeScript errors
- [ ] No console errors or warnings in the browser during normal mobile interaction