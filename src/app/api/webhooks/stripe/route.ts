import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.text(); // raw body required for signature verification — never req.json()
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const playbookId = session.metadata?.playbook_id;
    if (!playbookId) {
      // Legacy product purchase — not handled here
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("entitlements").upsert(
      {
        session_id: session.id,
        playbook_id: playbookId,
      },
      { onConflict: "session_id", ignoreDuplicates: true }
    );

    if (error) {
      console.error("Entitlement upsert failed:", error.message);
      return NextResponse.json({ error: "DB write failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
