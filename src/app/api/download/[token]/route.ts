import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProduct } from "@/lib/products";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  const { data: purchase, error } = await supabase
    .from("purchases")
    .select("product_id, download_count, download_limit, expires_at")
    .eq("download_token", token)
    .single();

  if (error || !purchase) {
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

  // Increment before generating URL so concurrent requests don't bypass the limit
  await supabase
    .from("purchases")
    .update({ download_count: purchase.download_count + 1 })
    .eq("download_token", token);

  const { data: signedUrl, error: storageError } = await supabase.storage
    .from("downloads")
    .createSignedUrl(product.filePath, 60); // 60-second window to start the download

  if (storageError || !signedUrl) {
    return NextResponse.json({ error: "Could not generate download URL" }, { status: 500 });
  }

  return NextResponse.redirect(signedUrl.signedUrl);
}
