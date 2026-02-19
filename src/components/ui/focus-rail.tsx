"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc: string;
    href?: string;
    meta?: string;
};

interface FocusRailProps {
    items: FocusRailItem[];
    initialIndex?: number;
    loop?: boolean;
    autoPlay?: boolean;
    interval?: number;
    className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
};

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */
const TAP_SPRING = {
    type: "spring" as const,
    stiffness: 450,
    damping: 18, // Lower damping = subtle overshoot/wobble "tap"
    mass: 1,
};

export function FocusRail({
    items,
    initialIndex = 0,
    loop = true,
    autoPlay = false,
    interval = 4000,
    className,
}: FocusRailProps) {
    const [active, setActive] = React.useState(initialIndex);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);
    const lastWheelTime = React.useRef<number>(0);

    // Reset flip when active item changes
    React.useEffect(() => {
        setIsFlipped(false);
    }, [active]);

    const count = items.length;
    const activeIndex = wrap(0, count, active);
    const activeItem = items[activeIndex];

    // --- NAVIGATION HANDLERS ---
    const handlePrev = React.useCallback(() => {
        if (!loop && active === 0) return;
        setActive((p) => p - 1);
    }, [loop, active]);

    const handleNext = React.useCallback(() => {
        if (!loop && active === count - 1) return;
        setActive((p) => p + 1);
    }, [loop, active, count]);

    // --- MOUSE WHEEL / TRACKPAD LOGIC ---
    const onWheel = React.useCallback(
        (e: React.WheelEvent) => {
            const now = Date.now();
            // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
            if (now - lastWheelTime.current < 400) return;

            // Detect horizontal scroll primarily, but also fallback to vertical if shift is held
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const delta = isHorizontal ? e.deltaX : e.deltaY;

            // Threshold to avoid accidental micro-scrolls
            if (Math.abs(delta) > 20) {
                if (delta > 0) {
                    handleNext();
                } else {
                    handlePrev();
                }
                lastWheelTime.current = now;
            }
        },
        [handleNext, handlePrev]
    );

    // Autoplay logic
    React.useEffect(() => {
        if (!autoPlay || isHovering) return;
        const timer = setInterval(() => handleNext(), interval);
        return () => clearInterval(timer);
    }, [autoPlay, isHovering, handleNext, interval]);

    // Keyboard navigation
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    };

    // --- SWIPE / DRAG LOGIC ---
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            handleNext();
        } else if (swipe > swipeConfidenceThreshold) {
            handlePrev();
        }
    };

    const visibleIndices = [-2, -1, 0, 1, 2];

    return (
        <div
            className={cn(
                "group relative flex h-[800px] w-full flex-col overflow-hidden bg-background text-foreground outline-none select-none overflow-x-hidden",
                className
            )}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onWheel={onWheel}
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={`bg-${activeItem.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={activeItem.imageSrc}
                            alt=""
                            className="h-full w-full object-cover blur-3xl saturate-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Stage */}
            <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
                {/* DRAGGABLE RAIL CONTAINER */}
                <motion.div
                    className="relative mx-auto flex h-[400px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                >
                    {visibleIndices.map((offset) => {
                        const absIndex = active + offset;
                        const index = wrap(0, count, absIndex);
                        const item = items[index];

                        if (!loop && (absIndex < 0 || absIndex >= count)) return null;

                        const isCenter = offset === 0;
                        const dist = Math.abs(offset);

                        // Dynamic transforms
                        const xOffset = offset * 320;
                        const zOffset = -dist * 180;
                        const scale = isCenter ? 1 : 0.85;
                        const rotateY = offset * -20;

                        const opacity = isCenter ? 1 : Math.max(0.3, 1 - dist * 0.4);
                        const blur = isCenter ? 0 : dist * 4;
                        const brightness = isCenter ? 1 : 0.6;

                        return (
                            <motion.div
                                key={absIndex}
                                className={cn(
                                    "absolute aspect-[2/3] w-[280px] md:w-[320px] rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300",
                                    isCenter ? "z-20 shadow-electric/20 border-electric/50" : "z-10 bg-card/50"
                                )}
                                initial={false}
                                animate={{
                                    x: xOffset,
                                    z: zOffset,
                                    scale: scale,
                                    rotateY: rotateY + (isCenter && isFlipped ? 180 : 0),
                                    opacity: opacity,
                                    filter: `blur(${blur}px) brightness(${brightness})`,
                                }}
                                transition={{
                                    default: BASE_SPRING,
                                    scale: TAP_SPRING,
                                    rotateY: { ...BASE_SPRING, damping: 20 }, // Slightly less damping for flip
                                }}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                                onClick={() => {
                                    if (offset === 0) {
                                        setIsFlipped((prev) => !prev);
                                    } else {
                                        setActive((p) => p + offset);
                                    }
                                }}
                            >
                                {/* Front Face */}
                                <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                                    <img
                                        src={item.imageSrc}
                                        alt={item.title}
                                        className="h-full w-full rounded-2xl object-cover pointer-events-none"
                                    />
                                    {/* Lighting layers */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 rounded-2xl bg-black/20 pointer-events-none mix-blend-multiply" />

                                    {/* Click hint on hover (only center) */}
                                    {isCenter && !isFlipped && (
                                        <div className="absolute bottom-4 right-4 text-xs font-mono text-white/50 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                            Click to flip
                                        </div>
                                    )}
                                </div>

                                {/* Back Face */}
                                <div
                                    className="absolute inset-0 h-full w-full rounded-2xl bg-neutral-900 border border-border p-6 flex flex-col items-center justify-center text-center backface-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)"
                                    }}
                                >
                                    <div className="space-y-4 overflow-y-auto max-h-full scrollbar-none">
                                        {item.meta && (
                                            <span className="text-xs font-mono font-medium uppercase tracking-widest text-ember block mb-2">
                                                {item.meta}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-sm text-neutral-400 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                        {item.href && (
                                            <Link
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-medium text-electric hover:text-white mt-4 transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View on Marvel Fandom
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Info & Controls */}
                <div className="mx-auto mt-16 flex w-full max-w-4xl flex-col items-center justify-between gap-8 md:flex-row pointer-events-auto">
                    <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left h-32 justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                transition={{ duration: 0.3 }}
                                className="space-y-3"
                            >
                                {activeItem.meta && (
                                    <span className="text-xs font-mono font-medium uppercase tracking-widest text-ember">
                                        {activeItem.meta}
                                    </span>
                                )}
                                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                                    {activeItem.title}
                                </h2>
                                {activeItem.description && (
                                    <p className="max-w-md text-foreground-muted leading-relaxed">
                                        {activeItem.description}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 rounded-full bg-card/80 p-1 ring-1 ring-border backdrop-blur-md">
                            <button
                                onClick={handlePrev}
                                className="rounded-full p-3 text-foreground-muted transition hover:bg-white/5 hover:text-foreground active:scale-95"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="min-w-[60px] text-center text-xs font-mono text-foreground-muted/80">
                                {activeIndex + 1} / {count}
                            </span>
                            <button
                                onClick={handleNext}
                                className="rounded-full p-3 text-foreground-muted transition hover:bg-white/5 hover:text-foreground active:scale-95"
                                aria-label="Next"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        {activeItem.href && (
                            <Link
                                href={activeItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95 hover:bg-white"
                            >
                                Explore
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
