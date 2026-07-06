"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchPipeline } from "@/app/actions";
import type { PipelineContact, Stage } from "@/lib/types";
import { StageBadge } from "./stage-badge";
import { ContactPanel } from "./contact-panel";

const STAGES: Array<{ value: Stage | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "sourced", label: "Sourced" },
  { value: "enriched", label: "Enriched" },
  { value: "sequenced", label: "Sequenced" },
  { value: "in_outreach", label: "In Outreach" },
  { value: "replied", label: "Replied" },
  { value: "meeting_booked", label: "Meeting" },
];

const ACTION_LABEL: Record<string, string> = {
  enrich: "Needs enrichment",
  write_sequence: "Write sequence",
  review_and_send: "Review & send",
  send_next_touch: "Send next touch",
  respond: "Respond",
  prep_meeting: "Prep meeting",
};

export function Pipeline() {
  const [contacts, setContacts] = useState<PipelineContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState<Stage | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function load() {
    const { contacts } = await fetchPipeline();
    setContacts(contacts);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered =
    activeStage === "all"
      ? contacts
      : contacts.filter((c) => c.stage === activeStage);

  const counts = STAGES.reduce(
    (acc, s) => {
      acc[s.value] =
        s.value === "all"
          ? contacts.length
          : contacts.filter((c) => c.stage === s.value).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const selected = contacts.find((c) => c.contact_id === selectedId) ?? null;

  function handleRemove(contactId: string) {
    setContacts((prev) => prev.filter((c) => c.contact_id !== contactId));
    if (selectedId === contactId) setSelectedId(null);
  }

  function handleRefresh() {
    startTransition(() => {
      load();
    });
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f5f5f7" }}>
      {/* Left: list */}
      <div
        className="flex flex-col overflow-hidden border-r"
        style={{
          width: selected ? "42%" : "100%",
          borderColor: "#e5e7eb",
          transition: "width 0.2s ease",
        }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold" style={{ color: "#1d1d1f" }}>
              Lead Pipeline
            </h1>
            <button
              onClick={handleRefresh}
              className="text-xs px-3 py-1.5 rounded-full border font-medium"
              style={{ borderColor: "#d1d5db", color: "#5b6470" }}
            >
              Refresh
            </button>
          </div>
          {/* Stage tabs */}
          <div className="flex gap-1 flex-wrap">
            {STAGES.map((s) => (
              <button
                key={s.value}
                onClick={() => setActiveStage(s.value)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                style={
                  activeStage === s.value
                    ? { background: "#1d1d1f", color: "#fff" }
                    : { background: "#e8e8ea", color: "#5b6470" }
                }
              >
                {s.label}
                {counts[s.value] > 0 && (
                  <span className="ml-1.5 font-mono">{counts[s.value]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-sm" style={{ color: "#5b6470" }}>
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm" style={{ color: "#5b6470" }}>
              No contacts in this stage.
            </div>
          ) : (
            filtered.map((c) => (
              <ContactRow
                key={c.contact_id}
                contact={c}
                selected={c.contact_id === selectedId}
                onClick={() =>
                  setSelectedId((prev) =>
                    prev === c.contact_id ? null : c.contact_id
                  )
                }
              />
            ))
          )}
        </div>
      </div>

      {/* Right: detail panel */}
      {selected && (
        <div className="flex-1 overflow-hidden">
          <ContactPanel
            pipeline={selected}
            onClose={() => setSelectedId(null)}
            onRemove={handleRemove}
            onRefresh={handleRefresh}
          />
        </div>
      )}
    </div>
  );
}

function ContactRow({
  contact,
  selected,
  onClick,
}: {
  contact: PipelineContact;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-3.5 border-b flex items-start gap-3 transition-colors"
      style={{
        borderColor: "#ebebed",
        background: selected ? "#fff" : "transparent",
      }}
    >
      {/* Overdue dot */}
      <div className="mt-1.5 shrink-0">
        {contact.overdue ? (
          <div className="w-2 h-2 rounded-full" style={{ background: "#c43322" }} />
        ) : (
          <div className="w-2 h-2 rounded-full" style={{ background: "#d1d5db" }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-sm truncate" style={{ color: "#1d1d1f" }}>
            {contact.full_name}
          </span>
          <StageBadge stage={contact.stage} />
        </div>
        <div className="text-xs truncate" style={{ color: "#5b6470" }}>
          {[contact.title, contact.company].filter(Boolean).join(" · ")}
        </div>
        <div className="text-xs mt-1" style={{ color: "#9ca3af" }}>
          {ACTION_LABEL[contact.next_action] ?? contact.next_action}
          {contact.overdue && contact.next_due && (
            <span className="ml-2 font-mono" style={{ color: "#c43322" }}>
              due {contact.next_due}
            </span>
          )}
        </div>
      </div>

      {contact.fit_score != null && (
        <span
          className="text-xs font-mono shrink-0 mt-0.5"
          style={{ color: "#7c5aa3" }}
        >
          {Math.round(contact.fit_score)}
        </span>
      )}
    </button>
  );
}
