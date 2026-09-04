"use client";

import { useEffect, useState } from "react";
import type { ChatMessageRow, ChatMode } from "@/lib/chat/types";

export interface ChatSessionRow {
  id: string;
  status: string;
  mode: ChatMode;
  created_at: string;
  last_message_at: string;
  preview?: { role: string; body: string } | null;
}

const SESSIONS_POLL_MS = 5000;
const MESSAGES_POLL_MS = 3000;

const STATUS_STYLE: Record<string, string> = {
  waiting_admin: "bg-ember text-white",
  open: "border border-border text-foreground-muted",
  closed: "border border-border text-foreground-muted opacity-60",
};

export default function ChatAdminClient({ initialSessions }: { initialSessions: ChatSessionRow[] }) {
  const [sessions, setSessions] = useState<ChatSessionRow[]>(initialSessions);
  const [selectedId, setSelectedId] = useState<string | null>(initialSessions[0]?.id ?? null);
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const poll = () =>
      fetch("/api/admin/chat/sessions")
        .then((res) => res.json())
        .then((data: { sessions: ChatSessionRow[] }) => setSessions(data.sessions))
        .catch(() => {});
    poll();
    const id = setInterval(poll, SESSIONS_POLL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const poll = () =>
      fetch(`/api/chat/messages?sessionId=${encodeURIComponent(selectedId)}`)
        .then((res) => res.json())
        .then((data: { messages: ChatMessageRow[] }) => setMessages(data.messages))
        .catch(() => {});
    poll();
    const id = setInterval(poll, MESSAGES_POLL_MS);
    return () => clearInterval(id);
  }, [selectedId]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = reply.trim();
    if (!trimmed || !selectedId || sending) return;

    setSending(true);
    try {
      await fetch("/api/admin/chat/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: selectedId, message: trimmed }),
      });
      setReply("");
      const res = await fetch(`/api/chat/messages?sessionId=${encodeURIComponent(selectedId)}`);
      const data = (await res.json()) as { messages: ChatMessageRow[] };
      setMessages(data.messages);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-5xl gap-4">
      <div className="w-72 shrink-0 space-y-2 overflow-y-auto">
        {sessions.length === 0 && <p className="text-sm text-foreground-muted">No conversations yet.</p>}
        {sessions.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            className={`card block w-full p-3 text-left ${selectedId === s.id ? "border-lavender" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_STYLE[s.status] ?? ""}`}>
                {s.status.replace("_", " ")}
              </span>
              <span className="text-[10px] text-foreground-muted">{new Date(s.last_message_at).toLocaleString()}</span>
            </div>
            {s.preview && (
              <p className="mt-2 truncate text-xs text-foreground-muted">
                {s.preview.role === "visitor" ? "" : `${s.preview.role}: `}
                {s.preview.body}
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-border">
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "visitor" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "visitor"
                    ? "border border-border bg-background text-foreground"
                    : "bg-ember text-white"
                }`}
              >
                {m.role === "ai" && (
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-lavender">
                    AI
                  </span>
                )}
                {m.body}
              </div>
            </div>
          ))}
          {!selectedId && <p className="text-sm text-foreground-muted">Select a conversation.</p>}
        </div>

        {selectedId && (
          <form onSubmit={handleReply} className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply…"
              className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ember"
            />
            <button
              type="submit"
              disabled={sending || !reply.trim()}
              className="btn-primary px-4 py-2 text-sm disabled:opacity-40"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
