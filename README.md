# rickkwang.github.io

Personal academic homepage built with React + Vite, deployed on GitHub Pages.

## Structure

```
portfolio/
├── content/              # Content files (Markdown)
│   ├── cv.md            # CV / Resume
│   ├── work/            # Apps & tools (WORK)
│   ├── projects/        # Academic projects (ACADEMIC)
│   ├── publications/   # Publications (ACADEMIC)
│   └── zen/            # Zen Garden essays (ZEN)
├── src/                 # Source code
│   ├── components/      # UI components
│   ├── views/          # Page views
│   └── constants.ts    # Site configuration
└── dist/                # Build output
```

## Update Content

- **CV**: `portfolio/content/cv.md`
- **Work**: `portfolio/content/work/*.md`
- **Projects**: `portfolio/content/projects/*.md`
- **Publications**: `portfolio/content/publications/*.md`
- **Zen Garden**: `portfolio/content/zen/*.md`

New files must also be imported and added to the matching list in `portfolio/constants.tsx`.

Content files use Markdown + Frontmatter:

```md
---
id: project-id
title: Project Title
year: "2026"
---
# Body content
```

### Frontmatter Fields

**work/*.md**: `id`, `title`, `year`, `kind`, `tagline`, `cover`, `url`, `github` (`cover` / `url` / `github` may be empty)
**projects/*.md**: `id`, `title`, `year`, `tech`, `description`
**publications/*.md**: `id`, `title`, `authors`, `venue`, `year`, `status`
**zen/*.md**: `id`, `title`, `date`, `tag` (filter tab, defaults to `Thoughts`), `description`

## Deploy

Push to `main` branch. GitHub Actions will build and deploy automatically.
