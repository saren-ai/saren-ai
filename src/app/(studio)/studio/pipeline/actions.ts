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
