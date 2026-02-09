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
      ['media:thumbnail', 'mediaThumbnail'],
      ['content:encoded', 'contentEncoded'],
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyItem = item as any;

      // Extract thumbnail: try enclosure first, then content:encoded img tags
      let thumbnail = '';
      const enclosureUrl = anyItem.enclosure?.url;
      if (enclosureUrl && anyItem.enclosure?.type?.startsWith('image')) {
        thumbnail = enclosureUrl;
      }
      if (!thumbnail) {
        const encoded = anyItem.contentEncoded || '';
        const imgMatch = encoded.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }
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
        content: anyItem.contentEncoded || item.content || '',
      };
    });
  } catch (error) {
    console.error('Failed to fetch Substack RSS:', error);
    return [];
  }
}
