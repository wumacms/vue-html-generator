/**
 * 静态站点生成核心逻辑，供 CLI 与 HTTP API 共用
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, isAbsolute } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pathToOutputFile } from './utils/pathToFile.js'
import { validateSite } from './utils/validateSite.js'
import { localizeSiteImages } from './utils/images.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const defaultProjectRoot = join(__dirname, '..')

async function loadSiteJson(inputPath) {
  const raw = await readFile(inputPath, 'utf-8')
  return JSON.parse(raw)
}

function getStyleHrefForPage(pagePath, basePath) {
  if (basePath) {
    const base = basePath.endsWith('/') ? basePath : basePath + '/'
    return base + 'assets/style.css'
  }
  const segments = (pagePath || '/').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const depth = segments.length
  const prefix = depth === 0 ? '' : '../'.repeat(depth)
  return prefix + 'assets/style.css'
}

function getTemplateReplacements(page, site, appHtml) {
  const basePath = site.basePath ?? ''
  const baseTag = basePath
    ? `<base href="${basePath.endsWith('/') ? basePath : basePath + '/'}">`
    : ''
  const metaDesc = (page.meta?.description || site.seo?.description)
    ? `<meta name="description" content="${escapeHtml(page.meta?.description || site.seo?.description)}">`
    : ''
  const styleHref = getStyleHrefForPage(page.path, basePath)
  const styleTag = `<link rel="stylesheet" href="${escapeHtml(styleHref)}">`
  const title = escapeHtml(page.title || site.name || '页面')
  return { title, baseTag, metaDescription: metaDesc, styleTag, appHtml }
}

function escapeHtml(s) {
  if (typeof s !== 'string') return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function getHtmlTemplate(projectRoot) {
  const templatePath = join(projectRoot, 'src', 'template.html')
  return await readFile(templatePath, 'utf-8')
}

function fillTemplate(template, { title, baseTag, metaDescription: metaDesc, styleTag, appHtml }) {
  return template
    .replace('{{title}}', title)
    .replace('{{baseTag}}', baseTag)
    .replace('{{metaDescription}}', metaDesc)
    .replace('{{styleTag}}', styleTag)
    .replace('<!--app-html-->', appHtml)
}

/** 按页面深度将 HTML 中的 images/ 路径改为相对路径，便于 GitHub Pages 等子路径部署 */
function fixImagePathsForPage(html, pagePath, basePath) {
  if (basePath) return html
  const segments = (pagePath || '/').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const depth = segments.length
  const prefix = depth === 0 ? '' : '../'.repeat(depth)
  return html.replace(/src="images\//g, `src="${prefix}images/`)
}

/**
 * 执行静态站点生成
 * @param {Object} options
 * @param {string} [options.inputPath] - site.json 的路径（与 options.site 二选一）
 * @param {Object} [options.site] - 完整网站 JSON 对象（与 options.inputPath 二选一，传入则不从文件读取）
 * @param {string} options.distRoot - 输出目录的绝对路径或相对 projectRoot 的路径
 * @param {string} [options.projectRoot] - 项目根目录（用于定位 template、SSR 入口、public）
 * @returns {Promise<{ success: boolean, message: string, pagesCount?: number, error?: string }>}
 */
export async function runGenerate({ inputPath, distRoot, projectRoot = defaultProjectRoot, site: siteOption }) {
  const resolvedDist = isAbsolute(distRoot) ? distRoot : join(projectRoot, distRoot)

  let site
  if (siteOption != null && typeof siteOption === 'object' && !Array.isArray(siteOption)) {
    site = siteOption
  } else {
    if (inputPath == null || inputPath === '') {
      return { success: false, message: '请提供 inputPath 或 site', error: 'inputPath 与 site 至少需要提供其一' }
    }
    const resolvedInput = isAbsolute(inputPath) ? inputPath : join(projectRoot, inputPath)
    try {
      site = await loadSiteJson(resolvedInput)
    } catch (e) {
      return { success: false, message: '读取网站 JSON 失败', error: e.message }
    }
  }

  const { valid, errors } = validateSite(site)
  if (!valid) {
    return {
      success: false,
      message: '网站 JSON 校验失败',
      error: errors.join('; '),
    }
  }

  let renderPage
  const entryPath = join(projectRoot, 'dist', 'ssr', 'entry-server.js')
  try {
    const mod = await import(pathToFileURL(entryPath).href)
    renderPage = mod.renderPage
  } catch (e) {
    return {
      success: false,
      message: '请先执行: pnpm run build:ssr',
      error: e.message,
    }
  }

  const template = await getHtmlTemplate(projectRoot)
  const siteForRender = await localizeSiteImages(site, resolvedDist, projectRoot)
  const pages = siteForRender.pages

  for (const page of pages) {
    const appHtml = await renderPage(page, siteForRender)
    const replacements = getTemplateReplacements(page, site, appHtml)
    let html = fillTemplate(template, replacements)
    html = fixImagePathsForPage(html, page.path, site.basePath)
    const outputFile = pathToOutputFile(page.path)
    const outPath = join(resolvedDist, outputFile)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf-8')
  }

  const publicDir = join(projectRoot, 'public')
  try {
    const { cp } = await import('node:fs/promises')
    const assetsDir = join(publicDir, 'assets')
    const outAssets = join(resolvedDist, 'assets')
    await mkdir(outAssets, { recursive: true })
    await cp(assetsDir, outAssets, { recursive: true })
  } catch (_) {}

  return {
    success: true,
    message: `生成完成：${pages.length} 个页面已输出到 ${resolvedDist}`,
    pagesCount: pages.length,
  }
}
