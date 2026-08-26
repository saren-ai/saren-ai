import type { Metadata } from "next";
import ItsGoodToBePitchedClient from "./ItsGoodToBePitchedClient";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId } from "@/lib/schema";

export const metadata: Metadata = {
  title: "It's Good to be Pitched | Saren.ai",
  description:
    "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
  alternates: { canonical: "https://saren.ai/playbooks/its-good-to-be-pitched" },
  openGraph: {
    title: "It's Good to be Pitched | Saren.ai",
    description:
      "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
    images: ["/images/portfolio/portfolio-pitched.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "It's Good to be Pitched | Saren.ai",
    description:
      "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
    images: ["/images/portfolio/portfolio-pitched.png"],
  },
};

const PATH = "/playbooks/its-good-to-be-pitched";
const trail = [
  { href: "/", label: "Home" },
  { href: "/playbooks", label: "Playbooks" },
  { label: "It's Good to be Pitched" },
];

const graph = buildGraph({
  path: PATH,
  name: "It's Good to be Pitched | Saren.ai",
  description: "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
  dateModified: "2026-03-27T00:00:00Z",
  breadcrumb: trail,
  extra: [
    {
      "@type": "CreativeWork",
      "@id": workId(PATH),
      "name": "It's Good to be Pitched",
      "description": "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
      "url": `https://saren.ai${PATH}`,
      "author": { "@id": "https://saren.ai/#person" },
      "creator": { "@id": "https://saren.ai/#person" },
      "isPartOf": { "@id": "https://saren.ai/#website" },
      "about": ["B2B pitch strategy", "Sales enablement", "Storytelling for sales"],
      "image": {
        "@type": "ImageObject",
        "url": "https://saren.ai/images/portfolio/portfolio-pitched.png",
        "width": 1200,
        "height": 630
      },
      "keywords": "pitch strategy, sales storytelling, agency concept, AI storyboarding, B2B sales enablement",
      "inLanguage": "en-US",
      "dateCreated": "2026-02-03",
      "dateModified": "2026-03-27T00:00:00Z"
    },
  ],
});

export default function ItsGoodToBePitchedPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="container-narrow pt-6">
        <Breadcrumb trail={trail} />
      </div>
      <ItsGoodToBePitchedClient />
    </>
  );
}
