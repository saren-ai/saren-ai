import fs from 'fs';
import path from 'path';

const inputPath = '/Users/saren/Documents/personal/@saren.ai/playbook-prompts/CMO Prompts/## 6 Claude GTM Strategy Prompts.md';
const outputDir = '/Users/saren/Documents/personal/@saren.ai/playbook-prompts/CMO Prompts/6 Claude GTM Strategy Prompts';

const content = fs.readFileSync(inputPath, 'utf-8');

// The file has a header, then prompts separated by `---` and a title `## ### PROMPT X - Title`
const prompts = content.split('---');

// prompts[0] is the header
const headerText = prompts[0];

for (let i = 1; i < prompts.length; i++) {
    const promptContent = prompts[i].trim();
    if (!promptContent) continue;

    // Extract title
    const lines = promptContent.split('\n');
    let title = `Prompt ${i}`;

    for (const line of lines) {
        if (line.trim().startsWith('## ### ')) {
            // e.g. "## ### PROMPT 1 – Deep Market & Competitive Intelligence Engine"
            const match = line.match(/PROMPT \d+ [–-] (.*)/);
            if (match && match[1]) {
                title = match[1].trim();
            }
            break;
        }
    }

    // Safe filename
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${i}_prompt_${safeTitle}.md`;
    const outputPath = path.join(outputDir, filename);

    fs.writeFileSync(outputPath, promptContent, 'utf-8');
    console.log(`Saved: ${filename}`);
}
