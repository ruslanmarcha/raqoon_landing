import { useTranslation } from 'react-i18next';
import { FeatureItemData } from '../FeatureItem/FeatureItem';
import { FeatureList } from '../FeatureList/FeatureList';
import styles from './FeaturesCard.module.css';

export function FeaturesCard() {
  const { t } = useTranslation();
  const items = t('features.items', {
    returnObjects: true,
  }) as FeatureItemData[];

  return (
    <section className={`section ${styles.root}`} id="features">
      <div className="container">
        <div className={styles.card}>
          <FeatureList items={items} className={styles.list} />
          <div className={styles.raccoonDecor} aria-hidden="true">
            <img
              src="/eyes.png"
              alt=""
              className={styles.eyeLeft}
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
