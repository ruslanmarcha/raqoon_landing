import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import { useLocalePolicy } from '../../contexts/LocalePolicyContext';
import { useProfilePortal } from '../../contexts/ProfilePortalContext';
import styles from './Header.module.css';

interface HeaderProps {
  showLanguageSelector?: boolean;
  showAccountLink?: boolean;
}

export function Header({ showLanguageSelector = true, showAccountLink = true }: HeaderProps) {
  const { t } = useTranslation();
  const { allowLanguageSwitch } = useLocalePolicy();
  const { openProfilePortal } = useProfilePortal();

  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <BrandLogo />
          </a>
        </div>
        {(showAccountLink || (showLanguageSelector && allowLanguageSwitch)) && (
          <div className={styles.actions}>
            {showAccountLink ? (
              <button type="button" className={styles.profileLink} onClick={openProfilePortal}>
                {t('nav.profile', { defaultValue: 'Profile' })}
              </button>
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
