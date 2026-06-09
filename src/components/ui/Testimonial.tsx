import Image from "next/image";

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Optional headshot path under /public */
  image?: string;
}

export function Testimonial({ item }: { item: TestimonialItem }) {
  return (
    <figure className="p-6 md:p-8 bg-card rounded-lg border border-border">
      <blockquote className="text-charcoal dark:text-foreground leading-relaxed mb-6">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-semibold text-charcoal dark:text-foreground text-sm">
            {item.name}
          </div>
          <div className="text-xs text-slate dark:text-foreground-muted">
            {item.title}, {item.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Renders nothing while `items` is empty — the slot ships dark until real,
 * attributed quotes exist. Never populate with invented testimonials.
 * Add Review schema only once real quotes land, and wire it to the
 * Person/Organization — not the Service (self-review markup risk).
 */
export function TestimonialGrid({
  items,
  title = "What clients say",
}: {
  items: TestimonialItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="section bg-ash dark:bg-background">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-10">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Testimonial key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
