# Chibueze Ikonne — personal website (v0.4)

A custom-built React + Vite + TypeScript portfolio with a reference-led, architectural-glass dashboard. This release preserves the reference-led homepage, restores the full multidisciplinary toolkit, and introduces an evidence-based research and analysis section on About. It is **real HTML/CSS/React**, not a screenshot positioned over links.

## Project

- Home: overview, capability cards, featured project carousel, writing previews, current focus and contact.
- Work: project case-study index and individual case studies.
- Writing: three **draft** articles (not fabricated publications).
- About: working approach, research and analysis examples, principles, and eight clearly defined disciplines with their representative tools and practices.
- Contact: built-in contact form and privacy page.
- Light/dark theme toggle, responsive navigation, keyboard focus styles and reduced-motion support.

## Version 0.4 content correction

The previous four-cell tools list was incomplete. It is now an eight-area grid: research and discovery, applications/UI, backend/APIs, data/analysis, systems/product, security/validation, delivery/infrastructure, and visual communication. The About page also includes three linked, case-based research/analysis examples. Two mismatched draft writing titles were aligned with their actual paragraphs. All original home, work, contact, navigation and visual assets remain in place.

## Run locally

1. `npm install`
2. `npm run dev`
3. Open the local URL printed by Vite.

For a release build, run `npm run build`. This requires an environment that can install dependencies. TypeScript/JSX parsing was verified for this release, but the full dependency-backed build has **not** been verified in the packaging environment; use StackBlitz to run and visually inspect it before deploying.

## Updating the existing GitHub repository with `chibueze_portfolio_v04_github_update.zip`

This is the easiest route if your repository already holds v0.3:

1. Extract the update ZIP.
2. On your GitHub repository, choose **Add file → Upload files**.
3. Drag the **contents of the update folder** (`src/`, `public/`, `README.md`) to the upload area. GitHub should show nested paths like `src/App.tsx` and `public/mountain-avatar.jpg`.
4. Commit directly to `main` with the message `Restore research, data and engineering coverage (v0.4)`.
5. Re-open/refresh the StackBlitz GitHub import link and check desktop and mobile. If StackBlitz has cached the old GitHub snapshot, use its GitHub import again.

The update ZIP has no hidden dotfiles, to avoid GitHub's browser upload restrictions. Do not delete existing `.gitignore` or commit any real `.env` secrets.

## Contact

The default contact email is `Ikonnechibueze@gmail.com`. Without a `VITE_FORMSPREE_ID`, the contact form opens an email draft in the visitor's email app rather than claiming that a message was delivered. After configuring a real Formspree form, update your privacy note to match the actual service and data handling.

**Environment variables** (optional):

- `VITE_CONTACT_EMAIL` — contact address (defaults to email above)
- `VITE_FORMSPREE_ID` — Formspree form ID (must be activated separately)
- `VITE_GITHUB_URL` — professional GitHub profile URL
- `VITE_LINKEDIN_URL` — professional LinkedIn profile URL

Do not put private credentials or service tokens in frontend Vite variables.

## Artwork disclosure

- `architectural-canopy.jpg`, `mountain-avatar.jpg`, and the three small writing thumbnail JPGs were **cropped from the original reference screenshot supplied by the website owner**, exclusively as decorative art assets. They are not third-party stock photos and they are not full-page screenshot overlays.
- `scene.svg` provides the custom vector atmospheric architecture backdrop.
- The featured phone/app image is a handcrafted CSS/HTML **conceptual visualization**, not a claimed screenshot, live metric, or deployable feature of the underlying project. Replace it with actual application photography/screenshots when available.

## Deployment

Import the existing GitHub repository into Vercel as a **Vite** project, build command `npm run build`, output folder `dist`. Choose the Vercel project name and generated `.vercel.app` domain independently of the repository's name (subject to availability). Publish only after testing links, forms, layout, content and mobile navigation.
