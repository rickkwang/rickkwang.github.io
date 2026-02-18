# rickkwang.github.io

这是你的 GitHub Pages 学术网站仓库，已整理为一套可维护流程。

## 你应该修改哪里

- 只改源码目录：`minimalist-academic-portfolio/`
- 常改文件：
  - `minimalist-academic-portfolio/constants.tsx`（个人信息、项目、论文、动态）
  - `minimalist-academic-portfolio/App.tsx`（页面结构与样式）

## 不建议手改哪里

- `index.html`（仓库根目录）
- `assets/`（仓库根目录）

上面两项是构建产物，会由 GitHub Actions 自动更新。

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
