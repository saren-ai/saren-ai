"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSequenceStatus(sequenceId: string, status: string) {
  const supabase = await createClient();
  await supabase
    .from("sequences")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", sequenceId);
  revalidatePath("/studio/sequences");
}

export async function addTouch(sequenceId: string, formData: FormData) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("touches")
    .select("touch_num")
    .eq("sequence_id", sequenceId)
    .order("touch_num", { ascending: false })
    .limit(1)
    .single();

  const nextNum = (existing?.touch_num ?? 0) + 1;

  await supabase.from("touches").insert({
    sequence_id: sequenceId,
    touch_num: nextNum,
    channel: (formData.get("channel") as string) || null,
    scheduled_at: (formData.get("scheduled_at") as string) || null,
    subject: (formData.get("subject") as string) || null,
    body_md: (formData.get("body_md") as string) || null,
    status: "pending",
  });

  revalidatePath("/studio/sequences");
}
