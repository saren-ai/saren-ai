"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import RelativeTime from "./RelativeTime";

export interface ThreadItem {
  direction: "outbound" | "inbound";
  body_md: string;
  sent_at: string;
}

interface ThreadBubbleProps {
  direction: "outbound" | "inbound";
  body_md: string;
  sent_at: string;
}

export default function ThreadBubble({ direction, body_md, sent_at }: ThreadBubbleProps) {
  const isOut = direction === "outbound";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
          isOut ? "bg-ember text-white" : "bg-slate/30 text-foreground border border-border"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-p:leading-snug [&_*]:text-inherit">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {body_md}
          </ReactMarkdown>
        </div>
        <p className="text-[10px] opacity-60 mt-1.5">
          <RelativeTime iso={sent_at} />
        </p>
      </div>
    </div>
  );
}
