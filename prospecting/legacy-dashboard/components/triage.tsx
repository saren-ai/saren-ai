"use client";

import { useEffect, useState, useMemo, useRef, useCallback, useTransition } from "react";
import type { Contact, Company, ResearchDepth, Sequence, Touch } from "@/lib/types";
import {
  type EnrichedContact,
  type NetworkGroup,
  LOCAL_NETWORKS,
  detectNetwork,
  isStale,
  slaInfo,
  humanizeSegment,
  buildInbox,
  buildToApprove,
  buildToReview,
  flattenApprove,
} from "@/lib/queues";
import {
  skipContact,
  approveContact,
  rejectContact,
  archiveContact,
  archiveInboxContact,
  skipToWriter,
  recordDraftEdit,
  updateSequence,
  updateContactNotes,
  createGmailDraft,
  updateSequenceStatus,
  fetchPipeline,
  fetchContactDetail,
  fetchCompany,
  fetchTouches,
  syncSentFolder,
} from "@/app/actions";
import { ActionPanel } from "./action-panel";
import { NewClientModal } from "./new-client";

export type TriageQueue = "inbox" | "approve" | "review";

export function Triage() {
  const [allContacts, setAllContacts] = useState<EnrichedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeQueue, setActiveQueue] = useState<TriageQueue>("inbox");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contactDetail, setContactDetail] = useState<Contact | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [touches, setTouches] = useState<Touch[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [injectOpen, setInjectOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [skipWriterOpen, setSkipWriterOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");
  // The draft exactly as the AI generated it — kept so the pushed (possibly
  // edited) version can be diffed into draft_edits for voice training. Carries
  // the operator brief used (if any) so the learning row can attribute it.
  const [generatedDraft, setGeneratedDraft] = useState<{ subject: string; body: string; brief: string | null } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const syncRanRef = useRef(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const { contacts, sequences } = await fetchPipeline();

    const seqMap = new Map<string, Sequence>();
    for (const s of sequences) {
      if (s.contact_id) seqMap.set(s.contact_id, s);
    }

    const enriched: EnrichedContact[] = contacts.map((c) => ({
      ...c,
      sequence: seqMap.get(c.contact_id) ?? null,
    }));

    setAllContacts(enriched);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // ── Sent-folder reconciliation (background; never blocks first paint) ───
  const runSentSync = useCallback(async (manual: boolean) => {
    setSyncing(true);
    try {
      const result = await syncSentFolder();
      if (result.error) {
        if (manual) showToast(`Sync failed: ${result.error}`);
      } else if (result.created > 0) {
        showToast(`Synced ${result.created} new send${result.created !== 1 ? "s" : ""}.`);
        await load();
      } else if (manual) {
        showToast("Sent folder in sync.");
      }
    } finally {
      setSyncing(false);
    }
  }, []);

  // Auto-run once after the first pipeline load (ref-guarded for StrictMode).
  useEffect(() => {
    if (loading || syncRanRef.current) return;
    syncRanRef.current = true;
    runSentSync(false);
  }, [loading, runSentSync]);

  // ── Derived queues ────────────────────────────────────────────────────
  const inbox = useMemo(() => buildInbox(allContacts), [allContacts]);
  const toApproveGroups = useMemo(() => buildToApprove(allContacts), [allContacts]);
  const toApproveFlat = useMemo(() => flattenApprove(toApproveGroups), [toApproveGroups]);
  const toReview = useMemo(() => buildToReview(allContacts), [allContacts]);

  const activeList = useMemo<EnrichedContact[]>(() => {
    if (activeQueue === "inbox") return inbox;
    if (activeQueue === "approve") return toApproveFlat;
    return toReview;
  }, [activeQueue, inbox, toApproveFlat, toReview]);

  const selectedContact = useMemo(
    () => activeList.find((c) => c.contact_id === selectedId) ?? null,
    [activeList, selectedId]
  );

  // Auto-select first when queue switches or data loads
  useEffect(() => {
    if (!loading && activeList.length > 0) {
      const stillPresent = activeList.some((c) => c.contact_id === selectedId);
      if (!stillPresent) setSelectedId(activeList[0].contact_id);
    }
  }, [activeQueue, loading, activeList]);

  // Auto-switch to most urgent queue on first load
  useEffect(() => {
    if (!loading) {
      if (inbox.length > 0) setActiveQueue("inbox");
      else if (toReview.length > 0) setActiveQueue("review");
      else setActiveQueue("approve");
    }
  }, [loading]);

  // Load detail when contact changes
  useEffect(() => {
    if (!selectedContact) {
      setContactDetail(null);
      setCompany(null);
      setTouches([]);
      return;
    }
    // Clear the previous contact's data immediately — child views are keyed
    // by contact id and must never mount with the prior record's props.
    setContactDetail(null);
    setCompany(null);
    setTouches([]);
    setDetailLoading(true);

    const fetches: Promise<void>[] = [
      fetchContactDetail(selectedContact.contact_id).then((data) =>
        setContactDetail(data)
      ),
    ];

    if (selectedContact.company_id) {
      fetches.push(
        fetchCompany(selectedContact.company_id).then((data) => setCompany(data))
      );
    } else {
      setCompany(null);
    }

    if (activeQueue === "inbox" && selectedContact.sequence?.id) {
      fetches.push(
        fetchTouches(selectedContact.sequence.id).then((data) => setTouches(data))
      );
    } else {
      setTouches([]);
    }

    Promise.all(fetches).then(() => setDetailLoading(false));
  }, [selectedContact?.contact_id, activeQueue]);

  // Sync draft fields when review contact changes
  useEffect(() => {
    if (activeQueue === "review" && selectedContact?.sequence) {
      setDraftSubject(selectedContact.sequence.subject_a ?? "");
      setDraftBody(selectedContact.sequence.email_body ?? "");
    }
  }, [selectedContact?.contact_id, activeQueue]);

  // ── State mutations ───────────────────────────────────────────────────
  function removeContact(id: string) {
    const idx = activeList.findIndex((c) => c.contact_id === id);
    const next = activeList[idx + 1] ?? activeList[idx - 1] ?? null;
    setAllContacts((prev) => prev.filter((c) => c.contact_id !== id));
    setSelectedId(next?.contact_id ?? null);
  }

  function navigate(dir: 1 | -1) {
    const idx = activeList.findIndex((c) => c.contact_id === selectedId);
    const next = activeList[idx + dir];
    if (next) setSelectedId(next.contact_id);
  }

  function closeDrawers() {
    setInjectOpen(false);
    setRejectOpen(false);
    setApproveOpen(false);
    setSkipWriterOpen(false);
    setArchiveOpen(false);
  }

  function switchQueue(q: TriageQueue) {
    setActiveQueue(q);
    closeDrawers();
  }

  // Reset ALL per-contact form state whenever the selection changes — drawers
  // close and the generated-draft snapshot clears, so nothing typed on one
  // contact ever carries onto the next record.
  useEffect(() => {
    closeDrawers();
    setGeneratedDraft(null);
  }, [selectedId]);

  // ── Actions ───────────────────────────────────────────────────────────
  function handleApprove(note: string, depth: ResearchDepth) {
    if (!selectedContact) return;
    startTransition(async () => {
      await approveContact(
        selectedContact.contact_id,
        selectedContact.client_id,
        note || null,
        depth
      );
      setApproveOpen(false);
      removeContact(selectedContact.contact_id);
      showToast(depth === "medium" ? "Queued for enrichment (medium depth)." : "Queued for enrichment.");
    });
  }

  function handleSkipToWriter(note: string) {
    if (!selectedContact || !note.trim()) return;
    startTransition(async () => {
      await skipToWriter(
        selectedContact.contact_id,
        selectedContact.client_id,
        note
      );
      setSkipWriterOpen(false);
      removeContact(selectedContact.contact_id);
      showToast("Sent to writer — research skipped.");
    });
  }

  // Approve-queue archive ([x] there): optional note, no reason required.
  function handleArchive(note: string) {
    if (!selectedContact) return;
    startTransition(async () => {
      await archiveContact(
        selectedContact.contact_id,
        selectedContact.client_id,
        null,
        note || null
      );
      setArchiveOpen(false);
      removeContact(selectedContact.contact_id);
      showToast("Archived.");
    });
  }

  // Inbox archive ([x] there): reason required, stops the active sequence.
  function handleInboxArchive(reason: string, note: string) {
    if (!selectedContact) return;
    startTransition(async () => {
      await archiveInboxContact(
        selectedContact.contact_id,
        selectedContact.client_id,
        reason,
        note
      );
      setArchiveOpen(false);
      removeContact(selectedContact.contact_id);
      showToast("Archived — sequence stopped.");
    });
  }

  function handleSkip() {
    if (!selectedContact) return;
    startTransition(async () => {
      await skipContact(selectedContact.contact_id);
      showToast("Skipped.");
      removeContact(selectedContact.contact_id);
    });
  }

  function handleReject(reason: string, note: string) {
    if (!selectedContact) return;
    startTransition(async () => {
      await rejectContact(
        selectedContact.contact_id,
        selectedContact.client_id,
        reason,
        note
      );
      setRejectOpen(false);
      removeContact(selectedContact.contact_id);
      showToast("Rejected — reason recorded.");
    });
  }

  async function handleInjectSave(tags: string[], freetext: string) {
    if (!selectedContact) return;
    const tagNotes: Record<string, string> = {
      "#met-local": "Met in person locally — use warm proximity intro.",
      "#past-client": "Past client — use re-engagement framework.",
      "#mutual-friend": "Mutual connection — check LinkedIn before sending.",
    };
    const fullNote = [...tags.map((t) => tagNotes[t] ?? t), freetext]
      .filter(Boolean)
      .join(" | ");
    if (fullNote) await updateContactNotes(selectedContact.contact_id, fullNote);
    setInjectOpen(false);
    showToast("Context saved.");
  }

  function handlePushDraft() {
    if (!selectedContact?.email || !draftBody) return;
    const seq = selectedContact.sequence;
    const generated = generatedDraft;
    startTransition(async () => {
      if (seq) {
        await updateSequence(seq.id, { subject_a: draftSubject, email_body: draftBody });
      }
      const result = await createGmailDraft(
        selectedContact.email!,
        draftSubject || "(no subject)",
        draftBody
      );
      if (result.success) {
        if (seq) await updateSequenceStatus(seq.id, "draft_pushed");
        // Voice training: if the human edited the generated draft before
        // pushing, record generated vs final in draft_edits.
        if (
          generated &&
          (generated.subject !== draftSubject || generated.body !== draftBody)
        ) {
          await recordDraftEdit({
            clientId: selectedContact.client_id,
            contactId: selectedContact.contact_id,
            sequenceId: seq?.id ?? null,
            channel: "email",
            draftSubject: generated.subject,
            draftBody: generated.body,
            finalSubject: draftSubject,
            finalBody: draftBody,
            // Voice learning distinguishes briefed direction from spontaneous edits.
            feedback: generated.brief ? `[brief: ${generated.brief}]` : null,
          });
        }
        removeContact(selectedContact.contact_id);
        showToast("Draft pushed to Gmail. ✓");
      } else {
        showToast(result.error ?? "Gmail draft failed.");
      }
    });
  }

  // ── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "TEXTAREA" ||
        target.tagName === "INPUT" ||
        target.isContentEditable;

      // Cmd/Ctrl+Enter always fires
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (activeQueue === "review") handlePushDraft();
        return;
      }

      if (typing) return;

      // The New-client modal owns the keyboard entirely.
      if (newClientOpen) return;

      // An open verdict drawer owns the keyboard (digits pick, Enter saves,
      // its own inputs handle Escape) — only Escape is handled here.
      if (rejectOpen || approveOpen || skipWriterOpen || archiveOpen) {
        if (e.key === "Escape") closeDrawers();
        return;
      }

      switch (e.key.toLowerCase()) {
        case "j":
        case "arrowdown":
          e.preventDefault();
          navigate(1);
          break;
        case "k":
        case "arrowup":
          e.preventDefault();
          navigate(-1);
          break;
        case "1":
          switchQueue("inbox");
          break;
        case "2":
          switchQueue("approve");
          break;
        case "3":
          switchQueue("review");
          break;
        case "a":
          e.preventDefault();
          if (activeQueue === "approve") setApproveOpen(true);
          else if (activeQueue === "review") handlePushDraft();
          break;
        case "w":
          e.preventDefault();
          if (activeQueue === "approve") setSkipWriterOpen(true);
          break;
        case "r":
          e.preventDefault();
          if (activeQueue === "approve") setRejectOpen(true);
          break;
        case "i":
          e.preventDefault();
          setInjectOpen((v) => !v);
          break;
        case "x":
          e.preventDefault();
          if (activeQueue === "review") handleSkip();
          else setArchiveOpen(true);
          break;
        case "e":
          e.preventDefault();
          if (activeQueue === "review") bodyRef.current?.focus();
          break;
        case "escape":
          setInjectOpen(false);
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeList, selectedId, activeQueue, draftSubject, draftBody, generatedDraft, selectedContact, rejectOpen, approveOpen, skipWriterOpen, archiveOpen, newClientOpen]);

  // ── Peer count for local context ──────────────────────────────────────
  const selectedNetwork = selectedContact
    ? detectNetwork(selectedContact.company, selectedContact.title)
    : null;
  const peerCount = selectedNetwork
    ? activeList.filter(
        (c) =>
          c.contact_id !== selectedId &&
          detectNetwork(c.company, c.title)?.id === selectedNetwork.id
      ).length
    : 0;

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f5f5f7" }}>
      {/* ── Left pane ── */}
      <div
        className="flex flex-col shrink-0 border-r overflow-hidden"
        style={{ width: 360, borderColor: "#e5e7eb", background: "#fff" }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-sm" style={{ color: "#1d1d1f" }}>
              Lead Pipeline
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setNewClientOpen(true)}
                className="text-xs px-2 py-1 rounded font-mono"
                style={{ color: "#9ca3af", background: "#f0f0f0" }}
                title="New client"
              >
                + Client
              </button>
              <button
                onClick={() => runSentSync(true)}
                disabled={syncing}
                className="text-xs px-2 py-1 rounded font-mono disabled:opacity-50"
                style={{ color: "#9ca3af", background: "#f0f0f0" }}
                title="Reconcile Gmail sent folder"
              >
                {syncing ? "Syncing…" : "Sync"}
              </button>
              <button
                onClick={load}
                className="text-xs px-2 py-1 rounded font-mono"
                style={{ color: "#9ca3af", background: "#f0f0f0" }}
              >
                ↻
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <QTab
              label="Inbox"
              count={inbox.length}
              active={activeQueue === "inbox"}
              urgent
              shortcut="1"
              onClick={() => switchQueue("inbox")}
            />
            <QTab
              label="Approve"
              count={toApproveFlat.length}
              active={activeQueue === "approve"}
              shortcut="2"
              onClick={() => switchQueue("approve")}
            />
            <QTab
              label="Review"
              count={toReview.length}
              active={activeQueue === "review"}
              shortcut="3"
              onClick={() => switchQueue("review")}
            />
          </div>
        </div>

        {/* Queue list */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-8 text-xs text-center" style={{ color: "#9ca3af" }}>
              Loading…
            </div>
          ) : activeList.length === 0 ? (
            <EmptyQueue queue={activeQueue} />
          ) : activeQueue === "approve" ? (
            toApproveGroups.map((g) => (
              <NetworkSection
                key={g.networkId ?? "other"}
                group={g}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ))
          ) : (
            activeList.map((c) => (
              <QRow
                key={c.contact_id}
                contact={c}
                selected={c.contact_id === selectedId}
                onClick={() => setSelectedId(c.contact_id)}
              />
            ))
          )}
        </div>

        {/* Keyboard hint */}
        <div className="px-4 py-2.5 border-t" style={{ borderColor: "#f0f0f0" }}>
          <p className="text-xs font-mono" style={{ color: "#d1d5db" }}>
            j/k · 1/2/3 · [a] act · [w] to writer · [r] reject · [i] inject · [x] archive
          </p>
        </div>
      </div>

      {/* ── Right pane ── */}
      <div className="flex-1 overflow-hidden">
        {selectedContact ? (
          <ActionPanel
            queue={activeQueue}
            contact={selectedContact}
            contactDetail={contactDetail}
            company={company}
            touches={touches}
            detailLoading={detailLoading}
            peerCount={peerCount}
            injectOpen={injectOpen}
            onInjectToggle={() => setInjectOpen((v) => !v)}
            draftSubject={draftSubject}
            draftBody={draftBody}
            onDraftSubjectChange={setDraftSubject}
            onDraftBodyChange={setDraftBody}
            generatedDraft={generatedDraft}
            onDraftGenerated={(subject, body, brief) => setGeneratedDraft({ subject, body, brief })}
            bodyRef={bodyRef}
            onApprove={handleApprove}
            approveOpen={approveOpen}
            onApproveToggle={setApproveOpen}
            onSkipToWriter={handleSkipToWriter}
            skipWriterOpen={skipWriterOpen}
            onSkipWriterToggle={setSkipWriterOpen}
            onSkip={handleSkip}
            onReject={handleReject}
            rejectOpen={rejectOpen}
            onRejectToggle={setRejectOpen}
            onArchive={handleArchive}
            onInboxArchive={handleInboxArchive}
            archiveOpen={archiveOpen}
            onArchiveToggle={setArchiveOpen}
            onPushDraft={handlePushDraft}
            onInjectSave={handleInjectSave}
            onTouchQueued={() => {
              removeContact(selectedContact.contact_id);
              showToast("Draft saved — out of Inbox until they reply.");
            }}
            isPending={isPending}
            toast={toast}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-sm font-semibold mb-1" style={{ color: "#1d1d1f" }}>
                Select a lead
              </p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                j/k to navigate · click a name
              </p>
            </div>
          </div>
        )}
      </div>

      {newClientOpen && <NewClientModal onClose={() => setNewClientOpen(false)} />}
    </div>
  );
}

