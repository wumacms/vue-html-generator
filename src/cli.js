#!/usr/bin/env node
import { join, isAbsolute } from 'node:path'
import { runGenerate, defaultProjectRoot } from './generate.js'

async function main() {
  const args = process.argv.slice(2)
  let input = 'site.json'
  let outDir = 'dist'
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) input = args[++i]
    else if (args[i] === '--out' && args[i + 1]) outDir = args[++i]
  }

  const projectRoot = defaultProjectRoot
  const inputPath = isAbsolute(input) ? input : join(process.cwd(), input)
  const distRoot = isAbsolute(outDir) ? outDir : join(process.cwd(), outDir)

  const result = await runGenerate({
    inputPath,
    distRoot,
    projectRoot,
  })

  if (result.success) {
    console.log(result.message)
  } else {
    console.error(result.message)
    if (result.error) console.error(result.error)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
