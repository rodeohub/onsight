#!/usr/bin/env node
// onsight-audit (also available as isa-audit): finds values in a project that bypass Onsight, the ISA design system.
// Usage: npx onsight-audit <folder> [--strict]
//   Errors (exit 1): hard-coded colors, default Tailwind palette classes, primitive ISA color tokens.
//   Warnings (exit 0, or exit 1 with --strict): raw spacing, radius and font sizes, Tailwind values in brackets.
//   Every finding says what to use instead.
// Ignore one line on purpose by adding the comment: isa-audit-ignore <reason>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const root = resolve(args.find((a) => !a.startsWith('--')) ?? '.');
const exts = new Set(['.css', '.scss', '.sass', '.less', '.html', '.jsx', '.tsx', '.js', '.ts', '.mjs', '.vue', '.svelte', '.astro', '.php', '.mdx']);
const skipDirs = new Set(['node_modules', '.git', '.next', '.nuxt', '.svelte-kit', 'coverage', 'onsight', '@slacklineinternational', 'isa-design-system']);
const skipRootDirs = new Set(['dist', 'build', 'out', 'public']);

// Token scales from the installed package, so suggestions match the installed version.
const scales = { space: [], radius: [], 'font-size': [] };
try {
  const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'tokens.css'), 'utf8');
  for (const [, kind, step, num, unit] of css.matchAll(/--isa-(space|radius|font-size)-(\w+):\s*([\d.]+)(rem|px)?;/g)) {
    if (kind === 'radius' && step === 'full') continue;
    scales[kind].push({ step, px: unit === 'rem' ? parseFloat(num) * 16 : parseFloat(num) });
  }
} catch { /* no dist/: suggestions fall back to a general hint */ }

const toPx = (v) => { const m = /^(-?[\d.]+)(px|rem|em)$/.exec(v); return m ? (m[2] === 'px' ? parseFloat(m[1]) : parseFloat(m[1]) * 16) : null; };
function nearest(kind, value) {
  const px = toPx(value);
  if (px == null || !scales[kind].length) return null;
  return scales[kind].reduce((a, b) => (Math.abs(b.px - Math.abs(px)) < Math.abs(a.px - Math.abs(px)) ? b : a)).step;
}

// What to use instead of a color, by context.
const familyHint = [
  [/red|rose|crimson|tomato|coral|salmon|maroon|pink|fuchsia|magenta/, 'danger: text-danger, bg-status-danger-bg, bg-action-danger-bg (CSS: --isa-color-text-danger, --isa-color-status-danger-bg)'],
  [/green|emerald|teal|lime|olive/, 'brand or success: bg-action-primary-bg for buttons, text-success, bg-status-success-bg (CSS: --isa-color-action-primary-bg, --isa-color-text-success)'],
  [/yellow|amber|orange|gold/, 'warning: bg-status-warning-bg, text-status-warning-fg (CSS: --isa-color-status-warning-bg)'],
  [/blue|sky|cyan|indigo|navy|aqua|violet|purple/, 'info or links: text-link, bg-status-info-bg (CSS: --isa-color-text-link, --isa-color-status-info-bg); for tags a category color, e.g. bg-category-blue-bg'],
  [/gray|grey|slate|zinc|neutral|stone|silver/, 'neutral: text-muted, bg-subtle, border-default (CSS: --isa-color-text-muted, --isa-color-surface-subtle, --isa-color-border-default)'],
  [/white/, 'surfaces and text on dark: bg-default, text-inverse (CSS: --isa-color-surface-default, --isa-color-text-inverse)'],
  [/black/, 'text: text-default (CSS: --isa-color-text-default)'],
];
function colorHint(match, line) {
  const word = match.toLowerCase();
  for (const [re, hint] of familyHint) if (re.test(word)) return hint;
  if (/background|bg-|fill/i.test(line)) return 'a surface or action role: var(--isa-color-surface-default), var(--isa-color-surface-subtle), var(--isa-color-action-primary-bg)';
  if (/border|outline/i.test(line)) return 'a border role: var(--isa-color-border-default), var(--isa-color-border-strong), var(--isa-color-border-focus)';
  if (/shadow/i.test(line)) return 'a shadow token: var(--isa-shadow-md), var(--isa-shadow-lg)';
  return 'a text role: var(--isa-color-text-default), var(--isa-color-text-muted), var(--isa-color-text-link)';
}
const primitiveHint = (m) => /red/.test(m) ? 'a danger role, e.g. --isa-color-text-danger, --isa-color-action-danger-bg, or --isa-color-brand-red for logos and decoration'
  : /green/.test(m) ? 'an action or brand role, e.g. --isa-color-action-primary-bg, --isa-color-surface-brand, or --isa-color-brand-green for decoration'
  : 'a text, surface or border role, e.g. --isa-color-text-muted, --isa-color-surface-subtle, --isa-color-border-default';

