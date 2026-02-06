"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ToolCard } from "./ToolCard";
import type { AiTool } from "@/lib/tier-list";

interface UnrankedPoolProps {
  toolIds: string[];
  tools: AiTool[];
}

export function UnrankedPool({ toolIds, tools }: UnrankedPoolProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "unranked" });

  const toolMap = new Map(tools.map((t) => [t.id, t]));

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border p-4 transition-colors ${
        isOver
          ? "bg-electric/10 border-electric dark:bg-electric/10 dark:border-electric"
          : "bg-white border-charcoal/10 dark:bg-card-bg dark:border-ember/20"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-charcoal dark:text-foreground uppercase tracking-wider">
          Your Tools
        </h3>
        <span className="text-xs font-mono bg-charcoal/10 dark:bg-ember/10 text-foreground-muted px-2 py-0.5 rounded-full">
          {toolIds.length}
        </span>
      </div>

      <SortableContext items={toolIds} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 gap-2">
          {toolIds.map((id) => {
            const tool = toolMap.get(id);
            if (!tool) return null;
            return <ToolCard key={id} tool={tool} />;
          })}
        </div>
      </SortableContext>

      {toolIds.length === 0 && (
        <p className="text-xs text-foreground-muted/40 italic text-center py-4">
          All tools ranked!
        </p>
      )}
    </div>
  );
}
