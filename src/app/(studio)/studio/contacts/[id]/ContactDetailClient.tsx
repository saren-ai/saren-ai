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
  FlaskConical,
  Sparkles,
  Building2,
  Tag,
  Star,
  Loader2,
} from "lucide-react";
import StatusPill from "@/components/studio/StatusPill";
import RelativeTime from "@/components/studio/RelativeTime";
import TouchDots from "@/components/studio/TouchDots";
import ThreadBubble, { type ThreadItem } from "@/components/studio/ThreadBubble";
import JobTriggers, { type AgentJob } from "@/components/studio/JobTriggers";
import { updateContactField, logReply, queueJob, pushToDrafts } from "./actions";
import type { Tables } from "@/lib/supabase/database.types";

type Contact = Tables<"contacts">;
type Sequence = Tables<"sequences"> & {
  touches: Tables<"touches">[];
};

interface Props {
  contact: Contact;
  sequences: Sequence[];
  jobs: AgentJob[];
  researchJob: AgentJob | null;
  sources: { source: string | null; raw: Record<string, unknown> | null; imported_at: string | null }[];
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

function ResearchPanel({
  contact,
  researchJob,
}: {
  contact: Contact;
  researchJob: AgentJob | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [queued, setQueued] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function requestResearch() {
    startTransition(async () => {
      const res = await queueJob(contact.id, "research");
      setQueued(true);
      setNotice(res.queued ? "Queued — picks up next hour." : "Already pending.");
    });
  }

  if (!researchJob) {
    return (
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical size={15} className="text-foreground-muted" />
          <h2 className="text-sm font-semibold text-foreground">Research</h2>
        </div>
        <p className="text-sm text-foreground-muted mb-4">
          No research completed yet for{" "}
          <span className="font-medium text-foreground">{contact.full_name}</span>
          {contact.company ? ` at ${contact.company}` : ""}.
        </p>
        {queued ? (
          <div className="flex items-center gap-2 text-sm text-lavender">
            <Loader2 size={14} className="animate-spin" />
            <span>{notice}</span>
          </div>
        ) : (
          <button
            onClick={requestResearch}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-lavender/50 text-lavender text-sm py-2.5 hover:bg-lavender/10 transition-colors disabled:opacity-50"
          >
            <Sparkles size={14} />
            Deep Dive — Request Research
          </button>
        )}
        {notice && !queued && (
          <p className="mt-2 text-xs text-foreground-muted">{notice}</p>
        )}
      </div>
    );
  }

  const summary = researchJob.result?.summary ?? null;
  const fullResult = researchJob.result as Record<string, unknown> | null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FlaskConical size={15} className="text-lavender" />
          <h2 className="text-sm font-semibold text-foreground">Research</h2>
        </div>
        <span className="text-[10px] font-mono text-foreground-muted">
          <RelativeTime iso={researchJob.finished_at ?? researchJob.created_at} />
        </span>
      </div>

      {summary && (
        <div className="mb-4 text-sm text-foreground leading-relaxed bg-lavender/5 border border-lavender/20 rounded-lg px-4 py-3">
          {summary}
        </div>
      )}

      {/* Render any structured keys from the result beyond "summary" */}
      {fullResult && Object.keys(fullResult).filter((k) => k !== "summary").length > 0 && (
        <div className="flex flex-col gap-3">
          {Object.entries(fullResult)
            .filter(([k]) => k !== "summary")
            .map(([key, val]) => (
              <div key={key}>
                <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-sm text-foreground">
                  {typeof val === "string" ? val : JSON.stringify(val)}
                </p>
              </div>
            ))}
        </div>
      )}

      <button
        onClick={requestResearch}
        disabled={isPending || queued}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-border text-foreground-muted text-xs py-2 hover:border-lavender hover:text-lavender transition-colors disabled:opacity-50"
      >
        <Sparkles size={12} />
        {queued ? "Refresh queued…" : "Refresh research"}
      </button>
    </div>
  );
}

function ContactMeta({ contact }: { contact: Contact }) {
  const hasAnyMeta = contact.segment || contact.seniority || contact.fit_score || contact.buying_role_hypothesis;
  if (!hasAnyMeta) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-foreground mb-3">Intel</h2>
      <div className="flex flex-col gap-2">
        {contact.segment && (
          <div className="flex items-center gap-2">
            <Tag size={12} className="text-foreground-muted flex-shrink-0" />
            <span className="text-xs text-foreground-muted">Segment</span>
            <span className="ml-auto text-xs font-medium text-lavender">{contact.segment}</span>
          </div>
        )}
        {contact.seniority && (
          <div className="flex items-center gap-2">
            <Building2 size={12} className="text-foreground-muted flex-shrink-0" />
            <span className="text-xs text-foreground-muted">Seniority</span>
            <span className="ml-auto text-xs font-medium text-foreground">{contact.seniority}</span>
          </div>
        )}
        {contact.fit_score != null && (
          <div className="flex items-center gap-2">
            <Star size={12} className="text-foreground-muted flex-shrink-0" />
            <span className="text-xs text-foreground-muted">Fit score</span>
            <span className={`ml-auto text-xs font-mono font-bold ${contact.fit_score >= 70 ? "text-ember" : contact.fit_score >= 40 ? "text-copper" : "text-foreground-muted"}`}>
              {contact.fit_score}
            </span>
          </div>
        )}
        {contact.buying_role_hypothesis && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">Buying role hypothesis</p>
            <p className="text-xs text-foreground">{contact.buying_role_hypothesis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TouchDetailPanel({
  touch,
  contactId,
  contactEmail,
}: {
  touch: Tables<"touches">;
  contactId: string;
  contactEmail: string | null;
}) {
  const [body, setBody] = useState(touch.body_md ?? "");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [draftNotice, setDraftNotice] = useState<string | null>(null);
  const thread = (touch.thread ?? []) as unknown as ThreadItem[];

  // Track if the body has been edited vs the saved version
  const isDirty = body !== (touch.body_md ?? "");
  const isSent = !!touch.sent_at;

  function handlePushToDrafts() {
    startTransition(async () => {
      const res = await pushToDrafts(contactId, touch.id, body, touch.subject, contactEmail);
      setDraftNotice(
        res.queued
          ? "Queued — will appear in Gmail on the next job run."
          : "A draft job is already pending for this contact."
      );
    });
  }

  function handleReplySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await logReply(contactId, touch.id, fd);
      setShowReplyForm(false);
    });
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-foreground-muted">
            Touch {touch.touch_num} · {touch.channel ?? "email"}
            {isSent && touch.sent_at && (
              <> · sent <RelativeTime iso={touch.sent_at} /></>
            )}
          </p>
          {touch.sentiment && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-foreground/10 text-foreground-muted capitalize">
              {touch.sentiment}
            </span>
          )}
        </div>
        {touch.subject && (
          <h3 className="text-base font-semibold text-foreground leading-snug">{touch.subject}</h3>
        )}
        {contactEmail && (
          <p className="text-xs text-foreground-muted mt-0.5">To: {contactEmail}</p>
        )}
      </div>

      {/* Editable email body — the main workspace */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted font-semibold">
            {isSent ? "Sent body" : "Draft body"}
          </p>
          {isDirty && (
            <span className="text-[10px] text-copper font-medium">edited</span>
          )}
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          readOnly={isSent}
          rows={12}
          className={`w-full flex-1 bg-background border rounded-lg px-4 py-3 text-sm text-foreground font-sans leading-relaxed resize-none focus:outline-none transition-colors ${
            isSent
              ? "border-border opacity-70 cursor-default"
              : "border-border focus:border-lavender"
          }`}
          placeholder="No body yet — the draft will appear here once the engine writes it."
        />
      </div>

      {/* Open/clicked tracking (sent touches) */}
      {(touch.opened_at || touch.clicked_at) && (
        <div className="flex items-center gap-4 text-xs text-foreground-muted">
          {touch.opened_at && <span>Opened <RelativeTime iso={touch.opened_at} /></span>}
          {touch.clicked_at && <span>Clicked <RelativeTime iso={touch.clicked_at} /></span>}
        </div>
      )}

      {/* Thread (inbound replies) */}
      {thread.length > 0 && (
        <div className="border-t border-border pt-3">
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-2">Thread</p>
          <div className="flex flex-col gap-1">
            {thread.map((item, i) => (
              <ThreadBubble key={i} {...item} />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-2 border-t border-border">
        {/* Primary: Post to Gmail Drafts (only when not yet sent) */}
        {!isSent && (
          <>
            <button
              onClick={handlePushToDrafts}
              disabled={isPending || !body.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-ember text-white text-sm font-semibold py-2.5 hover:bg-ember/90 disabled:opacity-50 transition-colors"
            >
              <Mail size={14} />
              {isPending ? "Queuing…" : "Post this version to Drafts"}
            </button>
            {draftNotice && (
              <p className="text-[11px] text-foreground-muted text-center">{draftNotice}</p>
            )}
          </>
        )}

        {/* Secondary: Log a reply (always available) */}
        {showReplyForm ? (
          <form onSubmit={handleReplySubmit} className="flex flex-col gap-2">
            <textarea
              name="body"
              rows={3}
              required
              placeholder="Log their reply…"
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
                {isPending ? "Saving…" : "Save reply"}
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
            className="w-full text-xs text-foreground-muted border border-border rounded-lg py-2 hover:border-foreground-muted hover:text-foreground transition-colors"
          >
            Log a reply from them
          </button>
        )}
      </div>
    </div>
  );
}

export default function ContactDetailClient({ contact, sequences, jobs, researchJob, sources }: Props) {
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

  const apolloRaw = sources.find((s) => s.source === "apollo")?.raw as Record<string, unknown> | null;

  return (
    <div className="min-h-screen bg-background p-8 max-w-7xl mx-auto">
      <p className="text-foreground-muted text-xs font-mono mb-6">
        <Link href="/studio" className="hover:text-foreground transition-colors">studio</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground">{contact.full_name}</span>
      </p>

      <div className="grid grid-cols-[300px_300px_1fr] gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Contact card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-lavender/20 text-lavender flex items-center justify-center text-sm font-bold flex-shrink-0">
                {(contact.full_name ?? "").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{contact.full_name}</p>
                <p className="text-xs text-foreground-muted truncate">{contact.title ?? "—"}</p>
              </div>
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">Contact fields</h2>
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

          {/* Intel badges */}
          <ContactMeta contact={contact} />

          {/* Apollo raw data (collapsed) */}
          {apolloRaw && <ApolloRawPanel raw={apolloRaw} />}

          {/* Engine job triggers */}
          <JobTriggers contactId={contact.id} jobs={jobs} />
        </div>

        {/* Center column: research brief + sequence timeline */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[90vh]">
          {/* Research panel — prominent at the top */}
          <ResearchPanel contact={contact} researchJob={researchJob} />

          {/* Sequence + touch timeline */}
          <div className="bg-card border border-border rounded-xl p-5">
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
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-foreground/5 transition-colors"
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
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-foreground/5 transition-colors border-b border-border/50 last:border-0 ${
                                selectedTouchId === touch.id ? "bg-foreground/10" : ""
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
        </div>

        {/* Right column: touch detail panel */}
        <div className="bg-card border border-border rounded-xl p-5 max-h-[90vh] overflow-y-auto">
          {selectedTouch ? (
            <TouchDetailPanel touch={selectedTouch} contactId={contact.id} contactEmail={contact.email} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Mail size={24} className="text-foreground-muted mb-3 opacity-40" />
              <p className="text-foreground-muted text-sm">
                Select a touch to see details and the email thread.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ApolloRawPanel({ raw }: { raw: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);

  const interesting: [string, string][] = [
    ["headline", raw.headline as string],
    ["city", raw.city as string],
    ["state", raw.state as string],
    ["country", raw.country as string],
    ["departments", Array.isArray(raw.departments) ? (raw.departments as string[]).join(", ") : null],
    ["subdepartments", Array.isArray(raw.subdepartments) ? (raw.subdepartments as string[]).join(", ") : null],
    ["seniority", raw.seniority as string],
    ["functions", Array.isArray(raw.functions) ? (raw.functions as string[]).join(", ") : null],
    ["keywords", Array.isArray(raw.keywords) ? (raw.keywords as string[]).slice(0, 8).join(", ") : null],
    ["organization_website_url", ((raw.organization as Record<string, unknown>)?.website_url as string) ?? null],
    ["organization_industry", (raw.organization as Record<string, unknown>)?.industry as string],
    ["organization_headcount", (raw.organization as Record<string, unknown>)?.estimated_num_employees as string],
    ["organization_linkedin", (raw.organization as Record<string, unknown>)?.linkedin_url as string],
  ].filter((pair): pair is [string, string] => Boolean(pair[1]));

  if (interesting.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-foreground/5 transition-colors"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Apollo data</span>
        {open ? <ChevronDown size={14} className="text-foreground-muted" /> : <ChevronRight size={14} className="text-foreground-muted" />}
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-border">
          <div className="flex flex-col gap-2 pt-3">
            {interesting.map(([key, val]) => (
              <div key={key} className="flex items-start gap-2">
                <span className="text-[10px] uppercase tracking-wider text-foreground-muted w-28 flex-shrink-0 pt-0.5">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-xs text-foreground flex-1 break-words">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
