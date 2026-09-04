"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ThreadItem } from "@/components/desk/ThreadBubble";

// ---------------------------------------------------------------------------
// Agent job queue (the trigger layer — see migration 004_agent_jobs.sql).
// A job is an INTENT. The Desk cockpit inserts it; the engine (Claude/Cowork
// skills) claims it, runs the matching skill, and writes the result back.
// ---------------------------------------------------------------------------

// Jobs the cockpit can fire from a single contact. Keep this in sync with the
// dispatch table in the lead-prospecting `job-runner` skill.
export type JobKind = "research" | "draft" | "enrich";

const JOB_SPEC: Record<JobKind, { skill: string; kind: string }> = {
  // free / no Apollo credits
  research: { skill: "account-research", kind: "research" },
  draft: { skill: "sales-outreach", kind: "draft" },
  // COSTS CREDITS — only ever queued behind an explicit confirm in the UI.
  enrich: { skill: "apollo-people-search", kind: "enrich" },
};

export async function queueJob(
  contactId: string,
  jobKind: JobKind,
  params: Record<string, unknown> = {}
) {
  const spec = JOB_SPEC[jobKind];
  if (!spec) throw new Error(`Unknown job kind: ${jobKind}`);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Pull the contact's client/company so the engine has the routing context
  // without a second round-trip.
  const { data: contact } = await supabase
    .from("contacts")
    .select("client_id, company_id")
    .eq("id", contactId)
    .single();

  // Don't double-queue: if an identical job is already pending, no-op.
  const { data: existing } = await supabase
    .from("agent_jobs")
    .select("id")
    .eq("contact_id", contactId)
    .eq("skill", spec.skill)
    .in("status", ["requested", "claimed", "running"])
    .limit(1);

  if (existing && existing.length > 0) {
    return { queued: false, reason: "already_pending" as const };
  }

  await supabase.from("agent_jobs").insert({
    contact_id: contactId,
    client_id: contact?.client_id ?? null,
    company_id: contact?.company_id ?? null,
    skill: spec.skill,
    kind: spec.kind,
    status: "requested",
    params: params as never,
    requested_by: user.id,
  });

  revalidatePath(`/desk/contacts/${contactId}`);
  return { queued: true as const };
}

// Save edits to a touch body and queue a Gmail draft job for the engine to push.
// The engine (job-runner) picks it up, calls Gmail MCP create_draft, and marks done.
export async function pushToDrafts(
  contactId: string,
  touchId: string,
  body: string,
  subject: string | null,
  to: string | null
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Persist the edited body back to the touch so the UI reflects the final version.
  await supabase
    .from("touches")
    .update({ body_md: body })
    .eq("id", touchId);

  const { data: contact } = await supabase
    .from("contacts")
    .select("client_id, company_id")
    .eq("id", contactId)
    .single();

  // De-dupe: don't queue a second gmail-draft for this touch if one is already pending.
  const { data: existing } = await supabase
    .from("agent_jobs")
    .select("id")
    .eq("contact_id", contactId)
    .eq("skill", "gmail-draft")
    .in("status", ["requested", "claimed", "running"])
    .limit(1);

  if (existing && existing.length > 0) {
    revalidatePath(`/desk/contacts/${contactId}`);
    return { queued: false as const, reason: "already_pending" as const };
  }

  await supabase.from("agent_jobs").insert({
    contact_id: contactId,
    client_id: contact?.client_id ?? null,
    company_id: contact?.company_id ?? null,
    skill: "gmail-draft",
    kind: "action",
    status: "requested",
    params: { touch_id: touchId, to, subject, body } as never,
    requested_by: user.id,
  });

  revalidatePath(`/desk/contacts/${contactId}`);
  return { queued: true as const };
}

const ALLOWED_CONTACT_FIELDS = new Set([
  "full_name",
  "email",
  "title",
  "company",
  "linkedin_url",
  "location",
  "segment",
  "notes",
  "fit_score",
  "stage",
]);

export async function updateContactField(
  id: string,
  field: string,
  value: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  if (!ALLOWED_CONTACT_FIELDS.has(field)) {
    throw new Error(`Field '${field}' is not editable`);
  }

  await supabase
    .from("contacts")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .update({ [field]: value || null, updated_at: new Date().toISOString() } as any)
    .eq("id", id);
  revalidatePath(`/desk/contacts/${id}`);
  revalidatePath("/desk");
}

export async function logReply(
  contactId: string,
  touchId: string,
  formData: FormData
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const body = (formData.get("body") as string).trim();
  const sentiment = formData.get("sentiment") as string;

  const { data: touch } = await supabase
    .from("touches")
    .select("thread")
    .eq("id", touchId)
    .single();

  const current = (touch?.thread ?? []) as unknown as ThreadItem[];
  const updated: ThreadItem[] = [
    ...current,
    { direction: "inbound", body_md: body, sent_at: new Date().toISOString() },
  ];

  await supabase
    .from("touches")
    .update({
      thread: updated as unknown as import("@/lib/supabase/database.types").Json,
      reply_at: new Date().toISOString(),
      sentiment,
      status: "replied",
    })
    .eq("id", touchId);

  revalidatePath(`/desk/contacts/${contactId}`);
}
