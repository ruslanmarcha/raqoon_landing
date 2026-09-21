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

type ProductLink = { key: string; to: string };

function buildProductLinks(isRu: boolean): ProductLink[] {
  const links: ProductLink[] = [
    { key: 'vpn', to: '/' },
  ];
  if (isRu) {
    links.push({ key: 'wallet', to: '/wallet' });
  }
  links.push({ key: 'esim', to: '/esim' });
  return links;
}

function isProductActive(path: string, to: string) {
  if (to === '/wallet') return path.startsWith('/wallet') || path.startsWith('/card');
  if (to === '/esim') return path === '/esim';
  if (to === '/') return path === '/' || path === '';
  return path === to;
}

export function Header({ showLanguageSelector = true, showAccountLink = true }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { allowLanguageSwitch } = useLocalePolicy();
  const { openProfilePortal } = useProfilePortal();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isRu = i18n.language.startsWith('ru');
  const productLinks = buildProductLinks(isRu);
  const hideProfileOnProductPages =
    pathname.startsWith('/wallet') || pathname.startsWith('/card');
  const showProfile = showAccountLink && !hideProfileOnProductPages;
  const showLang = showLanguageSelector && allowLanguageSwitch;
  const showMobileMenu = true;
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
      <div className={`container ${styles.inner} ${styles.innerWithNav}`}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo} aria-label={t('nav.logoAlt')}>
            <BrandLogo />
          </Link>
        </div>
        <nav className={styles.productNav} aria-label={t('nav.productsAria')}>
          {productLinks.map(({ key, to }) => {
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
                    {productLinks.map(({ key, to }) => {
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
