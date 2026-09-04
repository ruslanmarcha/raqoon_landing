import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BODIES = path.join(__dirname, 'esim-privacy-bodies')
const MAP = [['ru', 'ru.json'], ['en', 'en.json'], ['de', 'de.json'], ['fr', 'fr.json'], ['ja', 'ja.json'], ['ko', 'ko.json'], ['ar', 'ar.json'], ['th', 'th.json'], ['pt-BR', 'pt-BR.json'], ['tl', 'tl.json'], ['pl', 'pl.json'], ['id', 'id.json'], ['zh-CN', 'zh-CN.json'], ['cs', 'cs.json']]

for (const [code, file] of MAP) {
  const source = path.join(BODIES, `${code}.txt`)
  if (!fs.existsSync(source)) throw new Error(`Missing body file: ${source}`)
  const jsonPath = path.join(ROOT, 'src', 'i18n', 'locales', file)
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  if (!data.legal?.esim?.privacy) throw new Error(`No legal.esim.privacy in ${file}`)
  const body = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n')
  data.legal.esim.privacy.body = body
  fs.writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log('updated', file, body.length, 'chars')
}
