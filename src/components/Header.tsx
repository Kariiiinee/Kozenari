import React, { useState } from 'react';
import { Flower, Menu, Volume2, VolumeX, Globe } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import { useAudio } from '../context/AudioContext';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    title?: string;
    transparent?: boolean;
    dark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = 'KOZENARI', transparent = false, dark = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isPlaying, togglePlay } = useAudio();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <header className={`relative z-50 pt-11 px-6 pb-4 flex items-center justify-between ${transparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md sticky top-0'}`}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#13ec13] flex items-center justify-center shadow-lg">
                        <Flower className="text-white w-5 h-5" />
                    </div>
                    <span className={`font-bold tracking-tight text-xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className={`group p-2 rounded-full transition-all active:scale-95 flex items-center gap-1.5 px-3 min-w-[64px] justify-center ${i18n.language === 'fr'
                            ? 'bg-[#13ec13]/20 text-[#13ec13] border-[#13ec13]/30 shadow-[0_0_15px_rgba(19,236,19,0.2)]'
                            : dark
                                ? 'bg-white/10 text-white backdrop-blur-md border-white/10'
                                : 'bg-slate-50 text-slate-600 border border-slate-100'}`}
                        title={t('languages.' + (i18n.language === 'en' ? 'fr' : 'en'))}
                    >
                        <Globe className={`w-4 h-4 transition-colors ${i18n.language === 'fr' ? 'text-[#13ec13]' : 'opacity-70'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 w-4 text-center ${i18n.language.startsWith('fr') ? 'text-[#13ec13]' : ''}`}>
                            <span className="group-hover:hidden whitespace-nowrap">
                                {i18n.language.substring(0, 2).toUpperCase()}
                            </span>
                            <span className="hidden group-hover:inline whitespace-nowrap opacity-60">
                                {i18n.language.startsWith('en') ? 'FR' : 'EN'}
                            </span>
                        </span>
                    </button>
                    <button
                        onClick={togglePlay}
                        className={`p-2 rounded-full transition-all active:scale-90 ${dark ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}
                        title={isPlaying ? t('header.pause_music') : t('header.play_music')}
                    >
                        {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse text-[#13ec13]" /> : <VolumeX className="w-5 h-5 opacity-60" />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`p-2 rounded-full transition-all active:scale-90 ${dark ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
