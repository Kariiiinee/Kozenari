import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Home, Activity, Sparkles, ChevronRight, Calendar, Flower, Users, User, LogOut, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { profile, signOut } = useAuth();

    const menuItems = [
        { name: t('navigation.home'), path: '/', icon: <Home className="w-5 h-5" /> },
        { name: t('navigation.morning_ritual'), path: '/morning-routine', icon: <Flower className="w-5 h-5" /> },
        { name: t('navigation.daily_scan'), path: '/scan', icon: <Activity className="w-5 h-5" /> },
        { name: t('navigation.ai_insights'), path: '/insights', icon: <Sparkles className="w-5 h-5" /> },
        { name: t('navigation.history'), path: '/history', icon: <Calendar className="w-5 h-5" /> },
        { name: t('navigation.community'), path: '/community', icon: <Users className="w-5 h-5" /> },
    ];

    const guestItems = [
        { name: t('auth.create_account'), path: '/login', icon: <UserPlus className="w-5 h-5" /> },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div className="relative w-80 h-full bg-black/60 backdrop-blur-3xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/10">
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                    <span className="font-bold tracking-tight text-xl text-white">{t('common.app_name')}</span>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/60 active:scale-90 transition-all hover:bg-white/20"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-6 space-y-3 mt-4">
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all active:scale-95 group ${active
                                    ? 'bg-[#13ec13] text-slate-900 shadow-lg shadow-[#13ec13]/20'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`${active ? 'text-slate-900' : 'text-[#13ec13] group-hover:scale-110 transition-transform'}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-bold">{item.name}</span>
                                </div>
                                <ChevronRight className={`w-5 h-5 opacity-50 ${active ? 'text-slate-900' : 'text-white/40'}`} />
                            </button>
                        );
                    })}

                    {!profile && (
                        <div className="pt-4 space-y-3">
                            {guestItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl transition-all active:scale-95 group bg-[#13ec13]/10 text-[#13ec13] hover:bg-[#13ec13]/20 border border-[#13ec13]/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <span className="font-bold">{item.name}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 opacity-50" />
                                </button>
                            ))}
                        </div>
                    )}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-6">
                    {profile && (
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl overflow-hidden">
                                {profile.avatar_url.startsWith('http') ? (
                                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    profile.avatar_url
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold truncate">{profile.display_name}</p>
                                <p className="text-white/40 text-xs truncate">{profile.country}</p>
                            </div>
                            <button
                                onClick={signOut}
                                className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 text-center">
                        {t('common.version_info')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
