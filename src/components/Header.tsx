import React, { useState } from 'react';
import { Flower, Menu } from 'lucide-react';
import NavigationMenu from './NavigationMenu';

interface HeaderProps {
    title?: string;
    transparent?: boolean;
    dark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = 'KOZENDO', transparent = false, dark = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className={`relative z-50 pt-11 px-6 pb-4 flex items-center justify-between ${transparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md sticky top-0'}`}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#13ec13] flex items-center justify-center shadow-lg">
                        <Flower className="text-white w-5 h-5" />
                    </div>
                    <span className={`font-bold tracking-tight text-xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</span>
                </div>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className={`p-2 rounded-full transition-all active:scale-90 ${dark ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>
            <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
