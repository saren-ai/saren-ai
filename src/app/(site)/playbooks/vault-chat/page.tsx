import type { Metadata } from "next";
import VaultChatConsole from "@/components/vault-chat/VaultChatConsole";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Vault Chat: Ask the Marketing Knowledge Base",
  description:
    "A retrieval-augmented chat interface grounded in a live Obsidian marketing vault — strategy notes, frameworks, and research, with cited sources.",
  alternates: { canonical: "https://saren.ai/playbooks/vault-chat" },
  openGraph: {
    title: "Vault Chat | Saren.ai",
    description:
      "Ask questions and get answers grounded in a live Obsidian marketing vault, with cited sources.",
  },
};

const PATH = "/playbooks/vault-chat";
const trail = [
  { href: "/", label: "Home" },
  { href: "/playbooks", label: "Playbooks" },
  { label: "Vault Chat" },
];

const graph = buildGraph({
  path: PATH,
  name: "Vault Chat: Ask the Marketing Knowledge Base",
  description: "A retrieval-augmented chat interface grounded in a live Obsidian marketing vault — strategy notes, frameworks, and research, with cited sources.",
  breadcrumb: trail,
  extra: [
    {
      "@type": ["CreativeWork", "SoftwareApplication"],
      "@id": workId(PATH),
      name: "Vault Chat: Ask the Marketing Knowledge Base",
      description:
        "A retrieval-augmented chat interface grounded in a live Obsidian marketing vault — strategy notes, frameworks, and research, with cited sources.",
      url: `https://saren.ai${PATH}`,
      author: { "@id": "https://saren.ai/#person" },
      creator: { "@id": "https://saren.ai/#person" },
      isPartOf: { "@id": "https://saren.ai/#website" },
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "en-US",
    },
  ],
});

export default function VaultChatPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <article className="section">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto mb-8">
            <Breadcrumb trail={trail} className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vault Chat
            </h1>
            <p className="text-foreground-muted text-lg">
              Retrieval-augmented chat over a live Obsidian marketing vault — strategy notes,
              frameworks, and research. Answers are grounded in the source files and cite the
              file path they came from.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <VaultChatConsole />
          </div>
        </div>
      </article>
    </>
  );
}
