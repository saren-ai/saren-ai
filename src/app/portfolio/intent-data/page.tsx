import type { Metadata } from "next";
import IntentDataClient from "./IntentDataClient";

export const metadata: Metadata = {
  title: "Intent Data as Funnel Intelligence | Saren Sakurai",
  description:
    "A methodology showcase: mapping Bombora intent signals across ~100 Cylance close/won enterprise accounts from 18 months pre-close to purchase — and building a just-in-time content engine from the data.",
};

export default function IntentDataPage() {
  return <IntentDataClient />;
}
