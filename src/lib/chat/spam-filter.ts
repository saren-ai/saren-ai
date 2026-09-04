// Cheap pre-filter for the obvious spam/promo patterns that hit public chat
// widgets — run before a message ever reaches Claude or triggers an SMS.
const SPAM_PATTERNS: RegExp[] = [
  /https?:\/\//i,
  /\bwww\./i,
  /\bcrypto(currency)?\b/i,
  /\bnft\b/i,
  /\bforex\b/i,
  /\bbacklinks?\b/i,
  /\bseo\s*servic/i,
  /\.ru\b/i,
  /\btelegram\b/i,
  /\bbitcoin\b/i,
  /\bwhatsapp\b/i,
];

export function isSpammy(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}
