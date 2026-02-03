"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  title: string;
  description: string;
  isVisible: boolean;
  position?: "top" | "bottom";
}

export default function Tooltip({
  title,
  description,
  isVisible,
  position = "top",
}: TooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === "top" ? 10 : -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute z-50 w-64 p-4 bg-offblack border border-electric/30 rounded-lg shadow-xl ${
            position === "top"
              ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
              : "top-full mt-2 left-1/2 -translate-x-1/2"
          }`}
        >
          {/* Arrow */}
          <div
            className={`absolute w-3 h-3 bg-offblack border-electric/30 rotate-45 left-1/2 -translate-x-1/2 ${
              position === "top"
                ? "bottom-0 translate-y-1/2 border-r border-b"
                : "top-0 -translate-y-1/2 border-l border-t"
            }`}
          />

          <h4 className="text-ash font-semibold text-sm mb-1">{title}</h4>
          <p className="text-ash/70 text-xs leading-relaxed">{description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
