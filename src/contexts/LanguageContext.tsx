import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'hi' | 'ur' | 'mr' | 'kn' | 'ml' | 'ta' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
  hasSelectedLanguage: boolean;
  setHasSelectedLanguage: (value: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { t, i18n } = useTranslation();
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);

  useEffect(() => {
    const hasSelected = localStorage.getItem('brightsmile-language-selected') === 'true';
    setHasSelectedLanguage(hasSelected);
  }, []);

  // Handle RTL and Lang attributes
  useEffect(() => {
    const currentLanguage = (i18n.language || 'en') as Language;
    const isRtl = currentLanguage === 'ur';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [i18n.language]);

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('brightsmile-language-selected', 'true');
    setHasSelectedLanguage(true);
  };

  // Ensure language falls back to 'en' if undefined or not in our list
  const currentLanguage = (i18n.language || 'en') as Language;

  return (
    <LanguageContext.Provider value={{
      language: currentLanguage,
      setLanguage,
      t,
      hasSelectedLanguage,
      setHasSelectedLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

