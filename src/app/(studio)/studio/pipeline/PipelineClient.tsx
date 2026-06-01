"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Send, MessageSquareReply, Archive, FlaskConical, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { logTouchSent, markReplied, archiveContact, queueResearchFromPipeline } from "./actions";

export interface PipelineRow {
  contact_id: string;
  client: string | null;
  company: string | null;
  full_name: string | null;
  title: string | null;
  segment: string | null;
  fit_score: number | null;
  stage: "sourced" | "enriched" | "sequenced" | "in_outreach" | "replied";
  next_action: "enrich" | "write_sequence" | "review_and_send" | "send_next_touch" | "respond";
  next_due: string | null;
  overdue: boolean | null;
  priority: number | null;
}

const STAGES = [
  { key: "sourced", label: "Sourced" },
  { key: "enriched", label: "Enriched" },
  { key: "sequenced", label: "Sequenced" },
  { key: "in_outreach", label: "In outreach" },
  { key: "replied", label: "Replied" },
] as const;

const ACTION_LABEL: Record<PipelineRow["next_action"], string> = {
  enrich: "Enrich",
  write_sequence: "Write sequence",
  review_and_send: "Review & send",
  send_next_touch: "Send next touch",
  respond: "Respond",
};

function initials(n: string | null) {
  return (n ?? "").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function dueLabel(r: PipelineRow) {
  if (!r.next_due) return "";
  const d = new Date(r.next_due + "T12:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (r.overdue) return `${Math.abs(diff)}d overdue`;
  if (diff === 0) return "due today";
  if (diff === 1) return "due tomorrow";
  return `in ${diff}d`;
}

export default function PipelineClient({
  userEmail,
  rows,
  clients,
  sentToday,
  streak,
  ceiling,
  researchedIds,
}: {
  userEmail: string;
  rows: PipelineRow[];
  clients: string[];
  sentToday: number;
  streak: number;
  ceiling: number;
  researchedIds: Set<string>;
}) {
  const defaultClient = clients.includes("saren") ? "saren" : clients[0] ?? "all";
  const [client, setClient] = useState<string>(defaultClient);
  const [stage, setStage] = useState<string>("all");
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  // Optimistic: IDs removed from view before server revalidates
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());
  // Optimistic: IDs we just queued research for
  const [queuedResearchIds, setQueuedResearchIds] = useState<Set<string>>(new Set());

  const byClient = useMemo(
    () => (client === "all" ? rows : rows.filter((r) => r.client === client)),
    [rows, client]
  );
  // Filter archived contacts out optimistically
  const visible = useMemo(
    () => byClient.filter((r) => !archivedIds.has(r.contact_id)),
    [byClient, archivedIds]
  );
  const counts = useMemo(
    () => STAGES.map((s) => ({ ...s, n: visible.filter((r) => r.stage === s.key).length })),
    [visible]
  );
  const queue = useMemo(
    () => (stage === "all" ? visible : visible.filter((r) => r.stage === stage)),
    [visible, stage]
  );

  const pct = Math.min(100, Math.round((sentToday / ceiling) * 100));
  const router = useRouter();

  async function handleSignOut() {
    await createClient().auth.signOut();
    router.push("/studio/login");
  }

  function runAction(fn: (id: string) => Promise<void>, id: string, action: string) {
    setBusyId(id);
    setBusyAction(action);
    startTransition(async () => {
      try {
        await fn(id);
      } finally {
        setBusyId(null);
        setBusyAction(null);
      }
    });
  }

  function handleArchive(id: string) {
    setArchivedIds((prev) => new Set([...prev, id]));
    startTransition(async () => {
      await archiveContact(id);
    });
  }

  function handleResearch(id: string) {
    setQueuedResearchIds((prev) => new Set([...prev, id]));
    startTransition(async () => {
      await queueResearchFromPipeline(id);
    });
  }

  return (
    <div className="min-h-screen bg-background p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono">
            <span className="text-ember">studio</span>
            <span className="text-foreground-muted">/</span>
            <span className="text-foreground">pipeline</span>
          </h1>
          <p className="text-foreground-muted text-sm mt-1">{userEmail}</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-border-hover"
          >
            <option value="all">All clients</option>
            {clients.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={handleSignOut}
            className="text-foreground-muted hover:text-foreground text-sm transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Gamification */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="bg-card border border-border rounded-xl p-4 flex-1 min-w-[240px] max-w-sm">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-foreground-muted font-semibold">
              Today&apos;s sends
            </span>
            <span className="font-mono text-xl font-bold text-foreground">
              {sentToday}
              <span className="text-foreground-muted text-sm">/{ceiling}</span>
            </span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-ember rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-2.5">
          <Flame size={18} className="text-copper" />
          <span className="font-mono text-xl font-bold text-copper">{streak}</span>
          <span className="text-xs uppercase tracking-widest text-foreground-muted font-semibold">
            day streak
          </span>
        </div>
      </div>

      {/* Funnel strip */}
      <div className="flex gap-2.5 mb-8 flex-wrap">
        <FunnelChip label="All" n={visible.length} active={stage === "all"} onClick={() => setStage("all")} />
        {counts.map((c) => (
          <FunnelChip key={c.key} label={c.label} n={c.n} active={stage === c.key} onClick={() => setStage(c.key)} />
        ))}
      </div>

      {/* Do Next */}
      <h2 className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-3">Do next</h2>
      {queue.length === 0 ? (
        <p className="text-foreground-muted text-sm py-10 text-center">
          Nothing in this view. Pick another stage, or source more leads.
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {queue.map((r) => {
            const canSend = r.stage === "sequenced" || r.stage === "in_outreach";
            const canReply = r.stage === "in_outreach";
            const busy = busyId === r.contact_id && pending;
            const isResearched = researchedIds.has(r.contact_id) || queuedResearchIds.has(r.contact_id);
            const researchQueued = queuedResearchIds.has(r.contact_id);
            return (
              <div
                key={r.contact_id}
                className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 hover:border-ember/30 transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-lavender/20 text-lavender flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {initials(r.full_name)}
                </div>

                {/* Identity */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-foreground truncate">{r.full_name}</div>
                  <div className="text-xs text-foreground-muted truncate">
                    {r.company ?? "—"} · {r.title ?? ""}
                    {r.segment ? <span className="text-lavender font-semibold"> · {r.segment}</span> : null}
                  </div>
                </div>

                {/* Due date */}
                {r.next_due && (
                  <span className={`text-xs flex-shrink-0 ${r.overdue ? "text-ember font-bold" : "text-foreground-muted"}`}>
                    {dueLabel(r)}
                  </span>
                )}

                {/* Research status icon */}
                <button
                  onClick={() => !isResearched && handleResearch(r.contact_id)}
                  disabled={busy || isResearched}
                  title={
                    researchQueued
                      ? "Research queued — picks up next hour"
                      : isResearched
                      ? "Researched"
                      : "Queue research (free)"
                  }
                  className={`flex-shrink-0 transition-colors ${
                    isResearched
                      ? "text-lavender cursor-default"
                      : "text-foreground-muted hover:text-lavender cursor-pointer"
                  }`}
                >
                  {researchQueued ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <FlaskConical size={14} />
                  )}
                </button>

                {/* Review link */}
                <Link
                  href={`/studio/contacts/${r.contact_id}`}
                  className="text-xs text-foreground-muted hover:text-foreground border border-border rounded-full px-3 py-1.5 transition-colors flex-shrink-0"
                >
                  Review
                </Link>

                {/* Primary action */}
                {canSend ? (
                  <button
                    onClick={() => runAction(logTouchSent, r.contact_id, "send")}
                    disabled={busy}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-ember text-white rounded-full px-3 py-1.5 hover:bg-ember/90 disabled:opacity-50 transition-colors flex-shrink-0"
                  >
                    <Send size={12} /> {busy && busyAction === "send" ? "…" : "Mark sent"}
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-lavender border border-lavender/40 rounded-full px-3 py-1.5 flex-shrink-0">
                    {ACTION_LABEL[r.next_action]}
                  </span>
                )}

                {/* Mark replied */}
                {canReply && (
                  <button
                    onClick={() => runAction(markReplied, r.contact_id, "reply")}
                    disabled={busy}
                    title="Mark replied"
                    className="text-foreground-muted hover:text-lavender disabled:opacity-50 transition-colors flex-shrink-0"
                  >
                    <MessageSquareReply size={15} />
                  </button>
                )}

                {/* Archive */}
                <button
                  onClick={() => handleArchive(r.contact_id)}
                  disabled={busy}
                  title="Archive — remove from pipeline"
                  className="text-foreground-muted hover:text-ember disabled:opacity-50 transition-colors flex-shrink-0"
                >
                  <Archive size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-foreground-muted mt-8">
        &ldquo;Enrich&rdquo; and &ldquo;Write sequence&rdquo; happen in chat (Apollo /
        <span className="font-mono"> /sales outreach</span>) — this view logs outreach, it doesn&apos;t auto-send.
      </p>
    </div>
  );
}

function FunnelChip({
  label,
  n,
  active,
  onClick,
}: {
  label: string;
  n: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-0.5 rounded-xl px-4 py-3 min-w-[88px] border transition-colors ${
        active
          ? "border-ember bg-ember/10 dark:bg-white/10"
          : "border-border bg-card hover:border-foreground-muted"
      }`}
    >
      <span className="font-mono text-2xl font-bold text-ember leading-none">{n}</span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">{label}</span>
    </button>
  );
}
