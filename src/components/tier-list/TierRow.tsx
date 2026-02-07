"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ToolCard } from "./ToolCard";
import type { TierConfig, AiTool } from "@/lib/tier-list";

interface TierRowProps {
  tier: TierConfig;
  toolIds: string[];
  tools: AiTool[];
}

export function TierRow({ tier, toolIds, tools }: TierRowProps) {
  const { setNodeRef, isOver } = useDroppable({ id: tier.id });

  const toolMap = new Map(tools.map((t) => [t.id, t]));

  return (
    <div className="flex items-stretch">
      {/* Tier Label */}
      <div
        className="w-16 md:w-24 flex items-center justify-center font-bold text-2xl md:text-3xl shrink-0 rounded-l-lg"
        style={{ backgroundColor: tier.color, color: tier.textColor }}
      >
        {tier.label}
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 flex flex-wrap items-center gap-2 p-2 md:p-3 rounded-r-lg border transition-colors min-h-[68px] ${
          isOver
            ? "bg-electric/10 border-electric dark:bg-electric/10 dark:border-electric"
            : "bg-charcoal/5 border-charcoal/10 dark:bg-background-secondary dark:border-ember/10"
        }`}
      >
        <SortableContext
          items={toolIds}
          strategy={horizontalListSortingStrategy}
        >
          {toolIds.map((id) => {
            const tool = toolMap.get(id);
            if (!tool) return null;
            return <ToolCard key={id} tool={tool} />;
          })}
        </SortableContext>
        {toolIds.length === 0 && (
          <span className="text-xs text-foreground-muted/40 italic select-none">
            Drag tools here
          </span>
        )}
      </div>
    </div>
  );
}
