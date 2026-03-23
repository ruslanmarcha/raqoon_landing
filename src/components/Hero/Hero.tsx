import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

type HeroVariant = 'ru' | 'ww';

interface HeroProps {
  variant: HeroVariant;
}

export function Hero({ variant }: HeroProps) {
  const { t } = useTranslation();

  const suffix = variant.toUpperCase();
  const titleRaw: string = t(`hero.title${suffix}`);
  const titleLines = titleRaw.split('\n');

  function scrollToPricing() {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }

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
          <button
            type="button"
            onClick={scrollToPricing}
            className={`btn btn-secondary btn-lg ${styles.cta}`}
          >
            {t('hero.ctaRU')}
          </button>
        ) : (
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-secondary btn-lg ${styles.cta}`}
          >
            <img
              src="apple.svg"
              aria-hidden="true"
              className={styles.appleIcon}
            />
            {t('hero.ctaWW')}
          </a>
        )}
      </div>
    </section>
  );
}
