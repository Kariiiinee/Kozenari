import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowUp, Sun, VolumeX, Menu } from 'lucide-react';
import Header from '../components/Header';

const RoutineTransition: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-[430px] bg-white min-h-screen relative flex flex-col shadow-xl overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                        alt="Misty forest"
                        className="w-full h-full object-cover brightness-[0.7]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                </div>

                {/* Header */}
                <Header title="KOZENDO" transparent dark />

                {/* Main Content */}
                <main className="relative z-10 flex-1 px-6 pt-12 flex flex-col items-center">
                    <div className="w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <p className="text-[#13ec13] font-bold text-xs tracking-[0.2em] uppercase mb-2">Daily Transition</p>
                        <h1 className="text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-lg">
                            See you this<br />
                            <span className="font-bold">evening.</span>
                        </h1>
                    </div>

                    {/* Glass Quote Card */}
                    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 text-center relative overflow-hidden transition-all duration-500 hover:bg-white/15 animate-in zoom-in-95 duration-700">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#13ec13]/50 to-transparent"></div>

                        <div className="mb-6 flex justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#13ec13]">
                                <Sun className="w-8 h-8" />
                            </div>
                        </div>

                        <h2 className="italic text-2xl text-white mb-6 leading-relaxed font-serif">
                            "Wishing you a peaceful day ahead."
                        </h2>

                        <div className="h-px w-16 bg-white/20 mx-auto mb-6" />

                        <p className="text-white/70 text-sm leading-relaxed font-light px-2">
                            We'll see you this evening for your scan and wind-down ritual. Until then, <span className="text-white font-medium">breathe deep.</span>
                        </p>
                    </div>
                </main>

                {/* Footer Actions */}
                <footer className="relative z-10 px-6 pb-12 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-2 opacity-60 animate-bounce cursor-pointer" onClick={() => navigate('/scan')}>
                        <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-white">Swipe up to daily scan anyway</p>
                        <ArrowUp className="text-white w-4 h-4" />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default RoutineTransition;
