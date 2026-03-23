import { useTranslation } from 'react-i18next';
import styles from './Referral.module.css';

export function Referral() {
  const { t } = useTranslation();

  const titleRaw: string = t('referral.title');
  const titleLines = titleRaw.split('\n');

  return (
    <section className={`section ${styles.root}`} id="referral">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.mascot} aria-hidden="true">
            <img
              src="/gift.png"
              alt=""
              className={styles.mascotImg}
              width={120}
              height={120}
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className={styles.description}>{t('referral.description')}</p>
            <button type="button" className={`btn ${styles.cta}`}>
              {t('referral.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
