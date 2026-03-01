import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import PageRenderer from './PageRenderer.vue'

/**
 * 对单页做服务端渲染，返回 HTML 片段（不含壳模板）
 * @param {object} page - 页面 JSON
 * @param {object} site - 网站 JSON
 * @returns {Promise<string>}
 */
export async function renderPage(page, site) {
  const app = createSSRApp(PageRenderer, {
    page,
    site,
  })
  return await renderToString(app)
}
