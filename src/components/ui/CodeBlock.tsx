import React from "react";

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = "markdown" }: CodeBlockProps) {
    return (
        <div className="relative rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                <span className="text-xs font-mono text-white/50">{language}</span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-[#d4d4d4] leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
