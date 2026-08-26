"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";
import type {
  Company,
  Contact,
  Decision,
  PipelineContact,
  Sequence,
  Touch,
} from "@/lib/types";

function sb() {
  return supabaseAdmin();
}

// ── Reads (all data access goes through the server; RLS is admin-locked) ────

export async function fetchPipeline(): Promise<{
  contacts: PipelineContact[];
  sequences: Sequence[];
}> {
  const db = sb();
  const [pipelineRes, seqRes] = await Promise.all([
    db
      .from("v_pipeline")
      .select("*")
      .order("priority", { ascending: true })
      .limit(300),
    db
      .from("sequences")
      .select(
        "id, contact_id, status, subject_a, subject_b, email_body, linkedin_connect_msg, linkedin_day10_msg, updated_at, started_at, play"
      )
      .limit(300),
  ]);
  if (pipelineRes.error) throw new Error(pipelineRes.error.message);
  if (seqRes.error) throw new Error(seqRes.error.message);
  return {
    contacts: (pipelineRes.data ?? []) as PipelineContact[],
    sequences: (seqRes.data ?? []) as Sequence[],
  };
}

export async function fetchContactDetail(contactId: string): Promise<Contact | null> {
  const { data, error } = await sb()
    .from("contacts")
    .select("*")
    .eq("id", contactId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as Contact | null;
}

export async function fetchCompany(companyId: string): Promise<Company | null> {
  const { data, error } = await sb()
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as Company | null;
}

export async function fetchTouches(sequenceId: string): Promise<Touch[]> {
  const { data, error } = await sb()
    .from("touches")
    .select("*")
    .eq("sequence_id", sequenceId)
    .order("touch_num", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Touch[];
}

export async function fetchSequenceForContact(contactId: string): Promise<Sequence | null> {
  const { data, error } = await sb()
    .from("sequences")
    .select("*")
    .eq("contact_id", contactId)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as Sequence | null;
}

// ── Sort-phase decision capture (the learning loop) ─────────────────────────

async function recordDecision(
  contactId: string,
  clientId: string | null,
  decision: Decision,
  reason: string | null,
  notes: string | null
) {
  const { error } = await sb().from("decisions").insert({
    contact_id: contactId,
    client_id: clientId,
    decision,
    reason,
    notes,
  });
  if (error) throw new Error(error.message);
}

export async function skipContact(contactId: string) {
  const { error } = await sb()
    .from("contacts")
    .update({ archived: true })
    .eq("id", contactId);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

// Append a sort-phase note onto contacts.notes (the writer reads it later).
async function appendContactNote(contactId: string, note: string) {
  const db = sb();
  const { data, error } = await db
    .from("contacts")
    .select("notes")
    .eq("id", contactId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const merged = [(data as { notes: string | null } | null)?.notes, note]
    .filter(Boolean)
    .join(" | ");
  const { error: updErr } = await db
    .from("contacts")
    .update({ notes: merged, updated_at: new Date().toISOString() })
    .eq("id", contactId);
  if (updErr) throw new Error(updErr.message);
}

export async function approveContact(
  contactId: string,
  clientId: string | null,
  note?: string | null,
  depth: "light" | "medium" = "light"
) {
  const direction = note?.trim() || null;
  const { error } = await sb()
    .from("agent_jobs")
    .insert({
      contact_id: contactId,
      client_id: clientId,
      skill: "enrich-contact",
      kind: "action",
      status: "requested",
      params: { depth, direction },
    });
  if (error) throw new Error(error.message);
  if (direction) await appendContactNote(contactId, direction);
  await recordDecision(contactId, clientId, "approved", null, direction);
  revalidatePath("/");
}

// Skip-to-writer verdict: the human already knows this contact — no OSINT.
// The required note ("how I know them") becomes the personalization seed.
export async function skipToWriter(
  contactId: string,
  clientId: string | null,
  note: string
) {
  const seed = note.trim();
  if (!seed) throw new Error("A note is required — how do you know them?");
  const db = sb();
  const { error } = await db
    .from("contacts")
    .update({
      personalization_seed: seed,
      stage: "enriched",
      updated_at: new Date().toISOString(),
    })
    .eq("id", contactId);
  if (error) throw new Error(error.message);
  await appendContactNote(contactId, seed);
  await recordDecision(contactId, clientId, "approved", "known", seed);
  const { error: jobErr } = await db.from("agent_jobs").insert({
    contact_id: contactId,
    client_id: clientId,
    skill: "sequence-writer",
    kind: "draft",
    status: "requested",
    params: { skip_research: true },
  });
  if (jobErr) throw new Error(jobErr.message);
  revalidatePath("/");
}

// Inbox archive: verdict + reason recorded, active sequence stopped, contact
// disappears from every queue.
export async function archiveInboxContact(
  contactId: string,
  clientId: string | null,
  reason: string,
  note: string
) {
  if (!reason) throw new Error("An archive reason is required.");
  const db = sb();
  const { error } = await db
    .from("contacts")
    .update({ archived: true })
    .eq("id", contactId);
  if (error) throw new Error(error.message);
  const { error: seqErr } = await db
    .from("sequences")
    .update({ status: "stopped", updated_at: new Date().toISOString() })
    .eq("contact_id", contactId)
    .in("status", ["queued", "active", "paused", "draft_pushed"]);
  if (seqErr) throw new Error(seqErr.message);
  await recordDecision(contactId, clientId, "archived", reason, note || null);
  revalidatePath("/");
}

export async function rejectContact(
  contactId: string,
  clientId: string | null,
  reason: string,
  note: string
) {
  if (!reason) throw new Error("A reject reason is required.");
  const { error } = await sb()
    .from("contacts")
    .update({ archived: true })
    .eq("id", contactId);
  if (error) throw new Error(error.message);
  await recordDecision(contactId, clientId, "rejected", reason, note || null);
  revalidatePath("/");
}

export async function archiveContact(
  contactId: string,
  clientId: string | null,
  reason?: string | null,
  note?: string | null
) {
  const { error } = await sb()
    .from("contacts")
    .update({ archived: true })
    .eq("id", contactId);
  if (error) throw new Error(error.message);
  await recordDecision(contactId, clientId, "archived", reason ?? null, note ?? null);
  revalidatePath("/");
}

export async function updateSequence(
  sequenceId: string,
  fields: {
    subject_a?: string;
    subject_b?: string;
    email_body?: string;
    linkedin_connect_msg?: string;
    linkedin_day10_msg?: string;
  }
) {
  const { error } = await sb()
    .from("sequences")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", sequenceId);
  if (error) throw new Error(error.message);
}

export async function markTouchSent(touchId: string) {
  const { error } = await sb()
    .from("touches")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", touchId);
  if (error) throw new Error(error.message);
}

export async function logReply(touchId: string, sentiment: string, note: string) {
  const { error } = await sb()
    .from("touches")
    .update({
      reply_at: new Date().toISOString(),
      sentiment,
      notes: note || null,
    })
    .eq("id", touchId);
  if (error) throw new Error(error.message);
}

export async function updateContactNotes(contactId: string, notes: string) {
  const { error } = await sb()
    .from("contacts")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", contactId);
  if (error) throw new Error(error.message);
}

export async function updateSequenceStatus(sequenceId: string, status: string) {
  const { error } = await sb()
    .from("sequences")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", sequenceId);
  if (error) throw new Error(error.message);
}

// ── Inbox draft-save → queued touch (drops the contact out of Inbox) ─────────
// Called AFTER a Gmail draft saves successfully. Creates (or updates) the
// touches row with status 'queued' + scheduled_at = now(); v_pipeline (007)
// treats a queued touch newer than the last reply/send as "waiting on human
// send", so the contact leaves the Inbox until something new happens.
export async function queueTouchDraft(params: {
  contactId: string;
  sequenceId: string | null;
  channel: string;
  subject?: string;
  bodyMd?: string;
}): Promise<{ touchId: string | null; error?: string }> {
  const db = sb();
  const now = new Date().toISOString();

  // Resolve a sequence to hang the touch on; create a minimal one if the
  // contact somehow has none (e.g. a reply logged outside a sequence).
  let sequenceId = params.sequenceId;
  if (!sequenceId) {
    const { data: seq } = await db
      .from("sequences")
      .select("id")
      .eq("contact_id", params.contactId)
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    sequenceId = (seq as { id: string } | null)?.id ?? null;
  }
  if (!sequenceId) {
    const { data: created, error: seqErr } = await db
      .from("sequences")
      .insert({
        contact_id: params.contactId,
        play: "cold-outbound",
        status: "active",
        started_at: now,
        updated_at: now,
      })
      .select("id")
      .single();
    if (seqErr) return { touchId: null, error: seqErr.message };
    sequenceId = (created as { id: string }).id;
  }

  // The server is authoritative for the touch number: next = last SENT + 1.
  // (The client's touch log may not have loaded yet when the human pushes.)
  const { data: lastSent } = await db
    .from("touches")
    .select("touch_num")
    .eq("sequence_id", sequenceId)
    .not("sent_at", "is", null)
    .order("touch_num", { ascending: false })
    .limit(1)
    .maybeSingle();
  const touchNum = ((lastSent as { touch_num: number } | null)?.touch_num ?? 0) + 1;

  // Update an existing not-yet-sent row for this touch number, else insert.
  const { data: existing } = await db
    .from("touches")
    .select("id")
    .eq("sequence_id", sequenceId)
    .eq("touch_num", touchNum)
    .in("status", ["pending", "draft", "queued"])
    .limit(1)
    .maybeSingle();

  const fields = {
    status: "queued",
    scheduled_at: now,
    channel: params.channel,
    subject: params.subject ?? null,
    body_md: params.bodyMd ?? null,
  };

  if (existing) {
    const { error } = await db
      .from("touches")
      .update(fields)
      .eq("id", (existing as { id: string }).id);
    if (error) return { touchId: null, error: error.message };
    revalidatePath("/");
    return { touchId: (existing as { id: string }).id };
  }

  const { data, error } = await db
    .from("touches")
    .insert({ sequence_id: sequenceId, touch_num: touchNum, thread: [], ...fields })
    .select("id")
    .single();
  if (error) return { touchId: null, error: error.message };
  revalidatePath("/");
  return { touchId: (data as { id: string } | null)?.id ?? null };
}

// ── Voice-training capture (draft_edits) ─────────────────────────────────────
// Two shapes share one row type: a first impression on a generated draft
// (feedback, no final_*), and a generated-vs-pushed diff (final_*, no feedback).
export async function recordDraftEdit(params: {
  clientId: string | null;
  contactId: string;
  sequenceId?: string | null;
  touchId?: string | null;
  channel?: string;
  draftSubject: string;
  draftBody: string;
  finalSubject?: string | null;
  finalBody?: string | null;
  feedback?: string | null;
}) {
  const { error } = await sb().from("draft_edits").insert({
    client_id: params.clientId,
    contact_id: params.contactId,
    sequence_id: params.sequenceId ?? null,
    touch_id: params.touchId ?? null,
    channel: params.channel ?? "email",
    draft_subject: params.draftSubject || null,
    draft_body: params.draftBody || null,
    final_subject: params.finalSubject ?? null,
    final_body: params.finalBody ?? null,
    feedback: params.feedback?.trim() || null,
  });
  if (error) throw new Error(error.message);
}

const SAREN_VOICE = `
You are writing outbound prospecting emails on behalf of Saren Sakurai — a fractional marketing executive and AI Operations specialist based in Irvine, CA.

VOICE + STYLE:
- Warm but direct. No fluff, no corporate speak.
- Opens by naming the specific context: how you found them (ProVisors, ACG OC, Irvine Chamber, LinkedIn, referral, etc.)
- Credibility established fast but not exhaustively: fractional marketing exec, AI since 2017 (Cylance — the first cybersecurity firm to use AI against malware, then BlackBerry), now 3+ years fractional with WethosAI, Qwiet AI, CloudKitchens.
- Finds the genuine overlap between their work and what Saren does. Not generic. One specific observation about them or their company drawn from the research.
- CTA is low-friction and specific: "quick coffee or call", "15-minute intro", never "let's connect to explore synergies".
- 3–4 short paragraphs. No bullet lists. No headers.
- Sign off: "Saren" — no title, no sig block.
- Banned words: leverage, unlock, seamless, robust, delve, tapestry, dive in, synergies, strategic partnership, game-changer, revolutionize.
- Never say "I hope this email finds you well" or any variant.
`.trim();

// Base directory for clients/ dossiers. Local dev resolves the repo layout
// (dashboard/ sits next to clients/); a deployed container sets CLIENTS_DIR
// to wherever the clients tree is mounted.
function clientsDir(): string {
  return process.env.CLIENTS_DIR || path.join(process.cwd(), "..", "clients");
}

// Per-client voice: resolve the contact's client slug, read
// ../clients/<slug>/voice.md (server-only fs) and use it verbatim as the
// voice section of the system prompt. Review feedback folded into voice.md
// ("Learned rules") flows into the very next draft. Falls back to the
// built-in SAREN_VOICE when the contact/slug/file can't be resolved.
async function voiceForContact(contactId: string | null): Promise<string> {
  if (contactId) {
    try {
      const { data } = await sb()
        .from("contacts")
        .select("client")
        .eq("id", contactId)
        .maybeSingle();
      const slug = (data as { client: string | null } | null)?.client;
      if (slug && /^[a-z0-9][a-z0-9_-]*$/i.test(slug)) {
        const file = path.join(clientsDir(), slug, "voice.md");
        const text = (await fs.readFile(file, "utf-8")).trim();
        if (text) {
          return [
            "You are writing outbound prospecting emails on behalf of the client described in the voice spec below.",
            "The spec is the contract — follow every rule in it, including the Learned rules, exactly.",
            "",
            text,
          ].join("\n");
        }
      }
    } catch {
      // voice.md missing or unreadable — fall back to the built-in voice.
    }
  }
  return SAREN_VOICE;
}

// Operator brief: an in-the-moment instruction for ONE draft, typed in the
// dashboard right before generating. It overrides default guidance but never
// the hard voice rules (banned words/phrases, sign-off, kill conditions).
function operatorBriefBlock(brief: string | null | undefined): string {
  const text = brief?.trim();
  if (!text) return "";
  return `

OPERATOR BRIEF — the operator gave this brief for THIS email. Follow it; it overrides the defaults and guidance above, EXCEPT the hard voice rules (banned words/phrases, sign-off, kill conditions), which always win over the brief:
<<<
${text}
>>>`;
}

export async function generateEmailCopy(params: {
  contactId: string | null;
  contactName: string;
  contactFirstName: string | null;
  contactTitle: string | null;
  contactCompany: string | null;
  network: string | null;
  personalizationSeed: string | null;
  fitRationale: string | null;
  recommendedAngle: string | null;
  buyingRoleHypothesis: string | null;
  segment: string | null;
  companyIndustry: string | null;
  companySize: number | null;
  companyFitRationale: string | null;
  marketingGapSignal: string | null;
  operatorBrief?: string | null;
}): Promise<{ subject: string; body: string; error?: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { subject: "", body: "", error: "ANTHROPIC_API_KEY not set." };

  const firstName = params.contactFirstName ?? params.contactName.split(" ")[0];

  const contextLines: string[] = [
    `Name: ${params.contactName}`,
    params.contactTitle ? `Title: ${params.contactTitle}` : null,
    params.contactCompany ? `Company: ${params.contactCompany}` : null,
    params.network ? `Network / source: ${params.network}` : null,
    params.segment ? `Segment: ${params.segment}` : null,
    params.companyIndustry ? `Industry: ${params.companyIndustry}` : null,
    params.companySize ? `Company size: ${params.companySize} employees` : null,
    params.personalizationSeed ? `Personalization seed: ${params.personalizationSeed}` : null,
    params.fitRationale ? `Why they're a fit: ${params.fitRationale}` : null,
    params.recommendedAngle ? `Recommended angle: ${params.recommendedAngle}` : null,
    params.buyingRoleHypothesis ? `Buyer role hypothesis: ${params.buyingRoleHypothesis}` : null,
    params.companyFitRationale ? `Company fit: ${params.companyFitRationale}` : null,
    params.marketingGapSignal ? `Marketing gap signal: ${params.marketingGapSignal}` : null,
  ].filter(Boolean) as string[];

  const userPrompt = `Write a cold outbound touch-1 email to ${firstName} using the research below.

If your voice spec includes a "Default first-touch template", use it as the structural base near-verbatim. You may personalize the opener paragraph only when the research provides a strong, specific hook (shared connection, recent talk or post, named initiative). If no compelling hook exists, use the template as-is. Never rewrite the full body from scratch.

Return ONLY valid JSON: { "subject": "...", "body": "..." }. No markdown, no explanation. Body is plain text; use \\n for line breaks between paragraphs.

RESEARCH:
${contextLines.join("\n")}${operatorBriefBlock(params.operatorBrief)}`;

  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: await voiceForContact(params.contactId),
      messages: [{ role: "user", content: userPrompt }],
    });

    const raw = msg.content[0].type === "text" ? msg.content[0].text.trim() : "";
    // Strip markdown fences if present
    const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const parsed = JSON.parse(jsonStr);

    return {
      subject: parsed.subject ?? "",
      body: parsed.body ?? "",
    };
  } catch (err) {
    return { subject: "", body: "", error: (err as Error).message };
  }
}

export async function generateNextTouch(params: {
  contactId: string | null;
  contactName: string;
  contactFirstName: string | null;
  contactTitle: string | null;
  contactCompany: string | null;
  channel: "email" | "linkedin";
  touchNum: number;
  isReply: boolean;
  previousSubject: string | null;
  previousContent: string | null;
  replyContent: string | null;
  personalizationSeed: string | null;
  fitRationale: string | null;
  recommendedAngle: string | null;
  network: string | null;
  operatorBrief?: string | null;
}): Promise<{ subject: string; body: string; error?: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { subject: "", body: "", error: "ANTHROPIC_API_KEY not set." };

  const firstName = params.contactFirstName ?? params.contactName.split(" ")[0];

  const scenario = params.isReply
    ? `${firstName} replied to my email. I need to write a genuine response continuing the conversation toward a meeting or call.`
    : params.channel === "linkedin" && params.touchNum === 2
    ? `I sent ${firstName} an initial email. Now I want to send a LinkedIn connection request as a light parallel touch — not a follow-up on the email, just a natural connection.`
    : params.channel === "linkedin"
    ? `I've been in email contact with ${firstName}. I want to send a brief LinkedIn message as touch ${params.touchNum}.`
    : `I sent ${firstName} touch ${params.touchNum - 1} with no response yet. Write a brief, natural follow-up — not a reminder, a genuine new angle or value add.`;

  const lines = [
    `Contact: ${params.contactName}${params.contactTitle ? `, ${params.contactTitle}` : ""}${params.contactCompany ? ` at ${params.contactCompany}` : ""}`,
    params.network ? `Network: ${params.network}` : null,
    params.personalizationSeed ? `Personalization context: ${params.personalizationSeed}` : null,
    params.fitRationale ? `Why they're a fit: ${params.fitRationale}` : null,
    params.recommendedAngle ? `Recommended angle: ${params.recommendedAngle}` : null,
  ].filter(Boolean).join("\n");

  const userPrompt = `Scenario: ${scenario}

${lines}

Previous message sent (touch ${params.touchNum - 1}):
Subject: ${params.previousSubject ?? "(none)"}
${params.previousContent ?? "(not available)"}
${params.replyContent ? `\nTheir reply:\n${params.replyContent}` : ""}

Write the ${params.channel === "email" ? "follow-up email" : "LinkedIn message"} for touch ${params.touchNum}.
${params.isReply ? "Acknowledge something specific from their reply. Keep it warm and move toward scheduling a call." : "Keep it under 80 words. Add a new angle — don't just check in."}
${params.channel === "linkedin" ? "LinkedIn messages must be under 300 characters total. No signature." : ""}

Return ONLY valid JSON: { "subject": "...", "body": "..." }
${params.channel === "linkedin" ? "(subject should be empty string)" : "(subject should be a natural reply subject, usually Re: <original subject>)"}${operatorBriefBlock(params.operatorBrief)}`.trim();

  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });
    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: await voiceForContact(params.contactId),
      messages: [{ role: "user", content: userPrompt }],
    });
    const raw = msg.content[0].type === "text" ? msg.content[0].text.trim() : "";
    const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const parsed = JSON.parse(jsonStr);
    return { subject: parsed.subject ?? "", body: parsed.body ?? "" };
  } catch (err) {
    return { subject: "", body: "", error: (err as Error).message };
  }
}

