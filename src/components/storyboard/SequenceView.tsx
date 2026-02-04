"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StoryboardFrame } from "@/lib/storyboard";
import { moodColors } from "@/lib/storyboard";
import TaglineCard from "./TaglineCard";

interface SequenceViewProps {
  frames: StoryboardFrame[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export default function SequenceView({
  frames,
  activeIndex,
  onIndexChange,
}: SequenceViewProps) {
  const currentFrame = frames[activeIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        onIndexChange(activeIndex - 1);
      } else if (e.key === "ArrowRight" && activeIndex < frames.length - 1) {
        onIndexChange(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, frames.length, onIndexChange]);

  return (
    <div className="space-y-6">
      {/* Main Frame Display */}
      <div className="relative bg-card-bg dark:bg-background-secondary rounded-lg overflow-hidden border border-border">
        {currentFrame.imageSrc ? (
          <div className="relative aspect-video">
            <Image
              src={currentFrame.imageSrc}
              alt={currentFrame.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video">
            <TaglineCard />
          </div>
        )}
      </div>

      {/* Frame Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm text-foreground-muted">
              {currentFrame.timecode}
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                moodColors[currentFrame.mood] || "bg-slate/10 text-slate"
              }`}
            >
              {currentFrame.mood}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2 capitalize">
            {currentFrame.title}
          </h3>
          <p className="text-foreground-muted leading-relaxed">
            {currentFrame.description}
          </p>
        </div>

        {/* Shot Number */}
        <div className="flex-shrink-0 w-16 h-16 bg-ember/10 dark:bg-ember/20 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold text-ember">
            {currentFrame.id}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onIndexChange(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="p-3 bg-card-bg dark:bg-background-secondary border-2 border-border hover:border-electric disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
          aria-label="Previous frame"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Progress Dots */}
        <div className="flex-1 flex items-center justify-center gap-2">
          {frames.map((frame, index) => (
            <button
              key={frame.id}
              onClick={() => onIndexChange(index)}
              className={`group relative ${
                index === activeIndex ? "w-12" : "w-3"
              } h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-ember"
                  : "bg-border hover:bg-electric/50"
              }`}
              aria-label={`Go to frame ${frame.id}`}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              {index === activeIndex && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground-muted whitespace-nowrap">
                  {frame.id} of {frames.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            onIndexChange(Math.min(frames.length - 1, activeIndex + 1))
          }
          disabled={activeIndex === frames.length - 1}
          className="p-3 bg-card-bg dark:bg-background-secondary border-2 border-border hover:border-electric disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
          aria-label="Next frame"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-3 min-w-max">
          {frames.map((frame, index) => (
            <button
              key={frame.id}
              onClick={() => onIndexChange(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? "border-ember scale-105"
                  : "border-border hover:border-electric opacity-60 hover:opacity-100"
              }`}
              aria-label={`Jump to ${frame.title}`}
            >
              {frame.imageSrc ? (
                <Image
                  src={frame.imageSrc}
                  alt={frame.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-charcoal to-offblack flex items-center justify-center">
                  <span className="text-xs text-ash font-bold">END</span>
                </div>
              )}
              {/* Frame number overlay */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-charcoal/80 rounded flex items-center justify-center">
                <span className="text-xs text-ash font-bold">{frame.id}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
