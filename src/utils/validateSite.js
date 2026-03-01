/**
 * 校验网站 JSON 结构，确保生成器可安全运行
 */
export function validateSite(site) {
  const errors = []
  if (!site || typeof site !== 'object') {
    return { valid: false, errors: ['网站 JSON 必须为非空对象'] }
  }
  if (!Array.isArray(site.pages) || site.pages.length === 0) {
    errors.push('site.pages 必须为非空数组')
  }
  const pathSet = new Set()
  for (let i = 0; i < (site.pages || []).length; i++) {
    const page = site.pages[i]
    if (!page || typeof page !== 'object') {
      errors.push(`site.pages[${i}] 必须为对象`)
      continue
    }
    if (typeof page.path !== 'string' || !/^\//.test(page.path)) {
      errors.push(`site.pages[${i}].path 必须为以 / 开头的字符串`)
    }
    if (pathSet.has(page.path)) {
      errors.push(`重复的 path: ${page.path}`)
    }
    pathSet.add(page.path)
    if (!Array.isArray(page.blocks)) {
      errors.push(`site.pages[${i}].blocks 必须为数组`)
    } else {
      for (let j = 0; j < page.blocks.length; j++) {
        const block = page.blocks[j]
        if (!block || typeof block !== 'object') {
          errors.push(`site.pages[${i}].blocks[${j}] 必须为对象`)
        } else if (typeof block.type !== 'string') {
          errors.push(`site.pages[${i}].blocks[${j}].type 必须为字符串`)
        }
      }
    }
  }
  return {
    valid: errors.length === 0,
    errors,
  }
}
