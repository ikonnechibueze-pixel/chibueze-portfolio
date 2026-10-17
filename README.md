# Chibueze Ikonne — Personal Website (v0.5)

This is a React/Vite/TypeScript portfolio with GitHub-backed editable content.

**New in 0.5:** dark mode sidebar and contact contrast fixes, category-filtered Work section, research and visual case-study drafts, and a Pages CMS content schema.

> The two new non-software case studies are summaries pending editorial review. Publish only approved images and confirmed claims.

See **CONTENT_EDITING.md** for guidance on updating projects, articles, contact topics and site text without modifying React code.

## Running the site

```sh
npm install
npm run dev
```

To verify a production build, run `npm run build`.

No backend or database is required. Your contact form currently uses a `mailto:` fallback unless a valid Formspree form ID is configured via `VITE_FORMSPREE_ID`. Before going live, verify the service configuration and privacy note.

**Security:** Store no secrets in `src/content` or any committed frontend file. The CMS integration is not live until you choose to authorize the external GitHub app. No private `/admin` endpoint is added to the site.
