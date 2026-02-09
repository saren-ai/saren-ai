"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Play, Pause, X, ChevronRight, ChevronLeft } from "lucide-react";

interface Insight {
    id: string;
    title: string;
    takeaway: string;
    videoSrc: string;
    duration: string;
}

const INSIGHTS: Insight[] = [
    {
        id: "02",
        title: "LLM Repetitions",
        takeaway: "Spotting patterns to turn manual research into repeatable automation engines.",
        videoSrc: "/videos/whats-the-big-idea_02.mp4",
        duration: "4:12"
    },
    {
        id: "01",
        title: "The 4-Hour Brief",
        takeaway: "Compressing five-day strategic cycles into a single afternoon using AI-as-catalyst.",
        videoSrc: "/videos/whats-the-big-idea_01.mp4",
        duration: "3:45"
    },
    {
        id: "04",
        title: "Central Truth",
        takeaway: "Using LLM synthesis to find the brand anchor that survives micro-audience fragmentation.",
        videoSrc: "/videos/whats-the-big-idea_04.mp4",
        duration: "5:20"
    },
    {
        id: "03",
        title: "Modular Context",
        takeaway: "Localizing professional data into discrete modules to ensure clarity and security.",
        videoSrc: "/videos/whats-the-big-idea_03.mp4",
        duration: "2:55"
    },
];

export default function InsightCarousel() {
    const [activeId, setActiveId] = useState<string>("04"); // Default to main feature
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll to center the active item on mount and change
    useEffect(() => {
        if (containerRef.current && !expandedId) {
            const activeElement = document.getElementById(`insight-card-${activeId}`);
            if (activeElement) {
                const container = containerRef.current;
                const scrollLeft =
                    activeElement.offsetLeft -
                    container.offsetWidth / 2 +
                    activeElement.offsetWidth / 2;
                container.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }
        }
    }, [activeId, expandedId]);

    const handleCardClick = (id: string) => {
        if (activeId === id) {
            setExpandedId(id);
        } else {
            setActiveId(id);
        }
    };

    const handleCloseExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedId(null);
    };

    return (
        <LayoutGroup>
            <div className="relative w-full py-12 lg:py-20 overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] max-w-4xl bg-ember/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container-narrow relative z-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between items-end px-4 md:px-0">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                    <span className="text-gradient">Strategic Insights</span>
                                </h2>
                                <p className="text-muted-foreground max-w-md">
                                    Key mental models extracted from the conversation.
                                </p>
                            </div>

                            {/* Desktop Navigation Controls */}
                            <div className="hidden md:flex gap-2">
                                <button
                                    onClick={() => {
                                        const currentIndex = INSIGHTS.findIndex(i => i.id === activeId);
                                        const prevIndex = (currentIndex - 1 + INSIGHTS.length) % INSIGHTS.length;
                                        setActiveId(INSIGHTS[prevIndex].id);
                                    }}
                                    className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
                                    aria-label="Previous insight"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const currentIndex = INSIGHTS.findIndex(i => i.id === activeId);
                                        const nextIndex = (currentIndex + 1) % INSIGHTS.length;
                                        setActiveId(INSIGHTS[nextIndex].id);
                                    }}
                                    className="p-3 rounded-full border border-border hover:bg-muted transition-colors"
                                    aria-label="Next insight"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div
                            ref={containerRef}
                            className="flex gap-4 md:gap-8 overflow-x-auto pb-8 pt-4 px-4 md:px-0 snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0"
                            style={{ paddingInline: "max(1rem, (100vw - 1200px) / 2)" }}
                        >
                            {INSIGHTS.map((insight) => {
                                const isActive = activeId === insight.id;
                                const isHovered = hoveredId === insight.id;
                                const isExpanded = expandedId === insight.id;

                                return (
                                    <motion.div
                                        key={insight.id}
                                        id={`insight-card-${insight.id}`}
                                        layoutId={`card-${insight.id}`}
                                        onClick={() => handleCardClick(insight.id)}
                                        onHoverStart={() => setHoveredId(insight.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                        className={`
                      relative shrink-0 snap-center cursor-pointer
                      w-[280px] md:w-[320px] lg:w-[400px]
                      aspect-[9/16] md:aspect-[3/4]
                      rounded-xl overflow-hidden
                      border border-border
                      transition-all duration-500 ease-out
                      ${isActive ? "scale-100 opacity-100 ring-2 ring-ember/20 shadow-2xl" : "scale-95 opacity-60 hover:opacity-80"}
                    `}
                                    >
                                        {/* Video / Thumbnail */}
                                        <div className="absolute inset-0 bg-black">
                                            {/* We use a video tag here. In a real specialized implementation, we might use a dedicated Video player component 
                             that handles intersection observation for auto-play perfectly. */}
                                            <video
                                                src={insight.videoSrc}
                                                muted
                                                playsInline
                                                loop
                                                className={`w-full h-full object-cover transition-opacity duration-700 ${isActive || isHovered ? "opacity-100" : "opacity-60"}`}
                                                ref={(el) => {
                                                    if (el && isActive) el.play().catch(() => { });
                                                    if (el && !isActive) el.pause();
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
                                            <motion.div layoutId={`content-${insight.id}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white backdrop-blur-sm">
                                                        {insight.duration}
                                                    </span>
                                                    {isActive && (
                                                        <span className="flex items-center gap-1 text-[10px] font-mono text-ember font-bold uppercase tracking-wider">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                                                            Now Playing
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                                                    {insight.title}
                                                </h3>

                                                <p className={`text-sm text-gray-300 transition-all duration-300 ${isActive || isHovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0"}`}>
                                                    {insight.takeaway}
                                                </p>
                                            </motion.div>
                                        </div>

                                        {/* Play Button Overlay (Inactive State) */}
                                        {!isActive && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                                    <Play className="w-5 h-5 ml-1 fill-white" />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Expanded View Modal */}
                <AnimatePresence>
                    {expandedId && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm">

                            {INSIGHTS.filter(i => i.id === expandedId).map(insight => (
                                <motion.div
                                    key={insight.id}
                                    layoutId={`card-${insight.id}`}
                                    className="relative w-full max-w-5xl bg-card rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={handleCloseExpand}
                                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    {/* Expanded Video Section */}
                                    <div className="flex-1 bg-black relative aspect-video md:aspect-auto">
                                        <video
                                            src={insight.videoSrc}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Expanded Content Section */}
                                    <div className="w-full md:w-[350px] lg:w-[400px] p-6 md:p-8 flex flex-col bg-card border-l border-border">
                                        <motion.div layoutId={`content-${insight.id}`} className="h-full flex flex-col">
                                            <span className="text-xs font-mono text-muted-foreground mb-4">
                                                EPISODE SEGMENT {insight.id}
                                            </span>

                                            <h3 className="text-3xl font-bold mb-4 text-foreground">
                                                {insight.title}
                                            </h3>

                                            <div className="prose dark:prose-invert">
                                                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                                                    {insight.takeaway}
                                                </p>
                                                <p>
                                                    This segment explores the deeper implications of AI in modern marketing strategy, moving beyond surface-level tool usage to fundamental structural shifts.
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-8">
                                                <button
                                                    className="w-full py-4 rounded-lg bg-ember text-white font-bold hover:bg-ember/90 transition-colors flex items-center justify-center gap-2"
                                                    onClick={handleCloseExpand} // In reality this might link elsewhere or scroll
                                                >
                                                    Share Insight
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </LayoutGroup>
    );
}
