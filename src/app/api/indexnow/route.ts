import { NextResponse } from 'next/server';

const SITE_URLS = [
  'https://saren.ai',
  'https://saren.ai/about',
  'https://saren.ai/about/clients',
  'https://saren.ai/about/concerts',
  'https://saren.ai/ai-orchestration',
  'https://saren.ai/work',
  'https://saren.ai/brand',
  'https://saren.ai/contact',
  'https://saren.ai/studio',
  'https://saren.ai/studio/ai-for-liberal-arts',
  'https://saren.ai/studio/oblique-techniques',
  'https://saren.ai/playbooks',
  'https://saren.ai/playbooks/b2b-marketing-framework',
  'https://saren.ai/case-studies',
  'https://saren.ai/case-studies/10-touch-sales-play',
  'https://saren.ai/case-studies/120-day-content-journey',
  'https://saren.ai/playbooks/hybrid-lead-scoring',
  'https://saren.ai/case-studies/dynamic-nurture',
  'https://saren.ai/case-studies/executive-dashboard',
  'https://saren.ai/playbooks/gtm-budget-calculator',
  'https://saren.ai/case-studies/intent-data',
  'https://saren.ai/playbooks/its-good-to-be-pitched',
  'https://saren.ai/playbooks/roi-simulator',
  'https://saren.ai/case-studies/sovereign-personas',
  'https://saren.ai/agentic-web',
  'https://saren.ai/agentic-web/human-experience',
  'https://saren.ai/agentic-web/machine-readability',
  'https://saren.ai/agentic-web/agent-access',
  'https://saren.ai/agentic-web/authority-engineering',
  'https://saren.ai/agentic-web/glossary',
  'https://saren.ai/signal-state',
  'https://saren.ai/signal-state/architecture',
  'https://saren.ai/signal-state/framework',
  'https://saren.ai/signal-state/signal-library',
  'https://saren.ai/signal-state/use-cases',
];

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
        const urls = SITE_URLS;

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
