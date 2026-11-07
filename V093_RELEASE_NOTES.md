# Portfolio v0.9.3 — Real Data & Analysis Dashboards

## Change summary

- Adds **four data-analysis case studies** to Work → Data & Analysis (previously an empty category).
- Uses the four original PNG screenshots supplied by the site owner, **without altering their contents**.
- Adds a direct link from the homepage **Data** capability to `#/work/data`.
- Adds a full-size dashboard image link on each data card and case-study page.
- Uses the actual Earthquake & Tsunami dashboard as the visual for the data-visualization writing note, replacing the generated sample dashboard.
- Leaves mobile layout, existing visual system, dark mode, contact form, Cloudflare deployment workflow, research publication and LinkedIn omission unchanged.

## Dashboard titles

1. Customer Shopping Trends Analysis — `data-customer-shopping-trends.png`
2. BMW Sales Performance Analytics — `data-bmw-sales-performance.png`
3. Global Earthquake & Tsunami Analysis — `data-earthquake-tsunami.png`
4. Call Center Agents Analysis — `data-call-center-agents.png`

## Accuracy and privacy notes

These are original user-supplied **analysis dashboard screenshots**, not continuously updating data sources. Numbers appearing in dashboards describe their underlying analyzed datasets. The BMW screenshot must not be presented as an audited official financial statement. Check permissions before publishing if any underlying customer or agent data identifies real people. No fabricated analytics are introduced.

## Installing on GitHub Desktop

1. Open your existing `chibueze-portfolio` repository in Finder.
2. Merge the `src` and `public` folder **contents** from this update. Replace individual matching files; do not replace whole folders.
3. Replace root `package.json` and add `V093_RELEASE_NOTES.md`.
4. Confirm four added PNGs, four added project JSONs, updated `src/App.tsx`, `src/styles.css` and `package.json` are listed under Changes.
5. Commit: `Portfolio v0.9.3 - Real data analysis dashboards` and Push origin.
6. Confirm the latest GitHub Actions run is green, then open `https://chibuezeikonne.pages.dev/#/work/data`.

The patch does **not** change `.github`, API tokens or contact form settings.
