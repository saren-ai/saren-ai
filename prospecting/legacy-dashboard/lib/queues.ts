import type { PipelineContact, Sequence } from "./types";

export interface EnrichedContact extends PipelineContact {
  sequence?: Sequence | null;
}

export interface NetworkGroup {
  networkId: string | null;
  label: string;
  color: string;
  contacts: EnrichedContact[];
}

export const LOCAL_NETWORKS = [
  { id: "provisors",       label: "ProVisors",       color: "#7c5aa3", keywords: ["provisors"] },
  { id: "acg",             label: "ACG OC",           color: "#c17d3a", keywords: ["acg orange", "acg oc"] },
  { id: "irvine-chamber",  label: "Irvine Chamber",   color: "#2d7a3a", keywords: ["irvine chamber", "greater irvine"] },
  { id: "sol-hub",         label: "Sol Hub",           color: "#c43322", keywords: ["sol hub"] },
  { id: "gigx",            label: "GigX",              color: "#5b6470", keywords: ["gigx"] },
] as const;

export function detectNetwork(company: string | null, title: string | null) {
  const text = `${company ?? ""} ${title ?? ""}`.toLowerCase();
  return LOCAL_NETWORKS.find((n) => n.keywords.some((k) => text.includes(k))) ?? null;
}

// ── 24h outbound SLA (v_pipeline.sla_due_at, migration 008) ────────────────
// Green while <12h of the 24h window has elapsed, amber when approaching the
// deadline, red once breached. Replies have a separate 90-sec SMS SLA — no
// chip for those (sla_due_at is null).

export type SlaState = "safe" | "warn" | "breach";

export interface SlaInfo {
  state: SlaState;
  label: string; // "14h left" · "3h left" · "overdue 6h"
  dueAt: string;
}

function fmtHours(ms: number): string {
  const h = ms / 3_600_000;
  if (h >= 48) return `${Math.round(h / 24)}d`;
  if (h >= 1) return `${Math.round(h)}h`;
  return `${Math.max(1, Math.round(h * 60))}m`;
}

export function slaInfo(
  c: Pick<EnrichedContact, "sla_due_at">,
  now: number = Date.now()
): SlaInfo | null {
  if (!c.sla_due_at) return null;
  const due = new Date(c.sla_due_at).getTime();
  if (Number.isNaN(due)) return null;
  const remaining = due - now;
  if (remaining < 0) {
    return { state: "breach", label: `overdue ${fmtHours(-remaining)}`, dueAt: c.sla_due_at };
  }
  const safe = remaining > 12 * 3_600_000;
  return {
    state: safe ? "safe" : "warn",
    label: safe ? fmtHours(remaining) : `${fmtHours(remaining)} left`,
    dueAt: c.sla_due_at,
  };
}

// Sort key: closest-to-breach floats up; no SLA clock sorts last.
function slaKey(c: Pick<EnrichedContact, "sla_due_at">): number {
  return c.sla_due_at ? new Date(c.sla_due_at).getTime() : Number.POSITIVE_INFINITY;
}

// ── Segment → persona pill ("1-agencies" → "Agencies") ─────────────────────
export function humanizeSegment(segment: string | null): string | null {
  if (!segment) return null;
  const cleaned = segment.replace(/^\d+[-_.]/, "").replace(/[-_]+/g, " ").trim();
  if (!cleaned) return null;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function isStale(seq: Sequence | null | undefined): boolean {
  if (!seq?.updated_at) return false;
  return Date.now() - new Date(seq.updated_at).getTime() > 48 * 60 * 60 * 1000;
}

export function buildInbox(contacts: EnrichedContact[]): EnrichedContact[] {
  // Booked meetings surface at the top of the Inbox (prep_meeting), then
  // replies, then overdue outreach — within each band, by pipeline priority.
  const band = (c: EnrichedContact) =>
    c.stage === "meeting_booked" ? 0 : c.stage === "replied" ? 1 : 2;
  return contacts
    .filter(
      (c) =>
        c.stage === "meeting_booked" ||
        c.stage === "replied" ||
        (c.stage === "in_outreach" && c.overdue)
    )
    .sort(
      (a, b) =>
        band(a) - band(b) || slaKey(a) - slaKey(b) || a.priority - b.priority
    );
}

export function buildToApprove(contacts: EnrichedContact[]): NetworkGroup[] {
  const relevant = contacts.filter(
    (c) => c.stage === "sourced" || c.stage === "enriched"
  );

  const groups: NetworkGroup[] = [];
  const seen = new Set<string>();

  for (const net of LOCAL_NETWORKS) {
    const members = relevant
      .filter((c) => detectNetwork(c.company, c.title)?.id === net.id)
      .sort((a, b) => (b.fit_score ?? 0) - (a.fit_score ?? 0));
    if (members.length > 0) {
      groups.push({ networkId: net.id, label: net.label, color: net.color, contacts: members });
      members.forEach((c) => seen.add(c.contact_id));
    }
  }

  const others = relevant
    .filter((c) => !seen.has(c.contact_id))
    .sort((a, b) => (b.fit_score ?? 0) - (a.fit_score ?? 0));
  if (others.length > 0) {
    groups.push({ networkId: null, label: "Other", color: "#9ca3af", contacts: others });
  }

  return groups;
}

export function buildToReview(contacts: EnrichedContact[]): EnrichedContact[] {
  return contacts
    .filter((c) => c.stage === "sequenced")
    .sort((a, b) => {
      // Closest-to-SLA-breach first (approval → first touch is a 24h clock).
      const sla = slaKey(a) - slaKey(b);
      if (sla !== 0) return sla;
      const staleA = isStale(a.sequence);
      const staleB = isStale(b.sequence);
      if (staleA && !staleB) return -1;
      if (!staleA && staleB) return 1;
      const da = a.sequence?.started_at ?? "";
      const db = b.sequence?.started_at ?? "";
      return da.localeCompare(db);
    });
}

export function flattenApprove(groups: NetworkGroup[]): EnrichedContact[] {
  return groups.flatMap((g) => g.contacts);
}
