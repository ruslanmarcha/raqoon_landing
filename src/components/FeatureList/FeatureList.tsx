import { FeatureItem, FeatureItemData } from '../FeatureItem/FeatureItem';
import styles from './FeatureList.module.css';

interface Props {
  items: FeatureItemData[];
  topItems?: FeatureItemData[];
  className?: string;
}

export function FeatureList({ items, topItems, className }: Props) {
  if (!topItems || topItems.length === 0) {
    return (
      <ul className={className}>
        {items.map((item, i) => (
          <FeatureItem key={i} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div className={className}>
      <ul className={styles.topList}>
        {topItems.map((item, i) => (
          <FeatureItem key={i} item={item} icon="/spark.svg" centered />
        ))}
      </ul>
      <hr className={styles.divider} />
      <ul className={styles.list}>
        {items.map((item, i) => (
          <FeatureItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}
