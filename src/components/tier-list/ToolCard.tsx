"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { AiTool } from "@/lib/tier-list";

interface ToolCardProps {
  tool: AiTool;
  isDragOverlay?: boolean;
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
      <div className="bg-white dark:bg-card-bg border-2 border-electric rounded-lg px-3 py-2 shadow-xl select-none">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3 h-3 text-electric" />
          <div>
            <span className="text-sm font-semibold text-charcoal dark:text-foreground">
              {tool.name}
            </span>
            <span className="block text-[10px] text-foreground-muted font-mono">
              {tool.category}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-card-bg border border-charcoal/15 dark:border-ember/20 rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing select-none hover:border-electric hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2">
        <GripVertical className="w-3 h-3 text-foreground-muted/40 shrink-0" />
        <div className="min-w-0">
          <span className="text-sm font-semibold text-charcoal dark:text-foreground whitespace-nowrap">
            {tool.name}
          </span>
          <span className="block text-[10px] text-foreground-muted font-mono">
            {tool.category}
          </span>
        </div>
      </div>
    </div>
  );
}
