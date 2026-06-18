import { ImageResponse } from "next/og";
import { getPlaybookById } from "@/lib/playbooks";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Saren.ai playbook";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playbook = await getPlaybookById(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#0F0F0F",
          color: "#F5F5F7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#C43322",
            marginBottom: 16,
            letterSpacing: 4,
          }}
        >
          SAREN.AI PLAYBOOKS
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {playbook?.title ?? "Playbook"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 24,
            color: "#A8B2BF",
          }}
        >
          saren.ai
        </div>
      </div>
    ),
    size
  );
}
