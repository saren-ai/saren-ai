"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createOutreachPage(formData: FormData) {
  const supabase = await createClient();

  const slug = (formData.get("slug") as string).trim();
  if (!slug) throw new Error("slug is required");

  const toolsRaw = (formData.get("tools") as string) ?? "";
  const tools = toolsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await supabase.from("outreach_pages").insert({
    slug,
    company: (formData.get("company") as string) || null,
    industry: (formData.get("industry") as string) || null,
    role: (formData.get("role") as string) || null,
    pain_point: (formData.get("pain_point") as string) || null,
    cta_text: (formData.get("cta_text") as string) || null,
    cta_href: (formData.get("cta_href") as string) || null,
    tools: tools.length ? tools : null,
    published_at: new Date().toISOString(),
  });

  revalidatePath("/studio/outreach-pages");
}

export async function updateOutreachPage(slug: string, formData: FormData) {
  const supabase = await createClient();

  const toolsRaw = (formData.get("tools") as string) ?? "";
  const tools = toolsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await supabase
    .from("outreach_pages")
    .update({
      company: (formData.get("company") as string) || null,
      industry: (formData.get("industry") as string) || null,
      role: (formData.get("role") as string) || null,
      pain_point: (formData.get("pain_point") as string) || null,
      cta_text: (formData.get("cta_text") as string) || null,
      cta_href: (formData.get("cta_href") as string) || null,
      tools: tools.length ? tools : null,
    })
    .eq("slug", slug);

  revalidatePath("/studio/outreach-pages");
}
