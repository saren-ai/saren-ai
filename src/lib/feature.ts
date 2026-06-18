export interface FeatureArticle {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  heroImage: string;
}

export const featureArticles: FeatureArticle[] = [
  {
    slug: "oblique-techniques",
    title: "Oblique Techniques",
    description:
      "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
    publishedDate: "2026-06-17",
    heroImage: "/images/feature/oblique-techniques-hero.png",
  },
  {
    slug: "psylocke-timeline",
    title: "Psylocke Timeline",
    description:
      "A fan-made interactive timeline of Kwannon and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
    publishedDate: "2026-02-09",
    heroImage: "/images/portfolio/portfolio-psylocke.png",
  },
];
