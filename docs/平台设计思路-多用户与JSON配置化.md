# 建站平台设计思路：多用户与 JSON 配置化

本文档描述**拖拽式可视化建站平台**的整体设计：多用户与权限、数据层级、JSON 配置化、前后端职责，以及和静态站点生成、GitHub Pages 发布的关系。

---

## 一、核心设计理念

**用 JSON 实现网站、页面、区块的配置化。**

| 层级 | JSON 数据 | 渲染结果 |
|------|-----------|----------|
| **区块（Block）** | 区块 JSON | 通过平台内置区块模板 → 渲染出**区块样式** |
| **页面（Page）** | 页面 JSON | 由多个区块 JSON 组成 → 渲染出**页面样式** |
| **网站（Site）** | 网站 JSON | 由多个页面 + 全局配置组成 → 渲染出**整个网站样式** |

前端通过 **Vue 组件** 根据对应层级的 JSON 进行预览与展示；数据持久化在**数据库**，通过 **API** 下发。

---

## 二、用户与数据层级

```
用户（GitHub 登录）
  └── 多个网站（Site）
        └── 多个页面（Page）
              └── 多个区块（Block，基于平台内置区块模板）
```

- **多用户**：支持使用 **GitHub 登录**，每个登录用户独立拥有自己的站点与数据。
- **网站（Site）**：每个用户可创建**多个网站**，每个网站有独立配置（如站点名称、主题、域名/路径、SEO 等）。
- **页面（Page）**：每个网站下可创建**多个页面**（如首页、关于、联系等），每个页面有路径、标题、布局等。
- **区块（Block）**：每个页面由**多个区块**组成；区块基于**平台内置的区块模板**（如 Hero、图文、CTA、页脚等），用户通过拖拽与配置生成**区块 JSON**。

---

## 三、数据存储与 API

- **存储**：区块、页面、网站数据均保存在**数据库**中（关系或文档型均可，能按 用户 → 网站 → 页面 → 区块 查询即可）。
- **接口形态**：前端通过 **API** 获取：
  - **区块 JSON**：单区块配置；
  - **页面 JSON**：单页配置（含该页下区块列表或区块 ID 列表，由后端组装或前端再请求）；
  - **网站 JSON**：整站配置（含站点元信息、页面列表或页面 ID 列表，由后端组装或前端再请求）。

前端**只依赖这些 JSON** 即可完成预览与渲染，不依赖后端实时渲染 HTML。

---

## 四、前端渲染逻辑（预览与发布一致）

同一套「JSON → 视图」的规则既用于**平台内预览**，也用于**静态站生成**时的渲染，保证所见即所得。

```
区块 JSON  ──►  BlockRenderer（Vue 组件）  ──►  区块 DOM
页面 JSON  ──►  PageRenderer（组合多个 BlockRenderer）  ──►  页面 DOM
网站 JSON  ──►  SiteRenderer（路由/多页 + 每页 PageRenderer）  ──►  整站
```

- **BlockRenderer**：根据区块 JSON 的 `type`（对应内置区块模板）和 `props`/`styles` 等，渲染对应 Vue 组件。
- **PageRenderer**：根据页面 JSON 中的区块列表，顺序渲染多个 BlockRenderer。
- **SiteRenderer**：根据网站 JSON 中的页面列表与路由，在预览模式下做前端路由切换；在**静态生成**时则对每个页面分别输出一份 HTML。

这样，**区块 JSON → 区块样式，页面 JSON → 页面样式，网站 JSON → 整站样式** 的设计在前后端和生成管线中保持一致。

---

## 五、与静态站点生成、GitHub Pages 的关系

- **预览**：在平台内，前端通过 API 拿到 网站/页面/区块 JSON，用 Vue 组件实时渲染。
- **发布**：用户点击「发布到 GitHub Pages」时：
  1. 后端或构建服务根据**当前网站**拉取完整 **网站 JSON**（含所有页面及每页的区块 JSON，或可被生成器解析的聚合结构）。
  2. **静态站点生成器**（如本仓库）以该 JSON 为输入，对**每个页面**用同一套 Vue 组件（BlockRenderer / PageRenderer）在 Node 中做 **renderToString**，生成多份静态 HTML。
  3. 将生成的 `dist/`（及可选资源）推送到 GitHub Pages（如 gh-pages 分支或 GitHub Actions 部署）。

因此，**平台核心设计（JSON 配置化 + Vue 按 JSON 渲染）** 与 **静态生成** 是同一套数据模型与渲染逻辑：生成器只是「无头」地消费网站/页面/区块 JSON，输出静态文件，无需再维护另一套模板体系。

---

## 六、JSON 层级约定（建议）

便于前后端与生成器统一解析，可约定如下结构（可按实际扩展字段）。

### 6.1 区块 JSON（Block）

```json
{
  "id": "block-uuid",
  "type": "hero",
  "props": { "title": "...", "subtitle": "...", "image": "..." },
  "styles": { "backgroundColor": "#fff", "padding": "2rem" },
  "order": 0
}
```

- `type`：对应平台内置区块模板（如 `hero`、`features`、`cta`、`footer`）。
- `props`：该区块模板所需的展示数据。
- `styles`：可选，覆盖区块样式。
- `order`：在页面中的排序。

### 6.2 页面 JSON（Page）

```json
{
  "id": "page-uuid",
  "path": "/",
  "title": "首页",
  "meta": { "description": "..." },
  "blocks": [ /* 区块 JSON 或区块 id 列表，由 API 组装为完整区块 JSON */ ],
  "layout": "default"
}
```

- `path`：站内路径，用于路由与静态生成时的文件路径（如 `/` → `index.html`，`/about` → `about/index.html`）。
- `blocks`：该页包含的区块（完整 JSON 或需再请求的 id 列表，由 API 约定）。

### 6.3 网站 JSON（Site）

```json
{
  "id": "site-uuid",
  "name": "我的站点",
  "basePath": "/repo-name/",
  "theme": "default",
  "pages": [ /* 页面 JSON 或页面 id 列表，由 API 组装 */ ],
  "seo": { "title": "...", "description": "..." }
}
```

- `basePath`：部署到 GitHub Pages 子路径时使用（如 `/<repo>/`）。
- `pages`：该站所有页面（完整页面 JSON 或 id 列表，由 API 在「发布」或「获取整站」时组装）。

---

## 七、小结

| 要点 | 说明 |
|------|------|
| **多用户** | GitHub 登录，每用户多个网站。 |
| **层级** | 网站 → 页面 → 区块；区块基于内置区块模板。 |
| **存储** | 区块、页面、网站数据存数据库，通过 API 提供 JSON。 |
| **配置化** | 区块 JSON → 区块样式，页面 JSON → 页面样式，网站 JSON → 整站样式。 |
| **前端** | 用 Vue 组件（BlockRenderer / PageRenderer / SiteRenderer）按 JSON 渲染预览。 |
| **静态生成** | 以网站 JSON（含页面与区块）为输入，同一套 Vue 组件在 Node 中 SSR 出多页 HTML，发布到 GitHub Pages。 |

该设计保证「编辑 → 预览 → 发布」全程使用同一套 JSON 与渲染逻辑，静态站点生成器只需消费 API 或导出的网站 JSON，即可产出与预览一致的多页静态站。
