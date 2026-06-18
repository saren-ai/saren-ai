import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const THIRTY_DAYS_S = 60 * 60 * 24 * 30;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: playbookId } = await params;
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saren.ai";
  const playbookUrl = `${baseUrl}/playbooks/${playbookId}`;

  if (!sessionId) {
    return NextResponse.redirect(playbookUrl);
  }

  // Verify payment with Stripe — must be 'paid', not just 'exists'
  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.redirect(playbookUrl);
  }

  if (session.payment_status !== "paid") {
    return NextResponse.redirect(playbookUrl);
  }

  // Metadata is the source of truth — validate it matches the URL param
  const metaPlaybookId = session.metadata?.playbook_id;
  if (!metaPlaybookId || metaPlaybookId !== playbookId) {
    return NextResponse.redirect(playbookUrl);
  }

  const supabase = createAdminClient();

  // Check if entitlement already exists (webhook may have beaten us here)
  let { data: entitlement } = await supabase
    .from("entitlements")
    .select("cookie_token")
    .eq("session_id", sessionId)
    .single();

  if (!entitlement) {
    const { data: newEntitlement } = await supabase
      .from("entitlements")
      .insert({ session_id: sessionId, playbook_id: playbookId })
      .select("cookie_token")
      .single();

    entitlement = newEntitlement;
  }

  if (!entitlement) {
    // DB write failed — send them to the playbook anyway, gate will just stay closed
    return NextResponse.redirect(playbookUrl);
  }

  const res = NextResponse.redirect(playbookUrl);

  res.cookies.set(`dlx_${playbookId}`, entitlement.cookie_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: THIRTY_DAYS_S,
    path: "/",
  });

  return res;
}
