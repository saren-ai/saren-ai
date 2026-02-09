"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const profileImages = [
  { src: "/profile/white-guy_1080x1920.png", label: "Photo" },
  { src: "/profile/anime_1080x1920.png", label: "Anime" },
  { src: "/profile/graffiti-head_1020x1920.png", label: "Graffiti" },
  { src: "/profile/graffiti-smile_1080x1920.png", label: "Street Art" },
  { src: "/profile/graffiti-wall_1080x1920.png", label: "Mural" },
  { src: "/profile/pixel-head_1080x1820.png", label: "Pixel Art" },
  { src: "/profile/pixel-portrait_1080x1920.png", label: "8-Bit" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function ProfileGallery() {
  const [[activeIndex, direction], setPage] = useState(() => [
    Math.floor(Math.random() * profileImages.length),
    0,
  ]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        let next = prev + newDirection;
        // Wrap around
        if (next < 0) next = profileImages.length - 1;
        if (next >= profileImages.length) next = 0;
        return [next, newDirection];
      });
    },
    []
  );

  const goTo = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const current = profileImages[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Image Container */}
      <div className="relative w-[220px] h-[390px] md:w-[240px] md:h-[426px] lg:w-[260px] lg:h-[462px] rounded-2xl overflow-hidden bg-white/5 border border-ash/10 shadow-2xl shadow-black/20">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -5000) {
                paginate(1);
              } else if (swipe > 5000) {
                paginate(-1);
              }
            }}
            className="w-full h-full relative cursor-grab active:cursor-grabbing"
          >
            <Image
              src={current.src}
              alt={`Saren — ${current.label} style`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrow Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-charcoal/60 hover:bg-charcoal/80 backdrop-blur-sm rounded-full text-ash transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-charcoal/60 hover:bg-charcoal/80 backdrop-blur-sm rounded-full text-ash transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Style Label */}
        <motion.div
          key={`label-${activeIndex}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-charcoal/70 backdrop-blur-sm rounded-full z-10"
        >
          <span className="text-xs font-semibold text-ash tracking-wide">
            {current.label}
          </span>
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2">
        {profileImages.map((img, index) => (
          <button
            key={img.label}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-ember"
                : "w-2 bg-ash/30 hover:bg-ash/50"
            }`}
            aria-label={`View ${img.label} style`}
            aria-current={index === activeIndex ? "step" : undefined}
          />
        ))}
      </div>
    </motion.div>
  );
}
