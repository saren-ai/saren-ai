import fs from 'fs/promises';
import path from 'path';

export interface PlaybookStep {
    step: number;
    title: string;
    file: string;
    note?: string;
    content?: string;
}

export interface Playbook {
    playbook_id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    status: 'active' | 'archived';
    steps: PlaybookStep[];
}

export interface Prompt {
    id: string;
    title: string;
    file: string;
    category: string[];
    tags: string[];
    date: string;
    series_id?: string;
    series_step?: number;
}

export interface Catalog {
    meta: {
        generated: string;
        archive_cutoff: string;
        total_prompts_active: number;
        total_prompts_archived: number;
        total_playbooks: number;
        active_playbooks: number;
        archived_playbooks: number;
    };
    playbooks: Playbook[];
    prompts: {
        active: Prompt[];
        archived: Prompt[];
    };
}

const PLAYBOOKS_DIR = path.join(process.cwd(), 'playbook-prompts');
const CATALOG_FILE = path.join(PLAYBOOKS_DIR, 'prompt_catalog.json');

let catalogCache: Catalog | null = null;

export async function getCatalog(): Promise<Catalog> {
    if (catalogCache) return catalogCache;
    const data = await fs.readFile(CATALOG_FILE, 'utf-8');
    catalogCache = JSON.parse(data) as Catalog;
    return catalogCache;
}

export async function getActivePlaybooks(): Promise<Playbook[]> {
    const catalog = await getCatalog();
    return catalog.playbooks.filter((p) => p.status === 'active');
}

export async function getPlaybookById(id: string): Promise<Playbook | undefined> {
    const catalog = await getCatalog();
    return catalog.playbooks.find((p) => p.playbook_id === id);
}

export async function getPromptContent(filePath: string): Promise<string> {
    try {
        const fullPath = path.join(PLAYBOOKS_DIR, filePath);
        return await fs.readFile(fullPath, 'utf-8');
    } catch (error) {
        console.error(`Error reading prompt file: ${filePath}`, error);
        return '';
    }
}

export async function getPlaybookWithContent(id: string): Promise<Playbook | undefined> {
    const playbook = await getPlaybookById(id);
    if (!playbook) return undefined;

    // Deep clone to avoid mutating the cache
    const playbookWithContent = JSON.parse(JSON.stringify(playbook)) as Playbook;

    for (const step of playbookWithContent.steps) {
        if (step.file) {
            let rawContent = await getPromptContent(step.file);

            // Cleanup for formatting idiosyncrasies in the source markdown 
            // (e.g. "# ## Title", "## ### Subtitle")
            rawContent = rawContent.replace(/^#\s+##\s+/gm, '## ');
            rawContent = rawContent.replace(/^##\s+###\s+/gm, '### ');

            step.content = rawContent;
        }
    }

    return playbookWithContent;
}
