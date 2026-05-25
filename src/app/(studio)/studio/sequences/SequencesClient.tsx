"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import StatusPill from "@/components/studio/StatusPill";
import RelativeTime from "@/components/studio/RelativeTime";
import TouchDots from "@/components/studio/TouchDots";
import { updateSequenceStatus, addTouch } from "./actions";
import type { Tables } from "@/lib/supabase/database.types";

type Touch = Tables<"touches">;
type Sequence = Tables<"sequences"> & {
  touches: Touch[];
  contacts: { full_name: string; company: string | null; id: string } | null;
};

interface Props {
  groups: Record<string, Sequence[]>;
}

const SEQUENCE_STATUSES = ["queued", "active", "paused", "completed", "dead"];

function AddTouchForm({
  sequenceId,
  onDone,
}: {
  sequenceId: string;
  onDone: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await addTouch(sequenceId, fd);
      onDone();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border px-4 py-4 flex flex-col gap-3 bg-background/50"
    >
      <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Add touch</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Channel</label>
          <select
            name="channel"
            className="w-full bg-background border border-border rounded-lg px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-lavender"
          >
            <option value="email">Email</option>
            <option value="linkedin">LinkedIn</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Scheduled</label>
          <input
            name="scheduled_at"
            type="datetime-local"
            className="w-full bg-background border border-border rounded-lg px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-lavender"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Subject</label>
        <input
          name="subject"
          type="text"
          className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-lavender"
        />
      </div>
      <div>
        <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Body</label>
        <textarea
          name="body_md"
          rows={3}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-lavender"
        />
      </div>
      <div className="flex items-center gap-2">
        <button type="submit" disabled={isPending} className="btn-primary text-xs py-1.5 px-4">
          {isPending ? "Saving…" : "Add touch"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-xs text-foreground-muted hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function SequenceCard({ seq }: { seq: Sequence }) {
  const [showAddTouch, setShowAddTouch] = useState(false);
  const [isPending, startTransition] = useTransition();

  const statuses = seq.touches.map((t) => t.status);
  const lastActivity =
    seq.touches
      .map((t) => t.sent_at ?? t.scheduled_at)
      .filter(Boolean)
      .sort()
      .at(-1) ?? seq.updated_at;

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateSequenceStatus(seq.id, newStatus);
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/studio/contacts/${seq.contacts?.id}`}
            className="text-sm font-semibold text-foreground hover:text-ember transition-colors truncate"
          >
            {seq.contacts?.full_name ?? "Unknown"}
          </Link>
          {seq.contacts?.company && (
            <span className="text-xs text-foreground-muted truncate">
              {seq.contacts.company}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <select
            value={seq.status ?? "queued"}
            onChange={handleStatusChange}
            disabled={isPending}
            className="bg-transparent text-xs border border-border rounded-full px-3 py-1 text-foreground focus:outline-none focus:border-lavender cursor-pointer"
          >
            {SEQUENCE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <TouchDots statuses={statuses} />
          {lastActivity && (
            <span className="text-xs text-foreground-muted">
              <RelativeTime iso={lastActivity} />
            </span>
          )}
          <button
            onClick={() => setShowAddTouch((v) => !v)}
            className="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground transition-colors"
          >
            <Plus size={13} />
            Touch
          </button>
        </div>
      </div>

      {showAddTouch && (
        <AddTouchForm sequenceId={seq.id} onDone={() => setShowAddTouch(false)} />
      )}
    </div>
  );
}

function PlayGroup({
  play,
  sequences,
}: {
  play: string;
  sequences: Sequence[];
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 mb-3 text-left w-full group"
      >
        {expanded ? (
          <ChevronDown size={15} className="text-foreground-muted" />
        ) : (
          <ChevronRight size={15} className="text-foreground-muted" />
        )}
        <span className="text-sm font-semibold text-foreground font-mono">{play}</span>
        <span className="text-xs text-foreground-muted">
          {sequences.length} {sequences.length === 1 ? "contact" : "contacts"}
        </span>
      </button>

      {expanded && (
        <div className="flex flex-col gap-3 pl-5">
          {sequences.map((seq) => (
            <SequenceCard key={seq.id} seq={seq} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SequencesClient({ groups }: Props) {
  const plays = Object.keys(groups);

  if (!plays.length) {
    return (
      <p className="text-center py-24 text-foreground-muted">
        No sequences yet. Add a contact and start a play.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {plays.map((play) => (
        <PlayGroup key={play} play={play} sequences={groups[play]} />
      ))}
    </div>
  );
}
