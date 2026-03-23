import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <img className={styles.logoIcon} src="/logo.png" alt="Raqoon" />
            <span className={styles.logoText}>Raqoon</span>
          </Link>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/about" className={styles.link}>
            {t('footer.about')}
          </Link>
          <Link to="/privacy" className={styles.link}>
            {t('footer.privacy')}
          </Link>
          <Link to="/terms" className={styles.link}>
            {t('footer.terms')}
          </Link>
          <Link to="/contact" className={styles.link}>
            {t('footer.contact')}
          </Link>
          <Link to="/refund" className={styles.link}>
            {t('footer.refund')}
          </Link>
        </nav>
        <p className={styles.copy}>{t('footer.copy')}</p>
      </div>
    </footer>
  );
}
