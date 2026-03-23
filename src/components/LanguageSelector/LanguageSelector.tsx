import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

type Props = {
  className?: string;
};

export function LanguageSelector(props: Props) {
  const { className } = props;
  const { i18n } = useTranslation();

  const langs = ['ru', 'en'] as const;
  const current = langs.includes(i18n.language as 'ru' | 'en')
    ? (i18n.language as 'ru' | 'en')
    : 'en';

  function handleChange(lang: 'ru' | 'en') {
    i18n.changeLanguage(lang);
  }

  return (
    <div
      className={`${styles.root} ${className || ''}`}
      role="group"
      aria-label="Language selector"
    >
      {langs.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`${styles.btn} ${current === lang ? styles.active : ''}`}
          onClick={() => handleChange(lang)}
          aria-pressed={current === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
