#!/usr/bin/env node
// onsight-init: connects a project to Onsight, the ISA design system, so AI coding agents follow it.
// Usage (in the project root, after npm install @slacklineinternational/onsight):
//   npx onsight-init            write or update the Onsight section in AGENTS.md, and point CLAUDE.md to it
//   npx onsight-init --dry-run  show what would change, change nothing
// Safe to run again after upgrading: it only replaces its own section (between the onsight markers)
// and never overwrites anything else.
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dry = process.argv.includes('--dry-run');
const cwd = process.cwd();
const pkg = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf8'));
const dir = `node_modules/${pkg.name}`;
const start = '<!-- onsight:start -->';
const end = '<!-- onsight:end -->';

if (!existsSync(join(cwd, 'package.json'))) {
  console.error('onsight-init: no package.json here. Run it in the project root.');
  process.exit(1);
}
const src = ['src', 'app', 'pages', 'components'].find((d) => existsSync(join(cwd, d)) && statSync(join(cwd, d)).isDirectory()) ?? '.';

const block = `${start}
<!-- Managed by npx onsight-init (${pkg.name} ${pkg.version}). Run it again after upgrading; it replaces only this section. Write project rules outside it. -->
## Design system: Onsight

This project uses **Onsight**, the design system of the International Slackline Association (ISA), from the npm package \`${pkg.name}\`.

- Before any UI work, read \`${dir}/AGENTS.md\` and follow its rules. It links to the doc for each area; open only the ones you need. The docs there match the installed version.
- Use Onsight's components (\`isa-*\` classes or the React components) and semantic tokens. Never hard-code colors, sizes or spacing. If something is missing, say so instead of inventing a value.
- Before you say UI work is done, run \`npx onsight-audit ${src}\`: zero errors, and fix the warnings where you can (each finding says what to use instead). Check the UI at 360px wide, in light and dark.
- After upgrading Onsight, read \`${dir}/CHANGELOG.md\` and run \`npx onsight-init\` again.
${end}
`;

const changes = [];
function write(file, content, note) {
  changes.push(`${note}: ${file}`);
  if (!dry) writeFileSync(join(cwd, file), content);
}

// AGENTS.md: read by Codex, Cursor, Copilot, Gemini and others.
const agents = join(cwd, 'AGENTS.md');
if (!existsSync(agents)) {
  write('AGENTS.md', `# AGENTS.md\n\nInstructions for AI coding agents working in this project.\n\n${block}`, 'created');
} else {
  const text = readFileSync(agents, 'utf8');
  const a = text.indexOf(start);
  const b = text.indexOf(end);
  if (a !== -1 && b > a) {
    const next = text.slice(0, a) + block.trimEnd() + text.slice(b + end.length);
    if (next !== text) write('AGENTS.md', next, 'updated the Onsight section in'); else changes.push('already up to date: AGENTS.md');
  } else {
    write('AGENTS.md', `${text.trimEnd()}\n\n${block}`, 'added the Onsight section to');
  }
}

// CLAUDE.md: Claude Code reads CLAUDE.md, and @AGENTS.md imports the file above.
const claude = join(cwd, 'CLAUDE.md');
if (!existsSync(claude)) {
  write('CLAUDE.md', '# CLAUDE.md\n\nRead and follow AGENTS.md.\n\n@AGENTS.md\n', 'created');
} else if (!/@AGENTS\.md/.test(readFileSync(claude, 'utf8'))) {
  write('CLAUDE.md', `${readFileSync(claude, 'utf8').trimEnd()}\n\n@AGENTS.md\n`, 'added @AGENTS.md to');
} else {
  changes.push('already links AGENTS.md: CLAUDE.md');
}

console.log(`${dry ? 'onsight-init (dry run, nothing written)' : 'onsight-init'}:\n${changes.map((c) => `  ${c}`).join('\n')}`);
console.log(`\nAudit command for this project: npx onsight-audit ${src}`);
