/**
 * 简易本地服务：提供管理页（Vue 构建产物）与「生成静态站点」API
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runGenerate } from './generate.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const projectRoot = join(__dirname, '..')
const adminRoot = join(projectRoot, 'dist-admin')
const PORT = Number(process.env.PORT) || 3579

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

function send(res, statusCode, body, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType })
  res.end(body)
}

function sendJson(res, statusCode, data) {
  send(res, statusCode, JSON.stringify(data), 'application/json; charset=utf-8')
}

function getContentType(pathname) {
  const ext = pathname.replace(/.*\./, '.')
  return MIME[ext] || 'application/octet-stream'
}

const server = createServer(async (req, res) => {
  const method = req.method
  const url = req.url?.split('?')[0] || '/'

  // 生成静态站点 API
  if (method === 'POST' && url === '/api/generate') {
    try {
      const result = await runGenerate({
        inputPath: join(projectRoot, 'site.json'),
        distRoot: join(projectRoot, 'dist'),
        projectRoot,
      })
      sendJson(res, 200, result)
    } catch (e) {
      sendJson(res, 500, {
        success: false,
        message: '生成过程出错',
        error: e.message,
      })
    }
    return
  }

  // 管理页静态资源（Vue 构建产物在 dist-admin）
  if (method === 'GET') {
    let pathname = url === '/' || url === '/admin' || url === '/admin.html' || url === '/index.html'
      ? '/admin.html'
      : url
    // 仅允许 admin.html 和 /assets/ 下的资源，防止路径穿越
    if (pathname !== '/admin.html' && !pathname.startsWith('/assets/')) {
      send(res, 404, 'Not Found', 'text/plain')
      return
    }
    const filePath = resolve(adminRoot, pathname.slice(1).replace(/^\/+/, ''))
    if (!filePath.startsWith(resolve(adminRoot))) {
      send(res, 403, 'Forbidden', 'text/plain')
      return
    }
    try {
      const content = await readFile(filePath)
      send(res, 200, content, getContentType(pathname))
    } catch (e) {
      if (e.code === 'ENOENT') {
        send(res, 404, 'Not Found', 'text/plain')
      } else {
        send(res, 500, e.message || 'Internal Error', 'text/plain')
      }
    }
    return
  }

  send(res, 404, 'Not Found', 'text/plain')
})

server.listen(PORT, () => {
  console.log(`管理页已启动: http://localhost:${PORT}/`)
  console.log('在页面上点击「生成静态站点」即可生成到 dist/')
})
