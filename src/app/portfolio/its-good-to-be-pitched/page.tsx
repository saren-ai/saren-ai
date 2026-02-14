import type { Metadata } from "next";
import ItsGoodToBePitchedClient from "./ItsGoodToBePitchedClient";

export const metadata: Metadata = {
  title: "It's Good to be Pitched | Saren.ai",
  description:
    "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
  openGraph: {
    title: "It's Good to be Pitched | Saren.ai",
    description:
      "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
    images: ["/images/og/portfolio-pitched.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "It's Good to be Pitched | Saren.ai",
    description:
      "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
    images: ["/images/og/portfolio-pitched.png"],
  },
};

export default function ItsGoodToBePitchedPage() {
  return <ItsGoodToBePitchedClient />;
}
