'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: '🇺🇸 English', label: 'EN' },
    { code: 'es', name: '🇪🇸 Español', label: 'ES' },
    // Add more languages later:
    // { code: 'zh', name: '🇨🇳 中文', label: 'ZH' },
    // { code: 'de', name: '🇩🇪 Deutsch', label: 'DE' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
          isDark
            ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-700'
        }`}
      >
        {currentLanguage?.label}
        <span className={`transition transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
            isDark ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-zinc-200'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition ${
                i18n.language === lang.code
                  ? isDark
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-900'
                  : isDark
                  ? 'text-zinc-300 hover:bg-zinc-800'
                  : 'text-zinc-700 hover:bg-zinc-100'
              } ${lang.code !== languages[languages.length - 1].code ? (isDark ? 'border-b border-zinc-700' : 'border-b border-zinc-200') : ''}`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
