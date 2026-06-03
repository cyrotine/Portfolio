# Portfolio — Prer's Personal Site

## Stack
- React 18 + Vite + TypeScript
- Three.js via @react-three/fiber, @react-three/drei, @react-three/rapier, @react-three/postprocessing
- GSAP + Lenis (animations + smooth scroll)
- React Router DOM
- Deployed on Vercel

## Design Direction
- Dark & minimal — dev aesthetic
- Color palette: near-black bg (`#0b080c`), white/light-gray text, accent purple `#a855f7` (already set as `--accentColor` in index.css)
- No clutter. Let whitespace and 3D do the work.

## Active 3D Work
- Replacing the human Character model (`src/components/Character/`) with an interactive black hole
- Black hole uses @react-three/fiber + @react-three/postprocessing (Bloom already installed)
- Mouse interaction: accretion disk particles react to cursor, gravitational pull effect
- Mobile fallback: static image (same pattern as existing `.mobile-photo`)

## Sections
1. Hero — 3D black hole canvas + name + one-liner + CTA
2. Projects — VeriFlow, SmartMeet, CP achievements (update `src/config.ts`)
3. Skills — languages, tools, frameworks (update `src/config.ts`)
4. Resume — downloadable PDF link
5. Contact — minimal form or just links

> Note: `src/config.ts` still contains the previous developer's data (Redoyanul Haque).
> All personal content (name, bio, projects, social links) must be updated there before deploying.

## Rules
- Never rewrite entire files — make targeted edits only
- Keep existing variable names and component structure
- Don't add new npm packages without asking
- TypeScript strict — no `any` unless justified
- GSAP for all scroll-triggered animations, not CSS keyframes
- Accent color is always `var(--accentColor)` — never hardcode hex values in components