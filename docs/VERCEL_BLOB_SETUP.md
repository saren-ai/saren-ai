# Vercel Blob Setup Guide

This guide walks you through uploading the "What's the Big Idea?" video series to Vercel Blob storage.

## Why Vercel Blob?

- **Large file support**: Store videos up to 50GB each
- **No Git overhead**: Videos don't bloat your repository
- **Global CDN**: Videos stream fast worldwide
- **Simple integration**: Native support in Next.js
- **Cost-effective**: Pay only for storage and bandwidth used

## Prerequisites

1. **Video files** - Must have these files locally:
   - `whats-the-big-idea_01.mp4`
   - `whats-the-big-idea_02.mp4`
   - `whats-the-big-idea_03.mp4`
   - `whats-the-big-idea_04.mp4`

2. **Vercel account** - You likely already have this (deployment)

## Step 1: Get Your Blob API Token

1. Visit: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Set:
   - **Name**: "Blob Videos" (or any descriptive name)
   - **Scope**: Select "Blob"
4. Copy the token (you'll use it in the next step)

## Step 2: Set Up Environment Variable

1. Create or open `.env.local` in your project root:
   ```bash
   touch .env.local
   ```

2. Add your token:
   ```
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```

3. **IMPORTANT**: Never commit `.env.local` to Git. It's already in `.gitignore`.

## Step 3: Prepare Your Video Files

Place your video files in the `public/videos/` directory:

```
public/
└── videos/
    ├── whats-the-big-idea_01.mp4
    ├── whats-the-big-idea_02.mp4
    ├── whats-the-big-idea_03.mp4
    └── whats-the-big-idea_04.mp4
```

## Step 4: Upload Videos

Run the upload script:

```bash
npx tsx scripts/upload-videos.ts
```

This will:
1. Read each video file from `public/videos/`
2. Upload it to Vercel Blob with 1-year cache
3. Display the CDN URL for each file
4. Show you the code to add to `src/lib/video-storage.ts`

Expected output:
```
📤 Uploading whats-the-big-idea_01.mp4 (0.07 GB)...
✅ Uploaded: https://xxxxx.blob.vercel-storage.com/videos/whats-the-big-idea_01-xxxxx.mp4

📋 Upload Summary:
================
whats-the-big-idea_01.mp4:
https://xxxxx.blob.vercel-storage.com/videos/whats-the-big-idea_01-xxxxx.mp4
...
```

## Step 5: Update Video URLs

Copy the URLs from the script output and update `src/lib/video-storage.ts`:

```typescript
export const WHATS_THE_BIG_IDEA_VIDEOS = [
  {
    id: 'whats-the-big-idea_01',
    title: 'What\'s the Big Idea? Episode 1',
    description: 'First episode of the What\'s the Big Idea series',
    url: 'https://xxxxx.blob.vercel-storage.com/videos/whats-the-big-idea_01-xxxxx.mp4',
    duration: '~5 min',
  },
  // ... repeat for episodes 2-4
];
```

## Step 6: Verify & Deploy

1. Test locally:
   ```bash
   npm run dev
   ```
   Visit `/podcast/scaling-smarter` and confirm videos play

2. Commit your changes:
   ```bash
   git add src/lib/video-storage.ts
   git commit -m "feat: Add Vercel Blob URLs for video content"
   git push origin main
   ```

3. Vercel will auto-deploy. Your videos are now live! 🎉

## Cleanup (Optional)

Once videos are uploaded and working:

```bash
rm -rf public/videos/
```

This removes local video files since they're now on Vercel Blob.

## Troubleshooting

### "BLOB_READ_WRITE_TOKEN not set"

Make sure you created `.env.local` with the token before running the script.

### "File not found"

Verify the video files are in `public/videos/` with correct filenames (case-sensitive).

### "Upload failed"

- Check your token is valid at https://vercel.com/account/tokens
- Ensure token has "Blob" scope
- Verify you're connected to the internet

### Videos aren't showing in carousel

- Check that URLs in `src/lib/video-storage.ts` are correct
- Verify the URLs are publicly accessible (not private/expired)
- Check browser console for CORS or network errors

## Management

### View all uploaded videos

Visit: https://vercel.com/account/storage/blob

### Delete videos

1. Go to https://vercel.com/account/storage/blob
2. Find the file and delete it
3. Update `src/lib/video-storage.ts` to remove or replace the URL

### Update videos

1. Delete old video from Vercel Blob
2. Upload new version with same filename
3. Update URL in `src/lib/video-storage.ts`

## API Reference

The upload infrastructure includes:

- **`src/app/api/upload-video/route.ts`** - Server endpoint for uploads
- **`src/lib/video-storage.ts`** - Video metadata and URLs
- **`scripts/upload-videos.ts`** - Local upload utility

You can also implement UI-based uploads using the API endpoint if needed.

## Cost Estimation

As of 2024:
- **Storage**: $0.15 per GB/month
- **Retrieval**: $0.01 per GB
- **Free tier**: Up to 1 GB included

With 4 videos (~300MB total):
- Monthly storage: ~$0.05
- Retrieval cost: Depends on traffic (minimal for typical usage)

[Vercel Pricing](https://vercel.com/pricing)
