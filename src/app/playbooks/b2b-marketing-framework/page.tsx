import fs from 'fs/promises';
import path from 'path';
import B2BFrameworkClient from './B2BFrameworkClient';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    return {
        title: 'B2B Marketing Framework | Playbooks',
        description: 'An interactive, 21-step tracked sequence to engineer your B2B SaaS positioning from scratch.',
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

    return (
        <div className="min-h-screen bg-offblack text-white pt-24 pb-20 px-6 lg:px-12 selection:bg-electric/30">
            <B2BFrameworkClient initialSteps={steps} variablesContent={variablesContent} />
        </div>
    );
}
