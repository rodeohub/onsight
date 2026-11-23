# Changelog

Versions follow semantic versioning: MAJOR for changes that can break projects (a role renamed or removed), MINOR for new roles, tokens or docs, PATCH for fixes. Projects install a tagged version, e.g. `npm install @slacklineinternational/onsight@0.16.0` (or from GitHub: `npm install github:rodeohub/onsight#v0.16.0`), and upgrade on purpose.

## Unreleased
- Dev only, nothing changes for projects: Storybook with the accessibility addon and stories for Button, Badge, Alert, TextField and Card (`npm run storybook`, `npm run test:stories`). Storybook is online at /storybook/ on the GitHub Pages site. CI has a new `stories` job and `main` is protected. The npm package is unchanged (`files` keeps dev tools out).

## 0.18.0 (2026-11-22)
- New: `npx onsight-init`. Run it in a project root after installing. It adds a marked Onsight section to the project's `AGENTS.md` (created if missing) that points agents to the installed package's `AGENTS.md`, docs and CHANGELOG, and links `AGENTS.md` from `CLAUDE.md`. Running it again only replaces its own section. `--dry-run` shows the changes first.
- `onsight-audit`: every finding now says what to use instead (a role for colors, the nearest token or Tailwind class for sizes).
- `onsight-audit`: new warnings for raw spacing, border radius and font sizes in CSS and for Tailwind values in brackets (`p-[13px]`, `text-[15px]`). Values of 2px or less are ignored. Warnings do not fail the audit unless you add `--strict`; colors still fail as before, so projects that passed still pass.
- `onsight-audit`: file paths print correctly on Windows.
- `npm run check` audits Onsight's own components with `--strict`.

## 0.17.4 (2026-11-15)
- First release published with npm trusted publishing (no token). Same content as 0.17.1 to 0.17.3.

## 0.17.3 (2026-11-15, not on npm)
- Fix: the trusted publishing setup. Not published: the preview page in `dist/` still showed the old version number.

## 0.17.2 (2026-11-15, not on npm)
- Publishing uses npm trusted publishing: GitHub publishes without a token. Nothing changes for projects.
- The placeholder version `0.0.0-stage` on npm is marked as deprecated.

## 0.17.1 (2026-11-15)
- Preview page: logos grouped into "ISA logo" and "Commission logos" (Education, Safety, Sport, Nature and Access), each in color and white.

## 0.17.0 (2026-11-15)
- **Logos:** new ISA Sport (`assets/logos/sport/`) and ISA Access (`assets/logos/access/`, Nature and Access Commission), in color, black, grey and white.
- Education and Safety replaced with Roberto's redrawn versions. All four commission logos now share one artwork and one size (567 x 328); file names are unchanged.
- Preview page and `assets/logos/README.md` list the new logos (minimum height 48px, like the other commission logos).

## 0.16.0 (2026-11-15)
- **Breaking:** the package is now `@slacklineinternational/onsight`, published on npm. Install with `npm install @slacklineinternational/onsight` and change imports from `onsight/...` to `@slacklineinternational/onsight/...` (for example `@slacklineinternational/onsight/react`, `@slacklineinternational/onsight/tailwind.css`).
- Every GitHub release now publishes to npm automatically (`.github/workflows/publish.yml`), with provenance.

## 0.15.0 (2026-11-15)
**Onsight is the official name** of the ISA design system (Roberto, 2026-11-15).
- **Breaking:** the package is now `onsight`. Change imports from `isa-design-system/...` to `onsight/...` (for example `onsight/react`, `onsight/tailwind.css`).
- The repository becomes `rodeohub/onsight` (install: `npm install github:rodeohub/onsight#v0.15.0`). GitHub forwards the old address.
- The audit command is `onsight-audit`; `isa-audit` still works.
- Unchanged: class and variable names keep the prefix `isa-`.

## 0.14.0 (2026-11-15)
- The design system has a name: **Onsight**. Display name only; the package name, the repository and the `isa-` prefixes do not change.
- Preview page: the ISA wide logo at the top; the color roles are grouped (text, surfaces, borders and focus, buttons and actions, form fields, selected and small parts, status, categories, brand) with jump links.
- The preview page is online: https://rodeohub.github.io/onsight/ (GitHub Pages, from `main`). `index.html` at the root forwards to `dist/preview.html`.

## 0.13.2 (2026-11-14)
- Logo rules in `assets/logos/README.md` and on the preview page: minimum sizes, clear space, which shape and variant to use, what not to do. Based on the ISA CD Manual.

## 0.13.1 (2026-11-14)
- Preview page (`dist/preview.html`): table of contents (side bar on wide screens, a "Contents" box on phones), a "Back to top" button, and new sections before the components: Principles, Brand colors (with scales and category colors), Logos, Typography, Spacing and shape.
- Education color logo corrected to the official colors.

## 0.13.0 (2026-11-14)
- **Logos** added in `assets/logos/`: ISA (default, wide, minimal), Education, Safety and the certification marks (instructor, judge, rigger), as SVG in color, black, grey and white. Not covered by the MIT License. Which variant to use where: `assets/logos/README.md`.

## 0.12.1 (2026-11-14)
- Dark mode: header and footer are deep green (`surface.brand` = green 900 in the dark theme).

## 0.12.0 (2026-11-14)
- **Dark mode.** New theme `tokens/semantic/themes/dark.json`; every contrast pair is checked in both themes. Set `data-theme="dark"` on `<html>`, or `data-theme="system"` to follow the device. Pages without `data-theme` stay light.
- Theme switch: `data-isa-theme-toggle` buttons (handled by `dist/isa.js`, choice remembered), `setTheme` and `isDark`, React `ThemeToggle` and `useTheme`. New class `isa-header__button` for icon buttons in the header.
- New role `surface.raised` for dialogs, drawers, the autocomplete list and elevated cards (same as the page in light, one step lighter in dark).
- Fix: themes are now written after the light theme in `dist/tokens.css`, so they can override it.

