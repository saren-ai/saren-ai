// Verifies Cloudflare Access's signed JWT ourselves, on top of Cloudflare's own
// edge gate. Access only protects requests that go through the saren.ai domain —
// every Vercel project also answers on a *.vercel.app fallback that bypasses
// Cloudflare entirely, so /admin needs its own check that a request actually
// carries a token Access issued, not just "came from the internet."
// Runs on the Edge runtime (proxy.ts + route handlers) — Web Crypto only, no
// node:crypto, no JWT library.

interface Jwk {
  kid: string;
  kty: string;
  n: string;
  e: string;
}

let jwksCache: { keys: Jwk[]; fetchedAt: number } | null = null;
const JWKS_TTL_MS = 60 * 60 * 1000;

async function getJwks(teamDomain: string): Promise<Jwk[]> {
  if (jwksCache && Date.now() - jwksCache.fetchedAt < JWKS_TTL_MS) {
    return jwksCache.keys;
  }
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Failed to fetch Cloudflare Access JWKS: ${res.status}`);
  const data = (await res.json()) as { keys: Jwk[] };
  jwksCache = { keys: data.keys, fetchedAt: Date.now() };
  return data.keys;
}

function base64UrlToBytes(base64Url: string): Uint8Array {
  const padded = base64Url.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    base64Url.length + ((4 - (base64Url.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function decodeJwtPart(part: string): Record<string, unknown> {
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(part)));
}

export async function verifyCloudflareAccessJwt(
  token: string,
  teamDomain: string,
  aud: string
): Promise<boolean> {
  try {
    const [headerPart, payloadPart, signaturePart] = token.split(".");
    if (!headerPart || !payloadPart || !signaturePart) return false;

    const header = decodeJwtPart(headerPart);
    const payload = decodeJwtPart(payloadPart);

    if (header.alg !== "RS256") return false;

    const audience = payload.aud;
    const audMatches = Array.isArray(audience) ? audience.includes(aud) : audience === aud;
    if (!audMatches) return false;

    const exp = payload.exp;
    if (typeof exp !== "number" || exp * 1000 < Date.now()) return false;

    if (payload.iss !== `https://${teamDomain}`) return false;

    const jwks = await getJwks(teamDomain);
    const jwk = jwks.find((k) => k.kid === header.kid);
    if (!jwk) return false;

    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // .slice() copies into a plain ArrayBuffer-backed view — TS's BufferSource
    // type rejects the ArrayBufferLike-backed views these helpers produce.
    const signedData = new TextEncoder().encode(`${headerPart}.${payloadPart}`).slice();
    const signature = base64UrlToBytes(signaturePart).slice();

    return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, signature, signedData);
  } catch (err) {
    console.error("admin: Cloudflare Access JWT verification failed", err);
    return false;
  }
}

function extractAccessToken(req: Request): string | undefined {
  const headerToken = req.headers.get("cf-access-jwt-assertion");
  if (headerToken) return headerToken;

  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)CF_Authorization=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function isAuthorizedAdminRequest(req: Request): Promise<boolean> {
  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const aud = process.env.CF_ACCESS_AUD;
  if (!teamDomain || !aud) return false;

  const token = extractAccessToken(req);
  if (!token) return false;

  return verifyCloudflareAccessJwt(token, teamDomain, aud);
}
