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

### 在页面上点击按钮生成

若不想在终端敲命令，可启动本地管理页，在浏览器中点击「生成静态站点」触发生成：

```bash
# 确保已执行过 build:ssr 和 build:css
pnpm run dev
```

`dev` 会先构建管理页（Vue 应用，输出到 `dist-admin/`），再启动服务。浏览器打开 http://localhost:3579/ ，点击「生成静态站点」即可根据根目录 `site.json` 生成到 `dist/`。端口可通过环境变量 `PORT` 修改。仅更新管理页 UI 时可单独执行 `pnpm run build:admin`。

### 通过 CI 生成并部署到 GitHub Pages（不部署管理页）

不跑管理页和 API，只在 CI 里生成并把 `dist/` 推到 GitHub Pages：

1. **仓库内保留**根目录 `site.json`（或由 workflow 从别处拉取）。
2. **开启 GitHub Pages**：仓库 Settings → Pages → Source 选 **Deploy from a branch**，Branch 选 **gh-pages**（CI 会把 `dist/` 推到这个分支）。
3. **触发方式**：
   - **Push**：推送到 `main` 分支会自动跑 workflow，生成并部署。
   - **手动**：在 GitHub 的 Actions 页选择「生成并部署静态站」，点「Run workflow」。

workflow 定义在 [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)，详细说明见文档 [静态站点生成模块-实现思路.md 第十二节](./docs/静态站点生成模块-实现思路.md#十二不部署管理页只用-ci-生成的实现方式详细)。

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
│   ├── cli.js              # 生成脚本入口（命令行）
│   ├── generate.js         # 生成核心逻辑（CLI 与 API 共用）
│   ├── server.js           # 本地管理服务（托管 dist-admin + /api/generate）
│   ├── admin/              # 管理页 Vue 应用
│   │   ├── main.js         # 入口
│   │   └── App.vue         # 管理页组件（「生成静态站点」按钮）
│   ├── entry-server.js     # SSR 入口（renderPage）
│   ├── PageRenderer.vue    # 页面壳 + 区块列表
│   ├── template.html       # HTML 壳模板
│   ├── components/
│   │   ├── BlockRenderer.vue
│   │   └── blocks/         # Hero, Features, Cta, Footer
│   └── utils/
│       ├── pathToFile.js
│       └── validateSite.js
├── .github/workflows/
│   └── deploy.yml           # CI：生成静态站并部署到 GitHub Pages
├── admin.html              # 管理页 HTML 入口（Vite 构建用）
├── vite.config.admin.js    # 管理页构建配置（输出 dist-admin/）
├── site.json               # 示例网站 JSON
├── dist/                   # 静态站点生成输出（gitignore）
├── dist-admin/             # 管理页构建输出（gitignore）
└── docs/                   # 设计文档
```

## 文档

- [平台设计思路（多用户、JSON 配置化）](./docs/平台设计思路-多用户与JSON配置化.md)
- [静态生成与 GitHub Pages 选型](./docs/可视化建站-静态生成与发布分析.md)
- [静态站点生成模块实现思路](./docs/静态站点生成模块-实现思路.md)

## License

MIT
