export interface ScanHistoryItem {
    id: string;
    date: string; // ISO string
    vibe: string;
    body: string;
    heart: string;
    environment: string;
    reflection: string;
    insight: string;
}

const HISTORY_KEY = 'kozendo_wellness_history';

export const VIBE_MAP: Record<string, string> = {
    'Hopeful / Inspired': '✨',
    'Happy / Content': '😊',
    'Calm / Peaceful': '😌',
    'Neutral / Steady': '😐',
    'Thoughtful / Uncertain': '🤔',
    'Sad / Low': '😔',
    'Stressed / Frustrated': '😤'
};

export const saveScanToHistory = (scan: Omit<ScanHistoryItem, 'id' | 'date'>): void => {
    const history = getHistory();
    const newItem: ScanHistoryItem = {
        ...scan,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
    };

    history.push(newItem);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = (): ScanHistoryItem[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
};

export const getVibeCounts = () => {
    const history = getHistory();
    const counts: Record<string, number> = {};

    // Initialize all with 0
    Object.keys(VIBE_MAP).forEach(vibe => {
        counts[vibe] = 0;
    });

    history.forEach(item => {
        if (counts[item.vibe] !== undefined) {
            counts[item.vibe]++;
        }
    });

    return counts;
};

export const getVibeTrend = () => {
    const history = getHistory();
    if (history.length < 2) return 'Stable';

    const last = history[history.length - 1].vibe;
    const prev = history[history.length - 2].vibe;

    if (last === prev) return 'Same as yesterday';

    const hierarchy: Record<string, number> = {
        'Hopeful / Inspired': 4,
        'Happy / Content': 3,
        'Calm / Peaceful': 2,
        'Neutral / Steady': 1,
        'Thoughtful / Uncertain': 0,
        'Sad / Low': -1,
        'Stressed / Frustrated': -2
    };

    const lastVal = hierarchy[last] ?? 0;
    const prevVal = hierarchy[prev] ?? 0;

    if (lastVal > prevVal) return 'Improving vibe';
    return 'Declining vibe';
};
