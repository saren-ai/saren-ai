"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ExternalLink, Copy, Check, Plus } from "lucide-react";
import RelativeTime from "@/components/studio/RelativeTime";
import SlideOver from "@/components/studio/SlideOver";
import { createOutreachPage, updateOutreachPage } from "./actions";
import type { Tables } from "@/lib/supabase/database.types";

type Page = Tables<"outreach_pages">;

interface Props {
  pages: Page[];
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function InputField({
  name,
  label,
  defaultValue = "",
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">
        {label}
        {required && <span className="text-ember ml-0.5">*</span>}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-lavender"
      />
    </div>
  );
}

function EditPanel({ page }: { page: Page }) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const tools = Array.isArray(page.tools)
    ? (page.tools as string[]).join(", ")
    : "";

  function handleCopy() {
    navigator.clipboard.writeText(`https://saren.ai/for/${page.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateOutreachPage(page.slug, fd);
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <a
          href={`/for/${page.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-lavender hover:text-ember transition-colors flex items-center gap-1"
        >
          saren.ai/for/{page.slug}
          <ExternalLink size={11} />
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground transition-colors"
        >
          {copied ? <Check size={12} className="text-lavender" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-border bg-black flex-shrink-0"
        style={{ height: 260 }}
      >
        <iframe
          src={`/for/${page.slug}`}
          title={`Preview: ${page.slug}`}
          style={{
            width: "166.67%",
            height: "166.67%",
            transform: "scale(0.6)",
            transformOrigin: "top left",
            pointerEvents: "none",
            border: "none",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputField name="company" label="Company" defaultValue={page.company ?? ""} />
        <InputField name="industry" label="Industry" defaultValue={page.industry ?? ""} />
        <InputField name="role" label="Role" defaultValue={page.role ?? ""} />
        <div>
          <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Pain point</label>
          <textarea
            name="pain_point"
            defaultValue={page.pain_point ?? ""}
            rows={2}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-lavender"
          />
        </div>
        <InputField name="cta_text" label="CTA text" defaultValue={page.cta_text ?? ""} />
        <InputField name="cta_href" label="CTA href" defaultValue={page.cta_href ?? ""} />
        <InputField name="tools" label="Tools (comma-separated)" defaultValue={tools} />
        <button type="submit" disabled={isPending} className="btn-primary mt-1">
          {isPending ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}

function NewPageSlideOver({ onClose }: { onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [slug, setSlug] = useState("");

  function handleCompanyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(slugify(e.target.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await createOutreachPage(fd);
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Company</label>
        <input
          name="company"
          onChange={handleCompanyChange}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-lavender"
        />
      </div>
      <div>
        <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">
          Slug <span className="text-ember">*</span>
        </label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-lavender"
        />
      </div>
      <InputField name="industry" label="Industry" />
      <InputField name="role" label="Role" />
      <div>
        <label className="text-[10px] text-foreground-muted uppercase tracking-wider block mb-1">Pain point</label>
        <textarea
          name="pain_point"
          rows={2}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-lavender"
        />
      </div>
      <InputField name="cta_text" label="CTA text" />
      <InputField name="cta_href" label="CTA href" />
      <button type="submit" disabled={isPending} className="btn-primary mt-2">
        {isPending ? "Creating…" : "Create page"}
      </button>
    </form>
  );
}

export default function OutreachPagesClient({ pages }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(pages[0]?.slug ?? null);
  const [showNew, setShowNew] = useState(false);

  const selectedPage = pages.find((p) => p.slug === selectedSlug);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-foreground-muted text-xs font-mono mb-1">
            <Link href="/studio" className="hover:text-foreground transition-colors">studio</Link>
            <span className="mx-1">/</span>
            <span className="text-foreground">outreach-pages</span>
          </p>
          <h1 className="text-xl font-bold text-foreground">Outreach Pages</h1>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="btn-primary flex items-center gap-1.5 text-sm"
        >
          <Plus size={15} />
          New page
        </button>
      </div>

      <div className="grid grid-cols-[380px_1fr] gap-6 min-h-[60vh]">
        {/* Left — page list */}
        <div className="bg-card border border-border rounded-xl overflow-hidden self-start">
          {pages.length === 0 ? (
            <p className="px-4 py-8 text-center text-foreground-muted text-sm">No pages yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-foreground-muted text-xs uppercase tracking-widest">
                  <th className="text-left px-4 py-3 font-semibold">Slug</th>
                  <th className="text-left px-4 py-3 font-semibold">Company</th>
                  <th className="text-right px-4 py-3 font-semibold font-mono">Views</th>
                  <th className="text-right px-4 py-3 font-semibold">Published</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p, i) => (
                  <tr
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`cursor-pointer transition-colors hover:bg-white/5 ${
                      selectedSlug === p.slug ? "bg-white/10" : ""
                    } ${i < pages.length - 1 ? "border-b border-border/50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-foreground">{p.slug}</span>
                        <a
                          href={`/for/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-foreground-muted hover:text-lavender transition-colors"
                        >
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground-muted text-xs">{p.company ?? "—"}</td>
                    <td className="px-4 py-3 text-right font-mono text-ember text-xs">
                      {p.view_count ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-foreground-muted">
                      {p.published_at ? <RelativeTime iso={p.published_at} /> : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right — edit panel */}
        <div className="bg-card border border-border rounded-xl p-6 overflow-y-auto max-h-[85vh]">
          {selectedPage ? (
            <EditPanel key={selectedPage.slug} page={selectedPage} />
          ) : (
            <p className="text-foreground-muted text-sm italic">Select a page to edit.</p>
          )}
        </div>
      </div>

      {showNew && (
        <SlideOver title="New outreach page" onClose={() => setShowNew(false)}>
          <NewPageSlideOver onClose={() => setShowNew(false)} />
        </SlideOver>
      )}
    </>
  );
}
