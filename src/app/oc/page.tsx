import OcClient from "./OcClient";

export default function OcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://saren.ai/oc/#service",
            name: "Saren Sakurai — GTM Engineer, Orange County",
            description:
              "Fixed-price GTM audits and fractional marketing leadership for OC startups and revenue teams.",
            url: "https://saren.ai/oc",
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Orange County, California",
            },
            provider: { "@id": "https://saren.ai/#person" },
          }),
        }}
      />
      <OcClient />
    </>
  );
}
