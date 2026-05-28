import type { Metadata } from "next";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmed | saren.ai",
  robots: { index: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <SuccessClient status="error" message="No session found." />;
  }

  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(session_id);
  } catch {
    return (
      <SuccessClient
        status="error"
        message="Could not verify your payment. Please contact support."
      />
    );
  }

  if (session.payment_status !== "paid") {
    return (
      <SuccessClient
        status="error"
        message="Payment not completed. If you were charged, please contact support."
      />
    );
  }

  const productId = session.metadata?.product_id;
  const customerEmail = session.customer_details?.email ?? null;

  if (!productId) {
    return (
      <SuccessClient
        status="error"
        message="Order details missing. Please contact support with your session ID."
      />
    );
  }

  const supabase = createAdminClient();

  // Check if webhook already created the record
  let { data: purchase } = await supabase
    .from("purchases")
    .select("download_token, product_id")
    .eq("stripe_session_id", session_id)
    .single();

  // Create if not yet inserted by webhook
  if (!purchase) {
    const { data: newPurchase } = await supabase
      .from("purchases")
      .insert({
        product_id: productId,
        stripe_session_id: session_id,
        customer_email: customerEmail,
      })
      .select("download_token, product_id")
      .single();

    purchase = newPurchase;
  }

  if (!purchase) {
    return (
      <SuccessClient
        status="error"
        message="Could not process your order. Please contact support."
      />
    );
  }

  return (
    <SuccessClient
      status="success"
      downloadToken={purchase.download_token as string}
      productId={purchase.product_id}
    />
  );
}
