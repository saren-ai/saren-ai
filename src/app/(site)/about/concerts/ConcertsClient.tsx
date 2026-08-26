"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { ConcertRecord } from "@/lib/db";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

export default function ConcertsClient({ concerts }: { concerts: ConcertRecord[] }) {
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());

    const toggleOpen = (id: number) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Grouping concerts by Year
    const groupedByYear = concerts.reduce((acc, current) => {
        if (!acc[current.date_year]) {
            acc[current.date_year] = [];
        }
        acc[current.date_year].push(current);
        return acc;
    }, {} as Record<number, ConcertRecord[]>);

    const yearsAscending = Object.keys(groupedByYear).map(Number).sort((a, b) => a - b);

    return (
        <article className="min-h-screen bg-offblack text-ash pb-24 font-sans selection:bg-ember/30 selection:text-white">
            {/* Navigation Header */}
            <div className="container-narrow py-8">
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-ash/60 hover:text-ember transition-colors text-sm font-mono uppercase tracking-wider"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to About
                </Link>
            </div>

            {/* Header Section */}
            <section className="section pt-0 pb-16 border-b border-ash/5">
                <div className="container-narrow">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-ash/20 w-12" />
                            <span className="text-sm font-mono text-ember uppercase tracking-wider">Live Music Archive</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white tracking-tight">
                            I Saw All the Best Bands
                        </h1>
                        <p className="text-xl md:text-2xl text-ash/70 leading-relaxed font-light">
                            My chronological calendar of every show, festival, and concert mapped meticulously by date and venue for absolute posterity.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-narrow pt-16">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-24"
                >
                    {yearsAscending.map((year) => {
                        const yearConcerts = groupedByYear[year];
                        return (
                            <motion.section
                                variants={fadeUp}
                                key={year}
                                className="relative grid md:grid-cols-[150px_1fr] gap-8 md:gap-16 items-start"
                            >
                                {/* Year Label Sticky Column */}
                                <div className="md:sticky top-24 pt-4 md:border-t-4 border-ember/50">
                                    <h2 className="text-5xl md:text-6xl font-black text-ash/20 tracking-tighter">
                                        {year}
                                    </h2>
                                    <div className="mt-4 text-xs font-mono text-ash/50 uppercase tracking-widest hidden md:block">
                                        {yearConcerts.length} shows
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="space-y-6">
                                    {(() => {
                                        // Group concerts for this year by date + venue
                                        const groupedByDateVenue = yearConcerts.reduce((acc, concert) => {
                                            const key = `${concert.date_month}-${concert.date_day}-${concert.venue}`;
                                            if (!acc[key]) {
                                                acc[key] = [];
                                            }
                                            acc[key].push(concert);
                                            return acc;
                                        }, {} as Record<string, ConcertRecord[]>);

                                        return Object.values(groupedByDateVenue).map((group, idx) => {
                                            const primaryConcert = group[0];
                                            const details = group.map((c) => c.details).find(Boolean);
                                            const hasDetails = Boolean(details?.lineup?.length || details?.setlist?.length || details?.notes);
                                            const cardId = primaryConcert.id ?? idx;
                                            const isOpen = openIds.has(cardId);

                                            return (
                                                <div
                                                    key={cardId}
                                                    className="group relative bg-charcoal/30 border border-ash/5 rounded-2xl p-6 md:p-8 hover:bg-charcoal/50 hover:border-ember/30 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
                                                >
                                                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                                                        {/* Date Leaf / Calendar Icon */}
                                                        <div className="shrink-0 flex flex-col items-center justify-center bg-black/40 border border-ash/10 rounded-xl w-24 h-24 p-2 relative shadow-inner group-hover:border-ember/40 transition-colors">
                                                            <div className="text-ember font-mono text-xs font-bold uppercase tracking-widest bg-ember/10 w-full text-center py-1 rounded-md mb-1">
                                                                {primaryConcert.date_month || "???"}
                                                            </div>
                                                            <div className="text-3xl md:text-4xl font-black text-white stretch-tighter leading-none mt-1">
                                                                {primaryConcert.date_day || "??"}
                                                            </div>
                                                        </div>

                                                        {/* Main Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="mb-2">
                                                                {details?.headline ? (
                                                                    <span className="text-3xl font-bold text-white group-hover:text-ember transition-colors leading-tight inline-block">
                                                                        {details.headline}
                                                                    </span>
                                                                ) : (
                                                                    group.map((c, i) => (
                                                                        <span key={c.id || i} className="text-3xl font-bold text-white group-hover:text-ember transition-colors leading-tight inline-block">
                                                                            {c.artist}
                                                                            {i < group.length - 1 && <span className="text-copper mx-2 text-2xl">•</span>}
                                                                        </span>
                                                                    ))
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-ash/60 items-start sm:items-center text-sm font-mono mt-3">
                                                                <span className="flex items-center gap-2 truncate text-lavender">
                                                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    </svg>
                                                                    {primaryConcert.venue}
                                                                </span>
                                                                <span className="hidden sm:inline-block text-ash/30">•</span>
                                                                <span className="truncate text-ash/40">
                                                                    {primaryConcert.location}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Details Toggle */}
                                                        {hasDetails && (
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleOpen(cardId)}
                                                                aria-expanded={isOpen}
                                                                aria-label={isOpen ? "Hide show details" : "Show more details"}
                                                                className="shrink-0 self-start md:self-center flex items-center justify-center w-10 h-10 rounded-full border border-ash/20 text-ash/60 hover:text-ember hover:border-ember/40 transition-all"
                                                            >
                                                                <Plus
                                                                    className="w-5 h-5 transition-transform duration-300"
                                                                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                                                                    strokeWidth={1.5}
                                                                />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Details Drawer */}
                                                    {hasDetails && (
                                                        <AnimatePresence initial={false}>
                                                            {isOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="mt-6 pt-6 border-t border-ash/10 grid md:grid-cols-2 gap-6">
                                                                        {details?.lineup && details.lineup.length > 0 && (
                                                                            <div>
                                                                                <div className="text-xs font-mono text-copper uppercase tracking-widest mb-2">
                                                                                    Full Lineup
                                                                                </div>
                                                                                <ul className="space-y-1 text-ash/70 text-sm">
                                                                                    {details.lineup.map((act, i) => (
                                                                                        <li key={i}>{act}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                        {details?.setlist && details.setlist.length > 0 && (
                                                                            <div>
                                                                                <div className="text-xs font-mono text-lavender uppercase tracking-widest mb-2">
                                                                                    {details.setlistArtist ? `${details.setlistArtist} Setlist` : "Setlist"}
                                                                                </div>
                                                                                <ol className="space-y-1 text-ash/70 text-sm list-decimal list-inside">
                                                                                    {details.setlist.map((song, i) => (
                                                                                        <li key={i}>{song}</li>
                                                                                    ))}
                                                                                </ol>
                                                                            </div>
                                                                        )}
                                                                        {details?.notes && (
                                                                            <div className="md:col-span-2">
                                                                                <div className="text-xs font-mono text-ember uppercase tracking-widest mb-2">
                                                                                    Notes
                                                                                </div>
                                                                                <p className="text-ash/70 text-sm leading-relaxed">
                                                                                    {details.notes}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    )}
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </motion.section>
                        );
                    })}
                </motion.div>
            </div>

        </article>
    );
}
