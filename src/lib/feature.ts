export interface FeatureArticle {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  heroImage: string;
}

export const featureArticles: FeatureArticle[] = [
  {
    slug: "kwannon-timeline",
    title: "Kwannon timeline",
    description:
      "A fan-made interactive timeline of Kwannon and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
    publishedDate: "2026-02-09",
    heroImage: "/images/og/portfolio-psylocke.png",
  },
];
