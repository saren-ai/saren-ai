import type { Metadata } from "next";
import { getAllPosts } from "@/lib/thinking";
import ThinkingClient from "./ThinkingClient";

export const metadata: Metadata = {
  title: "Thinking | Saren.ai",
  description:
    "Quick ideas, links, research, and things I'm paying attention to in marketing, AI, and growth.",
  openGraph: {
    title: "Thinking | Saren.ai",
    description:
      "Quick ideas, links, research, and things I'm paying attention to in marketing, AI, and growth.",
    images: ["/images/og/thinking.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thinking | Saren.ai",
    description:
      "Quick ideas, links, research, and things I'm paying attention to in marketing, AI, and growth.",
    images: ["/images/og/thinking.png"],
  },
};

export default function ThinkingPage() {
  const posts = getAllPosts();

  return <ThinkingClient posts={posts} />;
}
