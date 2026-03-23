import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { SEOHead } from '../seo/SEOHead'
import styles from './MigrationRU.module.css'

export function MigrationRU() {
  return (
    <>
      <SEOHead variant="ru" />
      <Header />
      <main>
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <div className={styles.heroCard}>
              <h1 className={styles.title}>
                Время переезда:
                <br />
                переносим твою подписку в Raqoon
              </h1>
              <p className={styles.lead}>
                Привет! Наш новый дом готов, и пора перебираться из ИЗИ в
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
                <li>Используй свой RaqoonID для входа в профиль.</li>
                <li>
                  Активируй промокод миграции, чтобы перенести остаток оплаченных дней.
                </li>
              </ol>
              <p className={styles.note}>
                RaqoonID и промокод миграции придут тебе в чате с ИЗИ-ботом.
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

