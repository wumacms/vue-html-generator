# 主题系统 (Theme System)

本项目支持通过 `site.json` 中的 `theme` 字段切换全局配色方案。所有主题变量定义在 `src/style.css` 中，基于 CSS Variables 实现。

## 可用主题列表

| 主题 ID | 名称 | 风格说明 | 背景色 | 主色 |
| :--- | :--- | :--- | :--- | :--- |
| `default` (root) | 默认 | 简洁的蓝白风格 | `#ffffff` | `#3b82f6` |
| `yellow-keys` | 黄黑琴键 | 品牌原生风格，高对比度黄黑 | `#000000` | `#fde047` |
| `cyber-purple` | 赛博紫 | 深色背景结合亮紫色，充满科技感 | `#0f172a` | `#a855f7` |
| `forest-zen` | 森林禅意 | 深绿色调，平静且自然 | `#064e3b` | `#34d399` |
| `royal-crimson` | 皇家绯红 | 深红与金色的高贵组合 | `#450a0a` | `#fbbf24` |
| `nordic-light` | 北欧极光 | 极简灰白与科技蓝，现代感十足 | `#f8fafc` | `#2563eb` |
| `github-light` | GitHub 浅色 | 经典的 GitHub 浅色模式界面 | `#ffffff` | `#0969da` |
| `github-dark` | GitHub 深色 | 经典的 GitHub 深色模式界面 | `#0d1117` | `#2f81f7` |
| `midnight-neon` | 夜幕霓虹 | 极深蓝背景搭配霓虹粉，活力四射 | `#020617` | `#f472b6` |
| `solarized-paper` | 日光纸砚 | 暖黄护眼背景，模拟纸张质感 | `#fdf6e3` | `#268bd2` |
| `matcha-latte` | 抹茶拿铁 | 清新的抹茶绿配奶白色，宁静舒适 | `#f0f4f0` | `#5d8233` |
| `ocean-depth` | 深海之渊 | 深邃的靛青色，灵感源自 Solarized | `#002b36` | `#2aa198` |
| `rose-petal` | 玫瑰花瓣 | 温柔的粉白风格，适合温馨场景 | `#fffafa` | `#db7093` |

## 如何使用

在你的 `site.json` 根节点修改 `theme` 字段：

```json
{
  "theme": "matcha-latte",
  ...
}
```

## 扩展主题

如需增加新主题，请在 `src/style.css` 中添加如下配置：

```css
[data-theme='your-theme-id'] {
    --background: #...;
    --foreground: #...;
    --primary: #...;
    --primary-foreground: #...;
    --muted: #...;
    --muted-foreground: #...;
    --border: #...;
}
```

添加完成后，执行 `pnpm run build:css` 即可在生成的静态页面中生效。
