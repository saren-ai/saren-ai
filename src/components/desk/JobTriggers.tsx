"use client";

import { useState, useTransition } from "react";
import { Search, PenLine, Sparkles, Loader2, Check, X } from "lucide-react";
import RelativeTime from "@/components/desk/RelativeTime";
import { queueJob, type JobKind } from "@/app/(desk)/desk/contacts/[id]/actions";

// Mirrors the agent_jobs row shape (the generated types predate the table).
export interface AgentJob {
  id: string;
  skill: string;
  kind: string;
  status: "requested" | "claimed" | "running" | "done" | "failed" | "canceled";
  result: { summary?: string } | null;
  error: string | null;
  created_at: string;
  finished_at: string | null;
}

const TRIGGERS: {
  kind: JobKind;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  costsCredits?: boolean;
  hint: string;
}[] = [
  { kind: "research", label: "Research", icon: Search, hint: "Web + account intel. Free." },
  { kind: "draft", label: "Draft outreach", icon: PenLine, hint: "Writes a sequence. Free." },
  {
    kind: "enrich",
    label: "Enrich email",
    icon: Sparkles,
    costsCredits: true,
    hint: "Verifies email via Apollo. Uses 1 credit.",
  },
];

const STATUS_STYLES: Record<AgentJob["status"], string> = {
  requested: "bg-foreground/10 text-foreground-muted",
  claimed: "bg-lavender/15 text-lavender",
  running: "bg-lavender/15 text-lavender",
  done: "bg-ember/10 text-ember",
  failed: "bg-ember/15 text-ember",
  canceled: "bg-foreground/10 text-foreground-muted",
};

export default function JobTriggers({
  contactId,
  jobs,
}: {
  contactId: string;
  jobs: AgentJob[];
}) {
  const [isPending, startTransition] = useTransition();
  const [pendingKind, setPendingKind] = useState<JobKind | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function fire(kind: JobKind, costsCredits?: boolean) {
    if (costsCredits) {
      const ok = window.confirm(
        "Enriching this contact spends 1 Apollo credit to verify their email. Continue?"
      );
      if (!ok) return;
    }
    setNotice(null);
    setPendingKind(kind);
    startTransition(async () => {
      const res = await queueJob(contactId, kind);
      setPendingKind(null);
      setNotice(
        res.queued
          ? "Queued — the engine will pick it up on its next pass."
          : "Already queued for this contact."
      );
    });
  }

  const active = jobs.filter((j) =>
    ["requested", "claimed", "running"].includes(j.status)
  );

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-foreground mb-1">Ask the engine</h2>
      <p className="text-[11px] text-foreground-muted mb-4">
        Queues a job for the prospecting skills to run.
      </p>

      <div className="flex flex-col gap-2">
        {TRIGGERS.map(({ kind, label, icon: Icon, costsCredits, hint }) => {
          const busy = isPending && pendingKind === kind;
          return (
            <button
              key={kind}
              onClick={() => fire(kind, costsCredits)}
              disabled={isPending}
              title={hint}
              className={`flex items-center gap-2.5 w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors disabled:opacity-50 ${
                costsCredits
                  ? "border-ember/40 text-ember hover:bg-ember/5"
                  : "border-border text-foreground hover:border-lavender hover:bg-lavender/5"
              }`}
            >
              {busy ? (
                <Loader2 size={14} className="animate-spin flex-shrink-0" />
              ) : (
                <Icon size={14} className="flex-shrink-0" />
              )}
              <span className="flex-1">{label}</span>
              {costsCredits && (
                <span className="text-[10px] font-mono text-ember/80">1 credit</span>
              )}
            </button>
          );
        })}
      </div>

      {notice && (
        <p className="mt-3 text-[11px] text-foreground-muted">{notice}</p>
      )}

      {jobs.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border/60">
          <p className="text-[10px] text-foreground-muted uppercase tracking-wider mb-2">
            Recent jobs{active.length > 0 ? ` · ${active.length} running` : ""}
          </p>
          <div className="flex flex-col gap-2">
            {jobs.slice(0, 6).map((job) => (
              <div key={job.id} className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 flex-shrink-0">
                  {job.status === "done" ? (
                    <Check size={12} className="text-ember" />
                  ) : job.status === "failed" ? (
                    <X size={12} className="text-ember" />
                  ) : (
                    <Loader2
                      size={12}
                      className="text-lavender animate-spin"
                    />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium truncate">
                      {job.skill}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[9px] ${STATUS_STYLES[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  {(job.result?.summary || job.error) && (
                    <p className="text-foreground-muted mt-0.5 line-clamp-2">
                      {job.error ?? job.result?.summary}
                    </p>
                  )}
                  <span className="text-foreground-muted text-[10px]">
                    <RelativeTime iso={job.finished_at ?? job.created_at} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
