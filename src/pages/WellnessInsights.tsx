import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Brain, Accessibility, Droplets, Wind, Bookmark, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import { generateAIInsights, AIInsight } from '../services/aiService';
import { saveScanToHistory } from '../services/historyService';

const WellnessInsights: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scanData = location.state?.scanData;

    const [loading, setLoading] = React.useState(true);
    const [insight, setInsight] = React.useState<AIInsight | null>(null);
    const [activeActionId, setActiveActionId] = React.useState<number | null>(null);
    const [isSaved, setIsSaved] = React.useState(false);

    const handleSaveToHistory = async () => {
        if (!scanData || !insight) return;

        await saveScanToHistory({
            vibe: scanData.vibe,
            body: scanData.body,
            heart: scanData.heart,
            environment: scanData.environment,
            reflection: scanData.reflection,
            insight: insight.mainInsight,
            microActions: insight.microActions,
            upliftingQuote: insight.upliftingQuote,
            breathAction: scanData.breathAction
        });

        setIsSaved(true);
        setTimeout(() => {
            navigate('/history');
        }, 1500);
    };

    React.useEffect(() => {
        const fetchInsights = async () => {
            if (scanData) {
                const results = await generateAIInsights(scanData);
                setInsight(results);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        fetchInsights();
    }, [scanData]);

    if (loading) {
        return (
            <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex justify-center">
                <main className="w-full max-w-[430px] h-screen bg-black relative flex flex-col shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                            alt="Misty forest"
                            className="w-full h-full object-cover brightness-[0.5]"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <Header title="KOZENDO" transparent dark />

                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#13ec13]/30 rounded-full blur-3xl animate-pulse" />
                            <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl">
                                <Brain className="w-16 h-16 text-[#13ec13] animate-bounce" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-light tracking-tight text-white">Personalizing Your <span className="font-bold">Flow</span></h2>
                            <div className="flex items-center justify-center gap-2 text-[#13ec13] font-bold uppercase tracking-[0.2em] text-[10px]">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>AI is thinking...</span>
                            </div>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed px-4 max-w-sm">
                            Analyzing your scan results to create a unique micro-routine just for you.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    if (!insight) {
        return (
            <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex justify-center">
                <main className="w-full max-w-[430px] h-screen bg-black relative flex flex-col shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                            alt="Misty forest"
                            className="w-full h-full object-cover brightness-[0.5]"
                        />
                    </div>
                    <Header title="KOZENDO" transparent dark />
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 relative z-10">
                        <p className="text-white/60">No scan data found. Please complete a scan first.</p>
                        <button
                            onClick={() => navigate('/scan')}
                            className="bg-[#13ec13] text-slate-900 font-bold px-8 py-4 rounded-2xl active:scale-95 transition-all shadow-lg"
                        >
                            Start Scan
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex justify-center">
            <main className="relative w-full max-w-[430px] h-screen bg-black overflow-hidden flex flex-col shadow-2xl">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                        alt="Misty forest"
                        className="w-full h-full object-cover brightness-[0.7]"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                </div>

                {/* Header Navigation */}
                <Header title="KOZENDO" transparent dark />

                {/* Main Content Scroll Area */}
                <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32 relative z-10 no-scrollbar">
                    {/* Analysis Badge */}
                    <div className="flex flex-col items-center mb-10 gap-2">
                        <div className="inline-flex items-center gap-2 bg-[#13ec13]/20 border border-[#13ec13]/30 px-5 py-2 rounded-full backdrop-blur-md">
                            <Sparkles className="text-[#13ec13] w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#13ec13]">Analysis Complete</span>
                        </div>

                        {insight.debugError && (
                            <div className="bg-amber-500/20 border border-amber-500/30 text-amber-200 text-[10px] px-3 py-1 rounded-lg max-w-xs text-center font-medium animate-pulse">
                                DEBUG: {insight.debugError}
                            </div>
                        )}
                    </div>

                    {/* The Insight Glass Card */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 relative overflow-hidden mb-10 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#13ec13]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#13ec13] rounded-2xl flex items-center justify-center shadow-lg shadow-[#13ec13]/30">
                                <Brain className="text-slate-900 w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-light tracking-tight text-white">Your Daily <span className="font-bold">Insight</span></h1>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">AI Mindful Assistant</p>
                            </div>
                        </div>

                        {/* Acknowledgment */}
                        <div className="mb-10 min-h-[120px]">
                            <p className="text-xl leading-relaxed font-light text-white/90 italic font-serif">
                                "{insight.mainInsight}"
                            </p>
                        </div>

                        {/* Micro Actions */}
                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-white/10" />
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#13ec13]">Micro-Actions</h3>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {insight.microActions.map(action => (
                                <div
                                    key={action.id}
                                    onClick={() => setActiveActionId(activeActionId === action.id ? null : action.id)}
                                    className={`relative flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-[0.98] ${activeActionId === action.id
                                        ? 'bg-white/20 border-[#13ec13]/40 shadow-xl'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeActionId === action.id
                                            ? 'bg-[#13ec13] text-slate-900 shadow-[0_0_15px_rgba(19,236,19,0.4)]'
                                            : 'bg-white/10 text-[#13ec13]'
                                            }`}>
                                            {action.icon === 'accessibility_new' && <Accessibility className="w-6 h-6" />}
                                            {action.icon === 'water_drop' && <Droplets className="w-6 h-6" />}
                                            {action.icon === 'air' && <Wind className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1">
                                            <span className={`font-bold text-sm transition-colors ${activeActionId === action.id ? 'text-white' : 'text-white/80'}`}>
                                                {action.text}
                                            </span>
                                        </div>
                                        <ChevronLeft className={`w-4 h-4 text-white/20 transition-transform ${activeActionId === action.id ? '-rotate-90' : ''}`} />
                                    </div>

                                    {/* Instruction Expansion */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeActionId === action.id ? 'max-h-32 opacity-100 pb-2' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="pl-16 pr-2">
                                            <p className="text-xs text-white/50 leading-relaxed font-light">
                                                {action.instruction}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Uplifting Quote */}
                        <div className="border-t border-white/10 pt-8 mt-4">
                            <p className="italic text-center text-white/70 font-light text-lg px-2 font-serif">
                                "{insight.upliftingQuote}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer Actions */}
                <div className="absolute bottom-0 left-0 w-full px-6 pb-10 pt-4 bg-gradient-to-t from-black/20 via-black/10 to-transparent flex flex-col gap-3 z-20">
                    <button
                        onClick={handleSaveToHistory}
                        disabled={isSaved}
                        className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 ${isSaved
                            ? 'bg-white/10 text-white/40 cursor-default border border-white/10'
                            : 'bg-[#13ec13] text-slate-900 shadow-[#13ec13]/30 hover:shadow-[#13ec13]/50'
                            }`}
                    >
                        {isSaved ? (
                            <>
                                <CheckCircle2 className="w-5 h-5 text-[#13ec13]" />
                                <span>Journey Recorded</span>
                            </>
                        ) : (
                            <>
                                <Bookmark className="w-5 h-5" />
                                <span>Save Entry</span>
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default WellnessInsights;
