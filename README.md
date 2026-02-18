# rickkwang.github.io

这是你的 GitHub Pages 学术网站仓库，已整理为一套可维护流程。

## 当前结构（统一后）

- 根目录：GitHub Pages 发布产物与部署工作流（`index.html`、`assets/`、`.github/workflows/deploy.yml`）
- 源码目录：`minimalist-academic-portfolio/`（React + Vite）
- 历史资料：`minimalist-academic-portfolio/legacy-jekyll/`（旧 Jekyll 内容，仅归档保留）

## 你应该修改哪里

- 只改源码目录：`minimalist-academic-portfolio/`
- 常改文件：
  - `minimalist-academic-portfolio/constants.tsx`（个人信息、项目、论文、动态）
  - `minimalist-academic-portfolio/App.tsx`（页面结构与样式）

## 不建议手改哪里

- `index.html`（仓库根目录）
- `assets/`（仓库根目录）

上面两项是构建产物，会由 GitHub Actions 自动更新。

## 安全约束

- 前端项目中不要注入或提交任何私钥（API Key、Token）。
- 若未来需要服务端密钥，必须放在后端或云函数，不进入浏览器构建产物。

## 在根目录直接运行（推荐）

```bash
# 首次或依赖变化后
npm run bootstrap

# 本地开发预览（http://localhost:3000）
npm run dev

# 手动构建（可选）
npm run build
```

## 日常发布流程

```bash
git add .
git commit -m "update site content"
git push origin main
```

推送后会自动触发 `.github/workflows/deploy.yml`，把最新页面发布到 GitHub Pages。
