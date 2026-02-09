/**
 * Vercel Blob video storage configuration
 * Videos are stored in Vercel Blob and referenced by their URLs
 *
 * Migration in progress:
 * - Currently serving from public/videos/ directory
 * - Will be migrated to Vercel Blob once token is verified
 */

export const WHATS_THE_BIG_IDEA_VIDEOS = [
  {
    id: 'whats-the-big-idea_01',
    title: 'What\'s the Big Idea? Episode 1',
    description: 'First episode of the What\'s the Big Idea series',
    url: '/videos/whats-the-big-idea_01.mp4', // Serving from public/videos/ for now
    duration: '~5 min',
  },
  {
    id: 'whats-the-big-idea_02',
    title: 'What\'s the Big Idea? Episode 2',
    description: 'Second episode of the What\'s the Big Idea series',
    url: '/videos/whats-the-big-idea_02.mp4', // Serving from public/videos/ for now
    duration: '~5 min',
  },
  {
    id: 'whats-the-big-idea_03',
    title: 'What\'s the Big Idea? Episode 3',
    description: 'Third episode of the What\'s the Big Idea series',
    url: '/videos/whats-the-big-idea_03.mp4', // Serving from public/videos/ for now
    duration: '~5 min',
  },
  {
    id: 'whats-the-big-idea_04',
    title: 'What\'s the Big Idea? Episode 4',
    description: 'Fourth episode of the What\'s the Big Idea series',
    url: '/videos/whats-the-big-idea_04.mp4', // Serving from public/videos/ for now
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
