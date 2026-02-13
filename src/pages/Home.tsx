import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { mockData } from '../data/mockData';
import Header from '../components/Header';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const greeting = getGreeting();

    return (
        <main className="relative h-screen w-full max-w-[430px] mx-auto overflow-hidden shadow-2xl font-sans bg-[#f6f8f6]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={mockData.home.backgroundImage}
                    alt="Misty forest"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#102210]/20 via-transparent to-[#102210]/30" />
            </div>

            {/* Header */}
            <Header transparent dark />

            {/* Main Content Area */}
            <div className="relative z-10 px-6 pt-12 flex flex-col h-[calc(100%-180px)]">
                {/* Greeting Section */}
                <section className="mb-12">
                    <p className="text-[#13ec13] font-semibold tracking-wide uppercase text-xs mb-1">Morning Ritual</p>
                    <h1 className="text-4xl text-white font-light leading-tight">
                        {greeting},<br />
                        {mockData.user.isMember && <span className="font-bold">{mockData.user.name}.</span>}
                    </h1>
                </section>

                {/* Daily Quote Card */}
                <section
                    className="mt-4 bg-white/40 backdrop-blur-xl p-8 rounded-[1rem] relative overflow-hidden border border-white/20 cursor-pointer transition-all active:scale-95"
                    onClick={() => navigate('/scan')}
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-6xl text-[#13ec13] font-serif">"</span>
                    </div>
                    <div className="relative z-10">
                        <p className="font-serif text-2xl leading-relaxed italic text-slate-900 mb-6">
                            "{mockData.home.quote}"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-[#13ec13]/40"></div>
                            <p className="text-sm font-semibold tracking-wider text-slate-700 uppercase">{mockData.home.author}</p>
                        </div>
                    </div>
                </section>

                {/* Swipe Up Hint */}
                <div
                    className="mt-auto flex flex-col items-center gap-2 pb-8 opacity-60 cursor-pointer"
                    onClick={() => navigate('/stats')}
                >
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Swipe up for insights</p>
                    <ArrowUp className="text-white w-4 h-4 animate-bounce" />
                </div>
            </div>


            {/* Bottom space for native feel */}
            <div className="h-8"></div>
        </main>
    );
};

export default Home;
