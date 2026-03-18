import { marked } from 'marked';

async function runTest() {
    const rawContent = `
## ### PROMPT 1 – Deep Market & Competitive Intelligence Engine

You are a tier-1 GTM strategist with 15+ years building $100M+ B2B growth engines.

* Category they claim
* Real category they operate in
* Differentiation angle

Direct (same category)
Adjacent (solving same pain differently)
`;

    function cleanMarkdown(content) {
        if (!content) return '';

        const lines = content.split('\\n');
        let inList = false;

        const cleanedLines = lines.map(line => {
            let trimmed = line.trim();

            if (trimmed.startsWith('#')) {
                let level = 0;
                let i = 0;
                while (i < trimmed.length && (trimmed[i] === '#' || trimmed[i] === ' ')) {
                    if (trimmed[i] === '#') level++;
                    i++;
                }

                if (level > 0 && level <= 6) {
                    const text = trimmed.substring(i).trim();
                    return '#'.repeat(level) + ' ' + text;
                }
            }

            const listMatch = trimmed.match(/^([*+-])([^\\s*+-])/);
            if (listMatch) {
                return trimmed.replace(/^([*+-])([^\\s*+-])/, '- $2');
            }

            if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\\d+\\.\\s/.test(trimmed)) {
                inList = true;
                return trimmed;
            } else if (trimmed === '' && inList) {
                return trimmed;
            } else if (trimmed !== '') {
                inList = false;
            }

            return line;
        });

        return cleanedLines.join('\\n');
    }

    const cleanedContent = cleanMarkdown(rawContent);
    console.log("--- CLEANED CONTENT ---");
    console.log(cleanedContent);

    const parsed = await marked.parse(cleanedContent);
    console.log("\\n--- PARSED HTML ---");
    console.log(parsed);
}

runTest();
