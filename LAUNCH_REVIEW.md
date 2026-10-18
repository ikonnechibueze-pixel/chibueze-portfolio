# Chibueze Ikonne — launch review (v0.7)

This is a practical sign-off list. The site is not declared production-ready just because it runs in StackBlitz.

## Completed in v0.7
- Removed the redundant email-only icon beneath the clearly displayed contact address. Kept the Web3Forms send button, clickable direct email, and prefilled-email fallback.
- Moved route-change scroll restoration to the React layout phase so a newly selected page starts at the top after the new content renders.
- Added visible **concept illustration** disclosure on the featured device mockup. It is not a screenshot of the user's real application.
- Added visible keyboard focus outlines (including dark mode) and updated browser-tab titles for each route.
- Added `npm run check:content` and made it part of the production build. Validates content structure, URL slugs, image references, and essential contact settings.
- Preserved all existing projects, notes, supplied visual assets, and the tested Web3Forms contact integration.

## Editorial approval still required
The following content is publicly accessible by default if deployed. Review first:

1. Three draft articles in Writing (`src/content/notes`). They are marked **Draft** and have `published: true` in JSON. Approve/rewrite them, or set `published: false` to hide them.
2. The *Researching Botanical Record Workflows* case study (`src/content/projects/research-methods-botanical-records.json`) is an editorial narrative about work that informs Virtual Herbarium. Verify the scope and wording.
3. The *Event Campaign & Visual Communication* case study is a general narrative; real visual samples must be shared and approved for publication first.
4. Check case-study status labels (Working application / System development / Prototype development) against reality at publishing time.
5. Confirm permission to publicize organization-specific details/screenshots and avoid credentials or private specimen/participant data.
6. Confirm the public location and contact email. No residential street address or phone number is included.
7. Link to a professional GitHub/LinkedIn profile only after choosing the appropriate public profile. The entries remain empty in `src/content/site.json`.

## Testing to complete on StackBlitz
- `npm run build` in StackBlitz terminal: must end successfully. The generator's environment could not reach the npm registry; syntax checks are not a substitute for this.
- Confirm Home / Work / Writing / About / Contact / Privacy, project cards and articles, Work filters, and the mobile menu.
- Toggle dark mode, tab through controls with keyboard, inspect mobile widths, and check contact fields on narrow screens.
- Form was confirmed delivering a test message from the StackBlitz instance to Gmail on 2026-10-17. **Retest on the production host** because domain restrictions may differ.
- Test the direct-email link and email draft fallback without accidentally sending duplicate test messages.

## Hosting: the terms matter
Vercel Hobby is free but its official fair-use rules restrict it to **non-commercial personal use**. A portfolio advertising paid development/design services or used for soliciting paying clients may be commercial. Do not rely on Vercel Hobby for that scenario without written confirmation from Vercel or using an eligible paid plan.

The same static Vite project can instead deploy to services such as **Cloudflare Pages** or **Netlify Free** after verifying their current terms against the intended usage. The provider does not change the website source code.

**Cloudflare Pages via Git:** Dashboard → Workers & Pages → Create → Pages → Import an existing Git repository → choose `ikonnechibueze-pixel/chibueze-portfolio` → production branch `main`, build command `npm run build`, output directory `dist` → deploy. The service assigns a `*.pages.dev` domain. Project name can be chosen separately from the GitHub repo; availability is not guaranteed.

**Vercel via Git (non-commercial only on Hobby):** New Project → Import GitHub repository → set name and build preset `Vite` → Build Command `npm run build`, Output Directory `dist` (auto-detected where supported) → deploy. Confirm plan eligibility before proceeding.

Your app uses hash-based URLs (`/#/contact`), so it currently requires no special rewrite rule for internal routes. The site-wide social preview references only the root HTML page. True individual case-study search indexing will require a later routing/SSR/static-generation upgrade.

When deployed, make a fresh test Web3Forms submission on the actual public domain. If blocked, the public email link and email draft should still work. Review privacy copy and data processor conditions before public launch.
