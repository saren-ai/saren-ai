"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Contact, Company, ResearchDepth, Touch, GmailMessage, ThreadSummary } from "@/lib/types";
import type { EnrichedContact } from "@/lib/queues";
import { detectNetwork } from "@/lib/queues";
import type { TriageQueue } from "./triage";
import {
  markTouchSent,
  logReply,
  getGmailThread,
  getThreadSummaries,
  generateEmailCopy,
  generateNextTouch,
  createTouch,
  createGmailDraft,
  queueTouchDraft,
  recordDraftEdit,
} from "@/app/actions";

const QUICK_TAGS = [
  { tag: "#met-local", label: "Met locally" },
  { tag: "#past-client", label: "Past client" },
  { tag: "#mutual-friend", label: "Mutual connection" },
];

const REJECT_REASONS = [
  { value: "know-them", label: "Know them" },
  { value: "wrong-seniority", label: "Wrong seniority" },
  { value: "wrong-company", label: "Wrong company" },
  { value: "competitor", label: "Competitor" },
  { value: "bad-timing", label: "Bad timing" },
  { value: "not-icp", label: "Not ICP" },
  { value: "other", label: "Other" },
] as const;

// Inbox-context archive reasons (mid-conversation verdicts).
const INBOX_ARCHIVE_REASONS = [
  { value: "no-thank-you", label: "No thank you" },
  { value: "not-interested", label: "Not interested" },
  { value: "wrong-timing", label: "Wrong timing" },
  { value: "bounced", label: "Bounced" },
  { value: "other", label: "Other" },
] as const;

interface Props {
  queue: TriageQueue;
  contact: EnrichedContact;
  contactDetail: Contact | null;
  company: Company | null;
  touches: Touch[];
  detailLoading: boolean;
  peerCount: number;
  injectOpen: boolean;
  onInjectToggle: () => void;
  draftSubject: string;
  draftBody: string;
  onDraftSubjectChange: (v: string) => void;
  onDraftBodyChange: (v: string) => void;
  generatedDraft: { subject: string; body: string; brief: string | null } | null;
  onDraftGenerated: (subject: string, body: string, brief: string | null) => void;
  bodyRef: React.RefObject<HTMLTextAreaElement | null>;
  onApprove: (note: string, depth: ResearchDepth) => void;
  approveOpen: boolean;
  onApproveToggle: (open: boolean) => void;
  onSkipToWriter: (note: string) => void;
  skipWriterOpen: boolean;
  onSkipWriterToggle: (open: boolean) => void;
  onSkip: () => void;
  onReject: (reason: string, note: string) => void;
  rejectOpen: boolean;
  onRejectToggle: (open: boolean) => void;
  onArchive: (note: string) => void;
  onInboxArchive: (reason: string, note: string) => void;
  archiveOpen: boolean;
  onArchiveToggle: (open: boolean) => void;
  onPushDraft: () => void;
  onInjectSave: (tags: string[], freetext: string) => void;
  onTouchQueued: () => void;
  isPending: boolean;
  toast: string | null;
}

