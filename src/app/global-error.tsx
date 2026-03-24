"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="bg-ash">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-charcoal text-2xl font-bold mb-4">
              Something went wrong
            </h1>
            <p className="text-charcoal/70 mb-8">
              An unexpected error occurred. Please try again.
            </p>
            <button onClick={() => reset()} className="btn-primary">
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
