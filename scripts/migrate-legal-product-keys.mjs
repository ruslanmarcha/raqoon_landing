/**
 * One-time, auditable migration of product-neutral legal copy into product namespaces.
 * Run from the repository root: node scripts/migrate-legal-product-keys.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const LOCALES = ['ar', 'cs', 'de', 'en', 'fr', 'id', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'th', 'tl', 'zh-CN']
const DOCUMENTS = ['privacy', 'terms', 'refund']
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const COPY = {
  ar: { documents: 'المستندات القانونية', intro: 'اختر المنتج لقراءة مستنداته القانونية.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'سياسة الخصوصية', terms: 'شروط الاستخدام', refund: 'سياسة الاسترداد' },
  cs: { documents: 'Právní dokumenty', intro: 'Vyberte produkt pro jeho právní dokumenty.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Zásady ochrany osobních údajů', terms: 'Podmínky použití', refund: 'Zásady vrácení peněz' },
  de: { documents: 'Rechtliche Dokumente', intro: 'Wählen Sie ein Produkt, um dessen rechtliche Dokumente zu lesen.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen', refund: 'Rückerstattungsrichtlinie' },
  en: { documents: 'Legal documents', intro: 'Choose a product to read its legal documents.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Privacy Policy', terms: 'Terms of Use', refund: 'Refund Policy' },
  fr: { documents: 'Documents juridiques', intro: 'Choisissez un produit pour lire ses documents juridiques.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Politique de confidentialité', terms: 'Conditions d’utilisation', refund: 'Politique de remboursement' },
  id: { documents: 'Dokumen hukum', intro: 'Pilih produk untuk membaca dokumen hukumnya.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Kebijakan Privasi', terms: 'Ketentuan Penggunaan', refund: 'Kebijakan Pengembalian Dana' },
  ja: { documents: '法的文書', intro: '製品を選択して法的文書をお読みください。', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'プライバシーポリシー', terms: '利用規約', refund: '返金ポリシー' },
  ko: { documents: '법률 문서', intro: '제품을 선택하여 관련 법률 문서를 읽으세요.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: '개인정보 처리방침', terms: '이용약관', refund: '환불 정책' },
  pl: { documents: 'Dokumenty prawne', intro: 'Wybierz produkt, aby przeczytać jego dokumenty prawne.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Polityka prywatności', terms: 'Warunki korzystania', refund: 'Polityka zwrotów' },
  'pt-BR': { documents: 'Documentos legais', intro: 'Escolha um produto para ler seus documentos legais.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Política de Privacidade', terms: 'Termos de Uso', refund: 'Política de Reembolso' },
  ru: { documents: 'Юридические документы', intro: 'Выберите продукт, чтобы прочитать его юридические документы.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Политика конфиденциальности', terms: 'Условия использования', refund: 'Политика возврата средств' },
  th: { documents: 'เอกสารทางกฎหมาย', intro: 'เลือกผลิตภัณฑ์เพื่ออ่านเอกสารทางกฎหมาย', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'นโยบายความเป็นส่วนตัว', terms: 'ข้อกำหนดการใช้งาน', refund: 'นโยบายการคืนเงิน' },
  tl: { documents: 'Mga legal na dokumento', intro: 'Pumili ng produkto upang basahin ang mga legal na dokumento nito.', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: 'Patakaran sa Privacy', terms: 'Mga Tuntunin ng Paggamit', refund: 'Patakaran sa Refund' },
  'zh-CN': { documents: '法律文件', intro: '请选择产品以阅读其法律文件。', vpn: 'Raqoon VPN', esim: 'Raqoon Travel eSIM', privacy: '隐私政策', terms: '使用条款', refund: '退款政策' },
}

function main() {
  for (const localeCode of LOCALES) {
    const localePath = path.join(ROOT, 'src', 'i18n', 'locales', `${localeCode}.json`)
    const data = JSON.parse(fs.readFileSync(localePath, 'utf8'))
    const labels = COPY[localeCode]

    data.legal ??= {}
    data.legal.vpn ??= {}
    data.legal.esim ??= {}

    for (const document of DOCUMENTS) {
      if (data.legal[document] && !data.legal.vpn[document]) {
        data.legal.vpn[document] = data.legal[document]
      }
      delete data.legal[document]
      data.legal.esim[document] ??= { title: labels[document], body: '' }
      data.legal.esim[document].title ??= labels[document]
      data.legal.esim[document].body ??= ''
    }

    data.documents ??= {}
    data.documents.title ??= labels.documents
    data.documents.intro ??= labels.intro
    data.documents.products ??= {}
    data.documents.products.vpn ??= {}
    data.documents.products.esim ??= {}
    data.documents.products.vpn.title ??= labels.vpn
    data.documents.products.esim.title ??= labels.esim
    data.documents.documents ??= {}
    for (const document of DOCUMENTS) data.documents.documents[document] ??= labels[document]

    const temporaryPath = `${localePath}.tmp`
    fs.writeFileSync(temporaryPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
    fs.renameSync(temporaryPath, localePath)
    console.log(`migrated ${localeCode}.json`)
  }
}

main()
