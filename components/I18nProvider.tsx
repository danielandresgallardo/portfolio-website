'use client';

import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProviderWrapper({ children }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      try {
        const savedLang = localStorage.getItem('language') || 'en';
        if (!i18n.isInitialized) {
          await i18n.init();
        }
        await i18n.changeLanguage(savedLang);
        setIsReady(true);
      } catch (error) {
        console.error('i18n initialization error:', error);
        setIsReady(true);
      }
    };

    initI18n();

    // Listen for language changes and save to localStorage
    const handleLanguageChange = (lng: string) => {
      localStorage.setItem('language', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  if (!isReady) return <>{children}</>;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
