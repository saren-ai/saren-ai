"use client";

import { BOOKING_URL } from "@/lib/booking";

export default function GoogleCalendarInlineWidget({
  url = `${BOOKING_URL}?gv=true`,
  className = "",
}: {
  url?: string;
  className?: string;
}) {
  return (
    <iframe
      src={url}
      className={`w-full rounded-xl overflow-hidden ${className}`}
      style={{ border: 0, minWidth: "280px", height: "700px" }}
      title="Schedule a call with Saren Sakurai"
    />
  );
}
