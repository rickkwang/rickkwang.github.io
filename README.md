# rickkwang.github.io

Personal academic homepage built with React + Vite, deployed on GitHub Pages.

## Structure

```
portfolio/
├── content/              # Content files (Markdown)
│   ├── cv.md            # CV / Resume
│   ├── projects/        # Projects
│   ├── publications/   # Publications
│   └── zen/            # Notes / Blog posts
├── src/                 # Source code
│   ├── components/      # UI components
│   ├── views/          # Page views
│   └── constants.ts    # Site configuration
└── dist/                # Build output
```

## Update Content

- **CV**: `portfolio/content/cv.md`
- **Projects**: `portfolio/content/projects/*.md`
- **Publications**: `portfolio/content/publications/*.md`
- **Notes**: `portfolio/content/zen/*.md`

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

**projects/*.md**: `id`, `title`, `year`, `tech`, `description`
**publications/*.md**: `id`, `title`, `authors`, `venue`, `year`, `status`
**zen/*.md**: `id`, `title`, `date`, `description`

## Deploy

Push to `main` branch. GitHub Actions will build and deploy automatically.
