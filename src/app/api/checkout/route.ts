import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  const { productId } = await req.json();

  const product = getProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saren.ai";

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.tagline,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      product_id: product.id,
    },
    success_url: `${baseUrl}/downloads/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/downloads`,
  });

  return NextResponse.json({ url: session.url });
}
