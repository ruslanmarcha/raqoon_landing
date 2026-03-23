import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import styles from './Header.module.css';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <img className={styles.logoIcon} src="/logo.png" alt="Raqoon" />
            <span className={styles.logoText}>Raqoon</span>
          </a>
        </div>
        <LanguageSelector className={styles.languageSelector} />
      </div>
    </header>
  );
}
