import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { useComingSoon } from '../../contexts/ComingSoonContext';

type HeroVariant = 'ru' | 'ww';

interface HeroProps {
  variant: HeroVariant;
}

export function Hero({ variant }: HeroProps) {
  const { t, i18n } = useTranslation();
  const { openComingSoon } = useComingSoon();

  const suffix = i18n.language.startsWith('ru') ? 'RU' : 'WW';
  const titleRaw: string = t(`hero.title${suffix}`);
  const titleLines = titleRaw.split('\n');

  return (
    <section className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.mascot} aria-hidden="true">
          <img src="/mascot.png" alt="" className={styles.mascotImg} />
        </div>
        <h1 className={styles.title}>
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.subtitle}>{t(`hero.subtitle${suffix}`)}</p>
        {variant === 'ru' ? (
          <Link to="/download" className={`btn btn-secondary btn-lg ${styles.cta}`}>
            {t(`hero.cta${suffix}`)}
          </Link>
        ) : (
          <div className={styles.storeRow}>
            <button
              type="button"
              className={`btn btn-secondary btn-lg ${styles.cta}`}
              onClick={openComingSoon}
            >
              <img
                src="apple.svg"
                aria-hidden="true"
                className={styles.appleIcon}
              />
              {t('hero.storeApple')}
            </button>
            <button
              type="button"
              className={`btn btn-secondary btn-lg ${styles.cta}`}
              onClick={openComingSoon}
            >
              {t('hero.storeGoogle')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
