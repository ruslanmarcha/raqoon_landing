import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { useLocalePolicy } from '../../contexts/LocalePolicyContext';
import { clientPortalUrl } from '@/utils/clientPortalUrl';
import styles from './Header.module.css';

interface HeaderProps {
  showLanguageSelector?: boolean;
  showAccountLink?: boolean;
}

export function Header({ showLanguageSelector = true, showAccountLink = true }: HeaderProps) {
  const { t } = useTranslation();
  const { allowLanguageSwitch } = useLocalePolicy();

  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <img className={styles.logoIcon} src="/logo.png" alt="Raqoon" />
            <span className={styles.logoText}>Raqoon</span>
          </a>
        </div>
        {(showAccountLink || (showLanguageSelector && allowLanguageSwitch)) && (
          <div className={styles.actions}>
            {showAccountLink ? (
              <a href={clientPortalUrl()} className={styles.profileLink}>
                {t('nav.profile', { defaultValue: 'Profile' })}
              </a>
            ) : null}
            {showLanguageSelector && allowLanguageSwitch ? (
              <LanguageSelector className={styles.languageSelector} />
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
}
