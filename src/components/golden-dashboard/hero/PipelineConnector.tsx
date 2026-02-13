"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function PipelineConnector({ trigger }: { trigger?: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
                <defs>
                    <linearGradient id="electric-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="ember-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                        <stop offset="50%" stopColor="#F59E0B" stopOpacity="1" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Connection 1: Inputs -> Metrics */}
                <ConnectorPath
                    d="M 24 50 C 25 50, 25 50, 26 50"
                    gradient="url(#electric-flow)"
                    trigger={trigger}
                />

                {/* Connection 2: Metrics -> Outcomes */}
                <ConnectorPath
                    d="M 66 50 C 67 50, 67 50, 68 50"
                    gradient="url(#ember-flow)"
                    trigger={trigger}
                    delay={0.2}
                />

            </svg>
        </div>
    );
}

function ConnectorPath({ d, gradient = "white", trigger, delay = 0 }: { d: string, gradient?: string, trigger?: number, delay?: number }) {
    const controls = useAnimation();

    useEffect(() => {
        if (trigger !== undefined && trigger > 0) {
            // Reset and animate
            controls.stop();
            controls.set({ pathLength: 0, opacity: 0, pathOffset: 0 });
            controls.start({
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0],
                pathOffset: [0, 1, 0],
                transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: delay
                }
            });
        }
    }, [trigger, controls, delay]);

    return (
        <>
            {/* Background Track */}
            <path
                d={d}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />

            {/* Animated Pulse */}
            <motion.path
                d={d}
                stroke={gradient}
                strokeWidth="2"
                fill="none"
                strokeDasharray="0 1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={controls}
                vectorEffect="non-scaling-stroke"
            />
        </>
    );
}