export async function createTouch(params: {
  sequenceId: string;
  touchNum: number;
  channel: string;
  subject?: string;
  bodyMd?: string;
  status?: string;
}): Promise<{ id: string | null; error?: string }> {
  const { data, error } = await sb()
    .from("touches")
    .insert({
      sequence_id: params.sequenceId,
      touch_num: params.touchNum,
      channel: params.channel,
      subject: params.subject ?? null,
      body_md: params.bodyMd ?? null,
      status: params.status ?? "draft",
      thread: [],
    })
    .select("id")
    .single();
  if (error) return { id: null, error: error.message };
  return { id: (data as { id: string } | null)?.id ?? null };
}

// Shared IMAP connection factory (getGmailThread, syncSentFolder).
async function imapConnect() {
  const imapUser = process.env.GMAIL_IMAP_USER;
  const imapPass = process.env.GMAIL_IMAP_PASS;
  if (!imapUser || !imapPass) return null;
  const { ImapFlow } = await import("imapflow");
  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: { user: imapUser, pass: imapPass },
    logger: false,
  });
  await client.connect();
  return client;
}

export async function getGmailThread(
  contactEmail: string
): Promise<{ messages: import("@/lib/types").GmailMessage[]; error?: string }> {
  const imapUser = process.env.GMAIL_IMAP_USER;
  const imapPass = process.env.GMAIL_IMAP_PASS;
  if (!imapUser || !imapPass) {
    return { messages: [], error: "Gmail not configured." };
  }

  try {
    const client = await imapConnect();
    if (!client) return { messages: [], error: "Gmail not configured." };
    const lock = await client.getMailboxLock("[Gmail]/All Mail");
    const messages: import("@/lib/types").GmailMessage[] = [];

    try {
      // {uid: true} is load-bearing: without it search returns SEQUENCE
      // numbers, and the uid-mode fetch below silently matches nothing.
      const uids = await client.search(
        { or: [{ from: contactEmail }, { to: contactEmail }] },
        { uid: true }
      );

      const uidList = Array.isArray(uids) ? uids : [];

      if (uidList.length > 0) {
        const recentUids = uidList.slice(-20);
        for await (const msg of client.fetch(
          recentUids,
          { envelope: true, bodyParts: ["1"], uid: true },
          { uid: true }
        )) {
          const envelope = msg.envelope ?? {};
          const rawBody = msg.bodyParts?.get("1")?.toString("utf-8") ?? "";
          const body = rawBody
            .split("\n")
            .filter(
              (l) =>
                !l.startsWith(">") &&
                !l.match(/^On .+wrote:/) &&
                !l.match(/^-{4,}/)
            )
            .join("\n")
            .replace(/\r/g, "")
            .trim()
            .slice(0, 700);

          const fromAddr = (envelope.from as Array<{ address?: string; name?: string }> | undefined)?.[0]?.address ?? "";
          const myAddresses = [imapUser, "saren#saren.ai", "saren@wethos.ai"];
          const isOutbound = myAddresses.some((a) =>
            fromAddr.toLowerCase().includes(a.toLowerCase())
          );

          messages.push({
            uid: msg.uid,
            date: (envelope.date as Date | undefined)?.toISOString() ?? "",
            from: fromAddr,
            fromName: (envelope.from as Array<{ address?: string; name?: string }> | undefined)?.[0]?.name ?? fromAddr,
            to: ((envelope.to as Array<{ address?: string }> | undefined) ?? []).map((a) => a.address ?? "").join(", "),
            subject: (envelope.subject as string | undefined) ?? "(no subject)",
            body,
            isOutbound,
          });
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
    return {
      messages: messages.sort((a, b) => a.date.localeCompare(b.date)),
    };
  } catch (err) {
    return { messages: [], error: (err as Error).message };
  }
}

export async function createGmailDraft(
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; error?: string }> {
  const imapUser = process.env.GMAIL_IMAP_USER;
  const imapPass = process.env.GMAIL_IMAP_PASS;
  const from = process.env.GMAIL_FROM ?? imapUser ?? "me";

  if (!imapUser || !imapPass) {
    return {
      success: false,
      error: "Gmail not configured. Add GMAIL_IMAP_USER and GMAIL_IMAP_PASS to .env.local.",
    };
  }

  try {
    const { ImapFlow } = await import("imapflow");

    const date = new Date().toUTCString();
    const raw =
      `Date: ${date}\r\n` +
      `From: ${from}\r\n` +
      `To: ${to}\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset=utf-8\r\n` +
      `\r\n` +
      body;

    const client = new ImapFlow({
      host: "imap.gmail.com",
      port: 993,
      secure: true,
      auth: { user: imapUser, pass: imapPass },
      logger: false,
    });

    await client.connect();
    await client.append("[Gmail]/Drafts", raw, ["\\Draft", "\\Seen"]);
    await client.logout();

    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

// ── Thread summaries (one sentence per message, cached) ──────────────────────
// Loads the IMAP thread, summarizes each message to ONE sentence via Haiku,
// and caches the result in tool_outputs (tool_id 'thread-summary', keyed by
// Gmail UID). Repeat opens hit the cache; only NEW messages call the API.

const THREAD_SUMMARY_TOOL_ID = "thread-summary";

export async function getThreadSummaries(
  contactId: string,
  contactEmail: string
): Promise<{ summaries: import("@/lib/types").ThreadSummary[]; error?: string }> {
  type ThreadSummary = import("@/lib/types").ThreadSummary;

  const { messages, error } = await getGmailThread(contactEmail);
  if (error) return { summaries: [], error };
  if (messages.length === 0) return { summaries: [] };

  const db = sb();
  const { data: cacheRow } = await db
    .from("tool_outputs")
    .select("id, output")
    .eq("tool_id", THREAD_SUMMARY_TOOL_ID)
    .eq("contact_id", contactId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const cached = new Map<number, ThreadSummary>();
  const cachedList =
    ((cacheRow as { output: { summaries?: ThreadSummary[] } | null } | null)
      ?.output?.summaries ?? []) as ThreadSummary[];
  for (const s of cachedList) cached.set(s.uid, s);

  const fresh = messages.filter((m) => !cached.has(m.uid));

  if (fresh.length > 0) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return { summaries: [], error: "ANTHROPIC_API_KEY not set." };
    try {
      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const client = new Anthropic({ apiKey });
      const emailBlocks = fresh
        .map(
          (m, i) =>
            `EMAIL ${i + 1} (${m.isOutbound ? "from me" : `from ${m.fromName || m.from}`}, ${m.date}):\nSubject: ${m.subject}\n${m.body || "(empty body)"}`
        )
        .join("\n\n---\n\n");
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Summarize EACH email below in exactly ONE short sentence (max 25 words) capturing what the sender said or asked. Return ONLY a JSON array of strings — one per email, same order, no markdown.\n\n${emailBlocks}`,
          },
        ],
      });
      const raw = msg.content[0].type === "text" ? msg.content[0].text.trim() : "[]";
      const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
      const sentences = JSON.parse(jsonStr) as string[];
      fresh.forEach((m, i) => {
        cached.set(m.uid, {
          uid: m.uid,
          date: m.date,
          from: m.isOutbound ? "You" : m.fromName || m.from,
          isOutbound: m.isOutbound,
          sentence:
            typeof sentences[i] === "string" && sentences[i].trim()
              ? sentences[i].trim()
              : m.subject,
        });
      });
    } catch (err) {
      return { summaries: [], error: (err as Error).message };
    }
  }

  // Chronological, restricted to messages currently in the thread window.
  const summaries = messages
    .map((m) => cached.get(m.uid))
    .filter(Boolean) as ThreadSummary[];

  // Persist the cache only when something new was summarized.
  if (fresh.length > 0) {
    if (cacheRow) {
      await db
        .from("tool_outputs")
        .update({ output: { summaries } })
        .eq("id", (cacheRow as { id: string }).id);
    } else {
      await db.from("tool_outputs").insert({
        tool_id: THREAD_SUMMARY_TOOL_ID,
        contact_id: contactId,
        input: { email: contactEmail },
        output: { summaries },
      });
    }
  }

  return { summaries };
}

// ── Sent-folder reconciliation ────────────────────────────────────────────────
// Scans Gmail's Sent folder for messages to active pipeline contacts that have
// no recorded touch, creates the touches row (status 'sent'), and advances
// contacts.stage. Idempotent: matches on the Gmail Message-ID stored in
// touches.notes, falls back to subject + date proximity; a 'queued' touch with
// the same subject is flipped to 'sent' instead of duplicated.

const SENT_SYNC_TOOL_ID = "sent-sync";

function normalizeSubject(s: string | null | undefined): string {
  return (s ?? "").replace(/^\s*((re|fwd?):\s*)+/i, "").trim().toLowerCase();
}

export async function syncSentFolder(): Promise<{
  created: number;
  error?: string;
}> {
  const db = sb();

  // Last recorded sync (or 7 days back), with a 1h overlap for safety.
  const { data: syncRow } = await db
    .from("tool_outputs")
    .select("id, output")
    .eq("tool_id", SENT_SYNC_TOOL_ID)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const lastSynced = (syncRow as { output: { synced_at?: string } | null } | null)
    ?.output?.synced_at;
  const weekAgo = Date.now() - 7 * 24 * 3_600_000;
  const since = new Date(
    Math.max(weekAgo, lastSynced ? new Date(lastSynced).getTime() - 3_600_000 : 0)
  );

  // Active pipeline contacts (v_pipeline already excludes archived).
  const { data: pipeRows, error: pipeErr } = await db
    .from("v_pipeline")
    .select("contact_id, email")
    .not("email", "is", null)
    .limit(1000);
  if (pipeErr) return { created: 0, error: pipeErr.message };
  const byEmail = new Map<string, string>(); // email → contact_id
  for (const r of (pipeRows ?? []) as { contact_id: string; email: string }[]) {
    byEmail.set(r.email.toLowerCase(), r.contact_id);
  }
  if (byEmail.size === 0) return { created: 0 };

  // Pull sent envelopes since the watermark.
  type SentMsg = { to: string[]; subject: string; date: Date; messageId: string };
  const sent: SentMsg[] = [];
  try {
    const client = await imapConnect();
    if (!client) return { created: 0, error: "Gmail not configured." };
    const lock = await client.getMailboxLock("[Gmail]/Sent Mail");
    try {
      // {uid: true} required — the fetch below runs in uid mode.
      const uids = await client.search({ since }, { uid: true });
      const uidList = Array.isArray(uids) ? uids : [];
      if (uidList.length > 0) {
        for await (const msg of client.fetch(
          uidList,
          { envelope: true, uid: true },
          { uid: true }
        )) {
          const env = msg.envelope;
          if (!env?.date) continue;
          const recipients = [...(env.to ?? []), ...(env.cc ?? [])]
            .map((a) => a.address?.toLowerCase() ?? "")
            .filter(Boolean);
          sent.push({
            to: recipients,
            subject: env.subject ?? "",
            date: env.date,
            messageId: env.messageId ?? "",
          });
        }
      }
    } finally {
      lock.release();
    }
    await client.logout();
  } catch (err) {
    return { created: 0, error: (err as Error).message };
  }

  // Reconcile each sent message against the pipeline.
  let created = 0;
  for (const msg of sent) {
    const contactId = msg.to.map((a) => byEmail.get(a)).find(Boolean);
    if (!contactId) continue;

    // Resolve (or create) the contact's sequence.
    const { data: seqRow } = await db
      .from("sequences")
      .select("id")
      .eq("contact_id", contactId)
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    let sequenceId = (seqRow as { id: string } | null)?.id ?? null;
    if (!sequenceId) {
      const nowIso = new Date().toISOString();
      const { data: createdSeq, error: seqErr } = await db
        .from("sequences")
        .insert({
          contact_id: contactId,
          play: "cold-outbound",
          status: "active",
          started_at: nowIso,
          updated_at: nowIso,
        })
        .select("id")
        .single();
      if (seqErr) continue;
      sequenceId = (createdSeq as { id: string }).id;
    }

    const { data: touchRows } = await db
      .from("touches")
      .select("id, touch_num, status, subject, sent_at, notes")
      .eq("sequence_id", sequenceId);
    const touches = (touchRows ?? []) as {
      id: string;
      touch_num: number;
      status: string | null;
      subject: string | null;
      sent_at: string | null;
      notes: string | null;
    }[];

    // Already recorded? Message-ID match, or same subject sent within ±36h.
    const subj = normalizeSubject(msg.subject);
    const msgTime = msg.date.getTime();
    const dup = touches.some(
      (t) =>
        (msg.messageId && t.notes?.includes(msg.messageId)) ||
        (t.sent_at &&
          normalizeSubject(t.subject) === subj &&
          Math.abs(new Date(t.sent_at).getTime() - msgTime) < 36 * 3_600_000)
    );
    if (dup) continue;

    const note = `reconciled from sent folder${msg.messageId ? ` | ${msg.messageId}` : ""}`;

    // A queued/draft touch with the same subject = this send; flip it.
    const pending = touches.find(
      (t) =>
        !t.sent_at &&
        ["queued", "draft", "pending"].includes(t.status ?? "") &&
        (normalizeSubject(t.subject) === subj || !t.subject)
    );
    if (pending) {
      const { error } = await db
        .from("touches")
        .update({
          status: "sent",
          sent_at: msg.date.toISOString(),
          subject: msg.subject || pending.subject,
          notes: [pending.notes, note].filter(Boolean).join(" | "),
        })
        .eq("id", pending.id);
      if (!error) created++;
    } else {
      const nextNum =
        Math.max(0, ...touches.filter((t) => t.sent_at).map((t) => t.touch_num)) + 1;
      const { error } = await db.from("touches").insert({
        sequence_id: sequenceId,
        touch_num: nextNum,
        channel: "email",
        status: "sent",
        sent_at: msg.date.toISOString(),
        subject: msg.subject || null,
        notes: note,
        thread: [],
      });
      if (!error) created++;
    }

    // Advance contacts.stage to in_outreach if behind.
    await db
      .from("contacts")
      .update({ stage: "in_outreach", updated_at: new Date().toISOString() })
      .eq("id", contactId)
      .or("stage.is.null,stage.in.(sourced,enriched,sequenced)");
  }

  // Record the watermark.
  const watermark = { synced_at: new Date().toISOString(), created };
  if (syncRow) {
    await db
      .from("tool_outputs")
      .update({ output: watermark })
      .eq("id", (syncRow as { id: string }).id);
  } else {
    await db.from("tool_outputs").insert({ tool_id: SENT_SYNC_TOOL_ID, output: watermark });
  }

  if (created > 0) revalidatePath("/");
  return { created };
}

// ── New-client onboarding ─────────────────────────────────────────────────────
// Inserts the clients row and scaffolds clients/<slug>/ on disk mirroring the
// client-intake skill's layered-dossier structure, with _pending_ markers.
// The dossier is then completed by running client-intake → icp-builder.

function kebab(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createNewClient(params: {
  clientName: string;
  companyName: string;
  personName: string;
  personEmail: string;
  personTitle: string;
}): Promise<{ ok: boolean; slug?: string; error?: string }> {
  const clientName = params.clientName.trim();
  const companyName = params.companyName.trim();
  const personName = params.personName.trim();
  if (!clientName) return { ok: false, error: "Client name is required." };
  if (!companyName) return { ok: false, error: "Company name is required." };
  if (!personName) return { ok: false, error: "Salesperson name is required." };

  const slug = kebab(clientName);
  if (!slug) return { ok: false, error: "Client name produces an empty slug." };
  const personSlug = kebab(personName) || "salesperson";

  const db = sb();

  // Slug collision: DB row or existing folder both block.
  const { data: existing, error: lookupErr } = await db
    .from("clients")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (lookupErr) return { ok: false, error: lookupErr.message };
  if (existing) return { ok: false, error: `Client '${slug}' already exists in the database.` };

  const clientDir = path.join(clientsDir(), slug);
  try {
    await fs.access(clientDir);
    return { ok: false, error: `clients/${slug}/ already exists on disk.` };
  } catch {
    // good — folder doesn't exist
  }

  const { error: insertErr } = await db
    .from("clients")
    .insert({ slug, name: clientName, daily_quota: 5 });
  if (insertErr) return { ok: false, error: insertErr.message };

  const today = new Date().toISOString().slice(0, 10);
  const header = (title: string) =>
    `# ${title}\n\n> Scaffolded from dashboard ${today} — complete via client-intake.\n\n`;

  try {
    await fs.mkdir(path.join(clientDir, "dossier", "people"), { recursive: true });
    await fs.mkdir(path.join(clientDir, "dossier", "sources"), { recursive: true });
    await fs.mkdir(path.join(clientDir, "targets"), { recursive: true });

    await fs.writeFile(
      path.join(clientDir, "dossier", "company.md"),
      header(`${companyName} — Company`) +
        `## What it does\n_pending_\n\n## Market & positioning\n_pending_\n\n## Proof points\n_pending_\n\n## Competitors\n_pending_\n`
    );
    await fs.writeFile(
      path.join(clientDir, "dossier", "product.md"),
      header(`${companyName} — Product / Offer`) +
        `## What's being sold\n_pending_\n\n## Pricing posture\n_pending_\n\n## Differentiators\n_pending_\n\n## Case studies\n_pending_\n`
    );
    await fs.writeFile(
      path.join(clientDir, "dossier", "people", `${personSlug}.md`),
      header(`${personName}`) +
        `## Role\n${params.personTitle.trim() || "_pending_"}\n\n## Email\n${params.personEmail.trim() || "_pending_"}\n\n## Background\n_pending_\n\n## Network & communities (matchmaking fuel)\n_pending_\n\n## Alumni groups\n_pending_\n\n## Speaking / publishing\n_pending_\n`
    );
    await fs.writeFile(
      path.join(clientDir, "voice.md"),
      header(`Voice — ${clientName}`) +
        `## Tone rules\n_pending_\n\n## Banned phrases\n_pending_\n\n## Kill conditions\n_pending_\n\n## Learned rules\n(added by Review feedback)\n`
    );
    await fs.writeFile(
      path.join(clientDir, "profile.md"),
      header(`${clientName} — Profile (thin index)`) +
        `**Client:** ${personName}${params.personTitle.trim() ? ` (${params.personTitle.trim()})` : ""} at ${companyName}\n` +
        (params.personEmail.trim() ? `**Email:** ${params.personEmail.trim()}\n` : "") +
        `\n## Dossier\n- [Company](dossier/company.md)\n- [Product](dossier/product.md)\n- [${personName}](dossier/people/${personSlug}.md)\n- Sources: \`dossier/sources/\`\n- [Voice](voice.md)\n\n_Status: scaffolded ${today}; dossier _pending_ — run client-intake._\n`
    );
  } catch (err) {
    // Roll the DB row back so a retry isn't blocked by a half-made client.
    await db.from("clients").delete().eq("slug", slug);
    return { ok: false, error: `Scaffold failed: ${(err as Error).message}` };
  }

  revalidatePath("/");
  return { ok: true, slug };
}