export function ActionPanel(props: Props) {
  const { queue, contact } = props;
  const net = detectNetwork(contact.company, contact.title);

  const websiteUrl = props.company?.url
    ?? (props.company?.domain ? `https://${props.company.domain}` : null);
  const websiteLabel = props.company?.domain ?? props.company?.name ?? "Website";

  return (
    <div className="h-full flex flex-col overflow-hidden relative" style={{ background: "#f5f5f7" }}>
      {/* Toast */}
      {props.toast && (
        <div
          className="absolute top-4 right-4 z-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
          style={{ background: "#1d1d1f", color: "#fff" }}
        >
          {props.toast}
        </div>
      )}

      {/* Header */}
      <div
        className="px-6 py-4 border-b bg-white"
        style={{ borderColor: "#e5e7eb" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold truncate" style={{ color: "#1d1d1f" }}>
              {contact.full_name}
            </h2>
            <p className="text-sm mt-0.5 truncate" style={{ color: "#5b6470" }}>
              {[contact.title, contact.company].filter(Boolean).join(" · ")}
            </p>
            {net && (
              <span
                className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${net.color}15`, color: net.color }}
              >
                {net.label}
                {props.peerCount > 0 && ` · +${props.peerCount} peers`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {contact.linkedin_url && (
              <a
                href={contact.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded font-mono"
                style={{ background: "#e8f0fe", color: "#1a73e8" }}
              >
                LinkedIn ↗
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded font-mono truncate max-w-[140px]"
                style={{ background: "#f0f4f8", color: "#374151" }}
                title={websiteUrl}
              >
                {websiteLabel} ↗
              </a>
            )}
            <button
              onClick={props.onInjectToggle}
              className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={
                props.injectOpen
                  ? { background: "#7c5aa3", color: "#fff" }
                  : { background: "#f0ebf8", color: "#7c5aa3" }
              }
            >
              {props.injectOpen ? "Close" : "[i] Inject context"}
            </button>
          </div>
        </div>

        {/* Inject drawer — keyed by contact so typed text never carries over */}
        {props.injectOpen && (
          <InjectDrawer
            key={contact.contact_id}
            onSave={props.onInjectSave}
            onClose={props.onInjectToggle}
          />
        )}
      </div>

      {/* Main content — views keyed by contact so ALL per-contact form state
          (compose fields, notes, drawers) resets when the selection changes */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {queue === "inbox" && (
          <InboxView
            key={contact.contact_id}
            contact={contact}
            contactDetail={props.contactDetail}
            company={props.company}
            touches={props.touches}
            detailLoading={props.detailLoading}
            onInboxArchive={props.onInboxArchive}
            archiveOpen={props.archiveOpen}
            onArchiveToggle={props.onArchiveToggle}
            onTouchQueued={props.onTouchQueued}
            isPending={props.isPending}
          />
        )}
        {queue === "approve" && (
          <ApproveView
            key={contact.contact_id}
            contact={contact}
            contactDetail={props.contactDetail}
            company={props.company}
            detailLoading={props.detailLoading}
            onApprove={props.onApprove}
            approveOpen={props.approveOpen}
            onApproveToggle={props.onApproveToggle}
            onSkipToWriter={props.onSkipToWriter}
            skipWriterOpen={props.skipWriterOpen}
            onSkipWriterToggle={props.onSkipWriterToggle}
            onReject={props.onReject}
            rejectOpen={props.rejectOpen}
            onRejectToggle={props.onRejectToggle}
            onArchive={props.onArchive}
            archiveOpen={props.archiveOpen}
            onArchiveToggle={props.onArchiveToggle}
            isPending={props.isPending}
          />
        )}
        {queue === "review" && (
          <ReviewView
            key={contact.contact_id}
            contact={contact}
            contactDetail={props.contactDetail}
            company={props.company}
            draftSubject={props.draftSubject}
            draftBody={props.draftBody}
            onDraftSubjectChange={props.onDraftSubjectChange}
            onDraftBodyChange={props.onDraftBodyChange}
            generatedDraft={props.generatedDraft}
            onDraftGenerated={props.onDraftGenerated}
            bodyRef={props.bodyRef}
            onPushDraft={props.onPushDraft}
            onSkip={props.onSkip}
            isPending={props.isPending}
          />
        )}
      </div>
    </div>
  );
}

// ── Inbox view: replied / overdue ─────────────────────────────────────────────

function InboxView({
  contact,
  contactDetail,
  company,
  touches,
  detailLoading,
  onInboxArchive,
  archiveOpen,
  onArchiveToggle,
  onTouchQueued,
  isPending,
}: {
  contact: EnrichedContact;
  contactDetail: Contact | null;
  company: Company | null;
  touches: Touch[];
  detailLoading: boolean;
  onInboxArchive: (reason: string, note: string) => void;
  archiveOpen: boolean;
  onArchiveToggle: (open: boolean) => void;
  onTouchQueued: () => void;
  isPending: boolean;
}) {
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [gmailMessages, setGmailMessages] = useState<GmailMessage[] | null>(null);
  const [gmailLoading, setGmailLoading] = useState(false);
  const [gmailError, setGmailError] = useState<string | null>(null);

  const loadGmailThread = useCallback(async () => {
    if (!contact.email) return;
    setGmailLoading(true);
    setGmailError(null);
    const result = await getGmailThread(contact.email);
    setGmailMessages(result.messages);
    if (result.error) setGmailError(result.error);
    setGmailLoading(false);
  }, [contact.email]);

  // Auto-load thread when contact changes
  useEffect(() => {
    setGmailMessages(null);
    setGmailError(null);
    if (contact.email) loadGmailThread();
  }, [contact.contact_id]);

  async function handleMarkSent(touchId: string) {
    setMarkingId(touchId);
    await markTouchSent(touchId);
    setMarkingId(null);
  }

  return (
    <>
      {/* Meeting booked banner */}
      {contact.stage === "meeting_booked" && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: "#e0f2fe", border: "1px solid #bae0fb" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#0369a1" }}>
            Meeting booked
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#0369a1" }}>
            Prep before the call — review the thread, research, and notes below.
          </p>
        </div>
      )}

      <LocalContext contactDetail={contactDetail} company={company} loading={detailLoading} />

      {/* Gmail Thread */}
      <Card
        title="Gmail thread"
        hint={
          gmailMessages
            ? `${gmailMessages.length} message${gmailMessages.length !== 1 ? "s" : ""}`
            : undefined
        }
      >
        {gmailLoading && (
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Loading thread…
          </p>
        )}
        {gmailError && (
          <p className="text-xs" style={{ color: "#c43322" }}>
            {gmailError}
          </p>
        )}
        {!gmailLoading && !gmailError && gmailMessages?.length === 0 && (
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            No Gmail messages found for {contact.email}.
          </p>
        )}
        {gmailMessages && gmailMessages.length > 0 && (
          <div className="space-y-3">
            {gmailMessages.map((msg) => (
              <GmailBubble key={msg.uid} msg={msg} />
            ))}
          </div>
        )}
        {!gmailLoading && gmailMessages === null && (
          <button
            onClick={loadGmailThread}
            className="text-xs px-3 py-1.5 rounded font-medium"
            style={{ background: "#f5f5f7", color: "#5b6470" }}
          >
            Load thread
          </button>
        )}
      </Card>

      {touches.length > 0 && (
        <Card title="Touch log">
          <div className="space-y-3">
            {touches.map((t) => (
              <TouchRow
                key={t.id}
                touch={t}
                fallbackBody={t.touch_num === 1 ? (contact.sequence?.email_body ?? null) : null}
                fallbackSubject={t.touch_num === 1 ? (contact.sequence?.subject_a ?? null) : null}
                onMarkSent={handleMarkSent}
                markingId={markingId}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Thread digest — one sentence per message, above the composer */}
      <ThreadDigest contactId={contact.contact_id} contactEmail={contact.email} />

      {/* Next touch module — always show for inbox contacts */}
      <NextTouchModule
        contact={contact}
        contactDetail={contactDetail}
        company={company}
        touches={touches}
        gmailMessages={gmailMessages}
        onTouchQueued={onTouchQueued}
      />

      {/* Archive — conversation over (they passed, bounced, wrong timing) */}
      <Card title="Archive">
        <div className="flex gap-2 flex-wrap">
          <Btn
            label="[x] Archive — stop the sequence"
            color="#9ca3af"
            onClick={() => onArchiveToggle(!archiveOpen)}
            disabled={isPending}
          />
        </div>
        {archiveOpen && (
          <InboxArchiveDrawer
            key={contact.contact_id}
            onSave={onInboxArchive}
            onCancel={() => onArchiveToggle(false)}
            isPending={isPending}
          />
        )}
        <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
          Records the verdict, stops the active sequence, and removes the
          contact from every queue.
        </p>
      </Card>
    </>
  );
}

// ── Touch row with expandable body ───────────────────────────────────────────

function TouchRow({
  touch: t,
  fallbackBody,
  fallbackSubject,
  onMarkSent,
  markingId,
}: {
  touch: Touch;
  fallbackBody: string | null;
  fallbackSubject: string | null;
  onMarkSent: (id: string) => void;
  markingId: string | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [sentiment, setSentiment] = useState("positive");
  const [note, setNote] = useState("");
  const [logging, setLogging] = useState(false);

  const displaySubject = t.subject || fallbackSubject;
  const displayBody = t.body_md || fallbackBody;
  const PREVIEW_LEN = 220;
  const bodyPreview = displayBody ? displayBody.slice(0, PREVIEW_LEN) : null;
  const hasMore = displayBody ? displayBody.length > PREVIEW_LEN : false;

  async function handleLogReply() {
    setLogging(true);
    await logReply(t.id, sentiment, note);
    setLogging(false);
    setShowReplyForm(false);
    setNote("");
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
      {/* Touch header */}
      <div className="flex items-center justify-between px-3 py-2.5" style={{ background: "#fafafa" }}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold" style={{ color: "#1d1d1f" }}>
            Touch {t.touch_num}
          </span>
          <span className="text-xs" style={{ color: "#9ca3af" }}>
            {t.channel ?? "email"}
          </span>
          {t.sent_at && (
            <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
              {fmtDate(t.sent_at)}
            </span>
          )}
        </div>
        <StatusBadge status={t.status ?? ""} />
      </div>

      {/* Subject */}
      {displaySubject && (
        <div className="px-3 pt-2.5 pb-0">
          <p className="text-xs font-semibold" style={{ color: "#5b6470" }}>
            {displaySubject}
          </p>
        </div>
      )}

      {/* Body preview / expanded */}
      {displayBody && (
        <div className="px-3 pt-2 pb-2.5">
          <p
            className="text-xs leading-relaxed whitespace-pre-wrap"
            style={{ color: "#374151" }}
          >
            {expanded ? displayBody : bodyPreview}
            {!expanded && hasMore ? "…" : ""}
          </p>
          {hasMore && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1.5 text-xs underline"
              style={{ color: "#7c5aa3" }}
            >
              {expanded ? "Collapse" : "Show full email"}
            </button>
          )}
        </div>
      )}

      {/* Reply info */}
      {t.reply_at && (
        <div
          className="mx-3 mb-2.5 px-3 py-2 rounded-lg text-xs"
          style={{ background: "#f0ebf8", color: "#7c5aa3" }}
        >
          Replied {fmtDate(t.reply_at)}
          {t.sentiment ? ` · ${t.sentiment}` : ""}
          {t.notes ? ` — "${t.notes}"` : ""}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 px-3 pb-3">
        {t.status !== "sent" && (
          <Btn
            label={markingId === t.id ? "Saving…" : "Mark sent"}
            color="#c43322"
            onClick={() => onMarkSent(t.id)}
            disabled={markingId === t.id}
          />
        )}
        {!t.reply_at && t.status === "sent" && !showReplyForm && (
          <Btn
            label="Log reply"
            color="#7c5aa3"
            onClick={() => setShowReplyForm(true)}
          />
        )}
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <div className="px-3 pb-3 space-y-2" style={{ borderTop: "1px solid #f5f5f7" }}>
          <p className="text-xs font-semibold pt-2" style={{ color: "#9ca3af" }}>
            Log their reply
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {["positive", "neutral", "negative", "not-interested"].map((s) => (
              <button
                key={s}
                onClick={() => setSentiment(s)}
                className="text-xs px-2 py-1 rounded-full"
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
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did they say? (optional)"
            rows={2}
            className="w-full text-xs p-2 rounded-lg border resize-none focus:outline-none"
            style={{ borderColor: "#e5e7eb", color: "#1d1d1f" }}
          />
          <div className="flex gap-2">
            <Btn
              label={logging ? "Saving…" : "Save reply"}
              color="#c43322"
              onClick={handleLogReply}
              disabled={logging}
            />
            <Btn
              label="Cancel"
              color="#9ca3af"
              onClick={() => setShowReplyForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Next touch module (Inbox) ─────────────────────────────────────────────────

function nextChannelFor(touchNum: number, seq: { linkedin_connect_msg?: string | null; linkedin_day10_msg?: string | null } | null | undefined): "email" | "linkedin" {
  if (touchNum === 2 && seq?.linkedin_connect_msg) return "linkedin";
  if (touchNum >= 4 && touchNum % 2 === 0 && seq?.linkedin_day10_msg) return "linkedin";
  return "email";
}

function NextTouchModule({
  contact,
  contactDetail,
  company,
  touches,
  gmailMessages,
  onTouchQueued,
}: {
  contact: EnrichedContact;
  contactDetail: Contact | null;
  company: Company | null;
  touches: Touch[];
  gmailMessages: GmailMessage[] | null;
  onTouchQueued: () => void;
}) {
  const seq = contact.sequence;
  const net = detectNetwork(contact.company, contact.title);

  const sentTouches = touches
    .filter((t) => t.status === "sent")
    .sort((a, b) => a.touch_num - b.touch_num);
  const lastSentTouch = sentTouches.at(-1) ?? null;
  const nextTouchNum = (lastSentTouch?.touch_num ?? 0) + 1;
  const nextChannel = nextChannelFor(nextTouchNum, seq);
  const isReply = contact.stage === "replied";

  const prevSubject = lastSentTouch?.subject ?? seq?.subject_a ?? null;
  const prevContent = lastSentTouch?.body_md ?? seq?.email_body ?? null;
  const lastInbound = gmailMessages?.filter((m) => !m.isOutbound).at(-1) ?? null;

  const [subject, setSubject] = useState(() =>
    prevSubject ? `Re: ${prevSubject.replace(/^Re:\s*/i, "")}` : ""
  );
  const [body, setBody] = useState(() => {
    if (nextChannel === "linkedin" && nextTouchNum === 2 && seq?.linkedin_connect_msg)
      return seq.linkedin_connect_msg;
    if (nextChannel === "linkedin" && seq?.linkedin_day10_msg)
      return seq.linkedin_day10_msg;
    return "";
  });
  const [writing, setWriting] = useState(false);
  const [writeError, setWriteError] = useState<string | null>(null);
  const [pushing, setPushing] = useState(false);
  const [pushResult, setPushResult] = useState<"success" | "error" | null>(null);
  const [copied, setCopied] = useState(false);
  // Operator brief — per-contact direction for THIS draft. Cleared on contact
  // switch (below), kept after a generate so edit + regenerate works.
  const [brief, setBrief] = useState("");
  const [channelOverride, setChannelOverride] = useState<"email" | "linkedin" | null>(null);

  const effectiveChannel = channelOverride ?? nextChannel;

  // Reset state when contact changes
  useEffect(() => {
    setWriteError(null);
    setPushResult(null);
    setBrief("");
    setChannelOverride(null);
    setSubject(prevSubject ? `Re: ${prevSubject.replace(/^Re:\s*/i, "")}` : "");
    if (nextChannel === "linkedin" && nextTouchNum === 2 && seq?.linkedin_connect_msg)
      setBody(seq.linkedin_connect_msg);
    else if (nextChannel === "linkedin" && seq?.linkedin_day10_msg)
      setBody(seq.linkedin_day10_msg);
    else setBody("");
  }, [contact.contact_id]);

  function handleChannelSwitch(ch: "email" | "linkedin") {
    setChannelOverride(ch);
    setWriteError(null);
    setPushResult(null);
    setCopied(false);
    if (ch === "linkedin") {
      if (nextTouchNum === 2 && seq?.linkedin_connect_msg) setBody(seq.linkedin_connect_msg);
      else if (seq?.linkedin_day10_msg) setBody(seq.linkedin_day10_msg);
      else setBody("");
    } else {
      setBody("");
      setSubject(prevSubject ? `Re: ${prevSubject.replace(/^Re:\s*/i, "")}` : "");
    }
  }

  async function handleWrite() {
    setWriting(true);
    setWriteError(null);
    const result = await generateNextTouch({
      contactId: contact.contact_id,
      contactName: contact.full_name,
      contactFirstName: contactDetail?.first_name ?? null,
      contactTitle: contact.title,
      contactCompany: contact.company,
      channel: effectiveChannel,
      touchNum: nextTouchNum,
      isReply,
      previousSubject: prevSubject,
      previousContent: prevContent,
      replyContent: lastInbound?.body ?? null,
      personalizationSeed: contactDetail?.personalization_seed ?? null,
      fitRationale: contactDetail?.fit_rationale ?? null,
      recommendedAngle: contactDetail?.recommended_angle ?? null,
      network: net?.label ?? null,
      operatorBrief: brief.trim() || null,
    });
    if (result.error) {
      setWriteError(result.error);
    } else {
      if (result.subject) setSubject(result.subject);
      setBody(result.body);
    }
    setWriting(false);
  }

  async function handlePushEmail() {
    if (!contact.email || !body) return;
    setPushing(true);
    const result = await createGmailDraft(
      contact.email,
      subject || `(follow-up touch ${nextTouchNum})`,
      body
    );
    if (result.success) {
      // Draft saved for the immediate next step → queue the touch so
      // v_pipeline drops this contact out of Inbox until something new happens.
      const queued = await queueTouchDraft({
        contactId: contact.contact_id,
        sequenceId: seq?.id ?? null,
        channel: "email",
        subject: subject || undefined,
        bodyMd: body,
      });
      if (queued.error) {
        setPushResult("error");
        setPushing(false);
        return;
      }
      setPushResult("success");
      setPushing(false);
      onTouchQueued();
      return;
    }
    setPushResult("error");
    setPushing(false);
  }

  async function handleCopyLinkedIn() {
    if (!body) return;
    await navigator.clipboard.writeText(body);
    if (seq?.id) {
      await createTouch({
        sequenceId: seq.id,
        touchNum: nextTouchNum,
        // touches.channel check allows linkedin_connect / linkedin_message
        channel: nextTouchNum === 2 ? "linkedin_connect" : "linkedin_message",
        bodyMd: body,
        status: "draft",
      });
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const channelLabel = effectiveChannel === "email"
    ? isReply ? "Reply" : `Email · Touch ${nextTouchNum}`
    : nextTouchNum === 2 ? "LinkedIn connect" : `LinkedIn · Touch ${nextTouchNum}`;

  const channelColor = effectiveChannel === "linkedin" ? "#1a73e8" : "#c43322";

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "#fff" }}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9ca3af" }}>
            {isReply ? "Continue conversation" : "Next touch"}
          </span>
          {isReply ? (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${channelColor}18`, color: channelColor }}
            >
              {channelLabel}
            </span>
          ) : (
            <div className="flex items-center rounded-full p-0.5" style={{ background: "#f0f0f0" }}>
              {(["email", "linkedin"] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => handleChannelSwitch(ch)}
                  className="text-xs px-3 py-0.5 rounded-full font-semibold transition-colors"
                  style={
                    effectiveChannel === ch
                      ? { background: ch === "email" ? "#c43322" : "#1a73e8", color: "#fff" }
                      : { background: "transparent", color: "#9ca3af" }
                  }
                >
                  {ch === "email" ? "Email" : "LinkedIn"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 space-y-3" style={{ background: "#fff", borderTop: "1px solid #f0f0f0" }}>
        {/* Their reply context */}
        {isReply && lastInbound && (
          <div
            className="text-xs p-3 rounded-lg mt-3"
            style={{ background: "#f0ebf8", color: "#7c5aa3" }}
          >
            <p className="font-semibold mb-1">Their reply · {fmtDate(lastInbound.date)}</p>
            <p className="leading-relaxed">
              {lastInbound.body.slice(0, 300)}
              {lastInbound.body.length > 300 ? "…" : ""}
            </p>
          </div>
        )}

        {/* Not replied: show last sent snippet */}
        {!isReply && prevContent && (
          <div
            className="text-xs p-3 rounded-lg mt-3"
            style={{ background: "#f5f5f7", color: "#5b6470" }}
          >
            <p className="font-semibold mb-1 text-xs" style={{ color: "#9ca3af" }}>
              Last sent · Touch {lastSentTouch?.touch_num ?? 1}
            </p>
            <p className="leading-relaxed line-clamp-3">
              {prevContent.slice(0, 200)}
              {prevContent.length > 200 ? "…" : ""}
            </p>
          </div>
        )}

        {/* Operator brief — direction for THIS draft, read at generate time */}
        <div className="pt-1 -mb-2">
          <BriefInput value={brief} onChange={setBrief} disabled={writing} />
        </div>

        {/* Write button row */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleWrite}
            disabled={writing}
            className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-semibold disabled:opacity-50"
            style={writing ? { background: "#f0ebf8", color: "#7c5aa3" } : { background: "#7c5aa3", color: "#fff" }}
          >
            {writing ? (
              <>
                <span className="inline-block w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Writing…
              </>
            ) : (
              <>✦ {body ? "Rewrite" : "Write"}</>
            )}
          </button>
          <span className="text-xs" style={{ color: "#9ca3af" }}>
            {isReply ? "Generate reply from their message" : `Generate touch ${nextTouchNum} · ${effectiveChannel}`}
          </span>
        </div>

        {writeError && (
          <p className="text-xs" style={{ color: "#c43322" }}>
            {writeError}
          </p>
        )}

        {/* Compose area */}
        {effectiveChannel === "email" && (
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full text-sm px-3 py-2 rounded-lg border focus:outline-none"
            style={{ borderColor: "#e5e7eb", color: "#1d1d1f", background: "#fff" }}
          />
        )}
        <div className="relative">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={
              writing
                ? "Writing…"
                : effectiveChannel === "linkedin"
                ? "LinkedIn message (300 chars max)…"
                : "Email body…"
            }
            rows={effectiveChannel === "linkedin" ? 4 : 8}
            className="w-full text-sm px-3 py-2 rounded-lg border resize-none focus:outline-none font-mono"
            style={{
              borderColor: "#e5e7eb",
              color: "#1d1d1f",
              background: writing ? "#fafafa" : "#fff",
            }}
            readOnly={writing}
          />
          {effectiveChannel === "linkedin" && body && (
            <span
              className="absolute bottom-2 right-3 text-xs font-mono"
              style={{ color: body.length > 300 ? "#c43322" : "#9ca3af" }}
            >
              {body.length}/300
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 flex-wrap">
          {effectiveChannel === "email" ? (
            <Btn
              label={pushing ? "Pushing…" : pushResult === "success" ? "Draft saved ✓" : "Push to Gmail draft"}
              color={pushResult === "success" ? "#16a34a" : "#c43322"}
              onClick={handlePushEmail}
              disabled={pushing || !body || pushResult === "success"}
            />
          ) : (
            <Btn
              label={copied ? "Copied! ✓" : "Copy message"}
              color={copied ? "#16a34a" : "#1a73e8"}
              onClick={handleCopyLinkedIn}
              disabled={!body || body.length > 300}
            />
          )}
          {effectiveChannel === "email" && contact.email && (
            <span className="text-xs" style={{ color: "#9ca3af" }}>
              To: {contact.email}
            </span>
          )}
        </div>

        {pushResult === "error" && (
          <p className="text-xs" style={{ color: "#c43322" }}>
            Gmail draft failed — check IMAP credentials.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Thread digest (one sentence per message; Haiku-summarized, cached) ───────
// Collapsed-but-visible: the digest IS the compact view of the thread, shown
// above the composer so the next touch is drafted in context. Summaries are
// cached in tool_outputs (keyed by Gmail UID) — repeat opens are free.

function ThreadDigest({
  contactId,
  contactEmail,
}: {
  contactId: string;
  contactEmail: string | null;
}) {
  const [summaries, setSummaries] = useState<ThreadSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!contactEmail) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    getThreadSummaries(contactId, contactEmail).then((result) => {
      if (cancelled) return;
      setSummaries(result.summaries);
      if (result.error) setError(result.error);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [contactId, contactEmail]);

  if (!contactEmail) return null;
  if (!loading && !error && (summaries?.length ?? 0) === 0) return null;

  const VISIBLE = 6;
  const list = summaries ?? [];
  const visible = showAll ? list : list.slice(-VISIBLE);
  const hidden = list.length - visible.length;

  return (
    <Card
      title="Thread so far"
      hint={list.length > 0 ? `${list.length} message${list.length !== 1 ? "s" : ""}` : undefined}
    >
      {loading && (
        <p className="text-xs" style={{ color: "#9ca3af" }}>
          Summarizing thread…
        </p>
      )}
      {error && (
        <p className="text-xs" style={{ color: "#c43322" }}>
          {error}
        </p>
      )}
      {!loading && list.length > 0 && (
        <div className="space-y-1.5">
          {hidden > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="text-xs underline"
              style={{ color: "#9ca3af" }}
            >
              show {hidden} earlier message{hidden !== 1 ? "s" : ""}
            </button>
          )}
          {visible.map((s) => (
            <div key={s.uid} className="flex items-baseline gap-2">
              <span
                className="text-xs font-semibold shrink-0"
                style={{ color: s.isOutbound ? "#9ca3af" : "#7c5aa3" }}
              >
                {s.isOutbound ? "You" : s.from}
              </span>
              <span className="text-xs font-mono shrink-0" style={{ color: "#d1d5db" }}>
                {fmtDate(s.date)}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: "#374151" }}>
                {s.sentence}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function GmailBubble({ msg }: { msg: GmailMessage }) {
  const [expanded, setExpanded] = useState(false);
  const preview = msg.body.slice(0, 180);
  const hasMore = msg.body.length > 180;

  return (
    <div
      className={`flex ${msg.isOutbound ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[85%] rounded-xl px-3 py-2.5"
        style={
          msg.isOutbound
            ? { background: "#1d1d1f", color: "#fff" }
            : { background: "#f0ebf8", color: "#1d1d1f" }
        }
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-semibold"
            style={{ color: msg.isOutbound ? "#9ca3af" : "#7c5aa3" }}
          >
            {msg.isOutbound ? "You" : msg.fromName || msg.from}
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: msg.isOutbound ? "#6b7280" : "#9ca3af" }}
          >
            {fmtDate(msg.date)}
          </span>
        </div>
        {!msg.isOutbound && (
          <p
            className="text-xs mb-1 truncate"
            style={{ color: msg.isOutbound ? "#9ca3af" : "#5b6470" }}
          >
            {msg.subject}
          </p>
        )}
        <p
          className="text-xs whitespace-pre-wrap"
          style={{ color: msg.isOutbound ? "#e5e7eb" : "#1d1d1f" }}
        >
          {expanded ? msg.body : preview}
          {hasMore && !expanded && "…"}
        </p>
        {hasMore && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs mt-1 underline"
            style={{ color: msg.isOutbound ? "#9ca3af" : "#7c5aa3" }}
          >
            {expanded ? "collapse" : "read more"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Research dossier (Review tab only) ───────────────────────────────────────

function ResearchDossier({
  contactDetail,
  company,
}: {
  contactDetail: Contact | null;
  company: Company | null;
}) {
  const [open, setOpen] = useState(true);

  const hasContactResearch =
    contactDetail?.fit_rationale ||
    contactDetail?.personalization_seed ||
    contactDetail?.recommended_angle ||
    contactDetail?.buying_role_hypothesis;

  const hasContactMeta =
    contactDetail?.location ||
    contactDetail?.seniority ||
    contactDetail?.segment ||
    contactDetail?.fit_score != null ||
    contactDetail?.notes;

  const hasCompany = !!company;

  if (!hasContactResearch && !hasContactMeta && !hasCompany) return null;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
      {/* Collapsible header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{ background: "#fff" }}
      >
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9ca3af" }}>
          Research dossier
        </span>
        <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
          {open ? "▲ collapse" : "▼ expand"}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-5" style={{ background: "#fff" }}>
          <div style={{ height: 1, background: "#f0f0f0" }} />

          {/* Contact profile */}
          {hasContactMeta && (
            <Section title="Profile">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {contactDetail?.location && (
                  <InfoRow label="Location" value={contactDetail.location} />
                )}
                {contactDetail?.seniority && (
                  <InfoRow label="Seniority" value={contactDetail.seniority} />
                )}
                {contactDetail?.segment && (
                  <InfoRow label="Segment" value={contactDetail.segment} />
                )}
                {contactDetail?.fit_score != null && (
                  <InfoRow label="Fit score" value={String(Math.round(contactDetail.fit_score))} mono />
                )}
                {contactDetail?.email_status && contactDetail.email_status !== "unknown" && (
                  <InfoRow label="Email status" value={contactDetail.email_status} />
                )}
              </div>
              {contactDetail?.notes && (
                <div
                  className="mt-3 text-xs px-3 py-2 rounded-lg"
                  style={{ background: "#fef3e7", color: "#c17d3a" }}
                >
                  {contactDetail.notes}
                </div>
              )}
            </Section>
          )}

          {/* Research signals */}
          {hasContactResearch && (
            <Section title="Research signals">
              <div className="space-y-3">
                {contactDetail?.fit_rationale && (
                  <ResearchBlock label="Why they fit" text={contactDetail.fit_rationale} color="#1d1d1f" bg="#f5f5f7" />
                )}
                {contactDetail?.recommended_angle && (
                  <ResearchBlock label="Recommended angle" text={contactDetail.recommended_angle} color="#7c5aa3" bg="#f0ebf8" />
                )}
                {contactDetail?.personalization_seed && (
                  <ResearchBlock label="Personalization seed" text={contactDetail.personalization_seed} color="#1d1d1f" bg="#f5f5f7" />
                )}
                {contactDetail?.buying_role_hypothesis && (
                  <ResearchBlock label="Buyer role hypothesis" text={contactDetail.buying_role_hypothesis} color="#374151" bg="#f0f4f8" />
                )}
              </div>
            </Section>
          )}

          {/* Company */}
          {company && (
            <Section title={company.name}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
                {company.industry && <InfoRow label="Industry" value={company.industry} />}
                {company.segment && <InfoRow label="Segment" value={company.segment} />}
                {company.employee_count != null && (
                  <InfoRow label="Headcount" value={company.employee_count.toLocaleString()} mono />
                )}
                {company.fit_score != null && (
                  <InfoRow label="Fit score" value={String(Math.round(company.fit_score))} mono />
                )}
              </div>
              {company.fit_rationale && (
                <p className="text-xs mb-3" style={{ color: "#5b6470" }}>
                  {company.fit_rationale}
                </p>
              )}
              {company.has_marketing_gap && company.marketing_gap_signal && (
                <ResearchBlock
                  label="Marketing gap"
                  text={company.marketing_gap_signal}
                  color="#7c5aa3"
                  bg="#f0ebf8"
                />
              )}
              {company.funded_recently && (
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "#fef3e7", color: "#c17d3a" }}
                  >
                    Recently funded
                  </span>
                  {company.funding_round && (
                    <span className="text-xs font-mono" style={{ color: "#c17d3a" }}>
                      {company.funding_round}
                      {company.funding_amount ? ` · ${company.funding_amount}` : ""}
                      {company.funding_date
                        ? ` · ${new Date(company.funding_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
                        : ""}
                    </span>
                  )}
                </div>
              )}
            </Section>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "#9ca3af" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function ResearchBlock({
  label,
  text,
  color,
  bg,
}: {
  label: string;
  text: string;
  color: string;
  bg: string;
}) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
        {label}
      </p>
      <div
        className="text-sm px-3 py-2 rounded-lg"
        style={{ background: bg, color }}
      >
        {text}
      </div>
    </div>
  );
}

// ── Approve view: sourced / enriched ─────────────────────────────────────────

function ApproveView({
  contact,
  contactDetail,
  company,
  detailLoading,
  onApprove,
  approveOpen,
  onApproveToggle,
  onSkipToWriter,
  skipWriterOpen,
  onSkipWriterToggle,
  onReject,
  rejectOpen,
  onRejectToggle,
  onArchive,
  archiveOpen,
  onArchiveToggle,
  isPending,
}: {
  contact: EnrichedContact;
  contactDetail: Contact | null;
  company: Company | null;
  detailLoading: boolean;
  onApprove: (note: string, depth: ResearchDepth) => void;
  approveOpen: boolean;
  onApproveToggle: (open: boolean) => void;
  onSkipToWriter: (note: string) => void;
  skipWriterOpen: boolean;
  onSkipWriterToggle: (open: boolean) => void;
  onReject: (reason: string, note: string) => void;
  rejectOpen: boolean;
  onRejectToggle: (open: boolean) => void;
  onArchive: (note: string) => void;
  archiveOpen: boolean;
  onArchiveToggle: (open: boolean) => void;
  isPending: boolean;
}) {
  return (
    <>
      <LocalContext contactDetail={contactDetail} company={company} loading={detailLoading} />

      {(contactDetail?.fit_rationale || contactDetail?.recommended_angle) && (
        <Card title="Research signal">
          {contactDetail.fit_rationale && (
            <p className="text-sm mb-2" style={{ color: "#1d1d1f" }}>
              {contactDetail.fit_rationale}
            </p>
          )}
          {contactDetail.recommended_angle && (
            <div
              className="text-sm px-3 py-2 rounded-lg"
              style={{ background: "#f0ebf8", color: "#7c5aa3" }}
            >
              {contactDetail.recommended_angle}
            </div>
          )}
        </Card>
      )}

      {company && (
        <Card title="Company">
          <CompanyBlock company={company} />
        </Card>
      )}

      <Card title="Quick action">
        <div className="flex gap-2 flex-wrap">
          <Btn
            label={isPending ? "Queuing…" : "[a] Approve — Queue for enrichment"}
            color="#c43322"
            onClick={() => onApproveToggle(!approveOpen)}
            disabled={isPending}
          />
          <Btn
            label="[w] Skip to writer"
            color="#c17d3a"
            onClick={() => onSkipWriterToggle(!skipWriterOpen)}
            disabled={isPending}
          />
          <Btn
            label="[r] Reject"
            color="#7c5aa3"
            onClick={() => onRejectToggle(!rejectOpen)}
            disabled={isPending}
          />
          <Btn
            label="[x] Archive"
            color="#9ca3af"
            onClick={() => onArchiveToggle(!archiveOpen)}
            disabled={isPending}
          />
        </div>
        {approveOpen && (
          <ApproveDrawer
            key={contact.contact_id}
            onSave={onApprove}
            onCancel={() => onApproveToggle(false)}
            isPending={isPending}
          />
        )}
        {skipWriterOpen && (
          <SkipWriterDrawer
            key={contact.contact_id}
            onSave={onSkipToWriter}
            onCancel={() => onSkipWriterToggle(false)}
            isPending={isPending}
          />
        )}
        {rejectOpen && (
          <RejectDrawer
            key={contact.contact_id}
            onSave={onReject}
            onCancel={() => onRejectToggle(false)}
            isPending={isPending}
          />
        )}
        {archiveOpen && (
          <ArchiveNoteDrawer
            key={contact.contact_id}
            onSave={onArchive}
            onCancel={() => onArchiveToggle(false)}
            isPending={isPending}
          />
        )}
        <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
          Approve queues an enrichment job (add direction + depth). Skip to
          writer is for people you already know — no research. Reject records
          why, so the scorer learns. Archive sets the contact aside.
        </p>
      </Card>
    </>
  );
}

// ── Verdict drawers (single keystroke → inline field → Enter saves) ──────────

function ApproveDrawer({
  onSave,
  onCancel,
  isPending,
}: {
  onSave: (note: string, depth: ResearchDepth) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [note, setNote] = useState("");
  const [depth, setDepth] = useState<ResearchDepth>("light");

  return (
    <div
      className="mt-3 p-4 rounded-xl border"
      style={{ background: "#fdf7f6", borderColor: "#f0d8d3" }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: "#c43322" }}>
        Direction for the research (optional) — the enricher and writer read it.
      </p>
      <input
        autoFocus
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSave(note, depth);
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            setDepth((d) => (d === "light" ? "medium" : "light"));
          }
        }}
        placeholder="e.g. focus on their podcast appearances…"
        className="w-full text-xs p-2 rounded-lg border focus:outline-none mb-3"
        style={{ borderColor: "#f0d8d3", background: "#fff", color: "#1d1d1f" }}
      />
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs" style={{ color: "#9ca3af" }}>
          Research depth
        </span>
        {(["light", "medium"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDepth(d)}
            className="text-xs px-3 py-1.5 rounded-full font-medium"
            style={
              depth === d
                ? { background: "#c43322", color: "#fff" }
                : { background: "#f8e9e6", color: "#c43322" }
            }
          >
            {d === "light" ? "Light (default)" : "Medium"}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Btn
          label={isPending ? "Queuing…" : "Approve"}
          color="#c43322"
          onClick={() => onSave(note, depth)}
          disabled={isPending}
        />
        <Btn label="Cancel" color="#9ca3af" onClick={onCancel} disabled={isPending} />
        <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
          Enter save · arrows toggle depth · Esc cancel
        </span>
      </div>
    </div>
  );
}

function SkipWriterDrawer({
  onSave,
  onCancel,
  isPending,
}: {
  onSave: (note: string) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [note, setNote] = useState("");
  const canSave = note.trim().length > 0;

  return (
    <div
      className="mt-3 p-4 rounded-xl border"
      style={{ background: "#fef9f3", borderColor: "#ecd9c2" }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: "#c17d3a" }}>
        How do you know them? (required) — becomes the personalization seed;
        OSINT is skipped.
      </p>
      <input
        autoFocus
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (canSave) onSave(note);
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          }
        }}
        placeholder="e.g. met at ProVisors Irvine; she asked about AI ops…"
        className="w-full text-xs p-2 rounded-lg border focus:outline-none mb-3"
        style={{ borderColor: "#ecd9c2", background: "#fff", color: "#1d1d1f" }}
      />
      <div className="flex items-center gap-2">
        <Btn
          label={isPending ? "Queuing…" : "Send to writer"}
          color="#c17d3a"
          onClick={() => onSave(note)}
          disabled={isPending || !canSave}
        />
        <Btn label="Cancel" color="#9ca3af" onClick={onCancel} disabled={isPending} />
        <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
          Enter save · Esc cancel
        </span>
      </div>
    </div>
  );
}

function ArchiveNoteDrawer({
  onSave,
  onCancel,
  isPending,
}: {
  onSave: (note: string) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [note, setNote] = useState("");

  return (
    <div
      className="mt-3 p-4 rounded-xl border"
      style={{ background: "#fafafa", borderColor: "#e5e7eb" }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: "#5b6470" }}>
        Archive — optional note (anything worth remembering).
      </p>
      <input
        autoFocus
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSave(note);
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          }
        }}
        placeholder="Optional…"
        className="w-full text-xs p-2 rounded-lg border focus:outline-none mb-3"
        style={{ borderColor: "#e5e7eb", background: "#fff", color: "#1d1d1f" }}
      />
      <div className="flex items-center gap-2">
        <Btn
          label={isPending ? "Saving…" : "Archive"}
          color="#5b6470"
          onClick={() => onSave(note)}
          disabled={isPending}
        />
        <Btn label="Cancel" color="#9ca3af" onClick={onCancel} disabled={isPending} />
        <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
          Enter save · Esc cancel
        </span>
      </div>
    </div>
  );
}

function InboxArchiveDrawer({
  onSave,
  onCancel,
  isPending,
}: {
  onSave: (reason: string, note: string) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [reason, setReason] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const save = useCallback(() => {
    if (reason) onSave(reason, note);
  }, [reason, note, onSave]);

  // Keyboard: 1-5 picks a reason (then focus jumps to the note), Enter saves.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "TEXTAREA" || target.tagName === "INPUT";
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save();
        return;
      }
      if (typing) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= INBOX_ARCHIVE_REASONS.length) {
        e.preventDefault();
        setReason(INBOX_ARCHIVE_REASONS[n - 1].value);
        noteRef.current?.focus();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        save();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  return (
    <div
      className="mt-3 p-4 rounded-xl border"
      style={{ background: "#fafafa", borderColor: "#e5e7eb" }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: "#5b6470" }}>
        Why archive? Pick a reason — the verdict is recorded and the sequence stops.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {INBOX_ARCHIVE_REASONS.map((r, i) => (
          <button
            key={r.value}
            onClick={() => {
              setReason(r.value);
              noteRef.current?.focus();
            }}
            className="text-xs px-3 py-1.5 rounded-full font-medium"
            style={
              reason === r.value
                ? { background: "#5b6470", color: "#fff" }
                : { background: "#eceef1", color: "#5b6470" }
            }
          >
            <span className="font-mono">{i + 1}</span> {r.label}
          </button>
        ))}
      </div>
      <textarea
        ref={noteRef}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            save();
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          }
        }}
        placeholder="Optional note — what they said, when to retry…"
        rows={2}
        className="w-full text-xs p-2 rounded-lg border resize-none focus:outline-none mb-3"
        style={{ borderColor: "#e5e7eb", background: "#fff", color: "#1d1d1f" }}
      />
      <div className="flex items-center gap-2">
        <Btn
          label={isPending ? "Saving…" : "Archive contact"}
          color="#5b6470"
          onClick={save}
          disabled={isPending || !reason}
        />
        <Btn label="Cancel" color="#9ca3af" onClick={onCancel} disabled={isPending} />
        <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
          1-5 pick · Enter save · Esc cancel
        </span>
      </div>
    </div>
  );
}

// ── Review view: sequenced drafts ────────────────────────────────────────────

function ReviewView({
  contact,
  contactDetail,
  company,
  draftSubject,
  draftBody,
  onDraftSubjectChange,
  onDraftBodyChange,
  generatedDraft,
  onDraftGenerated,
  bodyRef,
  onPushDraft,
  onSkip,
  isPending,
}: {
  contact: EnrichedContact;
  contactDetail: Contact | null;
  company: Company | null;
  draftSubject: string;
  draftBody: string;
  onDraftSubjectChange: (v: string) => void;
  onDraftBodyChange: (v: string) => void;
  generatedDraft: { subject: string; body: string; brief: string | null } | null;
  onDraftGenerated: (subject: string, body: string, brief: string | null) => void;
  bodyRef: React.RefObject<HTMLTextAreaElement | null>;
  onPushDraft: () => void;
  onSkip: () => void;
  isPending: boolean;
}) {
  const seq = contact.sequence;
  const [activeTab, setActiveTab] = useState<"email" | "linkedin">("email");
  const [writing, setWriting] = useState(false);
  const [writeError, setWriteError] = useState<string | null>(null);
  // Operator brief — per-contact (ReviewView is keyed by contact id, so this
  // resets on contact switch). Kept after a generate so the operator can edit
  // it and regenerate.
  const [brief, setBrief] = useState("");

  const net = detectNetwork(contact.company, contact.title);

  async function handleWrite() {
    setWriting(true);
    setWriteError(null);
    const result = await generateEmailCopy({
      contactId: contact.contact_id,
      contactName: contact.full_name,
      contactFirstName: contactDetail?.first_name ?? null,
      contactTitle: contact.title,
      contactCompany: contact.company,
      network: net?.label ?? null,
      personalizationSeed: contactDetail?.personalization_seed ?? null,
      fitRationale: contactDetail?.fit_rationale ?? null,
      recommendedAngle: contactDetail?.recommended_angle ?? null,
      buyingRoleHypothesis: contactDetail?.buying_role_hypothesis ?? null,
      segment: contact.segment,
      companyIndustry: company?.industry ?? null,
      companySize: company?.employee_count ?? null,
      companyFitRationale: company?.fit_rationale ?? null,
      marketingGapSignal: company?.marketing_gap_signal ?? null,
      operatorBrief: brief.trim() || null,
    });
    if (result.error) {
      setWriteError(result.error);
    } else {
      onDraftSubjectChange(result.subject);
      onDraftBodyChange(result.body);
      // Snapshot the as-generated text (+ the brief that shaped it): first
      // impressions attach to it, and the push flow diffs the human's edits
      // against it.
      onDraftGenerated(result.subject, result.body, brief.trim() || null);
    }
    setWriting(false);
  }

  const hasExistingDraft = !!(seq?.email_body);
  const emailTabHint = writing ? "Writing…" : "[e] focus · Cmd+Enter push";

  return (
    <>
      <LocalContext contactDetail={contactDetail} company={company} loading={false} />

      {/* Thread digest — drafting in context when email history exists */}
      <ThreadDigest contactId={contact.contact_id} contactEmail={contact.email} />

      {/* Email tab always shown; LinkedIn tab only if seq exists */}
      <>
        <div className="flex gap-1 mb-1">
          <TabBtn active={activeTab === "email"} onClick={() => setActiveTab("email")}>
            Email draft
          </TabBtn>
          {seq && (seq.linkedin_connect_msg || seq.linkedin_day10_msg) && (
            <TabBtn active={activeTab === "linkedin"} onClick={() => setActiveTab("linkedin")}>
              LinkedIn msgs
            </TabBtn>
          )}
        </div>

        {activeTab === "email" && (
          <Card title="Email copy" hint={emailTabHint}>
            {/* Operator brief — direction for THIS draft, read at generate time */}
            <BriefInput value={brief} onChange={setBrief} disabled={writing} />

            {/* Write button row */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={handleWrite}
                disabled={writing || isPending}
                className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-semibold disabled:opacity-50 transition-all"
                style={
                  writing
                    ? { background: "#f0ebf8", color: "#7c5aa3" }
                    : { background: "#7c5aa3", color: "#fff" }
                }
              >
                {writing ? (
                  <>
                    <span className="inline-block w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Writing…
                  </>
                ) : (
                  <>✦ {hasExistingDraft ? "Regenerate" : "Write"}</>
                )}
              </button>
              {hasExistingDraft && !writing && (
                <span className="text-xs" style={{ color: "#9ca3af" }}>
                  Agent draft loaded · edit or regenerate
                </span>
              )}
              {!hasExistingDraft && !writing && (
                <span className="text-xs" style={{ color: "#9ca3af" }}>
                  Generate from research + your voice
                </span>
              )}
            </div>

            {writeError && (
              <p className="text-xs mb-2" style={{ color: "#c43322" }}>
                {writeError}
              </p>
            )}

            <div className="space-y-2">
              <input
                type="text"
                value={draftSubject}
                onChange={(e) => onDraftSubjectChange(e.target.value)}
                placeholder="Subject line"
                className="w-full text-sm px-3 py-2 rounded-lg border focus:outline-none"
                style={{ borderColor: "#e5e7eb", color: "#1d1d1f", background: "#fff" }}
              />
              <textarea
                ref={bodyRef}
                value={draftBody}
                onChange={(e) => onDraftBodyChange(e.target.value)}
                placeholder={writing ? "Generating…" : "Email body — click Write or paste your draft…"}
                rows={13}
                className="w-full text-sm px-3 py-2 rounded-lg border resize-none focus:outline-none font-mono"
                style={{
                  borderColor: "#e5e7eb",
                  color: "#1d1d1f",
                  background: writing ? "#fafafa" : "#fff",
                }}
                readOnly={writing}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Btn
                label={isPending ? "Pushing…" : "[a] Push to Gmail draft"}
                color="#c43322"
                onClick={onPushDraft}
                disabled={isPending || !draftBody || writing}
              />
              <Btn label="[x] Skip" color="#9ca3af" onClick={onSkip} disabled={isPending || writing} />
            </div>
            {contact.email && (
              <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
                To: {contact.email}
              </p>
            )}

            {/* First impression on the generated draft → voice training */}
            {generatedDraft && !writing && (
              <FirstImpression
                contact={contact}
                generatedDraft={generatedDraft}
                sequenceId={seq?.id ?? null}
              />
            )}
          </Card>
        )}

        {activeTab === "linkedin" && seq && (
          <Card title="LinkedIn messages" hint="Read-only preview">
            {seq.linkedin_connect_msg && (
              <div className="mb-3">
                <p className="text-xs font-semibold mb-1" style={{ color: "#5b6470" }}>
                  Connect request
                </p>
                <div
                  className="text-sm p-3 rounded-lg"
                  style={{ background: "#fff", color: "#1d1d1f", whiteSpace: "pre-wrap" }}
                >
                  {seq.linkedin_connect_msg}
                </div>
              </div>
            )}
            {seq.linkedin_day10_msg && (
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#5b6470" }}>
                  Day-10 follow-up
                </p>
                <div
                  className="text-sm p-3 rounded-lg"
                  style={{ background: "#fff", color: "#1d1d1f", whiteSpace: "pre-wrap" }}
                >
                  {seq.linkedin_day10_msg}
                </div>
              </div>
            )}
            {!seq.linkedin_connect_msg && !seq.linkedin_day10_msg && (
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                No LinkedIn messages drafted yet.
              </p>
            )}
          </Card>
        )}
      </>

      {/* Research dossier — always shown in Review */}
      <ResearchDossier contactDetail={contactDetail} company={company} />
    </>
  );
}

// ── Operator brief input (shared by both composers) ──────────────────────────
// A compact optional field above the Write control: in-the-moment direction
// for ONE draft. State lives in the keyed parent view, so it clears on
// contact switch and survives a generate (edit + regenerate is the loop).

function BriefInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mb-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="optional brief — direction for this draft (e.g. 'mention the ACG lunch, keep it to 3 sentences')"
        className="w-full text-xs px-3 py-2 rounded-lg border focus:outline-none disabled:opacity-50"
        style={{
          borderColor: value.trim() ? "#e0d5f0" : "#e5e7eb",
          background: value.trim() ? "#faf7fd" : "#fff",
          color: "#1d1d1f",
        }}
      />
    </div>
  );
}

