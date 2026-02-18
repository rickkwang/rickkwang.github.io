## Source App (React + Vite)

这个目录是网站唯一源码入口。

### 主要编辑文件

- `constants.tsx`：个人信息、项目、论文、动态
- `App.tsx`：页面结构和展示逻辑
- `index.html`：Vite HTML 模板（一般无需频繁改）

### 本地运行

在仓库根目录执行：

```bash
npm run bootstrap
npm run dev
```

### 说明

- `legacy-jekyll/` 是旧版本内容归档，不参与当前构建。
- 当前部署由仓库根目录的 GitHub Actions 工作流完成。
