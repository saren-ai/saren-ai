"use client";

import { useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp } from "lucide-react";

export default function VaultChatConsole() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/vault-chat" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="card flex flex-col h-[70vh] max-h-[720px] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <p className="text-foreground-muted">
            Ask a question about the marketing vault — strategy notes, frameworks, and research, grounded in the source files.
          </p>
        )}
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "text-right" : ""}>
            <div
              className={
                message.role === "user"
                  ? "inline-block rounded-[12px] bg-ember/10 px-4 py-3 text-left max-w-[85%]"
                  : "prose prose-sm dark:prose-invert max-w-none"
              }
            >
              {message.parts.map((part, i) =>
                part.type === "text" ? (
                  <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>
                    {part.text}
                  </ReactMarkdown>
                ) : null
              )}
            </div>
          </div>
        ))}
        {isStreaming && <p className="text-foreground-muted text-sm">Thinking…</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-border p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the vault…"
          className="flex-1 rounded-[9999px] border border-border bg-card px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ember/40"
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={isStreaming || !input.trim()}
          aria-label="Send"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </form>
    </div>
  );
}
