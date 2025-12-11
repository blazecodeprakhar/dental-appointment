
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from '../locales/translations';

// Transform the existing translations object to i18next resources format
const resources = Object.entries(translations).reduce((acc, [lang, ns]) => {
    acc[lang] = {
        translation: ns
    };
    return acc;
}, {} as any);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'brightsmile-language',
            caches: ['localStorage'],
        }
    });

export default i18n;
