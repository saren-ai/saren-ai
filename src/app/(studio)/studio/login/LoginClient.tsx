"use client";

import { useState, use } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginClient({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = use(searchParams);
  const next = params.next ?? "/studio";
  const isUnauthorized = params.error === "unauthorized";

  const [email, setEmail] = useState("saren.sakurai@gmail.com");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${next}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="mb-8 text-center">
          <span className="font-mono text-ember text-2xl font-bold tracking-widest uppercase">
            Studio
          </span>
          <p className="text-foreground-muted text-sm mt-1">saren.ai internal</p>
        </div>

        {isUnauthorized && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-ember/10 border border-ember/20 text-ember text-sm text-center">
            Unauthorized. This workspace is private.
          </div>
        )}

        {status === "sent" ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-foreground font-semibold text-lg mb-2">Check your inbox</h2>
            <p className="text-foreground-muted text-sm">
              Magic link sent to <span className="text-foreground font-mono">{email}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-foreground-muted mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-600 text-white placeholder:text-zinc-400 focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember/40 transition-colors text-sm font-mono"
              />
            </div>

            {status === "error" && (
              <p className="text-ember text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