// ── First impression on a generated draft (voice training) ───────────────────
// Saves a draft_edits row carrying the as-generated text + the gut reaction,
// even if the human never edits the draft. The voice spec learns from both.

function FirstImpression({
  contact,
  generatedDraft,
  sequenceId,
}: {
  contact: EnrichedContact;
  generatedDraft: { subject: string; body: string; brief: string | null };
  sequenceId: string | null;
}) {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function submit() {
    if (!text.trim() || saving) return;
    setSaving(true);
    await recordDraftEdit({
      clientId: contact.client_id,
      contactId: contact.contact_id,
      sequenceId,
      channel: "email",
      draftSubject: generatedDraft.subject,
      draftBody: generatedDraft.body,
      // Brief-prefixed so voice learning can tell briefed direction from
      // spontaneous reactions.
      feedback: generatedDraft.brief
        ? `[brief: ${generatedDraft.brief}] ${text}`
        : text,
    });
    setSaving(false);
    setSaved(true);
    setText("");
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div
      className="mt-3 p-3 rounded-lg border"
      style={{ background: "#faf7fd", borderColor: "#e0d5f0" }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: "#7c5aa3" }}>
        First impression — the voice learns from it
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="e.g. don't propose coffee · opener feels AI-ish…"
          className="flex-1 text-xs p-2 rounded-lg border focus:outline-none"
          style={{ borderColor: "#e0d5f0", background: "#fff", color: "#1d1d1f" }}
        />
        <Btn
          label={saving ? "Saving…" : saved ? "Recorded ✓" : "Submit"}
          color={saved ? "#16a34a" : "#7c5aa3"}
          onClick={submit}
          disabled={saving || !text.trim()}
        />
      </div>
    </div>
  );
}

