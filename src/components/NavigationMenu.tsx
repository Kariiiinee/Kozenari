import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Home, Activity, Sparkles, BarChart2, ChevronRight } from 'lucide-react';

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'Daily Scan', path: '/scan', icon: <Activity className="w-5 h-5" /> },
        { name: 'AI Insights', path: '/insights', icon: <Sparkles className="w-5 h-5" /> },
        { name: 'Health Stats', path: '/stats', icon: <BarChart2 className="w-5 h-5" /> },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div className="relative w-72 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                    <span className="font-black tracking-tighter text-xl">KOZENDO</span>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 active:scale-90 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all active:scale-95 ${active
                                        ? 'bg-[#13ec13] text-white shadow-lg shadow-[#13ec13]/20'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`${active ? 'text-white' : 'text-[#13ec13]'}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-bold">{item.name}</span>
                                </div>
                                <ChevronRight className={`w-5 h-5 opacity-50 ${active ? 'text-white' : ''}`} />
                            </button>
                        );
                    })}
                </nav>

                <div className="p-8 border-t border-slate-50">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-300 text-center">
                        Version 1.0.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
