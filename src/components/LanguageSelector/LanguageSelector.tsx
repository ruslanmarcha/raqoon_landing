import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { persistSelectedLanguage } from '../../i18n/geoLocale';
import styles from './LanguageSelector.module.css';

type Props = {
  className?: string;
};

const LANG_OPTIONS = [
  { code: 'ru', label: 'RU', flag: 'ru' },
  { code: 'en', label: 'EN', flag: 'gb' },
  { code: 'ar', label: 'AR', flag: 'ar' },
  { code: 'tl', label: 'TL', flag: 'ph' },
  { code: 'pl', label: 'PL', flag: 'pl' },
  { code: 'cs', label: 'CS', flag: 'cz' },
  { code: 'de', label: 'DE', flag: 'de' },
  { code: 'fr', label: 'FR', flag: 'fr' },
  { code: 'pt-BR', label: 'BR', flag: 'br' },
  { code: 'th', label: 'TH', flag: 'th' },
  { code: 'id', label: 'ID', flag: 'id' },
  { code: 'ja', label: 'JA', flag: 'jp' },
  { code: 'ko', label: 'KO', flag: 'kr' },
] as const;

type LangCode = (typeof LANG_OPTIONS)[number]['code'];
type FlagCode = (typeof LANG_OPTIONS)[number]['flag'];

function normalizeLanguageTag(languageTag: string): string {
  return languageTag.split('-')[0].toLowerCase();
}

function getFlagClass(flag: FlagCode): string {
  const map: Record<FlagCode, string> = {
    ru: styles.flagRu,
    gb: styles.flagGb,
    ar: styles.flagAr,
    ph: styles.flagPh,
    pl: styles.flagPl,
    cz: styles.flagCz,
    de: styles.flagDe,
    fr: styles.flagFr,
    br: styles.flagBr,
    th: styles.flagTh,
    id: styles.flagId,
    jp: styles.flagJp,
    kr: styles.flagKr,
  };

  return map[flag];
}

export function LanguageSelector(props: Props) {
  const { className } = props;
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const currentOption =
    LANG_OPTIONS.find(({ code }) => code === i18n.language) ??
    LANG_OPTIONS.find(({ code }) => code === normalizeLanguageTag(i18n.language)) ??
    LANG_OPTIONS[1];

  function handleChange(lang: LangCode) {
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
            className={`${styles.flag} ${getFlagClass(currentOption.flag)}`}
            aria-hidden="true"
          />
          <span className={styles.language}>
            <span className={styles.label}>{currentOption.label}</span>
            <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />
          </span>
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox" aria-label="Select language">
          {LANG_OPTIONS.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={currentOption.code === lang.code}
              className={`${styles.option} ${currentOption.code === lang.code ? styles.optionActive : ''}`}
              onClick={() => handleChange(lang.code)}
            >
              <span className={`${styles.flag} ${getFlagClass(lang.flag)}`} aria-hidden="true" />
              <span className={styles.optionLabel}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
