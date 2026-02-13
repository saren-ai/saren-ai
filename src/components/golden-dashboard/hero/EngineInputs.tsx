"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DollarSign, MousePointer2, Users } from "lucide-react";

interface EngineInputsProps {
    inputs: {
        monthlyBudget: number;
        targetCpc: number;
        targetCpl: number;
    };
    onChange: (field: "monthlyBudget" | "targetCpc" | "targetCpl", value: number) => void;
}

export default function EngineInputs({ inputs, onChange }: EngineInputsProps) {
    return (
        <div className="h-full bg-background-secondary/80 backdrop-blur-xl border border-border rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden group shadow-sm transition-colors duration-500">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric/0 via-electric/50 to-electric/0 opacity-50" />

            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-electric/10 rounded-lg text-electric">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Investment Inputs
                </h3>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4">
                <InputCard
                    label="Monthly Budget"
                    value={inputs.monthlyBudget}
                    min={5000}
                    max={500000}
                    step={1000}
                    sensitivity={100} // Higher sensitivity for larger values
                    format={(v) => `$${v.toLocaleString()}`}
                    onChange={(v) => onChange("monthlyBudget", v)}
                    color="electric"
                    icon={<DollarSign className="w-4 h-4" />}
                />

                <InputCard
                    label="Target CPC"
                    value={inputs.targetCpc}
                    min={0.5}
                    max={50.0}
                    step={0.1}
                    sensitivity={0.1}
                    format={(v) => `$${v.toFixed(2)}`}
                    onChange={(v) => onChange("targetCpc", v)}
                    color="electric"
                    icon={<MousePointer2 className="w-4 h-4" />}
                />

                <InputCard
                    label="Target CPL"
                    value={inputs.targetCpl}
                    min={10}
                    max={500}
                    step={5}
                    sensitivity={1}
                    format={(v) => `$${v.toFixed(0)}`}
                    onChange={(v) => onChange("targetCpl", v)}
                    color="electric"
                    icon={<Users className="w-4 h-4" />}
                />
            </div>
        </div>
    );
}

// --- Sub-Component: Scrubber Input Card ---

interface InputCardProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    sensitivity: number;
    format: (v: number) => string;
    onChange: (v: number) => void;
    color: "electric" | "ember";
    icon: React.ReactNode;
}

function InputCard({ label, value, min, max, step, sensitivity, format, onChange, color, icon }: InputCardProps) {
    const constraintsRef = useRef<HTMLDivElement>(null);

    // Calculate percentage for slider position
    const percentage = Math.min(1, Math.max(0, (value - min) / (max - min)));

    // --- Number Drag Logic ---
    const [isDragging, setIsDragging] = useState(false);

    const handleNumberDrag = useCallback((event: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const startValue = value;

        const onMove = (e: MouseEvent | TouchEvent) => {
            const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const deltaX = currentX - startX;

            // Calculate new value based on drag distance and sensitivity
            // Dragging right increases, left decreases
            // Sensitivity factor controls how "fast" it changes
            const change = deltaX * (step * 0.5); // Adjust multiplier for feel
            let newValue = startValue + change;

            // Clamp and Snap
            newValue = Math.max(min, Math.min(max, newValue));
            const snapped = Math.round(newValue / step) * step;

            if (snapped !== value) {
                onChange(snapped);
            }
        };

        const onUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onMove);
        window.addEventListener('touchend', onUp);
    }, [value, min, max, step, onChange]);


    // --- Slider Logic ---
    const handleSliderDrag = (event: any, info: any) => {
        if (!constraintsRef.current) return;
        const containerWidth = constraintsRef.current.offsetWidth;
        const x = info.point.x - constraintsRef.current.getBoundingClientRect().left;

        const clampedX = Math.max(0, Math.min(x, containerWidth));
        const newPct = clampedX / containerWidth;

        const rawValue = min + (newPct * (max - min));
        const snapped = Math.round(rawValue / step) * step;

        if (snapped !== value) {
            onChange(snapped);
        }
    };

    return (
        <div className="relative group/card">
            {/* Hover State Background */}
            <div className="absolute inset-0 bg-foreground/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative p-5 rounded-2xl border border-border bg-card-bg/50 backdrop-blur-sm transition-all hover:border-border-hover">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-foreground-muted text-xs font-bold uppercase tracking-wide select-none">
                        {icon}
                        {label}
                    </div>

                    {/* Scrubbable Number */}
                    <div
                        className={`
                text-xl font-mono font-bold text-${color}
                cursor-ew-resize select-none active:scale-110 transition-transform
                ${isDragging ? "scale-110 brightness-125" : ""}
            `}
                        onMouseDown={handleNumberDrag}
                        onTouchStart={handleNumberDrag}
                        title="Drag to adjust"
                    >
                        {format(value)}
                    </div>
                </div>

                {/* Custom Slider */}
                <div className="relative h-6 flex items-center cursor-pointer touch-none" ref={constraintsRef}>
                    {/* Track Bg */}
                    <div className="absolute left-0 right-0 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                        {/* Fill */}
                        <motion.div
                            className={`h-full bg-${color}`}
                            initial={{ width: `${percentage * 100}%` }}
                            animate={{ width: `${percentage * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>

                    {/* Draggable Handle */}
                    <motion.div
                        drag="x"
                        dragConstraints={constraintsRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={handleSliderDrag}
                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-card-bg border border-border shadow-lg flex items-center justify-center z-10 hover:scale-110 active:scale-95 transition-transform"
                        style={{ left: `calc(${percentage * 100}% - 12px)` }}
                        whileHover={{ cursor: "grab" }}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        <div className={`w-2 h-2 rounded-full bg-${color}`} />
                    </motion.div>
                </div>

                <div className="flex justify-between mt-2 text-[10px] text-foreground-muted/50 font-mono select-none">
                    <span>{format(min)}</span>
                    <span>{format(max)}</span>
                </div>
            </div>
        </div>
    );
}
