/**
 * 静态站点生成时：从 site JSON 收集图片 URL，下载到 dist/images，并返回替换后的 site 副本
 */
import { createHash } from 'node:crypto'
import { writeFile, mkdir, copyFile, readFile } from 'node:fs/promises'
import { join, isAbsolute } from 'node:path'

const IMAGE_KEYS = new Set(['image', 'avatar', 'qrImage'])
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg|ico)(\?.*)?$/i

function isImageUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false
  const s = value.trim()
  if (s.startsWith('http://') || s.startsWith('https://')) return true
  if (s.startsWith('data:')) return false
  return true
}

function getExtensionFromUrl(url) {
  try {
    const pathname = url.startsWith('http') ? new URL(url).pathname : url
    const m = pathname.match(IMAGE_EXT_RE)
    return m ? m[1].toLowerCase() : '.png'
  } catch {
    return '.png'
  }
}

function uniqueFilename(url) {
  const hash = createHash('sha256').update(url).digest('hex').slice(0, 12)
  const ext = getExtensionFromUrl(url)
  return `${hash}${ext}`
}

/**
 * 递归收集 site 中所有作为图片使用的 URL（已知字段名：image、avatar、qrImage）
 */
export function collectImageUrls(obj, out = new Set(), key = '') {
  if (obj === null || typeof obj !== 'object') {
    if (typeof obj === 'string' && IMAGE_KEYS.has(key) && isImageUrl(obj)) out.add(obj.trim())
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectImageUrls(item, out, i))
    return out
  }
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && IMAGE_KEYS.has(k) && isImageUrl(v)) out.add(v.trim())
    else collectImageUrls(v, out, k)
  }
  return out
}

/**
 * 将单个图片 URL 下载或复制到 dist/images，返回相对路径（如 images/xxx.png）
 */
export async function downloadOneImage(url, imagesDir, projectRoot) {
  await mkdir(imagesDir, { recursive: true })
  const filename = uniqueFilename(url)
  const outPath = join(imagesDir, filename)

  if (url.startsWith('http://') || url.startsWith('https://')) {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`下载失败 ${url}: ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(outPath, buf)
  } else {
    const localPath = isAbsolute(url) ? url : join(projectRoot, 'public', url.replace(/^\//, ''))
    await copyFile(localPath, outPath).catch(() => readFile(localPath).then((b) => writeFile(outPath, b)))
  }

  return `/images/${filename}`
}

/**
 * 批量下载/复制图片到 dist/images，返回 Map<原 URL, 本地路径>
 */
export async function downloadImagesToDist(urls, resolvedDist, projectRoot) {
  const imagesDir = join(resolvedDist, 'images')
  const map = new Map()
  for (const url of urls) {
    try {
      const localPath = await downloadOneImage(url, imagesDir, projectRoot)
      map.set(url, localPath)
    } catch (e) {
      console.warn(`[images] 跳过图片 ${url}: ${e.message}`)
    }
  }
  return map
}

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(deepClone)
  const o = {}
  for (const [k, v] of Object.entries(obj)) o[k] = deepClone(v)
  return o
}

/**
 * 对 site 的深拷贝中，将出现在 urlToLocal 中的字符串替换为本地路径
 */
function replaceUrlsInObject(obj, urlToLocal) {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map((item) => replaceUrlsInObject(item, urlToLocal))
  const o = {}
  for (const [k, v] of Object.entries(obj)) {
    o[k] =
      typeof v === 'string' && IMAGE_KEYS.has(k) && urlToLocal.has(v.trim())
        ? urlToLocal.get(v.trim())
        : replaceUrlsInObject(v, urlToLocal)
  }
  return o
}

/**
 * 收集 site 中图片 URL，下载到 resolvedDist/images，返回替换为本地路径后的 site 副本
 */
export async function localizeSiteImages(site, resolvedDist, projectRoot) {
  const urls = collectImageUrls(site)
  if (urls.size === 0) return site
  const urlToLocal = await downloadImagesToDist(urls, resolvedDist, projectRoot)
  if (urlToLocal.size === 0) return site
  return replaceUrlsInObject(deepClone(site), urlToLocal)
}
