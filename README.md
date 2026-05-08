# Claude Buzizi Foundation

The Foundation's public website — a flat-file static site (HTML + CSS + a tiny
shell.js for shared nav/footer). Auto-deployed to Vercel from this repo's `main`
branch.

## Mission
**Feed · Educate · Equip.** Carry forward the work Claude Buzizi's late father,
Claver Buzizi, began for the widows and families of Bisesero after the 1994
Genocide against the Tutsi.

## Quick start

Open any `.html` file directly in your browser — no build step.

```bash
# Or run a local server:
python3 -m http.server 8080
# Then visit http://localhost:8080/
```

## Structure
- Pages: flat at the root (`index.html`, `about.html`, `programs.html`, etc.)
- Module map: [`modules/MODULES.md`](modules/MODULES.md) — logical grouping of pages
- Styles: [`assets/foundation.css`](assets/foundation.css) (master) + [`assets/spacing-fixes.css`](assets/spacing-fixes.css) (overrides)
- Shared nav/footer: [`assets/shell.js`](assets/shell.js)
- Partner logos: [`assets/partners/`](assets/partners/)

## Deployment
- **GitHub** → `buziziclo/claude-buzizi-foundation`
- **Vercel** → auto-deploys `main` branch
- **Production URL** → see Vercel dashboard / latest commit status

## Editing
Full editing guide in [`CLAUDE.md`](CLAUDE.md).

<!-- Last verified deploy: 2026-05-08T17:02:56Z -->
