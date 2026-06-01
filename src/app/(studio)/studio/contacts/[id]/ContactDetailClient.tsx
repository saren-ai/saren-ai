"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  Briefcase,
  User,
  StickyNote,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import StatusPill from "@/components/studio/StatusPill";
import RelativeTime from "@/components/studio/RelativeTime";
import TouchDots from "@/components/studio/TouchDots";
import ThreadBubble, { type ThreadItem } from "@/components/studio/ThreadBubble";
import JobTriggers, { type AgentJob } from "@/components/studio/JobTriggers";
import { updateContactField, logReply } from "./actions";
import type { Tables } from "@/lib/supabase/database.types";

type Contact = Tables<"contacts">;
type Sequence = Tables<"sequences"> & {
  touches: Tables<"touches">[];
};

interface Props {
  contact: Contact;
  sequences: Sequence[];
  jobs: AgentJob[];
}

const EDITABLE_FIELDS: {
  key: keyof Contact;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  multiline?: boolean;
}[] = [
  { key: "full_name", label: "Name", icon: User },
  { key: "email", label: "Email", icon: Mail },
  { key: "company", label: "Company", icon: Briefcase },
  { key: "title", label: "Title", icon: Briefcase },
  { key: "location", label: "Location", icon: MapPin },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "linkedin_url", label: "LinkedIn", icon: Linkedin },
  { key: "notes", label: "Notes", icon: StickyNote, multiline: true },
];

function InlineField({
  contactId,
  fieldKey,
  label,
  value,
  icon: Icon,
  multiline,
}: {
  contactId: string;
  fieldKey: string;
  label: string;
  value: string | null;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [isPending, startTransition] = useTransition();

  function save() {
    if (draft === (value ?? "")) {
      setEditing(false);
      return;
    }
    startTransition(async () => {
      await updateContactField(contactId, fieldKey, draft);
      setEditing(false);
    });
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !multiline) save();
    if (e.key === "Escape") {
      setDraft(value ?? "");
      setEditing(false);
    }
  }

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <Icon size={14} className="text-foreground-muted mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-foreground-muted uppercase tracking-wider mb-0.5">{label}</p>
        {editing ? (
          multiline ? (
            <textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={handleKey}
              rows={3}
              className="w-full bg-background border border-lavender rounded px-2 py-1 text-sm text-foreground resize-none focus:outline-none"
            />
          ) : (
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={handleKey}
              className="w-full bg-background border border-lavender rounded px-2 py-1 text-sm text-foreground focus:outline-none"
            />
          )
        ) : (
          <button
            onClick={() => {
              setDraft(value ?? "");
              setEditing(true);
            }}
            className="text-sm text-left w-full text-foreground hover:text-ember transition-colors disabled:opacity-50 truncate"
            disabled={isPending}
          >
            {value || <span className="text-foreground-muted italic">—</span>}
          </button>
        )}
      </div>
    </div>
  );
}

