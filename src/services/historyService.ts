export interface ScanHistoryItem {
    id: string;
    date: string; // ISO string
    vibe: string;
    body: string;
    heart: string;
    environment: string;
    reflection: string;
    insight: string;
    breathAction?: string; // Added optional field
    microActions?: any[]; // Added optional field
}

export const VIBE_MAP: Record<string, string> = {
    'Hopeful / Inspired': '✨',
    'Happy / Content': '😊',
    'Calm / Peaceful': '😌',
    'Neutral / Steady': '😐',
    'Thoughtful / Uncertain': '🤔',
    'Sad / Low': '😔',
    'Stressed / Frustrated': '😤'
};

// Simple User ID management for now
export const getUserId = () => {
    let userId = localStorage.getItem('kozendo_user_id');
    if (!userId) {
        userId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('kozendo_user_id', userId);
    }
    return userId;
};

export const saveScanToHistory = async (scan: Omit<ScanHistoryItem, 'id' | 'date'>): Promise<void> => {
    const userId = getUserId();

    try {
        await fetch('/api/history/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...scan, userId })
        });
    } catch (error) {
        console.error('Failed to save scan:', error);
        // Fallback or offline queue could go here
    }
};

export const getHistory = async (): Promise<ScanHistoryItem[]> => {
    const userId = getUserId();

    try {
        const response = await fetch(`/api/history/get?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            return data.scans || [];
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch history:', error);
        return [];
    }
};

// Helper to calculate counts from a provided history array (synchronous)
export const calculateVibeCounts = (history: ScanHistoryItem[]) => {
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

// Helper to calculate trend from a provided history array (synchronous)
export const calculateVibeTrend = (history: ScanHistoryItem[]) => {
    if (history.length < 2) return 'Stable';

    const last = history[0].vibe; // Most recent is first in the API response usually
    const prev = history[1].vibe;

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
