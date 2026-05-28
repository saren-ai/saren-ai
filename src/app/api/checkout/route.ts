import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { PAID_TIERS } from "@/lib/playbook-tiers";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saren.ai";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Playbook paid-tier flow
  if (body.playbookId) {
    const { playbookId } = body;
    const tier = PAID_TIERS[playbookId];
    if (!tier) {
      return NextResponse.json({ error: "Playbook not found or not for sale" }, { status: 404 });
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: tier.priceId, quantity: 1 }],
      metadata: { playbook_id: playbookId },
      success_url: `${BASE_URL}/playbooks/${playbookId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/playbooks/${playbookId}`,
    });

    return NextResponse.json({ url: session.url });
  }

  // Legacy /downloads page flow
  if (body.productId) {
    const product = getProduct(body.productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: { name: product.name, description: product.tagline },
          },
          quantity: 1,
        },
      ],
      metadata: { product_id: body.productId },
      success_url: `${BASE_URL}/downloads/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/downloads`,
    });

    return NextResponse.json({ url: session.url });
  }

  return NextResponse.json({ error: "Missing playbookId or productId" }, { status: 400 });
}
