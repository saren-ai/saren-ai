import { Metadata } from "next";
import BrandClient from "./BrandClient";

export const metadata: Metadata = {
    title: "Brand Style Guide | Saren.ai",
    description: "The visual language of Saren.ai. Fire Horse design system.",
};

export default function BrandPage() {
    return <BrandClient />;
}
