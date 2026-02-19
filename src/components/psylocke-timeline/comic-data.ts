export interface ComicData {
    id: string;
    image: string;
    publisher: string;
    title: string;
    volume: string;
    issueNumber: string;
    releaseDate: string;
}

// Generate 27 mock entries for the timeline development
export const comicsData: ComicData[] = Array.from({ length: 27 }, (_, i) => ({
    id: `comic-${i + 1}`,
    image: `https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop`, // Placeholder cover image
    publisher: "Marvel Comics",
    title: i % 2 === 0 ? "Uncanny X-Men" : "X-Men",
    volume: "Vol 1",
    issueNumber: `#${250 + i}`,
    releaseDate: `19${89 + Math.floor(i / 12)}`,
}));
