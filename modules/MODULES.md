# Module Map — Claude Buzizi Foundation

Pages are grouped by purpose under `modules/{group}/`. URLs are mapped to module
paths via [`../vercel.json`](../vercel.json) `rewrites`.

---

## 1. `core/` — Front door & always-visible
The pages a first-time visitor lands on. Edit these together when the brand voice
or top-level positioning changes.

| URL | File | Purpose |
|---|---|---|
| `/` | [`core/index.html`](core/index.html) | Home — hero, mission, pillars, story snapshot, founder, primary CTAs |
| `/about` | [`core/about.html`](core/about.html) | Long-form story: Bisesero → Claver → Claude → today |
| `/contact` | [`core/contact.html`](core/contact.html) | Contact form + direct channels |

**Shared chrome:** [`../assets/shell.js`](../assets/shell.js) renders the nav + footer for every page.

---

## 2. `programs/` — What we do & who we do it with
The "Resources" dropdown in the nav. These pages explain the work and who powers it.

| URL | File | Purpose |
|---|---|---|
| `/programs` | [`programs/programs.html`](programs/programs.html) | Three pillars: Feed (RAH) · Educate · Equip — flywheel mechanics |
| `/partners` | [`programs/partners.html`](programs/partners.html) | Partner logo wall: RAH, Earning Blueprints, Claude Buzizi, Mognetize Marketing |
| `/reports` | [`programs/reports.html`](programs/reports.html) | Annual report + financial statements |

---

## 3. `giving/` — Donation & involvement funnels
Every "way in" — from a $1 subscription to corporate matching.

| URL | File | Purpose |
|---|---|---|
| `/get-involved` | [`giving/get-involved.html`](giving/get-involved.html) | Six entry points: sponsor a seat, subscribe, ambassador, corporate, host event, donate |
| `/giving` | [`giving/giving.html`](giving/giving.html) | Donation flow with pillar designation |
| `/apply` | [`giving/claude-application.html`](giving/claude-application.html) | Inbound application: scholarship, masterclass seat, family meal support |

---

## 4. `brand-lab/` — Logo & identity drafts (internal)
Working drafts of logo treatments. Not linked from public nav — kept for review.

| URL | File | Purpose |
|---|---|---|
| `/logo-lab` | [`brand-lab/logo-lab.html`](brand-lab/logo-lab.html) | Logo Lab v1 — original explorations |
| `/logo-lab-v2` | [`brand-lab/logo-lab-v2.html`](brand-lab/logo-lab-v2.html) | v2 — palette refinements |
| `/logo-lab-v3` | [`brand-lab/logo-lab-v3.html`](brand-lab/logo-lab-v3.html) | v3 — typographic studies |
| `/logo-lab-v4` | [`brand-lab/logo-lab-v4.html`](brand-lab/logo-lab-v4.html) | v4 — final candidates |

---

## Shared assets (used by every module)

| Path | What |
|---|---|
| [`../assets/foundation.css`](../assets/foundation.css) | Master design system (colors, type scale, components) |
| [`../assets/spacing-fixes.css`](../assets/spacing-fixes.css) | Spacing/polish overrides applied site-wide |
| [`../assets/tokens.css`](../assets/tokens.css) | Color & font tokens |
| [`../assets/shell.js`](../assets/shell.js) | Renders shared nav + footer |
| [`../assets/partners/`](../assets/partners/) | Partner logos: RAH, Earning Blueprints, Claude Buzizi, Mognetize Marketing |
| [`../assets/photos/`](../assets/photos/) | Editorial / hero photography |
| [`../uploads/`](../uploads/) | User-uploaded images (CB portraits, screenshots) |

---

## Adding a new page (checklist)

1. Decide which module it belongs to (or create a new one if needed).
2. Copy a sibling page in that folder; rename and edit.
3. Update `<title>` and the `data-active` key on `<div data-shell="nav">`.
4. Add a clean-URL rewrite to [`../vercel.json`](../vercel.json).
5. Add a row to this file + the module's own `README.md`.
6. If it should appear in the nav, edit `NAV_ITEMS` in [`../assets/shell.js`](../assets/shell.js).

## Local preview

Asset paths are root-relative (`/assets/...`), so file:// won't resolve them.
Run a server:

```bash
# Recommended (full rewrites + clean URLs):
vercel dev

# Alternative (works for assets, but visit pages at /modules/{group}/{page}.html):
python3 -m http.server 8080
```
