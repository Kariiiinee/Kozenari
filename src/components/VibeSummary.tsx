import React, { useMemo } from 'react';
import { ScanHistoryItem } from '../services/historyService';

interface VibeSummaryProps {
    history: ScanHistoryItem[];
}

const VIBES = [
    { id: 'hopeful', emoji: '✨', label: 'Hopeful / Inspired' },
    { id: 'happy', emoji: '😊', label: 'Happy / Content' },
    { id: 'calm', emoji: '😌', label: 'Calm / Peaceful' },
    { id: 'neutral', emoji: '😐', label: 'Neutral / Steady' },
    { id: 'thoughtful', emoji: '🤔', label: 'Thoughtful / Uncertain' },
    { id: 'sad', emoji: '😔', label: 'Sad / Low' },
    { id: 'stressed', emoji: '😤', label: 'Stressed / Frustrated' }
];

const VibeSummary: React.FC<VibeSummaryProps> = ({ history }) => {
    const counts = useMemo(() => {
        const tempCounts: Record<string, number> = {};
        VIBES.forEach(v => tempCounts[v.id] = 0);

        history.forEach(item => {
            if (!item.vibe) return;

            // Check if item.vibe is an ID
            if (tempCounts[item.vibe] !== undefined) {
                tempCounts[item.vibe]++;
            } else {
                // Fallback for legacy label-based vibes
                const found = VIBES.find(v => v.label === item.vibe);
                if (found) {
                    tempCounts[found.id]++;
                }
            }
        });
        return tempCounts;
    }, [history]);

    return (
        <div className="w-full px-4 pt-4 pb-2">
            <div className="grid grid-cols-7 gap-1">
                {VIBES.map((vibe) => (
                    <div
                        key={vibe.id}
                        className="flex flex-col items-center justify-center bg-white/5 rounded-xl p-1.5 border border-white/5 shadow-sm transition-colors hover:bg-white/10"
                    >
                        <span className="text-xl mb-0.5">{vibe.emoji}</span>
                        <span className="text-[10px] font-bold text-white/70">{counts[vibe.id]}</span>
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
