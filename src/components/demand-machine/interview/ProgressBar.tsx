"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    // Calculate percentage (0 to 100)
    // We add 1 to currentStep to make it 1-indexed for the user (Step 1 of 12)
    // But for the bar width, we might want it to fill up as we go.
    // If we are on step 0 (first card), we have completed 0 cards, but are working on 1st.
    // Let's make the bar reflect "completed portion" or "current position".
    // "Step 1 of 12" -> 1/12th full or 0? Usually 1/12th.
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-electric uppercase tracking-wider">
                    Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-xs text-slate font-mono">
                    {Math.round(progress)}% Complete
                </span>
            </div>
            <div className="h-2 w-full bg-slate/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-electric"
                />
            </div>
        </div>
    );
}