// ── Left pane sub-components ──────────────────────────────────────────────

function QTab({
  label,
  count,
  active,
  urgent,
  shortcut,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  urgent?: boolean;
  shortcut: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg py-1.5 text-xs font-semibold transition-all"
      style={
        active
          ? { background: "#1d1d1f", color: "#fff" }
          : { background: "#f5f5f7", color: "#5b6470" }
      }
    >
      {label}
      {count > 0 && (
        <span
          className="ml-1 font-mono"
          style={urgent && !active && count > 0 ? { color: "#c43322" } : {}}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function NetworkSection({
  group,
  selectedId,
  onSelect,
}: {
  group: NetworkGroup;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div
        className="px-4 py-2 flex items-center gap-2 sticky top-0 z-10"
        style={{ background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: group.color }}
        />
        <span className="text-xs font-semibold" style={{ color: "#5b6470" }}>
          {group.label}
        </span>
        <span className="text-xs font-mono" style={{ color: "#9ca3af" }}>
          {group.contacts.length}
        </span>
      </div>
      {group.contacts.map((c) => (
        <QRow
          key={c.contact_id}
          contact={c}
          selected={c.contact_id === selectedId}
          onClick={() => onSelect(c.contact_id)}
        />
      ))}
    </div>
  );
}

function QRow({
  contact,
  selected,
  onClick,
}: {
  contact: EnrichedContact;
  selected: boolean;
  onClick: () => void;
}) {
  const net = detectNetwork(contact.company, contact.title);
  const stale = isStale(contact.sequence);
  const persona = humanizeSegment(contact.segment);

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 border-b transition-colors"
      style={{
        borderColor: "#f5f5f7",
        background: selected ? "#f0f0f4" : "transparent",
      }}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span
              className="text-sm font-semibold truncate"
              style={{ color: "#1d1d1f" }}
            >
              {contact.full_name}
            </span>
            {contact.stage === "meeting_booked" && (
              <span
                className="text-xs px-1.5 rounded font-mono"
                style={{ background: "#e0f2fe", color: "#0369a1" }}
              >
                meeting
              </span>
            )}
            {contact.stage === "replied" && (
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#c43322" }}
              />
            )}
            {stale && (
              <span
                className="text-xs px-1.5 rounded font-mono"
                style={{ background: "#fef3e7", color: "#c17d3a" }}
              >
                stale
              </span>
            )}
            <SlaChip contact={contact} />
          </div>
          {/* Pill row — one line: network? · company · persona · title */}
          <div className="flex items-center gap-1 mt-1 overflow-hidden whitespace-nowrap">
            {net && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                style={{ background: `${net.color}15`, color: net.color }}
              >
                {net.label}
              </span>
            )}
            {contact.company && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full shrink-0 max-w-[120px] truncate"
                style={{ background: "#f0f0f0", color: "#5b6470" }}
                title={contact.company}
              >
                {contact.company}
              </span>
            )}
            {persona && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                style={{ background: "#f0ebf8", color: "#7c5aa3" }}
                title={contact.segment ?? undefined}
              >
                {persona}
              </span>
            )}
            {contact.title && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full min-w-0 truncate"
                style={{ background: "#f5f5f7", color: "#9ca3af" }}
                title={contact.title}
              >
                {contact.title}
              </span>
            )}
          </div>
        </div>
        {contact.fit_score != null && (
          <span
            className="text-xs font-mono shrink-0 mt-0.5"
            style={{ color: "#9ca3af" }}
          >
            {Math.round(contact.fit_score)}
          </span>
        )}
      </div>
    </button>
  );
}

// ── 24h outbound SLA chip (colored dot + compact label) ───────────────────
// approval→first-touch and touch-due→send clocks, from v_pipeline.sla_due_at.
// Green = safe (<12h elapsed) · amber = approaching 24h · red = breached.

const SLA_COLORS = {
  safe: "#16a34a",
  warn: "#c17d3a",
  breach: "#c43322",
} as const;

function SlaChip({ contact }: { contact: EnrichedContact }) {
  const info = slaInfo(contact);
  if (!info) return null;
  const color = SLA_COLORS[info.state];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-mono shrink-0"
      style={{ background: `${color}15`, color }}
      title={`24h SLA — due ${new Date(info.dueAt).toLocaleString()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {info.label}
    </span>
  );
}

function EmptyQueue({ queue }: { queue: TriageQueue }) {
  const msgs: Record<TriageQueue, string> = {
    inbox: "No replies or overdue touches. ✓",
    approve: "No sourced leads to review.",
    review: "No drafts waiting. ✓",
  };
  return (
    <div className="px-4 py-8 text-xs text-center" style={{ color: "#9ca3af" }}>
      {msgs[queue]}
    </div>
  );
}
