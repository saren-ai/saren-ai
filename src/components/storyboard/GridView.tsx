"use client";

import Image from "next/image";
import type { StoryboardFrame } from "@/lib/storyboard";
import { moodColors } from "@/lib/storyboard";

interface GridViewProps {
  frames: StoryboardFrame[];
  onFrameClick: (index: number) => void;
}

export default function GridView({ frames, onFrameClick }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {frames.map((frame, index) => (
        <button
          key={frame.id}
          onClick={() => onFrameClick(index)}
          className="group relative bg-card-bg dark:bg-background-secondary rounded-lg overflow-hidden border border-border hover:border-ember transition-all hover:shadow-xl text-left"
        >
          {/* Image */}
          <div className="relative aspect-video bg-charcoal/10 dark:bg-background">
            {frame.imageSrc ? (
              <Image
                src={frame.imageSrc}
                alt={frame.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-charcoal to-offblack flex items-center justify-center">
                <span className="text-2xl text-ash font-bold">
                  TITLE CARD
                </span>
              </div>
            )}
            
            {/* Shot number badge */}
            <div className="absolute top-3 left-3 w-10 h-10 bg-ember rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">{frame.id}</span>
            </div>

            {/* Mood badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  moodColors[frame.mood] || "bg-slate/10 text-slate"
                } backdrop-blur-sm`}
              >
                {frame.mood}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-foreground capitalize">
                {frame.title}
              </h3>
              <span className="font-mono text-sm text-foreground-muted">
                {frame.timecode}
              </span>
            </div>
            <p className="text-sm text-foreground-muted line-clamp-2">
              {frame.description}
            </p>
          </div>

          {/* Hover indicator */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-ember/50 rounded-lg pointer-events-none transition-all" />
        </button>
      ))}
    </div>
  );
}