// ── Shared subcomponents ──────────────────────────────────────────────────────

function LocalContext({
  contactDetail,
  company,
  loading,
}: {
  contactDetail: Contact | null;
  company: Company | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="text-xs" style={{ color: "#9ca3af" }}>
        Loading…
      </div>
    );
  }

  const hasSignal =
    contactDetail?.personalization_seed ||
    contactDetail?.buying_role_hypothesis ||
    company?.marketing_gap_signal;

  return (
    <Card title="Local context">
      <div className="space-y-2">
        {contactDetail?.notes && (
          <div
            className="text-sm px-3 py-2 rounded-lg"
            style={{ background: "#fef3e7", color: "#c17d3a" }}
          >
            {contactDetail.notes}
          </div>
        )}
        {contactDetail?.personalization_seed && (
          <InfoRow label="Seed" value={contactDetail.personalization_seed} />
        )}
        {contactDetail?.buying_role_hypothesis && (
          <InfoRow label="Buyer role" value={contactDetail.buying_role_hypothesis} />
        )}
        {contactDetail?.segment && (
          <InfoRow label="Segment" value={contactDetail.segment} />
        )}
        {contactDetail?.fit_score != null && (
          <InfoRow label="Fit score" value={String(Math.round(contactDetail.fit_score))} mono />
        )}
        {company?.marketing_gap_signal && (
          <div
            className="text-xs px-3 py-2 rounded-lg"
            style={{ background: "#f0ebf8", color: "#7c5aa3" }}
          >
            {company.marketing_gap_signal}
          </div>
        )}
        {!hasSignal && !contactDetail?.notes && (
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            No personalization context. Press [i] to inject notes.
          </p>
        )}
      </div>
    </Card>
  );
}

