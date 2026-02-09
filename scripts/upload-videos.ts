/**
 * Script to upload videos to Vercel Blob
 * Usage: npx tsx scripts/upload-videos.ts
 *
 * Prerequisites:
 * - Set BLOB_READ_WRITE_TOKEN environment variable
 * - Place video files in public/videos/ directory
 */

import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const videosDir = path.join(process.cwd(), 'public/videos');
const videoFiles = [
  'whats-the-big-idea_01.mp4',
  'whats-the-big-idea_02.mp4',
  'whats-the-big-idea_03.mp4',
  'whats-the-big-idea_04.mp4',
];

async function uploadVideos() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('Error: BLOB_READ_WRITE_TOKEN environment variable not set');
    console.error('Set it in your .env.local file:');
    console.error('BLOB_READ_WRITE_TOKEN=<your-token>');
    process.exit(1);
  }

  console.log('Starting video uploads to Vercel Blob...\n');

  const uploadedUrls: Record<string, string> = {};

  for (const filename of videoFiles) {
    const filePath = path.join(videosDir, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const fileSizeGB = (fileBuffer.length / (1024 * 1024 * 1024)).toFixed(2);

      console.log(`📤 Uploading ${filename} (${fileSizeGB} GB)...`);

      const blob = await put(`videos/${filename}`, fileBuffer, {
        access: 'public',
        cacheControlMaxAge: 86400 * 365, // 1 year cache
      });

      uploadedUrls[filename] = blob.url;
      console.log(`✅ Uploaded: ${blob.url}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}:`, error);
    }
  }

  // Display results
  console.log('\n📋 Upload Summary:');
  console.log('================\n');
  Object.entries(uploadedUrls).forEach(([filename, url]) => {
    console.log(`${filename}:`);
    console.log(`${url}\n`);
  });

  // Display code snippet for updating video-storage.ts
  if (Object.keys(uploadedUrls).length > 0) {
    console.log('\n📝 Update src/lib/video-storage.ts with these URLs:');
    console.log('================\n');
    console.log('export const WHATS_THE_BIG_IDEA_VIDEOS = [');
    videoFiles.forEach((filename, index) => {
      const url = uploadedUrls[filename] || '';
      console.log(`  {`);
      console.log(`    id: '${filename.replace('.mp4', '')}',`);
      console.log(`    url: '${url}',`);
      console.log(`    // ... other fields`);
      console.log(`  },`);
    });
    console.log('];');
  }
}

uploadVideos().catch(console.error);
