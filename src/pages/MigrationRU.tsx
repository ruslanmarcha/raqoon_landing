import { useEffect } from 'react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './MigrationRU.module.css'

export function MigrationRU() {
  useEffect(() => {
    // Ensure route always opens from top on direct visit and navigation.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead variant="ru" page="migration" metaLocale="ru" />
      <Header showLanguageSelector={false} />
      <main>
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <div className={styles.heroCard}>
              <h1 className={styles.title}>
                Добро пожаловать в Raqoon!
              </h1>
              <p className={styles.lead}>
                Наш новый дом готов, и пора переезжать из ИЗИ в
                <a
                  href="https://t.me/raqoonbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  {' '}
                  @raqoonbot
                </a>
                . Мы постарались сделать процесс максимально простым, а условия - еще приятнее.
              </p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container">
            <div className={styles.card}>
              <h2 className={styles.heading}>Твой план действий</h2>
              <ol className={styles.steps}>
                <li>
                  Зайди в новый бот:
                  <a
                    href="https://t.me/raqoonbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    {' '}
                    @raqoonbot
                  </a>
                  .
                </li>
                <li>
                  <strong>Важно:</strong> <strong>НЕ создавай новый аккаунт</strong>. Иначе перенос дней не
                  сработает и потом «ничего не работает».
                </li>
                <li>
                  В боте нажми <strong>«ВОЙТИ»</strong> (а не «Создать аккаунт») и введи <strong>RaqoonID</strong>,
                  который тебе прислал <strong>ИЗИ-бот</strong>.
                </li>
                <li>
                  Когда вошёл по RaqoonID — активируй <strong>промокод миграции</strong>, чтобы перенести остаток
                  оплаченных дней.
                </li>
                <li>
                  Дальше активируй ключ доступа в приложении по инструкции на странице:
                  <a
                    href="/faq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    {' '}
                    raqoon.app/faq
                  </a>
                  .
                </li>
              </ol>
              <p className={styles.note}>
                RaqoonID и промокод миграции уже есть в твоём чате с ИЗИ-ботом. Просто возьми их оттуда и
                используй в @raqoonbot через кнопку <strong>«ВОЙТИ»</strong>.
              </p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.heading}>Что важно знать</h2>
              <ul className={styles.bullets}>
                <li>
                  <strong>Тариф не меняется:</strong> стоимость и условия остаются прежними, как в ИЗИ.
                </li>
                <li>
                  <strong>Больше трафика:</strong> теперь вместо 500 Гб мы даем 1 Тб. Пользуйся на полную.
                </li>
                <li>
                  <strong>Условие активации:</strong> код сработает, если твой баланс в ИЗИ на момент
                  переноса был 1 или более. Если оставалось меньше дня, просто оформи новую подписку в боте.
                </li>
                <li>
                  <strong>Точка отсчета:</strong> мы фиксировали данные и переносили балансы по состоянию на
                  21 марта. Если увидишь неточность - не переживай, пиши в поддержку @raqoonbot, мы все
                  оперативно поправим.
                </li>
              </ul>
            </div>

            <div className={styles.alertCard}>
              <p>
                Старые серверы ИЗИ начнут отключаться в течение ближайших нескольких дней. Чтобы не остаться
                без связи, переходи в Raqoon прямо сейчас.
              </p>
              <a
                href="https://t.me/raqoonbot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Перейти в @raqoonbot
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

