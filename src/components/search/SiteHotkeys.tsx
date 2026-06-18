"use client";

import { useSearch } from "./SearchContext";
import { useSiteHotkeys } from "./useSiteHotkeys";

/** Global ⌘K and /-letter shortcuts — mounted once inside SearchProvider. */
export default function SiteHotkeys() {
  const { isOpen, open, close } = useSearch();
  useSiteHotkeys({ onOpenSearch: open, onCloseSearch: close, isSearchOpen: isOpen });
  return null;
}
