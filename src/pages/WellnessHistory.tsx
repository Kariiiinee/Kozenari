import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import { getHistory, calculateVibeCounts, calculateVibeTrend, VIBE_MAP, ScanHistoryItem } from '../services/historyService';

const WellnessHistory: React.FC = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<ScanHistoryItem[]>([]);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [trend, setTrend] = useState<string>('Stable');
    const [loading, setLoading] = useState(true);

    // State for monthly navigation
    const [viewDate, setViewDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getHistory();
                setHistory(data);
                setCounts(calculateVibeCounts(data));
                setTrend(calculateVibeTrend(data));
            } catch (error) {
                console.error('Failed to load history', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getVibeStyle = (vibe: string) => {
        switch (vibe) {
            case 'Hopeful / Inspired': return 'bg-gradient-to-br from-[#13ec13] to-yellow-300 text-white shadow-[#13ec13]/20 shadow-sm';
            case 'Happy / Content': return 'bg-gradient-to-br from-[#13ec13] to-emerald-400 text-white shadow-[#13ec13]/20 shadow-sm';
            case 'Calm / Peaceful': return 'bg-gradient-to-br from-teal-300 to-emerald-200 text-slate-700 shadow-teal-100 shadow-sm';
            case 'Neutral / Steady': return 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-600';
            case 'Thoughtful / Uncertain': return 'bg-gradient-to-br from-indigo-300 to-purple-200 text-white shadow-indigo-100 shadow-sm';
            case 'Sad / Low': return 'bg-gradient-to-br from-blue-400 to-indigo-600 text-white shadow-blue-200 shadow-sm';
            case 'Stressed / Frustrated': return 'bg-gradient-to-br from-rose-400 to-orange-500 text-white shadow-rose-200 shadow-sm';
            default: return 'bg-slate-50 text-slate-200';
        }
    };

    // Map history to ISO dates for calendar lookup
    const historyMap = history.reduce((acc, item) => {
        const dateKey = new Date(item.date).toISOString().split('T')[0];
        acc[dateKey] = item.vibe;
        return acc;
    }, {} as Record<string, string>);

    // Calendar logic for monthly view
    const viewMonth = viewDate.getMonth();
    const viewYear = viewDate.getFullYear();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 for Sunday

    // Generate days for the grid
    const calendarDays = [];
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }
    // Add the actual days
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        calendarDays.push({
            day: d,
            date: dateStr,
            vibe: historyMap[dateStr]
        });
    }

    const handlePrevMonth = () => {
        setViewDate(new Date(viewYear, viewMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewYear, viewMonth + 1, 1));
    };

    if (loading) {
        return (
            <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-[#13ec13] animate-spin" />
                    <p className="text-sm text-slate-400 font-bold tracking-wide">Loading History...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f8f6] font-sans text-slate-800 min-h-screen flex justify-center">
            <main className="w-full max-w-[430px] bg-[#f6f8f6] min-h-screen relative shadow-2xl overflow-y-auto no-scrollbar pb-32">
                <div className="h-12 w-full" />
                <Header title="Wellness History" />

                <div className="px-6 mt-6">
                    {/* Compact Vibe Summary (all 7 in 1 row) */}
                    <section className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-50 mb-6">
                        <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 px-1 text-center">Lifetime Vibes</h2>
                        <div className="flex justify-between items-end gap-1 px-1">
                            {Object.entries(VIBE_MAP).map(([vibe, emoji]) => {
                                const count = counts[vibe] || 0;
                                return (
                                    <div key={vibe} className="flex flex-col items-center flex-1 min-w-0">
                                        <span className={`text-2xl mb-1.5 transition-transform hover:scale-125 cursor-default ${count === 0 ? 'grayscale opacity-30' : ''}`}>{emoji}</span>
                                        <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter text-center leading-none mb-1.5 h-4 flex items-center px-0.5">
                                            {vibe.split(' / ')[0]}
                                        </span>
                                        <div className={`w-full h-7 rounded-lg flex items-center justify-center transition-all ${count > 0 ? 'bg-slate-50 shadow-inner' : 'bg-transparent'}`}>
                                            <span className={`text-xs font-black ${count > 0 ? 'text-slate-800' : 'text-slate-200 opacity-50'}`}>
                                                {count > 0 ? count : '-'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Monthly Calendar View */}
                    <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 mb-6">
                        {/* ... (Header) */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                                {monthName} <span className="text-slate-300 font-medium">{viewYear}</span>
                            </h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handlePrevMonth}
                                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 active:scale-95 transition-all hover:bg-slate-100"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNextMonth}
                                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 active:scale-95 transition-all hover:bg-slate-100"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Day Names Header */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div key={i} className="text-center text-[10px] font-black text-slate-300 uppercase py-1">{day}</div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-3">
                            {calendarDays.map((day, i) => {
                                if (!day) return <div key={i} className="aspect-square" />;
                                return (
                                    <div
                                        key={day.date}
                                        className={`aspect-square rounded-xl flex items-center justify-center relative transition-all duration-500 hover:scale-110 shadow-sm ${day.vibe ? getVibeStyle(day.vibe) : 'bg-white border border-slate-100/80 shadow-none'
                                            }`}
                                    >
                                        {day.vibe ? (
                                            <span className="text-lg animate-in zoom-in-75 spin-in-12 duration-700 ease-out">{VIBE_MAP[day.vibe]}</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-300">{day.day}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Ritual Activity</span>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm bg-[#13ec13]" />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Pos.</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Avg.</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Detailed Logs List */}
                    <section>
                        <h2 className="text-xl font-extrabold tracking-tight mb-4 px-2">Detailed Logs</h2>
                        <div className="space-y-4">
                            {history.length > 0 ? (
                                history.slice().map((item) => (
                                    <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between group hover:border-[#13ec13]/20 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="text-2xl w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center shadow-inner group-hover:bg-white transition-colors">
                                                {VIBE_MAP[item.vibe] || '✨'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{item.vibe}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#13ec13] group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-slate-400 text-sm font-medium">Your ritual starts here.</p>
                                    <button
                                        onClick={() => navigate('/scan')}
                                        className="mt-4 px-8 py-3 bg-[#13ec13] text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#13ec13]/20 active:scale-95 transition-all"
                                    >
                                        Begin Daily Scan
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default WellnessHistory;
