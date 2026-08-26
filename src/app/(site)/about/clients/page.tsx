import type { Metadata } from "next";
import ClientsPageContent from "./ClientsPageContent";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, listId } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { label: "Client Brands" }];

export const metadata: Metadata = {
  title: "Client Brands | Saren.ai",
  description:
    "Trusted by leading B2B technology companies and Fortune 500 consumer brands. From cybersecurity unicorns to household names.",
  alternates: { canonical: "https://saren.ai/about/clients" },
  openGraph: {
    title: "Client Brands | Saren.ai",
    description:
      "26+ brands across B2B tech and consumer marketing—from startups to Fortune 500.",
  },
};

export default function ClientsPage() {
  const graph = buildGraph({
    path: "/about/clients",
    pageType: "CollectionPage",
    name: "Client Brands | Saren.ai",
    description:
      "Trusted by leading B2B technology companies and Fortune 500 consumer brands. From cybersecurity unicorns to household names.",
    dateModified: "2026-03-27T00:00:00Z",
    breadcrumb: trail,
    extra: [
      {
        "@type": "ItemList",
        "@id": listId("/about/clients"),
        "name": "Brands Saren Sakurai Has Worked With",
            "description": "B2B technology and consumer brands across cybersecurity, enterprise software, automotive, food & beverage, and entertainment.",
            "numberOfItems": 24,
            "itemListElement": [
              { "@type": "ListItem", "position": 1,  "item": { "@type": "Organization", "name": "BlackBerry",          "url": "https://www.blackberry.com" } },
              { "@type": "ListItem", "position": 2,  "item": { "@type": "Organization", "name": "Cisco",               "url": "https://www.cisco.com" } },
              { "@type": "ListItem", "position": 3,  "item": { "@type": "Organization", "name": "Cylance",             "url": "https://www.cylance.com" } },
              { "@type": "ListItem", "position": 4,  "item": { "@type": "Organization", "name": "Palo Alto Networks",  "url": "https://www.paloaltonetworks.com" } },
              { "@type": "ListItem", "position": 5,  "item": { "@type": "Organization", "name": "Qwiet AI" } },
              { "@type": "ListItem", "position": 6,  "item": { "@type": "Organization", "name": "Symantec",            "url": "https://www.broadcom.com/company/newsroom/press-releases/detail?id=symantec" } },
              { "@type": "ListItem", "position": 7,  "item": { "@type": "Organization", "name": "Veritas",             "url": "https://www.veritas.com" } },
              { "@type": "ListItem", "position": 8,  "item": { "@type": "Organization", "name": "WethosAI",            "url": "https://wethos.ai" } },
              { "@type": "ListItem", "position": 9,  "item": { "@type": "Organization", "name": "Peak Nano" } },
              { "@type": "ListItem", "position": 10, "item": { "@type": "Organization", "name": "Coca-Cola",           "url": "https://www.coca-cola.com" } },
              { "@type": "ListItem", "position": 11, "item": { "@type": "Organization", "name": "DiGiorno" } },
              { "@type": "ListItem", "position": 12, "item": { "@type": "Organization", "name": "Honda",               "url": "https://www.honda.com" } },
              { "@type": "ListItem", "position": 13, "item": { "@type": "Organization", "name": "Kraft",               "url": "https://www.kraftheinzcompany.com" } },
              { "@type": "ListItem", "position": 14, "item": { "@type": "Organization", "name": "Method",              "url": "https://methodproducts.com" } },
              { "@type": "ListItem", "position": 15, "item": { "@type": "Organization", "name": "Nike",                "url": "https://www.nike.com" } },
              { "@type": "ListItem", "position": 16, "item": { "@type": "Organization", "name": "Philadelphia" } },
              { "@type": "ListItem", "position": 17, "item": { "@type": "Organization", "name": "Red Bull",            "url": "https://www.redbull.com" } },
              { "@type": "ListItem", "position": 18, "item": { "@type": "Organization", "name": "Sprite" } },
              { "@type": "ListItem", "position": 19, "item": { "@type": "Organization", "name": "Toyota",              "url": "https://www.toyota.com" } },
              { "@type": "ListItem", "position": 20, "item": { "@type": "Organization", "name": "CloudKitchens",       "url": "https://cloudkitchens.com" } },
              { "@type": "ListItem", "position": 21, "item": { "@type": "Organization", "name": "Paramount",           "url": "https://www.paramount.com" } },
              { "@type": "ListItem", "position": 22, "item": { "@type": "Organization", "name": "Sony",                "url": "https://www.sony.com" } },
              { "@type": "ListItem", "position": 23, "item": { "@type": "Organization", "name": "Ampd" } },
              { "@type": "ListItem", "position": 24, "item": { "@type": "Organization", "name": "Number One" } },
            ],
          },
        ],
      });

  return (
    <PagefindBoundary section="About">
      <JsonLd schema={graph} />
      <ClientsPageContent />
    </PagefindBoundary>
  );
}