function CompanyBlock({ company }: { company: Company }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm" style={{ color: "#1d1d1f" }}>
          {company.name}
        </span>
        {company.domain && (
          <a
            href={`https://${company.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ color: "#7c5aa3" }}
          >
            {company.domain} ↗
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {company.industry && <InfoRow label="Industry" value={company.industry} />}
        {company.segment && <InfoRow label="Segment" value={company.segment} />}
        {company.employee_count != null && (
          <InfoRow label="Headcount" value={company.employee_count.toString()} mono />
        )}
        {company.fit_score != null && (
          <InfoRow label="Fit" value={Math.round(company.fit_score).toString()} mono />
        )}
      </div>
      {company.fit_rationale && (
        <p className="text-xs mt-1" style={{ color: "#5b6470" }}>
          {company.fit_rationale}
        </p>
      )}
      {company.has_marketing_gap && company.marketing_gap_signal && (
        <div
          className="text-xs px-3 py-2 rounded-lg mt-2"
          style={{ background: "#f0ebf8", color: "#7c5aa3" }}
        >
          {company.marketing_gap_signal}
        </div>
      )}
      {company.funded_recently && company.funding_round && (
        <p className="text-xs" style={{ color: "#c17d3a" }}>
          {company.funding_round}
          {company.funding_amount ? ` · ${company.funding_amount}` : ""}
          {company.funding_date ? ` · ${fmtDate(company.funding_date)}` : ""}
        </p>
      )}
    </div>
  );
}

function RejectDrawer({
  onSave,
  onCancel,
  isPending,
}: {
  onSave: (reason: string, note: string) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [reason, setReason] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const save = useCallback(() => {
    if (reason) onSave(reason, note);
  }, [reason, note, onSave]);

  // Keyboard: 1-7 picks a reason and jumps focus to the "why" field, Enter
  // saves (also from inside the field). Escape closes via the field handler
  // or the triage-level handler.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "TEXTAREA" || target.tagName === "INPUT";
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save();
        return;
      }
      if (typing) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= REJECT_REASONS.length) {
        e.preventDefault();
        setReason(REJECT_REASONS[n - 1].value);
        noteRef.current?.focus();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        save();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  return (
    <div
      className="mt-3 p-4 rounded-xl border"
      style={{ background: "#fdf7f6", borderColor: "#f0d8d3" }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: "#c43322" }}>
        Why reject? Pick a reason — the scorer learns from it.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {REJECT_REASONS.map((r, i) => (
          <button
            key={r.value}
            onClick={() => {
              setReason(r.value);
              noteRef.current?.focus();
            }}
            className="text-xs px-3 py-1.5 rounded-full font-medium"
            style={
              reason === r.value
                ? { background: "#c43322", color: "#fff" }
                : { background: "#f8e9e6", color: "#c43322" }
            }
          >
            <span className="font-mono">{i + 1}</span> {r.label}
          </button>
        ))}
      </div>
      <textarea
        ref={noteRef}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            save();
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          }
        }}
        placeholder="Why? Type it fast — specifics teach the scorer most…"
        rows={2}
        className="w-full text-sm p-2.5 rounded-lg border resize-none focus:outline-none mb-3"
        style={{ borderColor: "#f0d8d3", background: "#fff", color: "#1d1d1f" }}
      />
      <div className="flex items-center gap-2">
        <Btn
          label={isPending ? "Saving…" : "Reject contact"}
          color="#c43322"
          onClick={save}
          disabled={isPending || !reason}
        />
        <Btn label="Cancel" color="#9ca3af" onClick={onCancel} disabled={isPending} />
        <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
          1-7 pick · Enter save · Esc cancel
        </span>
      </div>
    </div>
  );
}

function InjectDrawer({
  onSave,
  onClose,
}: {
  onSave: (tags: string[], freetext: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [freetext, setFreetext] = useState("");

  function toggle(tag: string) {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div
      className="mt-4 p-4 rounded-xl border"
      style={{ background: "#faf7fd", borderColor: "#e0d5f0" }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: "#7c5aa3" }}>
        Inject memory context
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {QUICK_TAGS.map(({ tag, label }) => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className="text-xs px-3 py-1.5 rounded-full font-medium"
            style={
              selected.includes(tag)
                ? { background: "#7c5aa3", color: "#fff" }
                : { background: "#f0ebf8", color: "#7c5aa3" }
            }
          >
            {label}
          </button>
        ))}
      </div>
      <textarea
        value={freetext}
        onChange={(e) => setFreetext(e.target.value)}
        placeholder="Free-form note (optional)…"
        rows={2}
        className="w-full text-xs p-2 rounded-lg border resize-none focus:outline-none mb-3"
        style={{ borderColor: "#e0d5f0", background: "#fff" }}
      />
      <div className="flex gap-2">
        <Btn label="Save" color="#7c5aa3" onClick={() => onSave(selected, freetext)} />
        <Btn label="Cancel" color="#9ca3af" onClick={onClose} />
      </div>
    </div>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#fff", border: "1px solid #f0f0f0" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9ca3af" }}>
          {title}
        </h3>
        {hint && (
          <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-xs shrink-0" style={{ color: "#9ca3af" }}>
        {label}
      </span>
      <span
        className={`text-xs ${mono ? "font-mono" : ""}`}
        style={{ color: "#1d1d1f" }}
      >
        {value}
      </span>
    </div>
  );
}

function Btn({
  label,
  color,
  onClick,
  disabled,
}: {
  label: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-xs px-4 py-2 rounded-full font-semibold disabled:opacity-50"
      style={{ background: color, color: "#fff" }}
    >
      {label}
    </button>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-lg font-medium"
      style={
        active
          ? { background: "#1d1d1f", color: "#fff" }
          : { background: "#f0f0f0", color: "#5b6470" }
      }
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    sent: { bg: "#dcfce7", text: "#16a34a" },
    draft: { bg: "#fef9c3", text: "#ca8a04" },
    queued: { bg: "#e0f2fe", text: "#0369a1" },
    replied: { bg: "#f0ebf8", text: "#7c5aa3" },
  };
  const s = map[status] ?? { bg: "#f5f5f7", text: "#9ca3af" };
  return (
    <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
