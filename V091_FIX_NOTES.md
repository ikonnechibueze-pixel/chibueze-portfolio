# Portfolio v0.9.1 — Display corrections

This update contains complete replacement files for the existing v0.9 portfolio. It changes only presentation and the package version.

- Gives Selected Work carousel pagination its own dedicated row, without overlap.
- Stops 16:9 project screenshot crops on desktop, tablet and mobile.
- Displays screenshot images in their entirety; tapping/clicking the featured image opens the full-resolution file in a new tab.
- Keeps Work and case-study images fully visible.
- Preserves the full composition of research/writing UI previews instead of cover-cropping.
- Leaves project data, contact form, Cloudflare workflow and dark-mode behaviour otherwise unchanged.

## Install with GitHub Desktop (Mac)

1. Extract `chibueze_portfolio_v091_display_fix.zip`.
2. GitHub Desktop → Repository → Show in Finder.
3. Replace `src/App.tsx`, `src/styles.css`, and `package.json` with the exact files from the update, preserving their paths. Copy this note to the root if desired.
4. Check the Changes tab. Commit `Portfolio v0.9.1 - Fix responsive images and carousel controls`.
5. Push origin, then check the GitHub Actions deployment before testing the live site on mobile and desktop.

This patch is based on the v0.9 source package; apply it to v0.9, not directly to an older version.
