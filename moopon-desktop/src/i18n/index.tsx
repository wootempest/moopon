import { createContext, useContext, useState, type ReactNode } from 'react';
import { en, type TranslationKeys } from './en';
import { tr } from './tr';
import { ja } from './ja';
import { fr } from './fr';
import { de } from './de';
import { ru } from './ru';
import { es } from './es';
import { it } from './it';

export type Language = 'en' | 'tr' | 'ja' | 'fr' | 'de' | 'ru' | 'es' | 'it';

const translations: Record<Language, TranslationKeys> = { en, tr, ja, fr, de, ru, es, it };

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'moopon_language';

const VALID_LANGUAGES: Language[] = ['en', 'tr', 'ja', 'fr', 'de', 'ru', 'es', 'it'];

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return VALID_LANGUAGES.includes(stored as Language) ? (stored as Language) : 'en';
    });

    const setLanguage = (lang: Language) => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        setLanguageState(lang);
    };

    const t = translations[language];

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

export function useLanguage() {
    const { language, setLanguage } = useI18n();
    return { language, setLanguage };
}

export function getStoredLanguage(): Language | null {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (VALID_LANGUAGES.includes(stored as Language)) return stored as Language;
    return null;
}

export function hasSelectedLanguage(): boolean {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) !== null;
}
