"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import SlideOver from "@/components/studio/SlideOver";
import { addContact } from "./actions";

export default function AddContactButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      await addContact(fd);
      form.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-1.5 text-sm">
        <Plus size={15} />
        Add contact
      </button>

      {open && (
        <SlideOver title="Add contact" onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field name="full_name" label="Full name" required />
            <Field name="email" label="Email" type="email" />
            <Field name="company" label="Company" />
            <Field name="title" label="Title" />
            <Field name="location" label="Location" />
            <Field name="phone" label="Phone" />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground-muted font-medium">Notes</label>
              <textarea
                name="notes"
                rows={3}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-lavender"
              />
            </div>
            <button type="submit" disabled={isPending} className="btn-primary mt-2">
              {isPending ? "Saving…" : "Save contact"}
            </button>
          </form>
        </SlideOver>
      )}
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-foreground-muted font-medium">
        {label}
        {required && <span className="text-ember ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-lavender"
      />
    </div>
  );
}
