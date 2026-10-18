import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, BookOpenText,
  Braces, Check, ChevronLeft, ChevronRight, CircleDot, Database, FileText,
  Fingerprint, Github, Globe2, Home, Layers3, Linkedin, Mail, MapPin,
  Menu, Moon, Palette, PenLine, Search, Send, ShieldCheck, Sparkles, Sun, Leaf, CalendarDays, ClipboardCheck, Compass, Blocks, ScanSearch, ChartNoAxesCombined, LockKeyhole, Rocket,
  Workflow, X,
} from 'lucide-react';
import { notes, projects, site, type Note, type Project, type WorkType } from './data';

type Route = '/' | '/work' | '/writing' | '/about' | '/contact' | string;
type Theme = 'light' | 'dark';

const DEFAULT_CONTACT_EMAIL = 'Ikonnechibueze@gmail.com';

const social = {
  github: site.githubUrl?.trim() || import.meta.env.VITE_GITHUB_URL?.trim() || '',
  linkedin: site.linkedinUrl?.trim() || import.meta.env.VITE_LINKEDIN_URL?.trim() || '',
};

function readRoute(): Route {
  return decodeURIComponent(window.location.hash.replace(/^#/, '') || '/');
}

function AnchorButton({ to, children, className = '', icon = false }: {
  to: string;
  children: ReactNode;
  className?: string;
  icon?: boolean;
}) {
  return <a className={className} href={`#${to}`}>{children}{icon && <ArrowUpRight size={16} aria-hidden="true" />}</a>;
}

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Work', path: '/work', icon: Layers3 },
  { label: 'Writing', path: '/writing', icon: FileText },
  { label: 'About', path: '/about', icon: Fingerprint },
  { label: 'Contact', path: '/contact', icon: Send },
];

function BrandMark() {
  return <svg width="32" height="32" viewBox="0 0 64 64" role="img" aria-label="Chibueze Ikonne brand mark">
    <path d="M13 32 26 19a8 8 0 0 1 11 0l4 4-9 9-6-6-7 7 7 7 6-6 9 9-4 4a8 8 0 0 1-11 0Z" fill="#91c8ff" />
    <path d="m51 32-13 13a8 8 0 0 1-11 0l-4-4 9-9 6 6 7-7-7-7-6 6-9-9 4-4a8 8 0 0 1 11 0Z" fill="#8e84ff" />
  </svg>;
}

function Sidebar({ route, theme, setTheme }: {
  route: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [route]);
  return <>
    <button className="mobile-menu-button glass" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
    <aside className={`sidebar glass ${open ? 'sidebar-open' : ''}`} aria-label="Primary navigation">
      <a href="#/" className="brand" aria-label="Go to homepage" onClick={() => { if (readRoute() === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}><BrandMark /></a>
      <nav className="navigation" aria-label="Main navigation">
        {navItems.map(({ label, path, icon: Icon }) => {
          const active = path === '/' ? route === '/' : route === path || route.startsWith(`${path}/`);
          return <a key={path} href={`#${path}`} className={`nav-item ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => { if (readRoute() === path) window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Icon size={21} strokeWidth={active ? 2.3 : 1.8} aria-hidden="true" /><span>{label}</span>
          </a>;
        })}
      </nav>
      <button className="theme-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title="Toggle appearance">
        {theme === 'light' ? <Sun size={21} /> : <Moon size={21} />}
      </button>
    </aside>
    {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
  </>;
}

function SectionTopline({ number, label, right }: { number: string; label: string; right?: ReactNode }) {
  return <div className="section-topline"><span className="eyebrow">{number} <span className="divider">/</span> {label}</span>{right}</div>;
}

function Hero() {
  return <section className="hero glass" aria-labelledby="hero-title">
    <div className="hero-decor" aria-hidden="true">
      <svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fbfdff" stopOpacity=".85"/><stop offset=".52" stopColor="#b8bffb" stopOpacity=".35"/><stop offset="1" stopColor="#657cf7" stopOpacity=".1"/></linearGradient></defs>
        <path d="M195 520C92 227 355 44 665 143M240 530C138 205 381 73 655 180M288 535C190 255 387 112 677 218M339 530C250 302 462 153 681 254" fill="none" stroke="url(#ribbon)" strokeWidth="39"/>
        <path d="M195 520C92 227 355 44 665 143M240 530C138 205 381 73 655 180M288 535C190 255 387 112 677 218M339 530C250 302 462 153 681 254" fill="none" stroke="#fff" strokeOpacity=".53" strokeWidth="2"/>
      </svg>
    </div>
    <div className="hero-content">
      <SectionTopline number="01" label="04" right={<div className="status-name">Chibueze Ikonne <span className="online-dot" /></div>} />
      <div className="hero-copy">
        <h1 id="hero-title">{site.heroHeadline}</h1>
        <p>{site.heroSummary}</p>
        <div className="actions">
          <AnchorButton to="/work" className="button button-dark">Explore my work <ArrowRight size={16} /></AnchorButton>
          <AnchorButton to="/contact" className="button button-ghost" icon={false}>Get in touch</AnchorButton>
        </div>
      </div>
      <div className="hero-keywords" aria-label="Areas of interest"><span className="tiny-line" />RESEARCH<br />SYSTEMS<br />DATA<br />PRODUCT<br />VISUAL</div>
    </div>
  </section>;
}

function Introduction() {
  return <section className="intro glass" aria-label="Personal introduction">
    <div className="intro-top"><img className="orb-photo" src="/mountain-avatar.jpg" alt="Snow-covered mountains" /><span className="intro-dots" aria-hidden="true">···</span></div>
    <p className="intro-large">Designer and builder exploring the intersection of systems, data and human experience.</p>
    <div className="small-rule" />
    <p className="intro-secondary">I'm Chibueze Ikonne, a developer and designer interested in how thoughtful systems can make complex things simpler.</p>
  </section>;
}

const capabilities = [
  { title: 'Systems', label: '01', icon: Layers3, tone: 'blue', description: 'Turning complex ideas into clear, usable systems.' },
  { title: 'Data', label: '02', icon: Database, tone: 'cyan', description: 'Finding meaning in data and shaping it into useful products.' },
  { title: 'Research', label: '03', icon: Search, tone: 'violet', description: 'Asking better questions to design with context and clarity.' },
  { title: 'Visual', label: '04', icon: PenLine, tone: 'pink', description: 'Crafting clean, intentional interfaces and visual stories.' },
];

function CapabilityCards() {
  return <section className="capabilities" aria-label="Areas of work">
    {capabilities.map(({ title, label, icon: Icon, tone, description }) => <a key={title} href="#/about" className={`capability glass capability-${tone}`}>
      <div className="capability-top"><span className="cap-icon"><Icon size={24} strokeWidth={1.9} aria-hidden="true" /></span><span className="card-number">{label}</span></div>
      <div className="capability-bottom"><h2>{title}</h2><p>{description}</p><span className="round-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span></div>
    </a>)}
  </section>;
}

function SystemSketch({ project, large = false }: { project: Project; large?: boolean }) {
  return <div className={`system-sketch sketch-${project.accent} ${large ? 'sketch-large' : ''}`} aria-label={`${project.title}: conceptual workflow diagram, not an application screenshot`} role="img">
    <div className="sketch-halo sketch-halo-one"/><div className="sketch-halo sketch-halo-two"/>
    <div className="sketch-window">
      <div className="sketch-chrome"><span className="chrome-dots"><i/><i/><i/></span><span>WORKFLOW / {project.index}</span><Braces size={14} /></div>
      <div className="sketch-body">
        <div className="sketch-heading"><span className="sketch-app-icon"><Workflow size={18}/></span><span>{project.visualLabel}<small>Structure before the screen.</small></span></div>
        <div className="sketch-steps">
          {project.steps.map((step, i) => <div key={step} className="sketch-step"><span className={`step-check ${i === project.steps.length - 1 ? 'last' : ''}`}>{i === project.steps.length - 1 ? <CircleDot size={13} /> : <Check size={12} />}</span><span className="step-name">{step}</span>{i < project.steps.length - 1 && <span className="step-connector" />}</div>)}
        </div>
        <div className="sketch-footer"><span><span className="live-pulse" /> Intentional by design</span><span>{project.status}</span></div>
      </div>
    </div>
    <span className="sketch-floating-icon sketch-floating-one"><ShieldCheck size={24} /></span>
    <span className="sketch-floating-icon sketch-floating-two"><BadgeCheck size={20} /></span>
  </div>;
}

function FeaturedDevice({ project }: { project: Project }) {
  return <div className={`feature-device device-${project.accent}`} role="img" aria-label={`${project.title} conceptual mobile interface illustration; not a screenshot of the deployed application`}>
    <span className="device-aurora device-aurora-one"/><span className="device-aurora device-aurora-two"/>
    <div className="device-glass-back" aria-hidden="true">
      <div className="device-back-head"><span>Overview</span><span>•••</span></div>
      <div className="device-back-stat">Records <strong>—</strong></div>
      <div className="device-back-spark"><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="device-back-line"/><div className="device-back-line short"/>
      <div className="device-back-bottom"><span>Recent activity</span><span>↗</span></div>
    </div>
    <div className="device-phone" aria-hidden="true">
      <div className="device-speaker"/>
      <div className="device-screen">
        <div className="device-systembar"><span>9:41</span><span>◆ ▰</span></div>
        <div className="device-welcome">Good morning <span>◌</span></div>
        <strong className="device-greeting">{project.slug === 'virtual-herbarium' ? 'Specimen workspace' : 'Your workspace'}</strong>
        <div className="device-purplebar"><span>{project.slug === 'virtual-herbarium' ? 'Virtual Herbarium' : project.shortTitle}</span><ArrowUpRight size={11}/></div>
        <div className="device-services">
          <div><Leaf size={17}/><small>Records</small></div><div><ClipboardCheck size={17}/><small>Review</small></div><div><CalendarDays size={17}/><small>Schedule</small></div>
        </div>
        <div className="device-recent-title">Recent activity <span>•••</span></div>
        <div className="device-record"><span className="device-record-icon">✳</span><div><b>{project.steps[0]}</b><small>Workflow started</small></div><span className="device-record-status">Active</span></div>
        <div className="device-record"><span className="device-record-icon second">✓</span><div><b>{project.steps[1]}</b><small>Review in progress</small></div><span className="device-record-status">Open</span></div>
      </div>
    </div>
    <span className="device-glare"/>
    <span className="concept-label">Concept illustration · not a live screenshot</span>
  </div>;
}

function FeaturedWork() {
  const [selected, setSelected] = useState(0);
  const featuredProjects = projects.filter((p) => (p.workType || 'systems') === 'systems');
  const project = featuredProjects[selected % featuredProjects.length] || projects[0];
  const show = (dir: number) => setSelected((current) => (current + dir + featuredProjects.length) % featuredProjects.length);
  if (!project) return <section className="featured glass"><h2>Selected work</h2><p>New case studies are being prepared.</p></section>;
  return <section className="featured glass" aria-labelledby="featured-title">
    <div className="panel-heading"><div><h2 id="featured-title">Selected Work</h2><p>A few projects where I’ve turned complex problems into simple, useful experiences.</p></div><AnchorButton to="/work" className="text-pill">View all <ArrowRight size={13} /></AnchorButton></div>
    <div className="feature-content" key={project.slug}>
      <div className="feature-text"><span className="feature-index">{project.index} <span className="feature-category">/ {project.category}</span></span><h3>{project.title}</h3><p>{project.description}</p><AnchorButton to={`/work/${project.slug}`} className="small-button">Read case study <ArrowRight size={15}/></AnchorButton></div>
      <FeaturedDevice project={project} />
    </div>
    <div className="feature-controls" aria-label="Selected work carousel controls">
      <button aria-label="Previous project" onClick={() => show(-1)}><ChevronLeft size={19} /></button><span>{selected + 1} <span className="divider">/</span> {featuredProjects.length}</span><button aria-label="Next project" onClick={() => show(1)}><ChevronRight size={19} /></button>
    </div>
  </section>;
}

function NoteArtwork({ type }: { type: Note['visual'] }) {
  return <div className={`note-art note-art-${type}`} aria-hidden="true">
    {type === 'blueprint' ? <><span className="art-frame"/><span className="art-gridline"/><span className="art-node n1"/><span className="art-node n2"/><span className="art-node n3"/></>
      : type === 'horizon' ? <><span className="art-circle"/><span className="art-mountain a"/><span className="art-mountain b"/></>
        : <><span className="art-sheet sheet1"/><span className="art-sheet sheet2"/><span className="art-sheet sheet3"/></>}
  </div>;
}

function NotesPanel() {
  return <section className="notes-panel glass" aria-labelledby="notes-heading">
    <div className="panel-heading"><div><h2 id="notes-heading">Notes & Writing</h2></div><AnchorButton to="/writing" className="text-pill">View all <ArrowRight size={13} /></AnchorButton></div>
    <div className="note-list">{notes.map((note) => <a href={`#/writing/${note.slug}`} className="note-item" key={note.slug}>
      <NoteArtwork type={note.visual} /><div className="note-copy"><h3>{note.title}</h3><p>{note.teaser}</p></div><span className="note-date">{note.status || "Draft"}</span>
    </a>)}</div>
    
  </section>;
}

function AboutTeaser() {
  return <section className="about-teaser glass"><div className="teaser-orbit" aria-hidden="true"/><h2>A bit about me</h2><p>I’m a multidisciplinary builder who enjoys connecting research, product thinking and design to create meaningful digital experiences.</p><div className="facts"><div><MapPin size={20} /><span>Based in<br/><strong>Richmond Hill, ON</strong></span></div><div><Globe2 size={20}/><span>Projects across<br/><strong>different disciplines</strong></span></div></div></section>;
}

function FocusTeaser() {
  const items = [
    ['Building useful digital tools', 'green'],
    ['Making data and workflows clearer', 'blue'],
    ['Writing about systems and design', 'violet'],
    ['Open to thoughtful collaborations', 'outline'],
  ];
  return <section className="focus-teaser glass"><h2><span className="live-pulse" />Current focus</h2><ul>{items.map(([label, tone]) => <li key={label}><span className={`focus-bullet ${tone}`} />{label}</li>)}</ul></section>;
}

function ContactTeaser() {
  return <section className="contact-teaser glass"><div className="contact-teaser-head"><span className="send-icon"><Send size={21}/></span><div><h2>Get in touch</h2><p>Have a problem that needs structure? I'm interested.</p></div></div><AnchorButton to="/contact" className="button button-dark teaser-send" icon={false}>Send a message <ArrowRight size={16}/></AnchorButton><SocialLinks /></section>;
}

function isSecureExternalUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === 'https:'; } catch { return false; }
}

function SocialLinks({ includeEmail = true }: { includeEmail?: boolean }) {
  const mail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
  return <div className="socials" aria-label="Social links">
    {isSecureExternalUrl(social.linkedin) && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a>}
    {isSecureExternalUrl(social.github) && <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19}/></a>}
    {includeEmail && mail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) && <a href={`mailto:${mail}`} aria-label="Email"><Mail size={19}/></a>}
  </div>;
}

function Footer() {
  return <footer className="footer"><span>© {new Date().getFullYear()} Chibueze Ikonne</span><span>Thoughtfully designed. Built with intention.</span><div className="footer-links"><a href="#/privacy">Privacy</a><button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></div></footer>;
}

function HomePage() {
  return <main id="main-content" className="main home-page"><div className="top-grid"><Hero/><Introduction/></div><CapabilityCards/><div className="mid-grid"><FeaturedWork/><NotesPanel/></div><div className="bottom-grid"><AboutTeaser/><FocusTeaser/><ContactTeaser/></div><Footer/></main>;
}

function PageIntro({ index, kicker, title, body, icon }: { index: string; kicker: string; title: string; body: string; icon?: ReactNode }) {
  return <header className="page-intro glass"><SectionTopline number={index} label="04" right={<span className="status-name">CHIBUEZE IKONNE <span className="online-dot" /></span>}/><div className="page-intro-content">{icon && <span className="page-icon">{icon}</span>}<span className="overline">{kicker}</span><h1>{title}</h1><p>{body}</p></div></header>;
}

const workFilters: { label: string; value: WorkType | 'all' }[] = [
  { label: 'All work', value: 'all' }, { label: 'Systems & apps', value: 'systems' },
  { label: 'Research', value: 'research' }, { label: 'Data & analysis', value: 'data' },
  { label: 'Visual', value: 'visual' },
];
function ProjectArtwork({ project, large = false }: { project: Project; large?: boolean }) {
  // Only CMS-managed images from our own public media folder are accepted.
  const safeCover = project.coverImage?.startsWith('/media/') ? project.coverImage : '';
  return safeCover
    ? <img className={`project-cover${large ? ' project-cover-large' : ''}`} src={safeCover} alt={`${project.title} project preview`} loading="lazy" />
    : <SystemSketch project={project} large={large} />;
}
function WorkPage() {
  const [filter, setFilter] = useState<WorkType | 'all'>('all');
  const shown = filter === 'all' ? projects : projects.filter((project) => (project.workType || 'systems') === filter);
  return <main id="main-content" className="main inner-page"><PageIntro index="02" kicker="SELECTED CASE STUDIES" title="The work behind the work." body="A wider view of my work—systems, research, data thinking and visual communication. Real outcomes, deliberate decisions and work still in progress." icon={<Workflow size={25} />}/>
    <nav className="work-filters glass" aria-label="Filter work by discipline">{workFilters.map(({ label, value }) => <button type="button" key={value} aria-pressed={filter === value} className={`work-filter${filter === value ? ' selected' : ''}`} onClick={() => setFilter(value)}>{label}</button>)}</nav>
    {shown.length ? <div className="work-cards">{shown.map((project) => <article className="work-card glass" key={project.slug}>
      <ProjectArtwork project={project}/><div className="work-card-copy"><div className="work-meta"><span>{project.index} / {project.category}</span><span className="status-label">{project.status}</span></div><h2>{project.title}</h2><p>{project.description}</p><AnchorButton to={`/work/${project.slug}`} className="small-button">Read the case study <ArrowRight size={15}/></AnchorButton></div>
    </article>)}</div> : <div className="work-empty glass"><span className="overline">DATA & ANALYSIS</span><h2>Evidence comes before the case study.</h2><p>I have not published a standalone data-analysis case study yet. I'd rather add one with a real question, method and verified result than pad the portfolio with decorative charts.</p><AnchorButton to="/writing/useful-chart-test" className="small-button">Read how I think about analysis <ArrowRight size={15}/></AnchorButton></div>}
    <Footer/></main>;
}

function ProjectDetail({ project }: { project: Project }) {
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];
  return <main id="main-content" className="main inner-page"><div className="detail-nav"><AnchorButton to="/work" className="back-link" icon={false}><ArrowLeft size={16}/> All projects</AnchorButton><span>CASE STUDY / {project.index}</span></div>
    <section className="case-header glass"><div><div className="case-eyebrow">{project.category} · {project.status}</div><h1>{project.title}</h1><p>{project.description}</p><div className="technology-tags">{project.technology.map((t) => <span key={t}>{t}</span>)}</div></div><ProjectArtwork project={project} large/></section>
    <div className="case-two-col"><section className="case-section glass"><span className="overline">01 — THE QUESTION</span><h2>What needed to make sense?</h2><p>{project.question}</p></section><section className="case-section glass"><span className="overline">02 — MY APPROACH</span><h2>Structure first.</h2><p>{project.design}</p></section></div>
    <section className="case-section glass case-focus"><span className="overline">03 — WHAT MATTERED</span><h2>Decisions beneath the surface.</h2><div className="decision-grid">{project.focus.map((point, index) => <div key={point}><span className="decision-index">0{index + 1}</span><p>{point}</p></div>)}</div></section>
    <section className="case-section glass reflection"><div><span className="overline">04 — THE TAKEAWAY</span><h2>What this work reinforced.</h2><p>{project.reflection}</p></div><AnchorButton to={`/work/${next.slug}`} className="button button-dark" icon={false}>Next case study <ArrowRight size={16}/></AnchorButton></section>
    <Footer/></main>;
}

function WritingPage() {
  return <main id="main-content" className="main inner-page"><PageIntro index="03" kicker="NOTES FROM THE WORKBENCH" title="Thinking, in progress." body="Small essays about systems, data, research and making complicated work understandable. These are draft notes, not dated publications." icon={<BookOpenText size={25}/>} />
    <div className="writing-grid">{notes.map((note, index) => <a className="writing-card glass" href={`#/writing/${note.slug}`} key={note.slug}><NoteArtwork type={note.visual}/><span className="overline">0{index+1} / {note.tag} · {note.readTime} read</span><h2>{note.title}</h2><p>{note.teaser}</p><span className="read-note">Read the note <ArrowUpRight size={17}/></span></a>)}</div><Footer/></main>;
}

function NoteDetail({ note }: { note: Note }) {
  return <main id="main-content" className="main inner-page"><div className="detail-nav"><AnchorButton to="/writing" className="back-link" icon={false}><ArrowLeft size={16}/> All notes</AnchorButton><span>{note.readTime.toUpperCase()} READ</span></div><article className="essay glass"><div className="essay-banner"><NoteArtwork type={note.visual}/></div><div className="essay-body"><span className="overline">{(note.status || "Draft").toUpperCase()} NOTE / {note.tag}</span><h1>{note.title}</h1><p className="essay-lead">{note.teaser}</p><div className="essay-prose">{note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="essay-end"><span>— Chibueze Ikonne</span><AnchorButton to="/writing" className="back-link" icon={false}>More notes <ArrowRight size={16}/></AnchorButton></div></div></article><Footer/></main>;
}

const process = [
  { number: '01', title: 'Understand', question: 'What is actually broken?', body: 'Listen, investigate and separate the underlying problem from the first proposed solution.' },
  { number: '02', title: 'Structure', question: 'What rules and states exist?', body: 'Map the data, people, permissions, constraints and edge cases that give the problem its shape.' },
  { number: '03', title: 'Design', question: 'How should the pieces fit?', body: 'Choose what belongs in the interface, the workflow and the data model.' },
  { number: '04', title: 'Build', question: 'What is the smallest reliable version?', body: 'Implement a useful system without introducing complexity that has not earned its place.' },
  { number: '05', title: 'Validate', question: 'Does it actually hold up?', body: 'Test behaviour, permissions, incomplete states and the output people rely on.' },
];

const principles = [
  { title: 'Clarity before complexity', body: 'More technology cannot rescue a confusing workflow.' },
  { title: 'Data should have rules', body: 'IDs, permissions, states and history deserve deliberate design.' },
  { title: 'Security belongs in the design', body: 'Privacy and access boundaries are part of the original requirements.' },
  { title: 'Dashboards should answer questions', body: 'A chart needs a reason to exist beyond looking impressive.' },
  { title: 'Visual design should communicate', body: 'Hierarchy and restraint matter more than decoration.' },
];

const researchExamples = [
  {
    number: '01',
    label: 'BOTANICAL RECORDS',
    title: 'Make the evidence traceable.',
    body: 'Examining the relationship between specimen requests, botanical references, accession identity and expert authentication before deciding how to present a record.',
    path: '/work/virtual-herbarium',
    link: 'See the herbarium case study',
  },
  {
    number: '02',
    label: 'SYSTEM INVESTIGATION',
    title: 'Find the real trust problem.',
    body: 'Thinking through eligibility, issuance, public verification and revocation—because a beautiful certificate cannot establish its own validity.',
    path: '/work/credential-verification',
    link: 'See the verification case study',
  },
  {
    number: '03',
    label: 'DATA REASONING',
    title: 'Ask what the numbers should answer.',
    body: 'Starting with the distinction someone needs to see, then deciding whether a comparison, report, chart or simpler explanation is the clearest response.',
    path: '/writing/useful-chart-test',
    link: 'Read the analysis note',
  },
];

const toolGroups = [
  { number: '01', title: 'Research & discovery', icon: Compass, detail: 'Requirements · technical comparisons · workflow investigation · source review' },
  { number: '02', title: 'Applications & UI', icon: Braces, detail: 'React · TypeScript · Vite · interface development' },
  { number: '03', title: 'Backend & APIs', icon: Blocks, detail: 'Supabase · Edge Functions · authentication · access control' },
  { number: '04', title: 'Data & analysis', icon: ChartNoAxesCombined, detail: 'PostgreSQL · SQL · Excel · relational modelling · BI thinking' },
  { number: '05', title: 'Systems & product', icon: Workflow, detail: 'User journeys · record lifecycles · role mapping · data rules' },
  { number: '06', title: 'Security & validation', icon: LockKeyhole, detail: 'Least privilege · audit trails · permission testing · safe defaults' },
  { number: '07', title: 'Delivery & infrastructure', icon: Rocket, detail: 'GitHub · Vercel · version control · deployment checks' },
  { number: '08', title: 'Visual communication', icon: Palette, detail: 'Photoshop · Lightroom · CorelDRAW · print & campaign design' },
];

function ResearchInPractice() {
  return <section className="research-section glass" aria-labelledby="research-heading">
    <div className="research-lead">
      <span className="overline">RESEARCH & ANALYSIS / IN PRACTICE</span>
      <h2 id="research-heading">I investigate before I build.</h2>
      <p>Research is not a step I skip on the way to code. I compare sources, examine how work actually happens and look for the rules, questions and exceptions that a useful solution needs to respect.</p>
      <div className="research-signature"><ScanSearch size={17} aria-hidden="true" /> Questions → Evidence → Decisions</div>
    </div>
    <div className="research-examples">
      {researchExamples.map((item) => <article className="research-example" key={item.number}>
        <span className="research-counter">{item.number} <span>/ {item.label}</span></span>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <AnchorButton to={item.path} className="research-link" icon={false}>{item.link} <ArrowUpRight size={14} aria-hidden="true" /></AnchorButton>
      </article>)}
    </div>
  </section>;
}

function ToolsAndMethods() {
  return <section className="tool-section glass" aria-labelledby="tool-heading">
    <span className="overline">THE TOOLS & THINKING BEHIND THE WORK</span>
    <div className="tool-heading-row">
      <h2 id="tool-heading">Tools are there to serve the work.</h2>
      <p>Software, investigation, information structure, testing and visual work all belong here. These are representative tools and practices—not inflated job titles.</p>
    </div>
    <div className="tool-groups">{toolGroups.map(({ number, title, icon: Icon, detail }) => <article key={number} className="tool-group">
      <div className="tool-group-heading"><Icon size={20} aria-hidden="true" /><span className="tool-index">{number}</span></div>
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>)}</div>
  </section>;
}

function AboutPage() {
  return <main id="main-content" className="main inner-page"><PageIntro index="04" kicker="NOT A COLLECTION OF JOB TITLES" title="I work across the problem, not just one layer of it." body="Some challenges need code. Others need a clearer question, better data rules, a simpler flow or a piece of communication that people can actually understand." icon={<Fingerprint size={25}/>} />
    <section className="about-story glass"><span className="overline">A LITTLE CONTEXT</span><div className="about-story-grid"><h2>I connect the pieces that usually get separated.</h2><div><p>I'm interested in what happens between research, data, software systems and the way people experience them. I often begin by understanding the work people are trying to do — then I decide what deserves to become software, what needs better structure and what simply needs clearer communication.</p><p>I build applications, think through relational data and workflows, investigate technical options and work on visual materials. The disciplines are different; the underlying goal is the same: make something useful and understandable.</p></div></div></section>
    <section className="process-section glass"><div className="section-head"><span className="overline">HOW I APPROACH PROBLEMS</span><h2>From an unclear starting point to something people can use.</h2></div><div className="process-grid">{process.map((p) => <article key={p.number}><span className="process-index">{p.number}</span><h3>{p.title}</h3><strong>{p.question}</strong><p>{p.body}</p></article>)}</div></section>
    <ResearchInPractice />
    <section className="principles-section glass"><div><span className="overline">THINGS I CARE ABOUT</span><h2>Principles over buzzwords.</h2></div><div className="principle-list">{principles.map((p) => <div key={p.title}><Check size={18}/><div><h3>{p.title}</h3><p>{p.body}</p></div></div>)}</div></section>
    <ToolsAndMethods />
    <div className="about-cta glass"><div><span className="overline">KEEP GOING</span><h2>Want to see this thinking in practice?</h2></div><AnchorButton to="/work" className="button button-dark" icon={false}>Explore case studies <ArrowRight size={16}/></AnchorButton></div><Footer/></main>;
}

const CONTACT_EMAIL = (site.contactEmail || import.meta.env.VITE_CONTACT_EMAIL || '').trim() || DEFAULT_CONTACT_EMAIL;
const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'b644c0ce-8180-4941-96d8-314027fdc25c').trim();
const hasWeb3Forms = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(WEB3FORMS_ACCESS_KEY);
const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);
type ContactStatus = 'idle' | 'sending' | 'success' | 'error' | 'draft';

