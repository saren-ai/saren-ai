"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function CallbackClient() {
  useEffect(() => {
    async function handleCallback() {
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const searchParams = new URLSearchParams(window.location.search);

      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const errorParam = searchParams.get("error") || params.get("error");
      const next = searchParams.get("next") ?? "/desk";

      if (errorParam) {
        window.location.replace(`/desk/login?error=${encodeURIComponent(errorParam)}`);
        return;
      }

      if (accessToken && refreshToken) {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          window.location.replace(`/desk/login?error=${encodeURIComponent(error.message)}`);
          return;
        }

        window.location.replace(next);
        return;
      }

      // No token and no error — unexpected state
      window.location.replace("/desk/login?error=callback_failed");
    }

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-offblack flex items-center justify-center">
      <p className="text-foreground-muted font-mono text-sm">Signing in…</p>
    </div>
  );
}
