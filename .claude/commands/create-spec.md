---
description: Create a spec file and feature branch for the next portfolio feature
argument-hint: Step number and feature name e.g. 2 black-hole-hero
allowed-tools: Read, Write, Glob, Bash(git:*)
---

You are a senior frontend engineer building Prer's personal portfolio — a React 18 + Vite + TypeScript + Three.js (R3F) single-page app. Always follow the rules in CLAUDE.md.

User input: $ARGUMENTS

---

## Step 1 — Check working directory is clean

Run `git status`. If there are any uncommitted, unstaged, or untracked changes, stop immediately and tell the user to commit or stash them before proceeding. DO NOT CONTINUE until the working directory is clean.

---

## Step 2 — Parse the arguments

From $ARGUMENTS extract:

- **step_number** — zero-padded to 2 digits: `2 → 02`, `11 → 11`
- **feature_title** — human-readable title in Title Case  
  Example: `"Black Hole Hero"` or `"Projects Section"`
- **feature_slug** — git and file-safe slug  
  Lowercase, kebab-case. Only `a-z`, `0-9`, `-`. Max 40 chars.  
  Example: `black-hole-hero`, `projects-section`
- **branch_name** — format: `feature/<feature_slug>`

If you cannot infer these from $ARGUMENTS, ask the user to clarify before proceeding.

---

## Step 3 — Check branch name is not taken

Run `git branch` to list existing branches. If `branch_name` is already taken, append a number: `feature/black-hole-hero-01`, `feature/black-hole-hero-02`, etc.

---

## Step 4 — Switch to main and pull latest

```
git checkout main
git pull origin main
```

---

## Step 5 — Create and switch to the feature branch

```
git checkout -b <branch_name>
```

---

## Step 6 — Research the codebase

Read these files before writing the spec:

- `CLAUDE.md` — design direction, stack, active work, rules
- `src/config.ts` — all site content (name, projects, skills, links)
- `src/App.tsx` — component tree and routing
- `src/index.css` — CSS variables and global styles
- All files in `.claude/specs/` — avoid duplicating existing specs

Check CLAUDE.md to confirm the requested feature is not already marked complete. If it is, warn the user and stop.

---

## Step 7 — Write the spec

Generate a spec document with this exact structure:

---

### Spec: \<feature_title\>

#### Overview
One paragraph describing what this feature does and why it exists in the portfolio.

#### Depends on
Which previous feature steps must be complete first. If none: state "No dependencies."

#### Components
Every new or modified React component:
- **Create:** `src/components/Foo.tsx` — what it renders
- **Modify:** `src/components/Bar.tsx` — what changes and why
If none: state "No component changes."

#### Three.js / R3F (if applicable)
Any new meshes, shaders, postprocessing passes, physics bodies, or R3F hooks needed. Describe the scene graph structure. If not applicable: state "No 3D work."

#### Animation
GSAP scroll triggers, Lenis hooks, or R3F `useFrame` animations required. If none: state "No animations."

#### Config changes (`src/config.ts`)
Any new fields, arrays, or types to add. Always verify against the current file before writing this. If none: state "No config changes."

#### CSS
- **Create:** new stylesheet paths
- **Modify:** existing stylesheets and what changes  
Rules: use `var(--accentColor)` and existing CSS variables only — never hardcode hex values.

#### Files to change
Every file that will be modified (relative path).

#### Files to create
Every new file that will be created (relative path).

#### New packages
Any new npm packages required. Each must be pre-approved per CLAUDE.md — if uncertain, flag it. If none: state "No new packages."

#### Implementation rules
Constraints Claude must follow. Always include:
- No hardcoded hex values — use `var(--accentColor)` and CSS variables from `index.css`
- TypeScript strict — no `any` unless justified with a comment
- GSAP for all scroll-triggered animations, not CSS keyframes
- Keep existing variable names and component structure
- Targeted edits only — never rewrite entire files
- Mobile fallback required for any 3D canvas (static image or simplified version)

#### Definition of done
A specific, testable checklist. Each item must be verifiable by running `npm run dev` and observing the app in a browser:
- [ ] Example: Hero section renders the black hole canvas at full viewport height
- [ ] Example: Accretion disk particles respond to mouse movement
- [ ] Example: Mobile viewport shows fallback image, not the canvas

---

## Step 8 — Save the spec

Save to: `.claude/specs/<step_number>-<feature_slug>.md`

---

## Step 9 — Report to the user

Print a short summary in this exact format:

```
Branch:    <branch_name>
Spec file: .claude/specs/<step_number>-<feature_slug>.md
Title:     <feature_title>
```

Then tell the user: "Review the spec at `.claude/specs/<step_number>-<feature_slug>.md` then enter Plan Mode with **Shift+Tab twice** to begin implementation."

Do not print the full spec in chat unless explicitly asked.