const twColors = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black';
const twPrefixes = 'bg|text|border|border-[trblxyse]|ring|ring-offset|outline|fill|stroke|from|via|to|divide|placeholder|caret|accent|decoration|shadow';
const named = 'white|black|red|green|blue|yellow|orange|purple|pink|gray|grey|teal|navy|maroon|olive|lime|aqua|fuchsia|silver|crimson|gold|indigo|violet|brown|cyan|magenta|tomato|coral|salmon';
const spaceProps = 'padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left|padding-[a-z-]+|margin-[a-z-]+|inset-[a-z-]+';
const raw = '-?\\d*\\.?\\d+(?:px|rem|em)';

const checks = [
  { level: 'error', name: 'hex color', re: /(?<![\w&#-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?![\w-])/g, only: (line) => !/href=|id=|url\(\s*['"]?#|&#/.test(line), hint: colorHint },
  { level: 'error', name: 'color function', re: /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(\s*[\d.%]/g, hint: colorHint },
  { level: 'error', name: 'Tailwind palette class', re: new RegExp(`(?<![\\w-])(?:[\\w-]+:)*(?:${twPrefixes})-(?:${twColors})(?:-\\d{2,3})?(?:\\/\\d+)?(?![\\w-])`, 'g'), hint: colorHint },
  { level: 'error', name: 'primitive ISA token', re: /--isa-color-(?:red|green|gray|white|black|category-hue)\b[\w-]*/g, only: (line, file) => !file.endsWith('tokens.css'), hint: primitiveHint },
  { level: 'error', name: 'named CSS color', re: new RegExp(`(?:color|background(?:-color)?|border(?:-[a-z]+)?-color|fill|stroke|outline-color)\\s*:\\s*['"]?(?:${named})['"]?\\s*[;,}]`, 'gi'), hint: colorHint },
  { level: 'warning', name: 'raw spacing', re: new RegExp(`(?<![\\w-])(?:${spaceProps})\\s*:\\s*[^;{}]*?${raw}[^;{}]*`, 'g'), value: new RegExp(raw, 'g'), kind: 'space' },
  { level: 'warning', name: 'raw radius', re: new RegExp(`(?<![\\w-])border(?:-[a-z]+)*-radius\\s*:\\s*[^;{}]*?${raw}[^;{}]*`, 'g'), value: new RegExp(raw, 'g'), kind: 'radius' },
  { level: 'warning', name: 'raw font size', re: new RegExp(`(?<![\\w-])font-size\\s*:\\s*[^;{}]*?${raw}[^;{}]*`, 'g'), value: new RegExp(raw, 'g'), kind: 'font-size' },
  { level: 'warning', name: 'Tailwind value in brackets', re: /(?<![\w-])(?:[\w-]+:)*-?[a-z][\w-]*-\[[^\]\s'"]+\](?![\w:-])/g, only: (line, file) => !/\.(css|scss|sass|less)$/.test(file), skipIf: (m) => /\[#|\[(?:rgb|hsl|oklch|color)\(/.test(m) },
];

// Small values (hairlines, 1 to 2px nudges) are not spacing decisions.
const isTiny = (v) => { const px = toPx(v); return px != null && Math.abs(px) <= 2; };
const kindByTwPrefix = (m) => {
  const u = m.replace(/^(?:[\w-]+:)*-?/, '').split('-[')[0];
  if (/^(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left)$/.test(u)) return 'space';
  if (/^rounded/.test(u)) return 'radius';
  if (u === 'text') return 'font-size';
  return null;
};
const cssVar = { space: (s) => `var(--isa-space-${s})`, radius: (s) => `var(--isa-radius-${s})`, 'font-size': (s) => `var(--isa-font-size-${s})` };

function stripComments(src, ext) {
  // Keep line numbers: replace comment bodies with spaces.
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  let out = src.replace(/\/\*[\s\S]*?\*\//g, blank);
  if (['.html', '.vue', '.svelte', '.astro', '.php', '.mdx'].includes(ext)) out = out.replace(/<!--[\s\S]*?-->/g, blank);
  if (!['.css', '.html'].includes(ext)) out = out.replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)));
  return out;
}

const findings = [];
function walk(dir, depth = 0) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name) || (depth === 0 && skipRootDirs.has(name))) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, depth + 1);
    else if (exts.has(extname(name))) scan(p);
  }
}
function scan(file) {
  const src = readFileSync(file, 'utf8');
  const rawLines = src.split('\n');
  const where = (relative(root, file) || file).split('\\').join('/');
  stripComments(src, extname(file)).split('\n').forEach((line, i) => {
    if (rawLines[i]?.includes('isa-audit-ignore')) return;
    for (const c of checks) {
      if (c.only && !c.only(line, file)) continue;
      for (const m of line.matchAll(c.re)) {
        const text = m[0].trim();
        if (c.skipIf?.(text)) continue;
        let hint;
        // Context for color hints: the declaration or class the match sits in, not the whole line.
        const before = line.slice(0, m.index);
        const ctx = (before.split(/[;{"'`\s]/).pop() || before.split(/[;{]/).pop()) + text;
        if (c.hint) hint = c.hint(text, ctx);
        else if (c.kind) {
          if (/var\(|calc\(|clamp\(|min\(|max\(/.test(text) && !text.match(c.value)?.some((v) => !isTiny(v))) continue;
          const values = (text.match(c.value) || []).filter((v) => !isTiny(v));
          if (!values.length) continue;
          const steps = values.map((v) => [v, nearest(c.kind, v)]).filter(([, s]) => s);
          hint = steps.length ? steps.map(([v, s]) => (values.length > 1 ? `${v} -> ` : '') + cssVar[c.kind](s)).join(', ') : 'a token from docs/foundations/layout.md';
        } else {
          const kind = kindByTwPrefix(text);
          const inner = /\[([^\]]+)\]/.exec(text)?.[1];
          if (inner && isTiny(inner)) continue;
          const step = kind && inner ? nearest(kind, inner) : null;
          hint = step ? `${text.replace(/\[[^\]]+\]/, step)}${kind === 'font-size' ? ', or a text style such as type-body' : ''}` : 'a theme class (spacing, radius, text size), a size token from docs/foundations/layout.md or an isa-* component';
        }
        findings.push({ level: c.level, line: `${where}:${i + 1}  ${c.level}  ${c.name}: ${text}  -> use ${hint}` });
      }
    }
  });
}

if (statSync(root).isDirectory()) walk(root); else scan(root);
const errors = findings.filter((f) => f.level === 'error');
const warnings = findings.filter((f) => f.level === 'warning');
if (findings.length) console.log([...errors, ...warnings].map((f) => f.line).join('\n'));
const failed = errors.length || (strict && warnings.length);
if (findings.length) {
  console.error(`\n${errors.length} error(s), ${warnings.length} warning(s).${failed ? '' : ' Warnings do not fail the audit (use --strict to make them fail).'} Use semantic tokens and isa-* components (see AGENTS.md); add "isa-audit-ignore <reason>" to a line only on purpose.`);
}
if (failed) process.exit(1);
if (!errors.length) console.log(warnings.length ? 'onsight-audit: no colors outside the design system.' : 'onsight-audit: no colors or raw sizes outside the design system.');
