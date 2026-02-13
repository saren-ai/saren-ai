"use client";

import { useState } from "react";
import { BehaviorJourneyTimeline } from "@/components/behavioral-scoring/BehaviorJourneyTimeline";
import { EngagementSimulator } from "@/components/behavioral-scoring/EngagementSimulator";
import { FitScoreBreakdown } from "@/components/behavioral-scoring/FitScoreBreakdown";
import { ScoreVisualizer } from "@/components/behavioral-scoring/ScoreVisualizer";
import {
    computeScoring,
    type BuyerProfile,
} from "@/lib/behavioral-scoring";
import { RotateCcw, Activity } from "lucide-react";

export default function BehavioralSimulator() {
    const [profile, setProfile] = useState<BuyerProfile>({
        companySize: "201-1000",
        industry: "SaaS / Technology",
        role: "Director",
        geography: "North America",
        engagementHistory: [],
    });

    const scoring = computeScoring(profile);

    const handleProfileChange = (updates: Partial<BuyerProfile>) => {
        setProfile((prev) => ({ ...prev, ...updates }));
    };

    const handleActionTrigger = (actionId: string) => {
        setProfile((prev) => ({
            ...prev,
            engagementHistory: [
                ...prev.engagementHistory,
                { actionId, timestamp: Date.now() },
            ],
        }));
    };

    const handleReset = () => {
        setProfile({
            companySize: "201-1000",
            industry: "SaaS / Technology",
            role: "Director",
            geography: "North America",
            engagementHistory: [],
        });
    };

    // Count action occurrences
    const actionCounts = profile.engagementHistory.reduce(
        (acc, entry) => {
            acc[entry.actionId] = (acc[entry.actionId] || 0) + 1;
            return acc;
        },
        {} as { [key: string]: number }
    );

    return (
        <div className="w-full">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-6 h-6 text-ember" />
                        <h2 className="text-3xl font-bold text-foreground">
                            Interactive Scoring Simulator
                        </h2>
                    </div>
                    <p className="text-foreground-muted">
                        Adjust fit factors and trigger engagement actions to see how
                        the scoring system responds
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-card-bg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>

            {/* Score Visualizer */}
            <div className="mb-8">
                <ScoreVisualizer scoring={scoring} />
            </div>

            {/* Journey Timeline */}
            <div className="mb-12">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                    Buyer Journey Progression
                </h3>
                <BehaviorJourneyTimeline
                    currentState={scoring.buyerState}
                    totalScore={scoring.totalScore}
                />
            </div>

            {/* Two Column Layout for Fit and Engagement */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Fit Score Breakdown */}
                <div>
                    <FitScoreBreakdown
                        profile={profile}
                        fitScore={scoring.fitScore}
                        fitBreakdown={scoring.fitBreakdown}
                        onProfileChange={handleProfileChange}
                    />
                </div>

                {/* Engagement Simulator */}
                <div>
                    <EngagementSimulator
                        onActionTrigger={handleActionTrigger}
                        actionCounts={actionCounts}
                    />
                </div>
            </div>
        </div>
    );
}
