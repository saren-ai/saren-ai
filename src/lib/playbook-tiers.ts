export type PaidTier = {
  priceId: string;    // Stripe Price ID (price_xxxxxxxx) — create in Stripe Dashboard
  storageKey: string; // path in Supabase Storage 'downloads' bucket
};

// Map playbook_id → paid tier. No entry here = fully free.
export const PAID_TIERS: Record<string, PaidTier> = {
  "genx-executive-ai-playbook": {
    priceId: "price_1TbxuzCf1qdA5NGTt5gFpBSh",
    storageKey: "genx_executive_ai_playbook.zip",
  },
};
