import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Saren | Start Your Growth Engine",
  description:
    "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
  openGraph: {
    title: "Contact Saren | Start Your Growth Engine",
    description:
      "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
    images: ["/images/og/contact.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Saren | Start Your Growth Engine",
    description:
      "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
    images: ["/images/og/contact.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
