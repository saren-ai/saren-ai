"use client";

import React, { useMemo } from "react";
import { COMIC_ISSUES, formatDateShort } from "@/lib/psylocke-timeline";
import { FocusRail, FocusRailItem } from "@/components/ui/focus-rail";

export default function PsylockeFocusRail() {
    // Memoize the mapping to avoid recalculating on every render
    const items: FocusRailItem[] = useMemo(() => {
        // Reverse the order to show newest first, matching the existing timeline logic
        // or keep it chronological? The prompt's demo showed items. 
        // The existing Timeline calls `COMIC_ISSUES` directly, and the Timeline.tsx says:
        // "Reverse to show newest first (left in list, but in circular gallery it depends on rotation) Let's keep newest first logic"
        // However, the `displayIssues` in Timeline.tsx was actually `[...COMIC_ISSUES]` which is chronological (oldest to newest) based on the lib file.
        // Let's stick to chronological for proper storytelling from 1989 -> 2019.

        return COMIC_ISSUES.map((issue) => ({
            id: issue.id,
            title: issue.title,
            description: issue.plotDescription,
            imageSrc: issue.thumbnailPath,
            href: issue.marvelFandomLink,
            meta: `${formatDateShort(issue.releaseDate)}`,
        }));
    }, []);

    return (
        <div className="w-full">
            <FocusRail
                items={items}
                autoPlay={false}
                loop={true}
                initialIndex={items.length - 1} // Start at the end (newest) if we want that, or 0 for oldest. 
            // Let's start at 0 (1989) to tell the story forward, or maybe the user prefers latest?
            // The previous code had `const displayIssues = useMemo(() => [...COMIC_ISSUES], []);`
            // So I'll default to 0.
            />
        </div>
    );
}
