import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Loader2 } from 'lucide-react';
import { startLogin } from '../services/malApi';
import { useI18n, type Language } from '../i18n';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'ja', label: '日本語' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ru', label: 'Русский' },
    { code: 'es', label: 'Español' },
    { code: 'it', label: 'Italiano' },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { t, language, setLanguage } = useI18n();

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const success = await startLogin();
            if (success) {
                onLoginSuccess();
            } else {
                setError(t.login.failed);
            }
        } catch (err: any) {
            if (err.message === 'Auth window closed') {
                setError(t.login.authWindowClosed);
            } else {
                setError(t.common.error + ': ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '40px',
        }}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    textAlign: 'center',
                }}
            >
                {/* Logo */}
                <motion.div
                    variants={itemVariants}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            boxShadow: [
                                '0 0 30px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.1)',
                                '0 0 40px rgba(168, 85, 247, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)',
                                '0 0 30px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.1)',
                            ],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: 'easeInOut',
                        }}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, var(--purple-600), var(--purple-800))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '36px', fontWeight: 900, color: 'white' }}>M</span>
                    </motion.div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontSize: '28px',
                        fontWeight: 800,
                        marginBottom: '8px',
                        background: 'linear-gradient(135deg, var(--purple-300), var(--purple-500))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {t.common.appName}
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        marginBottom: '32px',
                    }}
                >
                    {t.login.subtitle}
                </motion.p>

                {/* Login Card */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '16px',
                        padding: '32px 24px',
                        backdropFilter: 'blur(10px)',
                        textAlign: 'center',
                    }}
                >
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                        marginBottom: '20px',
                        lineHeight: 1.6,
                    }}>
                        {t.login.subtitle}
                    </p>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#ef4444', fontSize: '12px', marginBottom: '16px' }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        className="btn-primary"
                        onClick={handleLogin}
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: '14px',
                            fontSize: '15px',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="spin-icon" /> {t.login.loggingIn}
                            </>
                        ) : (
                            <>
                                <LogIn size={18} /> {t.login.loginButton}
                            </>
                        )}
                    </motion.button>

                    {/* Language Selector */}
                    <div style={{ marginTop: 20, position: 'relative' }}>
                        <motion.button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '8px 16px',
                                background: 'transparent',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 8,
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                fontSize: 13,
                                fontWeight: 500,
                            }}
                        >
                            <span>{currentLang.label}</span>
                        </motion.button>

                        {showLangMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: 8,
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 12,
                                    padding: 8,
                                    minWidth: 140,
                                    zIndex: 100,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                }}
                            >
                                {LANGUAGES.map((lang) => (
                                    <motion.button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '10px 12px',
                                            background: lang.code === language ? 'var(--bg-card-hover)' : 'transparent',
                                            border: 'none',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            color: 'var(--text-primary)',
                                            fontSize: 13,
                                            fontWeight: lang.code === language ? 600 : 400,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {lang.label}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
