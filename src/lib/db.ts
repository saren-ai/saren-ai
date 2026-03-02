import Database from 'better-sqlite3';
import path from 'path';

let db: ReturnType<typeof Database> | null = null;

export function getDb() {
    if (!db) {
        const dbPath = path.join(process.cwd(), 'src', 'data', 'db.sqlite3');
        db = new Database(dbPath, { readonly: true });
    }
    return db;
}

export interface ConcertRecord {
    id: number;
    date_year: number;
    date_month: string;
    date_day: number;
    artist: string;
    venue: string;
    location: string;
}

const monthMap: Record<string, number> = {
    JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
    JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12
};

export function getAllConcerts(): ConcertRecord[] {
    const records = getDb().prepare('SELECT * FROM concerts').all() as ConcertRecord[];

    // Sort ascending by Year -> Month -> Day
    records.sort((a, b) => {
        if (a.date_year !== b.date_year) {
            return a.date_year - b.date_year;
        }
        const monthA = monthMap[a.date_month] || 0;
        const monthB = monthMap[b.date_month] || 0;
        if (monthA !== monthB) {
            return monthA - monthB;
        }
        return a.date_day - b.date_day;
    });

    return records;
}
