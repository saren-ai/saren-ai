// Saren is offline 11pm-7am Pacific (Irvine, CA — same timezone the
// LocalBusiness schema and footer service-area copy are pinned to).
const NIGHT_START_HOUR = 23;
const NIGHT_END_HOUR = 7;
const CHAT_TIMEZONE = "America/Los_Angeles";

export function isNightMode(date: Date = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: CHAT_TIMEZONE,
    }).format(date)
  );
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}
