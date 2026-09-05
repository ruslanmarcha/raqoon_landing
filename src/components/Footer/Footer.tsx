import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import styles from './Footer.module.css';
import { ruAppStoreCtaPath } from '@/utils/ruAppStoreCtaPath';

export function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <BrandLogo />
          </Link>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/faq" className={styles.link}>
            {t('footer.faq', { defaultValue: 'FAQ' })}
          </Link>
          {i18n.language.startsWith('ru') ? (
            <Link to="/beta" className={styles.link}>
              {t('footer.beta')}
            </Link>
          ) : null}
          {i18n.language.startsWith('ru') ? (
            <Link to="/rosvpn" className={styles.link}>
              {t('footer.rosvpn')}
            </Link>
          ) : null}
          <Link to="/referral" className={styles.link}>
            {t('footer.referral', { defaultValue: t('referral.cta') })}
          </Link>
          <Link to={ruAppStoreCtaPath(i18n.language)} className={styles.link}>
            {t('footer.download')}
          </Link>
          <Link to="/documents" className={styles.link}>
            {t('footer.documents')}
          </Link>
        </nav>
        <p className={styles.copy}>{t('footer.copy')}</p>
      </div>
    </footer>
  );
}
