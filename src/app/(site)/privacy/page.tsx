import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How saren.ai collects, uses, and protects your information — analytics, purchases, cookies, and your rights.",
  alternates: { canonical: "https://saren.ai/privacy" },
};

const sections = [
  {
    heading: "Who I am",
    body: [
      "saren.ai is the personal portfolio and consulting site of Saren Sakurai, operating through Identogram LLC, based in Orange County, California. For anything related to this policy, email hello#saren.ai.",
    ],
  },
  {
    heading: "What I collect",
    body: [
      "Email and contact details you send me directly. The contact page uses a standard email link — when you reach out, I receive whatever you choose to send. I use it to reply, and nothing else.",
      "Purchase information. Paid playbooks are sold through Stripe Checkout. Stripe processes your payment and shares your email address and purchase details with me so I can deliver what you bought. I never see or store your card number. Purchase records (email, product, timestamps) are stored in my database to manage access to your purchase.",
      "Usage analytics. The site uses Google Analytics (via Google Tag Manager) to understand aggregate traffic — pages visited, approximate location, device type. This data is not tied to your name or used to identify you.",
      "Error reports. If something breaks, Sentry captures technical error details (browser, page, stack trace) so I can fix it.",
    ],
  },
  {
    heading: "Cookies and local storage",
    body: [
      "Theme preference — your light/dark mode choice is saved in your browser's local storage. It never leaves your device.",
      "Purchase access cookies — when you buy a playbook, a secure HttpOnly cookie keeps the content unlocked on your device. It contains a random token, nothing personal.",
      "Analytics cookies — set by Google Analytics to distinguish visits. You can block these with browser settings or extensions without affecting the site.",
    ],
  },
  {
    heading: "Who processes your data",
    body: [
      "I use a small set of service providers to run this site: Vercel (hosting), Stripe (payments), Supabase (database and file storage), Google (analytics), Sentry (error monitoring), and Calendly (if you book a call). Each receives only what it needs to do its job.",
      "I do not sell your personal information, and I don't share it with anyone for advertising.",
    ],
  },
  {
    heading: "How long I keep it",
    body: [
      "Purchase records are kept for as long as needed to provide access to what you bought and to meet tax and accounting obligations. Emails are kept as ordinary business correspondence. Analytics data is retained per Google Analytics' standard retention settings.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask me what information I hold about you, ask me to correct it, or ask me to delete it. Email hello#saren.ai and I'll respond within 30 days. If you're in a jurisdiction with specific privacy rights (such as the California Consumer Privacy Act or the GDPR), those rights apply and the same email is the way to exercise them.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is for professionals and isn't directed at children under 16. I don't knowingly collect information from them.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If this policy changes materially, I'll update this page and the effective date below. Continued use of the site after a change means the updated policy applies.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-narrow max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-3">
          Privacy Policy
        </h1>
        <p className="font-mono text-sm text-slate dark:text-foreground-muted mb-12">
          Effective June 12, 2026
        </p>

        <p className="text-slate dark:text-foreground-muted leading-relaxed mb-10">
          The short version: I collect as little as possible, I don&apos;t sell
          your data, and the only personal information I hold is what you give
          me directly — by emailing me or buying something.
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
            href="/terms"
            className="text-lavender hover:text-ember transition-colors"
          >
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