## 0.11.0 (2026-11-14)
- **Footer** is now green like the header (`surface.brand`, white text and links, white focus ring). It was light gray. No markup change.

## 0.10.1 (2026-11-14)
- `examples/sporthub-rankings.html`: a full example page (a mock of the Sport Hub rankings page with placeholder data) built only from the system. `scripts/standalone-example.mjs` writes a single-file copy for sharing.
- Docs: Barlow and Barlow Condensed are also the fonts for print and slides.

## 0.10.0 (2026-11-14)
- Tailwind: short class names for text, surface and border roles (`text-muted`, `bg-subtle`, `border-strong`); the long names (`text-text-muted`) keep working. Text styles as one class each: `type-h1` to `type-h4`, `type-display`, `type-body`, `type-body-sm`, `type-label`, `type-button`, `type-badge`. `ease-standard`.
- New tokens: `border-width.thin` and `thick`, `icon.sm` to `xl`, `opacity.muted`, `easing.standard`. Components use `border-width.thin`.
- `npm run test:tailwind` compiles the theme with the real Tailwind v4 (also in CI).

## 0.9.0 (2026-11-14)
- The last three components from the Slackline Sport Hub, adapted: **Autocomplete** (keyboard and screen reader support), **Filters** (the filter row above a table) and **Page layout** (`Page`, `Main`, `Container`, `PageTitle`, `Hero`).
- `dist/isa.js` also handles autocomplete fields and the filters toggle.
- New tokens `z.dropdown`, `size.content-narrow`, `size.hero-min`, `size.hero-max`, `size.dropdown-max`, `size.filter-min`, `size.filter-max`.

## 0.8.0 (2026-11-14)
- New components that the Slackline Sport Hub does not have: **Breadcrumbs**, **Empty state** and **Toast** (CSS classes and React: `Breadcrumbs`, `EmptyState`, `ToastProvider`, `useToast`).
- `dist/isa.js` exports `showToast` and handles `data-isa-toast` buttons.
- New tokens `z.toast`, `size.toast-max`, `size.empty-max`.

## 0.7.0 (2026-11-14)
- New components, extracted from the Slackline Sport Hub and adapted: **Drawer**, **Avatar**, **Header, Nav, Footer and SkipLink**, and **Pagination**.
- The header switches between a link bar and a menu drawer at 768px in CSS.
- New role `surface.brand-strong`; new sizes for drawer and avatar.

## 0.6.0 (2026-11-14)
- New components, extracted from the Slackline Sport Hub and adapted: **Card** (with card grid), **Table** (presentation only; sorting and paging stay in the project), **Spinner** and **Tooltip**.
- `dist/isa.js` also handles tooltips (Escape, staying inside the screen).
- New roles `table.*`, `tooltip.*`, `spinner.*`; new tokens `z.sticky`, `z.tooltip` and sizes for spinner, tooltip and cards. New utility class `isa-visually-hidden`.

## 0.5.0 (2026-11-14)
- New components, extracted from the Slackline Sport Hub and adapted: **Tabs** (underline, large, pill, and links for page navigation) and **Dialog** (built on the native `<dialog>`).
- `dist/isa.js`: a small script for plain HTML pages that makes tabs and dialogs work. React projects use `Tabs` and `Dialog` from `isa-design-system/react`.
- New roles `selected.*` and `overlay.backdrop`; new tokens `shadow.md`, `shadow.lg`, `size.dialog-max`.
- `docs/sporthub-differences.md`: what the Sport Hub would need to change to match the system.

## 0.4.0 (2026-11-14)
- New components, extracted from the Slackline Sport Hub and adapted: **Alert** and **form fields** (label, help and error text, text input, text area, select, checkbox, radio, fieldset). CSS classes plus React components (`Alert`, `TextField`, `TextArea`, `SelectField`, `Checkbox`, `Radio`, `Fieldset`).
- New `field.*` color roles with checked contrast pairs.

## 0.3.0 (2026-11-14)
- First components, extracted from the Slackline Sport Hub and adapted: **Button** and **Badge**. Plain CSS in `dist/components.css` (classes `isa-button`, `isa-badge`) and React wrappers in `isa-design-system/react`.
- New button roles: neutral, ghost, danger-secondary, and active states. New token `size.control-sm`.
- `dist/preview.html` now shows live component examples.
- 60 more contrast pairs checked (button states, badges on light surfaces).
- `npm run check` also audits `components/`; `npm run test:react` checks the React output.

## 0.2.0 (2026-11-14)
- Green 600 changed to `#00827E` (AA with white text). Primary buttons use green 600; links stay green 700.
- Badge (category) colors: new red and green, different from the ISA red and green used for errors and success; added violet; added `brand` (ISA green) for ISA-specific badges.
- Focus ring for dark and brand surfaces: `border.focus-inverse`.
- Fonts are self-hosted: files ship in `dist/fonts/`, no requests to Google.
- `isa-audit` (run with `npx isa-audit <folder>`) now also finds Tailwind palette classes, named colors, modern color functions and primitive tokens, and ignores comments.
- Tailwind breakpoints fixed (they did not work in 0.1.0).
- LICENSE added: MIT, excluding the ISA name and logos; fonts under the SIL Open Font License.
- Accessibility wording corrected (AA vs house rules).

## 0.1.0 (2026-11-14)
- First version: official ISA palette, Barlow Condensed and Barlow, semantic color roles, contrast check, audit script, docs and agent instructions.
