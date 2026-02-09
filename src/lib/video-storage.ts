/**
 * Vercel Blob video storage configuration
 * Videos are stored in Vercel Blob and referenced by their URLs
 */

export const WHATS_THE_BIG_IDEA_VIDEOS = [
  {
    id: 'whats-the-big-idea_01',
    title: 'What\'s the Big Idea? Episode 1',
    description: 'First episode of the What\'s the Big Idea series',
    url: '', // Will be populated after upload to Vercel Blob
    duration: '~5 min',
  },
  {
    id: 'whats-the-big-idea_02',
    title: 'What\'s the Big Idea? Episode 2',
    description: 'Second episode of the What\'s the Big Idea series',
    url: '', // Will be populated after upload to Vercel Blob
    duration: '~5 min',
  },
  {
    id: 'whats-the-big-idea_03',
    title: 'What\'s the Big Idea? Episode 3',
    description: 'Third episode of the What\'s the Big Idea series',
    url: '', // Will be populated after upload to Vercel Blob
    duration: '~5 min',
  },
  {
    id: 'whats-the-big-idea_04',
    title: 'What\'s the Big Idea? Episode 4',
    description: 'Fourth episode of the What\'s the Big Idea series',
    url: '', // Will be populated after upload to Vercel Blob
    duration: '~5 min',
  },
];

/**
 * Update video URL after Vercel Blob upload
 * Call this during deployment or manually after uploading videos
 */
export function updateVideoUrl(
  videoId: string,
  blobUrl: string
): typeof WHATS_THE_BIG_IDEA_VIDEOS {
  return WHATS_THE_BIG_IDEA_VIDEOS.map((video) =>
    video.id === videoId ? { ...video, url: blobUrl } : video
  );
}
