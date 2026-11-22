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
```

In a project: `npm install @slacklineinternational/onsight`, then `npx onsight-init` (connects the project's AGENTS.md and CLAUDE.md to Onsight) and `npx onsight-audit src` (add `--strict` to fail on warnings too).
No dependencies; Node 18+.

## Status
Version 0.7: foundations plus 14 component families (see `docs/components/README.md`). More are extracted from the Slackline Sport Hub one at a time. Maintainers: Roberto de Oliveira, with Can Sahin and Muhammad Martinez.
