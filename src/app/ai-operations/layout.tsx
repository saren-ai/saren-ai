
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Operations: Why AI Turns Marketing Into Engineering | Saren.ai',
    description: 'AI-native demand generation transforms marketing from guesswork into predictive infrastructure. Behavioral lead scoring, self-optimizing campaigns, and automated attribution that scales without headcount.',
    keywords: [
        'AI marketing operations',
        'AI demand generation',
        'predictive attribution',
        'behavioral lead scoring',
        'AI-powered marketing',
        'marketing automation AI',
        'fractional CMO AI',
        'demand gen engineering'
    ],
    openGraph: {
        title: 'AI Operations: Why AI Turns Marketing Into Engineering',
        description: 'How AI transforms demand gen into predictive infrastructure with behavioral scoring, self-optimizing campaigns, and automated scale.',
        type: 'article',
        url: 'https://saren.ai/ai-operations',
        images: ['/og-ai-operations.png']
    }
};

export default function AIOperationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
