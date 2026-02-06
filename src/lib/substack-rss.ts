import Parser from 'rss-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  thumbnail?: string;
  content?: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'thumbnail'],
      ['content:encoded', 'content'],
    ],
  },
});

/**
 * Fetch the latest posts from Substack RSS feed
 * @param limit Number of posts to fetch (default: 1)
 * @returns Array of Substack posts
 */
export async function getLatestSubstackPosts(limit: number = 1): Promise<SubstackPost[]> {
  try {
    const feed = await parser.parseURL('https://sarenai.substack.com/feed');
    const items = feed.items?.slice(0, limit) ?? [];
    return items.map(item => {
      // Extract thumbnail from content:encoded if available
      let thumbnail = '';
      const content = (item as any).content || item.content || '';
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        thumbnail = imgMatch[1];
      }
      const contentSnippetRaw = item.contentSnippet;
      const contentSnippetValue = contentSnippetRaw
        ? contentSnippetRaw.substring(0, 160) + '...'
        : '';
      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        contentSnippet: contentSnippetValue,
        thumbnail,
        content,
      };
    });
  } catch (error) {
    console.error('Failed to fetch Substack RSS:', error);
    return [];
  }
}
