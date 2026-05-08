# Module Map — Claude Buzizi Foundation

The Foundation site is a flat-file static site (HTML at the repo root) so it deploys
cleanly to Vercel and stays editable in Lovable. This file maps every page to its
**logical module**, so when a section needs work you know which files move together.

**Why flat at root?** Lovable + Vercel both expect a flat structure. Moving pages
into subfolders would break every relative `assets/…` reference and every nav link
in `assets/shell.js`. Instead, modules live as a *logical* grouping you can navigate
from this file.

---

## 1. `core/` — Front door & always-visible
The pages a first-time visitor lands on. Edit these together when the brand voice
or top-level positioning changes.

| Page | Purpose |
|---|---|
| [`index.html`](../index.html) | Home — hero, mission, pillars, story snapshot, founder, primary CTAs |
| [`about.html`](../about.html) | Long-form story: Bisesero → Claver → Claude → today |
| [`contact.html`](../contact.html) | Contact form + direct channels |

**Shared chrome:** `assets/shell.js` renders the nav + footer for every page.

---

## 2. `programs/` — What we do & who we do it with
The "Resources" dropdown in the nav. These pages explain the work and who powers it.

| Page | Purpose |
|---|---|
| [`programs.html`](../programs.html) | Three pillars: Feed (RAH) · Educate · Equip — flywheel mechanics |
| [`partners.html`](../partners.html) | Partner logo wall: Rise Against Hunger, Earning Blueprints, Claude Buzizi, Mognetize Marketing |
| [`reports.html`](../reports.html) | Annual report + financial statements (placeholder until 2025 close) |

---

## 3. `giving/` — Donation & involvement funnels
Every "way in" — from a $1 subscription to corporate matching.

| Page | Purpose |
|---|---|
| [`get-involved.html`](../get-involved.html) | Six entry points: sponsor a seat, subscribe, ambassador, corporate, host event, donate |
| [`giving.html`](../giving.html) | Donation flow with pillar designation |
| [`claude-application.html`](../claude-application.html) | Inbound application: scholarship, masterclass seat, family meal support |

---

## 4. `brand-lab/` — Logo & identity drafts (internal/working)
Working drafts of logo treatments. Not linked from public nav — kept for review.

| Page | Purpose |
|---|---|
| [`logo-lab.html`](../logo-lab.html) | Logo Lab v1 — original explorations |
| [`logo-lab-v2.html`](../logo-lab-v2.html) | v2 — palette refinements |
| [`logo-lab-v3.html`](../logo-lab-v3.html) | v3 — typographic studies |
| [`logo-lab-v4.html`](../logo-lab-v4.html) | v4 — final candidates |

---

## Shared assets (used by every module)

| Path | What |
|---|---|
| [`assets/foundation.css`](../assets/foundation.css) | Master design system (colors, type scale, components) |
| [`assets/spacing-fixes.css`](../assets/spacing-fixes.css) | Spacing/polish overrides applied site-wide |
| [`assets/tokens.css`](../assets/tokens.css) | Color & font tokens |
| [`assets/shell.js`](../assets/shell.js) | Renders shared nav + footer (`<div data-shell="nav">`) |
| [`assets/tweaks-panel.jsx`](../assets/tweaks-panel.jsx) | Dev-only design tweaks panel (React/Babel) |
| [`assets/partners/`](../assets/partners/) | Partner logos: RAH, Earning Blueprints, Claude Buzizi, Mognetize Marketing |
| [`assets/photos/`](../assets/photos/) | Editorial / hero photography |
| [`uploads/`](../uploads/) | User-uploaded images (CB portraits, screenshots) |

---

## Routing

`vercel.json` provides clean URLs in production — no `.html` extension required:

| URL | Serves |
|---|---|
| `/` | `index.html` |
| `/about` | `about.html` |
| `/programs` | `programs.html` |
| `/partners` | `partners.html` |
| `/reports` | `reports.html` |
| `/get-involved` | `get-involved.html` |
| `/giving` | `giving.html` |
| `/contact` | `contact.html` |
| `/apply` | `claude-application.html` |

`assets/shell.js` still uses `.html` hrefs so local file:// previews work — Vercel
serves them at both the clean and the `.html` URL.
