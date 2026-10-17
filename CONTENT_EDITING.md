# Updating this portfolio without modifying code

## StackBlitz and GitHub

The original UI and routing remain React/Vite/TypeScript. Content is stored in `src/content`: each case study is a JSON file in `projects/`, each note is a JSON file in `notes/`, and `site.json` controls public contact text and subject choices. Vite bundles those files when rebuilding; no runtime database or public admin endpoint is needed.

## Content editor (optional, requires your GitHub approval)

1. Open https://app.pagescms.org/ and sign in with your own GitHub account.
2. Review the GitHub App authorization and restrict installation to your portfolio repository if possible.
3. Select `ikonnechibueze-pixel/chibueze-portfolio`.
4. The repository-root `.pages.yml` describes three editing sections: Website settings, Work & case studies, Writing & articles.
5. Editing and saving creates a GitHub commit. Once your repository is connected to Vercel, the commit can trigger a deployment.
6. Test new articles and project records on a preview branch before publication if needed.

Do not authorize a third-party app unless you have reviewed its permissions and privacy terms. You can instead edit the JSON files through the GitHub UI; the published result is the same.

## What you can edit safely in the CMS

- Add/change/hide projects across Systems, Research, Data and Visual work.
- Add or update articles, writing status and summary.
- Set project cover photos after obtaining permission for publishing.
- Edit the homepage headline and summary.
- Change the public inquiry email, contact-page message, location and subject/topic dropdown.
- Set your public GitHub and LinkedIn URLs.

## What still requires code or service settings

- Adding an entirely new form input type or changing its validation and spam handling: update the React form and test it.
- Switching Formspree destinations or message provider: configure in Formspree plus Vercel `VITE_FORMSPREE_ID`; never store private API tokens in CMS content.
- New layout, page types, security rules or form processing: code change and testing.
- The `mailto:` fallback is not a direct web submission; it opens the visitor's email app.

## Publishing safety

The repository and its content are public. Never add passwords, private service tokens, sensitive client information, private addresses, or private customer data. JSON content is bundled into the public website. CMS access is controlled through GitHub and the Pages CMS App, not through the portfolio itself. Review service/data-processing terms and privacy copy before launch.

## Work structure

`workType` is `systems`, `research`, `data` or `visual`. The data filter currently shows an honest coming-soon explanation rather than a fake analytics case study. The two additional research/visual cases are source-grounded editorial drafts; review wording and add authorized work samples before public launch.

## Quick checks

`npm install` then `npm run build` locally or in StackBlitz. Test dark-mode navigation, `/work` filters, writing pages, and contact-form fallback.
