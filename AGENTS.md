# AGENTS.md: Onsight

You are working with **Onsight**, the official design system of the International Slackline Association (ISA). Call it Onsight in code comments, docs, commit messages and pull requests. The npm package is `@slacklineinternational/onsight`; classes and variables keep the prefix `isa-`. Read this file first. It is short on purpose: open the linked doc for the area you are about to change, not all of them.

## Rules (always)
1. **Use semantic tokens only.** Colors come from `--isa-color-<role>` (or the Tailwind classes built from them, e.g. `bg-action-primary-bg`, `text-muted`, `bg-subtle`, `border-strong`; text styles as `type-h1`, `type-body`). Never write hex, rgb or hsl values, and never use primitive tokens (`--isa-color-green-700`) in a project. If no role fits, stop and propose a new role in this repo instead of inventing a value.
2. **WCAG 2.2 AA minimum.** Normal text 4.5:1, large text (24px+ or 18.66px+ bold) and UI parts 3:1, visible focus ring on everything interactive (`border.focus`, or `border.focus-inverse` on dark and brand surfaces), links in text underlined. House rule, stricter than AA: touch targets at least 44px. The roles are pre-checked; mixing roles that are not listed in `tokens/contrast-pairs.json` is not.
3. **Fonts:** Barlow Condensed for headings 20px and up, Barlow for everything else. Body text at least 16px on phones.
4. **Mobile first.** Every screen must work at 360px wide. Many ISA users are on phones.
5. **Native HTML first:** real `<button>`, `<a href>`, `<label>` + `<input>`. No clickable divs. Every page starts with a skip link and has one `<main id="main">` (use the page layout: `docs/components/page.md`).
6. **Reuse before you create.** Check `docs/components/` for an existing component or pattern. Use the `isa-*` classes (or the React components) for buttons, badges, alerts, form fields, tabs, dialogs, cards, tables, spinners, tooltips, drawers, avatars, the page header and footer, pagination, breadcrumbs, empty states, toasts, autocomplete, filters and the page layout instead of styling your own. New patterns need a human decision; note them in your PR.
7. **Brand red and green 500 are for logos, large display text and decoration**, not small text or small buttons on white. Logos come from `assets/logos/` unchanged: never redraw or recolor one; use the white variant on green and dark surfaces, and keep the minimum sizes and clear space in `assets/logos/README.md`.
8. **Light and dark themes.** Roles change with the theme (`data-theme` on `<html>`), so never hard-code colors and check your UI in both. Things that float (menus, popovers) use `surface.raised`. See `docs/foundations/theming.md`.
9. **Before you say you are done** in a project: run `npx onsight-audit <your src folder>` (zero errors: no hard-coded colors; fix the warnings for raw spacing, radius and font sizes where you can; each finding says what to use instead) and check your UI at 360px, in light and dark.

## Where things are
| Need | File |
| --- | --- |
| Why things are the way they are, open questions | `DECISIONS.md` |
| Color roles, brand colors, category and status colors | `docs/foundations/color.md` |
| Fonts and text styles | `docs/foundations/typography.md` |
| Spacing, radius, breakpoints, layout | `docs/foundations/layout.md` |
| Accessibility rules | `docs/foundations/accessibility.md` |
| Themes and dark mode architecture | `docs/foundations/theming.md` |
| Components: Button, Badge, Alert, form fields, Tabs, Dialog, Card, Table, Spinner, Tooltip, Drawer, Avatar, Header/Nav/Footer, Pagination, Breadcrumbs, Empty state, Toast, Autocomplete, Filters, Page layout (list, how to add more) | `docs/components/README.md` |
| A full example page to model new pages on | `examples/sporthub-rankings.html` |
| Component styles and live examples | `components/*.css`, `components/*.examples.html` |
| Storybook (component states, accessibility tests): `npm run storybook`, `npm run test:stories` | `stories/`, `.storybook/` |
| React components | `react/` (`import { Button, Badge, Alert, TextField, ... } from "@slacklineinternational/onsight/react"`) |
| What differs from the Slackline Sport Hub (for its developers) | `docs/sporthub-differences.md` |
| Figma library (a mirror of this repo) | `docs/figma.md` |
| Logos (SVG): variants, minimum sizes, clear space, rules | `assets/logos/README.md` |
| Token sources (edit these) | `tokens/` |
| Built outputs (never edit by hand) | `dist/tokens.css`, `dist/tailwind.css`, `dist/tokens.json`, `dist/fonts.css`, `dist/components.css`, `dist/isa.js`, `dist/preview.html` (all decisions and components on one page; online at https://rodeohub.github.io/onsight/) |

## Using it in a project
- Tailwind v4: `@import "@slacklineinternational/onsight/fonts.css"; @import "@slacklineinternational/onsight/tailwind.css"; @import "@slacklineinternational/onsight/components.css" layer(components);`
- Plain HTML: load `dist/fonts.css`, `dist/tokens.css`, `dist/components.css` and, for tabs, dialogs, drawers, tooltips, toasts, autocomplete, filters and the theme switch, `dist/isa.js` as a module script; then use `var(--isa-color-text-default)` etc.
- Install: `npm install @slacklineinternational/onsight`, then `npx onsight-init` in the project root. It adds a short Onsight section to the project's `AGENTS.md` (and links it from `CLAUDE.md`) so every agent session starts with these rules; run it again after upgrading. (or a tagged version straight from GitHub: `npm install github:rodeohub/onsight#v0.18.0`; the repo will move to the `slacklineinternational` GitHub account). Check `CHANGELOG.md` before upgrading.

## Changing the system (in this repo)
1. Edit `tokens/` (DTCG JSON) or `components/`, and the matching doc in `docs/`.
2. Add any new color pairing to `tokens/contrast-pairs.json`.
3. Run `npm run check` (builds `dist/`, fails below AA, audits `components/`) and look at `dist/preview.html`. Commit `dist/` with the change.
4. Record decisions in `DECISIONS.md`. Brand-value changes need Roberto's OK.
5. Releases: bump `version` in package.json (semantic versioning, see `CHANGELOG.md`), add a CHANGELOG entry, then tag `vX.Y.Z` and push the tag.
6. Writing style for docs: plain, concise, no em dashes.
7. React components: add or update the story in `stories/<Component>.stories.jsx` (one story per state, including disabled, long text and dark mode) and run `npm run test:stories`; accessibility violations fail it. Stories exist only for Button, Badge and Alert so far; do not write the others until Roberto says so.
