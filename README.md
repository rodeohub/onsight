# Onsight

**Onsight is the official design system of the International Slackline Association (ISA).** To onsight a line is to walk it clean on the first try.

npm package: `@slacklineinternational/onsight`. Repository: `rodeohub/onsight`. Class and variable names keep the prefix `isa-` (`isa-button`, `--isa-color-text-default`), because they stand for the ISA.

Design tokens, guidelines and components for projects of the [International Slackline Association](https://slacklineinternational.org): web apps such as the Slackline Sport Hub, websites and future tools. It is written for people and for AI coding agents (Claude Code and others).

- **Agents:** start with [AGENTS.md](AGENTS.md).
- **People:** start with [DECISIONS.md](DECISIONS.md), then [docs/](docs/).
- **Preview:** <https://rodeohub.github.io/onsight/> shows all decisions and every component on one page (the same file as `dist/preview.html`).

## What is in here
- `tokens/`: the source of truth (close to the W3C Design Tokens format, simplified). Primitive values (official ISA palette, type, spacing) and semantic roles (text, surface, border, action, status, category).
- `dist/`: generated CSS variables, a Tailwind v4 theme, resolved JSON and a preview page.
- `components/`, `react/`: component styles (plain CSS), live examples and React wrappers.
- `docs/`: how and when to use each foundation and component.
- `scripts/`: build, contrast check (WCAG AA) `onsight-audit` (also `isa-audit`), which finds colors and sizes in a project that bypass the system and says what to use instead, and `onsight-init`, which connects a project's agent instructions to Onsight.
- `fonts/`: Barlow and Barlow Condensed, self-hosted.
- Licence: MIT, except the ISA name and logos (see LICENSE).

## Commands
```
npm run build   # tokens/ -> dist/
npm run check   # build + fail if any promised color pair is below WCAG AA
node scripts/audit.mjs ../some-project/src   # find hard-coded colors (errors) and raw sizes (warnings) in a project
npm install            # first time only: installs the dev tools (Storybook, tests)
npm run storybook      # component workshop at http://localhost:6006 (light/dark switch, accessibility panel)
npm run test:stories   # renders every story in a browser and fails on accessibility violations
```

In a project: `npm install @slacklineinternational/onsight`, then `npx onsight-init` (connects the project's AGENTS.md and CLAUDE.md to Onsight) and `npx onsight-audit src` (add `--strict` to fail on warnings too).
The published package has no dependencies (Node 18+). Storybook, Vitest and Playwright are dev tools only: they are not in the npm package, and the token build (`scripts/build.mjs`) still needs nothing installed. Use a current Node (22) for Storybook.

## Status
Version 0.18: foundations plus the component families in `docs/components/README.md`, with React wrappers in `react/`. Storybook is set up (since 2026-11-23); stories exist for Button, Badge and Alert so far, the other React components follow when Roberto gives the go-ahead. Storybook is online at https://rodeohub.github.io/onsight/storybook/ (rebuilt on every merge to main by `.github/workflows/pages.yml`) and runs locally with `npm run storybook`. See `DECISIONS.md` for open questions. Maintainers: Roberto de Oliveira, with Can Sahin and Muhammad Martinez.
