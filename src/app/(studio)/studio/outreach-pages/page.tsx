import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OutreachPagesClient from "./OutreachPagesClient";

export const metadata = {
  title: "Outreach Pages — Studio",
  robots: { index: false, follow: false },
};

export default async function OutreachPagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/studio/login");

  const { data: pages } = await supabase
    .from("outreach_pages")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <OutreachPagesClient pages={pages ?? []} />
    </div>
  );
}
