# 版本更新说明

## [Unreleased]

### 变更

- **Hero 变体拆分为独立组件**（2025-03-02）

  变更描述原文：

  > 已按你的要求把 Hero 的三种变体拆成独立组件，并简化了 `Hero.vue`。当前结构如下。
  >
  > **1. 新建三个变体组件**
  >
  > - **`HeroArticle.vue`** — 文章页 Hero：背景图 + 蒙版 + 面包屑/标题/徽章/日期/元信息
  > - **`HeroCover.vue`** — 全屏背景图 Hero（课程页等）：居中标题、高亮、副标题、标签
  > - **`HeroDefault.vue`** — 默认双栏 Hero（左文右图）：徽章、多行标题、副标题、备注、按钮、右侧图片
  >
  > 每个组件都接收 `block`、`basePath`、`currentPagePath`，需要链接的（面包屑、按钮）在各自组件里用 `getHref` 生成。
  >
  > **2. 简化后的 `Hero.vue`**
  >
  > `Hero.vue` 不再包含任何变体相关的模板或分支逻辑，只做两件事：
  >
  > - 用 `variant` 映射到对应组件：`article` → `HeroArticle`，`cover` → `HeroCover`，其余 → `HeroDefault`
  > - 用 `<component :is="HeroComponent">` 把 `block`、`basePath`、`currentPagePath` 传给选中的子组件
  >
  > 这样所有「长什么样」的逻辑都在三个子组件里，`Hero.vue` 只负责根据 `block.props.variant` 选组件。
  >
  > `BlockRenderer.vue` 无需修改，仍然只渲染 `hero` 类型，由 `Hero.vue` 内部按 variant 委托到上述三个组件。

- **CardGrid 变体拆分为独立组件**（2025-03-02）

  变更描述原文：

  > 已按你的要求把各变体拆成独立组件，并让 `CardGrid.vue` 只负责分发和外壳，具体如下。
  >
  > **新建的变体组件（7 个）**
  >
  > | 组件 | 用途 |
  > |------|------|
  > | **CardGridDefault.vue** | 默认：图标 + 标题 + 副标题（课程列表） |
  > | **CardGridTeacher.vue** | 教师卡片：图片、标题、副标题、badge、描述、meta |
  > | **CardGridCampus.vue** | 校区卡片：图片、标签、两个按钮等 |
  > | **CardGridEvent.vue** | 活动：badge、meta、标题、副标题、备注、链接 |
  > | **CardGridEventReview.vue** | 往期回顾：图片、日期、标题、副标题、链接 |
  > | **CardGridNews.vue** | 新闻：badge、标题、副标题、日期、链接 |
  > | **CardGridFallback.vue** | 未知 variant 时的简单网格兜底 |
  >
  > 每个变体只负责自己的卡片布局和展示逻辑，需要链接的变体（Campus / Event / EventReview / News）在组件内使用 `getHref`。
  >
  > **精简后的 CardGrid.vue**
  >
  > - **不再做变体判断**：只根据 `block.props?.variant` 从映射表里选组件并渲染。
  > - **保留的职责**：外层 `section` 和背景色（仅根据是否为 `event` 选 `bg-zinc-950` 或 `bg-black`）、可选的标题/副标题区域、底部按钮（若有）。
  > - **分发方式**：用 `variantComponents[variant]` 得到对应组件，用 `<Component :is="GridComponent" ... />` 渲染；未识别的 variant 使用 `CardGridFallback`。
  >
  > `BlockRenderer.vue` 和 `site.json` 无需修改，仍使用 `type: "cardGrid"` 和 `props.variant`，行为与之前一致。

## [0.1.0]

- 初始版本。
