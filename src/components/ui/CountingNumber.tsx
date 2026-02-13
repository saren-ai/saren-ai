"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountingNumberProps {
    value: number;
    direction?: "up" | "down";
    className?: string;
    format?: (v: number) => string;
}

export default function CountingNumber({
    value,
    className,
    format = (v) => Math.round(v).toString(),
}: CountingNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = format(latest);
            }
        });
    }, [springValue, format]);

    return <span ref={ref} className={className} />;
}
