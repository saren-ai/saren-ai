const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  hellip: "…",
};

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&([a-zA-Z]+);/g, (match: string, name: string) => HTML_ENTITIES[name] ?? match);
}

function stripTags(input: string): string {
  return input.replace(/<[^>]+>/g, "");
}

function getAttr(tagAttrs: string, name: string): string {
  const match = tagAttrs.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? match[1] : "";
}

function resolveUrl(url: string, baseUrl: string): string {
  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return url;
  }
}

/** Pulls the page <title> and the (site) layout's <main> content out of full SSR HTML. */
export function extractMain(html: string): { title: string; body: string } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return {
    title: titleMatch ? decodeEntities(titleMatch[1]).trim() : "",
    body: mainMatch ? mainMatch[1] : html,
  };
}

/** Best-effort regex-based HTML→Markdown conversion for agent content negotiation. */
export function htmlToMarkdown(html: string, baseUrl: string): string {
  let out = html;

  out = out.replace(/<(script|style|svg|noscript)[^>]*>[\s\S]*?<\/\1>/gi, "");
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(/<br\s*\/?>/gi, "\n");

  for (let level = 1; level <= 6; level++) {
    const hashes = "#".repeat(level);
    const re = new RegExp(`<h${level}[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi");
    out = out.replace(re, (_match, inner: string) => `\n\n${hashes} ${stripTags(inner).trim()}\n\n`);
  }

  out = out.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, inner: string) => `**${stripTags(inner).trim()}**`);
  out = out.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, inner: string) => `*${stripTags(inner).trim()}*`);

  out = out.replace(
    /<pre[^>]*>[\s\S]*?<code[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/gi,
    (_m, inner: string) => `\n\n\`\`\`\n${decodeEntities(stripTags(inner))}\n\`\`\`\n\n`
  );
  out = out.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_m, inner: string) => `\`${stripTags(inner)}\``);

  out = out.replace(/<img\b([^>]*)>/gi, (_m, attrs: string) => {
    const src = getAttr(attrs, "src");
    if (!src) return "";
    const alt = getAttr(attrs, "alt");
    return `![${decodeEntities(alt)}](${resolveUrl(src, baseUrl)}) `;
  });

  out = out.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_m, attrs: string, inner: string) => {
    const text = stripTags(inner).trim();
    if (!text) return "";
    const href = getAttr(attrs, "href");
    return `${href ? `[${text}](${resolveUrl(href, baseUrl)})` : text} `;
  });

  out = out.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner: string) => `\n- ${stripTags(inner).trim()}`);

  out = out.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, inner: string) =>
    stripTags(inner)
      .trim()
      .split("\n")
      .map((line) => `> ${line.trim()}`)
      .filter((line) => line !== ">")
      .join("\n")
  );

  out = out.replace(/<\/(p|div|section|article|header|footer|ul|ol|table|tr)>/gi, "\n\n");

  out = stripTags(out);
  out = decodeEntities(out);

  out = out
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return out;
}
