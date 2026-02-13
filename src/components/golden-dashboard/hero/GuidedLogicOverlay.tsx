"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, ChevronRight, Check } from "lucide-react";

interface GuidedLogicOverlayProps {
    onDismiss: () => void;
}

const STEPS = [
    {
        id: "inputs",
        title: "Step 1: Set Your Levers",
        description: "This is the fuel for your growth engine. Adjust budget, CPC, and CPL to simulate your investment strategy.",
        target: "col-1", // CSS class or ID logic we'll map to
        position: "left", // alignment
    },
    {
        id: "funnel",
        title: "Step 2: Monitor Friction",
        description: "This column shows how your investment converts into actual sales conversations (SQLs). Green metrics indicate efficiency.",
        target: "col-2",
    },
    {
        id: "outcomes",
        title: "Step 3: The Golden Ratio",
        description: "This is the final economic output—where demand becomes revenue. Aim for a high ROI to find your Golden Ratio.",
        target: "col-3",
    },
];

export default function GuidedLogicOverlay({ onDismiss }: GuidedLogicOverlayProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            onDismiss();
        }
    };

    const currentStep = STEPS[currentStepIndex];

    return (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={onDismiss}
            />

            {/* Active Tooltip Card - Positioned relative to grid in parent if possible, but for now centered or approximating positions is safer given responsive layouts. 
            However, we want it "guided". Let's try to position it intelligently.
            Since interacting with the exact DOM rects is hard without a context, we'll use a centered modal approach 
            that HIGHLIGHTS the column by letting the background be clear over the target? 
            No, that's complex math on the fly. 
            
            Better approach for this iteration: 
            A floating card near the top that updates content, 
            and we highlight the column by adding a ring? 
            
            Actually, let's just render the tooltip in a fixed central position or slightly offset 
            corresponding to the columns: Left (25%), Center (50%), Right (75%).
        */}

            <div className="absolute inset-0 container max-w-7xl mx-auto pointer-events-none">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center relative">
                    {/* Position calculation logic (simple approximation) */}
                    <div className={`
                    absolute top-1/4 lg:top-1/3 transition-all duration-500 ease-in-out pointer-events-auto
                    ${currentStepIndex === 0 ? "left-4 lg:left-[10%]" :
                            currentStepIndex === 1 ? "left-4 lg:left-[40%]" :
                                "left-4 lg:left-[60%]"} 
                 `}>
                        <TooltipCard
                            step={currentStep}
                            current={currentStepIndex + 1}
                            total={STEPS.length}
                            onNext={handleNext}
                            onDismiss={onDismiss}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TooltipCard({ step, current, total, onNext, onDismiss }: any) {
    return (
        <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-offblack/90 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl relative"
        >
            <button onClick={onDismiss} className="absolute top-4 right-4 text-ash/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-electric mb-2 uppercase tracking-widest">
                Step {current} of {total}
            </div>

            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {step.title}
            </h3>

            <p className="text-ash/70 text-sm leading-relaxed mb-6">
                {step.description}
            </p>

            <button
                onClick={onNext}
                className="flex items-center gap-2 bg-electric hover:bg-electric/80 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all group w-full justify-center"
            >
                {current === total ? "Got it" : "Next"}
                {current === total ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>

            {/* Little Tail (Visual Flourish) */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-offblack/90 border-r border-b border-white/20 transform rotate-45" />
        </motion.div>
    )
}
