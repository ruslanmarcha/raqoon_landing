import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import { useLocalePolicy } from '../../contexts/LocalePolicyContext';
import { useProfilePortal } from '../../contexts/ProfilePortalContext';
import styles from './Header.module.css';

interface HeaderProps {
  showLanguageSelector?: boolean;
  showAccountLink?: boolean;
}

const PRODUCT_LINKS = [
  { key: 'vpn', to: '/' },
  { key: 'wallet', to: '/wallet' },
  { key: 'card', to: '/card' },
] as const;

function isProductActive(path: string, to: string) {
  if (to === '/wallet') return path.startsWith('/wallet');
  if (to === '/card') return path.startsWith('/card');
  return !path.startsWith('/wallet') && !path.startsWith('/card');
}

export function Header({ showLanguageSelector = true, showAccountLink = true }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { allowLanguageSwitch } = useLocalePolicy();
  const { openProfilePortal } = useProfilePortal();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isRu = i18n.language.startsWith('ru');
  const hideProfileOnProductPages =
    pathname.startsWith('/wallet') || pathname.startsWith('/card');
  const showProfile = showAccountLink && !hideProfileOnProductPages;
  const showLang = showLanguageSelector && allowLanguageSwitch;
  const showMobileMenu = isRu;
  const showActions = showProfile || showLang || showMobileMenu;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;
      if (event.target instanceof Node && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  function handleProfileClick() {
    setMenuOpen(false);
    openProfilePortal();
  }

  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner} ${isRu ? styles.innerWithNav : ''}`}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <BrandLogo />
          </Link>
        </div>
        {isRu ? (
          <nav className={styles.productNav} aria-label={t('nav.productsAria')}>
            {PRODUCT_LINKS.map(({ key, to }) => {
              const active = isProductActive(pathname, to);
              return (
                <Link
                  key={key}
                  to={to}
                  className={`${styles.productLink} ${active ? styles.productLinkActive : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </nav>
        ) : null}
        {showActions ? (
          <div className={styles.actions}>
            {showProfile ? (
              <button type="button" className={styles.profileLink} onClick={openProfilePortal}>
                {t('nav.profile')}
              </button>
            ) : null}
            {showMobileMenu ? (
              <div className={styles.mobileMenu} ref={menuRef}>
                <button
                  type="button"
                  className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ''}`}
                  aria-label={t('nav.menuAria')}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <span className={styles.menuIcon} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
                {menuOpen ? (
                  <div className={styles.menuPanel} role="menu">
                    {PRODUCT_LINKS.map(({ key, to }) => {
                      const active = isProductActive(pathname, to);
                      return (
                        <Link
                          key={key}
                          to={to}
                          role="menuitem"
                          className={`${styles.menuItem} ${active ? styles.menuItemActive : ''}`}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {t(`nav.${key}`)}
                        </Link>
                      );
                    })}
                    {showAccountLink ? (
                      <>
                        <div className={styles.menuDivider} role="separator" />
                        <button
                          type="button"
                          role="menuitem"
                          className={styles.menuItem}
                          onClick={handleProfileClick}
                        >
                          {t('nav.profile')}
                        </button>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
            {showLang ? <LanguageSelector className={styles.languageSelector} /> : null}
          </div>
        ) : (
          <div className={styles.actionsSpacer} aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