function TouchDetailPanel({
  touch,
  contactId,
}: {
  touch: Tables<"touches">;
  contactId: string;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const thread = (touch.thread ?? []) as unknown as ThreadItem[];

  function handleReplySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await logReply(contactId, touch.id, fd);
      setShowReplyForm(false);
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <p className="text-xs text-foreground-muted mb-1">
          Touch {touch.touch_num} · {touch.channel ?? "—"}
          {touch.sent_at && (
            <>
              {" · "}
              <RelativeTime iso={touch.sent_at} />
            </>
          )}
        </p>
        {touch.subject && (
          <h3 className="text-base font-semibold text-foreground">{touch.subject}</h3>
        )}
        {touch.sentiment && (
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-foreground/10 text-foreground-muted capitalize">
            {touch.sentiment}
          </span>
        )}
      </div>

      {touch.body_md && (
        <div className="mb-4 text-sm text-foreground-muted prose prose-sm max-w-none prose-p:my-1 [&_*]:text-foreground-muted border border-border rounded-lg px-4 py-3">
          <pre className="whitespace-pre-wrap font-sans text-sm">{touch.body_md}</pre>
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-foreground-muted mb-4">
        {touch.opened_at && (
          <span>Opened <RelativeTime iso={touch.opened_at} /></span>
        )}
        {touch.clicked_at && (
          <span>Clicked <RelativeTime iso={touch.clicked_at} /></span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        {thread.length > 0 ? (
          thread.map((item, i) => (
            <ThreadBubble key={i} {...item} />
          ))
        ) : (
          <p className="text-xs text-foreground-muted italic">No thread yet.</p>
        )}
      </div>

      {showReplyForm ? (
        <form onSubmit={handleReplySubmit} className="flex flex-col gap-2">
          <textarea
            name="body"
            rows={3}
            required
            placeholder="Log reply…"
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-lavender"
          />
          <div className="flex items-center gap-2">
            <select
              name="sentiment"
              defaultValue="neutral"
              className="bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-lavender"
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
            <button type="submit" disabled={isPending} className="btn-primary text-xs py-1.5 px-4">
              {isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowReplyForm(true)}
          className="btn-lavender text-xs py-1.5 w-full"
        >
          Log reply
        </button>
      )}
    </div>
  );
}

export default function ContactDetailClient({ contact, sequences, jobs }: Props) {
  const [selectedTouchId, setSelectedTouchId] = useState<string | null>(null);
  const [expandedSeqIds, setExpandedSeqIds] = useState<Set<string>>(
    new Set(sequences.map((s) => s.id))
  );

  const selectedTouch = sequences
    .flatMap((s) => s.touches)
    .find((t) => t.id === selectedTouchId);

  function toggleSeq(id: string) {
    setExpandedSeqIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const channelIcon = (ch: string | null) => {
    if (ch === "linkedin") return <Linkedin size={12} />;
    if (ch === "phone") return <Phone size={12} />;
    return <Mail size={12} />;
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <p className="text-foreground-muted text-xs font-mono mb-6">
        <Link href="/studio" className="hover:text-foreground transition-colors">studio</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">{contact.full_name}</span>
      </p>

      <div className="grid grid-cols-[280px_1fr_320px] gap-6">
        {/* Left — contact card + engine triggers */}
        <div className="flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Contact</h2>
            {EDITABLE_FIELDS.map(({ key, label, icon, multiline }) => (
              <InlineField
                key={key}
                contactId={contact.id}
                fieldKey={key}
                label={label}
                value={(contact[key] as string | null) ?? null}
                icon={icon}
                multiline={multiline}
              />
            ))}
          </div>
          <JobTriggers contactId={contact.id} jobs={jobs} />
        </div>

        {/* Center — sequence + touch timeline */}
        <div className="bg-card border border-border rounded-xl p-5 overflow-y-auto max-h-[85vh]">
          <h2 className="text-sm font-semibold text-foreground mb-4">Sequences</h2>

          {sequences.length === 0 ? (
            <p className="text-foreground-muted text-sm">No sequences yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {sequences.map((seq) => {
                const expanded = expandedSeqIds.has(seq.id);
                const statuses = seq.touches.map((t) => t.status);
                return (
                  <div key={seq.id} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSeq(seq.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <span className="text-sm font-medium text-foreground">{seq.play}</span>
                        <StatusPill status={seq.status ?? "queued"} variant="sequence" />
                      </div>
                      <div className="flex items-center gap-3">
                        <TouchDots statuses={statuses} />
                        {seq.started_at && (
                          <span className="text-xs text-foreground-muted">
                            <RelativeTime iso={seq.started_at} />
                          </span>
                        )}
                      </div>
                    </button>

                    {expanded && seq.touches.length > 0 && (
                      <div className="border-t border-border">
                        {seq.touches.map((touch) => (
                          <button
                            key={touch.id}
                            onClick={() => setSelectedTouchId(touch.id === selectedTouchId ? null : touch.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors border-b border-border/50 last:border-0 ${
                              selectedTouchId === touch.id ? "bg-white/10" : ""
                            }`}
                          >
                            <span className="text-foreground-muted">
                              {channelIcon(touch.channel)}
                            </span>
                            <span className="text-xs text-foreground-muted font-mono w-5">
                              {touch.touch_num}
                            </span>
                            <span className="flex-1 text-sm text-foreground truncate">
                              {touch.subject ?? touch.channel ?? "—"}
                            </span>
                            <StatusPill status={touch.status ?? "pending"} variant="touch" />
                            {touch.sent_at && (
                              <span className="text-xs text-foreground-muted">
                                <RelativeTime iso={touch.sent_at} />
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right — touch detail */}
        <div className="bg-card border border-border rounded-xl p-5 max-h-[85vh] overflow-y-auto">
          {selectedTouch ? (
            <TouchDetailPanel touch={selectedTouch} contactId={contact.id} />
          ) : (
            <p className="text-foreground-muted text-sm italic">
              Select a touch to see details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
