import Link from "next/link";
import Image from "next/image";
import type { FeatureArticle } from "@/lib/feature";

interface FeatureCardProps {
  article: FeatureArticle;
  index: number;
}

export default function FeatureCard({ article, index }: FeatureCardProps) {
  const staggerClass = index < 4 ? `stagger-${(index % 4) + 1}` : "";

  return (
    <div className={`animate-fadeInUp ${staggerClass}`}>
      <Link href={`/feature/${article.slug}`} className="block group h-full">
        <article className="card overflow-hidden h-full flex flex-col relative">
          <div className="relative h-48 w-full overflow-hidden bg-charcoal/5">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-6 flex flex-col flex-1">
            <span className="text-xs font-mono text-slate uppercase tracking-widest mb-3">
              Feature
            </span>

            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-ember transition-colors capitalize">
              {article.title}
            </h3>

            <p className="text-foreground-muted text-sm leading-relaxed mb-4 flex-1">
              {article.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <time
                dateTime={article.publishedDate}
                className="font-mono text-xs text-slate"
              >
                {new Date(article.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-sm text-ember font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-ember to-copper transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </article>
      </Link>
    </div>
  );
}
