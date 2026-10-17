/** Editorial content is stored in src/content, not hardcoded in components.
 * A GitHub-backed CMS may edit JSON and commits trigger a Vercel rebuild.
 */
import settings from './content/site.json';

export type WorkType = 'systems' | 'research' | 'data' | 'visual';
export type Project = {
  slug: string; index: string; title: string; shortTitle: string;
  category: string; status: string; description: string; question: string;
  design: string; focus: string[]; technology: string[];
  accent: 'blue' | 'mint' | 'violet' | 'amber';
  visualLabel: string; steps: string[]; reflection: string;
  workType?: WorkType; published?: boolean; coverImage?: string;
};
export type Note = {
  slug: string; title: string; tag: string; teaser: string; readTime: string;
  paragraphs: string[]; visual: 'blueprint' | 'horizon' | 'layers';
  published?: boolean; status?: 'Draft' | 'Published';
};
export type SiteSettings = {
  heroHeadline: string; heroSummary: string; contactEmail: string;
  contactIntro: string; contactTopics: string[]; location: string;
  githubUrl: string; linkedinUrl: string;
};
export const site = settings as SiteSettings;

const projectFiles = import.meta.glob<{ default: Project }>('./content/projects/*.json', { eager: true });
const noteFiles = import.meta.glob<{ default: Note }>('./content/notes/*.json', { eager: true });

export const projects: Project[] = Object.values(projectFiles)
  .map((file) => ({ ...file.default,
    focus: Array.isArray(file.default.focus) ? file.default.focus : [],
    technology: Array.isArray(file.default.technology) ? file.default.technology : [],
    steps: Array.isArray(file.default.steps) ? file.default.steps : [],
  }))
  .filter((p) => p.published !== false && Boolean(p.slug && p.title))
  .sort((a, b) => a.index.localeCompare(b.index, undefined, { numeric: true }));
export const notes: Note[] = Object.values(noteFiles)
  .map((file) => ({ ...file.default, paragraphs: Array.isArray(file.default.paragraphs) ? file.default.paragraphs : [] }))
  .filter((n) => n.published !== false && Boolean(n.slug && n.title));
