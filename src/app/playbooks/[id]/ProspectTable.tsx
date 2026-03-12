"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

type Prospect = {
    id: string;
    name: string;
    role: string;
    company: string;
    score: number;
    tier: "Invest Now" | "Warm Up" | "Watch List";
    intentSignal: string;
    outreachMessage: string;
};

const DUMMY_PROSPECTS: Prospect[] = [
    {
        id: "2",
        name: "Robert California",
        role: "CEO",
        company: "Sabre Corp",
        score: 95,
        tier: "Invest Now",
        intentSignal: "Publicly discussed restructuring sales divisions",
        outreachMessage: "Robert, saw your thoughts on flattening the sales hierarchy. Are you looking to consolidate your outbound tools as part of that transition?",
    },
    {
        id: "3",
        name: "Jan Levinson",
        role: "VP of Northeast Sales",
        company: "Dunder Mifflin",
        score: 88,
        tier: "Invest Now",
        intentSignal: "Hiring spree for regional branch managers",
        outreachMessage: "Jan, with the new branch manager hires, are you standardizing the tech stack across territories yet?",
    },
    {
        id: "4",
        name: "Andy Bernard",
        role: "Regional Director in Training",
        company: "Dunder Mifflin",
        score: 72,
        tier: "Invest Now",
        intentSignal: "Posted about improving team morale and pipeline metrics",
        outreachMessage: "Andy, love the focus on team morale. How are you tying those cultural shifts to actual pipeline generation?",
    },
    {
        id: "5",
        name: "Jim Halpert",
        role: "Co-Manager",
        company: "Dunder Mifflin",
        score: 68,
        tier: "Warm Up",
        intentSignal: "Recently promoted, optimizing legacy workflows",
        outreachMessage: "Jim, congrats on the promotion to Co-Manager. Are you finding it difficult to balance the legacy processes with new efficiency goals?",
    },
    {
        id: "10",
        name: "Toby Flenderson",
        role: "HR Representative",
        company: "Dunder Mifflin",
        score: 35,
        tier: "Watch List",
        intentSignal: "Risk-averse, focused on compliance",
        outreachMessage: "Toby, HR compliance is a massive headache. How are you ensuring all new sales tools meet the corporate standards?",
    },
];

type SortConfig = {
    key: keyof Prospect | null;
    direction: "asc" | "desc";
};

export function ProspectTable() {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "score",
        direction: "desc",
    });

    const sortedData = React.useMemo(() => {
        let sortableItems = [...DUMMY_PROSPECTS];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const key = sortConfig.key as keyof Prospect;
                
                // Tier sorting logic
                if (key === 'tier') {
                     const tierValue = { "Invest Now": 3, "Warm Up": 2, "Watch List": 1 };
                     if (tierValue[a.tier] < tierValue[b.tier]) return sortConfig.direction === "asc" ? -1 : 1;
                     if (tierValue[a.tier] > tierValue[b.tier]) return sortConfig.direction === "asc" ? 1 : -1;
                     return 0;
                }

                if (a[key] < b[key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const requestSort = (key: keyof Prospect) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnName: keyof Prospect) => {
        if (sortConfig.key !== columnName) {
            return <ChevronsUpDown className="w-4 h-4 ml-1 opacity-20 group-hover:opacity-50 transition-opacity" />;
        }
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="w-4 h-4 ml-1 text-blue-400" />
        ) : (
            <ChevronDown className="w-4 h-4 ml-1 text-blue-400" />
        );
    };

    return (
        <div className="mt-12 mb-8 bg-white/80 dark:bg-neutral-900/50 border border-charcoal/10 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm transition-colors duration-300">
            <div className="p-4 border-b border-charcoal/10 dark:border-neutral-800 bg-ash dark:bg-neutral-900/80 flex items-center justify-between transition-colors duration-300">
                <div>
                    <h3 className="text-lg font-semibold text-charcoal dark:text-white">Prospect Intelligence Dashboard</h3>
                    <p className="text-xs text-slate dark:text-neutral-400">Generated Shortlist Example</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-emerald-50 dark:bg-green-500/10 text-emerald-600 dark:text-green-400 text-xs rounded border border-emerald-200 dark:border-green-500/20 font-medium transition-colors">Invest Now: 3</span>
                    <span className="px-2 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs rounded border border-orange-200 dark:border-orange-500/20 font-medium transition-colors">Warm Up: 1</span>
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 text-xs rounded border border-neutral-300 dark:border-neutral-500/20 font-medium transition-colors">Watch List: 1</span>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate dark:text-neutral-400 uppercase bg-ash/50 dark:bg-neutral-950/50 transition-colors">
                        <tr>
                            <th scope="col" className="px-5 py-4 cursor-pointer group hover:bg-black/5 dark:hover:bg-neutral-800/50 transition-colors" onClick={() => requestSort("name")}>
                                <div className="flex items-center">Prospect {getSortIcon("name")}</div>
                            </th>
                            <th scope="col" className="px-5 py-4 cursor-pointer group hover:bg-black/5 dark:hover:bg-neutral-800/50 transition-colors" onClick={() => requestSort("score")}>
                                <div className="flex items-center">Score {getSortIcon("score")}</div>
                            </th>
                            <th scope="col" className="px-5 py-4 cursor-pointer group hover:bg-black/5 dark:hover:bg-neutral-800/50 transition-colors" onClick={() => requestSort("tier")}>
                                <div className="flex items-center">Tier {getSortIcon("tier")}</div>
                            </th>
                            <th scope="col" className="px-5 py-4 hidden md:table-cell cursor-pointer group hover:bg-black/5 dark:hover:bg-neutral-800/50 transition-colors" onClick={() => requestSort("intentSignal")}>
                                <div className="flex items-center">Intent Signal {getSortIcon("intentSignal")}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((prospect) => (
                            <tr key={prospect.id} className="border-b border-charcoal/5 dark:border-neutral-800/50 hover:bg-ash/50 dark:hover:bg-neutral-800/30 transition-colors">
                                <td className="px-5 py-4">
                                    <div className="font-semibold text-charcoal dark:text-white">{prospect.name}</div>
                                    <div className="text-xs text-slate dark:text-neutral-500 mt-0.5">{prospect.role} at {prospect.company}</div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs border transition-colors
                                        ${prospect.score >= 70 ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' : 
                                          prospect.score >= 50 ? 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' : 
                                          'bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'}`}
                                    >
                                        {prospect.score}
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full 
                                            ${prospect.tier === 'Invest Now' ? 'bg-emerald-500 dark:bg-green-500' : 
                                              prospect.tier === 'Warm Up' ? 'bg-orange-500' : 
                                              'bg-neutral-400 dark:bg-neutral-500'}`} 
                                        />
                                        <span className="font-medium text-slate dark:text-neutral-300">{prospect.tier}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4 hidden md:table-cell">
                                    <div className="text-charcoal dark:text-neutral-300 line-clamp-1 mb-1">{prospect.intentSignal}</div>
                                    <div className="text-xs text-slate dark:text-neutral-500 italic line-clamp-1 border-l-2 border-electric/30 dark:border-blue-500/30 pl-2">
                                        "{prospect.outreachMessage}"
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
