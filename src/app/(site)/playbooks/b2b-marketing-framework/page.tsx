import fs from 'fs/promises';
import path from 'path';
import B2BFrameworkClient from './B2BFrameworkClient';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    return {
        title: 'B2B SaaS Marketing Framework: 21-Step AI Positioning System | Saren.ai',
        description: 'An interactive 21-step prompt sequence for building B2B SaaS positioning from scratch — ICP definition, messaging pillars, value proposition, sales playbook, and launch-ready narrative.',
        alternates: { canonical: 'https://saren.ai/playbooks/b2b-marketing-framework' },
        openGraph: {
            title: 'B2B SaaS Marketing Framework: 21-Step AI Positioning System | Saren.ai',
            description: 'An interactive 21-step prompt sequence for building B2B SaaS positioning from scratch — ICP definition, messaging pillars, value proposition, sales playbook, and launch-ready narrative.',
            url: 'https://saren.ai/playbooks/b2b-marketing-framework',
            siteName: 'Saren.ai',
            images: [{ url: '/images/portfolio/marketing-framework-og.png', width: 1200, height: 630 }],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'B2B SaaS Marketing Framework: 21-Step AI Positioning System',
            description: '21 AI prompt sequences for B2B SaaS positioning — ICP, messaging pillars, value proposition, sales playbook, and launch-ready narrative.',
            images: ['/images/portfolio/marketing-framework-og.png'],
        },
    };
}

export interface PromptStep {
    id: string;
    title: string;
    level: string;
    content: string;
    stepNumber: number;
}

export default async function B2BFrameworkPage() {
    const baseDir = path.join(process.cwd(), 'src/content/playbooks/b2b-marketing-framework');

    let variablesContent = '';
    try {
        variablesContent = await fs.readFile(path.join(baseDir, 'variables.md'), 'utf-8');
    } catch (e) {
        console.error('Error reading variables.md:', e);
        notFound();
    }

    // Read all prompt directories
    const levels = [
        'L1_Foundational_Elements',
        'L2_Core_Identity',
        'L3_Core_Message',
        'L4_Message_Articulation',
        'L5_Supporting_Context',
        'L6_Activation_&_Governance',
        'L7_Evolution_&_Refinement',
    ];

    const steps: PromptStep[] = [];

    for (const level of levels) {
        try {
            const levelDir = path.join(baseDir, level);
            const files = await fs.readdir(levelDir);

            // Sort files alphabetically to ensure correct order
            files.sort();

            for (const file of files) {
                if (file.endsWith('.md')) {
                    const content = await fs.readFile(path.join(levelDir, file), 'utf-8');
                    const title = file.replace('.md', '').replace(/_/g, ' ');

                    // Extract step number if it exists at the start of the title (e.g., "01 ")
                    const match = title.match(/^(\d+)\s(.*)/);
                    let stepNumber = steps.length + 1;
                    let cleanTitle = title;

                    if (match) {
                        stepNumber = parseInt(match[1], 10);
                        cleanTitle = match[2];
                    }

                    steps.push({
                        id: file,
                        title: cleanTitle,
                        level: level.replace(/_/g, ' '),
                        content,
                        stepNumber
                    });
                }
            }
        } catch (e) {
            console.warn(`Could not read level directory: ${level}`);
        }
    }

    if (steps.length === 0) {
        notFound();
    }

    function extractStepDescription(content: string, title: string): string {
        const lines = content.split('\n');
        let afterHeading = false;
        for (const line of lines) {
            const t = line.trim();
            if (!t) { if (afterHeading) continue; continue; }
            if (t.startsWith('#')) { afterHeading = true; continue; }
            if (afterHeading && t.length > 20) {
                return t.replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '').slice(0, 220);
            }
        }
        return title;
    }

    const howToSteps = steps.map((step) => ({
        "@type": "HowToStep",
        "position": step.stepNumber,
        "name": step.title,
        "text": extractStepDescription(step.content, step.title)
    }));

    return (
        <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/playbooks/b2b-marketing-framework/#webpage",
            "url": "https://saren.ai/playbooks/b2b-marketing-framework",
            "name": "B2B Marketing Framework | Playbooks",
            "description": "An interactive, 21-step tracked sequence to engineer your B2B SaaS positioning from scratch.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-04-01"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
              { "@type": "ListItem", "position": 2, "name": "Playbooks", "item": "https://saren.ai/playbooks" },
              { "@type": "ListItem", "position": 3, "name": "B2B Marketing Framework", "item": "https://saren.ai/playbooks/b2b-marketing-framework" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "@id": "https://saren.ai/playbooks/b2b-marketing-framework/#howto",
            "name": "B2B Marketing Framework: 21-Step Positioning System",
            "description": "An interactive, 21-step prompt-driven sequence to engineer complete B2B SaaS positioning from scratch — covering customer profiles, brand identity, core messaging, message articulation, supporting context, governance, and continuous improvement.",
            "url": "https://saren.ai/playbooks/b2b-marketing-framework",
            "author": { "@id": "https://saren.ai/#person" },
            "totalTime": "PT4H",
            "keywords": "B2B marketing framework, SaaS positioning, brand strategy, messaging framework, GTM, content strategy",
            "step": howToSteps
          })
        }}
      />
        <div className="min-h-screen bg-offblack text-white pt-24 pb-20 px-6 lg:px-12 selection:bg-lavender/30">
            <B2BFrameworkClient initialSteps={steps} variablesContent={variablesContent} />
        </div>
        </>
    );
}
