import type { Stage } from "@/lib/types";

const config: Record<Stage, { label: string; bg: string; text: string }> = {
  sourced:     { label: "Sourced",     bg: "#f0f0f0",   text: "#5b6470" },
  enriched:    { label: "Enriched",    bg: "#ede9f5",   text: "#7c5aa3" },
  sequenced:   { label: "Sequenced",   bg: "#fef3e7",   text: "#c17d3a" },
  in_outreach: { label: "In Outreach", bg: "#fdecea",   text: "#c43322" },
  replied:     { label: "Replied",     bg: "#e6f4ea",   text: "#2d7a3a" },
  meeting_booked: { label: "Meeting",  bg: "#e0f2fe",   text: "#0369a1" },
};

export function StageBadge({ stage }: { stage: Stage }) {
  const c = config[stage] ?? config.sourced;
  return (
    <span
      style={{ backgroundColor: c.bg, color: c.text }}
      className="inline-block rounded-[4px] px-2 py-0.5 text-xs font-semibold whitespace-nowrap"
    >
      {c.label}
    </span>
  );
}

export function stageColor(stage: Stage): string {
  return config[stage]?.text ?? "#5b6470";
}
