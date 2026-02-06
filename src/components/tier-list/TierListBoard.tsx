"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { motion } from "framer-motion";

import { TierRow } from "./TierRow";
import { UnrankedPool } from "./UnrankedPool";
import { ToolCard } from "./ToolCard";
import { TierListControls } from "./TierListControls";
import { ResultsModal } from "./ResultsModal";
import {
  AI_TOOLS,
  TIER_CONFIG,
  createInitialContents,
  getToolById,
  saveVote,
  getVotes,
  aggregateVotes,
  type TierContents,
  type TierId,
  type TierResults,
} from "@/lib/tier-list";

export function TierListBoard() {
  const [tierContents, setTierContents] = useState<TierContents>(
    createInitialContents
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<TierResults | null>(null);

  // Sensors: pointer for desktop, touch for mobile, keyboard for a11y
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  // Find which container (tier or "unranked") holds a given tool id
  const findContainer = useCallback(
    (id: string): TierId | "unranked" => {
      // Check if id is a container id itself
      if (id in tierContents) return id as TierId | "unranked";
      // Find which container holds this tool
      for (const [container, items] of Object.entries(tierContents)) {
        if (items.includes(id)) return container as TierId | "unranked";
      }
      return "unranked";
    },
    [tierContents]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeContainer = findContainer(active.id as string);
      // over.id could be a tool id or a container id
      const overContainer =
        (over.id as string) in tierContents
          ? (over.id as TierId | "unranked")
          : findContainer(over.id as string);

      if (activeContainer === overContainer) return;

      setTierContents((prev) => {
        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];

        const activeIndex = activeItems.indexOf(active.id as string);
        if (activeIndex === -1) return prev;
        activeItems.splice(activeIndex, 1);

        // Insert at the hovered item's position, or at the end
        const overIndex = overItems.indexOf(over.id as string);
        overItems.splice(
          overIndex >= 0 ? overIndex : overItems.length,
          0,
          active.id as string
        );

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      });
    },
    [findContainer, tierContents]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const activeContainer = findContainer(active.id as string);
      const overContainer =
        (over.id as string) in tierContents
          ? (over.id as TierId | "unranked")
          : findContainer(over.id as string);

      // Same container — reorder
      if (activeContainer === overContainer) {
        setTierContents((prev) => {
          const items = prev[activeContainer];
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over.id as string);
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
            return prev;
          return {
            ...prev,
            [activeContainer]: arrayMove(items, oldIndex, newIndex),
          };
        });
      }
      // Cross-container move is already handled in onDragOver
    },
    [findContainer, tierContents]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  // Count how many tools are placed in tiers (not unranked)
  const placedCount =
    AI_TOOLS.length - tierContents.unranked.length;

  const handleReset = useCallback(() => {
    setTierContents(createInitialContents());
    setHasVoted(false);
  }, []);

  const handleVote = useCallback(() => {
    const placements: Record<string, TierId> = {};
    for (const tier of TIER_CONFIG) {
      for (const toolId of tierContents[tier.id]) {
        placements[toolId] = tier.id;
      }
    }
    if (Object.keys(placements).length === 0) return;

    setIsSubmitting(true);
    saveVote({ placements, timestamp: Date.now() });
    setHasVoted(true);
    setIsSubmitting(false);
  }, [tierContents]);

  const handleSeeResults = useCallback(() => {
    const votes = getVotes();
    const agg = aggregateVotes(votes);
    setResults(agg);
    setShowResults(true);
  }, []);

  const activeTool = activeId ? getToolById(activeId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile: Unranked pool on top */}
          <div className="lg:hidden">
            <UnrankedPool
              toolIds={tierContents.unranked}
              tools={AI_TOOLS}
            />
          </div>

          {/* Tier Grid */}
          <div className="flex-1 space-y-2">
            {TIER_CONFIG.map((tier) => (
              <TierRow
                key={tier.id}
                tier={tier}
                toolIds={tierContents[tier.id]}
                tools={AI_TOOLS}
              />
            ))}
          </div>

          {/* Desktop: Unranked pool on right */}
          <div className="hidden lg:block lg:w-64 xl:w-72">
            <UnrankedPool
              toolIds={tierContents.unranked}
              tools={AI_TOOLS}
            />
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay dropAnimation={null}>
          {activeTool ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05, rotate: 1 }}
            >
              <ToolCard tool={activeTool} isDragOverlay />
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Controls */}
      <TierListControls
        onReset={handleReset}
        onVote={handleVote}
        onSeeResults={handleSeeResults}
        hasVoted={hasVoted}
        isSubmitting={isSubmitting}
        canVote={placedCount > 0}
      />

      {/* Results Modal */}
      <ResultsModal
        results={results}
        isOpen={showResults}
        onClose={() => setShowResults(false)}
      />
    </>
  );
}
