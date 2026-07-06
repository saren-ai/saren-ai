"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SLASH_WINDOW_MS = 900;

function isEditableTarget(target: EventTarget | null) {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function useSiteHotkeys({
  onOpenSearch,
  onCloseSearch,
  isSearchOpen,
}: {
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  isSearchOpen: boolean;
}) {
  const router = useRouter();
  const pendingSlash = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function clearPending() {
      pendingSlash.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        clearPending();
        onOpenSearch();
        return;
      }

      if (e.key === "Escape") {
        clearPending();
        if (isSearchOpen) onCloseSearch();
        return;
      }

      if (isSearchOpen || isEditableTarget(e.target)) {
        return;
      }

      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        pendingSlash.current = true;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(clearPending, SLASH_WINDOW_MS);
        return;
      }

      if (pendingSlash.current && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const cmd = e.key.toLowerCase();
        clearPending();

        switch (cmd) {
          case "w":
            router.push("/work");
            break;
          case "p":
            router.push("/playbooks");
            break;
          case "s":
            router.push("/studio");
            break;
          case "a":
            router.push("/about");
            break;
          case "h":
            router.push("/");
            break;
          default:
            break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearPending();
    };
  }, [onOpenSearch, onCloseSearch, isSearchOpen, router]);
}
