import ConcertsClient from "./ConcertsClient";
import { Metadata } from "next";
import { getAllConcerts } from "@/lib/db";

export const metadata: Metadata = {
    title: "I Saw All Sub-Cultural Bands | Saren",
    description: "A chronological calendar of my concert history.",
};

// Next.js dynamic rendering because of database reading from filesystem
export const dynamic = 'force-dynamic';

export default function ConcertsPage() {
    // Read from the newly created SQLite Database!
    const concerts = getAllConcerts();

    return <ConcertsClient concerts={concerts} />;
}
