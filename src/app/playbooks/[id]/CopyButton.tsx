"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
    textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 border ${copied
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                    : "bg-white text-charcoal border-charcoal/20 hover:bg-ash hover:text-charcoal dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-white"
                }`}
            aria-label="Copy prompt to clipboard"
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4" />
                    <span>Copied</span>
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Prompt</span>
                </>
            )}
        </button>
    );
}
