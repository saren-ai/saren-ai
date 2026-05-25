import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudioDashboard from "./StudioDashboard";

export default async function StudioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/studio/login");

  const [{ data: contacts }, { data: sequences }, { data: outreachPages }] =
    await Promise.all([
      supabase.from("contacts").select("id").limit(1),
      supabase.from("sequences").select("id, status").limit(100),
      supabase.from("outreach_pages").select("slug, company, view_count"),
    ]);

  const stats = {
    contacts: contacts?.length ?? 0,
    activeSequences: sequences?.filter((s) => s.status === "active").length ?? 0,
    outreachPages: outreachPages?.length ?? 0,
    totalPageViews: outreachPages?.reduce((sum, p) => sum + (p.view_count ?? 0), 0) ?? 0,
  };

  return <StudioDashboard user={user} stats={stats} outreachPages={outreachPages ?? []} />;
}
