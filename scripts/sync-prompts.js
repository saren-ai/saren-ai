const fs = require('fs');
const https = require('https');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/marketing-framework.ts');

// Extract IDs and GitHub URLs from the file
const content = fs.readFileSync(DATA_FILE, 'utf8');
const regex = /id:\s*"([^"]+)",[\s\S]*?githubUrl:\s*"([^"]+)"/g;

const prompts = [];
let match;
while ((match = regex.exec(content)) !== null) {
    prompts.push({
        id: match[1],
        githubUrl: match[2]
    });
}

console.log(`Found ${prompts.length} prompts to sync.`);

const fetchRawContent = (url) => {
    return new Promise((resolve, reject) => {
        // Convert to raw URL
        const rawUrl = url
            .replace('github.com', 'raw.githubusercontent.com')
            .replace('/blob/', '/');

        https.get(rawUrl, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${rawUrl}: ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
};

const updatePrompts = async () => {
    let newFileContent = content;

    for (const prompt of prompts) {
        try {
            console.log(`Syncing ${prompt.id}...`);
            const rawContent = await fetchRawContent(prompt.githubUrl);

            // Escape backticks and dollar signs for template literal and replace string
            // We need $$ to produce a literal $ in the replacement string
            const escapedContent = rawContent.replace(/`/g, '\\`').replace(/\$/g, '$$$$');

            // Replace content in file
            // We search for the ID, then look ahead for promptContent
            const promptRegex = new RegExp(`(id:\\s*"${prompt.id}"[\\s\\S]*?promptContent:\\s*)\`[\\s\\S]*?\`([\\s\\S]*?)`, '');

            if (promptRegex.test(newFileContent)) {
                newFileContent = newFileContent.replace(promptRegex, `$1\`${escapedContent}\`$2`);
            } else {
                console.warn(`Could not find promptContent block for ${prompt.id}`);
            }

        } catch (error) {
            console.error(`Error syncing ${prompt.id}:`, error.message);
        }
    }

    fs.writeFileSync(DATA_FILE, newFileContent);
    console.log('Update complete.');
};

updatePrompts();
