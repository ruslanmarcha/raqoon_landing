import styles from './FeatureItem.module.css';

export interface FeatureItemData {
  label: string;
  sub?: string;
}

interface Props {
  item: FeatureItemData;
  icon?: string;
  centered?: boolean;
}

export function FeatureItem({ item, icon = '/check.svg', centered = false }: Props) {
  return (
    <li className={`${styles.item} ${centered ? styles.itemCentered : ''}`}>
      <img src={icon} aria-hidden="true" className={styles.checkIcon} />
      <span className={styles.text}>
        <span className={styles.label}>{item.label}</span>
        {item.sub && <span className={styles.sub}>{item.sub}</span>}
      </span>
    </li>
  );
}
