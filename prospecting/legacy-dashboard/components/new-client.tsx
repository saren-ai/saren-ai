"use client";

import { useEffect, useRef, useState } from "react";
import { createNewClient } from "@/app/actions";

// Minimal, keyboard-friendly onboarding: name the client, company, and the
// primary salesperson → server action inserts the clients row + scaffolds
// clients/<slug>/ on disk, then shows the manual-completion checklist.

export function NewClientModal({ onClose }: { onClose: () => void }) {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [personName, setPersonName] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personTitle, setPersonTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  // Esc closes from anywhere in the modal.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const canSave =
    clientName.trim().length > 0 &&
    companyName.trim().length > 0 &&
    personName.trim().length > 0 &&
    !saving;

  async function submit() {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    const result = await createNewClient({
      clientName,
      companyName,
      personName,
      personEmail,
      personTitle,
    });
    setSaving(false);
    if (result.ok && result.slug) {
      setCreatedSlug(result.slug);
    } else {
      setError(result.error ?? "Failed to create client.");
    }
  }

  function onFieldKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24"
      style={{ background: "rgba(15,15,15,0.35)" }}
      onClick={onClose}
    >
      <div
        className="w-[420px] rounded-xl p-5 shadow-xl"
        style={{ background: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {createdSlug ? (
          <>
            <p className="text-sm font-bold mb-1" style={{ color: "#1d1d1f" }}>
              Client created — <span className="font-mono">{createdSlug}</span>
            </p>
            <p className="text-xs mb-3" style={{ color: "#5b6470" }}>
              DB row inserted (quota 5/day) and{" "}
              <span className="font-mono">clients/{createdSlug}/</span> scaffolded
              with <span className="font-mono">_pending_</span> markers.
            </p>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: "#9ca3af" }}
            >
              Next steps
            </p>
            <ol className="space-y-2 mb-4">
              {[
                <>
                  Drop the LinkedIn PDF + résumé into{" "}
                  <span className="font-mono">clients/{createdSlug}/dossier/sources/</span>
                </>,
                <>
                  Run <span className="font-mono">client-intake</span> to complete the
                  dossier
                </>,
                <>
                  Run <span className="font-mono">icp-builder</span> for the ICP spec +
                  persona research
                </>,
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#1d1d1f" }}>
                  <span
                    className="font-mono shrink-0 w-4 h-4 rounded-full text-center leading-4"
                    style={{ background: "#f0ebf8", color: "#7c5aa3" }}
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <button
              autoFocus
              onClick={onClose}
              className="text-xs px-4 py-2 rounded-full font-semibold"
              style={{ background: "#1d1d1f", color: "#fff" }}
            >
              Done
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-bold mb-3" style={{ color: "#1d1d1f" }}>
              New client
            </p>
            <div className="space-y-2">
              <Field
                inputRef={firstRef}
                label="Client name"
                value={clientName}
                onChange={setClientName}
                onKeyDown={onFieldKey}
                placeholder="e.g. Dan Collins"
              />
              <Field
                label="Company"
                value={companyName}
                onChange={setCompanyName}
                onKeyDown={onFieldKey}
                placeholder="e.g. Stryke Security"
              />
              <div
                className="text-xs font-semibold uppercase tracking-wide pt-1"
                style={{ color: "#9ca3af" }}
              >
                Primary salesperson
              </div>
              <Field
                label="Name"
                value={personName}
                onChange={setPersonName}
                onKeyDown={onFieldKey}
                placeholder="e.g. Dan Collins"
              />
              <Field
                label="Email"
                value={personEmail}
                onChange={setPersonEmail}
                onKeyDown={onFieldKey}
                placeholder="dan@stryke.com"
              />
              <Field
                label="Title"
                value={personTitle}
                onChange={setPersonTitle}
                onKeyDown={onFieldKey}
                placeholder="Founder & CEO"
              />
            </div>
            {error && (
              <p className="text-xs mt-3" style={{ color: "#c43322" }}>
                {error}
              </p>
            )}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={submit}
                disabled={!canSave}
                className="text-xs px-4 py-2 rounded-full font-semibold disabled:opacity-50"
                style={{ background: "#c43322", color: "#fff" }}
              >
                {saving ? "Creating…" : "Create client"}
              </button>
              <button
                onClick={onClose}
                className="text-xs px-4 py-2 rounded-full font-semibold"
                style={{ background: "#f0f0f0", color: "#5b6470" }}
              >
                Cancel
              </button>
              <span className="text-xs font-mono" style={{ color: "#d1d5db" }}>
                Enter save · Esc close
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  onKeyDown,
  placeholder,
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <label className="block">
      <span className="text-xs block mb-1" style={{ color: "#9ca3af" }}>
        {label}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full text-sm px-3 py-2 rounded-lg border focus:outline-none"
        style={{ borderColor: "#e5e7eb", color: "#1d1d1f", background: "#fff" }}
      />
    </label>
  );
}
