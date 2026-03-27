import type { Metadata } from "next";
import BrandClient from "./BrandClient";

export const metadata: Metadata = {
  title: "Brand Guide — Fire Horse 2026",
  description:
    "Living brand style guide for saren.ai. Colors, typography, accessibility audit, components, and animation patterns.",
};

export default function BrandPage() {
  return <BrandClient />;
}
