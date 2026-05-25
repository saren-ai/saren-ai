"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addContact(formData: FormData) {
  const supabase = await createClient();

  const full_name = (formData.get("full_name") as string).trim();
  if (!full_name) throw new Error("full_name is required");

  await supabase.from("contacts").insert({
    full_name,
    email: (formData.get("email") as string) || null,
    company: (formData.get("company") as string) || null,
    title: (formData.get("title") as string) || null,
    location: (formData.get("location") as string) || null,
    phone: (formData.get("phone") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });

  revalidatePath("/studio/contacts");
}
