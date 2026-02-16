import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Home, Activity, Sparkles, ChevronRight, Calendar, Flower } from 'lucide-react';

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'Morning Ritual', path: '/morning-routine', icon: <Flower className="w-5 h-5" /> },
        { name: 'Daily Scan', path: '/scan', icon: <Activity className="w-5 h-5" /> },
        { name: 'AI Insights', path: '/insights', icon: <Sparkles className="w-5 h-5" /> },
        { name: 'History', path: '/history', icon: <Calendar className="w-5 h-5" /> },
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
                    <span className="font-bold tracking-tight text-xl text-white">KOZENDO</span>
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
                </nav>

                <div className="p-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 text-center">
                        Mindfulness Companion v1.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
