# Spec: Links Change

## Overview
Replace all hardcoded social/contact URLs and email in `src/config.ts` that belong to the previous developer (Redoyanul Haque) with Prahar's actual profile links. No text, labels, descriptions, or component structure is touched — only the URL and email string values inside `config.contact` and `config.social`. This is a prerequisite for every other feature that exposes links publicly (sidebar, contact section, resume button).

## Depends on
No dependencies.

## Components
- `src/components/SocialIcons.tsx`: Remove Instagram, Twitter, and Facebook icon slots entirely. Add appropriate icons for LeetCode and Codeforces.

## Three.js / R3F
No 3D work.

## Animation
No animations.

## Config changes (`src/config.ts`)
Update the following fields **only** — do not touch any other field:

| Field | Old value | New value |
|---|---|---|
| `social.github` | `"red1-for-hek"` | `"cyrotine"` |
| `social.email` | `"redoyanul1234@gmail.com"` | `"praharshah2005@gmail.com"` |
| `contact.email` | `"redoyanul1234@gmail.com"` | `"praharshah2005@gmail.com"` |
| `contact.github` | `"https://github.com/red1-for-hek"` | `"https://github.com/cyrotine"` |
| `contact.linkedin` | `"https://linkedin.com/in/red1-for-hek"` | `"https://www.linkedin.com/in/prahar-shah-b81b7a311/"` |
| `contact.twitter` | `"https://x.com/red_1_ul"` | *(Completely remove key)* |
| `contact.instagram` | `"https://www.instagram.com/red_1_ul"` | *(Completely remove key)* |
| `contact.facebook` | `"https://www.facebook.com/redoyanulhaque.hacker.official"` | *(Completely remove key)* |

**Extra links to add** (new fields in `config.contact`):

```ts
leetcode: "[https://leetcode.com/u/prahar_0526/](https://leetcode.com/u/prahar_0526/)",
codeforces: "[https://codeforces.com/profile/prahar_0526](https://codeforces.com/profile/prahar_0526)",
```

> Note: `SocialIcons.tsx` currently renders GitHub, LinkedIn, Twitter, Instagram. Completely remove Twitter, Instagram, and Facebook slots, and replace them with LeetCode and Codeforces links with their appropriate icons.

## CSS
No CSS changes.

## Files to change
- `src/config.ts`
- `src/components/SocialIcons.tsx`

## Files to create
None.

## New packages
No new packages.

## Implementation rules
- Targeted edits only — never rewrite entire files
- Change URL/email string values only; do not alter any key names (other than removing the social keys mentioned above), comments, or surrounding structure
- TypeScript strict — no `any`
- Do not change any display text, descriptions, or labels anywhere in the codebase

## Definition of done
- [ ] `config.contact.github` opens `https://github.com/cyrotine` in a new tab from the sidebar
- [ ] `config.contact.linkedin` opens Prahar's LinkedIn profile from the sidebar
- [ ] `config.contact.email` and `config.social.email` both equal `praharshah2005@gmail.com`
- [ ] No link in the rendered app points to any `red1-for-hek`, `redoyanul`, or `red_1_ul` URL
- [ ] Instagram, Facebook, and Twitter links and icons are completely removed from the UI and config
- [ ] `config.contact.leetcode` and `config.contact.codeforces` are present in the config and rendered with their appropriate icons in the UI
- [ ] `npm run dev` builds without TypeScript errors