# rickkwang.github.io

语言 / Language：在同一页切换，不跳转到其他文件。

<details open>
<summary><strong>中文</strong>（点击展开/收起）</summary>

个人学术主页仓库（GitHub Pages 部署），采用“源码与发布产物分离 + 内容 Markdown 化”的结构：
- 源码在 `minimalist-academic-portfolio/`（React + Vite）
- 页面内容在 `minimalist-academic-portfolio/content/`（按板块拆分 `.md`）
- Pages 发布产物在仓库根目录（`index.html`、`assets/`、`avatar.jpg` 等）

## 项目结构

```text
.
├─ .github/workflows/deploy.yml            # 自动构建并发布到根目录
├─ index.html                              # 发布产物（自动生成）
├─ assets/                                 # 发布产物（自动生成）
├─ avatar.jpg                              # 发布产物（自动生成）
├─ package.json                            # 根目录脚本（代理到子项目）
└─ minimalist-academic-portfolio/
   ├─ App.tsx                              # 路由与页面切换
   ├─ constants.tsx                        # 结构化数据与 Markdown 映射
   ├─ lib/markdown.ts                      # Frontmatter 解析
   ├─ content/
   │  ├─ cv.md
   │  ├─ projects/*.md
   │  ├─ publications/*.md
   │  └─ zen/*.md
   ├─ views/
   │  ├─ PortfolioViews.tsx
   │  └─ HomeSections.tsx
   ├─ components/                          # 通用 UI 组件
   ├─ package.json                         # 子项目脚本（vite dev/build/preview）
   ├─ vite.config.ts                       # Vite 配置（含 base 逻辑）
   └─ dist/                                # 子项目构建输出
```

## 内容维护（推荐入口）

- 修改 CV：`minimalist-academic-portfolio/content/cv.md`
- 修改项目：`minimalist-academic-portfolio/content/projects/*.md`
- 修改论文：`minimalist-academic-portfolio/content/publications/*.md`
- 修改 Zen Land：`minimalist-academic-portfolio/content/zen/*.md`

各内容文件使用 Frontmatter + Markdown 正文：

```md
---
id: example-id
title: Example Title
year: "2026"
---
# 正文标题

正文内容...
```

### Frontmatter 字段约定

- `projects/*.md`
  - 必填：`id` `title` `year` `tech` `description`
  - 可选：`github` `pdf` `demo` `figure_id` `figure_label` `figure_src`
  - `tech` 用逗号分隔（例如：`"PYTHON,NUMPY,VITE"`）
- `publications/*.md`
  - 必填：`id` `title` `authors` `venue` `year` `status`
  - `status` 建议：`Published` / `Preprint` / `In Preparation`
- `zen/*.md`
  - 必填：`id` `title` `date` `description`

## 代码维护（结构与样式）

- 首页模块：`minimalist-academic-portfolio/views/HomeSections.tsx`
- 页面容器：`minimalist-academic-portfolio/views/PortfolioViews.tsx`
- 导航与全局状态：`minimalist-academic-portfolio/App.tsx`
- 个人信息、新闻、研究方向、技能等结构化数据：`minimalist-academic-portfolio/constants.tsx`

## 编辑约定

不要直接手改以下发布产物（会被 CI 覆盖）：
- `index.html`（仓库根目录）
- `assets/`（仓库根目录）
- `avatar.jpg`（仓库根目录）

## 快速开始（在仓库根目录执行）

```bash
# 安装子项目依赖（首次或依赖变化后）
npm run bootstrap

# 本地开发（默认 http://localhost:3000）
npm run dev

# 生产构建（输出到 minimalist-academic-portfolio/dist）
npm run build

# 本地预览构建结果
npm run preview
```

环境建议：
- Node.js 20+（与 CI 工作流一致）

## 脚本说明（根目录）

- `npm run bootstrap`：执行 `npm --prefix minimalist-academic-portfolio ci`
- `npm run dev`：启动子项目 Vite 开发服务器
- `npm run build`：构建子项目（带 `--base=/`）
- `npm run preview`：预览子项目构建结果
- `npm run publish:local`：本地构建并将 `dist` 同步到仓库根目录

## 发布流程

日常更新：

```bash
git add .
git commit -m "update site content"
git push origin main
```

