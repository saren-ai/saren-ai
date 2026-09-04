import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminPurchasesPage() {
  const supabase = createAdminClient();

  const [{ data: entitlements }, { data: purchases }] = await Promise.all([
    supabase
      .from("entitlements")
      .select("id, playbook_id, session_id, download_count, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("purchases")
      .select("id, product_id, customer_email, download_count, download_limit, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Playbook entitlements</h1>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="p-3">Playbook</th>
                <th className="p-3">Downloads</th>
                <th className="p-3">Purchased</th>
              </tr>
            </thead>
            <tbody>
              {(entitlements ?? []).map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0">
                  <td className="p-3">{e.playbook_id}</td>
                  <td className="p-3">{e.download_count}</td>
                  <td className="p-3 text-foreground-muted">{new Date(e.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {(entitlements ?? []).length === 0 && (
                <tr>
                  <td colSpan={3} className="p-3 text-foreground-muted">
                    None yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-foreground">Legacy purchases</h1>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="p-3">Product</th>
                <th className="p-3">Email</th>
                <th className="p-3">Downloads</th>
                <th className="p-3">Purchased</th>
              </tr>
            </thead>
            <tbody>
              {(purchases ?? []).map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="p-3">{p.product_id}</td>
                  <td className="p-3">{p.customer_email ?? "—"}</td>
                  <td className="p-3">
                    {p.download_count}/{p.download_limit}
                  </td>
                  <td className="p-3 text-foreground-muted">{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {(purchases ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="p-3 text-foreground-muted">
                    None yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
