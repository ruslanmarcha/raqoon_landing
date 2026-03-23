import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <img className={styles.logoIcon} src="/logo.png" alt="Raqoon" />
            <span className={styles.logoText}>Raqoon</span>
          </a>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href="#" className={styles.link}>
            {t('footer.about')}
          </a>
          <a href="#" className={styles.link}>
            {t('footer.privacy')}
          </a>
          <a href="#" className={styles.link}>
            {t('footer.terms')}
          </a>
          <a href="#" className={styles.link}>
            {t('footer.contact')}
          </a>
          <a href="#" className={styles.link}>
            {t('footer.refund')}
          </a>
        </nav>
        <p className={styles.copy}>{t('footer.copy')}</p>
      </div>
    </footer>
  );
}
