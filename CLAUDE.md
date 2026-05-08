# Claude Buzizi Foundation — Site Agent

> Static, multi-page HTML site for **The Claude Buzizi Foundation**.
> Deployed to Vercel from GitHub. Editable in Lovable.

---

## What this is

The Foundation's public website — a flat-file static site (HTML + CSS + a tiny
shell.js for shared nav/footer). No build step. No framework. Plain `<a href>`
links between pages so it works anywhere — locally via `file://`, on Vercel,
inside Lovable.

**Mission:** Feed · Educate · Equip — carry forward the work Claude's late father,
Claver Buzizi, began for the widows and families of Bisesero after the 1994
Genocide against the Tutsi.

## Module structure

Pages stay flat at the repo root (Lovable + Vercel both want it that way), but
they're **logically grouped** in [`modules/MODULES.md`](modules/MODULES.md). Read
that file first when you need to figure out which pages move together.

| Module | Pages | Owns |
|---|---|---|
| **Core** | `index.html` · `about.html` · `contact.html` | Front-door positioning |
| **Programs** | `programs.html` · `partners.html` · `reports.html` | What we fund + who powers it |
| **Giving** | `get-involved.html` · `giving.html` · `claude-application.html` | Donation funnels + inbound applications |
| **Brand Lab** | `logo-lab*.html` | Internal logo drafts (not in public nav) |

Each module folder has its own `README.md` linking back to the relevant pages.

## File conventions

- **Pages:** flat at root. `kebab-case.html`. Title format `<Page> — Buzizi Foundation`.
- **Shared chrome:** `assets/shell.js` renders `<div data-shell="nav" data-active="…">` and `<div data-shell="footer">`. Always include both.
- **Stylesheets:** every page links `assets/foundation.css` THEN `assets/spacing-fixes.css` (in that order — spacing-fixes overrides foundation).
- **Partner logos:** `assets/partners/{slug}.{png|webp}`. Both full logo and favicon variants kept where available.
- **Photos / uploads:** `assets/photos/` (curated) and `uploads/` (user-dropped).

## Editing tips

- **Adding a new page:** copy an existing page (e.g. `reports.html`), update the title, the `data-active` key on `<div data-shell="nav">`, and add it to the relevant module README + `modules/MODULES.md`. If it should appear in the nav, edit `NAV_ITEMS` in [`assets/shell.js`](assets/shell.js).
- **Adding a partner logo:** drop the file in `assets/partners/`, reference from `programs.html` (per-pillar inline) and `partners.html` (logo wall). Document the source URL in [`modules/programs/README.md`](modules/programs/README.md).
- **Spacing/polish tweaks:** edit [`assets/spacing-fixes.css`](assets/spacing-fixes.css) — never `foundation.css`. `foundation.css` is the master design system; `spacing-fixes.css` is where iterative polish lives.
- **Lovable round-trips:** Lovable may inline some `<style>` blocks back into pages on save. That's fine. Don't fight it. Re-run `assets/spacing-fixes.css` only if site-wide rhythm drifts.

## Deployment

The site auto-deploys to Vercel from `main` on GitHub.

| Item | Value |
|---|---|
| **GitHub repo** | `buziziclo/claude-buzizi-foundation` |
| **Vercel project** | `claude-buzizi-foundation` (account: `buziziclo`) |
| **Production URL** | `https://claude-buzizi-foundation.vercel.app` *(until custom domain is purchased)* |
| **Custom domain** | TBD — to be purchased after deploy verification |
| **Branch → environment** | `main` → Production. PR branches → Preview. |

`vercel.json` provides clean URLs (`/programs` instead of `/programs.html`).

### To redeploy manually

```bash
set -a && source .env && set +a
vercel deploy --prod --yes --token "$VERCEL_TOKEN"
```

But normally you don't — `git push origin main` triggers auto-deploy.

## Secrets

Local secrets live in [`.env`](.env) (gitignored). The full key list mirrors the
Alpha Sites `.env` — see that repo's CLAUDE.md for the canonical list. Keys most
relevant to this site:

| Key | Used for |
|---|---|
| `VERCEL_TOKEN` | Manual Vercel deploys / domain assignment |
| `CLOUDFLARE_API_TOKEN` | DNS for the eventual custom domain |
| `AIRTABLE_API_KEY` | Future: form submissions → Airtable (not wired yet) |
| `FIRECRAWL_API_KEY` | Pulling partner logos/favicons during edits |

**Never** paste a secret into a tracked file (CLAUDE.md, README, HTML, JSON).

## Reports — render as HTML

Following the Alpha Sites convention: any audit, change-summary, or multi-section
findings doc goes in `reports/` as a self-contained HTML file. Path:
`reports/{slug}-{YYYY-MM-DD}.html`. Use the brand palette (cream `#f5f0e8`, navy
`#0a0a1f`, gold `#d4a957`, orange `#e35817`). Inline all CSS.

## Things to NOT do

- Don't move `.html` files into subdirectories — it breaks every relative `assets/…` reference and every nav link in `shell.js`.
- Don't introduce a build step (Webpack, Vite, Next, etc.) without an explicit ask. The flat-file simplicity is the feature.
- Don't paste secrets. Reference by name from `.env`.
- Don't edit `foundation.css` for ad-hoc polish — use `spacing-fixes.css`.
