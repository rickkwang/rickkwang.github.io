# rickkwang.github.io

[中文](README.md) | [English](README.en.md)

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
