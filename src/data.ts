export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  status: string;
  description: string;
  question: string;
  design: string;
  focus: string[];
  technology: string[];
  accent: 'blue' | 'mint' | 'violet' | 'amber';
  visualLabel: string;
  steps: string[];
  reflection: string;
};

export const projects: Project[] = [
  {
    slug: 'virtual-herbarium',
    index: '01',
    title: 'Virtual Herbarium',
    shortTitle: 'Virtual Herbarium',
    category: 'Records · Workflows · Research',
    status: 'System development',
    description: 'Making specimen requests, identification, authentication and records part of one coherent institutional workflow.',
    question: 'How do you connect a physical botanical specimen to a dependable digital record without losing its identity or history?',
    design: 'A role-aware workflow linking student requests, taxonomist review, curator appointments, accession numbers, authentication and QR labels. The record is more than a page: it has a lifecycle and a traceable identity.',
    focus: ['Separate physical accession numbers from digital record codes', 'Clear review, appointment and authentication states', 'Role-based permissions and audit history', 'QR labels tied to verified records'],
    technology: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vite'],
    accent: 'blue',
    visualLabel: 'SPECIMEN RECORD FLOW',
    steps: ['Request', 'Review', 'Authenticate', 'Record'],
    reflection: 'The difficult part is not displaying specimens. It is agreeing on what a specimen record means, who can change it, and when it becomes authoritative.',
  },
  {
    slug: 'credential-verification',
    index: '02',
    title: 'Certificate Verification',
    shortTitle: 'Certificate Verification',
    category: 'Identity · Trust · Automation',
    status: 'Working application',
    description: 'A certificate workflow built around eligibility, issuance, revocation and independent public verification.',
    question: 'A certificate is easy to draw. How can an outside person tell whether it is legitimate and still valid?',
    design: 'Built cohort and participant management, eligibility checks, certificate generation, unique credential IDs, QR-linked public verification and revocation controls.',
    focus: ['Separate attendance and eligibility from issuance', 'Unique, publicly verifiable credential IDs', 'Revocation and status history', 'Controlled administrator access'],
    technology: ['React', 'TypeScript', 'Supabase', 'QRCode', 'Vercel'],
    accent: 'violet',
    visualLabel: 'CREDENTIAL TRUST FLOW',
    steps: ['Eligibility', 'Issue', 'Verify', 'Revoke'],
    reflection: 'The real product is confidence in a credential, not the PDF that carries it.',
  },
  {
    slug: 'project-repository',
    index: '03',
    title: 'Project Repository',
    shortTitle: 'Research Repository',
    category: 'Knowledge · Access · Data',
    status: 'System development',
    description: 'A departmental archive where discovering academic work and accessing restricted documents are different actions.',
    question: 'How can a university department make past projects discoverable while keeping full-text access deliberate?',
    design: 'An archive with searchable records, controlled PDF access requests, staff review, role-specific permissions and an approval trail.',
    focus: ['Discoverability without uncontrolled file access', 'Staff review and access requests', 'Archival and restoration states', 'Database-backed role permissions'],
    technology: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    accent: 'mint',
    visualLabel: 'ACCESS DECISION FLOW',
    steps: ['Discover', 'Request', 'Review', 'Access'],
    reflection: 'A useful repository needs two things at once: information people can find and boundaries they can trust.',
  },
  {
    slug: 'botanica-forensics',
    index: '04',
    title: 'BOTANICA FORENSICS',
    shortTitle: 'Botanica Forensics',
    category: 'Forensics · Investigation · Data',
    status: 'Prototype development',
    description: 'Exploring how botanical observations, reference sources and structured reports can fit into a careful investigative workflow.',
    question: 'What does a botanical examination tool need to preserve when the evidence and its interpretation have different levels of certainty?',
    design: 'A research-led interface connecting botanical inputs, reference lookups, examination notes and report generation while keeping the limits of automated identification visible.',
    focus: ['Structured observations and report content', 'Reference-assisted identification', 'Clear uncertainty and provenance', 'Separation of evidence from interpretation'],
    technology: ['React', 'TypeScript', 'Supabase', 'PlantNet', 'PDF generation'],
    accent: 'amber',
    visualLabel: 'INVESTIGATION FLOW',
    steps: ['Observe', 'Compare', 'Document', 'Report'],
    reflection: 'An answer is not necessarily evidence. Tools must help people preserve the distinction.',
  },
];

export type Note = {
  slug: string;
  title: string;
  tag: string;
  teaser: string;
  readTime: string;
  paragraphs: string[];
  visual: 'blueprint' | 'horizon' | 'layers';
};

export const notes: Note[] = [
  {
    slug: 'design-the-rule-first',
    title: 'Design the rule before the interface',
    tag: 'Systems thinking',
    teaser: 'The most consequential decisions in an application often happen before a screen exists.',
    readTime: '3 min',
    visual: 'blueprint',
    paragraphs: [
      'It is tempting to start with the part that is easy to show: a dashboard, a form or a polished navigation bar. But the first questions are usually less visual. Who owns this record? When can it change? What makes it valid? What happens when someone makes a mistake?',
      'In a record-based system, those answers determine the structure beneath every screen. An identifier is not just a string. A status is not just a badge. Permissions are not just a hidden button. They are decisions about how the system should behave.',
      'I try to make those decisions explicit early. A rough workflow diagram and a clear set of rules can save hours of redesign later. The interface gets easier to make once the rules stop moving.',
    ],
  },
  {
    slug: 'useful-chart-test',
    title: 'The useful chart test',
    tag: 'Data & analysis',
    teaser: 'A dashboard should help someone notice or decide something, not simply show that data exists.',
    readTime: '2 min',
    visual: 'horizon',
    paragraphs: [
      'A beautiful chart can still be a weak answer. Before choosing a visual, I want to know who is looking at it, what they need to understand and what they might do differently after seeing it.',
      'Sometimes the clearest output is a trend. Sometimes it is a comparison, an exception or even a sentence with a number. If the visual does not make an important distinction easier to see, it may not belong on the page.',
      'Clarity is not the same as simplicity for its own sake. It is deciding which complexity matters and giving it the right amount of space.',
    ],
  },
  {
    slug: 'make-complexity-legible',
    title: 'Make complexity legible',
    tag: 'Design & communication',
    teaser: 'The same habits that clarify a workflow can also clarify a poster, presentation or product page.',
    readTime: '3 min',
    visual: 'layers',
    paragraphs: [
      'Software and visual design look like different disciplines from the outside. I find they share a central problem: helping someone understand what matters and what to do next.',
      'A system needs meaningful states and a predictable flow. A visual composition needs hierarchy, contrast and purposeful spacing. Both suffer when everything competes for attention.',
      'I am interested in the point where structure becomes communication — when the decisions behind the work are felt as an experience that is easier to understand.',
    ],
  },
];
