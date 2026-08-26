export const SITE_URL = "https://saren.ai";
export const ORG_URL = "https://identogram.com";

export const ID = {
  person: `${SITE_URL}/#person`,
  organization: `${ORG_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  localBusiness: `${SITE_URL}/#localbusiness`,
} as const;

function trimPath(path: string): string {
  if (path === "/" || path === "") return "";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Canonical absolute URL for a site-relative path ("/" or "/about"). */
export function pageUrl(path: string): string {
  return `${SITE_URL}${trimPath(path)}`;
}

export function webPageId(path: string): string {
  return `${pageUrl(path)}/#webpage`;
}

export function articleId(path: string): string {
  return `${pageUrl(path)}/#article`;
}

export function breadcrumbId(path: string): string {
  return `${pageUrl(path)}/#breadcrumb`;
}

export function workId(path: string): string {
  return `${pageUrl(path)}/#work`;
}

export function howToId(path: string): string {
  return `${pageUrl(path)}/#howto`;
}

export function serviceId(path: string): string {
  return `${pageUrl(path)}/#service`;
}

export function listId(path: string): string {
  return `${pageUrl(path)}/#list`;
}

export function definedTermSetId(path: string): string {
  return `${pageUrl(path)}/#termset`;
}
