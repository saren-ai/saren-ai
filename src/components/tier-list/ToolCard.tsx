"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import type { AiTool } from "@/lib/tier-list";

interface ToolCardProps {
  tool: AiTool;
  isDragOverlay?: boolean;
}

function CardContent({ tool, isOverlay }: { tool: AiTool; isOverlay?: boolean }) {
  return (
    <div className="relative group/card">
      {tool.logo && (
        <Image
          src={tool.logo}
          alt={tool.name}
          width={48}
          height={48}
          className={`rounded-lg shrink-0 ${isOverlay ? "ring-2 ring-electric" : ""}`}
          draggable={false}
        />
      )}
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-charcoal dark:bg-card-bg rounded-md opacity-0 group-hover/card:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {tool.name}
      </span>
    </div>
  );
}

export function ToolCard({ tool, isDragOverlay }: ToolCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tool.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  if (isDragOverlay) {
    return (
      <div className="p-1.5 bg-white dark:bg-card-bg border-2 border-electric rounded-xl shadow-xl select-none">
        <CardContent tool={tool} isOverlay />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-1.5 bg-white dark:bg-card-bg border border-charcoal/15 dark:border-ember/20 rounded-xl cursor-grab active:cursor-grabbing select-none hover:border-electric hover:shadow-md transition-all"
    >
      <CardContent tool={tool} />
    </div>
  );
}
