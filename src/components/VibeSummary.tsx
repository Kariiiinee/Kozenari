import React, { useMemo } from 'react';
import { ScanHistoryItem } from '../services/historyService';

interface VibeSummaryProps {
    history: ScanHistoryItem[];
}

const VIBES = [
    { emoji: '✨', label: 'Hopeful / Inspired' },
    { emoji: '😊', label: 'Happy / Content' },
    { emoji: '😌', label: 'Calm / Peaceful' },
    { emoji: '😐', label: 'Neutral / Steady' },
    { emoji: '🤔', label: 'Thoughtful / Uncertain' },
    { emoji: '😔', label: 'Sad / Low' },
    { emoji: '😤', label: 'Stressed / Frustrated' }
];

const VibeSummary: React.FC<VibeSummaryProps> = ({ history }) => {
    const counts = useMemo(() => {
        const tempCounts: Record<string, number> = {};
        VIBES.forEach(v => tempCounts[v.label] = 0);

        history.forEach(item => {
            if (item.vibe && tempCounts[item.vibe] !== undefined) {
                tempCounts[item.vibe]++;
            }
        });
        return tempCounts;
    }, [history]);

    return (
        <div className="w-full px-4 pt-4 pb-2">
            <div className="grid grid-cols-7 gap-1">
                {VIBES.map((vibe) => (
                    <div
                        key={vibe.label}
                        className="flex flex-col items-center justify-center bg-white/5 rounded-xl p-1.5 border border-white/5 shadow-sm transition-colors hover:bg-white/10"
                    >
                        <span className="text-xl mb-0.5">{vibe.emoji}</span>
                        <span className="text-[10px] font-bold text-white/70">{counts[vibe.label]}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-1 mt-2">
                {VIBES.map((vibe) => (
                    <span key={vibe.label + 'text'} className="text-[7px] text-white/30 font-bold uppercase tracking-wider text-center w-full truncate px-0.5">
                        {vibe.label.split('/')[0].trim()}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default VibeSummary;
