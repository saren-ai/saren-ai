"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

export function BuyButton({ playbookId }: { playbookId: string }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playbookId }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={buy}
      disabled={loading}
      className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirecting to checkout…
        </>
      ) : (
        <>
          <Lock className="w-4 h-4" />
          Get this playbook
        </>
      )}
    </button>
  );
}
