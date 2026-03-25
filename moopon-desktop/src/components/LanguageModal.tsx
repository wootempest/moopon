import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useI18n, type Language } from '../i18n';

const FLAG_EMOJI: Record<string, string> = {
    en: '🇺🇸',
    tr: '🇹🇷',
    ja: '🇯🇵',
    fr: '🇫🇷',
    de: '🇩🇪',
    ru: '🇷🇺',
    es: '🇪🇸',
    it: '🇮🇹',
};

interface LanguageModalProps {
    onSelect: (lang: Language) => void;
}

export default function LanguageModal({ onSelect }: LanguageModalProps) {
    const { t } = useI18n();

    const languages: { code: Language; label: string }[] = [
        { code: 'en', label: t.language.english },
        { code: 'tr', label: t.language.turkish },
        { code: 'ja', label: t.language.japanese },
        { code: 'fr', label: t.language.french },
        { code: 'de', label: t.language.german },
        { code: 'ru', label: t.language.russian },
        { code: 'es', label: t.language.spanish },
        { code: 'it', label: t.language.italian },
    ];

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="language-modal"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="language-modal-icon">
                    <Globe size={48} />
                </div>
                <h2>{t.language.selectTitle}</h2>
                <p>{t.language.selectSubtitle}</p>

                <div className="language-options">
                    {languages.map((lang) => (
                        <motion.button
                            key={lang.code}
                            className="language-option"
                            onClick={() => onSelect(lang.code)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="language-flag">{FLAG_EMOJI[lang.code]}</span>
                            <span className="language-name">{lang.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
