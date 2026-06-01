<!-- AI_BRAIN_PROJECT_MEMORY_V1 -->
# AI Brain project memory

## Project identity
- Project name: Claude Buzizi Foundation
- Project type: Foundation website / nonprofit presence
- Primary folder: `/Users/buzizidigiprofits/Documents/Vibe Coding/Claude Buzizi Foundation`
- Claude memory file: `/Users/buzizidigiprofits/Documents/Vibe Coding/Claude Buzizi Foundation/CLAUDE.md`
- Last standardized: 2026-06-01
- Obsidian-ready: yes

## What this project is
Claude Buzizi Foundation — Site Agent

## Agent entry protocol
1. Read this `CLAUDE.md` first.
2. Treat the **AI Brain project memory** section as the operating map.
3. Then read the original project notes below before editing code, data, prompts, automations, or deployment settings.
4. Do not assume secrets exist in this file. Credentials belong in `.env`, platform dashboards, or the configured secret store only.
5. If you discover a durable fact, append it under **Project memory** with an ISO date.

## Project memory
- 2026-06-01: Standardized for AI Brain ingestion. Original project instructions are preserved below under **Original project instructions**.

## Safety guardrails
- Do not commit credentials, tokens, cookies, `.env` files, exported browser profiles, local database dumps, or generated private data.
- Do not overwrite the original workflow without first preserving the existing behavior.
- Prefer section-by-section fixes over wholesale rebuilds.
- When preparing Obsidian memory, summarize decisions and architecture, not secrets or transient task logs.

## Obsidian memory export
- Suggested note title: `Claude Buzizi Foundation — Project Memory`
- Suggested tags: `#ai-brain #project-memory #agent-handoff`
- Export status: ready after human review

---

# Original project instructions

# Claude Buzizi Foundation — Site Agent

> Static, multi-page HTML site for **The Claude Buzizi Foundation**.
> Deployed to Vercel from GitHub. Editable in Lovable.

---

## What this is

The Foundation's public website — a flat-asset static site (HTML + CSS + a tiny
shell.js for shared nav/footer). No build step. No framework. Pages are organized
into **modular folders** under `modules/` and Vercel rewrites map clean URLs
(`/about`, `/programs`) to the actual files.

**Mission:** Feed · Educate · Equip — carry forward the work Claude's late father,
Claver Buzizi, began for the widows and families of Bisesero after the 1994
Genocide against the Tutsi.

## Modular folder structure

Pages are grouped by purpose under [`modules/`](modules/). Read
[`modules/MODULES.md`](modules/MODULES.md) first to find which file owns what.

```
modules/
├── core/                       # Front-door (index, about, contact)
│   ├── index.html              → /
│   ├── about.html              → /about
│   ├── contact.html            → /contact
│   └── README.md
├── programs/                   # What we fund + who powers it
│   ├── programs.html           → /programs
│   ├── partners.html           → /partners
│   ├── reports.html            → /reports
│   └── README.md
├── giving/                     # Donation + applications
│   ├── get-involved.html       → /get-involved
│   ├── giving.html             → /giving
│   ├── claude-application.html → /apply
│   └── README.md
├── brand-lab/                  # Internal logo drafts (not in nav)
│   ├── logo-lab.html           → /logo-lab
│   ├── logo-lab-v2.html        → /logo-lab-v2
│   ├── logo-lab-v3.html        → /logo-lab-v3
│   ├── logo-lab-v4.html        → /logo-lab-v4
│   └── README.md
└── MODULES.md                  # The full map (read this first)
```

[`vercel.json`](vercel.json) holds the rewrites that map clean URLs → module paths.

## Asset paths

All asset references in HTML use **root-relative paths** (`/assets/...`,
`/uploads/...`) so pages work identically from any folder depth. Shell.js nav and
footer use **clean URLs** (`/about`, `/programs`).

This means **local file:// preview won't work** — you need a server. Either:
- `vercel dev` (recommended — full rewrite support)
- `python3 -m http.server 8080` (works for asset paths but not rewrites — append `.html` manually)

