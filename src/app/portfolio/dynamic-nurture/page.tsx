import type { Metadata } from "next";
import DynamicNurtureClient from "./DynamicNurtureClient";

export const metadata: Metadata = {
  title: "Dynamic Email Nurture | Saren Sakurai",
  description:
    "A system that delivers different content to the right person at the right stage — automatically. The matrix, routing logic, and scoring model behind a fully personalized B2B nurture engine.",
};

export default function DynamicNurturePage() {
  return <DynamicNurtureClient />;
}
