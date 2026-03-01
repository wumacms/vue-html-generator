# 基于 Vue 技术栈的静态站点生成器 — 实现思路分析

## 一、目标与核心能力

静态站点生成器（SSG）在**构建时**将「内容 + 模板」渲染成静态 HTML/CSS/JS，部署到任意静态托管即可访问。

| 能力 | 说明 |
|------|------|
| 内容驱动 | 支持 Markdown/MDX、JSON、或从 CMS/API 拉取数据 |
| 组件化页面 | 用 Vue 组件写布局和页面，支持前端交互 |
| 预渲染 | 构建阶段生成每一条路由对应的 HTML |
| 资源处理 | 图片、样式、脚本的打包与优化 |

---

## 二、技术选型对比

### 方案 A：基于 Nuxt（推荐起步）

- **优势**：自带 `nuxt generate`、文件路由、Markdown 生态（如 `@nuxt/content`）、SEO 友好。
- **适用**：博客、文档站、营销页，希望快速上线、少造轮子。
- **核心**：`nitro` 的 `static` preset，构建时爬取所有路由并输出到 `dist/`。

### 方案 B：Vite + Vue + 自定义 SSG 插件

- **优势**：完全掌控构建管线，依赖少，适合「学习 SSG 原理」或做极简生成器。
- **实现**：用 Vite 的 `build` 跑多入口（每个路由一个入口），或单 SPA 入口 + 服务端渲染一次每个路由再写 HTML 文件。
- **适用**：教学、定制化工具、对打包体积和流程有强需求。

### 方案 C：参考 VuePress / VitePress 架构

- **思路**：主题 + 插件 + 约定式路由（如 `docs/**/*.md` → 路由），内部也是 Vite + Vue，但抽象成「文档/博客」场景。
- **适用**：要做成「可复用的文档/博客生成器」产品时参考其目录与插件设计。

---

## 三、推荐实现路径（以「自研轻量 SSG」为例）

若目标是**理解原理并实现一个自己的生成器**，建议采用 **Vite + Vue 3** 为核心，再逐步加「内容源」和「预渲染」。

### 3.1 整体架构

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  内容源         │     │  构建时          │     │  输出           │
│  - Markdown     │ ──► │  - 解析内容      │ ──► │  - dist/*.html  │
│  - JSON/数据    │     │  - Vue 渲染      │     │  - assets       │
│  - 路由配置     │     │  - 多入口/SSR 快照│     │  - 可部署到 CDN │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 3.2 核心步骤

#### 步骤 1：约定内容与路由

- **内容**：例如 `content/**/*.md` 或 `content/posts/*.json`。
- **路由**：可由「文件路径」推导（如 `content/about.md` → `/about`），或由配置文件显式声明（如 `routes: ['/', '/about', '/blog/1']`）。

#### 步骤 2：内容解析

- **Markdown**：使用 `markdown-it`、`remark`/`rehype` 或 `unified` 转成 HTML 或 AST；若需在 MD 里用 Vue 组件，可上 **MDC** 或 **MDX（需 Vue 的 MDX 方案）**。
- **元数据**：Frontmatter（如 `gray-matter`）解析 title、date、layout 等，供布局与 SEO 使用。

#### 步骤 3：生成「页面入口」或「预渲染列表」

两种常见方式：

- **多入口**：为每个路由生成一个 Vite 入口（如 `entry/about.js`），每个入口挂载同一个根组件但传入不同 `route`/`pageData`，构建得到多份 HTML（需 Vite 插件支持多入口 HTML 或自定义脚本）。
- **预渲染（更常见）**：保持 SPA 单入口，在 Node 构建脚本里：
  1. 用 **Vite 的 SSR 能力**（`vite.ssrLoadModule` + `renderToString`）对每个路由渲染一次；
  2. 把得到的 HTML 注入到模板中，并写出到 `dist/about/index.html` 等。

#### 步骤 4：HTML 模板与资源

- 模板：一份 `index.html`，内含 `<!--ssr-outlet-->` 或占位符，预渲染时用当前路由的 HTML 替换；同时注入当前路由的 `__INITIAL_STATE__`（如 pageData）供前端 hydrate。
- 资源：沿用 Vite 的 rollup 打包，CSS/JS 以 hash 文件名输出，在模板中正确引用。

#### 步骤 5：Vite 插件职责

- **虚拟模块**：如 `virtual:routes` 或 `virtual:pages`，在编译时根据 `content/` 和配置生成路由列表、页面元数据，供入口和预渲染脚本使用。
- **多 HTML 或自定义输出**：若采用「多入口」，需生成多个 HTML 或在一个插件里 hook `generateBundle` 写出多份 HTML。

---

## 四、目录结构建议

```
vue-html-generator/
├── content/              # 内容源
│   ├── index.md
│   ├── about.md
│   └── blog/
│       └── first-post.md
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── layouts/
│   │   └── Default.vue
│   ├── pages/             # 或由 content 自动生成路由
│   │   └── [...slug].vue  # 动态路由对应 Markdown
│   └── components/
├── public/
├── build/                 # 构建脚本
│   ├── prerender.js       # 预渲染：遍历路由，SSR 输出 HTML
│   └── vite-plugin-ssg.js # 虚拟模块、多 HTML 等
├── index.html
├── vite.config.js
└── package.json
```

---

## 五、关键技术点

| 环节 | 可选方案 |
|------|----------|
| Markdown 解析 | `markdown-it`、`remark`+`rehype`、`gray-matter`（Frontmatter） |
| Vue 中渲染 MD | 自定义组件 + `v-html`（仅 HTML 时），或 MDC / MDX 以支持组件 |
| 预渲染 | Vite SSR：`createSSRApp` + `renderToString`，或使用 `vite-plugin-ssr`/`vite-ssg` 等现成方案 |
| 路由与数据 | 构建时生成 `routes.json` 或注入到虚拟模块，前端用 `createRouter` + `createWebHistory()` 或 `createMemoryHistory()`（SSR 时） |

---

## 六、若采用 Nuxt 的简化路线

不自己写预渲染管线时，可直接用 Nuxt：

1. `npx nuxi init my-ssg` 初始化项目。
2. `nuxt.config` 中设置 `ssr: true`（默认），运行 `nuxt generate` 即得到静态站。
3. 内容用 `@nuxt/content` 管理 Markdown，自动生成路由与元数据。
4. 页面用 Vue 组件 + `<ContentRenderer>` 或自定义布局即可。

这样「静态站点生成」由 Nuxt/Nitro 完成，你专注内容与页面设计。

---

## 七、总结与建议

- **想快速做出站点**：用 **Nuxt + @nuxt/content**，走 `nuxt generate`。
- **想深入理解 SSG**：用 **Vite + Vue 3**，自己实现「内容解析 → 路由列表 → 预渲染脚本 → 多 HTML 输出」；可参考或复用 **vite-ssg** 的预渲染逻辑。
- **想做成通用产品**：在 Vite+Vue 方案上抽象出「主题、插件、约定式路由」，参考 VitePress 的目录与插件设计。

如果你确定采用其中一种（例如「从零用 Vite+Vue 做」或「用 Nuxt 做」），可以下一步细化：例如选定内容格式（仅 Markdown / 带 Frontmatter）、路由规则，再落到具体目录和第一版 `vite.config` / `prerender.js` 的伪代码或实现。
