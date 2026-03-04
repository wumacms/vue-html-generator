import './style.css'
// 引入核心渲染器，BlockRenderer 内部已使用 import.meta.glob 自动加载所有 blocks，
// 这样 Vite 模块图中就会包含所有组件，Tailwind 4 插件能自动扫描到其中的类。
import './PageRenderer.vue'
import './components/BlockRenderer.vue'
