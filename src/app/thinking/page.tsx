import type { Metadata } from "next";
import { getAllPosts } from "@/lib/thinking";
import ThinkingClient from "./ThinkingClient";

export const metadata: Metadata = {
  title: "Thinking",
  description:
    "Quick ideas, links, research, and things I'm paying attention to in marketing, AI, and growth.",
};

export default function ThinkingPage() {
  const posts = getAllPosts();

  return <ThinkingClient posts={posts} />;
}
