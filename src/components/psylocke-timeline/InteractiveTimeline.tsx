"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation, useDragControls } from "framer-motion";
import { comicsData, ComicData } from "./comic-data";

const CARD_WIDTH = 220;
const CARD_GAP = -40; // Overlapping cards
const CARD_FULL_WIDTH = CARD_WIDTH + CARD_GAP;

export default function InteractiveTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initial offset to center the first card
    const [centerOffset, setCenterOffset] = useState(0);

    const x = useMotionValue(0);
    const dragControls = useDragControls();

    useEffect(() => {
        const updateOffset = () => {
            if (containerRef.current) {
                const center = containerRef.current.offsetWidth / 2;
                setCenterOffset(center - CARD_WIDTH / 2);
                x.set(center - CARD_WIDTH / 2);
            }
        };

        updateOffset();
        window.addEventListener("resize", updateOffset);
        return () => window.removeEventListener("resize", updateOffset);
    }, [x]);

    const handleDragStart = () => {
        setIsDragging(true);
        setHoveredIndex(null); // Force disable hover effects while dragging
    };

    const handleDragEnd = (event: any, info: any) => {
        setIsDragging(false);

        // Calculate the nearest card index based on current x position
        const currentX = x.get();
        // Distance moved from the starting centered offset
        const scrolledDistance = centerOffset - currentX;

        // Find the index of the nearest card
        let closestIndex = Math.round(scrolledDistance / CARD_FULL_WIDTH);

        // Clamp index
        closestIndex = Math.max(0, Math.min(closestIndex, comicsData.length - 1));

        setActiveIndex(closestIndex);

        // Snap to nearest position
        const targetX = centerOffset - (closestIndex * CARD_FULL_WIDTH);

        x.set(targetX); // Animate to final position using layout spring below
    };

    const handleCardClick = (index: number) => {
        if (isDragging) return;

        if (index !== activeIndex) {
            // If clicking a card that isn't focused, snap to it first
            setActiveIndex(index);
            const targetX = centerOffset - (index * CARD_FULL_WIDTH);
            x.set(targetX);
            setFlippedIndex(null);
        } else {
            // Flip logic (only for the active centered card, or any card if preferred design)
            setFlippedIndex(flippedIndex === index ? null : index);
        }
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[75vh] flex items-center overflow-hidden relative"
            style={{ perspective: "1200px" }}
        >
            <motion.div
                className="flex items-center"
                style={{ x, gap: `${CARD_GAP}px` }}
                drag="x"
                dragControls={dragControls}
                dragMomentum={true}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                animate={{ x: centerOffset - (activeIndex * CARD_FULL_WIDTH) }}
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
                {comicsData.map((comic, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const isFlipped = flippedIndex === idx;
                    const isActive = activeIndex === idx;
                    const distance = Math.abs(activeIndex - idx);

                    // Scatter math
                    const baseRotation = (idx % 2 === 0 ? 1 : -1) * (idx % 3 + 1) * 3; // e.g. 3, -6, 9
                    const baseYOffset = (idx % 3 === 0 ? 0 : idx % 3 === 1 ? 12 : -8);

                    // Hover scaling logic defined by spec
                    let scale = 1;
                    let blur = 0;
                    let opacity = 1;
                    let rotation = baseRotation;
                    let yOffset = baseYOffset;
                    let zIndex = 20 - distance;

                    if (isDragging) {
                        scale = 0.98;
                    } else if (hoveredIndex !== null) {
                        if (isHovered) {
                            scale = 1.15;
                            rotation = 0;
                            yOffset = -40; // Pop up prominently
                            zIndex = 60;
                        } else if (Math.abs(hoveredIndex - idx) === 1) {
                            scale = 0.96;
                            blur = 2;
                            opacity = 0.85;
                            zIndex = 30;
                        } else {
                            scale = 0.92;
                            opacity = 0.75;
                            zIndex = 10;
                        }
                    } else {
                        // Neutral State
                        if (isActive) {
                            zIndex = 30; // Ensure active element is at least readable if needed
                        }
                    }

                    return (
                        <motion.div
                            key={comic.id}
                            className="relative flex-shrink-0 cursor-grab active:cursor-grabbing"
                            style={{
                                width: CARD_WIDTH,
                                height: CARD_WIDTH * 1.5, // 2:3 aspect ratio
                                zIndex: isFlipped ? 100 : zIndex,
                            }}
                            animate={{
                                scale,
                                y: yOffset,
                                rotateZ: rotation,
                                filter: `blur(${blur}px)`,
                                opacity,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
                            onHoverStart={() => !isDragging && setHoveredIndex(idx)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            onClick={() => handleCardClick(idx)}
                        >
                            {/* 3D Inner Wrapper */}
                            <motion.div
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                {/* FRONT FACE */}
                                <div
                                    className="absolute w-full h-full rounded-[18px] overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        boxShadow: isHovered && !isDragging
                                            ? "0 30px 60px -12px rgba(0,0,0,0.5), 0 18px 36px -18px rgba(0,0,0,0.4)"
                                            : "0 10px 30px -10px rgba(0,0,0,0.3)",
                                        transition: "box-shadow 0.3s ease"
                                    }}
                                >
                                    <img
                                        src={comic.image}
                                        alt={comic.title}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                </div>

                                {/* BACK FACE: Baseball Card Metadata layout */}
                                <div
                                    className="absolute w-full h-full rounded-[18px] overflow-hidden bg-white dark:bg-[#1a1a1f] p-5 border border-zinc-200 dark:border-white/5 flex flex-col"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                                    }}
                                >
                                    {/* EYEBROW */}
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E34234] mb-3 inline-block">
                                        {comic.publisher}
                                    </span>

                                    {/* HEADER BLOCK */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-black text-zinc-900 dark:text-[#f5f5f7] leading-tight mb-1 uppercase tracking-tight">
                                            {comic.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                            <span>{comic.volume}</span>
                                            <span>•</span>
                                            <span className="text-zinc-800 dark:text-zinc-200">{comic.issueNumber}</span>
                                        </div>
                                    </div>

                                    {/* PLOT SUMMARY */}
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm text-zinc-600 dark:text-white/70 leading-relaxed font-medium">
                                            {comic.plotSummary || "Betsy Braddock's timeline is permanently altered in this pivotal issue."}
                                        </p>
                                    </div>

                                    {/* FOOTER BLOCK */}
                                    <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/10 flex flex-col gap-3">
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-mono text-zinc-400">
                                            <span>Released</span>
                                            <span className="font-bold text-zinc-700 dark:text-zinc-300">{comic.releaseDate}</span>
                                        </div>

                                        {/* FANDOM WIKI LINK BUTTON */}
                                        <a
                                            href={comic.fandomLink || "https://marvel.fandom.com/wiki/Elizabeth_Braddock_(Earth-616)"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-2.5 px-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors rounded-lg flex items-center justify-between group"
                                            onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking the link
                                        >
                                            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Marvel Wiki</span>
                                            <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
