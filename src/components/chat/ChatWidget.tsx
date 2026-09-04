"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import type { ChatMessageRow, ChatMode, ChatSendResponse } from "@/lib/chat/types";

const SESSION_STORAGE_KEY = "saren-chat-session-id";
const POLL_INTERVAL_MS = 3000;
const MAX_MESSAGE_LENGTH = 300;

const MODE_COPY: Record<ChatMode, string> = {
  day: "Usually replies within a few hours.",
  night: "It's late where Saren is — his AI assistant is answering for now.",
};

interface TurnstileRenderOptions {
  sitekey: string;
  size: "invisible";
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(true);
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState<ChatMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const statusCheckedRef = useRef(false);
  const checkStatus = useCallback(() => {
    if (statusCheckedRef.current) return;
    statusCheckedRef.current = true;
    fetch("/api/chat/status")
      .then((res) => res.json())
      .then((data: { available: boolean; message?: string }) => {
        setAvailable(data.available);
        setOfflineMessage(data.message ?? null);
      })
      .catch(() => {
        // status check failing shouldn't block the widget — assume available
      });
  }, []);

  useEffect(() => {
    try {
      setSessionId(localStorage.getItem(SESSION_STORAGE_KEY));
    } catch {
      // localStorage unavailable (private mode, etc.) — session just won't persist
    }
  }, []);

  function renderTurnstile() {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || !window.turnstile || !turnstileContainerRef.current || turnstileWidgetId.current) return;

    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: siteKey,
      size: "invisible",
      callback: (token) => setTurnstileToken(token),
      "error-callback": () => setTurnstileToken(null),
      "expired-callback": () => setTurnstileToken(null),
    });
  }

  const fetchMessages = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/chat/messages?sessionId=${encodeURIComponent(id)}`);
      if (!res.ok) return;
      const data = (await res.json()) as { messages: ChatMessageRow[] };
      setMessages(data.messages);
    } catch {
      // transient poll failure — next tick will retry
    }
  }, []);

  useEffect(() => {
    if (!open || !sessionId) return;

    checkStatus();
    fetchMessages(sessionId);
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState !== "hidden") {
        fetchMessages(sessionId);
      }
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [open, sessionId, fetchMessages, checkStatus]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    if (!turnstileToken) {
      setError("Still verifying — try again in a second.");
      return;
    }

    setSending(true);
    setError(null);

    const honeypot = (e.currentTarget as HTMLFormElement).elements.namedItem(
      "website"
    ) as HTMLInputElement | null;

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          honeypot: honeypot?.value || undefined,
          turnstileToken,
        }),
      });

      // Every layered defense (Turnstile, rate limits, spam filter, daily cap)
      // returns a `message` field on rejection — surface it verbatim.
      const data = (await res.json()) as ChatSendResponse & {
        error?: string;
        message?: string;
        offline?: boolean;
      };

      if (turnstileWidgetId.current) window.turnstile?.reset(turnstileWidgetId.current);
      setTurnstileToken(null);

      if (!res.ok || data.offline) {
        if (data.offline) setAvailable(false);
        setError(data.message ?? "Couldn't send that — try again in a moment.");
        return;
      }

      setMode(data.mode ?? null);
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        try {
          localStorage.setItem(SESSION_STORAGE_KEY, data.sessionId);
        } catch {
          // ignore — non-fatal if it can't persist
        }
      }
      setInput("");
      if (data.sessionId) await fetchMessages(data.sessionId);
    } catch {
      setError("Couldn't send that — try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      <div ref={turnstileContainerRef} className="hidden" aria-hidden="true" />

      <button
        onClick={() => {
          checkStatus();
          setOpen((v) => !v);
        }}
        onMouseEnter={checkStatus}
        onFocus={checkStatus}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ember text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.5} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:w-96"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="font-semibold text-foreground">Chat with Saren</p>
              <p className="text-xs text-foreground-muted">
                {!available
                  ? offlineMessage
                  : mode
                    ? MODE_COPY[mode]
                    : "Send a message to get started."}
              </p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "visitor" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "visitor"
                        ? "bg-ember text-white"
                        : "border border-border bg-background text-foreground"
                    }`}
                  >
                    {m.role === "ai" && (
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-lavender">
                        AI assistant
                      </span>
                    )}
                    {m.body}
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="px-4 pb-2 text-xs text-ember">{error}</p>}

            {available && (
              <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px]"
                />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  maxLength={MAX_MESSAGE_LENGTH}
                  className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ember"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  aria-label="Send"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ember text-white disabled:opacity-40"
                >
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
