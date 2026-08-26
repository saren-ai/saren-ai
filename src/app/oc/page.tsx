import OcClient from "./OcClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, serviceId, ID } from "@/lib/schema";

export default function OcPage() {
  const graph = buildGraph({
    path: "/oc",
    pageType: "WebPage",
    name: "Saren Sakurai — GTM Engineer, Orange County",
    description:
      "Fixed-price GTM audits and fractional marketing leadership for OC startups and revenue teams.",
    extra: [
      {
        "@type": "ProfessionalService",
        "@id": serviceId("/oc"),
        name: "Saren Sakurai — GTM Engineer, Orange County",
        description:
          "Fixed-price GTM audits and fractional marketing leadership for OC startups and revenue teams.",
        url: "https://saren.ai/oc",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Orange County, California",
        },
        provider: { "@id": ID.person },
      },
    ],
  });

  return (
    <>
      <JsonLd schema={graph} />
      <OcClient />
    </>
  );
}
