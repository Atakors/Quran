import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex bg-white/20 rounded-lg p-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors
            ${i18n.language.startsWith(code) ? 'bg-white text-teal-600 shadow' : 'text-white hover:bg-white/30'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
