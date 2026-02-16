import React, { useMemo } from 'react';
import { ScanHistoryItem } from '../services/historyService';

interface VibeTrendGraphProps {
    history: ScanHistoryItem[];
}

const VIBE_SCORES: Record<string, number> = {
    'Hopeful / Inspired': 7,
    'Happy / Content': 6,
    'Calm / Peaceful': 5,
    'Neutral / Steady': 4,
    'Thoughtful / Uncertain': 3,
    'Sad / Low': 2,
    'Stressed / Frustrated': 1
};

const VibeTrendGraph: React.FC<VibeTrendGraphProps> = ({ history }) => {
    const dataPoints = useMemo(() => {
        // Get last 7 days of data, reversed to show oldest to newest
        const recentHistory = [...history].reverse().slice(-7);

        return recentHistory.map((item, index) => {
            const score = item.vibe ? VIBE_SCORES[item.vibe] || 4 : 4;
            return { index, score, date: item.timestamp };
        });
    }, [history]);

    // If less than 2 points, we can't really draw a line
    if (dataPoints.length < 2) {
        return (
            <div className="w-full h-32 flex items-center justify-center text-[10px] text-white/20 bg-white/5 rounded-2xl border border-white/10 border-dashed mb-6 uppercase tracking-widest font-bold">
                Complete more scans to see your trend
            </div>
        );
    }

    // Graph dimensions
    const width = 100;
    const height = 50;
    const padding = 5;

    // Calculate points
    const points = dataPoints.map((point, i) => {
        const x = padding + (i / (dataPoints.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((point.score - 1) / 6) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    // Area path (close the loop at the bottom)
    const areaPath = `${points} ${width - padding},${height} ${padding},${height}`;

    return (
        <div className="w-full mb-2">
            <div className="relative w-full aspect-[2.5/1] bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#13ec13" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#13ec13" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="white" strokeWidth="0.2" strokeOpacity="0.05" strokeDasharray="2" />

                    {/* Area Fill */}
                    <path d={`M ${areaPath} Z`} fill="url(#trendGradient)" />

                    {/* Trend Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#13ec13"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_8px_rgba(19,236,19,0.3)]"
                    />

                    {/* Dots */}
                    {dataPoints.map((point, i) => {
                        const x = padding + (i / (dataPoints.length - 1)) * (width - 2 * padding);
                        const y = height - padding - ((point.score - 1) / 6) * (height - 2 * padding);
                        return (
                            <circle key={i} cx={x} cy={y} r="1.2" fill="#13ec13" />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default VibeTrendGraph;
