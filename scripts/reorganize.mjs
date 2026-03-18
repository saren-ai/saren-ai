import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'playbook-prompts');
const CATALOG_PATH = path.join(BASE_DIR, 'prompt_catalog.json');

const PLAYBOOKS_DIR = path.join(BASE_DIR, 'Playbooks');
const PROMPTS_DIR = path.join(BASE_DIR, 'Prompts');
const UNCATEGORIZED_DIR = path.join(BASE_DIR, 'Uncategorized');

function safeName(name) {
    if (!name) return 'Unknown';
    return name.replace(/[^a-zA-Z0-9 -]/g, '').trim();
}

// Track valid files so we know what goes to Uncategorized
const validFiles = new Set();
validFiles.add(CATALOG_PATH); // Keep catalog in place
validFiles.add(path.join(BASE_DIR, '.DS_Store'));

function moveFileSafe(oldRelPath, newRelPath) {
    const oldPath = path.join(BASE_DIR, oldRelPath);
    const newPath = path.join(BASE_DIR, newRelPath);

    // Add both old and new to valid files, so it doesn't get swept into uncategorized later if moved early
    validFiles.add(oldPath);
    validFiles.add(newPath);

    if (oldPath === newPath) {
        return newRelPath;
    }

    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(path.dirname(newPath), { recursive: true });
        fs.copyFileSync(oldPath, newPath); // Copy instead of move for safety first
        console.log(`Moved: ${oldRelPath} -> ${newRelPath}`);
        return newRelPath;
    } else if (fs.existsSync(newPath)) {
        // Already moved in a previous run?
        console.log(`Already exists: ${newRelPath}`);
        return newRelPath;
    } else {
        console.warn(`MISSING FILE: ${oldRelPath}`);
        return oldRelPath; // Keep old path in JSON if file doesn't exist, though it will break NextJS
    }
}

async function run() {
    console.log("Starting Reorganization...");

    if (!fs.existsSync(CATALOG_PATH)) {
        console.error("FATAL: prompt_catalog.json not found!");
        process.exit(1);
    }

    const catalogRaw = fs.readFileSync(CATALOG_PATH, 'utf-8');
    const catalog = JSON.parse(catalogRaw);

    // 1. Process Playbooks
    if (catalog.playbooks) {
        for (const playbook of catalog.playbooks) {
            const pbSafeName = safeName(playbook.title);
            for (const step of playbook.steps) {
                if (step.file) {
                    const stepSafeTitle = safeName(step.title);
                    const newRelPath = path.join('Playbooks', pbSafeName, `${step.step}_${stepSafeTitle}.md`);

                    const actualNewRelPath = moveFileSafe(step.file, newRelPath);
                    step.file = actualNewRelPath.replace(/\\/g, '/'); // Unix style paths for JSON
                }
            }
        }
    }

    // 2. Process Active Prompts
    if (catalog.prompts && catalog.prompts.active) {
        for (const prompt of catalog.prompts.active) {
            if (prompt.file) {
                const catSafeName = safeName(prompt.category[0] || 'Uncategorized');
                const prmptSafeTitle = safeName(prompt.title);
                const newRelPath = path.join('Prompts', catSafeName, `${prmptSafeTitle}.md`);

                const actualNewRelPath = moveFileSafe(prompt.file, newRelPath);
                prompt.file = actualNewRelPath.replace(/\\/g, '/');
            }
        }
    }

    // 3. Process Archived Prompts
    if (catalog.prompts && catalog.prompts.archived) {
        for (const prompt of catalog.prompts.archived) {
            if (prompt.file) {
                const catSafeName = safeName(prompt.category[0] || 'Archived');
                const prmptSafeTitle = safeName(prompt.title);
                const newRelPath = path.join('Prompts', 'Archived', catSafeName, `${prmptSafeTitle}.md`);

                const actualNewRelPath = moveFileSafe(prompt.file, newRelPath);
                prompt.file = actualNewRelPath.replace(/\\/g, '/');
            }
        }
    }

    // Rewrite Catalog
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
    console.log("Updated prompt_catalog.json");

    // 4. Sweep Uncategorized Files
    function sweepDir(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(currentPath, entry.name);

            // Skip the new top-level directories so we don't recursive loop
            if (currentPath === BASE_DIR && (entry.name === 'Playbooks' || entry.name === 'Prompts' || entry.name === 'Uncategorized' || entry.name === 'prompt_catalog.json' || entry.name === '.DS_Store')) {
                continue;
            }

            if (entry.isDirectory()) {
                sweepDir(entryPath);

                // If it's empty after sweeping, remove it
                try {
                    if (fs.readdirSync(entryPath).length === 0) {
                        fs.rmdirSync(entryPath);
                    }
                } catch (e) { }
            } else if (entry.isFile()) { // Ensure we only copy valid files
                // If it wasn't tracked as part of the JSON moves, move to Uncategorized
                if (!validFiles.has(entryPath)) {
                    if (entry.name !== '.DS_Store') {
                        const relativeToOldDir = path.relative(BASE_DIR, entryPath);
                        const uncategorizedPath = path.join(UNCATEGORIZED_DIR, relativeToOldDir);

                        fs.mkdirSync(path.dirname(uncategorizedPath), { recursive: true });
                        fs.copyFileSync(entryPath, uncategorizedPath);
                        console.log(`Swept to Uncategorized: ${relativeToOldDir}`);
                    }

                    // We can now safely delete the original loose file since it's copied
                    try {
                        fs.unlinkSync(entryPath);
                    } catch (e) { }
                } else {
                    // It WAS in valid files, but we used copyFileSync initially to be safe. 
                    // Now we need to delete the OLD location if it's different from the NEW location.
                    // The new locations are all inside Playbooks/ or Prompts/, so any file outside those
                    // that was marked valid is an old source file that can be deleted.
                    if (!entryPath.startsWith(PLAYBOOKS_DIR) && !entryPath.startsWith(PROMPTS_DIR)) {
                        try {
                            fs.unlinkSync(entryPath);
                        } catch (e) { }
                    }
                }
            }
        }
    }

    sweepDir(BASE_DIR);

    // Final empty folder cleanup pass on the root level old folders
    const rootEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
    for (const entry of rootEntries) {
        if (entry.isDirectory() && entry.name !== 'Playbooks' && entry.name !== 'Prompts' && entry.name !== 'Uncategorized') {
            try {
                fs.rmSync(path.join(BASE_DIR, entry.name), { recursive: true, force: true });
                console.log(`Removed old directory: ${entry.name}`);
            } catch (e) { }
        }
    }

    console.log("Reorganization Complete!");
}

run().catch(console.error);
