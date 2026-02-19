# rickkwang.github.io

[中文](#zh-cn) | [English](#en)

<a id="zh-cn"></a>
## 中文

个人学术主页仓库（GitHub Pages 部署），采用“源码与发布产物分离”的结构：
- 源码在 `minimalist-academic-portfolio/`（React + Vite）
- Pages 发布产物在仓库根目录（`index.html`、`assets/`）

## 项目结构

```text
.
├─ .github/workflows/deploy.yml            # 自动构建并发布到根目录
├─ index.html                              # 发布产物（自动生成）
├─ assets/                                 # 发布产物（自动生成）
├─ package.json                            # 根目录脚本（代理到子项目）
└─ minimalist-academic-portfolio/
   ├─ App.tsx                              # 页面结构与视图逻辑
   ├─ constants.tsx                        # 个人信息、项目、论文、动态等内容
   ├─ types.ts                             # 数据类型定义
   ├─ package.json                         # 子项目脚本（vite dev/build/preview）
   ├─ vite.config.ts                       # Vite 配置（含 base 逻辑）
   ├─ dist/                                # 子项目构建输出
   └─ legacy-jekyll/                       # 旧 Jekyll 资料归档（不参与当前构建）
```

## 编辑约定

只改以下目录/文件：
- `minimalist-academic-portfolio/constants.tsx`
- `minimalist-academic-portfolio/App.tsx`
- `minimalist-academic-portfolio/types.ts`（当数据结构变化时）

不要直接手改以下发布产物：
- `index.html`（仓库根目录）
- `assets/`（仓库根目录）

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
2. 同步构建产物到根目录（`index.html`、`assets/`、`.nojekyll`）
3. 由 `github-actions[bot]` 自动提交发布产物

## 常见问题

- 页面内容改了但线上没更新  
  先确认你修改的是 `minimalist-academic-portfolio/` 下的源码，而不是根目录产物。

- 本地运行端口不是 3000  
  查看 `minimalist-academic-portfolio/vite.config.ts` 中 `server.port` 配置。

- 是否可以提交 API Key？  
  不可以。前端仓库和构建产物中都不应出现任何私钥或令牌。

---

<a id="en"></a>
## English

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
