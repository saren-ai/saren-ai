"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { Navigation, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Extend with dynamic props to let the parent page pass in categories
export interface NavItem {
    name: string;
    href: string;
}

interface AnimatedNavFramerProps {
    items: NavItem[];
    activeCategory?: string;
}

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
    expanded: {
        y: 0,
        opacity: 1,
        width: "auto",
        transition: {
            y: { type: "spring" as const, damping: 18, stiffness: 250 },
            opacity: { duration: 0.3 },
            type: "spring" as const,
            damping: 20,
            stiffness: 300,
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
    collapsed: {
        y: 0,
        opacity: 1,
        width: "3rem",
        transition: {
            type: "spring" as const,
            damping: 20,
            stiffness: 300,
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const logoVariants: Variants = {
    expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring" as const, damping: 15 } },
    collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
    expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring" as const, damping: 15 } },
    collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
    expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    collapsed: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            damping: 15,
            stiffness: 300,
            delay: 0.15,
        }
    },
}

export function AnimatedNavFramer({ items, activeCategory }: AnimatedNavFramerProps) {
    const [isExpanded, setExpanded] = React.useState(true);
    const searchParams = useSearchParams();
    const currentCategory = activeCategory || searchParams.get("category");

    const { scrollY } = useScroll();
    const lastScrollY = React.useRef(0);
    const scrollPositionOnCollapse = React.useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY.current;

        if (isExpanded && latest > previous && latest > 150) {
            setExpanded(false);
            scrollPositionOnCollapse.current = latest;
        }
        else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
            setExpanded(true);
        }

        lastScrollY.current = latest;
    });

    const handleNavClick = (e: React.MouseEvent) => {
        if (!isExpanded) {
            e.preventDefault();
            setExpanded(true);
        }
    };


    return (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-40 hidden md:block">
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={containerVariants}
                whileHover={!isExpanded ? { scale: 1.1 } : {}}
                whileTap={!isExpanded ? { scale: 0.95 } : {}}
                onClick={handleNavClick}
                className={cn(
                    "flex items-center overflow-hidden rounded-full border border-ash/10 bg-offblack/80 shadow-lg backdrop-blur-md h-12",
                    !isExpanded && "cursor-pointer justify-center"
                )}
            >
                <motion.div
                    variants={logoVariants}
                    className="flex-shrink-0 flex items-center font-semibold pl-4 pr-2 text-ember"
                >
                    <Navigation className="h-5 w-5" />
                </motion.div>

                <motion.div
                    className={cn(
                        "flex items-center gap-1 sm:gap-2 pr-4",
                        !isExpanded && "pointer-events-none"
                    )}
                >
                    {items.map((item) => {
                        // Determine if active 
                        const isActive = currentCategory
                            ? item.name === currentCategory || item.href.includes(`category=${encodeURIComponent(currentCategory)}`)
                            : item.name === "All";

                        return (
                            <motion.div key={item.name} variants={itemVariants}>
                                <Link
                                    href={item.href}
                                    onClick={(e) => e.stopPropagation()}
                                    className={cn(
                                        "text-sm font-medium transition-colors px-3 py-1.5 rounded-full whitespace-nowrap",
                                        isActive
                                            ? "bg-white/15 text-white shadow-sm"
                                            : "text-neutral-400 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        variants={collapsedIconVariants}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        className="text-ash"
                    >
                        <Menu className="h-5 w-5" />
                    </motion.div>
                </div>
            </motion.nav>
        </div>
    );
}
