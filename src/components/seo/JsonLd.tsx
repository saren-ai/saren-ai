import type { JsonLdGraph } from "@/lib/schema";

interface JsonLdProps {
  schema: JsonLdGraph | Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
