import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScanHistoryItem } from '../services/historyService';

interface CalendarViewProps {
    history: ScanHistoryItem[];
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const VIBE_EMOJIS: Record<string, string> = {
    'Hopeful / Inspired': '✨',
    'Happy / Content': '😊',
    'Calm / Peaceful': '😌',
    'Neutral / Steady': '😐',
    'Thoughtful / Uncertain': '🤔',
    'Sad / Low': '😔',
    'Stressed / Frustrated': '😤'
};

const CalendarView: React.FC<CalendarViewProps> = ({ history }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const calendarDays = useMemo(() => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);

        // Map vibes to dates
        const historyMap: Record<number, string> = {};
        history.forEach(item => {
            const itemDate = new Date(item.timestamp);
            if (
                itemDate.getMonth() === currentDate.getMonth() &&
                itemDate.getFullYear() === currentDate.getFullYear()
            ) {
                // Use the latest vibe for the day if multiple exist
                historyMap[itemDate.getDate()] = item.vibe || '';
            }
        });

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
        }

        for (let i = 1; i <= totalDays; i++) {
            const vibe = historyMap[i];
            const hasVibe = !!vibe;
            const emoji = vibe ? VIBE_EMOJIS[vibe] : null;

            days.push(
                <div
                    key={i}
                    className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all relative
                        ${hasVibe
                            ? 'bg-[#13ec13]/20 border border-[#13ec13]/30 shadow-lg shadow-[#13ec13]/10'
                            : 'text-white/40 hover:bg-white/5'
                        }`}
                >
                    {emoji ? (
                        <span className="text-lg animate-in zoom-in duration-300">{emoji}</span>
                    ) : (
                        <span>{i}</span>
                    )}

                    {/* Small indicator dot for today if no vibe logged yet */}
                    {!hasVibe &&
                        new Date().getDate() === i &&
                        new Date().getMonth() === currentDate.getMonth() &&
                        new Date().getFullYear() === currentDate.getFullYear() && (
                            <div className="absolute bottom-1 w-1 h-1 bg-[#13ec13] rounded-full" />
                        )}
                </div>
            );
        }

        return days;
    }, [currentDate, history]);

    return (
        <div className="w-full mb-6">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold text-white">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {WEEKDAYS.map((day, index) => (
                    <div key={index} className="text-[10px] font-bold text-white/20 h-8 flex items-center justify-center uppercase tracking-widest">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 justify-items-center">
                {calendarDays}
            </div>
        </div>
    );
};

export default CalendarView;
