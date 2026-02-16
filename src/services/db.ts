import Dexie, { Table } from 'dexie';

export interface ScanHistoryItem {
    id?: string; // Optional because Dexie can auto-generate, but we use UUIDs currently
    timestamp: number;
    vibe: string | null;
    body: string;
    heart: string;
    environment: string;
    reflection: string;
    insight: string;
    microActions?: { id: number; text: string; instruction: string; icon: string }[];
    upliftingQuote?: string;
    breathAction?: string;
}

export class KozendoDatabase extends Dexie {
    scans!: Table<ScanHistoryItem>;

    constructor() {
        super('KozendoDB');
        this.version(1).stores({
            scans: 'id, timestamp, vibe' // Primary key and indexed props
        });
    }
}

export const db = new KozendoDatabase();
