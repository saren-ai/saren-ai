"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ThreadItem } from "@/components/studio/ThreadBubble";

export async function updateContactField(
  id: string,
  field: string,
  value: string
) {
  const supabase = await createClient();
  await supabase
    .from("contacts")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .update({ [field]: value || null, updated_at: new Date().toISOString() } as any)
    .eq("id", id);
  revalidatePath(`/studio/contacts/${id}`);
  revalidatePath("/studio");
}

export async function logReply(
  contactId: string,
  touchId: string,
  formData: FormData
) {
  const supabase = await createClient();
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

  revalidatePath(`/studio/contacts/${contactId}`);
}
