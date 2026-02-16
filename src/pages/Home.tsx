import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, Quote } from 'lucide-react';
import { mockData } from '../data/mockData';
import Header from '../components/Header';
import quotes from '../data/quotesData.json';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const greeting = getGreeting();
    const isMorning = new Date().getHours() < 12;
    const targetPath = isMorning ? '/morning-routine' : '/scan';

    const getDayOfYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now as any) - (start as any);
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    const dayOfYear = getDayOfYear();
    const dailyQuote = quotes.find(q => q.day === ((dayOfYear - 1) % 365) + 1) || quotes[0];

    const getThemeLabel = (theme: string) => {
        switch (theme) {
            case 'ZEN': return 'Presence • Stillness • Mindfulness';
            case 'CALM': return 'Peace • Stress Relief • Gentleness';
            case 'MOTIVATION': return 'Action • Courage • Purpose';
            default: return theme;
        }
    };


    return (
        <main className="relative h-screen w-full max-w-[430px] mx-auto overflow-hidden shadow-2xl font-sans bg-[#f6f8f6]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={mockData.home.backgroundImage}
                    alt="Morning sunrise"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#102210]/30 via-transparent to-[#102210]/40" />
            </div>

            {/* Header */}
            <Header transparent dark />

            {/* Main Content Area */}
            <div className="relative z-10 px-6 pt-12 flex flex-col h-[calc(100%-180px)]">
                {/* Greeting Section */}
                <section className="mb-12">
                    <p className="text-[#13ec13] font-semibold tracking-wide uppercase text-xs mb-1">Daily Ritual</p>
                    <h1 className="text-4xl text-white font-light leading-tight">
                        {greeting},<br />
                        {mockData.user.isMember && <span className="font-bold">{mockData.user.name}.</span>}
                    </h1>
                </section>

                {/* Daily Quote Card */}
                <section
                    className="mt-4 bg-white/10 backdrop-blur-md p-6 xs:p-8 rounded-[2rem] relative overflow-hidden border border-white/20 cursor-pointer transition-all active:scale-95 group flex flex-col justify-center min-h-[220px] animate-in zoom-in-95 duration-700"
                    onClick={() => navigate(targetPath)}
                >
                    {/* Theme Badge */}
                    <div className="flex items-center gap-2 mb-4 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#13ec13]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#13ec13]/80">
                            {dailyQuote.theme}
                        </span>
                        <span className="text-[9px] font-bold text-white/40 opacity-60">
                            {getThemeLabel(dailyQuote.theme)}
                        </span>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                        <div className="mb-4">
                            <Quote className="w-6 h-6 xs:w-8 xs:h-8 text-[#13ec13] opacity-20 mb-1" />
                            <p className="font-serif text-xl xs:text-2xl leading-tight italic text-white group-hover:text-[#13ec13] transition-colors">
                                {dailyQuote.text}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 xs:gap-3 shrink-0">
                            <div className="h-[1px] w-6 xs:w-8 bg-[#13ec13]/40"></div>
                            <p className="text-[10px] xs:text-sm font-semibold tracking-wider text-white/60 uppercase">{dailyQuote.author}</p>
                        </div>
                    </div>
                </section>

                {/* Swipe Up Hint */}
                <div
                    className="mt-auto flex flex-col items-center gap-2 pb-8 opacity-60 cursor-pointer"
                    onClick={() => navigate(targetPath)}
                >
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Swipe up to start ritual</p>
                    <ArrowUp className="text-white w-4 h-4 animate-bounce" />
                </div>
            </div>


            {/* Bottom space for native feel */}
            <div className="h-8"></div>
        </main>
    );
};

export default Home;
