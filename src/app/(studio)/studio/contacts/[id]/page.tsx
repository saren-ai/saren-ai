import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ContactDetailClient from "./ContactDetailClient";

export const metadata = {
  title: "Contact — Studio",
  robots: { index: false, follow: false },
};

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/studio/login");

  const [{ data: contact }, { data: sequences }] = await Promise.all([
    supabase.from("contacts").select("*").eq("id", id).single(),
    supabase
      .from("sequences")
      .select("*, touches(*)")
      .eq("contact_id", id)
      .order("started_at", { ascending: false }),
  ]);

  if (!contact) notFound();

  const seqsWithSortedTouches = (sequences ?? []).map((seq) => ({
    ...seq,
    touches: (seq.touches ?? []).sort((a, b) => a.touch_num - b.touch_num),
  }));

  return (
    <ContactDetailClient contact={contact} sequences={seqsWithSortedTouches} />
  );
}
