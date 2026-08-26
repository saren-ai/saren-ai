export type SchemaNode = Record<string, unknown>;

export interface TrailItem {
  href?: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export interface ArticleInput {
  headline: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  about?: string[];
}

export type PageType = "WebPage" | "AboutPage" | "ProfilePage" | "CollectionPage" | "ContactPage";

export interface PageGraphInput {
  path: string;
  pageType?: PageType;
  name: string;
  description: string;
  dateModified?: string;
  image?: string;
  /** Person node detail level. Default "lean". Use "full" only where the career
   * detail (knowsAbout/skills/alumniOf) is actually rendered on the page. */
  identity?: "full" | "lean";
  breadcrumb?: TrailItem[];
  article?: ArticleInput;
  faq?: FAQItem[];
  /** Page-specific nodes: HowTo, Service, OfferCatalog, ItemList, etc. */
  extra?: SchemaNode[];
  /** LocalBusiness is backed by sitewide-visible footer text — on by default. */
  includeLocalBusiness?: boolean;
}