## File conventions

- **Pages:** in `modules/{group}/`. `kebab-case.html`. Title format `<Page> — Buzizi Foundation`.
- **Shared chrome:** `assets/shell.js` renders `<div data-shell="nav" data-active="…">` and `<div data-shell="footer">`. Always include both.
- **Stylesheets:** every page links `/assets/foundation.css` THEN `/assets/spacing-fixes.css` (in that order — spacing-fixes overrides foundation).
- **Partner logos:** `assets/partners/{slug}.{png|webp}`. Both full logo and favicon variants kept where available.
- **Photos / uploads:** `assets/photos/` (curated) and `uploads/` (user-dropped).

## Editing tips

- **Adding a new page:** copy an existing page in the same module folder, update `<title>`, the `data-active` key on `<div data-shell="nav">`, and add it to:
  - The relevant `modules/{group}/README.md`
  - [`modules/MODULES.md`](modules/MODULES.md)
  - The `rewrites` array in [`vercel.json`](vercel.json) (clean URL → module path)
  - `NAV_ITEMS` in [`assets/shell.js`](assets/shell.js) if it should appear in the nav
- **Adding a partner logo:** drop the file in `assets/partners/`, reference from the relevant page (e.g. `programs.html` for per-pillar inline; `partners.html` for the logo wall). Document the source URL in [`modules/programs/README.md`](modules/programs/README.md).
- **Spacing/polish tweaks:** edit [`assets/spacing-fixes.css`](assets/spacing-fixes.css) — never `foundation.css`. `foundation.css` is the master design system; `spacing-fixes.css` is where iterative polish lives.
- **Lovable round-trips:** Lovable may inline some `<style>` blocks back into pages on save. That's fine. Don't fight it. Re-run `assets/spacing-fixes.css` only if site-wide rhythm drifts.

## Deployment

The site auto-deploys to Vercel from `main` on GitHub.

| Item | Value |
|---|---|
| **GitHub repo** | https://github.com/buziziclo/claude-buzizi-foundation |
| **Vercel project** | `claude-buzizi-foundation` (account: `buziziclo`) |
| **Project ID** | `prj_vafIeB2qzu1XJ1seyCTgziIQktS4` |
| **Production URL** | `https://claude-buzizi-foundation.vercel.app` |
| **Custom domain** | TBD — to be purchased after deploy verification |
| **Branch → environment** | `main` → Production. PR branches → Preview. |

### To redeploy manually

```bash
vercel deploy --prod --yes
```

But normally you don't — `git push origin main` triggers auto-deploy.

## Secrets

Local secrets live in [`.env`](.env) (gitignored). The full key list mirrors the
Alpha Sites `.env`. Keys most relevant to this site:

| Key | Used for |
|---|---|
| `VERCEL_TOKEN` | Manual Vercel deploys / domain assignment |
| `CLOUDFLARE_API_TOKEN` | DNS for the eventual custom domain |
| `AIRTABLE_API_KEY` | Future: form submissions → Airtable (not wired yet) |

**Never** paste a secret into a tracked file (CLAUDE.md, README, HTML, JSON).

## Reports — render as HTML

Following the Alpha Sites convention: any audit, change-summary, or multi-section
findings doc goes in `reports/` as a self-contained HTML file. Path:
`reports/{slug}-{YYYY-MM-DD}.html`. Use the brand palette (cream `#f5f0e8`, navy
`#0a0a1f`, gold `#d4a957`, orange `#e35817`). Inline all CSS.

## Things to NOT do

- Don't move `.html` files out of their module folder without updating `vercel.json` rewrites + the cross-page links.
- Don't introduce a build step (Webpack, Vite, Next, etc.) without an explicit ask. The flat-file simplicity is the feature.
- Don't paste secrets. Reference by name from `.env`.
- Don't edit `foundation.css` for ad-hoc polish — use `spacing-fixes.css`.
- Don't change asset paths from root-relative (`/assets/…`) back to relative (`assets/…`) — they'd break across module folders.
