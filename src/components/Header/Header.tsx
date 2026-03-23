import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import styles from './Header.module.css';

interface HeaderProps {
  showLanguageSelector?: boolean;
}

export function Header({ showLanguageSelector = true }: HeaderProps) {
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
        {showLanguageSelector && (
          <LanguageSelector className={styles.languageSelector} />
        )}
      </div>
    </header>
  );
}
