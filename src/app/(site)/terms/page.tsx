import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using saren.ai — content, interactive tools, digital product purchases, and licensing.",
  alternates: { canonical: "https://saren.ai/terms" },
};

const sections = [
  {
    heading: "Agreement",
    body: [
      "These terms govern your use of saren.ai, operated by Saren Sakurai through Identogram LLC. By using the site, you accept them. If you don't agree, don't use the site.",
    ],
  },
  {
    heading: "What this site is",
    body: [
      "saren.ai is a portfolio and consulting site. The case studies, playbooks, frameworks, and articles describe my professional work and methods. They're shared for information — they aren't professional, financial, or legal advice for your specific situation, and consulting engagements are governed by their own separate agreements, not these terms.",
    ],
  },
  {
    heading: "Interactive tools",
    body: [
      "The calculators and simulators (ROI simulator, GTM budget calculator, lead scoring tool, and others) produce estimates based on the assumptions you enter. They're provided as-is for exploration and planning. Outputs are illustrations, not guarantees of business results — validate any decision against your own data.",
    ],
  },
  {
    heading: "Digital product purchases",
    body: [
      "Paid playbooks are sold through Stripe Checkout. Prices are shown at checkout in US dollars. After payment, access is delivered to the device and email used at purchase.",
      "Purchases are licensed, not sold: you get a personal, non-exclusive, non-transferable license to use the content for your own work or your company's internal use. You may not resell, redistribute, or republish it.",
      "Because these are digital products delivered immediately, all sales are final once content has been delivered — except where the product is materially defective or a refund is required by law. If something went wrong with your purchase, email hello#saren.ai and I'll make it right.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The content on this site — text, frameworks, case studies, design, and code powering the interactive tools — belongs to Saren Sakurai / Identogram LLC unless credited otherwise. You're welcome to link to and quote brief excerpts with attribution. Wholesale reproduction requires written permission. Client names and trademarks shown belong to their respective owners.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Don't attempt to break, overload, scrape at abusive rates, or gain unauthorized access to any part of the site, its APIs, or its purchase-gating mechanisms. Don't use the site for anything unlawful.",
    ],
  },
  {
    heading: "Third-party services and links",
    body: [
      "The site links to and integrates third-party services (Stripe, Calendly, social platforms, external sites). Those services have their own terms, and I'm not responsible for their content or practices.",
    ],
  },
  {
    heading: "Disclaimers and limitation of liability",
    body: [
      "The site and its content are provided “as is” without warranties of any kind, express or implied, including fitness for a particular purpose. To the maximum extent permitted by law, Saren Sakurai and Identogram LLC are not liable for indirect, incidental, or consequential damages arising from your use of the site, and total liability for any claim is limited to the amount you paid for the product giving rise to the claim (or $50 if you paid nothing).",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the State of California, without regard to conflict-of-law rules. Any disputes will be resolved in the state or federal courts located in Orange County, California.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "I may update these terms from time to time. Material changes will be reflected on this page with a new effective date. Continued use after a change means the updated terms apply.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container-narrow max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-3">
          Terms of Service
        </h1>
        <p className="font-mono text-sm text-slate dark:text-foreground-muted mb-12">
          Effective June 12, 2026
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-charcoal dark:text-foreground mb-3">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-slate dark:text-foreground-muted leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate dark:text-foreground-muted mt-12 pt-8 border-t border-border">
          Questions? Email{" "}
          <a
            href="mailto:hello#saren.ai"
            className="text-lavender hover:text-ember transition-colors"
          >
            hello#saren.ai
          </a>{" "}
          or see the{" "}
          <Link
            href="/privacy"
            className="text-lavender hover:text-ember transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
