"use client";

import { motion } from "framer-motion";

export const AnimatedGrid = () => {


    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #808080 1px, transparent 1px),
            linear-gradient(to bottom, #808080 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            >
                <motion.div
                    animate={{
                        y: [0, -40],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                    }}
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #808080 1px, transparent 1px),
              linear-gradient(to bottom, #808080 1px, transparent 1px)
            `,
                        backgroundSize: "40px 40px",
                    }}
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black" />
        </div>
    );
};
