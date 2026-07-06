"use client";

import { useEffect, useState, useTransition } from "react";
import type { Contact, Company, Sequence, Touch, PipelineContact } from "@/lib/types";
import { StageBadge } from "./stage-badge";
import {
  archiveContact,
  approveContact,
  updateSequence,
  markTouchSent,
  logReply,
  updateContactNotes,
  createGmailDraft,
  fetchContactDetail,
  fetchCompany,
  fetchTouches,
  fetchSequenceForContact,
} from "@/app/actions";

type Tab = "overview" | "sequence" | "conversation" | "company";

export function ContactPanel({
  pipeline,
  onClose,
  onRemove,
  onRefresh,
}: {
  pipeline: PipelineContact;
  onClose: () => void;
  onRemove: (id: string) => void;
  onRefresh: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [contact, setContact] = useState<Contact | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [sequence, setSequence] = useState<Sequence | null>(null);
  const [touches, setTouches] = useState<Touch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    setLoading(true);
    setContact(null);
    setCompany(null);
    setSequence(null);
    setTouches([]);

    async function fetchAll() {
      const [contactData, seqData] = await Promise.all([
        fetchContactDetail(pipeline.contact_id),
        fetchSequenceForContact(pipeline.contact_id),
      ]);

      setContact(contactData);

      if (seqData) {
        setSequence(seqData);
        setTouches(await fetchTouches(seqData.id));
      }

      if (pipeline.company_id) {
        setCompany(await fetchCompany(pipeline.company_id));
      }

      setLoading(false);
    }

    fetchAll();
  }, [pipeline.contact_id]);

  // Auto-switch tab to "sequence" when sequenced/in_outreach
  useEffect(() => {
    if (pipeline.stage === "sequenced" || pipeline.stage === "in_outreach") {
      setTab("sequence");
    } else if (pipeline.stage === "replied") {
      setTab("conversation");
    } else {
      setTab("overview");
    }
  }, [pipeline.contact_id, pipeline.stage]);

  async function handleSkip() {
    startTransition(async () => {
      // Skip only renders in the sourced (sort) stage — record it as an
      // archived decision so the scorer learns.
      await archiveContact(pipeline.contact_id, pipeline.client_id);
      onRemove(pipeline.contact_id);
      showToast("Contact archived.");
    });
  }

  async function handleApprove() {
    startTransition(async () => {
      await approveContact(pipeline.contact_id, pipeline.client_id);
      showToast("Queued for enrichment.");
      onRefresh();
    });
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#fff" }}>
      {/* Panel header */}
      <div className="px-6 pt-5 pb-3 border-b" style={{ borderColor: "#e5e7eb" }}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="font-bold text-base" style={{ color: "#1d1d1f" }}>
                {pipeline.full_name}
              </h2>
              <StageBadge stage={pipeline.stage} />
              {pipeline.overdue && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "#fdecea", color: "#c43322" }}>
                  Overdue
                </span>
              )}
            </div>
            <p className="text-sm" style={{ color: "#5b6470" }}>
              {[pipeline.title, pipeline.company].filter(Boolean).join(" · ")}
            </p>
            {pipeline.segment && (
              <p className="text-xs mt-0.5 font-mono" style={{ color: "#7c5aa3" }}>
                {pipeline.segment}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-lg leading-none mt-0.5"
            style={{ color: "#9ca3af" }}
          >
            ✕
          </button>
        </div>

        {/* Stage actions */}
        <div className="flex gap-2 mt-3">
          {pipeline.stage === "sourced" && (
            <>
              <Btn primary onClick={handleApprove} disabled={isPending}>Approve →</Btn>
              <Btn onClick={handleSkip} disabled={isPending}>Skip</Btn>
            </>
          )}
          {pipeline.stage === "enriched" && (
            <p className="text-xs" style={{ color: "#5b6470" }}>
              Email verified. Ready for sequence — use <code className="font-mono">/sales outreach</code> in Claude Code.
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4">
          {(["overview", "sequence", "conversation", "company"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors"
              style={
                tab === t
                  ? { background: "#1d1d1f", color: "#fff" }
                  : { background: "#f0f0f0", color: "#5b6470" }
              }
            >
              {t === "conversation" ? "Thread" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {loading ? (
          <div className="text-sm" style={{ color: "#5b6470" }}>Loading…</div>
        ) : (
          <>
            {tab === "overview" && <OverviewTab contact={contact} pipeline={pipeline} onNoteSave={(n) => { updateContactNotes(pipeline.contact_id, n); showToast("Notes saved."); }} />}
            {tab === "sequence" && (
              <SequenceTab
                sequence={sequence}
                touches={touches}
                contact={contact}
                pipeline={pipeline}
                onUpdate={(seq) => setSequence(seq)}
                onTouchUpdate={(t) => setTouches((prev) => prev.map((p) => (p.id === t.id ? t : p)))}
                showToast={showToast}
              />
            )}
            {tab === "conversation" && (
              <ConversationTab
                touches={touches}
                onTouchUpdate={(t) => setTouches((prev) => prev.map((p) => (p.id === t.id ? t : p)))}
                showToast={showToast}
              />
            )}
            {tab === "company" && <CompanyTab company={company} pipeline={pipeline} />}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-5 right-5 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg"
          style={{ background: "#1d1d1f", color: "#fff" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Overview ──────────────────────────────────────────────────────────────

function OverviewTab({
  contact,
  pipeline,
  onNoteSave,
}: {
  contact: Contact | null;
  pipeline: PipelineContact;
  onNoteSave: (notes: string) => void;
}) {
  const [notes, setNotes] = useState(contact?.notes ?? "");
  const [dirty, setDirty] = useState(false);

  if (!contact) return <Empty />;

  return (
    <div className="space-y-5">
      <Row label="Email">
        {contact.email ? (
          <a href={`mailto:${contact.email}`} className="text-sm font-mono" style={{ color: "#7c5aa3" }}>
            {contact.email}
          </a>
        ) : <Nil />}
        {contact.email_status !== "unverified" && (
          <span className="ml-2 text-xs" style={{ color: contact.email_status === "verified" || contact.email_status === "valid" ? "#2d7a3a" : "#c43322" }}>
            {contact.email_status}
          </span>
        )}
      </Row>
      <Row label="LinkedIn">
        {contact.linkedin_url ? (
          <a href={contact.linkedin_url} target="_blank" rel="noreferrer" className="text-sm" style={{ color: "#7c5aa3" }}>
            View profile ↗
          </a>
        ) : <Nil />}
      </Row>
      {contact.seniority && <Row label="Seniority"><Val>{contact.seniority}</Val></Row>}
      {contact.location && <Row label="Location"><Val>{contact.location}</Val></Row>}
      {contact.buying_role_hypothesis && <Row label="Buying role"><Val>{contact.buying_role_hypothesis}</Val></Row>}
      {pipeline.fit_score != null && (
        <Row label="Fit score">
          <span className="font-mono text-sm font-bold" style={{ color: "#7c5aa3" }}>
            {Math.round(pipeline.fit_score)}
          </span>
        </Row>
      )}
      {contact.fit_rationale && (
        <Block label="Fit rationale">{contact.fit_rationale}</Block>
      )}
      {contact.personalization_seed && (
        <Block label="Personalization seed">{contact.personalization_seed}</Block>
      )}
      {contact.recommended_angle && (
        <Block label="Recommended angle">{contact.recommended_angle}</Block>
      )}

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5b6470" }}>Notes</label>
        <textarea
          className="w-full rounded-lg border p-3 text-sm resize-none"
          style={{ borderColor: "#e5e7eb", color: "#1d1d1f", minHeight: 80 }}
          value={notes}
          onChange={(e) => { setNotes(e.target.value); setDirty(true); }}
          placeholder="Add notes…"
        />
        {dirty && (
          <button
            onClick={() => { onNoteSave(notes); setDirty(false); }}
            className="mt-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
            style={{ background: "#1d1d1f", color: "#fff" }}
          >
            Save notes
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Sequence ──────────────────────────────────────────────────────────────

function SequenceTab({
  sequence,
  touches,
  contact,
  pipeline,
  onUpdate,
  onTouchUpdate,
  showToast,
}: {
  sequence: Sequence | null;
  touches: Touch[];
  contact: Contact | null;
  pipeline: PipelineContact;
  onUpdate: (s: Sequence) => void;
  onTouchUpdate: (t: Touch) => void;
  showToast: (msg: string) => void;
}) {
  const [fields, setFields] = useState<Partial<Sequence>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [replyModal, setReplyModal] = useState<Touch | null>(null);

  useEffect(() => {
    if (sequence) setFields(sequence);
  }, [sequence?.id]);

  function change(key: keyof Sequence, val: string) {
    setFields((prev) => ({ ...prev, [key]: val }));
    setDirty(true);
  }

  async function handleSave() {
    if (!sequence) return;
    setSaving(true);
    const updated = { ...sequence, ...fields };
    await updateSequence(sequence.id, {
      subject_a: fields.subject_a ?? undefined,
      subject_b: fields.subject_b ?? undefined,
      email_body: fields.email_body ?? undefined,
      linkedin_connect_msg: fields.linkedin_connect_msg ?? undefined,
      linkedin_day10_msg: fields.linkedin_day10_msg ?? undefined,
    });
    onUpdate(updated);
    setDirty(false);
    setSaving(false);
    showToast("Sequence saved.");
  }

  async function handleSendDraft() {
    if (!contact?.email || !fields.email_body) return;
    setDraftLoading(true);
    const res = await createGmailDraft(
      contact.email,
      fields.subject_a ?? "(no subject)",
      fields.email_body
    );
    setDraftLoading(false);
    if (res.success) {
      showToast("Draft saved to Gmail.");
    } else {
      showToast(res.error ?? "Failed to create draft.");
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard.");
  }

  const pendingTouches = touches.filter((t) => t.status === "pending" || t.status === "queued");
  const sentTouches = touches.filter((t) => t.sent_at);

  if (!sequence && touches.length === 0) {
    return (
      <div className="text-sm" style={{ color: "#5b6470" }}>
        No sequence yet. Run <code className="font-mono">/sales outreach</code> in Claude Code to generate one.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Email section */}
      {(fields.email_body || fields.subject_a) && (
        <div>
          <SectionLabel>Email</SectionLabel>
          <div className="space-y-3">
            <div>
              <FieldLabel>Subject A</FieldLabel>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: "#e5e7eb", color: "#1d1d1f" }}
                value={fields.subject_a ?? ""}
                onChange={(e) => change("subject_a", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Subject B (A/B test)</FieldLabel>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: "#e5e7eb", color: "#1d1d1f" }}
                value={fields.subject_b ?? ""}
                onChange={(e) => change("subject_b", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Body</FieldLabel>
              <textarea
                className="w-full rounded-lg border p-3 text-sm font-mono resize-none"
                style={{ borderColor: "#e5e7eb", color: "#1d1d1f", minHeight: 200 }}
                value={fields.email_body ?? ""}
                onChange={(e) => change("email_body", e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {dirty && (
                <Btn primary onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : "Save edits"}
                </Btn>
              )}
              <Btn
                primary
                onClick={handleSendDraft}
                disabled={draftLoading || !contact?.email}
              >
                {draftLoading ? "Saving…" : "Save Gmail Draft"}
              </Btn>
              <Btn onClick={() => copyToClipboard(fields.email_body ?? "")}>
                Copy email
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* LinkedIn */}
      {(fields.linkedin_connect_msg || fields.linkedin_day10_msg) && (
        <div>
          <SectionLabel>LinkedIn</SectionLabel>
          <div className="space-y-3">
            {fields.linkedin_connect_msg && (
              <div>
                <FieldLabel>Connection request</FieldLabel>
                <textarea
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ borderColor: "#e5e7eb", color: "#1d1d1f", minHeight: 80 }}
                  value={fields.linkedin_connect_msg ?? ""}
                  onChange={(e) => change("linkedin_connect_msg", e.target.value)}
                />
                <button
                  onClick={() => copyToClipboard(fields.linkedin_connect_msg ?? "")}
                  className="mt-1.5 text-xs px-3 py-1 rounded-full"
                  style={{ background: "#f0f0f0", color: "#5b6470" }}
                >
                  Copy
                </button>
              </div>
            )}
            {fields.linkedin_day10_msg && (
              <div>
                <FieldLabel>Day 10 follow-up</FieldLabel>
                <textarea
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ borderColor: "#e5e7eb", color: "#1d1d1f", minHeight: 80 }}
                  value={fields.linkedin_day10_msg ?? ""}
                  onChange={(e) => change("linkedin_day10_msg", e.target.value)}
                />
                <button
                  onClick={() => copyToClipboard(fields.linkedin_day10_msg ?? "")}
                  className="mt-1.5 text-xs px-3 py-1 rounded-full"
                  style={{ background: "#f0f0f0", color: "#5b6470" }}
                >
                  Copy
                </button>
              </div>
            )}
            {dirty && (
              <Btn primary onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save edits"}
              </Btn>
            )}
          </div>
        </div>
      )}

      {/* Touch queue */}
      {touches.length > 0 && (
        <div>
          <SectionLabel>Touch schedule</SectionLabel>
          <div className="space-y-2">
            {touches.map((t) => (
              <TouchRow
                key={t.id}
                touch={t}
                onMarkSent={async () => {
                  await markTouchSent(t.id);
                  onTouchUpdate({ ...t, status: "sent", sent_at: new Date().toISOString() });
                  showToast("Marked as sent.");
                }}
                onLogReply={() => setReplyModal(t)}
                copyToClipboard={copyToClipboard}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reply modal */}
      {replyModal && (
        <ReplyModal
          touch={replyModal}
          onSave={async (sentiment, note) => {
            await logReply(replyModal.id, sentiment, note);
            onTouchUpdate({ ...replyModal, reply_at: new Date().toISOString(), sentiment, notes: note });
            setReplyModal(null);
            showToast("Reply logged.");
          }}
          onClose={() => setReplyModal(null)}
        />
      )}
    </div>
  );
}

function TouchRow({
  touch,
  onMarkSent,
  onLogReply,
  copyToClipboard,
}: {
  touch: Touch;
  onMarkSent: () => void;
  onLogReply: () => void;
  copyToClipboard: (t: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isSent = !!touch.sent_at;
  const hasReply = !!touch.reply_at;

  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
      <button
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
        style={{ background: "#fafafa" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{
            background: hasReply ? "#e6f4ea" : isSent ? "#fdecea" : "#f0f0f0",
            color: hasReply ? "#2d7a3a" : isSent ? "#c43322" : "#5b6470",
          }}
        >
          {touch.touch_num}
        </span>
        <span className="text-xs font-semibold capitalize" style={{ color: "#1d1d1f" }}>
          {touch.channel ?? "email"} touch {touch.touch_num}
        </span>
        {touch.subject && (
          <span className="text-xs truncate flex-1" style={{ color: "#5b6470" }}>
            {touch.subject}
          </span>
        )}
        <span className="text-xs font-mono shrink-0" style={{ color: hasReply ? "#2d7a3a" : isSent ? "#c43322" : "#9ca3af" }}>
          {hasReply ? "replied" : isSent ? `sent ${touch.sent_at?.slice(0, 10)}` : touch.scheduled_at?.slice(0, 10) ?? "queued"}
        </span>
        <span style={{ color: "#9ca3af" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-4 pb-3 pt-2 border-t" style={{ borderColor: "#e5e7eb" }}>
          {touch.body_md && (
            <pre className="text-xs font-mono whitespace-pre-wrap mb-3 p-3 rounded-lg" style={{ background: "#f5f5f7", color: "#1d1d1f" }}>
              {touch.body_md}
            </pre>
          )}
          {touch.notes && (
            <p className="text-xs mb-3 italic" style={{ color: "#5b6470" }}>{touch.notes}</p>
          )}
          {touch.reply_at && (
            <div className="text-xs mb-3 px-3 py-2 rounded-lg" style={{ background: "#e6f4ea", color: "#2d7a3a" }}>
              Replied {touch.reply_at.slice(0, 10)}
              {touch.sentiment && <span className="ml-2 font-semibold">{touch.sentiment}</span>}
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            {touch.body_md && (
              <button onClick={() => copyToClipboard(touch.body_md!)} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "#f0f0f0", color: "#5b6470" }}>
                Copy
              </button>
            )}
            {!isSent && (
              <button onClick={onMarkSent} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#1d1d1f", color: "#fff" }}>
                Mark sent
              </button>
            )}
            {isSent && !hasReply && (
              <button onClick={onLogReply} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#e6f4ea", color: "#2d7a3a" }}>
                Log reply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Conversation ──────────────────────────────────────────────────────────

function ConversationTab({
  touches,
  onTouchUpdate,
  showToast,
}: {
  touches: Touch[];
  onTouchUpdate: (t: Touch) => void;
  showToast: (msg: string) => void;
}) {
  const [replyModal, setReplyModal] = useState<Touch | null>(null);
  const sent = touches.filter((t) => t.sent_at).sort((a, b) => (a.sent_at! > b.sent_at! ? 1 : -1));

  if (sent.length === 0) {
    return <div className="text-sm" style={{ color: "#5b6470" }}>No touches sent yet.</div>;
  }

  return (
    <div className="space-y-4">
      {sent.map((t) => (
        <div key={t.id} className="rounded-lg border p-4" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold capitalize" style={{ color: "#1d1d1f" }}>
                Touch {t.touch_num} · {t.channel ?? "email"}
              </span>
              {t.subject && (
                <span className="text-xs" style={{ color: "#5b6470" }}>{t.subject}</span>
              )}
            </div>
            <span className="text-xs font-mono" style={{ color: "#9ca3af" }}>
              {t.sent_at?.slice(0, 10)}
            </span>
          </div>

          {t.body_md && (
            <pre className="text-xs font-mono whitespace-pre-wrap mb-3 p-3 rounded-lg" style={{ background: "#f5f5f7", color: "#1d1d1f" }}>
              {t.body_md}
            </pre>
          )}

          {/* Thread replies */}
          {Array.isArray(t.thread) && t.thread.length > 0 && (
            <div className="space-y-2 mb-3">
              {t.thread.map((msg, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg text-xs"
                  style={{
                    background: msg.role === "them" ? "#f0f0f0" : "#fdecea",
                    color: "#1d1d1f",
                  }}
                >
                  <span className="font-semibold capitalize">{msg.role}</span>
                  <span className="ml-2 font-mono" style={{ color: "#9ca3af" }}>{msg.at?.slice(0, 10)}</span>
                  <p className="mt-1">{msg.content}</p>
                </div>
              ))}
            </div>
          )}

          {t.reply_at ? (
            <div className="text-xs px-3 py-1.5 rounded-full inline-block" style={{ background: "#e6f4ea", color: "#2d7a3a" }}>
              Replied {t.reply_at.slice(0, 10)}
              {t.sentiment && <span className="ml-1.5 font-semibold">{t.sentiment}</span>}
            </div>
          ) : (
            <button
              onClick={() => setReplyModal(t)}
              className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={{ background: "#e6f4ea", color: "#2d7a3a" }}
            >
              Log reply
            </button>
          )}
        </div>
      ))}

      {replyModal && (
        <ReplyModal
          touch={replyModal}
          onSave={async (sentiment, note) => {
            await logReply(replyModal.id, sentiment, note);
            onTouchUpdate({ ...replyModal, reply_at: new Date().toISOString(), sentiment, notes: note });
            setReplyModal(null);
            showToast("Reply logged.");
          }}
          onClose={() => setReplyModal(null)}
        />
      )}
    </div>
  );
}

// ─── Company ───────────────────────────────────────────────────────────────

function CompanyTab({ company, pipeline }: { company: Company | null; pipeline: PipelineContact }) {
  if (!company) {
    return <div className="text-sm" style={{ color: "#5b6470" }}>No company data linked.</div>;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-1">
        <h3 className="font-bold" style={{ color: "#1d1d1f" }}>{company.name}</h3>
        {company.domain && (
          <a href={`https://${company.domain}`} target="_blank" rel="noreferrer" className="text-xs" style={{ color: "#7c5aa3" }}>
            {company.domain} ↗
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {company.industry && <Chip label="Industry" value={company.industry} />}
        {company.employee_count && <Chip label="Employees" value={company.employee_count.toLocaleString()} mono />}
        {company.segment && <Chip label="Segment" value={company.segment} />}
        {company.fit_score != null && <Chip label="Fit score" value={String(Math.round(company.fit_score))} mono />}
      </div>

      {company.funded_recently && (
        <div className="rounded-lg p-3" style={{ background: "#e6f4ea" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#2d7a3a" }}>Recently funded</p>
          <p className="text-xs" style={{ color: "#1d1d1f" }}>
            {[company.funding_round, company.funding_amount, company.funding_date].filter(Boolean).join(" · ")}
          </p>
        </div>
      )}

      {company.has_marketing_gap && company.marketing_gap_signal && (
        <div className="rounded-lg p-3" style={{ background: "#fef3e7" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#c17d3a" }}>Marketing gap signal</p>
          <p className="text-xs" style={{ color: "#1d1d1f" }}>{company.marketing_gap_signal}</p>
        </div>
      )}

      {company.fit_rationale && <Block label="Fit rationale">{company.fit_rationale}</Block>}
    </div>
  );
}

// ─── Reply modal ────────────────────────────────────────────────────────────

function ReplyModal({
  touch,
  onSave,
  onClose,
}: {
  touch: Touch;
  onSave: (sentiment: string, note: string) => Promise<void>;
  onClose: () => void;
}) {
  const [sentiment, setSentiment] = useState("positive");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="rounded-xl p-6 w-full max-w-sm shadow-xl" style={{ background: "#fff" }}>
        <h3 className="font-bold mb-4" style={{ color: "#1d1d1f" }}>Log reply</h3>
        <div className="mb-3">
          <FieldLabel>Sentiment</FieldLabel>
          <div className="flex gap-2">
            {["positive", "neutral", "negative", "ooo"].map((s) => (
              <button
                key={s}
                onClick={() => setSentiment(s)}
                className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
                style={
                  sentiment === s
                    ? { background: "#1d1d1f", color: "#fff" }
                    : { background: "#f0f0f0", color: "#5b6470" }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <FieldLabel>Note (optional)</FieldLabel>
          <textarea
            className="w-full rounded-lg border p-3 text-sm resize-none"
            style={{ borderColor: "#e5e7eb", color: "#1d1d1f", minHeight: 80 }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did they say?"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn
            primary
            onClick={async () => {
              setSaving(true);
              await onSave(sentiment, note);
            }}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Small UI primitives ────────────────────────────────────────────────────

function Btn({
  children,
  onClick,
  primary,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-opacity disabled:opacity-50"
      style={
        primary
          ? { background: "#c43322", color: "#fff" }
          : { background: "#f0f0f0", color: "#1d1d1f" }
      }
    >
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs font-semibold shrink-0 w-32 pt-0.5" style={{ color: "#9ca3af" }}>
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>{label}</p>
      <p className="text-sm" style={{ color: "#1d1d1f" }}>{children}</p>
    </div>
  );
}

function Chip({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "#f5f5f7" }}>
      <p className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>{label}</p>
      <p className={`text-sm font-semibold ${mono ? "font-mono" : ""}`} style={{ color: "#1d1d1f" }}>
        {value}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9ca3af" }}>
      {children}
    </p>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold mb-1" style={{ color: "#5b6470" }}>
      {children}
    </label>
  );
}

function Val({ children }: { children: React.ReactNode }) {
  return <span className="text-sm" style={{ color: "#1d1d1f" }}>{children}</span>;
}

function Nil() {
  return <span className="text-xs" style={{ color: "#d1d5db" }}>—</span>;
}

function Empty() {
  return <div className="text-sm" style={{ color: "#5b6470" }}>Loading contact…</div>;
}
