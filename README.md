# Chibueze Ikonne — Personal website (v0.1)

A complete, mobile-responsive portfolio built with **React, TypeScript and Vite**. The visual direction follows the supplied light, architectural, glass-panel reference — implemented as original HTML/CSS/SVG, not a screenshot pasted behind links.

## What's included

- Working navigation: Home, Work, Writing, About, Contact and a draft Privacy page
- Four contextual case studies with status labels (no fictitious statistics or testimonials)
- Selected-work carousel with previous/next buttons
- Three clearly labelled draft notes
- Responsive layout, keyboard-accessible navigation and reduced-motion support
- Working light/dark appearance switch (saved locally)
- Contact form that can post to Formspree **without running your own backend**
- Email-app fallback when no Formspree ID is set but a contact email is provided
- No phone number, street address, cookies, analytics or third-party trackers
- Minimal original vector illustration assets, without invented app screenshots

## Run locally / in StackBlitz

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## Publish on Vercel (free domain)

1. Push the contents of this folder to a new GitHub repository.
2. Import that repository into Vercel; it should recognize **Vite** automatically.
3. Build command: `npm run build`; output directory: `dist`.
4. Use the free `*.vercel.app` project domain until you choose to add a custom domain.

Navigation uses hash routes (`#/work`, `#/about`, etc.), so no server rewrites are needed.

## Activate the contact form

Copy `.env.example` to `.env.local` for local development, or add the same variables in **Vercel → Project Settings → Environment Variables**.

**Option A — Recommended:** Create a free Formspree form, confirm its inbox address, then set:

```ini
VITE_FORMSPREE_ID=your_actual_form_id
VITE_CONTACT_EMAIL=your_public_professional_email@example.com
```

Formspree sends submissions to the email you verify. You will not need Supabase, a database or your own API. Note that the submit endpoint must be reachable in production. Review Formspree's current free plan, spam controls and privacy terms before publishing. Your site has a honeypot, input lengths and client-side validation; reliable abuse prevention ultimately depends on the form provider, because a static site cannot enforce a private server-side rate limit.

**Option B — No form provider:** Only set `VITE_CONTACT_EMAIL`. The form will create a pre-filled email draft in the visitor's mail application; they must then send it. This works without running any service, but it is not a direct website submission.

**Option C — Not configured:** The preview shows the contact form but disables submission. This avoids a misleading “message sent” state. Configure A or B before publishing.

> `VITE_` variables are part of the public frontend bundle. Do **not** put API secrets or private email credentials in these variables. A Formspree form ID is not a secret.

## Link your profiles

Optional variables:

```ini
VITE_GITHUB_URL=https://github.com/YOUR_HANDLE
VITE_LINKEDIN_URL=https://www.linkedin.com/in/YOUR_HANDLE/
```

Leave empty until you know the exact URLs. The site will not show nonfunctional social icons.

## Edit your content

- `src/data.ts` — Project details, statuses, technologies and draft essays
- `src/App.tsx` — Page copy, layout and interactions
- `src/styles.css` — Responsive design, typography, components and themes
- `public/scene.svg` — Hand-coded atmospheric architectural backdrop (no stock-photo dependency)
- `public/favicon.svg` — Original site brand mark

**Please review/approve all public claims and writing before deployment.** The content is an initial proposal based on the project details supplied in conversation. In particular, the four case-study status labels should always reflect reality, and the draft essays are not represented as previously published work.

## Verification commands

```bash
npm run typecheck
npm run build
npm run preview
```

For a production contact form, send at least one real test message and confirm it arrives. Test on a narrow phone viewport and keyboard navigation before sharing your site.

## Privacy & security notes

The site keeps only the appearance preference in the browser's local storage. No analytics, user accounts or persistent database are added. Form submissions are processed by Formspree when enabled — its privacy policy and your eventual published privacy notice should accurately describe this. If you enable Formspree, ensure your site's public privacy note meets applicable requirements and links to the provider as appropriate. Static frontend validation does not replace service-side anti-spam or input safeguards.
