import Image from 'next/image';
import { SubstackPost } from '@/lib/substack-rss';

interface SubstackLatestPostProps {
  post: SubstackPost | null;
}

export function SubstackLatestPost({ post }: SubstackLatestPostProps) {
  if (!post) {
    return (
      <div className="text-sm text-foreground-muted italic">
        No recent posts available
      </div>
    );
  }

  // Validate required fields
  if (!post.title || !post.link) {
    return (
      <div className="text-sm text-foreground-muted italic">
        No recent posts available
      </div>
    );
  }

  const postDate = post.pubDate
    ? new Date(post.pubDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Post Image */}
      <div className="flex items-center justify-center">
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full aspect-square max-w-xs rounded-xl overflow-hidden bg-gradient-to-br from-charcoal/5 to-electric/5 dark:from-charcoal dark:to-offblack border border-border dark:border-ember/20"
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 1024px) 100vw, 300px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <svg
                  className="w-16 h-16 mx-auto text-foreground-muted/30 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <p className="text-xs text-foreground-muted">
                  View on Substack
                </p>
              </div>
            </div>
          )}
        </a>
      </div>

      {/* Middle Column: Post Details */}
      <div className="flex flex-col justify-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
          Latest from Substack
        </div>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <h4 className="text-xl font-bold text-foreground group-hover:text-ember transition-colors mb-3 leading-tight">
            {post.title}
          </h4>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">
            {post.contentSnippet}
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <time dateTime={post.pubDate}>{postDate}</time>
            <span>•</span>
            <span className="text-ember font-medium group-hover:underline">
              Read on Substack →
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
