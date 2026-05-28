import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.text();
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

    const productId = session.metadata?.product_id;
    const customerEmail = session.customer_details?.email ?? null;

    if (!productId) {
      return NextResponse.json({ error: "Missing product_id in metadata" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Upsert so this is idempotent — success page may have already inserted the row
    const { error } = await supabase.from("purchases").upsert(
      {
        product_id: productId,
        stripe_session_id: session.id,
        customer_email: customerEmail,
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true }
    );

    if (error) {
      console.error("Supabase upsert failed:", error.message);
      return NextResponse.json({ error: "DB write failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