function contactFields(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    topic: String(data.get('topic') || '').trim(),
    message: String(data.get('message') || '').trim(),
    botcheck: data.get('botcheck') !== null,
  };
}

function contactMailto(details: ReturnType<typeof contactFields>) {
  const subject = details.topic ? `Portfolio inquiry — ${details.topic}` : 'Portfolio inquiry';
  const body = [
    details.name ? `Name: ${details.name}` : 'Name:',
    details.email ? `Reply-to email: ${details.email}` : 'Reply-to email:',
    '',
    details.message || 'Message:',
  ].join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [feedback, setFeedback] = useState('');

  function openDraft() {
    if (!hasEmail || !formRef.current || status === 'sending') return;
    window.location.href = contactMailto(contactFields(formRef.current));
    setStatus('draft');
    setFeedback('An email draft should open in your email app. Review it and press Send there; opening a draft does not send the message.');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const { name, email, topic, message, botcheck } = contactFields(form);

    // Web3Forms accepts botcheck=true as a hidden spam trap; never send this input as content.
    if (botcheck) {
      setStatus('error');
      setFeedback('Unable to submit this form. Please use the direct email option below.');
      return;
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !topic || !message || name.length > 120 || email.length > 254 || message.length > 4000) {
      setStatus('error');
      setFeedback('Please check your name, email, topic and message before sending.');
      return;
    }
    if (!hasWeb3Forms) {
      setStatus('error');
      setFeedback('Online submission is not configured. Please use the direct email option below.');
      return;
    }

    setStatus('sending');
    setFeedback('');
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: 'Chibueze Ikonne — Portfolio',
          subject: `Portfolio inquiry — ${topic}`,
          name,
          email,
          topic,
          message,
          botcheck: false,
        }),
      });
      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission not accepted');
      setStatus('success');
      setFeedback('Thank you — your message was submitted successfully. I’ll respond to the email address you provided.');
      form.reset();
    } catch {
      setStatus('error');
      setFeedback('Your message could not be submitted right now. Nothing was confirmed as sent. You can retry or open a prefilled email draft below.');
      // Inputs are intentionally preserved for the visitor to retry or email instead.
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return <form ref={formRef} className="contact-form" onSubmit={submit} onInput={() => { if (status !== 'idle' && status !== 'sending') { setStatus('idle'); setFeedback(''); } }}>
    <div className="form-row"><label>YOUR NAME<input name="name" autoComplete="name" placeholder="How should I address you?" maxLength={120} required /></label><label>EMAIL ADDRESS<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></label></div>
    <label>WHAT IS THIS ABOUT?<select name="topic" defaultValue="" required><option value="" disabled>Choose a topic</option>{(site.contactTopics || []).map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select></label>
    <label>MESSAGE<textarea name="message" rows={6} placeholder="Tell me a little about the problem, the context, and what you have in mind." maxLength={4000} required /></label>
    <div className="honey-field" aria-hidden="true"><label htmlFor="contact-botcheck">Leave this blank</label><input type="checkbox" tabIndex={-1} autoComplete="off" name="botcheck" id="contact-botcheck" /></div>
    <div className="form-bottom"><p>Your information is forwarded via Web3Forms so I can reply. See the <a href="#/privacy">privacy note</a>. No phone number needed.</p><button className="button button-dark" disabled={!hasWeb3Forms || status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : 'Send message'}<ArrowRight size={16} aria-hidden="true"/></button></div>
    {feedback && <p className={`form-feedback ${status}`} role="status" aria-live="polite">{feedback}</p>}
    {!hasWeb3Forms && <p className="form-setup" role="status">The online form is not configured yet. Direct email is still available.</p>}
    {hasEmail && <div className="email-alternative"><div><span className="overline">PREFER EMAIL?</span><p>Send a message directly to <a className="direct-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or prepare a draft using the details above.</p></div><button type="button" className="button button-ghost email-draft-button" onClick={openDraft} disabled={status === 'sending'}>Open email draft <Mail size={16} aria-hidden="true"/></button></div>}
  </form>;
}

function ContactPage() {
  return <main id="main-content" className="main inner-page"><PageIntro index="04" kicker="HAVE A PROBLEM THAT NEEDS STRUCTURE?" title="Start with a conversation." body={site.contactIntro} icon={<Send size={25} />} />
    <div className="contact-layout"><section className="contact-main glass"><div className="section-head"><span className="overline">SEND AN INQUIRY</span><h2>What are you working on?</h2><p>You don't need a perfectly written brief. A few useful details are enough to start.</p></div><ContactForm /></section>
      <aside className="contact-side"><div className="contact-side-card glass"><span className="overline">A FEW THINGS TO KNOW</span><h2>Good problems start with good questions.</h2><p>I’m particularly interested in projects involving thoughtful web applications, organized data, research-led decisions and strong visual communication.</p><div className="contact-location"><MapPin size={20}/><span>{site.location}</span></div></div><div className="contact-side-card glass"><span className="overline">DIRECT CONTACT</span><a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}><Mail size={18} aria-hidden="true" />{CONTACT_EMAIL}</a>{(isSecureExternalUrl(social.github) || isSecureExternalUrl(social.linkedin)) && <SocialLinks includeEmail={false} />}<p className="social-hint">If the form service is unavailable, you can always email me directly. No phone number is published.</p></div></aside>
    </div><Footer/></main>;
}

function PrivacyPage() {
  return <main id="main-content" className="main inner-page"><PageIntro index="04" kicker="ABOUT YOUR INFORMATION" title="A straightforward privacy note." body="This site is designed to collect as little information as possible. Here is what the current version does." icon={<ShieldCheck size={25}/>} />
    <section className="privacy-body glass"><span className="overline">HOW THIS SITE WORKS</span><h2>Browsing</h2><p>There are no user accounts, advertising trackers or site analytics in this version. The appearance preference (light or dark) may be saved in your browser's local storage. Browsing public case studies does not require you to submit personal information.</p>
    <h2>Contact messages</h2><p>If you select Send message, the name, email address, selected topic and message you provide are transmitted to Web3Forms, a third-party form processing service, to forward your inquiry to my email inbox. Web3Forms may process technical connection data for service delivery and abuse prevention. Web3Forms states that its infrastructure is hosted in the United States and that it periodically deletes server logs. When you use direct email instead, your email provider and mine process the message. I do not operate a separate database for these inquiries. Please do not include sensitive or confidential details in an initial message.</p>
    <h2>Fonts and external links</h2><p>The site may request typefaces from Google Fonts, which can involve a connection to Google's servers. Optional professional-profile links lead to external websites with their own privacy practices.</p>
    <h2>Your choices</h2><p>You do not need to use the contact form. You can clear the site's stored appearance preference through your browser settings. For questions about a message you sent or to request that the site owner delete it, use the available professional contact channel.</p>
    <div className="privacy-disclaimer"><strong>Publication check:</strong> This is a draft description of the current implementation, not a legal opinion. Before publishing, verify the actual third-party services, their terms and the final retention/deletion practices.</div></section><Footer/></main>;
}

function NotFoundPage() {
  return <main id="main-content" className="main inner-page"><section className="page-intro glass not-found"><span className="overline">NOT FOUND / 404</span><h1>That page isn't here.</h1><p>The link may have changed, or the address may be incorrect.</p><AnchorButton to="/" className="button button-dark" icon={false}>Return home <ArrowRight size={16}/></AnchorButton></section><Footer/></main>;
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const [theme, setTheme] = useState<Theme>(() => {
    try { return localStorage.getItem('ci-appearance') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  // Reset scroll *after* the new route renders, not before React updates the DOM.
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [route]);
  useEffect(() => {
    const baseTitle = 'Chibueze Ikonne';
    const project = projects.find((item) => `/work/${item.slug}` === route);
    const note = notes.find((item) => `/writing/${item.slug}` === route);
    const label = project?.title ?? note?.title ?? ({ '/': 'Systems, Data & Design', '/work': 'Selected Work', '/writing': 'Writing', '/about': 'About', '/contact': 'Contact', '/privacy': 'Privacy' } as Record<string, string>)[route] ?? 'Page not found';
    document.title = `${label} — ${baseTitle}`;
  }, [route]);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('ci-appearance', theme); } catch { /* Storage may be disabled. */ } }, [theme]);
  const page = useMemo(() => {
    if (route === '/' || route === '') return <HomePage />;
    if (route === '/work') return <WorkPage />;
    if (route === '/writing') return <WritingPage />;
    if (route === '/about') return <AboutPage />;
    if (route === '/contact') return <ContactPage />;
    if (route === '/privacy') return <PrivacyPage />;
    if (route.startsWith('/work/')) { const item = projects.find((p) => `/work/${p.slug}` === route); return item ? <ProjectDetail project={item}/> : <NotFoundPage/>; }
    if (route.startsWith('/writing/')) { const item = notes.find((n) => `/writing/${n.slug}` === route); return item ? <NoteDetail note={item}/> : <NotFoundPage/>; }
    return <NotFoundPage/>;
  }, [route]);
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><div className="ambient-scene" aria-hidden="true" /><div className="shell-inner"><Sidebar route={route} theme={theme} setTheme={setTheme}/>{page}</div><span className="built-with" aria-hidden="true"><Sparkles size={12} /> Thoughtful by design</span></div>;
}
