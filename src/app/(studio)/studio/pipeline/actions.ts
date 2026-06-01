"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Log an outreach touch as SENT for a contact. Finds the contact's latest
// sequence, computes the next touch_num, inserts one real touches row.
// (sequences + touches are in database.types.ts, so this is fully typed.)
export async function logTouchSent(contactId: string) {
  const supabase = await createClient();

  const { data: seq } = await supabase
    .from("sequences")
    .select("id")
    .eq("contact_id", contactId)
    .order("started_at", { ascending: false })
    .limit(1);

  if (!seq?.[0]) throw new Error("No sequence for this contact yet.");
  const sequenceId = seq[0].id;

  const { data: last } = await supabase
    .from("touches")
    .select("touch_num")
    .eq("sequence_id", sequenceId)
    .order("touch_num", { ascending: false })
    .limit(1);

  const next = (last?.[0]?.touch_num ?? 0) + 1;

  const { error } = await supabase.from("touches").insert({
    sequence_id: sequenceId,
    touch_num: next,
    channel: "email",
    status: "sent",
    sent_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/studio");
}

// Remove a contact from the pipeline view without deleting them.
export async function archiveContact(contactId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contacts")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .update({ archived: true, updated_at: new Date().toISOString() } as any)
    .eq("id", contactId);
  if (error) throw new Error(error.message);
  revalidatePath("/studio");
}

// Queue a research job for a contact (free, no credits).
export async function queueResearchFromPipeline(contactId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("agent_jobs")
    .select("id")
    .eq("contact_id", contactId)
    .eq("kind", "research")
    .in("status", ["requested", "claimed", "running"])
    .limit(1);

  if (existing && existing.length > 0) return { queued: false };

  const { data: contact } = await supabase
    .from("contacts")
    .select("client_id, company_id")
    .eq("id", contactId)
    .single();

  await supabase.from("agent_jobs").insert({
    contact_id: contactId,
    client_id: contact?.client_id ?? null,
    company_id: contact?.company_id ?? null,
    skill: "account-research",
    kind: "research",
    status: "requested",
    params: {} as never,
    requested_by: user.id,
  });

  revalidatePath("/studio");
  return { queued: true };
}

// Record a reply on the contact's latest touch.
export async function markReplied(contactId: string) {
  const supabase = await createClient();

  const { data: seq } = await supabase
    .from("sequences")
    .select("id")
    .eq("contact_id", contactId)
    .order("started_at", { ascending: false })
    .limit(1);
  if (!seq?.[0]) throw new Error("No sequence for this contact yet.");

  const { data: last } = await supabase
    .from("touches")
    .select("id")
    .eq("sequence_id", seq[0].id)
    .order("touch_num", { ascending: false })
    .limit(1);
  if (!last?.[0]) throw new Error("No touch to mark replied.");

  const { error } = await supabase
    .from("touches")
    .update({ status: "replied", reply_at: new Date().toISOString() })
    .eq("id", last[0].id);
  if (error) throw new Error(error.message);

  revalidatePath("/studio");
}
