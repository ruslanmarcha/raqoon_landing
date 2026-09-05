import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const LOCALES = ['ar', 'cs', 'de', 'en', 'fr', 'id', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'th', 'tl', 'zh-CN']
const DOCUMENTS = ['privacy', 'terms', 'refund']

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PRODUCTS = [
  ['vpn', { privacy: 'privacy-bodies', terms: 'terms-bodies', refund: 'refund-bodies' }],
  ['esim', { privacy: 'esim-privacy-bodies', terms: 'esim-terms-bodies', refund: 'esim-refund-bodies' }],
]
const ESIM_MARKERS = {
  privacy: [
    { label: 'reseller identity', values: ['Raqoon', 'راقون'] },
    { label: 'eSIM', values: ['eSIM'] },
  ],
  terms: [
    { label: 'reseller identity', values: ['Raqoon', 'راقون'] },
    { label: 'eSIM', values: ['eSIM'] },
    { label: 'Türkiye exclusion', values: ['Türkiye', 'تركيا', 'トルコ', '튀르키예', '터키', 'Turecko', 'Türkei', 'Turquie', 'Turki', 'Turcja', 'Турец', 'ตุรกี', '土耳其'] },
  ],
  refund: [
    { label: 'reseller identity', values: ['Raqoon', 'راقون'] },
    { label: 'eSIM', values: ['eSIM'] },
  ],
}

function getValue(object, keyPath) {
  return keyPath.split('.').reduce((value, key) => value?.[key], object)
}

function normalizedBody(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n')
}

function validateEsimSource(localeCode, document, sourcePath, body, errors) {
  for (const marker of ESIM_MARKERS[document]) {
    if (!marker.values.some((value) => body.includes(value))) {
      errors.push(`Missing eSIM reseller/release-gate marker "${marker.label}" for ${localeCode}/${document} (${sourcePath})`)
    }
  }

}

function main() {
  const errors = []

  for (const localeCode of LOCALES) {
    const localePath = path.join(ROOT, 'src', 'i18n', 'locales', `${localeCode}.json`)
    let locale

    try {
      locale = JSON.parse(fs.readFileSync(localePath, 'utf8'))
    } catch (error) {
      errors.push(`Could not read locale: ${localePath} (${error.message})`)
      continue
    }

    for (const [product, directories] of PRODUCTS) {
      for (const document of DOCUMENTS) {
        for (const field of ['title', 'body']) {
          const keyPath = `legal.${product}.${document}.${field}`
          if (typeof getValue(locale, keyPath) !== 'string' || getValue(locale, keyPath).trim() === '') {
            errors.push(`Missing localized UI key: ${localeCode}.${keyPath}`)
          }
        }

        const sourcePath = path.join(__dirname, directories[document], `${localeCode}.txt`)
        if (!fs.existsSync(sourcePath)) {
          errors.push(`Missing source file: ${sourcePath}`)
        } else {
          const body = normalizedBody(sourcePath)
          if (product === 'esim') validateEsimSource(localeCode, document, sourcePath, body, errors)
          if (getValue(locale, `legal.${product}.${document}.body`) !== body) {
            errors.push(`Mismatched body: ${localeCode}.legal.${product}.${document}.body (${sourcePath})`)
          }
        }
      }
    }

    for (const keyPath of [
      'footer.documents',
      'documents.title',
      'documents.intro',
      'documents.products.vpn.title',
      'documents.products.esim.title',
      'documents.products.corporate.title',
      ...DOCUMENTS.map((document) => `documents.documents.${document}`),
      'documents.documents.distanceSales',
      'documents.documents.about',
      'documents.documents.kvkk',
      'documents.documents.sustainability',
      'legal.esim.distanceSales.title',
      'legal.esim.distanceSales.body',
      'legal.corporate.kvkk.title',
      'legal.corporate.kvkk.body',
      'legal.corporate.sustainability.title',
      'legal.corporate.sustainability.body',
    ]) {
      if (typeof getValue(locale, keyPath) !== 'string' || getValue(locale, keyPath).trim() === '') {
        errors.push(`Missing localized UI key: ${localeCode}.${keyPath}`)
      }
    }
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'))
    process.exitCode = 1
    return
  }

  console.log(`Verified legal localization for ${LOCALES.length} locales. Automated checks enforce structure and known residues; human localization review remains a release gate.`)
}

main()
