import type { Metadata } from "next";
import KwannonTimelineClient from "./KwannonTimelineClient";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Psylocke Timeline | Saren.ai",
  description:
    "A fan-made interactive timeline of Kwannon (Psylocke) and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
  alternates: { canonical: "https://saren.ai/studio/psylocke-timeline" },
  openGraph: {
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of Kwannon (Psylocke) and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
    images: ["/images/portfolio/portfolio-psylocke.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of Kwannon (Psylocke) and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
    images: ["/images/portfolio/portfolio-psylocke.png"],
  },
};

const PATH = "/studio/psylocke-timeline";

const trail = [{ href: "/", label: "Home" }, { href: "/studio", label: "Studio" }, { label: "Kwannon timeline" }];

// Combined CreativeWork+Article node in the original markup (author/creator plus
// datePublished on one node) — kept as a single hand-typed node in `extra` rather
// than forced through buildGraph's `article` option, which always types a plain
// "Article" node and can't express the combined type.
const work = {
  "@type": ["CreativeWork", "Article"],
  "@id": workId(PATH),
  name: "Kwannon Timeline",
  description:
    "A fan-made interactive timeline of Kwannon and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
  url: pageUrl(PATH),
  author: { "@id": "https://saren.ai/#person" },
  creator: { "@id": "https://saren.ai/#person" },
  isPartOf: { "@id": "https://saren.ai/#website" },
  about: [
    "Comics history",
    "Kwannon character analysis",
    "Japanese cultural representation in comics",
  ],
  image: {
    "@type": "ImageObject",
    url: "https://saren.ai/images/portfolio/portfolio-psylocke.png",
    width: 1200,
    height: 630,
  },
  keywords: "Kwannon, Psylocke, X-Men, comics timeline, Japanese cultural representation, Marvel, interactive timeline",
  genre: "Cultural analysis",
  inLanguage: "en-US",
  datePublished: "2026-02-09T00:00:00Z",
  dateCreated: "2026-02-09",
  dateModified: "2026-05-08T00:00:00Z",
};

const graph = buildGraph({
  path: PATH,
  name: "Kwannon Timeline | Saren.ai",
  description:
    "A fan-made interactive timeline of Kwannon and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
  dateModified: "2026-05-08T00:00:00Z",
  breadcrumb: trail,
  extra: [work],
});

export default function KwannonTimelinePage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="container-narrow pt-6">
        <Breadcrumb trail={trail} />
      </div>
      <KwannonTimelineClient />
    </>
  );
}
