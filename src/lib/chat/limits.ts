export const MAX_MESSAGE_LENGTH = 300;
export const SESSION_MESSAGE_LIMIT = 5;
export const SESSION_WINDOW_SECONDS = 60;
export const IP_DAILY_MESSAGE_LIMIT = 20;
export const GLOBAL_DAILY_SESSION_CAP = 100;

export const OFFLINE_MESSAGE = "Live chat is currently offline for today. Please use the contact form instead.";
export const SESSION_RATE_LIMIT_MESSAGE = "You're sending messages a little too fast — give it a few seconds.";
export const IP_DAILY_LIMIT_MESSAGE = "You've hit today's message limit for this chat. Please use the contact form instead.";
export const SPAM_BLOCKED_MESSAGE = "That message couldn't be sent — please avoid links and promotional content.";

export function startOfUtcDayIso(date: Date = new Date()): string {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString();
}
