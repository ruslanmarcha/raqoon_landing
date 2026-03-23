import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { persistSelectedLanguage } from '../../i18n/geoLocale';
import styles from './LanguageSelector.module.css';

type Props = {
  className?: string;
};

export function LanguageSelector(props: Props) {
  const { className } = props;
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const langs = ['ru', 'en'] as const;
  const current = langs.includes(i18n.language as 'ru' | 'en')
    ? (i18n.language as 'ru' | 'en')
    : 'en';
  const currentLabel = current.toUpperCase();

  function handleChange(lang: 'ru' | 'en') {
    i18n.changeLanguage(lang);
    persistSelectedLanguage(lang);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) {
        return;
      }
      if (event.target instanceof Node && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className ?? ''}`}
      aria-label="Language selector"
    >
      <button
        type="button"
        className={styles.field}
        onClick={() => setIsOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.languageRow}>
          <span
            className={`${styles.flag} ${current === 'ru' ? styles.flagRu : styles.flagEn}`}
            aria-hidden="true"
          />
          <span className={styles.language}>
            <span className={styles.label}>{currentLabel}</span>
            <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />
          </span>
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox" aria-label="Select language">
          {langs.map((lang) => (
            <button
              key={lang}
              type="button"
              role="option"
              aria-selected={current === lang}
              className={`${styles.option} ${current === lang ? styles.optionActive : ''}`}
              onClick={() => handleChange(lang)}
            >
              <span className={`${styles.flag} ${lang === 'ru' ? styles.flagRu : styles.flagEn}`} aria-hidden="true" />
              <span className={styles.optionLabel}>{lang.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
