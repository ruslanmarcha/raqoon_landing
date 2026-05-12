import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FeatureItemData } from '../FeatureItem/FeatureItem';
import { FeatureList } from '../FeatureList/FeatureList';
import styles from './Pricing.module.css';

type PricingVariant = 'ru' | 'ww';

interface PricingProps {
  variant?: PricingVariant;
}

export function Pricing({ variant = 'ww' }: PricingProps) {
  const { t, i18n } = useTranslation();

  // Important: when user switches language in `LanguageSelector`,
  // we must not show RU-only blocks (constructor + IZI migration) in EN.
  const isRuLang = i18n.language.startsWith('ru');
  // `variant` is kept for backward compatibility, but the UI is controlled by i18n language.
  void variant;
  const showConstructor = isRuLang;

  const constructorFeatures = t('pricing.constructorFeatures', {
    returnObjects: true,
  }) as FeatureItemData[];

  const allInFeatures = t('pricing.allInFeatures', {
    returnObjects: true,
  }) as FeatureItemData[];

  const allInTopItems = allInFeatures.slice(0, 1);
  const allInItems = allInFeatures.slice(1);

  const freeTierBenefitRows: FeatureItemData[] = showConstructor
    ? (t('pricing.freeTier.benefits', { returnObjects: true }) as string[]).map((label) => ({
        label,
      }))
    : [];

  return (
    <section className={`section ${styles.root}`} id="pricing">
      <div className="container">
        {showConstructor ? (
          <div className={styles.freeTierWrapper}>
            <div className={styles.freeTierCard}>
              <div className={styles.freeTierTop}>
                <div className={styles.freeTierColTitle}>
                  <span className={`${styles.badge} ${styles.freeTierBadge}`}>
                    <span className={styles.badgeIcon}>
                      <img
                        src="constructor.png"
                        aria-hidden="true"
                        className={styles.badgeIcon}
                      />
                    </span>
                    {t('pricing.freeTier.title')}
                  </span>
                  <span className={styles.freeTierSubtitle}>{t('pricing.freeTier.subtitle')}</span>
                </div>
                <FeatureList items={freeTierBenefitRows} className={styles.features} />
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={`${styles.grid} ${!showConstructor ? styles.gridSingle : ''}`}
        >
          {showConstructor && (
            <div className={`${styles.card} ${styles.cardBase}`}>
              <div className={styles.cardHeader}>
                <span className={styles.badge}>
                  <span className={styles.badgeIcon}>
                    <img
                      src="constructor.png"
                      aria-hidden="true"
                      className={styles.badgeIcon}
                    />
                  </span>
                  {t('pricing.constructor.badge')}
                </span>
                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    {t('pricing.constructor.price')}{' '}
                    {t('pricing.constructor.unit')}
                  </span>
                </div>
              </div>
              <Link
                to="/download"
                className={`btn btn-primary ${styles.ctaBtn}`}
              >
                {t('pricing.constructor.cta')}
              </Link>
              <FeatureList
                items={constructorFeatures}
                className={styles.features}
              />
            </div>
          )}

          {/* All Inclusive plan */}
          <div
            className={`${styles.card} ${styles.cardPremium} ${styles.allInCard}`}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.badge}`}>
                <img
                  src="logo.png"
                  aria-hidden="true"
                  className={styles.badgeIcon}
                />
                {t('pricing.allIn.badge')}
              </span>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  {t('pricing.allIn.price')} {t('pricing.allIn.unit')}
                </span>
              </div>
            </div>
            <Link
              to="/download"
              className={`btn btn-primary ${styles.ctaBtn}`}
            >
              {t('pricing.allIn.cta')}
            </Link>
            <FeatureList
              topItems={allInTopItems}
              items={allInItems}
              className={styles.featuresWrapper}
            />
          </div>
        </div>

        {showConstructor && (
          <div className={styles.migrationWrapper}>
            <div className={styles.migrationCard}>
              <div className={styles.migrationLeft}>
                <img
                  src="constructor.png"
                  aria-hidden="true"
                  className={styles.migrationIcon}
                />
                <span className={styles.migrationText}>
                  {t('migration.title')}
                </span>
              </div>
              <Link
                to="/migration"
                className={`btn btn-primary ${styles.migrationBtn}`}
              >
                {t('migration.cta')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
