# rickkwang.github.io

[中文](README.md) | [English](README.en.md)

Personal academic homepage repository (deployed with GitHub Pages), organized with a clear separation between source code and published artifacts:
- Source code: `minimalist-academic-portfolio/` (React + Vite)
- Published artifacts: repository root (`index.html`, `assets/`)

## Project Structure

```text
.
├─ .github/workflows/deploy.yml            # Build and publish to repository root
├─ index.html                              # Published artifact (auto-generated)
├─ assets/                                 # Published artifact (auto-generated)
├─ package.json                            # Root-level scripts (proxy to subproject)
└─ minimalist-academic-portfolio/
   ├─ App.tsx                              # Page structure and view logic
   ├─ constants.tsx                        # Profile, projects, publications, updates
   ├─ types.ts                             # Type definitions
   ├─ package.json                         # Subproject scripts (vite dev/build/preview)
   ├─ vite.config.ts                       # Vite config (includes base logic)
   ├─ dist/                                # Subproject build output
   └─ legacy-jekyll/                       # Archived Jekyll content (not in active build)
```

## Editing Rules

Edit these files/directories:
- `minimalist-academic-portfolio/constants.tsx`
- `minimalist-academic-portfolio/App.tsx`
- `minimalist-academic-portfolio/types.ts` (when data structures change)

Do not manually edit these published artifacts:
- `index.html` (repository root)
- `assets/` (repository root)

## Quick Start (run from repository root)

```bash
# Install subproject dependencies (first time or when dependencies change)
npm run bootstrap

# Local development (default: http://localhost:3000)
npm run dev

# Production build (output: minimalist-academic-portfolio/dist)
npm run build

# Preview build output locally
npm run preview
```

Recommended environment:
- Node.js 20+ (matches CI workflow)

## Script Reference (root package.json)

- `npm run bootstrap`: runs `npm --prefix minimalist-academic-portfolio ci`
- `npm run dev`: starts the subproject Vite dev server
- `npm run build`: builds the subproject (with `--base=/`)
- `npm run preview`: previews the subproject build output
- `npm run publish:local`: builds locally and syncs `dist` to repository root

## Deployment Flow

Typical update flow:

```bash
git add .
git commit -m "update site content"
git push origin main
```

After pushing to `main`, `.github/workflows/deploy.yml` will automatically:
1. Install dependencies and build `minimalist-academic-portfolio`
2. Sync artifacts to repository root (`index.html`, `assets/`, `.nojekyll`)
3. Commit published artifacts with `github-actions[bot]`

## FAQ

- I changed content but the live site did not update  
  Make sure you edited source files under `minimalist-academic-portfolio/`, not root-level build artifacts.

- Local dev server is not using port 3000  
  Check `server.port` in `minimalist-academic-portfolio/vite.config.ts`.

- Can I commit API keys/tokens here?  
  No. Never store secrets in frontend source code or published artifacts.
