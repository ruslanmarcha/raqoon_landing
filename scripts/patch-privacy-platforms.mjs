/**
 * Expands privacy policies with explicit iOS / Google Play (Android) / Huawei AppGallery sections.
 * Run: node scripts/patch-privacy-platforms.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BODIES = path.join(__dirname, 'privacy-bodies');

const PATCHES = {
  ru: {
    regionBullet:
      'сведения о регионе магазина приложений (Apple App Store, Google Play или Huawei AppGallery)',
    regionShort: 'регион магазина приложений (Apple App Store, Google Play или Huawei AppGallery)',
    section33Extra: `

Приложение Raqoon VPN доступно:
- на платформах Apple (iOS, iPadOS, macOS и др.) — через Apple App Store;
- на устройствах Android — через Google Play;
- на поддерживаемых устройствах Huawei — через HUAWEI AppGallery.`,
    section14: `14. Платформы и магазины приложений (iOS, Android, Huawei)

Raqoon VPN распространяется через официальные магазины приложений:

Apple App Store (iOS, iPadOS, macOS и другие платформы Apple)
- установка и обновления через Apple;
- оплата, продление, отмена подписки и возвраты — по правилам Apple;
- Apple может обрабатывать идентификаторы Apple ID и данные устройства по своей политике конфиденциальности.

Google Play (Android)
- установка и обновления на устройствах Android через Google Play;
- оплата, продление, отмена и возвраты — по правилам Google Play и Google Payments;
- Google может обрабатывать идентификаторы аккаунта Google и данные устройства по своей политике конфиденциальности.

HUAWEI AppGallery (Android на устройствах Huawei)
- установка и обновления через Huawei AppGallery;
- оплата и встроенные покупки — по правилам Huawei / AppGallery;
- Huawei может обрабатывать идентификаторы аккаунта Huawei и данные устройства по своей политике конфиденциальности.

Мы получаем от магазинов только ограниченные технические данные, необходимые для проверки подписки и предоставления доступа к сервису (например, токены или данные квитанций). Использование каждого магазина также регулируется условиями и политикой конфиденциальности соответствующего оператора.`,
  },
  en: {
    regionBullet:
      'app store region information (Apple App Store, Google Play, or Huawei AppGallery)',
    regionShort: 'app store region (Apple App Store, Google Play, or Huawei AppGallery)',
    section33Extra: `

Raqoon VPN is available on:
- Apple platforms (iOS, iPadOS, macOS, and others) — via the Apple App Store;
- Android devices — via Google Play;
- supported Huawei devices — via HUAWEI AppGallery.`,
    section14: `14. Platforms and app stores (iOS, Android, Huawei)

Raqoon VPN is distributed through official app stores:

Apple App Store (iOS, iPadOS, macOS, and other Apple platforms)
- downloads and updates through Apple;
- payment, renewal, cancellation, and refunds are governed by Apple's rules;
- Apple may process Apple ID and device identifiers under Apple's privacy policy.

Google Play (Android)
- downloads and updates on Android devices through Google Play;
- payment, renewal, cancellation, and refunds are governed by Google Play and Google Payments policies;
- Google may process Google account and device identifiers under Google's privacy policy.

HUAWEI AppGallery (Android on Huawei devices)
- downloads and updates through Huawei AppGallery;
- payments and in-app purchases are governed by Huawei AppGallery policies;
- Huawei may process Huawei account and device identifiers under Huawei's privacy policy.

We receive from stores only limited technical data needed to verify your subscription and provide access (for example, tokens or purchase receipts). Your use of each store is also governed by that store operator's terms and privacy policy.`,
  },
  de: {
    regionBullet:
      'Angaben zur Region des App-Stores (Apple App Store, Google Play oder Huawei AppGallery)',
    regionShort: 'App-Store-Region (Apple App Store, Google Play oder Huawei AppGallery)',
    section33Extra: `

Raqoon VPN ist verfügbar über:
- Apple-Plattformen (iOS, iPadOS, macOS u. a.) — im Apple App Store;
- Android-Geräte — über Google Play;
- unterstützte Huawei-Geräte — über HUAWEI AppGallery.`,
    section14: `14. Plattformen und App-Stores (iOS, Android, Huawei)

Raqoon VPN wird über offizielle App-Stores vertrieben:

Apple App Store (iOS, iPadOS, macOS und andere Apple-Plattformen)
- Installation und Updates über Apple;
- Zahlung, Verlängerung, Kündigung und Erstattungen nach den Regeln von Apple;
- Apple kann Apple-ID- und Gerätekennungen nach der Datenschutzrichtlinie von Apple verarbeiten.

Google Play (Android)
- Installation und Updates auf Android-Geräten über Google Play;
- Zahlung, Verlängerung, Kündigung und Erstattungen nach Google Play und Google Payments;
- Google kann Google-Konto- und Gerätekennungen nach der Datenschutzrichtlinie von Google verarbeiten.

HUAWEI AppGallery (Android auf Huawei-Geräten)
- Installation und Updates über Huawei AppGallery;
- Zahlungen und In-App-Käufe nach den Richtlinien von Huawei / AppGallery;
- Huawei kann Huawei-Konto- und Gerätekennungen nach der Datenschutzrichtlinie von Huawei verarbeiten.

Wir erhalten von den Stores nur begrenzte technische Daten zur Abonnementprüfung und Bereitstellung des Zugangs (z. B. Tokens oder Kaufbelege). Die Nutzung jedes Stores unterliegt auch den Bedingungen und der Datenschutzrichtlinie des jeweiligen Betreibers.`,
  },
  fr: {
    regionBullet:
      "informations sur la région du magasin d'applications (Apple App Store, Google Play ou Huawei AppGallery)",
    regionShort:
      "région du magasin d'applications (Apple App Store, Google Play ou Huawei AppGallery)",
    section33Extra: `

Raqoon VPN est disponible sur :
- les plateformes Apple (iOS, iPadOS, macOS, etc.) — via l'Apple App Store ;
- les appareils Android — via Google Play ;
- les appareils Huawei pris en charge — via HUAWEI AppGallery.`,
    section14: `14. Plateformes et magasins d'applications (iOS, Android, Huawei)

Raqoon VPN est distribué via des magasins d'applications officiels :

Apple App Store (iOS, iPadOS, macOS et autres plateformes Apple)
- téléchargement et mises à jour via Apple ;
- paiement, renouvellement, annulation et remboursements selon les règles d'Apple ;
- Apple peut traiter l'identifiant Apple et des données d'appareil selon sa politique de confidentialité.

Google Play (Android)
- téléchargement et mises à jour sur appareils Android via Google Play ;
- paiement, renouvellement, annulation et remboursements selon Google Play et Google Payments ;
- Google peut traiter le compte Google et des identifiants d'appareil selon sa politique de confidentialité.

HUAWEI AppGallery (Android sur appareils Huawei)
- téléchargement et mises à jour via Huawei AppGallery ;
- paiements et achats intégrés selon les politiques Huawei / AppGallery ;
- Huawei peut traiter le compte Huawei et des identifiants d'appareil selon sa politique de confidentialité.

Nous ne recevons des magasins que des données techniques limitées nécessaires pour vérifier l'abonnement et fournir l'accès (par ex. jetons ou reçus d'achat). L'utilisation de chaque magasin est également régie par les conditions et la politique de confidentialité de l'opérateur concerné.`,
  },
  pl: {
    regionBullet:
      'informacje o regionie sklepu z aplikacjami (Apple App Store, Google Play lub Huawei AppGallery)',
    regionShort: 'region sklepu z aplikacjami (Apple App Store, Google Play lub Huawei AppGallery)',
    section33Extra: `

Raqoon VPN jest dostępny:
- na platformach Apple (iOS, iPadOS, macOS itd.) — w Apple App Store;
- na urządzeniach z Androidem — w Google Play;
- na obsługiwanych urządzeniach Huawei — w HUAWEI AppGallery.`,
    section14: `14. Platformy i sklepy z aplikacjami (iOS, Android, Huawei)

Raqoon VPN jest dystrybuowany przez oficjalne sklepy z aplikacjami:

Apple App Store (iOS, iPadOS, macOS i inne platformy Apple)
- instalacja i aktualizacje przez Apple;
- płatności, odnowienia, anulowanie i zwroty — zgodnie z zasadami Apple;
- Apple może przetwarzać Apple ID i identyfikatory urządzenia według polityki prywatności Apple.

Google Play (Android)
- instalacja i aktualizacje na urządzeniach z Androidem przez Google Play;
- płatności, odnowienia, anulowanie i zwroty — zgodnie z Google Play i Google Payments;
- Google może przetwarzać konto Google i identyfikatory urządzenia według polityki prywatności Google.

HUAWEI AppGallery (Android na urządzeniach Huawei)
- instalacja i aktualizacje przez Huawei AppGallery;
- płatności i zakupy w aplikacji — zgodnie z zasadami Huawei / AppGallery;
- Huawei może przetwarzać konto Huawei i identyfikatory urządzenia według polityki prywatności Huawei.

Otrzymujemy ze sklepów wyłącznie ograniczone dane techniczne potrzebne do weryfikacji subskrypcji i zapewnienia dostępu (np. tokeny lub potwierdzenia zakupu). Korzystanie z każdego sklepu podlega także warunkom i polityce prywatności operatora.`,
  },
  cs: {
    regionBullet:
      'informace o regionu obchodu s aplikacemi (Apple App Store, Google Play nebo Huawei AppGallery)',
    regionShort: 'region obchodu s aplikacemi (Apple App Store, Google Play nebo Huawei AppGallery)',
    section33Extra: `

Raqoon VPN je dostupný:
- na platformách Apple (iOS, iPadOS, macOS atd.) — v Apple App Store;
- na zařízeních Android — v Google Play;
- na podporovaných zařízeních Huawei — v HUAWEI AppGallery.`,
    section14: `14. Platformy a obchody s aplikacemi (iOS, Android, Huawei)

Raqoon VPN je distribuován prostřednictvím oficiálních obchodů s aplikacemi:

Apple App Store (iOS, iPadOS, macOS a další platformy Apple)
- instalace a aktualizace přes Apple;
- platby, obnovení, zrušení a vrácení peněz podle pravidel Apple;
- Apple může zpracovávat Apple ID a identifikátory zařízení podle zásad ochrany soukromí Apple.

Google Play (Android)
- instalace a aktualizace na zařízeních Android přes Google Play;
- platby, obnovení, zrušení a vrácení peněz podle Google Play a Google Payments;
- Google může zpracovávat účet Google a identifikátory zařízení podle zásad Google.

HUAWEI AppGallery (Android na zařízeních Huawei)
- instalace a aktualizace přes Huawei AppGallery;
- platby a nákupy v aplikaci podle pravidel Huawei / AppGallery;
- Huawei může zpracovávat účet Huawei a identifikátory zařízení podle zásad Huawei.

Z obchodů přijímáme pouze omezená technická data potřebná k ověření předplatného a poskytnutí přístupu (např. tokeny nebo potvrzení nákupu). Používání každého obchodu se řídí také podmínkami a zásadami ochrany soukromí provozovatele.`,
  },
  ja: {
    regionBullet: 'アプリストアのリージョン情報（Apple App Store、Google Play、Huawei AppGallery）',
    regionShort: 'アプリストアのリージョン（Apple App Store、Google Play、Huawei AppGallery）',
    section33Extra: `

Raqoon VPN は次のプラットフォームで提供されます：
- Apple プラットフォーム（iOS、iPadOS、macOS など）— Apple App Store；
- Android 端末 — Google Play；
- 対応する Huawei 端末 — HUAWEI AppGallery。`,
    section14: `14. プラットフォームとアプリストア（iOS、Android、Huawei）

Raqoon VPN は公式アプリストアを通じて配布されます。

Apple App Store（iOS、iPadOS、macOS その他の Apple プラットフォーム）
- Apple によるダウンロードと更新；
- 支払い、更新、解約、返金は Apple の規則に従います；
- Apple は Apple ID およびデバイス識別子を Apple のプライバシーポリシーに基づき処理する場合があります。

Google Play（Android）
- Google Play による Android 端末へのダウンロードと更新；
- 支払い、更新、解約、返金は Google Play および Google Payments の規則に従います；
- Google は Google アカウントおよびデバイス識別子を Google のプライバシーポリシーに基づき処理する場合があります。

HUAWEI AppGallery（Huawei 端末の Android）
- Huawei AppGallery によるダウンロードと更新；
- 支払いおよびアプリ内購入は Huawei / AppGallery の規則に従います；
- Huawei は Huawei アカウントおよびデバイス識別子を Huawei のプライバシーポリシーに基づき処理する場合があります。

当社がストアから受領するのは、サブスクリプションの検証およびアクセス提供に必要な限定的な技術データ（トークンや購入レシートなど）のみです。各ストアの利用は、当該事業者の利用規約およびプライバシーポリシーにも従います。`,
  },
  ko: {
    regionBullet: '앱 스토어 지역 정보(Apple App Store, Google Play, Huawei AppGallery)',
    regionShort: '앱 스토어 지역(Apple App Store, Google Play, Huawei AppGallery)',
    section33Extra: `

Raqoon VPN은 다음에서 이용할 수 있습니다:
- Apple 플랫폼(iOS, iPadOS, macOS 등) — Apple App Store;
- Android 기기 — Google Play;
- 지원되는 Huawei 기기 — HUAWEI AppGallery.`,
    section14: `14. 플랫폼 및 앱 스토어(iOS, Android, Huawei)

Raqoon VPN은 공식 앱 스토어를 통해 배포됩니다.

Apple App Store(iOS, iPadOS, macOS 및 기타 Apple 플랫폼)
- Apple을 통한 다운로드 및 업데이트;
- 결제, 갱신, 취소 및 환불은 Apple 규정을 따릅니다;
- Apple은 Apple 개인정보 처리방침에 따라 Apple ID 및 기기 식별자를 처리할 수 있습니다.

Google Play(Android)
- Google Play를 통한 Android 기기 다운로드 및 업데이트;
- 결제, 갱신, 취소 및 환불은 Google Play 및 Google Payments 정책을 따릅니다;
- Google은 Google 개인정보 처리방침에 따라 Google 계정 및 기기 식별자를 처리할 수 있습니다.

HUAWEI AppGallery(Huawei 기기 Android)
- Huawei AppGallery를 통한 다운로드 및 업데이트;
- 결제 및 인앱 구매는 Huawei / AppGallery 정책을 따릅니다;
- Huawei는 Huawei 개인정보 처리방침에 따라 Huawei 계정 및 기기 식별자를 처리할 수 있습니다.

당사는 스토어로부터 구독 확인 및 접근 제공에 필요한 제한된 기술 데이터(토큰 또는 구매 영수증 등)만 수령합니다. 각 스토어 이용은 해당 운영자의 약관 및 개인정보 처리방침의 적용을 받습니다.`,
  },
  'zh-CN': {
    regionBullet: '应用商店地区信息（Apple App Store、Google Play 或华为 AppGallery）',
    regionShort: '应用商店地区（Apple App Store、Google Play 或华为 AppGallery）',
    section33Extra: `

Raqoon VPN 可通过以下渠道获取：
- Apple 平台（iOS、iPadOS、macOS 等）— Apple App Store；
- Android 设备 — Google Play；
- 支持的华为设备 — 华为 AppGallery。`,
    section14: `14. 平台与应用商店（iOS、Android、华为）

Raqoon VPN 通过官方应用商店分发：

Apple App Store（iOS、iPadOS、macOS 及其他 Apple 平台）
- 通过 Apple 下载与更新；
- 付款、续订、取消与退款适用 Apple 规则；
- Apple 可能按其隐私政策处理 Apple ID 与设备标识符。

Google Play（Android）
- 通过 Google Play 在 Android 设备上下载与更新；
- 付款、续订、取消与退款适用 Google Play 与 Google Payments 规则；
- Google 可能按其隐私政策处理 Google 账户与设备标识符。

华为 AppGallery（华为设备的 Android）
- 通过华为 AppGallery 下载与更新；
- 付款与应用内购买适用华为 / AppGallery 规则；
- 华为可能按其隐私政策处理华为账户与设备标识符。

我们仅从商店接收验证订阅和提供服务所需的有限技术数据（例如令牌或购买凭证）。您对各商店的使用亦受该运营方条款与隐私政策的约束。`,
  },
  ar: {
    regionBullet: 'معلومات منطقة متجر التطبيقات (Apple App Store أو Google Play أو Huawei AppGallery)',
    regionShort: 'منطقة متجر التطبيقات (Apple App Store أو Google Play أو Huawei AppGallery)',
    section33Extra: `

يتوفر Raqoon VPN عبر:
- منصات Apple (iOS وiPadOS وmacOS وغيرها) — عبر Apple App Store؛
- أجهزة Android — عبر Google Play؛
- أجهزة Huawei المدعومة — عبر HUAWEI AppGallery.`,
    section14: `14. المنصات ومتاجر التطبيقات (iOS وAndroid وHuawei)

يتم توزيع Raqoon VPN عبر متاجر تطبيقات رسمية:

Apple App Store (iOS وiPadOS وmacOS ومنصات Apple الأخرى)
- التنزيل والتحديثات عبر Apple؛
- الدفع والتجديد والإلغاء والاسترداد وفق قواعد Apple؛
- قد تعالج Apple معرف Apple ID وبيانات الجهاز وفق سياسة خصوصية Apple.

Google Play (Android)
- التنزيل والتحديثات على أجهزة Android عبر Google Play؛
- الدفع والتجديد والإلغاء والاسترداد وفق سياسات Google Play وGoogle Payments؛
- قد تعالج Google حساب Google ومعرفات الجهاز وفق سياسة خصوصية Google.

HUAWEI AppGallery (Android على أجهزة Huawei)
- التنزيل والتحديثات عبر Huawei AppGallery؛
- المدفوعات والمشتريات داخل التطبيق وفق سياسات Huawei / AppGallery؛
- قد تعالج Huawei حساب Huawei ومعرفات الجهاز وفق سياسة خصوصية Huawei.

نستلم من المتاجر فقط بيانات تقنية محدودة للتحقق من الاشتراك وتوفير الوصول (مثل الرموز أو إيصالات الشراء). يخضع استخدامك لكل متجر أيضًا لشروط وسياسة خصوصية المشغل المعني.`,
  },
  'pt-BR': {
    regionBullet:
      'informações da região da loja de apps (Apple App Store, Google Play ou Huawei AppGallery)',
    regionShort: 'região da loja de apps (Apple App Store, Google Play ou Huawei AppGallery)',
    section33Extra: `

O Raqoon VPN está disponível em:
- plataformas Apple (iOS, iPadOS, macOS etc.) — na Apple App Store;
- dispositivos Android — no Google Play;
- dispositivos Huawei compatíveis — na HUAWEI AppGallery.`,
    section14: `14. Plataformas e lojas de aplicativos (iOS, Android, Huawei)

O Raqoon VPN é distribuído por lojas oficiais de aplicativos:

Apple App Store (iOS, iPadOS, macOS e outras plataformas Apple)
- download e atualizações pela Apple;
- pagamento, renovação, cancelamento e reembolsos conforme as regras da Apple;
- a Apple pode processar Apple ID e identificadores do dispositivo conforme sua política de privacidade.

Google Play (Android)
- download e atualizações em dispositivos Android pelo Google Play;
- pagamento, renovação, cancelamento e reembolsos conforme Google Play e Google Payments;
- o Google pode processar conta Google e identificadores do dispositivo conforme sua política de privacidade.

HUAWEI AppGallery (Android em dispositivos Huawei)
- download e atualizações pela Huawei AppGallery;
- pagamentos e compras no app conforme políticas Huawei / AppGallery;
- a Huawei pode processar conta Huawei e identificadores do dispositivo conforme sua política de privacidade.

Recebemos das lojas apenas dados técnicos limitados necessários para verificar a assinatura e fornecer acesso (por exemplo, tokens ou recibos de compra). O uso de cada loja também é regido pelos termos e pela política de privacidade do respectivo operador.`,
  },
  id: {
    regionBullet:
      'informasi wilayah toko aplikasi (Apple App Store, Google Play, atau Huawei AppGallery)',
    regionShort: 'wilayah toko aplikasi (Apple App Store, Google Play, atau Huawei AppGallery)',
    section33Extra: `

Raqoon VPN tersedia di:
- platform Apple (iOS, iPadOS, macOS, dll.) — melalui Apple App Store;
- perangkat Android — melalui Google Play;
- perangkat Huawei yang didukung — melalui HUAWEI AppGallery.`,
    section14: `14. Platform dan toko aplikasi (iOS, Android, Huawei)

Raqoon VPN didistribusikan melalui toko aplikasi resmi:

Apple App Store (iOS, iPadOS, macOS, dan platform Apple lainnya)
- unduhan dan pembaruan melalui Apple;
- pembayaran, perpanjangan, pembatalan, dan pengembalian dana sesuai aturan Apple;
- Apple dapat memproses Apple ID dan pengenal perangkat sesuai kebijakan privasi Apple.

Google Play (Android)
- unduhan dan pembaruan di perangkat Android melalui Google Play;
- pembayaran, perpanjangan, pembatalan, dan pengembalian dana sesuai Google Play dan Google Payments;
- Google dapat memproses akun Google dan pengenal perangkat sesuai kebijakan privasi Google.

HUAWEI AppGallery (Android di perangkat Huawei)
- unduhan dan pembaruan melalui Huawei AppGallery;
- pembayaran dan pembelian dalam aplikasi sesuai kebijakan Huawei / AppGallery;
- Huawei dapat memproses akun Huawei dan pengenal perangkat sesuai kebijakan privasi Huawei.

Kami hanya menerima dari toko data teknis terbatas yang diperlukan untuk memverifikasi langganan dan menyediakan akses (misalnya token atau bukti pembelian). Penggunaan setiap toko juga diatur oleh ketentuan dan kebijakan privasi operator terkait.`,
  },
  th: {
    regionBullet: 'ข้อมูลภูมิภาคของร้านแอป (Apple App Store, Google Play หรือ Huawei AppGallery)',
    regionShort: 'ภูมิภาคร้านแอป (Apple App Store, Google Play หรือ Huawei AppGallery)',
    section33Extra: `

Raqoon VPN มีให้บริการบน:
- แพลตฟอร์ม Apple (iOS, iPadOS, macOS ฯลฯ) — ผ่าน Apple App Store;
- อุปกรณ์ Android — ผ่าน Google Play;
- อุปกรณ์ Huawei ที่รองรับ — ผ่าน HUAWEI AppGallery`,
    section14: `14. แพลตฟอร์มและร้านแอป (iOS, Android, Huawei)

Raqoon VPN จัดจำหน่ายผ่านร้านแอปอย่างเป็นทางการ:

Apple App Store (iOS, iPadOS, macOS และแพลตฟอร์ม Apple อื่นๆ)
- ดาวน์โหลดและอัปเดตผ่าน Apple;
- การชำระเงิน ต่ออายุ ยกเลิก และคืนเงินเป็นไปตามกฎของ Apple;
- Apple อาจประมวลผล Apple ID และตัวระบุอุปกรณ์ตามนโยบายความเป็นส่วนตัวของ Apple

Google Play (Android)
- ดาวน์โหลดและอัปเดตบนอุปกรณ์ Android ผ่าน Google Play;
- การชำระเงิน ต่ออายุ ยกเลิก และคืนเงินเป็นไปตาม Google Play และ Google Payments;
- Google อาจประมวลผลบัญชี Google และตัวระบุอุปกรณ์ตามนโยบายความเป็นส่วนตัวของ Google

HUAWEI AppGallery (Android บนอุปกรณ์ Huawei)
- ดาวน์โหลดและอัปเดตผ่าน Huawei AppGallery;
- การชำระเงินและการซื้อในแอปเป็นไปตามนโยบาย Huawei / AppGallery;
- Huawei อาจประมวลผลบัญชี Huawei และตัวระบุอุปกรณ์ตามนโยบายความเป็นส่วนตัวของ Huawei

เรารับจากร้านเฉพาะข้อมูลทางเทคนิคจำกัดที่จำเป็นต่อการตรวจสอบการสมัครสมาชิกและให้การเข้าถึง (เช่น โทเค็นหรือใบเสร็จการซื้อ) การใช้แต่ละร้านยังอยู่ภายใต้ข้อกำหนดและนโยบายความเป็นส่วนตัวของผู้ให้บริการนั้นๆ`,
  },
  tl: {
    regionBullet:
      'impormasyon sa rehiyon ng app store (Apple App Store, Google Play, o Huawei AppGallery)',
    regionShort: 'rehiyon ng app store (Apple App Store, Google Play, o Huawei AppGallery)',
    section33Extra: `

Available ang Raqoon VPN sa:
- Apple platforms (iOS, iPadOS, macOS, atbp.) — sa Apple App Store;
- Android devices — sa Google Play;
- suportadong Huawei devices — sa HUAWEI AppGallery.`,
    section14: `14. Mga platform at app store (iOS, Android, Huawei)

Ipinamamahagi ang Raqoon VPN sa pamamagitan ng opisyal na app store:

Apple App Store (iOS, iPadOS, macOS, at iba pang Apple platform)
- download at update sa pamamagitan ng Apple;
- bayad, renewal, pagkansela, at refund ayon sa mga panuntunan ng Apple;
- maaaring iproseso ng Apple ang Apple ID at device identifier ayon sa privacy policy ng Apple.

Google Play (Android)
- download at update sa Android device sa pamamagitan ng Google Play;
- bayad, renewal, pagkansela, at refund ayon sa Google Play at Google Payments;
- maaaring iproseso ng Google ang Google account at device identifier ayon sa privacy policy ng Google.

HUAWEI AppGallery (Android sa Huawei device)
- download at update sa pamamagitan ng Huawei AppGallery;
- bayad at in-app purchase ayon sa mga patakaran ng Huawei / AppGallery;
- maaaring iproseso ng Huawei ang Huawei account at device identifier ayon sa privacy policy ng Huawei.

Tumatanggap lamang kami mula sa store ng limitadong teknikal na data na kailangan para i-verify ang subscription at magbigay ng access (hal. token o purchase receipt). Ang paggamit mo ng bawat store ay pinamamahalaan din ng terms at privacy policy ng operator nito.`,
  },
};

function patchBody(body, p) {
  let out = body;

  // Summary bullet: App Store only -> all stores
  out = out.replace(
    /- (?:сведения о регионе App Store|App Store region information|Angaben zur App-Store-Region|informations sur la région du magasin d'applications \(Apple App Store, Google Play ou Huawei AppGallery\)|informacje o regionie sklepu z aplikacjami \(Apple App Store, Google Play lub Huawei AppGallery\)|informace o regionu obchodu s aplikacemi \(Apple App Store, Google Play nebo Huawei AppGallery\)|アプリストアのリージョン情報（Apple App Store、Google Play、Huawei AppGallery）|앱 스토어 지역 정보\(Apple App Store, Google Play, Huawei AppGallery\)|应用商店地区信息（Apple App Store、Google Play 或华为 AppGallery）|معلومات منطقة متجر التطبيقات \(Apple App Store أو Google Play أو Huawei AppGallery\)|informações da região da loja de apps \(Apple App Store, Google Play ou Huawei AppGallery\)|informasi wilayah toko aplikasi \(Apple App Store, Google Play, atau Huawei AppGallery\)|ข้อมูลภูมิภาคของร้านแอป \(Apple App Store, Google Play หรือ Huawei AppGallery\)|impormasyon sa rehiyon ng app store \(Apple App Store, Google Play, o Huawei AppGallery\))/,
    `- ${p.regionBullet}`,
  );
  out = out.replace(/- сведения о регионе App Store;/, `- ${p.regionBullet};`);
  out = out.replace(/- App Store region information;/, `- ${p.regionBullet};`);
  out = out.replace(/- App Store リージョン情報；/, `- ${p.regionBullet}；`);
  out = out.replace(/- App Store 地区信息；/, `- ${p.regionBullet}；`);

  // Section 3.1
  out = out.replace(
    /- (?:регион App Store|App Store region information|App-Store-Region|App Store リージョン情報|App Store 地区信息)/,
    `- ${p.regionShort}`,
  );

  // USA backend line
  out = out.replace(
    /(?:регион App Store|App Store region|App-Store-Region|App Store リージョン|App Store 地区)/,
    p.regionShort,
  );

  // Insert availability list after 3.3 header if not present
  if (!out.includes('Google Play (Android)') && !out.includes('Google Play（Android）')) {
    out = out.replace(
      /(3\.3\.[^\n]+\n\n)(При оплате|When you subscribe|Bei Abonnement|Lors d|Przy subskrypcji|If you subscribe|Při předplatném|Apple App Store、Google Play|Apple App Store, Google Play|عند الاشتراك|Se você assinar|Jika Anda berlangganan|หากคุณสมัคร|Kung mag-subscribe)/,
      `$1${p.section33Extra.trim()}\n\n$2`,
    );
  }

  // Replace section 14 block (from "14." until "\n\n15.")
  out = out.replace(/\n14\.[\s\S]*?\n\n15\./, `\n${p.section14}\n\n15.`);

  return out;
}

for (const [code, patch] of Object.entries(PATCHES)) {
  const fp = path.join(BODIES, `${code}.txt`);
  if (!fs.existsSync(fp)) {
    console.error('missing', fp);
    process.exit(1);
  }
  const body = fs.readFileSync(fp, 'utf8');
  fs.writeFileSync(fp, patchBody(body, patch).replace(/\r\n/g, '\n'), 'utf8');
  console.log('patched', code);
}