推送到 `main` 后，`.github/workflows/deploy.yml` 会自动：
1. 安装依赖并构建 `minimalist-academic-portfolio`
2. 同步构建产物到根目录（例如 `index.html`、`assets/`、`avatar.jpg`、`.nojekyll`）
3. 由 `github-actions[bot]` 自动提交发布产物

## 常见问题

- 页面内容改了但线上没更新  
  先确认你修改的是 `minimalist-academic-portfolio/content/` 或源码目录，而不是根目录产物。

- 本地运行端口不是 3000  
  查看 `minimalist-academic-portfolio/vite.config.ts` 中 `server.port` 配置。

- 是否可以提交 API Key？  
  不可以。前端仓库和构建产物中都不应出现任何私钥或令牌。

</details>

<details>
<summary><strong>English</strong> (Click to expand/collapse)</summary>

Personal academic homepage repository (GitHub Pages), organized with source/publish separation and markdown-based content management:
- Source code: `minimalist-academic-portfolio/` (React + Vite)
- Content files: `minimalist-academic-portfolio/content/` (modular `.md` files)
- Published artifacts: repository root (`index.html`, `assets/`, `avatar.jpg`, etc.)

## Project Structure

```text
.
├─ .github/workflows/deploy.yml            # Build and publish to repository root
├─ index.html                              # Published artifact (auto-generated)
├─ assets/                                 # Published artifact (auto-generated)
├─ avatar.jpg                              # Published artifact (auto-generated)
├─ package.json                            # Root-level scripts (proxy to subproject)
└─ minimalist-academic-portfolio/
   ├─ App.tsx                              # Routing and view switching
   ├─ constants.tsx                        # Structured data + Markdown mapping
   ├─ lib/markdown.ts                      # Frontmatter parser
   ├─ content/
   │  ├─ cv.md
   │  ├─ projects/*.md
   │  ├─ publications/*.md
   │  └─ zen/*.md
   ├─ views/
   │  ├─ PortfolioViews.tsx
   │  └─ HomeSections.tsx
   ├─ components/                          # Shared UI components
   ├─ package.json                         # Subproject scripts (vite dev/build/preview)
   ├─ vite.config.ts                       # Vite config (includes base logic)
   └─ dist/                                # Subproject build output
```

## Content Editing (Primary Workflow)

- Update CV: `minimalist-academic-portfolio/content/cv.md`
- Update projects: `minimalist-academic-portfolio/content/projects/*.md`
- Update publications: `minimalist-academic-portfolio/content/publications/*.md`
- Update Zen Land posts: `minimalist-academic-portfolio/content/zen/*.md`

Each content file uses frontmatter + markdown body:

```md
---
id: example-id
title: Example Title
year: "2026"
---
# Body title

Body content...
```

### Frontmatter Schema

- `projects/*.md`
  - Required: `id` `title` `year` `tech` `description`
  - Optional: `github` `pdf` `demo` `figure_id` `figure_label` `figure_src`
  - `tech` uses comma-separated values (example: `"PYTHON,NUMPY,VITE"`)
- `publications/*.md`
  - Required: `id` `title` `authors` `venue` `year` `status`
  - Recommended `status`: `Published` / `Preprint` / `In Preparation`
- `zen/*.md`
  - Required: `id` `title` `date` `description`

## Code Editing (Structure & Styling)

- Home modules: `minimalist-academic-portfolio/views/HomeSections.tsx`
- View container: `minimalist-academic-portfolio/views/PortfolioViews.tsx`
- Navigation/global state: `minimalist-academic-portfolio/App.tsx`
- Profile/news/research/skills structured data: `minimalist-academic-portfolio/constants.tsx`

## Editing Rules

Do not manually edit published artifacts (CI will overwrite them):
- `index.html` (repository root)
- `assets/` (repository root)
- `avatar.jpg` (repository root)

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
2. Sync built artifacts to repository root (for example: `index.html`, `assets/`, `avatar.jpg`, `.nojekyll`)
3. Commit published artifacts with `github-actions[bot]`

## FAQ

- I changed content but the live site did not update  
  Make sure you edited files under `minimalist-academic-portfolio/content/` or source files, not root-level build artifacts.

- Local dev server is not using port 3000  
  Check `server.port` in `minimalist-academic-portfolio/vite.config.ts`.

- Can I commit API keys/tokens here?  
  No. Never store secrets in frontend source code or published artifacts.

</details>
