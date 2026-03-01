/**
 * 生成从当前页到目标页的链接（有 basePath 时用绝对路径，否则用相对路径，便于本地打开或本地服务器）
 */
export function getHref(currentPath, targetPath, basePath = '') {
  if (basePath) {
    return targetPath === '/' ? (basePath || '/') : (basePath + targetPath)
  }
  const currentDepth = (currentPath || '/').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).length
  const targetSegments = (targetPath || '/').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const up = '../'.repeat(currentDepth)
  const down = targetSegments.length ? targetSegments.join('/') + '/' : ''
  const rel = up + down
  return rel || '.'
}
