import { Download } from "lucide-react";

export function DownloadButton({ token }: { token: string }) {
  return (
    <div className="flex flex-col items-center gap-3 pt-4">
      <a
        href={`/api/download/${token}`}
        className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"
      >
        <Download className="w-4 h-4" />
        Download your files
      </a>
      <p className="text-xs text-slate dark:text-foreground-muted">
        Bought on another device? Re-open this page there to restore access.
      </p>
    </div>
  );
}
