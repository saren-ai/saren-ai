const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/marketing-framework.ts');

let content = fs.readFileSync(DATA_FILE, 'utf8');

// Replace promptContent with empty string
// We match from promptContent: up to visualLogic:
// This assumes visualLogic always follows promptContent (which it does in the interface)
const regex = /promptContent:[\s\S]*?visualLogic:/g;

const newContent = content.replace(regex, 'promptContent: ``, visualLogic:');

fs.writeFileSync(DATA_FILE, newContent);
console.log('File repaired (content stripped).');
