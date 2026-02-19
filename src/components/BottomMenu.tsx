import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const BottomMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { profile } = useAuth();

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/40 backdrop-blur-xl border-t border-white/5 py-3 px-6 z-40">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate('/')}
                    className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${location.pathname === '/' ? 'text-[#13ec13]' : 'text-white/50 hover:text-white'}`}
                >
                    <span className="material-icons-outlined text-2xl">home</span>
                    <span className="text-[10px] font-medium tracking-wide uppercase">{t('navigation.home')}</span>
                </button>
                <button
                    onClick={() => navigate('/community')}
                    className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${location.pathname === '/community' ? 'text-[#13ec13]' : 'text-white/50 hover:text-white'}`}
                >
                    <span className="material-icons-outlined text-2xl">diversity_1</span>
                    <span className="text-[10px] font-medium tracking-wide uppercase">{t('navigation.community')}</span>
                </button>
                <button
                    onClick={() => navigate('/morning-routine')}
                    className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${location.pathname === '/morning-routine' ? 'text-[#13ec13]' : 'text-white/50 hover:text-white'}`}
                >
                    <span className="material-icons-outlined text-2xl">self_improvement</span>
                    <span className="text-[10px] font-medium tracking-wide uppercase">{t('common.daily_ritual').split(' ')[0]}</span>
                </button>
                <button
                    onClick={() => profile ? navigate('/profile-creation') : navigate('/login')}
                    className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${location.pathname === '/profile-creation' ? 'text-[#13ec13]' : 'text-white/50 hover:text-white'}`}
                >
                    <span className="material-icons-outlined text-2xl">person</span>
                    <span className="text-[10px] font-medium tracking-wide uppercase">{t('navigation.profile')}</span>
                </button>
            </div>
        </nav>
    );
};

export default BottomMenu;
