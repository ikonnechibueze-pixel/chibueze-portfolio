/** Lightweight, dependency-free pre-build validation for portfolio content. */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const content = join(root, 'src', 'content');
const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let failures = 0;
const errors = [];
const check = (condition, message) => { if (!condition) { failures++; errors.push(`  - ${message}`); } };
const site = read(join(content, 'site.json'));
check(typeof site.heroHeadline === 'string' && site.heroHeadline.trim().length > 4, 'Missing homepage headline.');
check(emailRe.test(site.contactEmail || ''), 'Site contact email is invalid.');
check(Array.isArray(site.contactTopics) && site.contactTopics.length > 0, 'At least one contact topic is required.');
for (const key of ['githubUrl', 'linkedinUrl']) {
  const value = site[key];
  if (value) check(typeof value === 'string' && /^https:\/\//i.test(value), `${key} must use HTTPS.`);
}
let total = 0;
let drafts = 0;
for (const type of ['projects', 'notes']) {
  const dir = join(content, type);
  const slugs = new Set();
  for (const filename of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const item = read(join(dir, filename));
    total++;
    check(slugRe.test(item.slug || ''), `${filename}: invalid URL slug.`);
    check(item.title && item.title.trim().length > 2, `${filename}: missing title.`);
    check(!slugs.has(item.slug), `${filename}: duplicate slug.`);
    slugs.add(item.slug);
    check(filename === `${item.slug}.json`, `${filename}: filename must match slug.`);
    if (type === 'projects') {
      check(['systems', 'data', 'research', 'visual'].includes(item.workType), `${filename}: invalid workType.`);
      check(Array.isArray(item.steps) && item.steps.length >= 2, `${filename}: workflow needs at least two steps.`);
      check(Array.isArray(item.focus) && item.focus.length > 0, `${filename}: add case-study decisions.`);
      if (item.coverImage) {
        check(item.coverImage.startsWith('/media/'), `${filename}: cover must be inside /media/.`);
        if (item.coverImage.startsWith('/media/')) check(existsSync(join(root, 'public', item.coverImage.substring(1))), `${filename}: cover image file is missing.`);
      }
    } else {
      check(Array.isArray(item.paragraphs) && item.paragraphs.length > 0, `${filename}: note body is missing.`);
      if (item.published && item.status === 'Draft') drafts++;
    }
  }
}
if (failures) {
  console.error(`Portfolio content validation failed (${failures} issues):\n${errors.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Content check passed (${total} articles/projects).`);
  if (drafts) console.log(`Editorial reminder: ${drafts} draft article(s) are currently visible; approve them before public launch.`);
}
