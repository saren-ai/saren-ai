import { NextResponse } from 'next/server';

/**
 * Reddit JSON proxy.
 *
 * Reddit IP-blocks GitHub Actions runners (and most cloud IPs), returning a
 * 403 anti-bot HTML page instead of JSON. This route fetches from Vercel's
 * edge network, which Reddit accepts, and relays the JSON back.
 *
 * Consumed by: github.com/saren-ai/daily-email-summaries (Reddit B2B Digest workflow)
 *
 * Query params:
 *   - subreddit: defaults to "b2bmarketing"
 *   - limit: defaults to "50" (max 100 per Reddit's API)
 *
 * Auth: Requires `Authorization: Bearer ${REDDIT_PROXY_SECRET}` header.
 */

export const runtime = 'edge';

const SUBREDDIT_PATTERN = /^[A-Za-z0-9_]{1,50}$/;

export async function GET(request: Request) {
    const secret = process.env.REDDIT_PROXY_SECRET;
    if (!secret) {
        return NextResponse.json(
            { error: 'REDDIT_PROXY_SECRET not configured' },
            { status: 500 }
        );
    }

    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${secret}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const subreddit = searchParams.get('subreddit') ?? 'b2bmarketing';
    const limitParam = searchParams.get('limit') ?? '50';

    if (!SUBREDDIT_PATTERN.test(subreddit)) {
        return NextResponse.json({ error: 'Invalid subreddit name' }, { status: 400 });
    }

    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 50, 1), 100);

    const upstreamUrl = `https://www.reddit.com/r/${subreddit}/.json?limit=${limit}`;

    try {
        const upstream = await fetch(upstreamUrl, {
            headers: {
                'User-Agent': 'saren.ai-reddit-proxy:v1 (by u/saren-ai)',
                Accept: 'application/json',
            },
            cache: 'no-store',
        });

        if (!upstream.ok) {
            const body = await upstream.text();
            return NextResponse.json(
                {
                    error: 'Upstream Reddit request failed',
                    status: upstream.status,
                    body: body.slice(0, 500),
                },
                { status: 502 }
            );
        }

        const data = await upstream.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Proxy fetch threw',
                message: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
