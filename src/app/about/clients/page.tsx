import type { Metadata } from "next";
import ClientsPageContent from "./ClientsPageContent";

export const metadata: Metadata = {
  title: "Client Brands | Saren.ai",
  description:
    "Trusted by leading B2B technology companies and Fortune 500 consumer brands. From cybersecurity unicorns to household names.",
  openGraph: {
    title: "Client Brands | Saren.ai",
    description:
      "26+ brands across B2B tech and consumer marketing—from startups to Fortune 500.",
  },
};

export default function ClientsPage() {
  return <ClientsPageContent />;
}
