# vue-html-generator

基于 Vue 3 的**静态站点生成模块**：根据「网站 JSON」生成多页静态 HTML，用于拖拽式建站平台发布到 GitHub Pages 等场景。

## 快速开始

```bash
# 安装依赖（需使用 pnpm）
pnpm install

# 1. 先构建 SSR 入口与 Tailwind CSS
pnpm run build:ssr
pnpm run build:css

# 2. 使用根目录示例 site.json 生成静态站到 dist/
pnpm run generate

# 或一步完成：构建 + 生成
pnpm run export
```

指定输入/输出：

```bash
node src/cli.js --input site.json --out dist
```

生成结果在 `dist/`：`index.html`（首页）、`about/index.html`（关于页）、`assets/style.css`（Tailwind 编译样式）等，可直接部署到任意静态托管或 GitHub Pages。

## 输入：网站 JSON

需提供一份**完整网站 JSON**，结构示例见 [site.json](./site.json)：

- **site**：`name`、`basePath`（可选，如 GitHub 子路径 `'/repo-name/'`）、`seo`、`pages`
- **pages[]**：每页 `path`（如 `'/'`、`'/about'`）、`title`、`meta`、`blocks`
- **blocks[]**：每块 `type`（`hero` | `features` | `cta` | `footer`）、`props`、`styles`、`order`

由建站平台在「发布」时从 API 拉取并组装好该 JSON，或导出为文件后传入本模块。

## 内置区块

| type     | 说明     |
|----------|----------|
| `hero`   | 首屏标题、副标题、可选图片 |
| `features` | 特性网格（title + items[]） |
| `cta`    | 行动号召：标题、文案、按钮 |
| `footer` | 页脚版权与链接 |

区块样式使用 **Tailwind CSS** 工具类编写，无自定义 CSS。可在 [src/components/blocks/](./src/components/blocks/) 扩展或与建站平台共用区块组件；新增/修改工具类后需执行 `pnpm run build:css` 重新编译样式。

## 项目结构

```
├── src/
│   ├── cli.js              # 生成脚本入口
│   ├── entry-server.js     # SSR 入口（renderPage）
│   ├── PageRenderer.vue    # 页面壳 + 区块列表
│   ├── template.html       # HTML 壳模板
│   ├── components/
│   │   ├── BlockRenderer.vue
│   │   └── blocks/         # Hero, Features, Cta, Footer
│   └── utils/
│       ├── pathToFile.js
│       └── validateSite.js
├── site.json               # 示例网站 JSON
├── dist/                   # 生成输出（gitignore）
└── docs/                   # 设计文档
```

## 文档

- [平台设计思路（多用户、JSON 配置化）](./docs/平台设计思路-多用户与JSON配置化.md)
- [静态生成与 GitHub Pages 选型](./docs/可视化建站-静态生成与发布分析.md)
- [静态站点生成模块实现思路](./docs/静态站点生成模块-实现思路.md)

## License

MIT
