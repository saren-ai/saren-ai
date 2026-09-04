import { createHmac, timingSafeEqual } from "crypto";

// Dedicated saren.ai chat number — deliberately separate from the
// unklamned Twilio account (see ~/Projects/.claude/rules/cross-pollination.md).
export async function sendSms(to: string, body: string): Promise<void> {
  const accountSid = process.env.CHAT_TWILIO_ACCOUNT_SID!;
  const authToken = process.env.CHAT_TWILIO_AUTH_TOKEN!;
  const from = process.env.CHAT_TWILIO_PHONE_NUMBER!;

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twilio send failed (${res.status}): ${text}`);
  }
}

// Twilio's request-signing scheme: HMAC-SHA1 of the webhook URL with every
// POST param (sorted by key, key+value concatenated) appended, base64-encoded.
// https://www.twilio.com/docs/usage/security#validating-requests
export function isValidTwilioSignature(
  webhookUrl: string,
  params: Record<string, string>,
  signature: string,
  authToken: string
): boolean {
  if (!signature || !webhookUrl || !authToken) return false;

  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], webhookUrl);

  const expected = createHmac("sha1", authToken).update(Buffer.from(data, "utf-8")).digest("base64");

  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signature);
  if (expectedBuf.length !== actualBuf.length) return false;

  return timingSafeEqual(expectedBuf, actualBuf);
}
