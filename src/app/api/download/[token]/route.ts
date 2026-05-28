import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProduct } from "@/lib/products";
import { PAID_TIERS } from "@/lib/playbook-tiers";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();
  const now = new Date().toISOString();

  // --- Entitlements flow (paid playbook tier) ---
  const { data: entitlement } = await supabase
    .from("entitlements")
    .select("playbook_id, expires_at, download_count")
    .eq("download_token", token)
    .gt("expires_at", now)
    .maybeSingle();

  if (entitlement) {
    const tier = PAID_TIERS[entitlement.playbook_id];
    if (!tier?.storageKey) {
      return NextResponse.json(
        { error: "File not yet available — contact support" },
        { status: 503 }
      );
    }

    await supabase
      .from("entitlements")
      .update({ download_count: entitlement.download_count + 1 })
      .eq("download_token", token);

    const { data: signedUrl, error: storageError } = await supabase.storage
      .from("downloads")
      .createSignedUrl(tier.storageKey, 60);

    if (storageError || !signedUrl) {
      return NextResponse.json({ error: "Could not generate download URL" }, { status: 500 });
    }

    return NextResponse.redirect(signedUrl.signedUrl);
  }

  // --- Legacy purchases flow (/downloads page) ---
  const { data: purchase } = await supabase
    .from("purchases")
    .select("product_id, download_count, download_limit, expires_at")
    .eq("download_token", token)
    .single();

  if (!purchase) {
    return NextResponse.json({ error: "Invalid download link" }, { status: 404 });
  }

  if (new Date(purchase.expires_at) < new Date()) {
    return NextResponse.json({ error: "Download link has expired" }, { status: 410 });
  }

  if (purchase.download_count >= purchase.download_limit) {
    return NextResponse.json({ error: "Download limit reached" }, { status: 410 });
  }

  const product = getProduct(purchase.product_id);
  if (!product?.filePath) {
    return NextResponse.json(
      { error: "File not yet available — check back soon or contact support" },
      { status: 503 }
    );
  }

  await supabase
    .from("purchases")
    .update({ download_count: purchase.download_count + 1 })
    .eq("download_token", token);

  const { data: signedUrl, error: storageError } = await supabase.storage
    .from("downloads")
    .createSignedUrl(product.filePath, 60);

  if (storageError || !signedUrl) {
    return NextResponse.json({ error: "Could not generate download URL" }, { status: 500 });
  }

  return NextResponse.redirect(signedUrl.signedUrl);
}
