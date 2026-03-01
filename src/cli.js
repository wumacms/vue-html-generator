#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, isAbsolute } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pathToOutputFile } from './utils/pathToFile.js'
import { validateSite } from './utils/validateSite.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function loadSiteJson(inputPath) {
  const raw = await readFile(inputPath, 'utf-8')
  return JSON.parse(raw)
}

/**
 * 根据页面 path 计算相对 dist 根目录的深度，得到样式表相对路径
 * path '/' -> 深度 0 -> 'assets/style.css'
 * path '/about' -> 深度 1 -> '../assets/style.css'
 * path '/blog/foo' -> 深度 2 -> '../../assets/style.css'
 */
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

async function getHtmlTemplate() {
  const templatePath = join(__dirname, 'template.html')
  return await readFile(templatePath, 'utf-8')
}

function fillTemplate(template, { title, baseTag, metaDescription, styleTag, appHtml }) {
  return template
    .replace('{{title}}', title)
    .replace('{{baseTag}}', baseTag)
    .replace('{{metaDescription}}', metaDescription)
    .replace('{{styleTag}}', styleTag)
    .replace('<!--app-html-->', appHtml)
}

async function main() {
  const args = process.argv.slice(2)
  let input = 'site.json'
  let outDir = 'dist'
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) input = args[++i]
    else if (args[i] === '--out' && args[i + 1]) outDir = args[++i]
  }

  const inputPath = isAbsolute(input) ? input : join(process.cwd(), input)
  let site
  try {
    site = await loadSiteJson(inputPath)
  } catch (e) {
    console.error('读取网站 JSON 失败:', e.message)
    process.exit(1)
  }

  const { valid, errors } = validateSite(site)
  if (!valid) {
    console.error('网站 JSON 校验失败:')
    errors.forEach((err) => console.error('  -', err))
    process.exit(1)
  }

  // 动态加载构建后的 SSR 入口（需先执行 npm run build:ssr）
  let renderPage
  try {
    const entryPath = join(__dirname, '..', 'dist', 'ssr', 'entry-server.js')
    const mod = await import(pathToFileURL(entryPath).href)
    renderPage = mod.renderPage
  } catch (e) {
    console.error('请先执行: pnpm run build:ssr')
    console.error(e.message)
    process.exit(1)
  }

  const template = await getHtmlTemplate()
  const pages = site.pages

  const distRoot = join(process.cwd(), outDir)
  for (const page of pages) {
    const appHtml = await renderPage(page, site)
    const replacements = getTemplateReplacements(page, site, appHtml)
    const html = fillTemplate(template, replacements)
    const outputFile = pathToOutputFile(page.path)
    const outPath = join(distRoot, outputFile)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf-8')
    console.log('  ', page.path, '->', outputFile)
  }

  const publicDir = join(__dirname, '..', 'public')
  try {
    const { cp } = await import('node:fs/promises')
    const assetsDir = join(publicDir, 'assets')
    const outAssets = join(distRoot, 'assets')
    await mkdir(outAssets, { recursive: true })
    await cp(assetsDir, outAssets, { recursive: true })
    console.log('  已复制 public/assets ->', join(outDir, 'assets'))
  } catch (_) {}

  console.log('生成完成:', pages.length, '个页面 ->', outDir)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
