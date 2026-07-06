#!/usr/bin/env node
/**
 * One-time Gmail OAuth setup.
 * Writes GMAIL_REFRESH_TOKEN to ../.env.local.
 *
 * Usage:
 *   GMAIL_CLIENT_ID=xxx GMAIL_CLIENT_SECRET=yyy node scripts/setup-gmail.mjs
 *
 * Or pass inline:
 *   node scripts/setup-gmail.mjs <client_id> <client_secret>
 */

import http from "http";
import { exec } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const CLIENT_ID = process.argv[2] ?? process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.argv[3] ?? process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3033/oauth/callback";
const SCOPES = "https://www.googleapis.com/auth/gmail.compose";
const ENV_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n❌  Missing credentials.\n\n" +
    "Usage:\n" +
    "  node scripts/setup-gmail.mjs <client_id> <client_secret>\n\n" +
    "Get them at: https://console.cloud.google.com → APIs & Services → Credentials\n" +
    "  1. Create OAuth 2.0 Client ID (Desktop app)\n" +
    "  2. Add http://localhost:3033/oauth/callback to Authorized Redirect URIs\n" +
    "  3. Enable Gmail API at: https://console.cloud.google.com/apis/library/gmail.googleapis.com\n"
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth" +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&access_type=offline` +
  `&prompt=consent`;

console.log("\n🔑  Opening browser for Google consent…\n");

// Open browser
exec(
  process.platform === "darwin"
    ? `open "${authUrl}"`
    : process.platform === "win32"
    ? `start "${authUrl}"`
    : `xdg-open "${authUrl}"`
);

// Local callback server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3033");
  if (url.pathname !== "/oauth/callback") return;

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(400);
    res.end(`<h2>❌ ${error ?? "No code returned"}</h2><p>Close this tab and try again.</p>`);
    server.close();
    return;
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.refresh_token) {
    res.writeHead(400);
    res.end("<h2>❌ No refresh token returned.</h2><p>Make sure you passed <code>prompt=consent</code>. Try revoking access at <a href='https://myaccount.google.com/permissions'>myaccount.google.com/permissions</a> and running again.</p>");
    server.close();
    return;
  }

  // Write to .env.local
  let env = readFileSync(ENV_PATH, "utf8");

  function setVar(content, key, value) {
    const re = new RegExp(`^${key}=.*$`, "m");
    const line = `${key}=${value}`;
    return re.test(content) ? content.replace(re, line) : content + `\n${line}`;
  }

  env = setVar(env, "GMAIL_CLIENT_ID", CLIENT_ID);
  env = setVar(env, "GMAIL_CLIENT_SECRET", CLIENT_SECRET);
  env = setVar(env, "GMAIL_REFRESH_TOKEN", tokens.refresh_token);
  writeFileSync(ENV_PATH, env);

  console.log("\n✅  Refresh token saved to .env.local.");
  console.log("    Restart the dev server: npm run dev\n");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    "<h2 style='font-family:sans-serif;margin:2rem'>✅ Gmail connected!</h2>" +
    "<p style='font-family:sans-serif'>Refresh token saved. You can close this tab and restart the dev server.</p>"
  );
  server.close();
});

server.listen(3033, () => {
  console.log("Waiting for Google callback on http://localhost:3033…\n");
});
