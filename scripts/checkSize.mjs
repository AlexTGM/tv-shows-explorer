// Enforces the 120-line file limit from ARCHITECTURE.md.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const MAX_LINES = 120
const ROOT = 'src'
const EXTENSIONS = /\.(ts|tsx|js|jsx|mjs)$/
const IGNORED = new Set(['src/routeTree.gen.ts'])

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (EXTENSIONS.test(entry.name)) yield path
  }
}

const violations = []
for (const file of walk(ROOT)) {
  const rel = relative('.', file).replaceAll('\\', '/')
  if (IGNORED.has(rel)) continue
  const lines = readFileSync(file, 'utf8').trimEnd().split('\n').length
  if (lines > MAX_LINES) violations.push(`${rel}: ${lines} lines`)
}

if (violations.length > 0) {
  console.error(`Files over ${MAX_LINES} lines:\n  ${violations.join('\n  ')}`)
  process.exit(1)
}
console.log(`All files in ${ROOT}/ are within ${MAX_LINES} lines.`)
