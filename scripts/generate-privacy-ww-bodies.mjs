/**
 * Writes scripts/privacy-bodies/<locale>.txt for worldwide privacy locales.
 * Run from repo root: node scripts/generate-privacy-ww-bodies.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "privacy-bodies");

const LOCALES = [
  "de",
  "fr",
  "pl",
  "cs",
  "ja",
  "ko",
  "zh-CN",
  "ar",
  "pt-BR",
  "id",
  "th",
  "tl",
];

const BODIES = {
  de: `Datenschutzerklärung Raqoon VPN

Gültig ab: 17. Mai 2026
Diensteanbieter: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ankara, Türkiye)
Datenschutzkontakt: private@raqoon.app

1. Kurzfassung

Raqoon VPN schützt Ihre Verbindung und stärkt Ihre Privatsphäre im Internet. Die App erfasst oder prüft keine Surfaktivität, DNS-Anfragen oder Inhalte des VPN-Datenverkehrs.

Zum Betrieb des Dienstes verarbeiten wir nur begrenzte technische Informationen, darunter:
- eine zufällig erzeugte anonyme Gerätekennung;
- eine zufällig erzeugte anonyme Client-Kennung;
- Angaben zur App-Store-Region;
- Bestätigung, dass Sie mindestens 18 Jahre alt sind;
- grundlegende technische Diagnosedaten zur Verbindungsstabilität;
- Abonnementstatus und Datenverkehrsvolumen für Ihre Tariflimits.

Für die Nutzung des VPN sind Name, Telefonnummer oder E-Mail nicht erforderlich. Wir nutzen VPN-Daten nicht für Analysen, Werbung, Profilbildung oder Nutzerverfolgung. Wir verkaufen keine Nutzerdaten an Werbenetzwerke.

2. Was unsere No-Logs-Richtlinie bedeutet

Wir protokollieren und speichern nicht:
- Verlauf besuchter Websites und URLs;
- Suchanfragen;
- DNS-Anfragen;
- Verkehrsinhalte, einschließlich Nachrichten, E-Mails, Dateien und anderer übertragener Daten;
- Verlauf Ihrer Netzwerkaktivität;
- Ihre Quell-IP-Adresse als Teil einer Aktivitätsgeschichte.

Wir verknüpfen Ihre Netzwerkaktivität nicht mit Konto, Gerät oder Zahlungsdaten zur Profilbildung.

Bestimmte technische Daten können vorübergehend von Netzwerkausrüstung verarbeitet werden, während eine VPN-Verbindung aufgebaut oder aufrechterhalten wird. Das ist für verschlüsselten Verkehr und den Betrieb erforderlich. Wir nutzen sie nicht, um Surfverläufe zu erstellen, Verkehrsinhalte zu analysieren oder Nutzer zu profilieren.

3. Daten, die wir in der App erfassen

3.1. Kennungen und Berechtigung
- zufällig erzeugte anonyme Gerätekennung (Geräteautorisierung und Gerätelimits);
- zufällig erzeugte anonyme Client-Kennung (Client-Sitzung);
- App-Store-Region (regionale Verfügbarkeit und Store-Regeln);
- Bestätigung, dass Sie mindestens 18 Jahre alt sind.

3.2. Dienstbetrieb und Diagnose
- Abonnementstatus und Tariflimits;
- übertragenes Datenvolumen (zur Durchsetzung Ihres Tarifs, nicht um zu sehen, worauf Sie zugegriffen haben);
- Zeit der letzten Verbindung und Verbindungsstatus;
- grundlegende technische Diagnosedaten zu Stabilität und Fehlern (ohne Surfverlauf, DNS-Anfragen oder Verkehrsinhalte).

3.3. Abonnements und App-Stores
Bei Abonnement über Apple App Store, Google Play oder Huawei AppGallery verarbeitet der Store die Zahlung. Wir erhalten nur begrenzte technische Daten zur Validierung des Abonnementstatus (z. B. Beleg- oder Token-Daten). Vollständige Zahlungskartendaten speichern wir nicht.

3.4. Support (nur bei Kontaktaufnahme)
Wenn Sie den Support kontaktieren oder das Support-Portal nutzen, verarbeiten wir die von Ihnen freiwillig angegebenen Kontaktdaten und Inhalte. Das ist getrennt von der VPN-Sitzungsprotokollierung.

4. Zwecke der Verarbeitung

Wir verwenden die oben genannten Daten ausschließlich, um:
- den VPN-Dienst zu betreiben und zu warten;
- regionale Verfügbarkeitsbeschränkungen anzuwenden;
- Abonnements und Gerätezugriff zu verwalten;
- die Verbindungszuverlässigkeit zu verbessern und technische Probleme zu beheben;
- altersbezogene Anforderungen des Dienstes einzuhalten.

5. Wo Daten verarbeitet werden (Infrastruktur)

Unsere Infrastruktur ist wie folgt verteilt:

Vereinigte Staaten:
- primäre Backend-Systeme (Kontokennungen, Abonnementdaten, App-Store-Region, Altersbestätigung, in dieser Richtlinie beschriebene Verbindungsdiagnose);
- Server des Kundensupport-Portals (Daten, die Sie beim Support-Kontakt übermitteln).

Schweiz:
- Lastverteilung für VPN-Verbindungen;
- VPN-Server für Ihre verschlüsselte VPN-Verbindung.

Verschlüsselter VPN-Verkehr passiert unsere in der Schweiz betriebenen VPN- und Lastverteilungsinfrastruktur. Wir führen keine Protokolle besuchter Websites, DNS-Anfragen oder Verkehrsinhalte.

Begrenzte technische Dienstdaten können zwischen den Vereinigten Staaten und der Schweiz nur soweit übertragen werden, wie es für den Betrieb erforderlich ist, unter angemessenen technischen und organisatorischen Schutzmaßnahmen.

6. Dritte

Wir geben VPN-Verkehr, Surfaktivität, DNS-Anfragen oder Verkehrsinhalte nicht an Dritte weiter, um Analysen, Werbung, Profilbildung oder Tracking durchzuführen.

App-Store-Betreiber (Apple, Google, Huawei) verarbeiten Käufe nach ihren eigenen Bedingungen und Datenschutzrichtlinien. Wir erhalten nur die oben beschriebenen technischen Abonnementvalidierungsdaten.

Infrastrukturanbieter hosten Server und Netzwerke; wir übermitteln ihnen keine Nutzeraktivitätsprotokolle, Surfverläufe, DNS-Anfragen oder Verkehrsinhalte. Sie wirken technisch am Transport verschlüsselten Verkehrs mit, wie für ein VPN erforderlich.

7. Kein Tracking in der Raqoon-App

Unsere mobilen Apps nutzen keine Drittanbieter-Marketing- oder Produktanalyse-SDKs zur Verfolgung der VPN-Nutzung. Absturz- oder Diagnoseberichte können von Apple, Google oder Huawei nach Plattformregeln und Ihren Geräteeinstellungen verarbeitet werden; solche Berichte dienen nicht der Analyse von VPN-Surfaktivität oder Verkehrsinhalten.

8. Website (raqoon.app), Cookies und Analysen

Auf raqoon.app können wir Cookies und ähnliche Technologien für den Betrieb der Website, Einstellungen und Webanalysen einsetzen.

Die Website kann Google Analytics nutzen, um Gesamttraffic und Seitenleistung zu verstehen. Webanalysen sind vom VPN getrennt und dienen nicht der Analyse von VPN-Verkehr, DNS-Anfragen oder Surfverlauf innerhalb einer VPN-Sitzung.

Wenn ein Cookie-Einwilligungsbanner angezeigt wird, können Sie nicht wesentliche Cookies akzeptieren oder ablehnen.

9. Aufbewahrung und Löschung

Technische Daten werden während Ihres aktiven Abonnements und soweit für den Betrieb nötig aufbewahrt. Bei Nichtverlängerung können Kontodaten nach einer Inaktivitätsphase gelöscht werden.

Sie können Ihr Konto und zugehörige Daten in den Raqoon-App-Einstellungen löschen. Nach der Löschung beenden wir den Zugang und löschen oder anonymisieren nicht mehr benötigte Daten.

Bestimmte Aufzeichnungen können begrenzt aufbewahrt werden, wenn dies gesetzlich, zur Zahlungsprüfung, Betrugsprävention oder Streitbeilegung erforderlich ist.

10. Behördenanfragen

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. ist in der Türkiye registriert. Bei rechtmäßigen Anfragen zuständiger Behörden prüfen wir diese nach geltendem Recht.

Da wir keine Aktivitätsprotokolle führen, können wir keinen Surfverlauf, DNS-Anfragen oder Verkehrsinhalte bereitstellen. Wir können nur begrenzte Angaben bestätigen, z. B. Kontobestand, Abonnementstatus oder die in dieser Richtlinie beschriebenen technischen Daten.

11. Altersanforderung

Der Dienst richtet sich nicht an Personen unter 18 Jahren. Die In-App-Altersbestätigung dient der Durchsetzung dieser Anforderung.

12. Sicherheit

Wir wenden technische und organisatorische Maßnahmen an, einschließlich Zugriffskontrollen, Verschlüsselung bei der Übertragung und Datenminimierung.

13. Ihre Rechte

Sie können Auskunft über mit Ihrem Konto verknüpfte Daten verlangen, Ihr Konto in der App löschen, uns zum Datenschutz kontaktieren und nicht wesentliche Cookies auf der Website ablehnen, sofern verfügbar.

Datenschutz: private@raqoon.app

14. App-Vertrieb

Bei Installation von Raqoon VPN über Apple App Store, Google Play oder Huawei AppGallery verarbeitet der Store-Betreiber Käufe und bestimmte Kennungen nach eigenen Richtlinien. Ihre Store-Nutzung unterliegt dessen Regeln.

15. Änderungen dieser Richtlinie

Wir können diese Richtlinie bei Änderungen des Dienstes, der Infrastruktur oder rechtlicher Anforderungen aktualisieren. Das Gültigkeitsdatum oben wird bei Veröffentlichung einer neuen Version angepasst.

16. Kontakte

- Datenschutz und Datenlöschung: private@raqoon.app
- Support: help@raqoon.app
- Unternehmen: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ankara, Türkiye`,

  fr: `Politique de confidentialité Raqoon VPN

Date d'entrée en vigueur : 17 mai 2026
Exploitant du service : Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ankara, Türkiye)
Contact confidentialité : private@raqoon.app

1. Résumé

Raqoon VPN est conçu pour protéger votre connexion et renforcer votre confidentialité sur Internet. L'application ne collecte ni n'examine l'activité de navigation, les requêtes DNS ni le contenu du trafic VPN.

Pour exploiter le service, nous traitons uniquement des informations techniques limitées, notamment :
- un identifiant d'appareil anonyme généré aléatoirement ;
- un identifiant client anonyme généré aléatoirement ;
- des informations sur la région de l'App Store ;
- la confirmation que vous avez au moins 18 ans ;
- des diagnostics techniques de base liés à la stabilité de la connexion ;
- le statut d'abonnement et le volume de trafic nécessaires aux limites de votre forfait.

Nous n'exigeons pas votre nom, numéro de téléphone ou e-mail pour utiliser le VPN. Nous n'utilisons pas les données VPN à des fins d'analyse, de publicité, de profilage ou de suivi des utilisateurs. Nous ne vendons pas les données des utilisateurs aux réseaux publicitaires.

2. Ce que signifie notre politique No-Logs

Nous ne journalisons ni ne stockons :
- l'historique des sites et URL visités ;
- les requêtes de recherche ;
- les requêtes DNS ;
- le contenu du trafic, y compris messages, e-mails, fichiers et autres données transmises ;
- l'historique de votre activité réseau ;
- votre adresse IP source dans un historique d'activité.

Nous ne lions pas votre activité réseau à votre compte, appareil ou données de paiement à des fins de profilage.

Certaines données techniques peuvent être traitées temporairement par l'équipement réseau lors de l'établissement ou du maintien d'une connexion VPN. Cela est nécessaire pour acheminer le trafic chiffré et faire fonctionner le service. Nous ne les utilisons pas pour constituer un historique de navigation, analyser le contenu du trafic ou profiler les utilisateurs.

3. Données collectées dans l'application

3.1. Identifiants et éligibilité
- identifiant d'appareil anonyme généré aléatoirement (autorisation de l'appareil et limites d'appareils) ;
- identifiant client anonyme généré aléatoirement (session client) ;
- région de l'App Store (disponibilité régionale et règles du store) ;
- confirmation que vous avez 18 ans ou plus.

3.2. Exploitation du service et diagnostics
- statut d'abonnement et limites du forfait ;
- volume de données transférées (pour appliquer votre forfait, sans voir ce à quoi vous avez accédé) ;
- heure de la dernière connexion et état de la connexion ;
- diagnostics techniques de base sur la stabilité et les erreurs (sans historique de navigation, requêtes DNS ni contenu du trafic).

3.3. Abonnements et stores d'applications
Si vous vous abonnez via l'Apple App Store, Google Play ou Huawei AppGallery, le store traite le paiement. Nous ne recevons que des données techniques limitées pour valider le statut d'abonnement (par ex. reçu ou jeton). Nous ne stockons pas les données complètes de carte bancaire.

3.4. Support (uniquement si vous nous contactez)
Si vous écrivez au support ou utilisez le portail d'assistance, nous traitons les coordonnées et le contenu que vous fournissez volontairement. Cela est distinct de la journalisation des sessions VPN.

4. Finalités du traitement

Nous utilisons les données ci-dessus uniquement pour :
- exploiter et maintenir le service VPN ;
- appliquer les restrictions de disponibilité régionale ;
- gérer les abonnements et l'accès aux appareils ;
- améliorer la fiabilité de la connexion et résoudre les problèmes techniques ;
- respecter les exigences d'âge du service.

5. Où les données sont traitées (infrastructure)

Notre infrastructure est répartie comme suit :

États-Unis :
- systèmes backend principaux (identifiants de compte, données d'abonnement, région App Store, confirmation d'âge, diagnostics de connexion décrits dans la présente Politique) ;
- serveurs du portail d'assistance client (données que vous soumettez en contactant le support).

Suisse :
- répartition de charge pour les connexions VPN ;
- serveurs VPN fournissant votre connexion VPN chiffrée.

Le trafic VPN chiffré transite par notre infrastructure VPN et de répartition de charge en Suisse. Nous ne conservons pas de journaux des sites visités, des requêtes DNS ni du contenu du trafic.

Des données techniques de service limitées peuvent être transférées entre les États-Unis et la Suisse uniquement dans la mesure nécessaire à l'exploitation du service, avec des garanties techniques et organisationnelles appropriées.

6. Tiers

Nous ne partageons pas le trafic VPN, l'activité de navigation, les requêtes DNS ni le contenu du trafic avec des tiers à des fins d'analyse, de publicité, de profilage ou de suivi.

Les opérateurs de stores (Apple, Google, Huawei) traitent les achats selon leurs propres conditions et politiques de confidentialité. Nous ne recevons que les données techniques de validation d'abonnement décrites ci-dessus.

Les fournisseurs d'infrastructure hébergent serveurs et réseaux ; nous ne leur transmettons pas de journaux d'activité, d'historique de navigation, de requêtes DNS ni de contenu de trafic. Ils participent techniquement au transport du trafic chiffré, comme requis pour un VPN.

7. Absence de suivi dans l'application Raqoon

Nos applications mobiles n'utilisent pas de SDK tiers de marketing ou d'analyse produit pour suivre l'utilisation du VPN. Des rapports de plantage ou de diagnostic peuvent être traités par Apple, Google ou Huawei selon les règles de la plateforme et les paramètres de votre appareil ; ils ne servent pas à analyser l'activité de navigation VPN ni le contenu du trafic.

8. Site web (raqoon.app), cookies et analyses

Sur raqoon.app, nous pouvons utiliser des cookies et technologies similaires pour le fonctionnement du site, les préférences et l'analyse web.

Le site peut utiliser Google Analytics pour comprendre le trafic global et les performances des pages. L'analyse web est distincte de l'application VPN et n'est pas utilisée pour analyser le trafic VPN, les requêtes DNS ni l'historique de navigation dans une session VPN.

Si une bannière de consentement aux cookies s'affiche, vous pouvez accepter ou refuser les cookies non essentiels.

9. Conservation et suppression

Les données techniques sont conservées pendant la durée de votre abonnement actif et selon les besoins d'exploitation du service. En cas de non-renouvellement, les données de compte peuvent être supprimées après une période d'inactivité.

Vous pouvez supprimer votre compte et les données associées dans les paramètres de l'application Raqoon. Après suppression, nous cessons l'accès et supprimons ou anonymisons les données qui ne sont plus nécessaires.

Certaines données peuvent être conservées pour une durée limitée lorsque la loi, la vérification de facturation, la prévention de la fraude ou le règlement de litiges l'exigent.

10. Demandes des autorités

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. est enregistrée en Türkiye. En cas de demande légale d'une autorité compétente, nous l'évaluons conformément au droit applicable.

Comme nous ne conservons pas de journaux d'activité, nous ne pouvons pas fournir d'historique de navigation, de requêtes DNS ni de contenu de trafic. Nous ne pouvons confirmer que des informations limitées telles que l'existence du compte, le statut d'abonnement ou les données techniques décrites dans la présente Politique.

11. Condition d'âge

Le Service ne s'adresse pas aux personnes de moins de 18 ans. Nous utilisons la confirmation d'âge dans l'application pour appliquer cette exigence.

12. Sécurité

Nous appliquons des mesures techniques et organisationnelles, notamment le contrôle d'accès, le chiffrement en transit et la minimisation des données.

13. Vos droits

Vous pouvez demander des informations sur les données liées à votre compte, supprimer votre compte dans l'application, nous contacter sur la confidentialité et refuser les cookies non essentiels sur le site lorsque cela est proposé.

Confidentialité : private@raqoon.app

14. Distribution de l'application

Lorsque vous installez Raqoon VPN depuis l'Apple App Store, Google Play ou Huawei AppGallery, l'opérateur du store traite les achats et certains identifiants selon ses propres politiques. Votre utilisation du store est régie par ses règles.

15. Modifications de la Politique

Nous pouvons mettre à jour cette Politique lorsque le service, l'infrastructure ou les exigences légales changent. La date d'entrée en vigueur en tête sera mise à jour lors de la publication d'une nouvelle version.

16. Contacts

- Confidentialité et suppression des données : private@raqoon.app
- Support : help@raqoon.app
- Société : Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ankara, Türkiye`,

  pl: `Polityka prywatności Raqoon VPN

Data wejścia w życie: 17 maja 2026 r.
Właściciel usługi: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ankara, Türkiye)
Kontakt w sprawach prywatności: private@raqoon.app

1. Podsumowanie

Raqoon VPN ma chronić Twoje połączenie i zwiększać prywatność w internecie. Aplikacja nie zbiera ani nie analizuje aktywności przeglądania, zapytań DNS ani treści ruchu VPN.

Aby świadczyć usługę, przetwarzamy wyłącznie ograniczone dane techniczne, w tym:
- losowo wygenerowany anonimowy identyfikator urządzenia;
- losowo wygenerowany anonimowy identyfikator klienta;
- informacje o regionie App Store;
- potwierdzenie, że masz ukończone 18 lat;
- podstawową diagnostykę techniczną związaną ze stabilnością połączenia;
- status subskrypcji i wolumen ruchu potrzebny do limitów planu.

Do korzystania z VPN nie wymagamy imienia, numeru telefonu ani e-maila. Nie wykorzystujemy danych VPN do analityki, reklamy, profilowania ani śledzenia użytkowników. Nie sprzedajemy danych użytkowników sieciom reklamowym.

2. Co oznacza nasza polityka No-Logs

Nie rejestrujemy ani nie przechowujemy:
- historii odwiedzanych stron i adresów URL;
- zapytań wyszukiwania;
- zapytań DNS;
- treści ruchu, w tym wiadomości, e-maili, plików i innych przesyłanych danych;
- historii Twojej aktywności sieciowej;
- Twojego adresu IP źródłowego jako części historii aktywności.

Nie łączymy Twojej aktywności sieciowej z kontem, urządzeniem ani danymi płatności w celu profilowania.

Niektóre dane techniczne mogą być tymczasowo przetwarzane przez sprzęt sieciowy podczas nawiązywania lub utrzymywania połączenia VPN. Jest to konieczne do przesyłania zaszyfrowanego ruchu i działania usługi. Nie wykorzystujemy ich do budowy historii przeglądania, analizy treści ruchu ani profilowania użytkowników.

3. Dane zbierane w aplikacji

3.1. Identyfikatory i uprawnienia
- losowo wygenerowany anonimowy identyfikator urządzenia (autoryzacja urządzenia i limity urządzeń);
- losowo wygenerowany anonimowy identyfikator klienta (sesja klienta);
- region App Store (dostępność regionalna i zasady sklepu);
- potwierdzenie, że masz ukończone 18 lat.

3.2. Działanie usługi i diagnostyka
- status subskrypcji i limity planu;
- wolumen przesłanych danych (do egzekwowania planu, bez wiedzy, do czego uzyskałeś dostęp);
- czas ostatniego połączenia i status połączenia;
- podstawowa diagnostyka techniczna stabilności i błędów (bez historii przeglądania, zapytań DNS ani treści ruchu).

3.3. Subskrypcje i sklepy z aplikacjami
Przy subskrypcji przez Apple App Store, Google Play lub Huawei AppGallery płatność przetwarza sklep. Otrzymujemy wyłącznie ograniczone dane techniczne do weryfikacji statusu subskrypcji (np. paragon lub token). Nie przechowujemy pełnych danych karty płatniczej.

3.4. Wsparcie (tylko po kontakcie)
Jeśli piszesz do wsparcia lub korzystasz z portalu pomocy, przetwarzamy dane kontaktowe i treść, które dobrowolnie podajesz. Jest to oddzielone od rejestrowania sesji VPN.

4. Cele przetwarzania

Dane powyżej wykorzystujemy wyłącznie, aby:
- obsługiwać i utrzymywać usługę VPN;
- stosować regionalne ograniczenia dostępności;
- zarządzać subskrypcjami i dostępem urządzeń;
- poprawiać niezawodność połączenia i usuwać problemy techniczne;
- zapewniać zgodność z wymogami wiekowymi usługi.

5. Gdzie przetwarzane są dane (infrastruktura)

Infrastruktura jest rozłożona następująco:

Stany Zjednoczone:
- główne systemy backend (identyfikatory konta, dane subskrypcji, region App Store, potwierdzenie wieku, diagnostyka połączenia opisana w niniejszej Polityce);
- serwery portalu wsparcia klienta (dane przesyłane przy kontakcie ze wsparciem).

Szwajcaria:
- równoważenie obciążenia połączeń VPN;
- serwery VPN zapewniające zaszyfrowane połączenie VPN.

Zaszyfrowany ruch VPN przechodzi przez infrastrukturę VPN i równoważenia obciążenia w Szwajcarii. Nie prowadzimy logów odwiedzanych stron, zapytań DNS ani treści ruchu.

Ograniczone dane techniczne usługi mogą być przekazywane między Stanami Zjednoczonymi a Szwajcarią wyłącznie w zakresie niezbędnym do działania usługi, z odpowiednimi zabezpieczeniami technicznymi i organizacyjnymi.

6. Podmioty trzecie

Nie udostępniamy ruchu VPN, aktywności przeglądania, zapytań DNS ani treści ruchu podmiotom trzecim w celach analityki, reklamy, profilowania ani śledzenia.

Operatorzy sklepów (Apple, Google, Huawei) przetwarzają zakupy na własnych warunkach i politykach prywatności. Otrzymujemy wyłącznie opisane powyżej dane techniczne weryfikacji subskrypcji.

Dostawcy infrastruktury hostują serwery i sieci; nie przekazujemy im logów aktywności, historii przeglądania, zapytań DNS ani treści ruchu. Technicznie uczestniczą w przesyłaniu zaszyfrowanego ruchu, jak wymaga działanie VPN.

7. Brak śledzenia w aplikacji Raqoon

Aplikacje mobilne nie używają zewnętrznych SDK marketingowych ani analitycznych do śledzenia korzystania z VPN. Raporty awarii mogą być przetwarzane przez Apple, Google lub Huawei zgodnie z zasadami platformy i ustawieniami urządzenia; nie służą do analizy aktywności VPN ani treści ruchu.

8. Strona (raqoon.app), pliki cookie i analityka

Na raqoon.app możemy używać plików cookie i podobnych technologii do działania strony, preferencji i analityki webowej.

Strona może korzystać z Google Analytics w celu ogólnego ruchu i wydajności stron. Analityka strony jest oddzielona od aplikacji VPN i nie służy do analizy ruchu VPN, zapytań DNS ani historii przeglądania w sesji VPN.

Jeśli wyświetlany jest baner zgody na pliki cookie, możesz zaakceptować lub odrzucić pliki nieistotne.

9. Przechowywanie i usuwanie

Dane techniczne są przechowywane przez aktywną subskrypcję i tak długo, jak wymaga działanie usługi. Przy braku odnowienia dane konta mogą zostać usunięte po okresie nieaktywności.

Możesz usunąć konto i powiązane dane w ustawieniach aplikacji Raqoon. Po usunięciu wstrzymujemy dostęp i usuwamy lub anonimizujemy dane, które nie są już potrzebne.

Niektóre zapisy mogą być przechowywane przez ograniczony czas, gdy wymaga tego prawo, weryfikacja płatności, zapobieganie nadużyciom lub rozstrzyganie sporów.

10. Żądania organów

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. jest zarejestrowana w Türkiye. Na prawnie uzasadnione żądania właściwych organów odpowiadamy zgodnie z obowiązującym prawem.

Ponieważ nie prowadzimy logów aktywności, nie możemy udostępnić historii przeglądania, zapytań DNS ani treści ruchu. Możemy potwierdzić wyłącznie ograniczone informacje, np. istnienie konta, status subskrypcji lub dane techniczne opisane w niniejszej Polityce.

11. Wymóg wieku

Usługa nie jest skierowana do osób poniżej 18 lat. Potwierdzenie wieku w aplikacji służy egzekwowaniu tego wymogu.

12. Bezpieczeństwo

Stosujemy środki techniczne i organizacyjne, w tym kontrolę dostępu, szyfrowanie w tranzycie i minimalizację danych.

13. Twoje prawa

Możesz żądać informacji o danych powiązanych z kontem, usunąć konto w aplikacji, skontaktować się w sprawach prywatności oraz odrzucić nieistotne pliki cookie na stronie, jeśli jest to dostępne.

Prywatność: private@raqoon.app

14. Dystrybucja aplikacji

Instalując Raqoon VPN z Apple App Store, Google Play lub Huawei AppGallery, operator sklepu przetwarza zakupy i niektóre identyfikatory według własnych zasad. Korzystanie ze sklepu podlega jego regulaminowi.

15. Zmiany Polityki

Możemy aktualizować Politykę przy zmianie usługi, infrastruktury lub wymogów prawnych. Data wejścia w życie u góry zostanie zaktualizowana przy publikacji nowej wersji.

16. Kontakty

- Prywatność i usuwanie danych: private@raqoon.app
- Wsparcie: help@raqoon.app
- Firma: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ankara, Türkiye`,

  cs: `Zásady ochrany osobních údajů Raqoon VPN

Datum účinnosti: 17. května 2026
Provozovatel služby: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ankara, Türkiye)
Kontakt pro soukromí: private@raqoon.app

1. Shrnutí

Raqoon VPN je navržen k ochraně vašeho připojení a zvýšení soukromí na internetu. Aplikace nesbírá ani nezkoumá aktivitu prohlížení, DNS dotazy ani obsah VPN provozu.

K provozu služby zpracováváme pouze omezené technické informace, včetně:
- náhodně vygenerovaného anonymního identifikátoru zařízení;
- náhodně vygenerovaného anonymního identifikátoru klienta;
- informací o regionu App Store;
- potvrzení, že je vám alespoň 18 let;
- základní technické diagnostiky stability připojení;
- stavu předplatného a objemu provozu pro limity tarifu.

K používání VPN nevyžadujeme jméno, telefon ani e-mail. Data VPN nepoužíváme k analytice, reklamě, profilování ani sledování uživatelů. Data uživatelů neprodáváme reklamním sítím.

2. Co znamená naše politika No-Logs

Nezaznamenáváme ani neukládáme:
- historii navštívených webů a URL;
- vyhledávací dotazy;
- DNS dotazy;
- obsah provozu včetně zpráv, e-mailů, souborů a jiných přenášených dat;
- historii vaší síťové aktivity;
- vaši zdrojovou IP adresu jako součást historie aktivity.

Vaši síťovou aktivitu nespojujeme s účtem, zařízením ani platebními údaji za účelem profilování.

Některá technická data mohou být dočasně zpracována síťovým vybavením při navazování nebo udržování VPN připojení. Je to nutné pro přenos šifrovaného provozu a provoz služby. Nepoužíváme je k vytváření historie prohlížení, analýze obsahu provozu ani profilování uživatelů.

3. Data shromažďovaná v aplikaci

3.1. Identifikátory a způsobilost
- náhodně vygenerovaný anonymní identifikátor zařízení (autorizace zařízení a limity zařízení);
- náhodně vygenerovaný anonymní identifikátor klienta (relace klienta);
- region App Store (regionální dostupnost a pravidla obchodu);
- potvrzení, že je vám 18 let nebo více.

3.2. Provoz služby a diagnostika
- stav předplatného a limity tarifu;
- objem přenesených dat (pro vynucení tarifu, nikoli pro zjištění, k čemu jste přistupovali);
- čas posledního připojení a stav připojení;
- základní technická diagnostika stability a chyb (bez historie prohlížení, DNS dotazů ani obsahu provozu).

3.3. Předplatné a obchody s aplikacemi
Při předplatném přes Apple App Store, Google Play nebo Huawei AppGallery zpracovává platbu obchod. Obdržíme pouze omezená technická data pro ověření stavu předplatného (např. účtenka nebo token). Úplné údaje platební karty neukládáme.

3.4. Podpora (pouze při kontaktu)
Píšete-li podpoře nebo používáte portál podpory, zpracováváme kontaktní údaje a obsah, které dobrovolně poskytnete. Je to odděleno od protokolování VPN relace.

4. Účely zpracování

Výše uvedená data používáme výhradně k:
- provozu a údržbě VPN služby;
- uplatnění regionálních omezení dostupnosti;
- správě předplatných a přístupu zařízení;
- zlepšení spolehlivosti připojení a řešení technických problémů;
- dodržení věkových požadavků služby.

5. Kde jsou data zpracovávána (infrastruktura)

Infrastruktura je rozdělena takto:

Spojené státy americké:
- primární backendové systémy (identifikátory účtu, data předplatného, region App Store, potvrzení věku, diagnostika připojení popsaná v těchto Zásadách);
- servery zákaznického portálu podpory (data odeslaná při kontaktu s podporou).

Švýcarsko:
- vyrovnávání zátěže VPN připojení;
- VPN servery poskytující vaše šifrované VPN připojení.

Šifrovaný VPN provoz prochází naší infrastrukturou VPN a vyrovnávání zátěže ve Švýcarsku. Nevedeme protokoly navštívených webů, DNS dotazů ani obsahu provozu.

Omezená technická servisní data mohou být přenášena mezi USA a Švýcarskem pouze v rozsahu nutném pro provoz služby, s přiměřenými technickými a organizačními zárukami.

6. Třetí strany

Nesdílíme VPN provoz, aktivitu prohlížení, DNS dotazy ani obsah provozu s třetími stranami pro analytiku, reklamu, profilování ani sledování.

Provozovatelé obchodů (Apple, Google, Huawei) zpracovávají nákupy podle vlastních podmínek a zásad ochrany soukromí. Obdržíme pouze výše popsaná technická data ověření předplatného.

Poskytovatelé infrastruktury hostují servery a sítě; nepředáváme jim protokoly aktivity, historii prohlížení, DNS dotazy ani obsah provozu. Technicky se podílejí na přenosu šifrovaného provozu, jak VPN vyžaduje.

7. Žádné sledování v aplikaci Raqoon

Mobilní aplikace nepoužívají marketingová ani produktová analytická SDK třetích stran ke sledování používání VPN. Zprávy o pádech mohou zpracovávat Apple, Google nebo Huawei podle pravidel platformy a nastavení zařízení; neslouží k analýze VPN aktivity prohlížení ani obsahu provozu.

8. Web (raqoon.app), cookies a analytika

Na raqoon.app můžeme používat cookies a podobné technologie pro provoz webu, preference a webovou analytiku.

Web může používat Google Analytics pro celkový provoz a výkon stránek. Webová analytika je oddělena od VPN aplikace a nepoužívá se k analýze VPN provozu, DNS dotazů ani historie prohlížení v rámci VPN relace.

Zobrazí-li se banner souhlasu s cookies, můžete nepodstatné cookies přijmout nebo odmítnout.

9. Uchovávání a výmaz

Technická data uchováváme po dobu aktivního předplatného a podle potřeby provozu služby. Při neobnovení mohou být data účtu po období nečinnosti smazána.

Účet a související data můžete smazat v nastavení aplikace Raqoon. Po smazání ukončíme přístup a smažeme nebo anonymizujeme data, která již nejsou potřeba.

Některé záznamy mohou být uchovány po omezenou dobu, vyžaduje-li to zákon, ověření plateb, prevence podvodů nebo řešení sporů.

10. Žádosti orgánů

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. je registrována v Türkiye. Na zákonné žádosti příslušných orgánů reagujeme podle platného práva.

Protože nevedeme protokoly aktivity, nemůžeme poskytnout historii prohlížení, DNS dotazy ani obsah provozu. Můžeme potvrdit pouze omezené informace, např. existenci účtu, stav předplatného nebo technická data popsaná v těchto Zásadách.

11. Věková podmínka

Služba není určena osobám mladším 18 let. Potvrzení věku v aplikaci slouží k vynucení tohoto požadavku.

12. Bezpečnost

Uplatňujeme technická a organizační opatření včetně řízení přístupu, šifrování při přenosu a minimalizace dat.

13. Vaše práva

Můžete požádat o informace o datech spojených s účtem, smazat účet v aplikaci, kontaktovat nás ohledně soukromí a odmítnout nepodstatné cookies na webu, pokud je to k dispozici.

Soukromí: private@raqoon.app

14. Distribuce aplikace

Při instalaci Raqoon VPN z Apple App Store, Google Play nebo Huawei AppGallery zpracovává nákupy a některé identifikátory provozovatel obchodu podle vlastních zásad. Použití obchodu se řídí jeho pravidly.

15. Změny Zásad

Zásady můžeme aktualizovat při změně služby, infrastruktury nebo právních požadavků. Datum účinnosti nahoře se při zveřejnění nové verze aktualizuje.

16. Kontakty

- Soukromí a výmaz dat: private@raqoon.app
- Podpora: help@raqoon.app
- Společnost: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ankara, Türkiye`,

  ja: `Raqoon VPN プライバシーポリシー

発効日：2026年5月17日
サービス提供者：Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.（アンカラ、トルコ）
プライバシー連絡先：private@raqoon.app

1. 概要

Raqoon VPN は、接続を保護しインターネット利用時のプライバシーを高めることを目的としています。本アプリは、閲覧履歴、DNS クエリ、VPN トラフィックの内容を収集または検査しません。

サービス運営のため、以下を含む限定的な技術情報のみを処理します：
- ランダムに生成された匿名デバイス識別子；
- ランダムに生成された匿名クライアント識別子；
- App Store リージョン情報；
- 18 歳以上であることの確認；
- 接続安定性に関する基本的な技術診断；
- プラン上限のためのサブスクリプション状態およびトラフィック量。

VPN の利用に氏名・電話番号・メールは不要です。VPN データを分析、広告、プロファイリング、ユーザー追跡に使用しません。ユーザーデータを広告ネットワークに販売しません。

2. No-Logs ポリシーの意味

以下を記録または保存しません：
- 訪問したウェブサイトおよび URL の履歴；
- 検索クエリ；
- DNS クエリ；
- メッセージ、メール、ファイルその他の送信データを含むトラフィック内容；
- ネットワーク活動の履歴；
- 活動履歴の一部としての送信元 IP アドレス。

ネットワーク活動をアカウント、デバイス、支払いデータとプロファイリング目的で紐づけません。

VPN 接続の確立または維持中、ネットワーク機器により一部の技術データが一時的に処理される場合があります。これは暗号化トラフィックの伝送とサービス運営に必要です。閲覧履歴の構築、トラフィック内容の分析、ユーザープロファイリングには使用しません。

3. アプリで収集するデータ

3.1. 識別子と資格
- ランダムに生成された匿名デバイス識別子（デバイス認可およびデバイス上限）；
- ランダムに生成された匿名クライアント識別子（クライアントセッション管理）；
- App Store リージョン情報（地域提供およびストア規則）；
- 18 歳以上であることの確認。

3.2. サービス運営と診断
- サブスクリプション状態およびプラン上限；
- 転送データ量（プラン適用のため。アクセス先の内容は把握しません）；
- 最終接続時刻および接続状態；
- 安定性およびエラーに関する基本的な技術診断（閲覧履歴、DNS クエリ、トラフィック内容を除く）。

3.3. サブスクリプションとアプリストア
Apple App Store、Google Play、Huawei AppGallery 経由の場合、支払いは各ストアが処理します。サブスクリプション状態の検証に必要な限定的な技術データ（例：レシートまたはトークン）のみ受領します。カード番号の全データは保存しません。

3.4. サポート（お問い合わせ時のみ）
サポートまたはサポートポータル利用時、お客様が任意に提供する連絡先および内容を処理します。VPN セッションのログ記録とは別です。

4. 処理の目的

上記データは以下の目的にのみ使用します：
- VPN サービスの運営および維持；
- 地域提供制限の適用；
- サブスクリプションおよびデバイスアクセスの管理；
- 接続信頼性の向上および技術問題の解決；
- 年齢要件の遵守。

5. データ処理の場所（インフラ）

インフラは次のとおり配置されています：

アメリカ合衆国：
- 主要バックエンド（アカウント識別子、サブスクリプションデータ、App Store リージョン、年齢確認、本ポリシーに記載の接続診断）；
- カスタマーサポートポータルサーバー（サポート連絡時に送信するデータ）。

スイス：
- VPN 接続のロードバランシング；
- 暗号化 VPN 接続を提供する VPN サーバー。

暗号化 VPN トラフィックはスイスにある VPN およびロードバランシングインフラを経由します。訪問サイト、DNS クエリ、トラフィック内容のログは保持しません。

限定的な技術サービスデータは、サービス運営に必要な範囲でのみ米国とスイス間で転送され、適切な技術的・組織的保護措置を講じます。

6. 第三者

VPN トラフィック、閲覧活動、DNS クエリ、トラフィック内容を、分析・広告・プロファイリング・追跡目的で第三者と共有しません。

アプリストア事業者（Apple、Google、Huawei）は独自の条件およびプライバシーポリシーに基づき購入を処理します。当社が受領するのは上記のサブスクリプション検証用技術データのみです。

インフラ提供者はサーバーおよびネットワークをホストしますが、活動ログ、閲覧履歴、DNS クエリ、トラフィック内容は提供しません。暗号化トラフィックの伝送に技術的に関与します（VPN 運営に必要な範囲）。

7. Raqoon アプリにおける追跡の不使用

モバイルアプリは、VPN 利用を追跡する第三者のマーケティングまたは製品分析 SDK を使用しません。クラッシュまたは診断レポートは、プラットフォーム規則および端末設定に従い Apple、Google、Huawei が処理する場合がありますが、VPN 閲覧活動またはトラフィック内容の分析には使用しません。

8. ウェブサイト（raqoon.app）、Cookie、分析

raqoon.app では、サイト運営、設定、ウェブ分析のため Cookie および類似技術を使用する場合があります。

サイトでは Google Analytics を使用し、全体のトラフィックおよびページ性能を把握する場合があります。ウェブ分析は VPN アプリとは分離され、VPN セッション内の VPN トラフィック、DNS クエリ、閲覧履歴の分析には使用しません。

Cookie 同意バナーが表示される場合、非必須 Cookie を承認または拒否できます。

9. 保存および削除

技術データは、サブスクリプション有効期間中およびサービス運営に必要な期間保持します。更新しない場合、非アクティブ期間後にアカウントデータを削除する場合があります。

Raqoon アプリ設定からアカウントおよび関連データを削除できます。削除後はアクセスを停止し、不要となったデータを削除または匿名化します。

法令、課金確認、不正防止、紛争解決に必要な場合、一部記録を限定的期間保持することがあります。

10. 政府機関からの要請

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. はトルコに登録されています。管轄当局からの適法な要請については、適用法に従い評価します。

活動ログを保持しないため、閲覧履歴、DNS クエリ、トラフィック内容を提供できません。アカウントの存在、サブスクリプション状態、本ポリシーに記載の技術データなど、限定的な情報のみ確認できる場合があります。

11. 年齢要件

本サービスは 18 歳未満を対象としません。アプリ内年齢確認によりこの要件を実施します。

12. セキュリティ

アクセス制御、転送時の暗号化、データ最小化を含む技術的・組織的措置を適用します。

13. お客様の権利

アカウントに紐づくデータの開示請求、アプリ内アカウント削除、プライバシーに関する問い合わせ、ウェブサイトで提供される場合の非必須 Cookie の拒否が可能です。

プライバシー：private@raqoon.app

14. アプリ配布

Apple App Store、Google Play、Huawei AppGallery から Raqoon VPN をインストールする場合、購入および一部識別子は各ストア事業者が独自ポリシーに基づき処理します。ストア利用は当該事業者の規則に従います。

15. 本ポリシーの変更

サービス、インフラ、法的要件の変更に伴い本ポリシーを更新する場合があります。新バージョン公開時に冒頭の発効日を更新します。

16. 連絡先

- プライバシーおよびデータ削除：private@raqoon.app
- サポート：help@raqoon.app
- 会社：Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.、アンカラ、トルコ`,

  ko: `Raqoon VPN 개인정보 처리방침

시행일: 2026년 5월 17일
서비스 운영자: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (앙카라, 터키)
개인정보 문의: private@raqoon.app

1. 요약

Raqoon VPN은 연결을 보호하고 인터넷 이용 시 프라이버시를 높이도록 설계되었습니다. 앱은 브라우징 활동, DNS 쿼리, VPN 트래픽 내용을 수집하거나 검사하지 않습니다.

서비스 운영을 위해 다음을 포함한 제한적 기술 정보만 처리합니다:
- 무작위 생성된 익명 기기 식별자;
- 무작위 생성된 익명 클라이언트 식별자;
- App Store 지역 정보;
- 만 18세 이상 확인;
- 연결 안정성 관련 기본 기술 진단;
- 요금제 한도를 위한 구독 상태 및 트래픽 용량.

VPN 이용에 이름, 전화번호, 이메일은 필요하지 않습니다. VPN 데이터를 분석, 광고, 프로파일링, 사용자 추적에 사용하지 않습니다. 사용자 데이터를 광고 네트워크에 판매하지 않습니다.

2. No-Logs 정책의 의미

다음을 기록하거나 저장하지 않습니다:
- 방문한 웹사이트 및 URL 기록;
- 검색 쿼리;
- DNS 쿼리;
- 메시지, 이메일, 파일 등 전송 데이터를 포함한 트래픽 내용;
- 네트워크 활동 기록;
- 활동 기록의 일부로서의 원본 IP 주소.

네트워크 활동을 계정, 기기, 결제 데이터와 프로파일링 목적으로 연결하지 않습니다.

VPN 연결 수립 또는 유지 중 네트워크 장비가 일부 기술 데이터를 일시 처리할 수 있습니다. 이는 암호화 트래픽 전송 및 서비스 운영에 필요합니다. 브라우징 기록 구축, 트래픽 내용 분석, 사용자 프로파일링에는 사용하지 않습니다.

3. 앱에서 수집하는 데이터

3.1. 식별자 및 자격
- 무작위 생성된 익명 기기 식별자(기기 인증 및 기기 한도);
- 무작위 생성된 익명 클라이언트 식별자(클라이언트 세션 관리);
- App Store 지역 정보(지역 제공 및 스토어 규칙);
- 만 18세 이상 확인.

3.2. 서비스 운영 및 진단
- 구독 상태 및 요금제 한도;
- 전송 데이터 용량(요금제 적용용, 접근 대상 내용은 파악하지 않음);
- 마지막 연결 시각 및 연결 상태;
- 안정성 및 오류 관련 기본 기술 진단(브라우징 기록, DNS 쿼리, 트래픽 내용 제외).

3.3. 구독 및 앱 스토어
Apple App Store, Google Play, Huawei AppGallery 구독 시 결제는 스토어가 처리합니다. 구독 상태 검증에 필요한 제한적 기술 데이터(예: 영수증 또는 토큰)만 수신합니다. 전체 카드 정보는 저장하지 않습니다.

3.4. 지원(문의 시에만)
지원 또는 지원 포털 이용 시 자발적으로 제공한 연락처 및 내용을 처리합니다. VPN 세션 로깅과 별개입니다.

4. 처리 목적

위 데이터는 다음 목적으로만 사용합니다:
- VPN 서비스 운영 및 유지;
- 지역 제공 제한 적용;
- 구독 및 기기 접근 관리;
- 연결 안정성 개선 및 기술 문제 해결;
- 연령 관련 서비스 요건 준수.

5. 데이터 처리 위치(인프라)

인프라는 다음과 같이 배치됩니다:

미국:
- 주요 백엔드(계정 식별자, 구독 데이터, App Store 지역, 연령 확인, 본 방침의 연결 진단);
- 고객 지원 포털 서버(지원 문의 시 제출 데이터).

스위스:
- VPN 연결 로드 밸런싱;
- 암호화 VPN 연결을 제공하는 VPN 서버.

암호화 VPN 트래픽은 스위스의 VPN 및 로드 밸런싱 인프라를 경유합니다. 방문 사이트, DNS 쿼리, 트래픽 내용 로그는 보관하지 않습니다.

제한적 기술 서비스 데이터는 서비스 운영에 필요한 범위에서만 미국과 스위스 간 전송되며 적절한 기술·조직적 보호조치를 적용합니다.

6. 제3자

VPN 트래픽, 브라우징 활동, DNS 쿼리, 트래픽 내용을 분석·광고·프로파일링·추적 목적으로 제3자와 공유하지 않습니다.

앱 스토어 운영자(Apple, Google, Huawei)는 자체 약관 및 개인정보 처리방침에 따라 구매를 처리합니다. 당사는 위에 기술한 구독 검증 기술 데이터만 수신합니다.

인프라 제공자는 서버 및 네트워크를 호스팅하나 활동 로그, 브라우징 기록, DNS 쿼리, 트래픽 내용은 제공하지 않습니다. 암호화 트래픽 전송에 기술적으로 참여합니다(VPN 운영에 필요).

7. Raqoon 앱 내 추적 없음

모바일 앱은 VPN 이용 추적용 제3자 마케팅·제품 분석 SDK를 사용하지 않습니다. 충돌 또는 진단 보고서는 플랫폼 규칙 및 기기 설정에 따라 Apple, Google, Huawei가 처리할 수 있으나 VPN 브라우징 활동 또는 트래픽 내용 분석에는 사용하지 않습니다.

8. 웹사이트(raqoon.app), 쿠키 및 분석

raqoon.app에서는 사이트 운영, 설정, 웹 분석을 위해 쿠키 및 유사 기술을 사용할 수 있습니다.

사이트는 Google Analytics로 전체 트래픽 및 페이지 성능을 파악할 수 있습니다. 웹 분석은 VPN 앱과 분리되며 VPN 세션 내 VPN 트래픽, DNS 쿼리, 브라우징 기록 분석에 사용하지 않습니다.

쿠키 동의 배너가 표시되면 비필수 쿠키를 수락하거나 거부할 수 있습니다.

9. 보관 및 삭제

기술 데이터는 구독 활성 기간 및 서비스 운영에 필요한 기간 보관합니다. 갱신하지 않으면 비활성 기간 후 계정 데이터를 삭제할 수 있습니다.

Raqoon 앱 설정에서 계정 및 관련 데이터를 삭제할 수 있습니다. 삭제 후 접근을 중단하고 더 이상 필요 없는 데이터를 삭제하거나 익명화합니다.

법률, 결제 확인, 사기 방지, 분쟁 해결에 필요한 경우 일부 기록을 제한적으로 보관할 수 있습니다.

10. 정부 기관 요청

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.는 터키에 등록되어 있습니다. 관할 기관의 적법한 요청은 적용 법률에 따라 평가합니다.

활동 로그를 보관하지 않으므로 브라우징 기록, DNS 쿼리, 트래픽 내용을 제공할 수 없습니다. 계정 존재, 구독 상태, 본 방침의 기술 데이터 등 제한적 정보만 확인할 수 있습니다.

11. 연령 요건

본 서비스는 만 18세 미만을 대상으로 하지 않습니다. 앱 내 연령 확인으로 이 요건을 시행합니다.

12. 보안

접근 통제, 전송 중 암호화, 데이터 최소화를 포함한 기술·조직적 조치를 적용합니다.

13. 귀하의 권리

계정 관련 데이터 정보 요청, 앱 내 계정 삭제, 개인정보 문의, 웹사이트에서 제공 시 비필수 쿠키 거부가 가능합니다.

개인정보: private@raqoon.app

14. 앱 배포

Apple App Store, Google Play, Huawei AppGallery에서 Raqoon VPN을 설치하면 구매 및 일부 식별자는 각 스토어 운영자가 자체 정책에 따라 처리합니다. 스토어 이용은 해당 운영자 규칙을 따릅니다.

15. 방침 변경

서비스, 인프라, 법적 요건 변경 시 본 방침을 업데이트할 수 있습니다. 새 버전 게시 시 상단 시행일을 갱신합니다.

16. 연락처

- 개인정보 및 데이터 삭제: private@raqoon.app
- 지원: help@raqoon.app
- 회사: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., 앙카라, 터키`,

  "zh-CN": `Raqoon VPN 隐私政策

生效日期：2026年5月17日
服务运营方：Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.（土耳其安卡拉）
隐私联系：private@raqoon.app

1. 摘要

Raqoon VPN 旨在保护您的连接并提升互联网使用时的隐私。本应用不收集或检查浏览活动、DNS 查询或 VPN 流量内容。

为运营服务，我们仅处理有限的技术信息，包括：
- 随机生成的匿名设备标识符；
- 随机生成的匿名客户端标识符；
- App Store 地区信息；
- 确认您已满 18 周岁；
- 与连接稳定性相关的基础技术诊断；
- 订阅状态及套餐限额所需的流量用量。

使用 VPN 无需提供姓名、电话或电子邮件。我们不会将 VPN 数据用于分析、广告、画像或用户跟踪，也不会向广告网络出售用户数据。

2. No-Logs 政策的含义

我们不会记录或存储：
- 访问的网站及 URL 历史；
- 搜索查询；
- DNS 查询；
- 流量内容（包括消息、电子邮件、文件及其他传输数据）；
- 您的网络活动历史；
- 作为活动历史一部分的源 IP 地址。

我们不会将您的网络活动与账户、设备或支付数据关联以进行画像。

建立或维持 VPN 连接时，网络设备可能临时处理部分技术数据，这对传输加密流量和运营服务是必需的。我们不会据此构建浏览历史、分析流量内容或对用户画像。

3. 应用中收集的数据

3.1. 标识符与资格
- 随机生成的匿名设备标识符（设备授权与设备数量限制）；
- 随机生成的匿名客户端标识符（客户端会话管理）；
- App Store 地区信息（区域可用性与商店规则）；
- 确认您已满 18 周岁。

3.2. 服务运营与诊断
- 订阅状态与套餐限额；
- 传输数据量（用于执行套餐限额，不用于了解您访问了什么）；
- 上次连接时间与连接状态；
- 与稳定性及错误相关的基础技术诊断（不含浏览历史、DNS 查询或流量内容）。

3.3. 订阅与应用商店
通过 Apple App Store、Google Play 或华为 AppGallery 订阅时，由商店处理付款。我们仅接收验证订阅状态所需的有限技术数据（例如收据或令牌数据）。我们不存储完整银行卡信息。

3.4. 支持（仅在您联系我们时）
如您联系支持或使用支持门户，我们处理您自愿提供的联系方式与内容。这与 VPN 会话日志记录无关。

4. 处理目的

我们仅将上述数据用于：
- 运营和维护 VPN 服务；
- 适用区域可用性限制；
- 管理订阅与设备访问；
- 提升连接可靠性并排查技术问题；
- 遵守服务相关的年龄要求。

5. 数据处理地点（基础设施）

基础设施分布如下：

美国：
- 主要后端系统（账户标识符、订阅数据、App Store 地区、年龄确认、本政策所述连接诊断）；
- 客户支持门户服务器（您联系支持时提交的数据）。

瑞士：
- VPN 连接的负载均衡；
- 提供加密 VPN 连接的 VPN 服务器。

加密 VPN 流量经我们位于瑞士的 VPN 及负载均衡基础设施。我们不保留您访问的网站、DNS 查询或流量内容的日志。

有限的技术服务数据仅在运营服务所需范围内在美国与瑞士之间传输，并采取适当的技术与组织保护措施。

6. 第三方

我们不会为分析、广告、画像或跟踪目的向第三方共享 VPN 流量、浏览活动、DNS 查询或流量内容。

应用商店运营方（Apple、Google、华为）按其条款与隐私政策处理购买。我们仅接收上文所述的订阅验证技术数据。

基础设施提供商托管服务器与网络；我们不向其提供用户活动日志、浏览历史、DNS 查询或流量内容。他们仅在 VPN 运行所需范围内技术参与传输加密流量。

7. Raqoon 应用内无跟踪

我们的移动应用不使用第三方营销或产品分析 SDK 跟踪 VPN 使用情况。崩溃或诊断报告可能由 Apple、Google 或华为按平台规则及您的设备设置处理；此类报告不用于分析 VPN 浏览活动或流量内容。

8. 网站（raqoon.app）、Cookie 与分析

在 raqoon.app 上，我们可能使用 Cookie 及类似技术用于网站基本运行、偏好设置与网站分析。

网站可能使用 Google Analytics 了解整体流量与页面表现。网站分析与 VPN 应用分离，不用于分析 VPN 会话内的 VPN 流量、DNS 查询或浏览历史。

如显示 Cookie 同意横幅，您可接受或拒绝非必要 Cookie。

9. 保留与删除

技术数据在订阅有效期内及运营服务所需期间保留。如未续订，账户数据可能在一段不活跃期后删除。

您可在 Raqoon 应用设置中删除账户及相关数据。删除后我们将停止提供访问，并删除或匿名化不再需要的数据。

某些记录可能在法律、账单核实、防欺诈或争议解决所需范围内有限保留。

10. 政府与主管机关请求

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. 在土耳其注册。如收到主管机关的合法请求，我们将依据适用法律评估。

因我们不保留活动日志，无法提供浏览历史、DNS 查询或流量内容。我们可能仅能确认有限信息，例如账户是否存在、订阅状态或本政策所述技术数据。

11. 年龄要求

本服务不面向未满 18 周岁的个人。我们通过应用内年龄确认执行此要求。

12. 安全

我们采取技术与组织措施，包括访问控制、传输加密与数据最小化。

13. 您的权利

您可请求与账户相关的数据信息、在应用中删除账户、就隐私联系我们，并在网站提供时拒绝非必要 Cookie。

隐私：private@raqoon.app

14. 应用分发

从 Apple App Store、Google Play 或华为 AppGallery 安装 Raqoon VPN 时，商店运营方按其政策处理购买及某些标识符。您对商店的使用受该运营方规则约束。

15. 政策变更

当服务、基础设施或法律要求变更时，我们可能更新本政策。发布新版本时将更新文首生效日期。

16. 联系方式

- 隐私与数据删除：private@raqoon.app
- 支持：help@raqoon.app
- 公司：Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.，土耳其安卡拉`,

  ar: `سياسة خصوصية Raqoon VPN

تاريخ السريان: 17 مايو 2026
مالك الخدمة: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (أنقرة، تركيا)
جهة اتصال الخصوصية: private@raqoon.app

1. ملخص

صُمم Raqoon VPN لحماية اتصالك وتعزيز الخصوصية عند استخدام الإنترنت. لا يجمع التطبيق نشاط التصفح أو استعلامات DNS أو محتوى حركة VPN ولا يفحصها.

لتشغيل الخدمة نعالج معلومات تقنية محدودة فقط، بما في ذلك:
- معرّف جهاز مجهول يُنشأ عشوائياً؛
- معرّف عميل مجهول يُنشأ عشوائياً؛
- معلومات منطقة App Store؛
- تأكيد أن عمرك 18 عاماً على الأقل؛
- تشخيصات تقنية أساسية متعلقة باستقرار الاتصال؛
- حالة الاشتراك وحجم الحركة اللازم لحدود خطتك.

لا نطلب اسمك أو رقم هاتفك أو بريدك الإلكتروني لاستخدام VPN. لا نستخدم بيانات VPN للتحليلات أو الإعلانات أو التنميط أو تتبع المستخدمين. لا نبيع بيانات المستخدمين لشبكات الإعلان.

2. ماذا تعني سياسة عدم الاحتفاظ بالسجلات (No-Logs)

لا نسجل ولا نخزن:
- سجل المواقع وعناوين URL التي تزورها؛
- استعلامات البحث؛
- استعلامات DNS؛
- محتوى الحركة بما في ذلك الرسائل والبريد والملفات وغيرها من البيانات المنقولة؛
- سجل نشاطك على الشبكة؛
- عنوان IP المصدر كجزء من سجل النشاط.

لا نربط نشاطك على الشبكة بحسابك أو جهازك أو بيانات الدفع لأغراض التنميط.

قد تُعالج بعض البيانات التقنية مؤقتاً بواسطة معدات الشبكة أثناء إنشاء اتصال VPN أو صيانته. ذلك ضروري لنقل الحركة المشفرة وتشغيل الخدمة. لا نستخدمها لبناء سجل تصفح أو تحليل محتوى الحركة أو تنميط المستخدمين.

3. البيانات التي نجمعها في التطبيق

3.1. المعرّفات والأهلية
- معرّف جهاز مجهول يُنشأ عشوائياً (لتفويض الجهاز وحدود الأجهزة)؛
- معرّف عميل مجهول يُنشأ عشوائياً (لإدارة جلسة العميل)؛
- منطقة App Store (للتوفر الإقليمي وقواعد المتجر)؛
- تأكيد أن عمرك 18 عاماً فأكثر.

3.2. تشغيل الخدمة والتشخيص
- حالة الاشتراك وحدود الخطة؛
- حجم البيانات المنقولة (لتطبيق خطتك، دون معرفة ما وصلت إليه)؛
- وقت آخر اتصال وحالة الاتصال؛
- تشخيصات تقنية أساسية للاستقرار والأخطاء (دون سجل تصفح أو استعلامات DNS أو محتوى حركة).

3.3. الاشتراكات ومتاجر التطبيقات
عند الاشتراك عبر Apple App Store أو Google Play أو Huawei AppGallery، يعالج المتجر الدفع. نتلقى فقط بيانات تقنية محدودة للتحقق من حالة الاشتراك (مثل بيانات الإيصال أو الرمز). لا نخزن بيانات بطاقة الدفع الكاملة.

3.4. الدعم (فقط عند التواصل معنا)
إذا كتبت إلى الدعم أو استخدمت بوابة الدعم، نعالج بيانات الاتصال والمحتوى الذي تقدمه طوعاً. ذلك منفصل عن تسجيل جلسة VPN.

4. أغراض المعالجة

نستخدم البيانات أعلاه حصرياً من أجل:
- تشغيل VPN وصيانته؛
- تطبيق قيود التوفر الإقليمي؛
- إدارة الاشتراكات والوصول إلى الأجهزة؛
- تحسين موثوقية الاتصال وحل المشكلات التقنية؛
- الامتثال لمتطلبات العمر المتعلقة بالخدمة.

5. أين تُعالج البيانات (البنية التحتية)

توزع بنيتنا التحتية كالتالي:

الولايات المتحدة:
- أنظمة الخلفية الرئيسية (معرّفات الحساب، بيانات الاشتراك، منطقة App Store، تأكيد العمر، تشخيص الاتصال الموضح في هذه السياسة)؛
- خوادم بوابة دعم العملاء (البيانات التي ترسلها عند التواصل مع الدعم).

سويسرا:
- موازنة الحمل لاتصالات VPN؛
- خوادم VPN التي توفر اتصال VPN المشفر.

تمر الحركة المشفرة عبر بنية VPN وموازنة الحمل لدينا في سويسرا. لا نحتفظ بسجلات للمواقع التي تزورها أو استعلامات DNS أو محتوى الحركة.

قد تُنقل بيانات خدمة تقنية محدودة بين الولايات المتحدة وسويسرا فقط بالقدر اللازم لتشغيل الخدمة، مع ضمانات تقنية وتنظيمية مناسبة.

6. أطراف ثالثة

لا نشارك حركة VPN أو نشاط التصفح أو استعلامات DNS أو محتوى الحركة مع أطراف ثالثة لأغراض التحليلات أو الإعلانات أو التنميط أو التتبع.

يعالج مشغلو المتاجر (Apple وGoogle وHuawei) المشتريات بشروطهم وسياسات الخصوصية الخاصة بهم. نتلقى فقط بيانات التحقق التقنية من الاشتراك الموضحة أعلاه.

يستضيف مزودو البنية التحتية الخوادم والشبكات؛ لا نزودهم بسجلات نشاط المستخدم أو سجل التصفح أو استعلامات DNS أو محتوى الحركة. يشاركون تقنياً في نقل الحركة المشفرة كما يتطلب عمل VPN.

7. عدم التتبع في تطبيق Raqoon

لا تستخدم تطبيقاتنا للجوال حزم SDK تسويقية أو تحليلية من أطراف ثالثة لتتبع استخدام VPN. قد تعالج Apple أو Google أو Huawei تقارير الأعطال أو التشخيص وفق قواعد المنصة وإعدادات جهازك؛ ولا تُستخدم لتحليل نشاط التصفح عبر VPN أو محتوى الحركة.

8. الموقع (raqoon.app) وملفات تعريف الارتباط والتحليلات

على raqoon.app قد نستخدم ملفات تعريف الارتباط وتقنيات مماثلة لتشغيل الموقع والتفضيلات والتحليلات على الويب.

قد يستخدم الموقع Google Analytics لفهم الحركة العامة وأداء الصفحات. تحليلات الموقع منفصلة عن تطبيق VPN ولا تُستخدم لتحليل حركة VPN أو استعلامات DNS أو سجل التصفح داخل جلسة VPN.

إذا ظهر شريط موافقة على ملفات تعريف الارتباط، يمكنك قبول أو رفض ملفات غير الأساسية.

9. الاحتفاظ والحذف

تُحفظ البيانات التقنية طوال مدة اشتراكك النشط وبالقدر اللازم لتشغيل الخدمة. عند عدم التجديد، قد تُحذف بيانات الحساب بعد فترة عدم نشاط.

يمكنك حذف حسابك والبيانات المرتبطة من إعدادات تطبيق Raqoon. بعد الحذف نوقف الوصول ونحذف أو نُجهّل البيانات غير اللازمة.

قد تُحفظ بعض السجلات لفترة محدودة عندما يقتضي القانون أو التحقق من الفوترة أو منع الاحتيال أو تسوية النزاعات ذلك.

10. طلبات الجهات الحكومية

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. مسجلة في تركيا. عند تلقي طلب قانوني من سلطة مختصة، نقيّمه وفق القانون المعمول به.

لأننا لا نحتفظ بسجلات النشاط، لا يمكننا تقديم سجل التصفح أو استعلامات DNS أو محتوى الحركة. قد نتمكن فقط من تأكيد معلومات محدودة مثل وجود الحساب أو حالة الاشتراك أو البيانات التقنية الموضحة في هذه السياسة.

11. شرط العمر

الخدمة غير موجهة لمن دون 18 عاماً. نستخدم تأكيد العمر داخل التطبيق لفرض هذا الشرط.

12. الأمان

نطبق تدابير تقنية وتنظيمية تشمل ضوابط الوصول والتشفير أثناء النقل وتقليل البيانات.

13. حقوقك

يمكنك طلب معلومات عن البيانات المرتبطة بحسابك، وحذف حسابك في التطبيق، والتواصل معنا بشأن الخصوصية، ورفض ملفات تعريف الارتباط غير الأساسية على الموقع عند توفر ذلك.

الخصوصية: private@raqoon.app

14. توزيع التطبيق

عند تثبيت Raqoon VPN من Apple App Store أو Google Play أو Huawei AppGallery، يعالج مشغل المتجر المشتريات وبعض المعرّفات وفق سياساته. يخضع استخدامك للمتجر لقواعد ذلك المشغل.

15. تغييرات هذه السياسة

قد نحدّث هذه السياسة عند تغيّر الخدمة أو البنية التحتية أو المتطلبات القانونية. يُحدَّث تاريخ السريان في الأعلى عند نشر نسخة جديدة.

16. جهات الاتصال

- الخصوصية وحذف البيانات: private@raqoon.app
- الدعم: help@raqoon.app
- الشركة: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti.، أنقرة، تركيا`,

  "pt-BR": `Política de Privacidade Raqoon VPN

Data de vigência: 17 de maio de 2026
Proprietário do serviço: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ancara, Türkiye)
Contato de privacidade: private@raqoon.app

1. Resumo

O Raqoon VPN foi projetado para proteger sua conexão e melhorar a privacidade na internet. O aplicativo não coleta nem inspeciona atividade de navegação, consultas DNS ou conteúdo do tráfego VPN.

Para operar o serviço, processamos apenas informações técnicas limitadas, incluindo:
- identificador anônimo de dispositivo gerado aleatoriamente;
- identificador anônimo de cliente gerado aleatoriamente;
- informações da região da App Store;
- confirmação de que você tem pelo menos 18 anos;
- diagnósticos técnicos básicos relacionados à estabilidade da conexão;
- status da assinatura e volume de tráfego necessários aos limites do seu plano.

Não exigimos nome, telefone ou e-mail para usar a VPN. Não usamos dados da VPN para análise, publicidade, criação de perfis ou rastreamento de usuários. Não vendemos dados de usuários a redes de anúncios.

2. O que significa nossa política No-Logs

Não registramos nem armazenamos:
- histórico de sites e URLs visitados;
- consultas de pesquisa;
- consultas DNS;
- conteúdo do tráfego, incluindo mensagens, e-mails, arquivos e outros dados transmitidos;
- histórico da sua atividade de rede;
- seu endereço IP de origem como parte de um histórico de atividade.

Não vinculamos sua atividade de rede à conta, dispositivo ou dados de pagamento para criação de perfis.

Alguns dados técnicos podem ser processados temporariamente por equipamentos de rede durante o estabelecimento ou manutenção de uma conexão VPN. Isso é necessário para transportar tráfego criptografado e operar o serviço. Não os usamos para construir histórico de navegação, analisar conteúdo do tráfego ou criar perfis de usuários.

3. Dados que coletamos no aplicativo

3.1. Identificadores e elegibilidade
- identificador anônimo de dispositivo gerado aleatoriamente (autorização do dispositivo e limites de dispositivos);
- identificador anônimo de cliente gerado aleatoriamente (sessão do cliente);
- região da App Store (disponibilidade regional e regras da loja);
- confirmação de que você tem 18 anos ou mais.

3.2. Operação do serviço e diagnósticos
- status da assinatura e limites do plano;
- volume de dados transferidos (para aplicar seu plano, sem ver o que você acessou);
- hora da última conexão e status da conexão;
- diagnósticos técnicos básicos de estabilidade e erros (sem histórico de navegação, consultas DNS ou conteúdo do tráfego).

3.3. Assinaturas e lojas de aplicativos
Se você assina pela Apple App Store, Google Play ou Huawei AppGallery, a loja processa o pagamento. Recebemos apenas dados técnicos limitados para validar o status da assinatura (por exemplo, recibo ou token). Não armazenamos dados completos do cartão.

3.4. Suporte (somente se você nos contatar)
Se você escrever ao suporte ou usar o portal de suporte, processamos os dados de contato e o conteúdo que você fornecer voluntariamente. Isso é separado do registro de sessão VPN.

4. Finalidades do tratamento

Usamos os dados acima exclusivamente para:
- operar e manter o serviço VPN;
- aplicar restrições de disponibilidade regional;
- gerenciar assinaturas e acesso a dispositivos;
- melhorar a confiabilidade da conexão e solucionar problemas técnicos;
- garantir conformidade com requisitos etários do serviço.

5. Onde os dados são processados (infraestrutura)

Nossa infraestrutura está distribuída da seguinte forma:

Estados Unidos:
- sistemas de backend principais (identificadores de conta, dados de assinatura, região da App Store, confirmação de idade, diagnósticos de conexão descritos nesta Política);
- servidores do portal de suporte ao cliente (dados enviados ao contatar o suporte).

Suíça:
- balanceamento de carga para conexões VPN;
- servidores VPN que fornecem sua conexão VPN criptografada.

O tráfego VPN criptografado passa por nossa infraestrutura VPN e de balanceamento na Suíça. Não mantemos registros de sites visitados, consultas DNS ou conteúdo do tráfego.

Dados técnicos limitados do serviço podem ser transferidos entre Estados Unidos e Suíça apenas na medida necessária para operar o serviço, com salvaguardas técnicas e organizacionais adequadas.

6. Terceiros

Não compartilhamos tráfego VPN, atividade de navegação, consultas DNS ou conteúdo do tráfego com terceiros para análise, publicidade, criação de perfis ou rastreamento.

Operadores de lojas (Apple, Google, Huawei) processam compras sob seus próprios termos e políticas de privacidade. Recebemos apenas os dados técnicos de validação de assinatura descritos acima.

Provedores de infraestrutura hospedam servidores e redes; não lhes fornecemos registros de atividade, histórico de navegação, consultas DNS ou conteúdo do tráfego. Participam tecnicamente do transporte de tráfego criptografado conforme necessário para uma VPN.

7. Sem rastreamento no aplicativo Raqoon

Nossos aplicativos móveis não usam SDKs de marketing ou análise de produto de terceiros para rastrear o uso da VPN. Relatórios de falha ou diagnóstico podem ser processados pela Apple, Google ou Huawei conforme regras da plataforma e configurações do dispositivo; não são usados para analisar atividade de navegação VPN ou conteúdo do tráfego.

8. Site (raqoon.app), cookies e análises

Em raqoon.app podemos usar cookies e tecnologias semelhantes para operação básica do site, preferências e análise web.

O site pode usar Google Analytics para entender o tráfego geral e o desempenho das páginas. A análise web é separada do aplicativo VPN e não é usada para analisar tráfego VPN, consultas DNS ou histórico de navegação em uma sessão VPN.

Se um banner de consentimento de cookies for exibido, você pode aceitar ou recusar cookies não essenciais.

9. Retenção e exclusão

Dados técnicos são mantidos enquanto sua assinatura estiver ativa e conforme necessário para operar o serviço. Se você não renovar, os dados da conta podem ser excluídos após um período de inatividade.

Você pode excluir sua conta e dados relacionados nas configurações do aplicativo Raqoon. Após a exclusão, interrompemos o acesso e excluímos ou anonimizamos dados que não são mais necessários.

Alguns registros podem ser mantidos por tempo limitado quando exigido por lei, verificação de cobrança, prevenção de fraude ou resolução de disputas.

10. Solicitações de autoridades

A Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. está registrada na Türkiye. Se recebermos uma solicitação legal de autoridade competente, avaliamos conforme a lei aplicável.

Como não mantemos registros de atividade, não podemos fornecer histórico de navegação, consultas DNS ou conteúdo do tráfego. Podemos apenas confirmar informações limitadas, como existência da conta, status da assinatura ou os dados técnicos descritos nesta Política.

11. Requisito de idade

O Serviço não se destina a menores de 18 anos. Usamos a confirmação de idade no aplicativo para aplicar esse requisito.

12. Segurança

Aplicamos medidas técnicas e organizacionais, incluindo controles de acesso, criptografia em trânsito e minimização de dados.

13. Seus direitos

Você pode solicitar informações sobre dados vinculados à sua conta, excluir sua conta no aplicativo, entrar em contato sobre privacidade e recusar cookies não essenciais no site quando disponível.

Privacidade: private@raqoon.app

14. Distribuição do aplicativo

Ao instalar o Raqoon VPN pela Apple App Store, Google Play ou Huawei AppGallery, o operador da loja processa compras e certos identificadores sob suas políticas. O uso da loja é regido pelas regras desse operador.

15. Alterações desta Política

Podemos atualizar esta Política quando o serviço, a infraestrutura ou requisitos legais mudarem. A data de vigência no topo será atualizada ao publicarmos uma nova versão.

16. Contatos

- Privacidade e exclusão de dados: private@raqoon.app
- Suporte: help@raqoon.app
- Empresa: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ancara, Türkiye`,

  id: `Kebijakan Privasi Raqoon VPN

Tanggal berlaku: 17 Mei 2026
Pemilik layanan: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ankara, Türkiye)
Kontak privasi: private@raqoon.app

1. Ringkasan

Raqoon VPN dirancang untuk melindungi koneksi Anda dan meningkatkan privasi saat menggunakan internet. Aplikasi tidak mengumpulkan atau memeriksa aktivitas penjelajahan, kueri DNS, atau isi lalu lintas VPN.

Untuk mengoperasikan layanan, kami hanya memproses informasi teknis terbatas, termasuk:
- pengenal perangkat anonim yang dibuat secara acak;
- pengenal klien anonim yang dibuat secara acak;
- informasi wilayah App Store;
- konfirmasi bahwa Anda berusia minimal 18 tahun;
- diagnostik teknis dasar terkait stabilitas koneksi;
- status langganan dan volume lalu lintas untuk batas paket Anda.

Kami tidak memerlukan nama, nomor telepon, atau email untuk menggunakan VPN. Kami tidak menggunakan data VPN untuk analitik, iklan, pemprofilan, atau pelacakan pengguna. Kami tidak menjual data pengguna ke jaringan iklan.

2. Arti kebijakan No-Logs kami

Kami tidak mencatat atau menyimpan:
- riwayat situs dan URL yang dikunjungi;
- kueri pencarian;
- kueri DNS;
- isi lalu lintas termasuk pesan, email, file, dan data lain yang ditransmisikan;
- riwayat aktivitas jaringan Anda;
- alamat IP sumber Anda sebagai bagian riwayat aktivitas.

Kami tidak menghubungkan aktivitas jaringan Anda dengan akun, perangkat, atau data pembayaran untuk pemprofilan.

Beberapa data teknis dapat diproses sementara oleh peralatan jaringan saat koneksi VPN dibuat atau dipertahankan. Ini diperlukan untuk mengangkut lalu lintas terenkripsi dan menjalankan layanan. Kami tidak menggunakannya untuk membangun riwayat penjelajahan, menganalisis isi lalu lintas, atau memprofilkan pengguna.

3. Data yang kami kumpulkan di aplikasi

3.1. Pengenal dan kelayakan
- pengenal perangkat anonim yang dibuat secara acak (otorisasi perangkat dan batas perangkat);
- pengenal klien anonim yang dibuat secara acak (sesi klien);
- wilayah App Store (ketersediaan regional dan aturan toko);
- konfirmasi bahwa Anda berusia 18 tahun atau lebih.

3.2. Operasi layanan dan diagnostik
- status langganan dan batas paket;
- volume data yang ditransfer (untuk menerapkan paket, bukan melihat apa yang Anda akses);
- waktu koneksi terakhir dan status koneksi;
- diagnostik teknis dasar stabilitas dan kesalahan (tanpa riwayat penjelajahan, kueri DNS, atau isi lalu lintas).

3.3. Langganan dan toko aplikasi
Jika Anda berlangganan melalui Apple App Store, Google Play, atau Huawei AppGallery, toko memproses pembayaran. Kami hanya menerima data teknis terbatas untuk memvalidasi status langganan (misalnya tanda terima atau token). Kami tidak menyimpan data kartu pembayaran lengkap.

3.4. Dukungan (hanya jika Anda menghubungi kami)
Jika Anda menulis ke dukungan atau menggunakan portal dukungan, kami memproses detail kontak dan konten yang Anda berikan secara sukarela. Ini terpisah dari pencatatan sesi VPN.

4. Tujuan pemrosesan

Kami menggunakan data di atas semata-mata untuk:
- mengoperasikan dan memelihara layanan VPN;
- menerapkan pembatasan ketersediaan regional;
- mengelola langganan dan akses perangkat;
- meningkatkan keandalan koneksi dan memecahkan masalah teknis;
- memastikan kepatuhan terhadap persyaratan usia layanan.

5. Di mana data diproses (infrastruktur)

Infrastruktur kami didistribusikan sebagai berikut:

Amerika Serikat:
- sistem backend utama (pengenal akun, data langganan, wilayah App Store, konfirmasi usia, diagnostik koneksi yang dijelaskan dalam Kebijakan ini);
- server portal dukungan pelanggan (data yang Anda kirim saat menghubungi dukungan).

Swiss:
- penyeimbangan beban untuk koneksi VPN;
- server VPN yang menyediakan koneksi VPN terenkripsi Anda.

Lalu lintas VPN terenkripsi melewati infrastruktur VPN dan penyeimbangan beban kami di Swiss. Kami tidak menyimpan log situs yang Anda kunjungi, kueri DNS, atau isi lalu lintas.

Data layanan teknis terbatas dapat ditransfer antara Amerika Serikat dan Swiss hanya sejauh diperlukan untuk mengoperasikan layanan, dengan perlindungan teknis dan organisasi yang sesuai.

6. Pihak ketiga

Kami tidak membagikan lalu lintas VPN, aktivitas penjelajahan, kueri DNS, atau isi lalu lintas kepada pihak ketiga untuk analitik, iklan, pemprofilan, atau pelacakan.

Operator toko aplikasi (Apple, Google, Huawei) memproses pembelian menurut ketentuan dan kebijakan privasi mereka sendiri. Kami hanya menerima data validasi langganan teknis yang dijelaskan di atas.

Penyedia infrastruktur menghosting server dan jaringan; kami tidak memberikan log aktivitas, riwayat penjelajahan, kueri DNS, atau isi lalu lintas kepada mereka. Mereka secara teknis berpartisipasi dalam mengangkut lalu lintas terenkripsi sebagaimana diperlukan untuk VPN.

7. Tanpa pelacakan di aplikasi Raqoon

Aplikasi seluler kami tidak menggunakan SDK pemasaran atau analitik produk pihak ketiga untuk melacak penggunaan VPN. Laporan kerusakan atau diagnostik dapat diproses oleh Apple, Google, atau Huawei menurut aturan platform dan pengaturan perangkat Anda; laporan tersebut tidak digunakan untuk menganalisis aktivitas penjelajahan VPN atau isi lalu lintas.

8. Situs web (raqoon.app), cookie, dan analitik

Di raqoon.app kami dapat menggunakan cookie dan teknologi serupa untuk operasi dasar situs, preferensi, dan analitik web.

Situs dapat menggunakan Google Analytics untuk memahami lalu lintas keseluruhan dan kinerja halaman. Analitik web terpisah dari aplikasi VPN dan tidak digunakan untuk menganalisis lalu lintas VPN, kueri DNS, atau riwayat penjelajahan dalam sesi VPN.

Jika banner persetujuan cookie ditampilkan, Anda dapat menerima atau menolak cookie non-esensial.

9. Retensi dan penghapusan

Data teknis disimpan selama langganan Anda aktif dan sejauh diperlukan untuk mengoperasikan layanan. Jika Anda tidak memperpanjang, data akun dapat dihapus setelah periode tidak aktif.

Anda dapat menghapus akun dan data terkait di pengaturan aplikasi Raqoon. Setelah penghapusan kami menghentikan akses dan menghapus atau menganonimkan data yang tidak lagi diperlukan.

Beberapa catatan dapat disimpan untuk waktu terbatas jika diwajibkan oleh hukum, verifikasi penagihan, pencegahan penipuan, atau penyelesaian sengketa.

10. Permintaan pemerintah dan otoritas

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. terdaftar di Türkiye. Jika kami menerima permintaan sah dari otoritas yang berwenang, kami menilainya menurut hukum yang berlaku.

Karena kami tidak menyimpan log aktivitas, kami tidak dapat memberikan riwayat penjelajahan, kueri DNS, atau isi lalu lintas. Kami hanya dapat mengonfirmasi informasi terbatas seperti keberadaan akun, status langganan, atau data teknis yang dijelaskan dalam Kebijakan ini.

11. Persyaratan usia

Layanan tidak ditujukan untuk individu di bawah 18 tahun. Kami menggunakan konfirmasi usia dalam aplikasi untuk menegakkan persyaratan ini.

12. Keamanan

Kami menerapkan langkah teknis dan organisasi termasuk kontrol akses, enkripsi dalam transit, dan minimalisasi data.

13. Hak Anda

Anda dapat meminta informasi tentang data yang terkait dengan akun Anda, menghapus akun di aplikasi, menghubungi kami tentang privasi, dan menolak cookie non-esensial di situs web jika tersedia.

Privasi: private@raqoon.app

14. Distribusi aplikasi

Saat Anda menginstal Raqoon VPN dari Apple App Store, Google Play, atau Huawei AppGallery, operator toko memproses pembelian dan pengenal tertentu menurut kebijakannya sendiri. Penggunaan toko Anda diatur oleh aturan operator tersebut.

15. Perubahan Kebijakan ini

Kami dapat memperbarui Kebijakan ini ketika layanan, infrastruktur, atau persyaratan hukum berubah. Tanggal berlaku di atas akan diperbarui saat kami menerbitkan versi baru.

16. Kontak

- Privasi dan penghapusan data: private@raqoon.app
- Dukungan: help@raqoon.app
- Perusahaan: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ankara, Türkiye`,

  th: `นโยบายความเป็นส่วนตัว Raqoon VPN

มีผลบังคับใช้: 17 พฤษภาคม 2026
เจ้าของบริการ: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (อังการา ประเทศตุรกี)
ติดต่อเรื่องความเป็นส่วนตัว: private@raqoon.app

1. สรุป

Raqoon VPN ออกแบบมาเพื่อปกป้องการเชื่อมต่อและเพิ่มความเป็นส่วนตัวเมื่อใช้อินเทอร์เน็ต แอปไม่เก็บหรือตรวจสอบกิจกรรมการท่องเว็บ คำขอ DNS หรือเนื้อหาทราฟฟิก VPN

เพื่อให้บริการ เราประมวลผลเฉพาะข้อมูลทางเทคนิคจำกัด รวมถึง:
- ตัวระบุอุปกรณ์นิรนามที่สร้างแบบสุ่ม;
- ตัวระบุไคลเอนต์นิรนามที่สร้างแบบสุ่ม;
- ข้อมูลภูมิภาค App Store;
- การยืนยันว่าคุณมีอายุอย่างน้อย 18 ปี;
- การวินิจฉัยทางเทคนิคพื้นฐานเกี่ยวกับความเสถียรของการเชื่อมต่อ;
- สถานะการสมัครสมาชิกและปริมาณทราฟฟิกสำหรับขีดจำกัดแพ็กเกจ

เราไม่ต้องการชื่อ หมายเลขโทรศัพท์ หรืออีเมลเพื่อใช้ VPN เราไม่ใช้ข้อมูล VPN สำหรับการวิเคราะห์ โฆษณา การสร้างโปรไฟล์ หรือการติดตามผู้ใช้ เราไม่ขายข้อมูลผู้ใช้ให้เครือข่ายโฆษณา

2. นโยบาย No-Logs หมายถึงอะไร

เราไม่บันทึกหรือเก็บ:
- ประวัติเว็บไซต์และ URL ที่เยี่ยมชม;
- คำค้นหา;
- คำขอ DNS;
- เนื้อหาทราฟฟิก รวมข้อความ อีเมล ไฟล์ และข้อมูลที่ส่งอื่น ๆ;
- ประวัติกิจกรรมเครือข่ายของคุณ;
- ที่อยู่ IP ต้นทางเป็นส่วนหนึ่งของประวัติกิจกรรม

เราไม่เชื่อมโยงกิจกรรมเครือข่ายกับบัญชี อุปกรณ์ หรือข้อมูลการชำระเงินเพื่อสร้างโปรไฟล์

ข้อมูลทางเทคนิคบางส่วนอาจถูกประมวลผลชั่วคราวโดยอุปกรณ์เครือข่ายขณะสร้างหรือรักษาการเชื่อมต่อ VPN ซึ่งจำเป็นสำหรับส่งทราฟฟิกที่เข้ารหัสและให้บริการ เราไม่ใช้เพื่อสร้างประวัติการท่องเว็บ วิเคราะห์เนื้อหาทราฟฟิก หรือสร้างโปรไฟล์ผู้ใช้

3. ข้อมูลที่เราเก็บในแอป

3.1. ตัวระบุและคุณสมบัติ
- ตัวระบุอุปกรณ์นิรนามที่สร้างแบบสุ่ม (อนุญาตอุปกรณ์และจำกัดจำนวนอุปกรณ์);
- ตัวระบุไคลเอนต์นิรนามที่สร้างแบบสุ่ม (เซสชันไคลเอนต์);
- ภูมิภาค App Store (ความพร้อมใช้งานตามภูมิภาคและกฎของสโตร์);
- การยืนยันว่าคุณมีอายุ 18 ปีขึ้นไป

3.2. การให้บริการและการวินิจฉัย
- สถานะการสมัครสมาชิกและขีดจำกัดแพ็กเกจ;
- ปริมาณข้อมูลที่ถ่ายโอน (เพื่อบังคับใช้แพ็กเกจ ไม่ใช่เพื่อดูว่าคุณเข้าถึงอะไร);
- เวลาเชื่อมต่อล่าสุดและสถานะการเชื่อมต่อ;
- การวินิจฉัยทางเทคนิคพื้นฐานเรื่องความเสถียรและข้อผิดพลาด (ไม่มีประวัติการท่องเว็บ คำขอ DNS หรือเนื้อหาทราฟฟิก)

3.3. การสมัครสมาชิกและสโตร์แอป
หากสมัครผ่าน Apple App Store Google Play หรือ Huawei AppGallery สโตร์จะประมวลผลการชำระเงิน เราได้รับเฉพาะข้อมูลทางเทคนิคจำกัดเพื่อตรวจสอบสถานะการสมัครสมาชิก (เช่น ใบเสร็จหรือโทเค็น) เราไม่เก็บข้อมูลบัตรเต็มรูปแบบ

3.4. การสนับสนุน (เมื่อคุณติดต่อเราเท่านั้น)
หากคุณเขียนถึงฝ่ายสนับสนุนหรือใช้พอร์ทัลสนับสนุน เราประมวลผลข้อมูลติดต่อและเนื้อหาที่คุณให้โดยสมัครใจ แยกจากการบันทึกเซสชัน VPN

4. วัตถุประสงค์การประมวลผล

เราใช้ข้อมูลข้างต้นเพื่อ:
- ให้บริการและบำรุงรักษา VPN;
- ใช้ข้อจำกัดความพร้อมใช้งานตามภูมิภาค;
- จัดการการสมัครสมาชิกและการเข้าถึงอุปกรณ์;
- ปรับปรุงความน่าเชื่อถือของการเชื่อมต่อและแก้ปัญหาทางเทคนิค;
- ปฏิบัติตามข้อกำหนดด้านอายุของบริการ

5. สถานที่ประมวลผลข้อมูล (โครงสร้างพื้นฐาน)

โครงสร้างพื้นฐานของเรากระจายดังนี้:

สหรัฐอเมริกา:
- ระบบแบ็กเอนด์หลัก (ตัวระบุบัญชี ข้อมูลการสมัครสมาชิก ภูมิภาค App Store การยืนยันอายุ การวินิจฉัยการเชื่อมต่อตามนโยบายนี้);
- เซิร์ฟเวอร์พอร์ทัลสนับสนุนลูกค้า (ข้อมูลที่คุณส่งเมื่อติดต่อฝ่ายสนับสนุน)

สวิตเซอร์แลนด์:
- การกระจายโหลดสำหรับการเชื่อมต่อ VPN;
- เซิร์ฟเวอร์ VPN ที่ให้การเชื่อมต่อ VPN ที่เข้ารหัส

ทราฟฟิก VPN ที่เข้ารหัสผ่านโครงสร้าง VPN และการกระจายโหลดในสวิตเซอร์แลนด์ เราไม่เก็บบันทึกเว็บไซต์ที่เยี่ยมชม คำขอ DNS หรือเนื้อหาทราฟฟิก

ข้อมูลบริการทางเทคนิคจำกัดอาจถ่ายโอนระหว่างสหรัฐอเมริกาและสวิตเซอร์แลนด์เท่าที่จำเป็นเพื่อให้บริการ พร้อมมาตรการคุ้มครองทางเทคนิคและองค์กรที่เหมาะสม

6. บุคคลที่สาม

เราไม่แบ่งปันทราฟฟิก VPN กิจกรรมการท่องเว็บ คำขอ DNS หรือเนื้อหาทราฟฟิกกับบุคคลที่สามเพื่อการวิเคราะห์ โฆษณา การสร้างโปรไฟล์ หรือการติดตาม

ผู้ให้บริการสโตร์ (Apple Google Huawei) ประมวลผลการซื้อตามเงื่อนไขและนโยบายความเป็นส่วนตัวของตน เราได้รับเฉพาะข้อมูลตรวจสอบการสมัครสมาชิกทางเทคนิคตามที่ระบุข้างต้น

ผู้ให้บริการโครงสร้างพื้นฐานโฮสต์เซิร์ฟเวอร์และเครือข่าย เราไม่ให้บันทึกกิจกรรม ประวัติการท่องเว็บ คำขอ DNS หรือเนื้อหาทราฟฟิก แต่มีส่วนร่วมทางเทคนิคในการส่งทราฟฟิกที่เข้ารหัสตามที่ VPN ต้องการ

7. ไม่มีการติดตามในแอป Raqoon

แอปมือถือของเราไม่ใช้ SDK การตลาดหรือการวิเคราะห์ผลิตภัณฑ์ของบุคคลที่สามเพื่อติดตามการใช้ VPN รายงานข้อขัดข้องหรือการวินิจฉัยอาจถูกประมวลผลโดย Apple Google หรือ Huawei ตามกฎแพลตฟอร์มและการตั้งค่าอุปกรณ์ ไม่ใช้เพื่อวิเคราะห์กิจกรรมท่องเว็บ VPN หรือเนื้อหาทราฟฟิก

8. เว็บไซต์ (raqoon.app) คุกกี้ และการวิเคราะห์

บน raqoon.app เราอาจใช้คุกกี้และเทคโนโลยีที่คล้ายกันสำหรับการทำงานพื้นฐานของไซต์ การตั้งค่า และการวิเคราะห์เว็บ

ไซต์อาจใช้ Google Analytics เพื่อเข้าใจทราฟฟิกโดยรวมและประสิทธิภาพหน้า การวิเคราะห์เว็บแยกจากแอป VPN และไม่ใช้วิเคราะห์ทราฟฟิก VPN คำขอ DNS หรือประวัติการท่องเว็บในเซสชัน VPN

หากมีแบนเนอร์ยินยอมคุกกี้ คุณสามารถยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็น

9. การเก็บรักษาและการลบ

ข้อมูลทางเทคนิคเก็บไว้ระหว่างการสมัครสมาชิกที่ใช้งานและตามที่จำเป็นเพื่อให้บริการ หากไม่ต่ออายุ ข้อมูลบัญชีอาจถูกลบหลังช่วงไม่ใช้งาน

คุณสามารถลบบัญชีและข้อมูลที่เกี่ยวข้องในการตั้งค่าแอป Raqoon หลังลบเราจะหยุดให้การเข้าถึงและลบหรือทำให้ข้อมูลที่ไม่จำเป็นเป็นนิรนาม

บันทึกบางส่วนอาจเก็บไว้ช่วงเวลาจำกัดเมื่อกฎหมาย การตรวจสอบการเรียกเก็บเงิน การป้องกันการฉ้อโกง หรือการระงับข้อพิพาทกำหนด

10. คำขอจากหน่วยงานรัฐ

Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. จดทะเบียนในตุรกี หากได้รับคำขอที่ชอบด้วยกฎหมายจากหน่วยงานที่มีอำนาจ เราประเมินตามกฎหมายที่ใช้บังคับ

เนื่องจากเราไม่เก็บบันทึกกิจกรรม เราไม่สามารถให้ประวัติการท่องเว็บ คำขอ DNS หรือเนื้อหาทราฟฟิก เราอาจยืนยันเฉพาะข้อมูลจำกัด เช่น มีบัญชีหรือไม่ สถานะการสมัครสมาชิก หรือข้อมูลทางเทคนิคตามนโยบายนี้

11. ข้อกำหนดด้านอายุ

บริการไม่มุ่งเป้าหมายผู้ที่มีอายุต่ำกว่า 18 ปี เราใช้การยืนยันอายุในแอปเพื่อบังคับใช้ข้อกำหนดนี้

12. ความปลอดภัย

เราใช้มาตรการทางเทคนิคและองค์กร รวมการควบคุมการเข้าถึง การเข้ารหัสระหว่างส่ง และการลดข้อมูลให้น้อยที่สุด

13. สิทธิของคุณ

คุณสามารถขอข้อมูลเกี่ยวกับข้อมูลที่เชื่อมกับบัญชี ลบบัญชีในแอป ติดต่อเรื่องความเป็นส่วนตัว และปฏิเสธคุกกี้ที่ไม่จำเป็นบนเว็บไซต์เมื่อมีให้

ความเป็นส่วนตัว: private@raqoon.app

14. การจำหน่ายแอป

เมื่อติดตั้ง Raqoon VPN จาก Apple App Store Google Play หรือ Huawei AppGallery ผู้ให้บริการสโตร์ประมวลผลการซื้อและตัวระบุบางอย่างตามนโยบายของตน การใช้สโตร์ของคุณอยู่ภายใต้กฎของผู้ให้บริการนั้น

15. การเปลี่ยนแปลงนโยบายนี้

เราอาจอัปเดตนโยบายนี้เมื่อบริการ โครงสร้างพื้นฐาน หรือข้อกำหนดทางกฎหมายเปลี่ยนแปลง วันที่มีผลด้านบนจะอัปเดตเมื่อเผยแพร่เวอร์ชันใหม่

16. การติดต่อ

- ความเป็นส่วนตัวและการลบข้อมูล: private@raqoon.app
- การสนับสนุน: help@raqoon.app
- บริษัท: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. อังการา ประเทศตุรกี`,

  tl: `Patakaran sa Privacy ng Raqoon VPN

Petsa ng bisa: 17 Mayo 2026
May-ari ng serbisyo: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. (Ankara, Türkiye)
Contact sa privacy: private@raqoon.app

1. Buod

Idinisenyo ang Raqoon VPN upang protektahan ang iyong koneksyon at palakasin ang privacy sa internet. Hindi kinokolekta o sinusuri ng app ang aktibidad sa pag-browse, mga DNS query, o nilalaman ng VPN traffic.

Upang patakbuhin ang serbisyo, pinoproseso lamang namin ang limitadong teknikal na impormasyon, kabilang ang:
- random na nabuo na anonymous device identifier;
- random na nabuo na anonymous client identifier;
- impormasyon sa rehiyon ng App Store;
- kumpirmasyon na ikaw ay hindi bababa sa 18 taong gulang;
- pangunahing teknikal na diagnostic na may kaugnayan sa katatagan ng koneksyon;
- status ng subscription at dami ng traffic para sa limit ng plano mo.

Hindi namin kailangan ang pangalan, numero ng telepono, o email para gamitin ang VPN. Hindi namin ginagamit ang VPN data para sa analytics, advertising, profiling, o user tracking. Hindi namin ibinebenta ang data ng user sa advertising networks.

2. Ano ang ibig sabihin ng aming No-Logs policy

Hindi namin nilo-log o iniimbak ang:
- kasaysayan ng mga binisitang website at URL;
- mga search query;
- mga DNS query;
- nilalaman ng traffic, kabilang ang mensahe, email, file, at iba pang ipinadalang data;
- kasaysayan ng iyong network activity;
- iyong source IP address bilang bahagi ng activity history.

Hindi namin ikinakabit ang iyong network activity sa account, device, o payment data para sa profiling.

Maaaring pansamantalang maproseso ng network equipment ang ilang teknikal na data habang binubuo o pinapanatili ang VPN connection. Kailangan ito para magdala ng naka-encrypt na traffic at patakbuhin ang serbisyo. Hindi namin ito ginagamit upang bumuo ng browsing history, suriin ang nilalaman ng traffic, o mag-profile ng user.

3. Data na kinokolekta sa app

3.1. Mga identifier at eligibility
- random na nabuo na anonymous device identifier (awtorisasyon ng device at device limits);
- random na nabuo na anonymous client identifier (client session);
- rehiyon ng App Store (regional availability at store rules);
- kumpirmasyon na ikaw ay 18 taong gulang o mas matanda.

3.2. Operasyon ng serbisyo at diagnostics
- status ng subscription at limit ng plano;
- dami ng nailipat na data (para ipatupad ang plano mo, hindi para makita kung ano ang na-access mo);
- oras ng huling koneksyon at status ng koneksyon;
- pangunahing teknikal na diagnostic sa katatagan at error (walang browsing history, DNS query, o nilalaman ng traffic).

3.3. Mga subscription at app store
Kung mag-subscribe ka sa Apple App Store, Google Play, o Huawei AppGallery, pinoproseso ng store ang bayad. Tumatanggap lamang kami ng limitadong teknikal na data para i-validate ang subscription status (hal. resibo o token data). Hindi namin iniimbak ang buong payment card details.

3.4. Support (kung makikipag-ugnayan ka lamang)
Kung magsusulat ka sa support o gagamit ng support portal, pinoproseso namin ang contact details at nilalamang boluntaryo mong ibinigay. Hiwalay ito sa VPN session logging.

4. Mga layunin ng pagproseso

Ginagamit lamang namin ang data sa itaas upang:
- patakbuhin at panatilihin ang VPN service;
- ipatupad ang mga regional availability restriction;
- pamahalaan ang mga subscription at device access;
- mapabuti ang reliability ng koneksyon at ayusin ang teknikal na isyu;
- matiyak ang pagsunod sa mga kinakailangang may kaugnayan sa edad ng serbisyo.

5. Saan pinoproseso ang data (infrastructure)

Ganito ang distribusyon ng aming infrastructure:

Estados Unidos:
- pangunahing backend systems (account identifiers, subscription data, App Store region, age confirmation, connection diagnostics na inilarawan sa Patakarang ito);
- mga server ng customer support portal (data na isinusumite mo kapag nakikipag-ugnayan sa support).

Switzerland:
- load balancing para sa mga VPN connection;
- mga VPN server na nagbibigay ng iyong naka-encrypt na VPN connection.

Dumadaan ang naka-encrypt na VPN traffic sa aming VPN at load-balancing infrastructure sa Switzerland. Hindi kami nag-iimbak ng log ng mga binisitang website, DNS query, o nilalaman ng traffic.

Maaaring ilipat ang limitadong teknikal na service data sa pagitan ng Estados Unidos at Switzerland lamang kung kinakailangan upang patakbuhin ang serbisyo, gamit ang angkop na teknikal at organizational safeguards.

6. Mga third party

Hindi namin ibinabahagi ang VPN traffic, browsing activity, DNS query, o nilalaman ng traffic sa mga third party para sa analytics, advertising, profiling, o tracking.

Pinoproseso ng mga app store operator (Apple, Google, Huawei) ang mga pagbili ayon sa kanilang sariling terms at privacy policies. Tumatanggap lamang kami ng teknikal na subscription validation data na inilarawan sa itaas.

Nagho-host ang infrastructure providers ng mga server at network; hindi namin ibinibigay sa kanila ang user activity log, browsing history, DNS query, o nilalaman ng traffic. Teknikal silang nakikilahok sa pagdadala ng naka-encrypt na traffic gaya ng kinakailangan para gumana ang VPN.

7. Walang tracking sa Raqoon app

Hindi gumagamit ang aming mobile app ng third-party marketing o product analytics SDK upang subaybayan ang paggamit ng VPN. Maaaring iproseso ng Apple, Google, o Huawei ang crash o diagnostic report ayon sa platform rules at device settings mo; hindi ginagamit ang mga ito upang suriin ang VPN browsing activity o nilalaman ng traffic.

8. Website (raqoon.app), cookies, at analytics

Sa raqoon.app maaari kaming gumamit ng cookies at katulad na teknolohiya para sa basic site operation, preferences, at web analytics.

Maaaring gumamit ang site ng Google Analytics upang maunawaan ang kabuuang traffic at performance ng page. Hiwaay ang website analytics sa VPN app at hindi ginagamit upang suriin ang VPN traffic, DNS query, o browsing history sa loob ng VPN session.

Kung may cookie consent banner, maaari mong tanggapin o tanggihan ang non-essential cookies.

9. Retention at pagtanggal

Pinapanatili ang teknikal na data habang aktibo ang subscription mo at kung kinakailangan upang patakbuhin ang serbisyo. Kung hindi mo i-renew, maaaring tanggalin ang account data pagkatapos ng panahon ng hindi paggamit.

Maaari mong tanggalin ang account at kaugnay na data sa mga setting ng Raqoon app. Pagkatapos ng pagtanggal, titigil kami sa pagbibigay ng access at tatanggalin o ia-anonymize ang data na hindi na kailangan.

Maaaring panatilihin ang ilang record sa limitadong panahon kung kinakailangan ng batas, billing verification, fraud prevention, o dispute resolution.

10. Mga kahilingan ng gobyerno at awtoridad

Nakarehistro ang Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti. sa Türkiye. Kung makatanggap kami ng lawful request mula sa competent authority, susuriin namin ito ayon sa applicable law.

Dahil hindi kami nag-iimbak ng activity log, hindi namin maibibigay ang browsing history, DNS query, o nilalaman ng traffic. Maaari lamang naming kumpirmahin ang limitadong impormasyon tulad ng pagkakaroon ng account, subscription status, o teknikal na data na inilarawan sa Patakarang ito.

11. Kinakailangang edad

Hindi nakatuon ang Serbisyo sa mga wala pang 18 taong gulang. Ginagamit namin ang in-app age confirmation upang ipatupad ang kinakailangang ito.

12. Seguridad

Naglalapat kami ng teknikal at organizational measures kabilang ang access controls, encryption in transit, at data minimization.

13. Iyong mga karapatan

Maaari kang humiling ng impormasyon tungkol sa data na naka-link sa account mo, tanggalin ang account sa app, makipag-ugnayan sa amin tungkol sa privacy, at tanggihan ang non-essential cookies sa website kung available.

Privacy: private@raqoon.app

14. Distribusyon ng app

Kapag ini-install mo ang Raqoon VPN mula sa Apple App Store, Google Play, o Huawei AppGallery, pinoproseso ng store operator ang mga pagbili at ilang identifier ayon sa sarili nitong policies. Ang paggamit mo ng store ay pinamamahalaan ng mga panuntunan ng operator na iyon.

15. Mga pagbabago sa Patakarang ito

Maaari naming i-update ang Patakarang ito kapag nagbago ang serbisyo, infrastructure, o legal requirements. Ia-update ang petsa ng bisa sa itaas kapag nag-publish kami ng bagong bersyon.

16. Mga contact

- Privacy at pagtanggal ng data: private@raqoon.app
- Support: help@raqoon.app
- Kumpanya: Qat Bilişim ve Yazılım Teknolojileri Ltd. Şti., Ankara, Türkiye`,
};

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const code of LOCALES) {
    const body = BODIES[code];
    if (!body) {
      console.error(`Missing translation for locale: ${code}`);
      process.exit(1);
    }
    const outPath = path.join(OUT_DIR, `${code}.txt`);
    fs.writeFileSync(outPath, body.replace(/\r\n/g, "\n") + "\n", "utf8");
    console.log("wrote", outPath, body.length, "chars");
  }
}

main();
