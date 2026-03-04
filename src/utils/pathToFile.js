/**
 * 将页面 path（如 '/'、'/about'）转为 dist 下的相对文件路径
 * '/' -> '' (表示 dist/index.html)
 * '/about' -> 'about' (表示 dist/about/index.html)
 * '/blog/hello' -> 'blog/hello'
 */
export function pathToFile(path) {
  if (typeof path !== 'string') return ''
  let p = path.trim().replace(/^\/+|\/+$/g, '')
  // 防止路径穿越：含 '..' 或空白时返回空，避免写入 dist 外或覆盖根页
  if (p.includes('..') || /^\s*$/.test(p)) return ''
  return p
}

/**
 * 得到该 path 对应要写入的目录（相对于 dist）
 * 用于生成 dist/${dir}/index.html
 */
export function pathToDir(path) {
  const file = pathToFile(path)
  return file === '' ? '.' : file
}

/**
 * 得到最终写入的完整路径片段（用于 fs）
 * path '/' -> 'index.html'
 * path '/about' -> 'about/index.html'
 */
export function pathToOutputFile(path) {
  const dir = pathToDir(path)
  return dir === '.' ? 'index.html' : `${dir}/index.html`
}
