import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

/**
 * Automatically submit Saren.ai URLs to the IndexNow API
 * This can be run automatically by a Vercel Cron Job on a daily schedule
 */
export async function GET(request: Request) {
    // Prevent abuse of the quota endpoint by ensuring it is authenticated via Vercel Cron
    // If CRON_SECRET is missing (e.g. strict local dev environment), allow it as fallback.
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const sitemapUrls = sitemap();
        const urls = sitemapUrls.map((item) => item.url);

        const indexNowData = {
            host: 'saren.ai',
            key: '802318bbd0a34b2d907f1ae8e68cfbca',
            keyLocation: 'https://saren.ai/802318bbd0a34b2d907f1ae8e68cfbca.txt',
            urlList: urls,
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(indexNowData),
        });

        if (response.ok) {
            return NextResponse.json({
                success: true,
                message: 'IndexNow submission successful',
                submittedLength: urls.length
            });
        } else {
            const errorText = await response.text();
            return NextResponse.json(
                { success: false, message: 'IndexNow API error', error: errorText },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('IndexNow submission failed:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
